import {
  HttpClient,
  Injectable,
  catchError,
  map,
  of,
  setClassMetadata,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-WPHUMBF2.js";
import {
  __spreadValues
} from "./chunk-YP43Q66R.js";

// src/app/services/inventory.service.ts
var InventoryService = class _InventoryService {
  http;
  getByAgency(userAgency) {
    throw new Error("Method not implemented.");
  }
  apiUrl = "/api/devices";
  constructor(http) {
    this.http = http;
  }
  getAll() {
    return this.http.get(this.apiUrl).pipe(map((devices) => devices.map((device) => this.transformDevice(device))), catchError((error) => {
      console.error("Failed to load devices:", error);
      return of([]);
    }));
  }
  getById(id) {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(map((device) => this.transformDevice(device)), catchError((error) => {
      console.error(`Failed to fetch device ${id}:`, error);
      return of(void 0);
    }));
  }
  create(payload) {
    const backendPayload = this.transformToBackendFormat(payload);
    return this.http.post(this.apiUrl, backendPayload).pipe(map((device) => this.transformDevice(device)), catchError((error) => {
      console.error("Failed to create device:", error);
      throw error;
    }));
  }
  update(id, patch) {
    const backendPayload = this.transformToBackendFormat(patch);
    return this.http.put(`${this.apiUrl}/${id}`, backendPayload).pipe(map((device) => this.transformDevice(device)), catchError((error) => {
      const errMsg = error && (error.error?.message || error.message || "");
      if (error && error.status === 500 && errMsg.includes("Request method 'PUT' is not supported")) {
        console.warn(`PUT not supported for /api/devices/${id}, retrying with POST`);
        return this.http.post(`${this.apiUrl}/${id}`, backendPayload).pipe(map((device) => this.transformDevice(device)), catchError((err2) => {
          console.error(`POST fallback failed for device ${id}:`, err2);
          return throwError(() => err2);
        }));
      }
      console.error(`Failed to update device ${id}:`, error);
      return throwError(() => error);
    }));
  }
  delete(id) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(catchError((error) => {
      console.error(`Failed to delete device ${id}:`, error);
      throw error;
    }));
  }
  transformDevice(backendDevice) {
    const resolvedLocationName = backendDevice.locationName ?? (backendDevice.location && (backendDevice.location.name || backendDevice.location.locationName)) ?? (typeof backendDevice.location === "string" ? backendDevice.location : void 0) ?? void 0;
    const resolvedApproachRoad = backendDevice.approachRoad && typeof backendDevice.approachRoad === "object" ? backendDevice.approachRoad.name ?? backendDevice.approachRoad.approachRoadName ?? void 0 : backendDevice.approachRoad ?? backendDevice.approachRoadName ?? void 0;
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
      name: resolvedLocationName ?? "",
      location: resolvedLocationName ?? "",
      quantity: 1,
      description: ""
      // Default empty description
    };
  }
  transformToBackendFormat(frontendDevice) {
    return __spreadValues({
      serialNumber: frontendDevice.serialNumber,
      deviceType: frontendDevice.deviceType,
      poles: frontendDevice.poles,
      ecbPresent: frontendDevice.ecbPresent,
      placeholder: frontendDevice.placeholder,
      latitude: frontendDevice.latitude,
      longitude: frontendDevice.longitude,
      status: frontendDevice.status,
      locationName: frontendDevice.locationName || frontendDevice.location || frontendDevice.name
    }, typeof frontendDevice.approachRoad === "string" ? { approachRoadName: frontendDevice.approachRoad || null } : { approachRoad: frontendDevice.approachRoad ?? null });
  }
  static \u0275fac = function InventoryService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InventoryService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InventoryService, factory: _InventoryService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InventoryService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  InventoryService
};
//# sourceMappingURL=chunk-LMI5OJGT.js.map
