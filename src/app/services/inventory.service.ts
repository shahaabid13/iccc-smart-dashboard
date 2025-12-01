import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, throwError } from 'rxjs';
import { InventoryItem, InventoryItemPayload } from '../models/inventory-item';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  getByAgency(userAgency: string) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080/api/devices';

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

  // Try HTTP PUT first (RESTful). If the backend doesn't support PUT (some servers
  // accept POST for updates), gracefully retry with POST to avoid breaking the UI.
  return this.http.put<InventoryItem>(`${this.apiUrl}/${id}`, backendPayload).pipe(
    map(device => this.transformDevice(device)),
    catchError((error) => {
      // If backend explicitly rejects PUT (common message from Spring), attempt POST fallback
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

 private transformDevice(backendDevice: any): InventoryItem {
  // Resolve locationName from multiple possible backend shapes
  const resolvedLocationName =
    backendDevice.locationName ??
    (backendDevice.location && (backendDevice.location.name || backendDevice.location.locationName)) ??
    (typeof backendDevice.location === 'string' ? backendDevice.location : undefined) ??
    undefined;

  // Resolve approachRoad as a displayable string when possible
  const resolvedApproachRoad =
    (backendDevice.approachRoad && typeof backendDevice.approachRoad === 'object')
      ? (backendDevice.approachRoad.name ?? backendDevice.approachRoad.approachRoadName ?? undefined)
      : (backendDevice.approachRoad ?? backendDevice.approachRoadName ?? undefined);

  return {
    id: backendDevice.id,
    serialNumber: backendDevice.serialNumber,
    deviceType: backendDevice.deviceType,
    poles: backendDevice.poles,
    ecbPresent: backendDevice.ecbPresent,
    placeholder: backendDevice.placeholder,
    latitude: backendDevice.latitude,
    longitude: backendDevice.longitude,
    status: backendDevice.status,
    locationName: resolvedLocationName,
    approachRoad: resolvedApproachRoad,

    // Frontend compatibility fields
    name: resolvedLocationName ?? '',
    location: resolvedLocationName ?? '',
    quantity: 1,
    description: '' // Default empty description
  };
}

private transformToBackendFormat(frontendDevice: any): any {
  return {
    serialNumber: frontendDevice.serialNumber,
    deviceType: frontendDevice.deviceType,
    poles: frontendDevice.poles,
    ecbPresent: frontendDevice.ecbPresent,
    placeholder: frontendDevice.placeholder,
    latitude: frontendDevice.latitude,
    longitude: frontendDevice.longitude,
    status: frontendDevice.status,
    locationName: frontendDevice.locationName || frontendDevice.location || frontendDevice.name,
    // Handle approachRoad in a backend-friendly way:
    // - If front-end gives a plain string (user-typed name), send `approachRoadName` so
    //   the backend can lookup or create the relationship server-side.
    // - If front-end provides an object with an `id`, forward the object so backend
    //   can associate by id. Avoid sending an unsaved object with only `name` (transient).
    ...(typeof frontendDevice.approachRoad === 'string'
      ? { approachRoadName: frontendDevice.approachRoad || null }
      : { approachRoad: frontendDevice.approachRoad ?? null })
  };
}

}
