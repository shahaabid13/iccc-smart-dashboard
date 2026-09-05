import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiResponse, Server } from '../models/traffic-dashboard.dtos';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private readonly apiUrl = `${environment.apiBaseUrl}/api/servers`;

  constructor(private http: HttpClient) {}

  /**
   * Fetch all servers
   * GET /api/servers
   */
  getServers(): Observable<Server[]> {
  return this.http.get<Server[]>(this.apiUrl);
}

  /**
   * Get a specific server by ID
   */
  getServerById(serverId: string): Observable<ApiResponse<Server>> {
    return this.http.get<ApiResponse<Server>>(`${this.apiUrl}/${serverId}`);
  }
}