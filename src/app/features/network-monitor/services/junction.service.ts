import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Junction } from '../models/junction.model';

@Injectable({ providedIn: 'root' })
export class SdnetJunctionService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api/sdnet-monitor/junctions`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Junction[]> {
    return this.http.get<Junction[]>(this.baseUrl);
  }

  findById(id: string): Observable<Junction> {
    return this.http.get<Junction>(`${this.baseUrl}/${id}`);
  }
}
