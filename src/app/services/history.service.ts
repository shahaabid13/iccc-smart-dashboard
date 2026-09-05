import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class HistoryService {
  constructor(private api: ApiService) {}

  getDeviceHistory(deviceId: string | number): Observable<any[]> {
    return this.api.get<any[]>(`/history/device/${deviceId}`);
  }
}
