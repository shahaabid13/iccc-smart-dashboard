import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class RoadsService {
  constructor(private api: ApiService) {}

  getByLocation(locationName: string): Observable<any[]> {
    return this.api.get<any[]>('/roads', { location: locationName });
  }
}
