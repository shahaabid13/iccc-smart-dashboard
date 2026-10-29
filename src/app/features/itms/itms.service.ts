import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ItmsEvent {
  id: number | string;
  slNo: number;
  junction: string;
  cameraName: string;
  eventType: string;
  eventTime: string;
  vehicleNumber: string | null;
  speedKmph: number | null;
  status: string;
  priority: string;
  message: string;
  actionTaken: string | null;
  acknowledgedBy: string | null;
  vehicleColor: string | null;
  snapPath: string | null;
}

export interface ItmsEventQuery {
  from?: string;
  to?: string;
  eventType?: string;
  junction?: string;
  vehicleNumber?: string;
  priority?: string;
  page: number;
  size: number;
  sort?: string;
}

export interface ItmsPage<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface ItmsFilterOptions {
  eventTypes: string[];
  junctions: string[];
  priorities: string[];
}

export interface ItmsUploadResult {
  batchId: number | string;
  totalRows: number;
  inserted: number;
  duplicateRows: number;
  failedRows: number;
  skipped: number;
  errors: string[];
}

export interface ItmsBatch {
  id: number | string;
  fileName: string;
  periodFrom?: string;
  periodTo?: string;
  periodStart?: string;
  periodEnd?: string;
  startDate?: string;
  endDate?: string;
  from?: string;
  to?: string;
  totalRows: number;
  inserted?: number;
  skipped?: number;
  duplicateRows: number;
  failedRows: number;
  snapStatus: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface ItmsDashboardSummary {
  totalEvents: number;
  uniqueVehicles: number;
  junctions: number;
  totalJunctions?: number;
  topEventType: string;
}

export interface ItmsCountByType {
  eventType: string;
  count: number;
}

export interface ItmsDailyTrendPoint {
  date: string;
  count: number;
}

export interface ItmsHourlyPoint {
  hour: number | string;
  count: number;
}

export interface ItmsJunctionCount {
  junction: string;
  count: number;
}

export interface ItmsRepeatOffender {
  vehicleNumber: string;
  count: number;
}

export interface ItmsPriorityCount {
  priority: string;
  count: number;
}

export interface ItmsStatusCount {
  status: string;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class ItmsService {
  private readonly baseUrl = `${environment.apiUrl}/itms`;

  constructor(private readonly http: HttpClient) {}

  upload(file: File): Observable<HttpEvent<ItmsUploadResult>> {
    const body = new FormData();
    body.append('file', file);
    return this.http.post<ItmsUploadResult>(`${this.baseUrl}/upload`, body, {
      observe: 'events',
      reportProgress: true
    });
  }

  getEvents(query: ItmsEventQuery): Observable<ItmsPage<ItmsEvent>> {
    return this.http.get<ItmsPage<ItmsEvent>>(`${this.baseUrl}/events`, {
      params: this.toParams(query)
    });
  }

  getFilters(): Observable<ItmsFilterOptions> {
    return this.http.get<ItmsFilterOptions>(`${this.baseUrl}/filters`);
  }

  getSummary(from: string, to: string): Observable<ItmsDashboardSummary> {
    return this.http.get<unknown>(`${this.baseUrl}/dashboard/summary`, {
      params: this.toParams({ from, to })
    }).pipe(map(value => {
      const summary = this.toRecord(value);
      return {
        totalEvents: this.readNumber(summary, 'totalEvents', 'total', 'eventCount', 'events'),
        uniqueVehicles: this.readNumber(summary, 'uniqueVehicles', 'uniqueVehicleCount', 'vehicles'),
        junctions: this.readNumber(summary, 'junctions', 'junctionCount', 'totalJunctions'),
        topEventType: this.readString(summary, 'topEventType', 'topType')
      };
    }));
  }

  getByType(from: string, to: string): Observable<ItmsCountByType[]> {
    return this.http.get<unknown>(`${this.baseUrl}/dashboard/by-type`, {
      params: this.toParams({ from, to })
    }).pipe(map(value => this.toRows(value).map(row => ({
      eventType: this.readString(row, 'eventType', 'type', 'label', 'name'),
      count: this.readNumber(row, 'count', 'total', 'eventCount')
    }))));
  }

  getDailyTrend(from: string, to: string): Observable<ItmsDailyTrendPoint[]> {
    return this.http.get<unknown>(`${this.baseUrl}/dashboard/daily-trend`, {
      params: this.toParams({ from, to })
    }).pipe(map(value => this.toRows(value).map(row => ({
      date: this.readString(row, 'date', 'day', 'eventDate', 'label'),
      count: this.readNumber(row, 'count', 'total', 'eventCount')
    }))));
  }

  getHourly(from: string, to: string): Observable<ItmsHourlyPoint[]> {
    return this.http.get<unknown>(`${this.baseUrl}/dashboard/hourly`, {
      params: this.toParams({ from, to })
    }).pipe(map(value => this.toRows(value).map(row => ({
      hour: this.readString(row, 'hour', 'label'),
      count: this.readNumber(row, 'count', 'total', 'eventCount')
    }))));
  }

  getTopJunctions(from: string, to: string): Observable<ItmsJunctionCount[]> {
    return this.http.get<unknown>(`${this.baseUrl}/dashboard/top-junctions`, {
      params: this.toParams({ from, to })
    }).pipe(map(value => this.toRows(value).map(row => ({
      junction: this.readString(row, 'junction', 'label', 'name'),
      count: this.readNumber(row, 'count', 'total', 'eventCount')
    }))));
  }

  getRepeatOffenders(from: string, to: string): Observable<ItmsRepeatOffender[]> {
    return this.http.get<unknown>(`${this.baseUrl}/dashboard/repeat-offenders`, {
      params: this.toParams({ from, to })
    }).pipe(map(value => this.toRows(value).map(row => ({
      vehicleNumber: this.readString(row, 'vehicleNumber', 'vehicle', 'plateNumber', 'label'),
      count: this.readNumber(row, 'count', 'total', 'eventCount')
    }))));
  }

  getByPriority(from: string, to: string): Observable<ItmsPriorityCount[]> {
    return this.http.get<unknown>(`${this.baseUrl}/dashboard/by-priority`, {
      params: this.toParams({ from, to })
    }).pipe(map(value => this.toRows(value).map(row => ({
      priority: this.readString(row, 'priority', 'label', 'name'),
      count: this.readNumber(row, 'count', 'total', 'eventCount')
    }))));
  }

  getByStatus(from: string, to: string): Observable<ItmsStatusCount[]> {
    return this.http.get<unknown>(`${this.baseUrl}/dashboard/by-status`, {
      params: this.toParams({ from, to })
    }).pipe(map(value => this.toRows(value).map(row => ({
      status: this.readString(row, 'status', 'label', 'name'),
      count: this.readNumber(row, 'count', 'total', 'eventCount')
    }))));
  }

  getBatches(): Observable<ItmsBatch[]> {
    return this.http.get<ItmsBatch[]>(`${this.baseUrl}/batches`);
  }

  deleteBatch(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/batches/${encodeURIComponent(id)}`);
  }

  exportEvents(query: Omit<ItmsEventQuery, 'page' | 'size' | 'sort'>): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/events/export`, {
      params: this.toParams(query),
      responseType: 'blob'
    });
  }

  private toParams(values: object): HttpParams {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(values)) {
      if (value !== undefined && value !== '') {
        params = params.set(key, String(value));
      }
    }
    return params;
  }

  private toRows(value: unknown): Record<string, unknown>[] {
    if (!Array.isArray(value)) {
      throw new TypeError('Expected an array from an ITMS dashboard endpoint.');
    }
    return value.map(item => this.toRecord(item));
  }

  private toRecord(value: unknown): Record<string, unknown> {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      throw new TypeError('Expected an object in an ITMS dashboard response.');
    }
    return value as Record<string, unknown>;
  }

  private readString(record: Record<string, unknown>, ...keys: string[]): string {
    for (const key of keys) {
      const value = record[key];
      if (typeof value === 'string' && value.trim()) return value;
      if (typeof value === 'number') return String(value);
    }
    return '';
  }

  private readNumber(record: Record<string, unknown>, ...keys: string[]): number {
    for (const key of keys) {
      const value = record[key];
      if (typeof value === 'number' && Number.isFinite(value)) return value;
      if (typeof value === 'string' && value.trim()) {
        const parsed = Number(value);
        if (Number.isFinite(parsed)) return parsed;
      }
    }
    return 0;
  }
}
