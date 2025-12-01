import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { InventoryItem } from '../models/inventory-item';
import { HttpClient } from '@angular/common/http';
export interface Device {
  approachRoad: string;
  latitude: string;
  longitude: string;
  placeholder: any;
  status: any;
  poles: unknown;
  ecbPresent: unknown;
  id: number;
  name: string;
  serialNumber: string;
  deviceType: string;
  locationName: string;
  quantity: number;
  lastModified: string;
}
@Injectable({ providedIn: 'root' })
export class DevicesService {
  private apiUrl = 'http://localhost:8080/api/devices';
  constructor(private api: ApiService , private http: HttpClient) {}

  /** ✅ Get all devices */
getAllDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.apiUrl);
  }
 deleteDevice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  /** ✅ Get device by serial number */
  getBySerial(serial: string): Observable<InventoryItem> {
return this.api.get<InventoryItem>(`/devices/by-serial/${encodeURIComponent(serial)}`);
  }

  /** ✅ Search devices by filters */
  search(location: string, type?: string, status?: string): Observable<InventoryItem[]> {
    const params: Record<string, string> = { location };
    if (type) params['type'] = type;
    if (status) params['status'] = status;
return this.api.get<InventoryItem[]>('/api/devices/search', params);
 // Keep if your ApiService adds '/api' prefix automatically
  }

  /** ✅ Update serial number for a device */
  updateSerial(deviceId: string | number, newSerial: string): Observable<any> {
    return this.api.put(`/devices/${deviceId}/update-serial`, { newSerial });
  }

  /** ✅ Download filtered results as Excel / Word / PDF */
  downloadSearchResults(
    location: string,
    type?: string,
    status?: string,
    format: 'excel' | 'pdf' | 'word' = 'excel'
  ): Observable<Blob> {
    const params: Record<string, string> = { location, format };
    if (type) params['type'] = type;
    if (status) params['status'] = status;

    // ✅ Use ApiService to request as blob
    return this.api.get<Blob>('/devices/search/download', params, {
      responseType: 'blob' as 'json', // fix TypeScript error
    });
  }
}
