import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { getApiBaseUrl } from '../../environments/environment';
import { FieldDashboardBreakdowns, FieldDashboardSummary, PendingTicket, Ticket, TicketActionResponse } from '../models/ticket';
import { CacheService } from './cache.service';

export interface Reviewer {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  private getBase(): string {
    return `${getApiBaseUrl()}/api/incidents/tickets`;
  }

  getMyQueue(): Observable<Ticket[]> {
    const url = `${this.getBase()}/my-queue`;
    console.log('[TicketService] Fetching tickets from:', url);
    return this.http.get<Ticket[]>(url).pipe(
      tap(data => {
        console.log('[TicketService] API returned:', data, 'length:', data?.length);
      }),
      map((data: any) => {
        if (Array.isArray(data)) {
          return data as Ticket[];
        }
        if (data && Array.isArray(data.content)) {
          return data.content as Ticket[];
        }
        return [] as Ticket[];
      }),
      tap(data => void this.cacheService.cacheTickets(data)),
      catchError(error => {
        console.error('[TicketService] Error fetching tickets:', error);
        return of([] as Ticket[]);
      })
    );
  }

  getMyHistory(): Observable<Ticket[]> {
    const url = `${this.getBase()}/my-ticket-history`;
    console.log('[TicketService] Fetching ticket history from:', url);
    return this.http.get<any>(url).pipe(
      map((data: any) => {
        if (Array.isArray(data)) return data as Ticket[];
        if (data && Array.isArray(data.content)) return data.content as Ticket[];
        return [] as Ticket[];
      }),
      catchError(() => of([] as Ticket[]))
    );
  }

  getMyPendingTickets(): Observable<PendingTicket[]> {
    return this.http.get<any>(`${getApiBaseUrl()}/api/cims/my-pending-tickets`).pipe(
      map(data => {
        const rows = Array.isArray(data) ? data : data?.content ?? data?.tickets ?? data?.data ?? [];
        return rows.map((ticket: any) => ({ ...ticket, id: ticket.id ?? ticket.ticketId })) as PendingTicket[];
      }),
      catchError(error => error?.status === 404
        ? this.getMyQueue().pipe(map(tickets => tickets.map(ticket => ({ ...ticket, id: ticket.id }) as PendingTicket)))
        : of([] as PendingTicket[]))
    );
  }

  getMyDashboardBreakdowns(): Observable<FieldDashboardBreakdowns> {
    return forkJoin({
      queue: this.getMyQueue(),
      history: this.getMyHistory(),
      tasks: this.http.get<any>(`${getApiBaseUrl()}/api/tasks/my`).pipe(catchError(() => of([]))),
      taskHistory: this.http.get<any>(`${getApiBaseUrl()}/api/tasks/my-history`).pipe(catchError(() => of([])))
    }).pipe(map(raw => {
      const queue = this.rows(raw.queue);
      const history = this.rows(raw.history);
      const tickets = [...queue, ...history];
      const tasks = [...this.rows(raw.tasks), ...this.rows(raw.taskHistory)];
      return {
        incidentTypes: this.groupTickets(queue),
        ageing: this.groupAgeing(queue),
        trend: this.groupTrend(tickets),
        taskStatuses: this.groupStatuses(tasks),
        tasksByAssignee: this.groupTasksByAssignee(tasks)
      };
    }));
  }

  private groupTickets(tickets: Record<string, any>[]): FieldDashboardBreakdowns['incidentTypes'] {
    const groups = new Map<string, { id: number; label: string; count: number }>();
    for (const ticket of tickets) {
      const label = ticket.incidentTypeName || 'Other';
      const id = Number(ticket.incidentTypeId) || 0;
      const existing = groups.get(label) || { id, label, count: 0 };
      existing.count++;
      groups.set(label, existing);
    }
    return Array.from(groups.values()).sort((a, b) => b.count - a.count);
  }

  private groupAgeing(tickets: Record<string, any>[]): FieldDashboardBreakdowns['ageing'] {
    if (!tickets.length) return [];
    const labels = ['0-1d', '1-3d', '3-7d', '7d+'];
    const counts = [0, 0, 0, 0];
    for (const ticket of tickets) {
      const createdAt = new Date(ticket.createdAt || '').getTime();
      if (!Number.isFinite(createdAt)) continue;
      const days = Math.max(0, (Date.now() - createdAt) / 86400000);
      const index = days < 1 ? 0 : days < 3 ? 1 : days < 7 ? 2 : 3;
      counts[index]++;
    }
    return labels.map((label, index) => ({ label, count: counts[index] }));
  }

  private groupTrend(tickets: Record<string, any>[]): FieldDashboardBreakdowns['trend'] {
    const days: FieldDashboardBreakdowns['trend'] = [];
    const byDate = new Map<string, { date: string; created: number; closed: number }>();
    const today = new Date();
    for (let offset = 29; offset >= 0; offset--) {
      const date = new Date(today);
      date.setDate(today.getDate() - offset);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      byDate.set(key, { date: key, created: 0, closed: 0 });
    }
    for (const ticket of tickets) {
      const createdDate = this.localDateKey(ticket.createdAt ?? ticket.created_at ?? ticket.created ?? ticket.createdDate ?? ticket.created_date);
      if (createdDate && byDate.has(createdDate)) byDate.get(createdDate)!.created++;
      const status = String(ticket.status ?? '').toUpperCase();
      const terminal = ['RESOLVED', 'REJECTED', 'CLOSED', 'COMPLETED'].includes(status);
      const closedDate = terminal
        ? this.localDateKey(ticket.closedAt ?? ticket.closed_at ?? ticket.resolvedAt ?? ticket.resolved_at ?? ticket.updatedAt ?? ticket.updated_at)
        : '';
      if (closedDate && byDate.has(closedDate)) byDate.get(closedDate)!.closed++;
    }
    days.push(...byDate.values());
    return days;
  }

  private groupStatuses(tasks: Record<string, any>[]): FieldDashboardBreakdowns['taskStatuses'] {
    const counts = new Map<string, number>();
    for (const task of tasks) {
      const status = String(task.status || 'OPEN').toUpperCase();
      counts.set(status, (counts.get(status) || 0) + 1);
    }
    return Array.from(counts, ([label, count]) => ({ label, count }));
  }

  private groupTasksByAssignee(tasks: Record<string, any>[]): FieldDashboardBreakdowns['tasksByAssignee'] {
    const open = tasks.filter(task => !['RESOLVED', 'REJECTED', 'CLOSED', 'COMPLETED'].includes(String(task.status).toUpperCase()));
    if (!open.length) return [];
    const now = Date.now();
    const overdue = open.filter(task => task.dueDate && new Date(task.dueDate).getTime() < now).length;
    return [{ label: sessionStorage.getItem('username') || 'Me', pending: open.length, overdue }];
  }

  private localDateKey(value: unknown): string {
    if (value === null || value === undefined || value === '') return '';
    const raw = typeof value === 'string' ? value : value instanceof Date ? value.toISOString() : (value as any)?.value ?? (value as any)?.date ?? (value as any)?.timestamp ?? '';
    if (!raw || typeof raw !== 'string') return '';
    const date = new Date(raw);
    if (!Number.isFinite(date.getTime())) return '';
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  private rows(value: any): Record<string, any>[] {
    if (Array.isArray(value)) return value;
    return value?.content ?? value?.data ?? value?.items ?? value?.results ?? [];
  }

  getTicketById(id: number): Observable<Ticket> {
    const url = `${this.getBase()}/${id}`;
    console.log(`[TicketService] Fetching ticket detail from: ${url}`);
    return this.http.get<Ticket>(url).pipe(
      tap(data => {
        console.log('[TicketService] API returned ticket detail:', data);
      }),
      catchError(error => {
        console.error('[TicketService] Error fetching ticket detail:', error);
        throw error; // re-throw the error to be handled by the component
      })
    );
  }

  acknowledge(id: number, action: 'resolved' | 'revalidation', notes: string): Observable<TicketActionResponse> {
    return this.http.put<TicketActionResponse>(`${this.getBase()}/${id}/acknowledge`, { action, notes });
  }

  getReviewers(): Observable<Reviewer[]> {
    const url = `${this.getBase()}/reviewers`;
    console.log(`[TicketService] Fetching reviewers from: ${url}`);
    return this.http.get<Reviewer[]>(url).pipe(
      tap(data => console.log('[TicketService] Reviewers API returned:', data)),
      catchError(error => {
        console.error('[TicketService] Error fetching reviewers:', error);
        return of([]); // Return empty array on error
      })
    );
  }

  assignReviewer(id: number, reviewerId: number) {
    return this.http.put(`${this.getBase()}/${id}/assign-reviewer`, { reviewerId });
  }
}
