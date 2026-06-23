import {
  ApiService
} from "./chunk-IQHQ2JGN.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-OXNL7LB6.js";

// src/app/services/locations.service.ts
var LocationsService = class _LocationsService {
  api;
  constructor(api) {
    this.api = api;
  }
  getAll() {
    return this.api.get("/locations");
  }
  searchByName(name) {
    return this.api.get("/locations/search", { name });
  }
  static \u0275fac = function LocationsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LocationsService)(\u0275\u0275inject(ApiService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LocationsService, factory: _LocationsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LocationsService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: ApiService }], null);
})();

export {
  LocationsService
};
//# sourceMappingURL=chunk-JILHC6PV.js.map
