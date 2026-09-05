import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class LocationsService {
  constructor(private api: ApiService) {}

  getAll(): Observable<any[]> {
    return this.api.get<any[]>('/locations');
  }

  searchByName(name: string): Observable<any[]> {
    return this.api.get<any[]>('/locations/search', { name });
  }
}
