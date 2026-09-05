import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { getApiBaseUrl } from '../../environments/environment';
import { Task } from '../models/task';
import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  private getBase(): string {
    return `${getApiBaseUrl()}/api/tasks`;
  }

  private getTicketsBase(): string {
    return `${getApiBaseUrl()}/api/incidents/tickets`;
  }

  private extractTasks(data: any): Task[] {
    if (data && typeof data === 'object' && 'content' in data && Array.isArray(data.content)) {
      console.log('[TaskService] Detected paginated response, extracting content array');
      return data.content as Task[];
    }

    if (Array.isArray(data)) {
      console.log('[TaskService] Using API array data:', data.length, 'tasks');
      return data as Task[];
    }

    return [] as Task[];
  }

  private mapTicketsToTasks(data: any): Task[] {
    if (!Array.isArray(data)) {
      if (data && Array.isArray(data.content)) {
        return data.content.map((ticket: any) => ({
          id: ticket.id,
          title: ticket.incidentTypeName || 'Ticket',
          description: ticket.locationName || ticket.description || 'Assigned ticket',
          status: ticket.status || 'OPEN',
          assigneeId: ticket.fieldPersonId,
          category: 'TICKET',
          priority: ticket.priority,
          createdAt: ticket.createdAt,
          updatedAt: ticket.assignedAt || ticket.closedAt || ticket.createdAt,
          dueDate: ticket.assignedAt || ticket.createdAt,
        }));
      }
      return [] as Task[];
    }

    return data.map((ticket: any) => ({
      id: ticket.id,
      title: ticket.incidentTypeName || 'Ticket',
      description: ticket.locationName || ticket.description || 'Assigned ticket',
      status: ticket.status || 'OPEN',
      assigneeId: ticket.fieldPersonId,
      category: 'TICKET',
      priority: ticket.priority,
      createdAt: ticket.createdAt,
      updatedAt: ticket.assignedAt || ticket.closedAt || ticket.createdAt,
      dueDate: ticket.assignedAt || ticket.createdAt,
    }));
  }

  getMyTasks(): Observable<Task[]> {
    const url = `${this.getBase()}/my`;
    const ticketsUrl = `${this.getTicketsBase()}/my-queue`;
    console.log('[TaskService] Fetching tasks from:', url);

    return this.http.get<any>(url).pipe(
      tap(data => {
        console.log('[TaskService] API returned:', data, 'type:', typeof data);
      }),
      map(data => this.extractTasks(data)),
      switchMap(tasks => {
        if (tasks && tasks.length > 0) {
          return of(tasks);
        }

        console.log('[TaskService] No task records returned, falling back to field-person ticket queue:', ticketsUrl);
        return this.http.get<any>(ticketsUrl).pipe(
          map(ticketData => this.mapTicketsToTasks(ticketData))
        );
      }),
      tap(data => void this.cacheService.cacheTasks(data)),
      catchError(error => {
        console.error('[TaskService] Error fetching tasks:', error);
        const fallbackQueueUrl = `${this.getTicketsBase()}/my-queue`;
        console.log('[TaskService] Falling back to field-person ticket queue after task error:', fallbackQueueUrl);
        return this.http.get<any>(fallbackQueueUrl).pipe(
          map(ticketData => this.mapTicketsToTasks(ticketData)),
          catchError(() => of([] as Task[]))
        );
      })
    );
  }

  getTaskById(id: number): Observable<Task> {
    const url = `${this.getBase()}/${id}`;
    console.log(`[TaskService] Fetching task detail from: ${url}`);
    return this.http.get<Task>(url).pipe(
      tap(data => {
        console.log('[TaskService] API returned task detail:', data);
      }),
      catchError(error => {
        console.error('[TaskService] Error fetching task detail:', error);
        throw error; // re-throw the error to be handled by the component
      })
    );
  }

  getMyTaskHistory(): Observable<Task[]> {
    const url = `${this.getBase()}/my-history`;
    console.log('[TaskService] Fetching task history from:', url);
    return this.http.get<any>(url).pipe(
      map(data => {
        if (data && typeof data === 'object' && 'content' in data && Array.isArray(data.content)) {
          return data.content as Task[];
        }
        return Array.isArray(data) ? data as Task[] : [] as Task[];
      }),
      catchError(() => of([] as Task[]))
    );
  }

  action(id: number, status: 'RESOLVED' | 'HOLD' | 'REJECTED', summary: string) {
    return this.http.put(`${this.getBase()}/${id}/action`, { status, summary });
  }

}
