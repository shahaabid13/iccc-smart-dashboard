import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ticket } from '../models/ticket';
import { CacheService } from './cache.service';

export interface Reviewer {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  private base = `${environment.apiBaseUrl}/api/incidents/tickets`;
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getMyQueue(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.base}/my-queue`).pipe(
      tap(data => void this.cacheService.cacheTickets(data)),
      catchError(() => of(this.fallbackTickets()))
    );
  }

  getTicket(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.base}/${id}`);
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
    return this.http.put(`${this.base}/${id}/acknowledge`, { notes });
  }

  getReviewers(): Observable<Reviewer[]> {
    return this.http.get<Reviewer[]>(`${this.base}/reviewers`);
  }

  assignReviewer(id: number, reviewerId: number) {
    return this.http.put(`${this.base}/${id}/assign-reviewer`, { reviewerId });
  }
}
