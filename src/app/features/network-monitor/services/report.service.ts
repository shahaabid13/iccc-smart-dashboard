import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DowntimeIncident, CategorySla } from '../models/report.model';

export interface ReportFilter {
  category?: string | null;
  deviceId?: number | null;
}

@Injectable({ providedIn: 'root' })
export class SdnetReportService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api/sdnet-monitor/reports`;

  constructor(private http: HttpClient) {}

  private buildParams(from: Date, to: Date, filter?: ReportFilter): HttpParams {
    let params = new HttpParams().set('from', from.toISOString()).set('to', to.toISOString());
    if (filter?.category) params = params.set('category', filter.category);
    if (filter?.deviceId != null) params = params.set('deviceId', filter.deviceId);
    return params;
  }

  downtime(from: Date, to: Date, filter?: ReportFilter): Observable<DowntimeIncident[]> {
    return this.http.get<DowntimeIncident[]>(`${this.baseUrl}/downtime`, { params: this.buildParams(from, to, filter) });
  }

  slaSummary(from: Date, to: Date, filter?: ReportFilter): Observable<CategorySla[]> {
    return this.http.get<CategorySla[]>(`${this.baseUrl}/sla-summary`, { params: this.buildParams(from, to, filter) });
  }

  downloadPdf(from: Date, to: Date, filter?: ReportFilter): Observable<Blob> {
    const params = this.buildParams(from, to, filter);
    return this.http.get(`${this.baseUrl}/downtime.pdf`, { params, responseType: 'blob' });
  }
}
