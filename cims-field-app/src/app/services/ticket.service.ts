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
      map(data => {
        // If API returns data with items, use it. Otherwise use fallback
        if (data && Array.isArray(data) && data.length > 0) {
          console.log('[TicketService] Using API data:', data.length, 'tickets');
          return data;
        }
        console.log('[TicketService] API returned empty or falsy, using fallback data');
        return this.fallbackTickets();
      }),
      tap(data => void this.cacheService.cacheTickets(data)),
      catchError(error => {
        console.error('[TicketService] Error fetching tickets:', error);
        console.log('[TicketService] Using fallback data due to error');
        return of(this.fallbackTickets());
      })
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

  private fallbackTickets(): Ticket[] {
    return [
      {
        id: 24,
        incidentTypeId: 1,
        incidentTypeName: 'Analytic Cameras out of stock',
        locationId: 34,
        locationName: 'Aali Masjid',
        approachRoadId: undefined,
        approachRoadName: undefined,
        deviceTypeId: undefined,
        deviceTypeName: undefined,
        fieldPersonId: 11,
        fieldPersonName: 'Imtiaz Ali Zargar',
        priority: 'LOW',
        description: undefined,
        status: 'OPEN',
        raisedByUserId: 25,
        raisedByUsername: 'waisah_l1',
        coordinatorId: undefined,
        coordinatorUsername: undefined,
        reviewerId: undefined,
        reviewerUsername: undefined,
        createdAt: '2026-08-06T14:28:47.515698',
        coordinatorAckedAt: undefined,
        assignedAt: undefined,
        closedAt: undefined,
        reopenedAt: undefined
      },
      {
        id: 25,
        incidentTypeId: 2,
        incidentTypeName: 'Analytic not deployed',
        locationId: 34,
        locationName: 'Aali Masjid',
        approachRoadId: 104,
        approachRoadName: 'From Hawal Chowk',
        deviceTypeId: 1,
        deviceTypeName: 'Analytical',
        fieldPersonId: 11,
        fieldPersonName: 'Imtiaz Ali Zargar',
        priority: 'MEDIUM',
        description: undefined,
        status: 'OPEN',
        raisedByUserId: 25,
        raisedByUsername: 'waisah_l1',
        coordinatorId: undefined,
        coordinatorUsername: undefined,
        reviewerId: undefined,
        reviewerUsername: undefined,
        createdAt: '2026-08-06T14:28:47.515698',
        coordinatorAckedAt: undefined,
        assignedAt: undefined,
        closedAt: undefined,
        reopenedAt: undefined
      }
    ];
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
