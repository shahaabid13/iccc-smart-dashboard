import {
  ApiService
} from "./chunk-IQHQ2JGN.js";
import {
  HttpClient
} from "./chunk-6LIGNQX5.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-OXNL7LB6.js";

// src/app/services/devices.service.ts
var DevicesService = class _DevicesService {
  api;
  http;
  apiUrl = "/api/devices";
  constructor(api, http) {
    this.api = api;
    this.http = http;
  }
  /** ✅ Get all devices */
  getAllDevices() {
    return this.http.get(this.apiUrl);
  }
  deleteDevice(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  /** ✅ Get device by serial number */
  getBySerial(serial) {
    return this.api.get(`/devices/by-serial/${encodeURIComponent(serial)}`);
  }
  /** ✅ Search devices by filters */
  search(location, type, status) {
    const params = { location };
    if (type)
      params["type"] = type;
    if (status)
      params["status"] = status;
    return this.api.get("/api/devices/search", params);
  }
  /** ✅ Update serial number for a device */
  updateSerial(deviceId, newSerial) {
    return this.api.put(`/devices/${deviceId}/update-serial`, { newSerial });
  }
  /** ✅ Download filtered results as Excel / Word / PDF */
  downloadSearchResults(location, type, status, format = "excel") {
    const params = { location, format };
    if (type)
      params["type"] = type;
    if (status)
      params["status"] = status;
    return this.api.get("/devices/search/download", params, {
      responseType: "blob"
      // fix TypeScript error
    });
  }
  static \u0275fac = function DevicesService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DevicesService)(\u0275\u0275inject(ApiService), \u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DevicesService, factory: _DevicesService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DevicesService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: ApiService }, { type: HttpClient }], null);
})();

export {
  DevicesService
};
//# sourceMappingURL=chunk-QAOD4PKB.js.map
