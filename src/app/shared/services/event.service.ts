import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  EventSearchRequest,
  ExternalEventSearchResponse
} from '../models/traffic-dashboard.dtos';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly searchUrl = `${environment.apiBaseUrl}/api/events/search`;

  constructor(private http: HttpClient) {}

  /**
   * Search events with pagination
   * POST /api/events/search
   */
  searchEvents(request: EventSearchRequest): Observable<ExternalEventSearchResponse> {
    return this.http.post<ExternalEventSearchResponse>(this.searchUrl, this.toBackendPayload(request));
  }

  /**
   * Maps our camelCase frontend model to the backend's lowercase field names.
   * Backend DTOs (EventCountFilterRequest / EventSearchFilterRequest) use:
   * serverId, channelid, starttimestamp, endtimestamp, lpnumber, applicationid
   */
  private toBackendPayload(request: EventSearchRequest): Record<string, unknown> {
    const payload: Record<string, unknown> = {
      starttimestamp: request.startTimestamp,
      endtimestamp: request.endTimestamp
    };

    if (request.serverId !== undefined && request.serverId !== null) {
      payload['serverId'] = request.serverId;
    }

    if (request.lpNumber?.trim()) {
      payload['lpnumber'] = request.lpNumber.trim();
    }
    if (request.channelId?.trim()) {
      payload['channelid'] = request.channelId.trim();
    }
    if (request.applicationId?.trim()) {
      payload['applicationid'] = request.applicationId.trim();
    }
    if (request.page !== undefined) {
      payload['page'] = request.page;
    }
    if (request.limit !== undefined) {
      payload['limit'] = request.limit;
    }
    if (request.persist !== undefined) {
      payload['persist'] = request.persist;
    }

    return payload;
  }

  /**
   * Convert date to epoch milliseconds
   */
  dateToEpochMs(date: Date): number {
    return date.getTime();
  }

  /**
   * Convert epoch milliseconds to Date
   */
  epochMsToDate(ms: number): Date {
    return new Date(ms);
  }

  /**
   * Format timestamp to local timezone string
   */
  formatEventTimestamp(timestamp: number, locale: string = 'en-US'): string {
    const date = new Date(timestamp);
    return date.toLocaleString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }

  /**
   * Validate date range (end after start, max 90 days)
   */
  isValidDateRange(
    startDate: Date,
    endDate: Date,
    maxDaysRange: number = 90
  ): { valid: boolean; error?: string } {
    if (startDate >= endDate) {
      return { valid: false, error: 'End date must be after start date' };
    }

    const diffMs = endDate.getTime() - startDate.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays > maxDaysRange) {
      return {
        valid: false,
        error: `Date range cannot exceed ${maxDaysRange} days`
      };
    }

    return { valid: true };
  }
}