import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, SyncChannelsResponse } from '../models/traffic-dashboard.dtos';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly syncUrl = `${environment.apiBaseUrl}/api/admin/channels/sync`;

  constructor(private http: HttpClient) {}

  /**
   * Sync channels from servers (admin only)
   * POST /api/admin/channels/sync
   */
  syncChannels(serverId?: string): Observable<ApiResponse<SyncChannelsResponse>> {
    const body = serverId ? { serverId } : {};
    return this.http.post<ApiResponse<SyncChannelsResponse>>(this.syncUrl, body);
  }
}
