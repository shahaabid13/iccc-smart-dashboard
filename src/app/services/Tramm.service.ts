import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CorridorListResponse, JunctionListResponse, JunctionDetails } from '../models/Tramm.models';

const API_BASE = `${environment.apiUrl}/tramm`; // -> '/api/tramm', proxied to :8080

@Injectable({ providedIn: 'root' })
export class TrammService {
  constructor(private http: HttpClient) {}

  getCorridors(): Observable<CorridorListResponse> {
    return this.http.get<CorridorListResponse>(`${API_BASE}/corridors`);
  }

  getJunctions(corridorName: string): Observable<JunctionListResponse> {
    return this.http.get<JunctionListResponse>(`${API_BASE}/junctions`, { params: { corridorName } });
  }

  getJunctionDetails(corridorName: string, junctionName: string): Observable<JunctionDetails> {
    return this.http.get<JunctionDetails>(`${API_BASE}/junction-details`, { params: { corridorName, junctionName } });
  }
}