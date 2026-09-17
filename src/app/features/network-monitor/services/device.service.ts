import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Device } from '../models/device.model';
import { UptimeSummary } from '../models/uptime-summary.model';

@Injectable({ providedIn: 'root' })
export class SdnetDeviceService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api/sdnet-monitor/devices`;

  constructor(private http: HttpClient) {}

  findAll(filters?: { junctionId?: string; category?: string }): Observable<Device[]> {
    let params = new HttpParams();
    if (filters?.junctionId) params = params.set('junctionId', filters.junctionId);
    if (filters?.category) params = params.set('category', filters.category);
    return this.http.get<Device[]>(this.baseUrl, { params });
  }

  findById(id: number): Observable<Device> {
    return this.http.get<Device>(`${this.baseUrl}/${id}`);
  }

  uptime(id: number, from: Date, to: Date = new Date()): Observable<UptimeSummary> {
    const params = new HttpParams()
      .set('from', from.toISOString())
      .set('to', to.toISOString());
    return this.http.get<UptimeSummary>(`${this.baseUrl}/${id}/uptime`, { params });
  }

  /** Authoritative category list, sourced from the backend's DeviceCategory
   *  enum rather than re-declared here -- avoids the two ever drifting
   *  apart the way the old free-text category column silently did. */
  categories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }
}
