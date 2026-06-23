import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, throwError } from 'rxjs';
import { InventoryItem, InventoryItemPayload } from '../models/inventory-item';

@Injectable({ providedIn: 'root' })
export class InventoryService {

  getByAgency(userAgency: string) {
    throw new Error('Method not implemented.');
  }

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

  create(payload: InventoryItemPayload): Observable<InventoryItem> {
    const backendPayload = this.transformToBackendFormat(payload);
    return this.http.post<InventoryItem>(this.apiUrl, backendPayload).pipe(
      map(device => this.transformDevice(device)),
      catchError((error) => {
        console.error('Failed to create device:', error);
        throw error;
      })
    );
  }

  update(id: string | number, patch: Partial<InventoryItem>): Observable<InventoryItem> {
    const backendPayload = this.transformToBackendFormat(patch);
    return this.http.put<InventoryItem>(`${this.apiUrl}/${id}`, backendPayload).pipe(
      map(device => this.transformDevice(device)),
      catchError((error) => {
        const errMsg = (error && (error.error?.message || error.message || '')) as string;
        if (error && error.status === 500 && errMsg.includes("Request method 'PUT' is not supported")) {
          console.warn(`PUT not supported for /api/devices/${id}, retrying with POST`);
          return this.http.post<InventoryItem>(`${this.apiUrl}/${id}`, backendPayload).pipe(
            map(device => this.transformDevice(device)),
            catchError((err2) => {
              console.error(`POST fallback failed for device ${id}:`, err2);
              return throwError(() => err2);
            })
          );
        }
        console.error(`Failed to update device ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Failed to delete device ${id}:`, error);
        throw error;
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

  updateNotified(id: string | number, notified: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/notified?value=${notified}`, {}).pipe(
      catchError((error) => {
        console.error(`Failed to update notified for device ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  private transformDevice(backendDevice: any): InventoryItem {
    const resolvedLocationName =
      backendDevice.locationName ??
      (backendDevice.location && (backendDevice.location.name || backendDevice.location.locationName)) ??
      (typeof backendDevice.location === 'string' ? backendDevice.location : undefined) ??
      undefined;

    const resolvedApproachRoad =
      (backendDevice.approachRoad && typeof backendDevice.approachRoad === 'object')
        ? (backendDevice.approachRoad.name ?? backendDevice.approachRoad.approachRoadName ?? undefined)
        : (backendDevice.approachRoad ?? backendDevice.approachRoadName ?? undefined);

    return {
      id:           backendDevice.id,
      serialNumber: backendDevice.serialNumber,
      deviceType:   backendDevice.deviceType,
      poles:        Boolean(backendDevice.poles),        // ← Boolean() coercion
      ecbPresent:   Boolean(backendDevice.ecbPresent),   // ← Boolean() coercion
      placeholder:  Boolean(backendDevice.placeholder),  // ← Boolean() coercion
notified: backendDevice.notified !== undefined && backendDevice.notified !== null
  ? Boolean(backendDevice.notified)
  : true,  // ← was missing ": true,"
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

  private transformToBackendFormat(frontendDevice: any): any {
    return {
      serialNumber: frontendDevice.serialNumber,
      deviceType:   frontendDevice.deviceType,
      poles:        frontendDevice.poles,
      ecbPresent:   frontendDevice.ecbPresent,
      placeholder:  frontendDevice.placeholder,
      latitude:     frontendDevice.latitude,
      longitude:    frontendDevice.longitude,
      status:       frontendDevice.status,
      locationName: frontendDevice.locationName || frontendDevice.location || frontendDevice.name,
      ...(typeof frontendDevice.approachRoad === 'string'
        ? { approachRoadName: frontendDevice.approachRoad || null }
        : { approachRoad: frontendDevice.approachRoad ?? null })
    };
  }
}