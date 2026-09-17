import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FibreLink } from '../models/fibre-link.model';
import { UptimeSummary } from '../models/uptime-summary.model';

@Injectable({ providedIn: 'root' })
export class SdnetFibreLinkService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api/sdnet-monitor/fibre-links`;

  constructor(private http: HttpClient) {}

  findAll(junctionId?: string): Observable<FibreLink[]> {
    let params = new HttpParams();
    if (junctionId) params = params.set('junctionId', junctionId);
    return this.http.get<FibreLink[]>(this.baseUrl, { params });
  }

  findById(id: string): Observable<FibreLink> {
    return this.http.get<FibreLink>(`${this.baseUrl}/${id}`);
  }

  uptime(id: string, from: Date, to: Date = new Date()): Observable<UptimeSummary> {
    const params = new HttpParams()
      .set('from', from.toISOString())
      .set('to', to.toISOString());
    return this.http.get<UptimeSummary>(`${this.baseUrl}/${id}/uptime`, { params });
  }
}
