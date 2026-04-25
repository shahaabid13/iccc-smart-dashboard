import {
  ANIMATION_MODULE_TYPE,
  DOCUMENT,
  HttpClient,
  HttpParams,
  Inject,
  Injectable,
  RendererFactory2,
  RuntimeError,
  ViewEncapsulation,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-WPHUMBF2.js";

// node_modules/@angular/animations/fesm2022/private_export.mjs
var AnimationMetadataType;
(function(AnimationMetadataType2) {
  AnimationMetadataType2[AnimationMetadataType2["State"] = 0] = "State";
  AnimationMetadataType2[AnimationMetadataType2["Transition"] = 1] = "Transition";
  AnimationMetadataType2[AnimationMetadataType2["Sequence"] = 2] = "Sequence";
  AnimationMetadataType2[AnimationMetadataType2["Group"] = 3] = "Group";
  AnimationMetadataType2[AnimationMetadataType2["Animate"] = 4] = "Animate";
  AnimationMetadataType2[AnimationMetadataType2["Keyframes"] = 5] = "Keyframes";
  AnimationMetadataType2[AnimationMetadataType2["Style"] = 6] = "Style";
  AnimationMetadataType2[AnimationMetadataType2["Trigger"] = 7] = "Trigger";
  AnimationMetadataType2[AnimationMetadataType2["Reference"] = 8] = "Reference";
  AnimationMetadataType2[AnimationMetadataType2["AnimateChild"] = 9] = "AnimateChild";
  AnimationMetadataType2[AnimationMetadataType2["AnimateRef"] = 10] = "AnimateRef";
  AnimationMetadataType2[AnimationMetadataType2["Query"] = 11] = "Query";
  AnimationMetadataType2[AnimationMetadataType2["Stagger"] = 12] = "Stagger";
})(AnimationMetadataType || (AnimationMetadataType = {}));
function trigger(name, definitions) {
  return { type: AnimationMetadataType.Trigger, name, definitions, options: {} };
}
function animate(timings, styles = null) {
  return { type: AnimationMetadataType.Animate, styles, timings };
}
function sequence(steps, options = null) {
  return { type: AnimationMetadataType.Sequence, steps, options };
}
function style(tokens) {
  return { type: AnimationMetadataType.Style, styles: tokens, offset: null };
}
function transition(stateChangeExpr, steps, options = null) {
  return { type: AnimationMetadataType.Transition, expr: stateChangeExpr, animation: steps, options };
}

// node_modules/@angular/animations/fesm2022/animations.mjs
var AnimationBuilder = class _AnimationBuilder {
  static \u0275fac = function AnimationBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AnimationBuilder)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _AnimationBuilder,
    factory: () => (() => inject(BrowserAnimationBuilder))(),
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnimationBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: () => inject(BrowserAnimationBuilder)
    }]
  }], null, null);
})();
var AnimationFactory = class {
};
var BrowserAnimationBuilder = class _BrowserAnimationBuilder extends AnimationBuilder {
  animationModuleType = inject(ANIMATION_MODULE_TYPE, {
    optional: true
  });
  _nextAnimationId = 0;
  _renderer;
  constructor(rootRenderer, doc) {
    super();
    const typeData = {
      id: "0",
      encapsulation: ViewEncapsulation.None,
      styles: [],
      data: {
        animation: []
      }
    };
    this._renderer = rootRenderer.createRenderer(doc.body, typeData);
    if (this.animationModuleType === null && !isAnimationRenderer(this._renderer)) {
      throw new RuntimeError(3600, (typeof ngDevMode === "undefined" || ngDevMode) && "Angular detected that the `AnimationBuilder` was injected, but animation support was not enabled. Please make sure that you enable animations in your application by calling `provideAnimations()` or `provideAnimationsAsync()` function.");
    }
  }
  build(animation2) {
    const id = this._nextAnimationId;
    this._nextAnimationId++;
    const entry = Array.isArray(animation2) ? sequence(animation2) : animation2;
    issueAnimationCommand(this._renderer, null, id, "register", [entry]);
    return new BrowserAnimationFactory(id, this._renderer);
  }
  static \u0275fac = function BrowserAnimationBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BrowserAnimationBuilder)(\u0275\u0275inject(RendererFactory2), \u0275\u0275inject(DOCUMENT));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _BrowserAnimationBuilder,
    factory: _BrowserAnimationBuilder.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrowserAnimationBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: RendererFactory2
  }, {
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var BrowserAnimationFactory = class extends AnimationFactory {
  _id;
  _renderer;
  constructor(_id, _renderer) {
    super();
    this._id = _id;
    this._renderer = _renderer;
  }
  create(element, options) {
    return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
  }
};
var RendererAnimationPlayer = class {
  id;
  element;
  _renderer;
  parentPlayer = null;
  _started = false;
  constructor(id, element, options, _renderer) {
    this.id = id;
    this.element = element;
    this._renderer = _renderer;
    this._command("create", options);
  }
  _listen(eventName, callback) {
    return this._renderer.listen(this.element, `@@${this.id}:${eventName}`, callback);
  }
  _command(command, ...args) {
    issueAnimationCommand(this._renderer, this.element, this.id, command, args);
  }
  onDone(fn) {
    this._listen("done", fn);
  }
  onStart(fn) {
    this._listen("start", fn);
  }
  onDestroy(fn) {
    this._listen("destroy", fn);
  }
  init() {
    this._command("init");
  }
  hasStarted() {
    return this._started;
  }
  play() {
    this._command("play");
    this._started = true;
  }
  pause() {
    this._command("pause");
  }
  restart() {
    this._command("restart");
  }
  finish() {
    this._command("finish");
  }
  destroy() {
    this._command("destroy");
  }
  reset() {
    this._command("reset");
    this._started = false;
  }
  setPosition(p) {
    this._command("setPosition", p);
  }
  getPosition() {
    return unwrapAnimationRenderer(this._renderer)?.engine?.players[this.id]?.getPosition() ?? 0;
  }
  totalTime = 0;
};
function issueAnimationCommand(renderer, element, id, command, args) {
  renderer.setProperty(element, `@@${id}:${command}`, args);
}
function unwrapAnimationRenderer(renderer) {
  const type = renderer.\u0275type;
  if (type === 0) {
    return renderer;
  } else if (type === 1) {
    return renderer.animationRenderer;
  }
  return null;
}
function isAnimationRenderer(renderer) {
  const type = renderer.\u0275type;
  return type === 0 || type === 1;
}

// src/app/services/parkadda.service.ts
var ParkaddaService = class _ParkaddaService {
  http;
  baseUrl = "/api";
  selectedParking = null;
  constructor(http) {
    this.http = http;
  }
  setSelectedParking(parking) {
    this.selectedParking = parking;
  }
  getSelectedParking() {
    return this.selectedParking;
  }
  /**
   * =====================================================
   * PARKING MANAGEMENT ENDPOINTS
   * =====================================================
   */
  /**
   * Get list of parking locations for the authenticated host/admin
   */
  getParkingList() {
    return this.http.post(`${this.baseUrl}/parking/getParkingListForHost/`, {});
  }
  /**
   * Get rangers assigned to a specific parking location
   */
  getRangersByParking(parkingTableId) {
    const params = new HttpParams().set("parking_table_id", parkingTableId.toString());
    return this.http.get(`${this.baseUrl}/trooper/getRangersByParking`, { params });
  }
  /**
   * Get master parking size data for vehicle type capacities
   */
  getMasterParkingSizeData(parkingTableId) {
    const params = new HttpParams().set("parking_table_id", parkingTableId.toString());
    return this.http.get(`${this.baseUrl}/trooper/getMasterParkingSizeData`, { params });
  }
  /**
   * =====================================================
   * VEHICLE REPORTS ENDPOINTS
   * =====================================================
   */
  /**
   * Search vehicle IN reports with pagination and date filters
   */
  searchAdminVehicleInReports(filters) {
    const params = this.buildReportParams(filters);
    return this.http.get(`${this.baseUrl}/trooper/searchAdminVehicleInReports`, { params });
  }
  /**
   * Search vehicle OUT reports with pagination and date filters
   */
  searchAdminVehicleOutReports(filters) {
    const params = this.buildReportParams(filters);
    return this.http.get(`${this.baseUrl}/trooper/searchAdminVehicleOutReports`, { params });
  }
  /**
   * Search all vehicle reports with pagination and date filters
   */
  searchAdminVehicleReports(filters) {
    const params = this.buildReportParams(filters);
    return this.http.get(`${this.baseUrl}/trooper/searchAdminVehicleReports`, { params });
  }
  /**
   * Get all bookings report with pagination and date filters
   */
  getAllBookingsReport(filters) {
    const params = this.buildReportParams(filters);
    return this.http.get(`${this.baseUrl}/trooper/getAllBookingsReport`, { params });
  }
  /**
   * =====================================================
   * TRANSACTION REPORTS ENDPOINTS
   * =====================================================
   */
  /**
   * Get cash transactions report
   */
  getCashTransactions(filters) {
    const params = this.buildReportParams(filters);
    return this.http.get(`${this.baseUrl}/trooper/getCashTransactions`, { params });
  }
  /**
   * Get card transactions report
   */
  getCardTransactions(filters) {
    const params = this.buildReportParams(filters);
    return this.http.get(`${this.baseUrl}/trooper/getCardTransactions`, { params });
  }
  /**
   * Get UPI transactions report
   */
  getUPITransactions(filters) {
    const params = this.buildReportParams(filters);
    return this.http.get(`${this.baseUrl}/trooper/getUPITransactions`, { params });
  }
  /**
   * Get Fastag transactions report
   */
  getFastagTransactions(filters) {
    const params = this.buildReportParams(filters);
    return this.http.get(`${this.baseUrl}/trooper/getFastagTransactions`, { params });
  }
  /**
   * Get payment gateway transactions report
   */
  getPaymentGatewayTransactions(filters) {
    const params = this.buildReportParams(filters);
    return this.http.get(`${this.baseUrl}/trooper/getPaymentGatewayTransactions`, { params });
  }
  /**
   * =====================================================
   * MONTHLY PASSES & EXEMPTIONS ENDPOINTS
   * =====================================================
   */
  /**
   * Get monthly passes for admin with pagination and date filters
   */
  getMonthlyPassesForAdmin(filters) {
    const params = this.buildReportParams(filters);
    return this.http.get(`${this.baseUrl}/trooper/getMonthlyPassesForAdmin`, { params });
  }
  /**
   * Get exempted vehicles for a parking location
   */
  getExemptedVehicles(filters) {
    const params = this.buildReportParams(filters);
    return this.http.get(`${this.baseUrl}/trooper/getExemptedVehicles`, { params });
  }
  /**
   * =====================================================
   * OCCUPANCY ENDPOINTS
   * =====================================================
   */
  /**
   * Get current parking occupancy
   */
  getParkingOccupancy(parkingTableId) {
    const params = new HttpParams().set("parking_table_id", parkingTableId.toString());
    return this.http.get(`${this.baseUrl}/trooper/getParkingOccupancy`, { params });
  }
  /**
   * Reset parking occupancy to zero
   */
  resetParkingOccupancy(parkingTableId) {
    const params = new HttpParams().set("parking_table_id", parkingTableId.toString());
    return this.http.post(`${this.baseUrl}/trooper/resetParkingOccupancy`, {}, { params });
  }
  /**
   * Reset occupancy for a specific vehicle type
   */
  resetVehicleTypeOccupancy(parkingTableId, vehicleTypeId) {
    const params = new HttpParams().set("parking_table_id", parkingTableId.toString()).set("vehicle_type_id", vehicleTypeId.toString());
    return this.http.post(`${this.baseUrl}/trooper/resetVehicleTypeOccupancy`, {}, { params });
  }
  /**
   * =====================================================
   * PRICING ENDPOINTS
   * =====================================================
   */
  /**
   * Get vehicle types for pricing
   */
  getVehicleTypesFromPricing(parkingTableId) {
    const params = new HttpParams().set("parking_table_id", parkingTableId.toString());
    return this.http.get(`${this.baseUrl}/trooper/getVehicleTypesFromPricing`, { params });
  }
  /**
   * Get all pricing report with pagination
   */
  getAllPricingReport(filters) {
    const params = this.buildReportParams(filters);
    return this.http.get(`${this.baseUrl}/trooper/getAllPricingReport`, { params });
  }
  /**
   * Get pricing report for a specific vehicle type
   */
  getPricingReport(vehicleTypeId, parkingTableId) {
    const params = new HttpParams().set("parking_table_id", parkingTableId.toString());
    return this.http.get(`${this.baseUrl}/trooper/getPricingReport/${vehicleTypeId}`, { params });
  }
  /**
   * =====================================================
   * HELPER METHODS
   * =====================================================
   */
  /**
   * Build HttpParams from ReportFilters object
   * Converts filter object to query parameters
   */
  buildReportParams(filters) {
    let params = new HttpParams();
    params = params.set("page", (filters.page || 1).toString());
    params = params.set("page_size", (filters.page_size || 10).toString());
    params = params.set("parking_table_id", filters.parking_table_id.toString());
    if (filters.from_date_filter) {
      params = params.set("from_date_filter", filters.from_date_filter);
    }
    if (filters.to_date_filter) {
      params = params.set("to_date_filter", filters.to_date_filter);
    }
    return params;
  }
  static \u0275fac = function ParkaddaService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ParkaddaService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ParkaddaService, factory: _ParkaddaService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ParkaddaService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  trigger,
  animate,
  style,
  transition,
  ParkaddaService
};
/*! Bundled license information:

@angular/animations/fesm2022/private_export.mjs:
@angular/animations/fesm2022/animations.mjs:
  (**
   * @license Angular v20.3.17
   * (c) 2010-2025 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-4EWWK26B.js.map
