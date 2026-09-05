import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { getApiBaseUrl } from '../../environments/environment';
import { Ticket } from '../models/ticket';
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

  acknowledge(id: number, notes: string) {
    return this.http.put(`${this.getBase()}/${id}/acknowledge`, { notes });
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
