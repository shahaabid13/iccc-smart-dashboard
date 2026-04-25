import {
  ParkaddaService,
  animate,
  style,
  transition,
  trigger
} from "./chunk-4EWWK26B.js";
import {
  ParkaddaAuthService
} from "./chunk-BWDQ2XAU.js";
import {
  ActivatedRoute
} from "./chunk-AAXJDYQS.js";
import "./chunk-BIRBC32G.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-4AUWEQTR.js";
import {
  CommonModule,
  Component,
  NgClass,
  NgIf,
  Subject,
  setClassMetadata,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WPHUMBF2.js";
import "./chunk-YP43Q66R.js";

// src/app/components/admin/parkadda/analytics-dashboard/analytics-dashboard.component.ts
function AnalyticsDashboardComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.error, " ");
  }
}
function AnalyticsDashboardComponent_div_7_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "label");
    \u0275\u0275text(2, "Parking Location:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 12);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.selectedParking.parking_name);
  }
}
function AnalyticsDashboardComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 9)(2, "label");
    \u0275\u0275text(3, "From Date:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 10);
    \u0275\u0275twoWayListener("ngModelChange", function AnalyticsDashboardComponent_div_7_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.dateFrom, $event) || (ctx_r0.dateFrom = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function AnalyticsDashboardComponent_div_7_Template_input_change_4_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDateRangeChange());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 9)(6, "label");
    \u0275\u0275text(7, "To Date:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 10);
    \u0275\u0275twoWayListener("ngModelChange", function AnalyticsDashboardComponent_div_7_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.dateTo, $event) || (ctx_r0.dateTo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function AnalyticsDashboardComponent_div_7_Template_input_change_8_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDateRangeChange());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, AnalyticsDashboardComponent_div_7_div_9_Template, 5, 1, "div", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.dateFrom);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.dateTo);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.selectedParking);
  }
}
function AnalyticsDashboardComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "p");
    \u0275\u0275text(2, "Loading dashboard data...");
    \u0275\u0275elementEnd()();
  }
}
function AnalyticsDashboardComponent_div_9_div_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r0.occupancyData.occupied_slots, "/", ctx_r0.occupancyData.total_capacity, " ");
  }
}
function AnalyticsDashboardComponent_div_9_div_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "h3");
    \u0275\u0275text(2, "Parking Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 28)(4, "div", 29)(5, "label");
    \u0275\u0275text(6, "Parking Name:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 29)(10, "label");
    \u0275\u0275text(11, "Total Capacity:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 29)(15, "label");
    \u0275\u0275text(16, "Current Occupancy:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 29)(20, "label");
    \u0275\u0275text(21, "Available Slots:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 29)(25, "label");
    \u0275\u0275text(26, "Occupancy Rate:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.selectedParking == null ? null : ctx_r0.selectedParking.parking_name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.occupancyData.total_capacity, " Slots");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.occupancyData.occupied_slots, " Vehicles");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.occupancyData.total_capacity - ctx_r0.occupancyData.occupied_slots, " Slots");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.occupancyData.occupancy_percentage || 0, "%");
  }
}
function AnalyticsDashboardComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 15)(2, "div", 16)(3, "h3");
    \u0275\u0275text(4, "Current Occupancy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 17);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 18);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 16)(10, "h3");
    \u0275\u0275text(11, "Total Vehicles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 19);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 18);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 16)(17, "h3");
    \u0275\u0275text(18, "Total Revenue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 19);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p", 18);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 16)(24, "h3");
    \u0275\u0275text(25, "Capacity");
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, AnalyticsDashboardComponent_div_9_div_26_Template, 2, 2, "div", 20);
    \u0275\u0275elementStart(27, "p", 18);
    \u0275\u0275text(28, "Current/Total Slots");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "div", 21)(30, "div", 22)(31, "h3");
    \u0275\u0275text(32, "Occupancy Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 23)(34, "p");
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 24);
    \u0275\u0275element(37, "div", 25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "div", 22)(39, "h3");
    \u0275\u0275text(40, "Vehicle Movement");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 23)(42, "p");
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "p");
    \u0275\u0275text(45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "p");
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(48, "div", 22)(49, "h3");
    \u0275\u0275text(50, "Revenue Breakdown");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "div", 23)(52, "p");
    \u0275\u0275text(53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "p");
    \u0275\u0275text(55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "p");
    \u0275\u0275text(57);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(58, AnalyticsDashboardComponent_div_9_div_58_Template, 29, 5, "div", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", ctx_r0.getOccupancyStatusClass());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.averageOccupancy.toFixed(1), "% ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.getOccupancyStatus(), " Occupancy");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.totalVehicles);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.vehicleInCount, " In, ", ctx_r0.vehicleOutCount, " Out");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u20B9", ctx_r0.totalRevenue.toLocaleString("en-IN"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.totalTransactions, " Transactions");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.occupancyData);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("Occupancy: ", (ctx_r0.occupancyData == null ? null : ctx_r0.occupancyData.occupancy_percentage) || 0, "%");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", (ctx_r0.occupancyData == null ? null : ctx_r0.occupancyData.occupancy_percentage) || 0, "%");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Vehicles In: ", ctx_r0.vehicleInCount);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Vehicles Out: ", ctx_r0.vehicleOutCount);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Net Movement: ", ctx_r0.vehicleInCount - ctx_r0.vehicleOutCount);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Total Revenue: \u20B9", ctx_r0.totalRevenue.toLocaleString("en-IN"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Total Transactions: ", ctx_r0.totalTransactions);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Avg Transaction: \u20B9", ctx_r0.totalTransactions > 0 ? (ctx_r0.totalRevenue / ctx_r0.totalTransactions).toFixed(2) : 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.occupancyData);
  }
}
var AnalyticsDashboardComponent = class _AnalyticsDashboardComponent {
  parkaddaService;
  authService;
  route;
  selectedParking = null;
  occupancyData = null;
  loading = false;
  error = null;
  dateFrom = this.getDefaultFromDate();
  dateTo = this.getDefaultToDate();
  selectedMetric = "occupancy";
  // Dashboard metrics
  totalVehicles = 0;
  totalTransactions = 0;
  totalRevenue = 0;
  vehicleInCount = 0;
  vehicleOutCount = 0;
  averageOccupancy = 0;
  peakHour = "";
  vehicleChartData = null;
  transactionChartData = null;
  occupancyChartData = null;
  destroy$ = new Subject();
  constructor(parkaddaService, authService, route) {
    this.parkaddaService = parkaddaService;
    this.authService = authService;
    this.route = route;
  }
  ngOnInit() {
    this.loadDashboardData();
    if (!this.selectedParking) {
      this.error = "Please select a parking location first";
      return;
    }
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (params["from_date"]) {
        this.dateFrom = params["from_date"];
      }
      if (params["to_date"]) {
        this.dateTo = params["to_date"];
      }
      this.loadDashboardData();
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadDashboardData() {
    if (!this.selectedParking)
      return;
    this.loading = true;
    this.error = null;
    this.parkaddaService.getParkingOccupancy(this.selectedParking.parking_table_id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.occupancyData = data;
        this.averageOccupancy = data.occupancy_percentage || 0;
      },
      error: (err) => console.error("Error loading occupancy:", err)
    });
    this.loadVehicleReports();
    this.loadTransactionReports();
  }
  loadVehicleReports() {
    if (!this.selectedParking)
      return;
    const params = {
      page: 1,
      page_size: 1,
      parking_table_id: this.selectedParking.parking_table_id,
      from_date_filter: this.dateFrom,
      to_date_filter: this.dateTo
    };
    this.parkaddaService.searchAdminVehicleInReports(params).pipe(takeUntil(this.destroy$)).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.vehicleInCount = response.data?.results?.length || 0;
        this.totalVehicles += this.vehicleInCount;
      },
      error: (err) => console.error("Error loading vehicle in reports:", err)
    });
    this.parkaddaService.searchAdminVehicleOutReports(params).pipe(takeUntil(this.destroy$)).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.vehicleOutCount = response.data?.results?.length || 0;
        this.totalVehicles += this.vehicleOutCount;
      },
      error: (err) => console.error("Error loading vehicle out reports:", err)
    });
  }
  loadTransactionReports() {
    if (!this.selectedParking)
      return;
    const params = {
      page: 1,
      page_size: 1,
      parking_table_id: this.selectedParking.parking_table_id,
      from_date_filter: this.dateFrom,
      to_date_filter: this.dateTo
    };
    this.parkaddaService.getCashTransactions(params).pipe(takeUntil(this.destroy$)).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.totalTransactions += response.data?.results?.length || 0;
        this.totalRevenue += this.calculateRevenue(response.data);
      },
      error: (err) => console.error("Error loading cash transactions:", err)
    });
    this.parkaddaService.getCardTransactions(params).pipe(takeUntil(this.destroy$)).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.totalTransactions += response.data?.results?.length || 0;
        this.totalRevenue += this.calculateRevenue(response.data);
      },
      error: (err) => console.error("Error loading card transactions:", err)
    });
    this.parkaddaService.getUPITransactions(params).pipe(takeUntil(this.destroy$)).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.totalTransactions += response.data?.results?.length || 0;
        this.totalRevenue += this.calculateRevenue(response.data);
      },
      error: (err) => console.error("Error loading UPI transactions:", err),
      complete: () => {
        this.loading = false;
      }
    });
  }
  calculateRevenue(data) {
    if (!data.results)
      return 0;
    return data.results.reduce((sum, item) => {
      return sum + (item.amount || item.transaction_amount || 0);
    }, 0);
  }
  onDateRangeChange() {
    this.loadDashboardData();
  }
  getOccupancyStatus() {
    if (this.averageOccupancy < 30)
      return "Low";
    if (this.averageOccupancy < 70)
      return "Medium";
    return "High";
  }
  getOccupancyStatusClass() {
    if (this.averageOccupancy < 30)
      return "status-low";
    if (this.averageOccupancy < 70)
      return "status-medium";
    return "status-high";
  }
  refreshData() {
    this.loadDashboardData();
  }
  getDefaultFromDate() {
    const date = /* @__PURE__ */ new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split("T")[0];
  }
  getDefaultToDate() {
    return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  }
  static \u0275fac = function AnalyticsDashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AnalyticsDashboardComponent)(\u0275\u0275directiveInject(ParkaddaService), \u0275\u0275directiveInject(ParkaddaAuthService), \u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AnalyticsDashboardComponent, selectors: [["app-analytics-dashboard"]], decls: 10, vars: 4, consts: [[1, "analytics-dashboard"], [1, "dashboard-header"], [1, "btn-refresh", 3, "click"], ["class", "error-message", 4, "ngIf"], ["class", "dashboard-filters", 4, "ngIf"], ["class", "loading-spinner", 4, "ngIf"], ["class", "dashboard-content", 4, "ngIf"], [1, "error-message"], [1, "dashboard-filters"], [1, "filter-group"], ["type", "date", 1, "date-input", 3, "ngModelChange", "change", "ngModel"], ["class", "filter-group", 4, "ngIf"], [1, "parking-name"], [1, "loading-spinner"], [1, "dashboard-content"], [1, "metrics-grid"], [1, "metric-card"], [1, "metric-value", 3, "ngClass"], [1, "metric-label"], [1, "metric-value"], ["class", "metric-value", 4, "ngIf"], [1, "charts-section"], [1, "chart-container"], [1, "chart-placeholder"], [1, "progress-bar"], [1, "progress-fill"], ["class", "details-section", 4, "ngIf"], [1, "details-section"], [1, "details-grid"], [1, "detail-item"]], template: function AnalyticsDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Parkadda Analytics Dashboard");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2);
      \u0275\u0275listener("click", function AnalyticsDashboardComponent_Template_button_click_4_listener() {
        return ctx.refreshData();
      });
      \u0275\u0275text(5, "Refresh Data");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(6, AnalyticsDashboardComponent_div_6_Template, 2, 1, "div", 3)(7, AnalyticsDashboardComponent_div_7_Template, 10, 3, "div", 4)(8, AnalyticsDashboardComponent_div_8_Template, 3, 0, "div", 5)(9, AnalyticsDashboardComponent_div_9_Template, 59, 19, "div", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ctx.error);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.error);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && !ctx.error);
    }
  }, dependencies: [CommonModule, NgClass, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.analytics-dashboard[_ngcontent-%COMP%] {\n  padding: 20px;\n  background-color: #f5f5f5;\n  min-height: 100vh;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 30px;\n  padding: 20px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 28px;\n  color: #333;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-header[_ngcontent-%COMP%]   .btn-refresh[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background-color: #007bff;\n  color: white;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: background-color 0.3s;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-header[_ngcontent-%COMP%]   .btn-refresh[_ngcontent-%COMP%]:hover {\n  background-color: #0056b3;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  padding: 15px;\n  background-color: #f8d7da;\n  color: #721c24;\n  border: 1px solid #f5c6cb;\n  border-radius: 4px;\n  margin-bottom: 20px;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  margin-bottom: 30px;\n  padding: 20px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  flex-wrap: wrap;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-filters[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-filters[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #333;\n  font-size: 14px;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-filters[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]   .date-input[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n  width: 150px;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-filters[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]   .date-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #007bff;\n  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-filters[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]   .parking-name[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  background-color: #e7f3ff;\n  border-radius: 4px;\n  color: #333;\n  font-weight: 500;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 100px 20px;\n  text-align: center;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #666;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n  margin-bottom: 30px;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 25px;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  transition: transform 0.3s, box-shadow 0.3s;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 15px 0;\n  font-size: 16px;\n  color: #666;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%] {\n  font-size: 36px;\n  font-weight: 700;\n  margin-bottom: 10px;\n  color: #333;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%]   .metric-value.status-low[_ngcontent-%COMP%] {\n  color: #28a745;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%]   .metric-value.status-medium[_ngcontent-%COMP%] {\n  color: #ffc107;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%]   .metric-value.status-high[_ngcontent-%COMP%] {\n  color: #dc3545;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%]   .metric-label[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 12px;\n  color: #999;\n  font-weight: 500;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .charts-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 20px;\n  margin-bottom: 30px;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .charts-section[_ngcontent-%COMP%]   .chart-container[_ngcontent-%COMP%] {\n  background: white;\n  padding: 25px;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .charts-section[_ngcontent-%COMP%]   .chart-container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 20px 0;\n  font-size: 16px;\n  color: #333;\n  font-weight: 600;\n  border-bottom: 2px solid #007bff;\n  padding-bottom: 10px;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .charts-section[_ngcontent-%COMP%]   .chart-container[_ngcontent-%COMP%]   .chart-placeholder[_ngcontent-%COMP%] {\n  min-height: 200px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 15px;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .charts-section[_ngcontent-%COMP%]   .chart-container[_ngcontent-%COMP%]   .chart-placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  color: #666;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .charts-section[_ngcontent-%COMP%]   .chart-container[_ngcontent-%COMP%]   .chart-placeholder[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 30px;\n  background-color: #e9ecef;\n  border-radius: 15px;\n  overflow: hidden;\n  margin-top: 10px;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .charts-section[_ngcontent-%COMP%]   .chart-container[_ngcontent-%COMP%]   .chart-placeholder[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%]   .progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #007bff,\n      #0056b3);\n  border-radius: 15px;\n  transition: width 0.3s;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .details-section[_ngcontent-%COMP%] {\n  background: white;\n  padding: 25px;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .details-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 20px 0;\n  font-size: 18px;\n  color: #333;\n  font-weight: 600;\n  border-bottom: 2px solid #007bff;\n  padding-bottom: 10px;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .details-section[_ngcontent-%COMP%]   .details-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 15px;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .details-section[_ngcontent-%COMP%]   .details-grid[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 15px;\n  background-color: #f9f9f9;\n  border-radius: 4px;\n  border-left: 4px solid #007bff;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .details-section[_ngcontent-%COMP%]   .details-grid[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #666;\n  font-size: 12px;\n  text-transform: uppercase;\n  margin-bottom: 5px;\n}\n.analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .details-section[_ngcontent-%COMP%]   .details-grid[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #333;\n  font-weight: 500;\n}\n@media (max-width: 768px) {\n  .analytics-dashboard[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .analytics-dashboard[_ngcontent-%COMP%]   .dashboard-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 15px;\n  }\n  .analytics-dashboard[_ngcontent-%COMP%]   .dashboard-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .analytics-dashboard[_ngcontent-%COMP%]   .dashboard-filters[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .analytics-dashboard[_ngcontent-%COMP%]   .dashboard-filters[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]   .date-input[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%] {\n    font-size: 28px;\n  }\n  .analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .charts-section[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .analytics-dashboard[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .details-section[_ngcontent-%COMP%]   .details-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=analytics-dashboard.component.css.map */"], data: { animation: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-10px)" }),
        animate("300ms ease-in", style({ opacity: 1, transform: "translateY(0)" }))
      ])
    ])
  ] } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnalyticsDashboardComponent, [{
    type: Component,
    args: [{ selector: "app-analytics-dashboard", standalone: true, imports: [CommonModule, FormsModule], animations: [
      trigger("fadeInOut", [
        transition(":enter", [
          style({ opacity: 0, transform: "translateY(-10px)" }),
          animate("300ms ease-in", style({ opacity: 1, transform: "translateY(0)" }))
        ])
      ])
    ], template: `<div class="analytics-dashboard">\r
  <div class="dashboard-header">\r
    <h2>Parkadda Analytics Dashboard</h2>\r
    <button (click)="refreshData()" class="btn-refresh">Refresh Data</button>\r
  </div>\r
\r
  <div class="error-message" *ngIf="error">\r
    {{ error }}\r
  </div>\r
\r
  <div class="dashboard-filters" *ngIf="!error">\r
    <div class="filter-group">\r
      <label>From Date:</label>\r
      <input\r
        type="date"\r
        [(ngModel)]="dateFrom"\r
        (change)="onDateRangeChange()"\r
        class="date-input"\r
      >\r
    </div>\r
\r
    <div class="filter-group">\r
      <label>To Date:</label>\r
      <input\r
        type="date"\r
        [(ngModel)]="dateTo"\r
        (change)="onDateRangeChange()"\r
        class="date-input"\r
      >\r
    </div>\r
\r
    <div class="filter-group" *ngIf="selectedParking">\r
      <label>Parking Location:</label>\r
      <span class="parking-name">{{ selectedParking.parking_name }}</span>\r
    </div>\r
  </div>\r
\r
  <div class="loading-spinner" *ngIf="loading">\r
    <p>Loading dashboard data...</p>\r
  </div>\r
\r
  <div class="dashboard-content" *ngIf="!loading && !error">\r
    <!-- Key Metrics -->\r
    <div class="metrics-grid">\r
      <div class="metric-card">\r
        <h3>Current Occupancy</h3>\r
        <div class="metric-value" [ngClass]="getOccupancyStatusClass()">\r
          {{ averageOccupancy.toFixed(1) }}%\r
        </div>\r
        <p class="metric-label">{{ getOccupancyStatus() }} Occupancy</p>\r
      </div>\r
\r
      <div class="metric-card">\r
        <h3>Total Vehicles</h3>\r
        <div class="metric-value">{{ totalVehicles }}</div>\r
        <p class="metric-label">{{ vehicleInCount }} In, {{ vehicleOutCount }} Out</p>\r
      </div>\r
\r
      <div class="metric-card">\r
        <h3>Total Revenue</h3>\r
        <div class="metric-value">\u20B9{{ totalRevenue.toLocaleString('en-IN') }}</div>\r
        <p class="metric-label">{{ totalTransactions }} Transactions</p>\r
      </div>\r
\r
      <div class="metric-card">\r
        <h3>Capacity</h3>\r
        <div class="metric-value" *ngIf="occupancyData">\r
          {{ occupancyData.occupied_slots }}/{{ occupancyData.total_capacity }}\r
        </div>\r
        <p class="metric-label">Current/Total Slots</p>\r
      </div>\r
    </div>\r
\r
    <!-- Charts Section -->\r
    <div class="charts-section">\r
      <div class="chart-container">\r
        <h3>Occupancy Status</h3>\r
        <div class="chart-placeholder">\r
          <p>Occupancy: {{ occupancyData?.occupancy_percentage || 0 }}%</p>\r
          <div class="progress-bar">\r
            <div class="progress-fill" [style.width.%]="occupancyData?.occupancy_percentage || 0"></div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="chart-container">\r
        <h3>Vehicle Movement</h3>\r
        <div class="chart-placeholder">\r
          <p>Vehicles In: {{ vehicleInCount }}</p>\r
          <p>Vehicles Out: {{ vehicleOutCount }}</p>\r
          <p>Net Movement: {{ vehicleInCount - vehicleOutCount }}</p>\r
        </div>\r
      </div>\r
\r
      <div class="chart-container">\r
        <h3>Revenue Breakdown</h3>\r
        <div class="chart-placeholder">\r
          <p>Total Revenue: \u20B9{{ totalRevenue.toLocaleString('en-IN') }}</p>\r
          <p>Total Transactions: {{ totalTransactions }}</p>\r
          <p>Avg Transaction: \u20B9{{ totalTransactions > 0 ? (totalRevenue / totalTransactions).toFixed(2) : 0 }}</p>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Parking Details -->\r
    <div class="details-section" *ngIf="occupancyData">\r
      <h3>Parking Details</h3>\r
      <div class="details-grid">\r
        <div class="detail-item">\r
          <label>Parking Name:</label>\r
          <span>{{ selectedParking?.parking_name }}</span>\r
        </div>\r
        <div class="detail-item">\r
          <label>Total Capacity:</label>\r
          <span>{{ occupancyData.total_capacity }} Slots</span>\r
        </div>\r
        <div class="detail-item">\r
          <label>Current Occupancy:</label>\r
          <span>{{ occupancyData.occupied_slots }} Vehicles</span>\r
        </div>\r
        <div class="detail-item">\r
          <label>Available Slots:</label>\r
          <span>{{ occupancyData.total_capacity - occupancyData.occupied_slots }} Slots</span>\r
        </div>\r
        <div class="detail-item">\r
          <label>Occupancy Rate:</label>\r
          <span>{{ occupancyData.occupancy_percentage || 0 }}%</span>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/components/admin/parkadda/analytics-dashboard/analytics-dashboard.component.scss */\n.analytics-dashboard {\n  padding: 20px;\n  background-color: #f5f5f5;\n  min-height: 100vh;\n}\n.analytics-dashboard .dashboard-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 30px;\n  padding: 20px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.analytics-dashboard .dashboard-header h2 {\n  margin: 0;\n  font-size: 28px;\n  color: #333;\n}\n.analytics-dashboard .dashboard-header .btn-refresh {\n  padding: 10px 20px;\n  background-color: #007bff;\n  color: white;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: background-color 0.3s;\n}\n.analytics-dashboard .dashboard-header .btn-refresh:hover {\n  background-color: #0056b3;\n}\n.analytics-dashboard .error-message {\n  padding: 15px;\n  background-color: #f8d7da;\n  color: #721c24;\n  border: 1px solid #f5c6cb;\n  border-radius: 4px;\n  margin-bottom: 20px;\n}\n.analytics-dashboard .dashboard-filters {\n  display: flex;\n  gap: 20px;\n  margin-bottom: 30px;\n  padding: 20px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  flex-wrap: wrap;\n}\n.analytics-dashboard .dashboard-filters .filter-group {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.analytics-dashboard .dashboard-filters .filter-group label {\n  font-weight: 600;\n  color: #333;\n  font-size: 14px;\n}\n.analytics-dashboard .dashboard-filters .filter-group .date-input {\n  padding: 8px 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n  width: 150px;\n}\n.analytics-dashboard .dashboard-filters .filter-group .date-input:focus {\n  outline: none;\n  border-color: #007bff;\n  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);\n}\n.analytics-dashboard .dashboard-filters .filter-group .parking-name {\n  padding: 8px 12px;\n  background-color: #e7f3ff;\n  border-radius: 4px;\n  color: #333;\n  font-weight: 500;\n}\n.analytics-dashboard .loading-spinner {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 100px 20px;\n  text-align: center;\n}\n.analytics-dashboard .loading-spinner p {\n  font-size: 18px;\n  color: #666;\n}\n.analytics-dashboard .dashboard-content .metrics-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n  margin-bottom: 30px;\n}\n.analytics-dashboard .dashboard-content .metrics-grid .metric-card {\n  background: white;\n  padding: 25px;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  transition: transform 0.3s, box-shadow 0.3s;\n}\n.analytics-dashboard .dashboard-content .metrics-grid .metric-card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.analytics-dashboard .dashboard-content .metrics-grid .metric-card h3 {\n  margin: 0 0 15px 0;\n  font-size: 16px;\n  color: #666;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.analytics-dashboard .dashboard-content .metrics-grid .metric-card .metric-value {\n  font-size: 36px;\n  font-weight: 700;\n  margin-bottom: 10px;\n  color: #333;\n}\n.analytics-dashboard .dashboard-content .metrics-grid .metric-card .metric-value.status-low {\n  color: #28a745;\n}\n.analytics-dashboard .dashboard-content .metrics-grid .metric-card .metric-value.status-medium {\n  color: #ffc107;\n}\n.analytics-dashboard .dashboard-content .metrics-grid .metric-card .metric-value.status-high {\n  color: #dc3545;\n}\n.analytics-dashboard .dashboard-content .metrics-grid .metric-card .metric-label {\n  margin: 0;\n  font-size: 12px;\n  color: #999;\n  font-weight: 500;\n}\n.analytics-dashboard .dashboard-content .charts-section {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 20px;\n  margin-bottom: 30px;\n}\n.analytics-dashboard .dashboard-content .charts-section .chart-container {\n  background: white;\n  padding: 25px;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.analytics-dashboard .dashboard-content .charts-section .chart-container h3 {\n  margin: 0 0 20px 0;\n  font-size: 16px;\n  color: #333;\n  font-weight: 600;\n  border-bottom: 2px solid #007bff;\n  padding-bottom: 10px;\n}\n.analytics-dashboard .dashboard-content .charts-section .chart-container .chart-placeholder {\n  min-height: 200px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 15px;\n}\n.analytics-dashboard .dashboard-content .charts-section .chart-container .chart-placeholder p {\n  margin: 0;\n  font-size: 14px;\n  color: #666;\n}\n.analytics-dashboard .dashboard-content .charts-section .chart-container .chart-placeholder .progress-bar {\n  width: 100%;\n  height: 30px;\n  background-color: #e9ecef;\n  border-radius: 15px;\n  overflow: hidden;\n  margin-top: 10px;\n}\n.analytics-dashboard .dashboard-content .charts-section .chart-container .chart-placeholder .progress-bar .progress-fill {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #007bff,\n      #0056b3);\n  border-radius: 15px;\n  transition: width 0.3s;\n}\n.analytics-dashboard .dashboard-content .details-section {\n  background: white;\n  padding: 25px;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.analytics-dashboard .dashboard-content .details-section h3 {\n  margin: 0 0 20px 0;\n  font-size: 18px;\n  color: #333;\n  font-weight: 600;\n  border-bottom: 2px solid #007bff;\n  padding-bottom: 10px;\n}\n.analytics-dashboard .dashboard-content .details-section .details-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 15px;\n}\n.analytics-dashboard .dashboard-content .details-section .details-grid .detail-item {\n  display: flex;\n  flex-direction: column;\n  padding: 15px;\n  background-color: #f9f9f9;\n  border-radius: 4px;\n  border-left: 4px solid #007bff;\n}\n.analytics-dashboard .dashboard-content .details-section .details-grid .detail-item label {\n  font-weight: 600;\n  color: #666;\n  font-size: 12px;\n  text-transform: uppercase;\n  margin-bottom: 5px;\n}\n.analytics-dashboard .dashboard-content .details-section .details-grid .detail-item span {\n  font-size: 18px;\n  color: #333;\n  font-weight: 500;\n}\n@media (max-width: 768px) {\n  .analytics-dashboard {\n    padding: 10px;\n  }\n  .analytics-dashboard .dashboard-header {\n    flex-direction: column;\n    gap: 15px;\n  }\n  .analytics-dashboard .dashboard-header h2 {\n    font-size: 22px;\n  }\n  .analytics-dashboard .dashboard-filters {\n    flex-direction: column;\n  }\n  .analytics-dashboard .dashboard-filters .filter-group .date-input {\n    width: 100%;\n  }\n  .analytics-dashboard .dashboard-content .metrics-grid {\n    grid-template-columns: 1fr;\n  }\n  .analytics-dashboard .dashboard-content .metrics-grid .metric-card .metric-value {\n    font-size: 28px;\n  }\n  .analytics-dashboard .dashboard-content .charts-section {\n    grid-template-columns: 1fr;\n  }\n  .analytics-dashboard .dashboard-content .details-section .details-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=analytics-dashboard.component.css.map */\n"] }]
  }], () => [{ type: ParkaddaService }, { type: ParkaddaAuthService }, { type: ActivatedRoute }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AnalyticsDashboardComponent, { className: "AnalyticsDashboardComponent", filePath: "src/app/components/admin/parkadda/analytics-dashboard/analytics-dashboard.component.ts", lineNumber: 27 });
})();
export {
  AnalyticsDashboardComponent
};
//# sourceMappingURL=chunk-EEJS3VYI.js.map
