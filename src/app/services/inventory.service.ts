import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, throwError } from 'rxjs';
import { InventoryItem } from '../models/inventory-item';

@Injectable({ providedIn: 'root' })
export class InventoryService {

  private apiUrl = '/api/devices';

  constructor(private http: HttpClient) {}

  getAll(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.apiUrl).pipe(
      map(devices => devices.map(device => this.transformDevice(device))),
      catchError((error) => {
        console.error('Failed to load devices:', error);
        return of([]);
      })
    );
  }

  getById(id: string | number): Observable<InventoryItem | undefined> {
    return this.http.get<InventoryItem>(`${this.apiUrl}/${id}`).pipe(
      map(device => this.transformDevice(device)),
      catchError((error) => {
        console.error(`Failed to fetch device ${id}:`, error);
        return of(undefined);
      })
    );
  }

  /** Create — POST /api/devices/create (returns plain text "✅ Device created...") */
  createDevice(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, payload, { responseType: 'text' }).pipe(
      catchError((error) => {
        console.error('Failed to create device:', error);
        return throwError(() => error);
      })
    );
  }

  /** Update — PUT /api/devices/{id} (returns DeviceDto JSON) */
  // inventory.service.ts
updateDevice(id: string | number, payload: any): Observable<InventoryItem> {
  console.log('[UPDATE] PUT payload:', JSON.stringify(payload, null, 2));
  return this.http.put<any>(`${this.apiUrl}/${id}/update`, payload).pipe(  // ← /update
    map(device => this.transformDevice(device)),
    catchError((error) => {
      console.error('[UPDATE] Status:', error.status);
      console.error('[UPDATE] error.error:', error.error);
      console.error('[UPDATE] Backend message:', error.error?.message);
      return throwError(() => error);
    })
  );
}
  /** Legacy — kept for backward compat if used elsewhere */
  create(payload: any): Observable<any> {
    return this.createDevice(payload);
  }

  update(id: string | number, patch: any): Observable<InventoryItem> {
    return this.updateDevice(id, patch);
  }

  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Failed to delete device ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  updateNotified(id: string | number, notified: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/notified?value=${notified}`, {}).pipe(
      catchError((error) => {
        console.error(`Failed to update notified for device ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  syncFromInstall(id: string | number, payload: { serialNumber?: string; locationName?: string }): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(`${this.apiUrl}/${id}/sync-from-install`, payload).pipe(
      map(device => this.transformDevice(device)),
      catchError((error) => {
        console.error(`Failed to sync device ${id} from install:`, error);
        return throwError(() => error);
      })
    );
  }

  getByAgency(_userAgency: string) {
    throw new Error('Method not implemented.');
  }

  private transformDevice(backendDevice: any): InventoryItem {
    const resolvedLocationName =
      backendDevice.locationName ??
      (backendDevice.location && (backendDevice.location.name || backendDevice.location.locationName)) ??
      (typeof backendDevice.location === 'string' ? backendDevice.location : undefined) ??
      undefined;

    const resolvedApproachRoad =
      (backendDevice.approachRoad && typeof backendDevice.approachRoad === 'object')
        ? (backendDevice.approachRoad.name ?? backendDevice.approachRoad.roadName ?? undefined)
        : (backendDevice.approachRoad ?? backendDevice.approachRoadName ?? undefined);

    return {
      id:           backendDevice.id,
      serialNumber: backendDevice.serialNumber,
      deviceType:   backendDevice.deviceType,
      poles:        Boolean(backendDevice.poles),
      ecbPresent:   Boolean(backendDevice.ecbPresent),
      placeholder:  Boolean(backendDevice.placeholder),
      notified:     backendDevice.notified !== undefined && backendDevice.notified !== null
                      ? Boolean(backendDevice.notified)
                      : true,
      latitude:     backendDevice.latitude,
      longitude:    backendDevice.longitude,
      status:       backendDevice.status,
      locationName: resolvedLocationName,
      approachRoad: resolvedApproachRoad,
      name:         resolvedLocationName ?? '',
      location:     resolvedLocationName ?? '',
      quantity:     1,
      description:  ''
    };
  }
}