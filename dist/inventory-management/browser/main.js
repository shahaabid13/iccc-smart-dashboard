import {
  ParkaddaAuthService
} from "./chunk-BWDQ2XAU.js";
import {
  BaseChartDirective,
  NgChartsModule
} from "./chunk-TZLEL3OR.js";
import {
  AuthService
} from "./chunk-QHHSFO4U.js";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  provideRouter
} from "./chunk-AAXJDYQS.js";
import {
  bootstrapApplication
} from "./chunk-BIRBC32G.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RadioControlValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-4AUWEQTR.js";
import {
  CommonModule,
  Component,
  DecimalPipe,
  HTTP_INTERCEPTORS,
  HostListener,
  HttpClient,
  HttpClientModule,
  HttpEventType,
  Injectable,
  NgForOf,
  NgIf,
  Subject,
  effect,
  importProvidersFrom,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  setClassMetadata,
  signal,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WPHUMBF2.js";
import {
  __spreadValues
} from "./chunk-YP43Q66R.js";

// src/app/guards/admin.guard.ts
var AdminGuard = class _AdminGuard {
  auth;
  router;
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
  }
  canActivate(route, state) {
    if (this.auth.isAdmin()) {
      return true;
    }
    return this.router.parseUrl("/login");
  }
  static \u0275fac = function AdminGuard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminGuard)(\u0275\u0275inject(AuthService), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AdminGuard, factory: _AdminGuard.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminGuard, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: AuthService }, { type: Router }], null);
})();

// src/app/components/admin/anpr-analytics-table.component.ts
function AnprAnalyticsTableComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "div", 11);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading data...");
    \u0275\u0275elementEnd()();
  }
}
function AnprAnalyticsTableComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 13);
    \u0275\u0275listener("click", function AnprAnalyticsTableComponent_div_15_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadData());
    });
    \u0275\u0275text(4, "Retry");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function AnprAnalyticsTableComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 15)(2, "div", 16);
    \u0275\u0275text(3, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 17)(5, "div", 18);
    \u0275\u0275text(6, "Total Events");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 19);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 15)(11, "div", 16);
    \u0275\u0275text(12, "\u{1F697}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 17)(14, "div", 18);
    \u0275\u0275text(15, "Unique Vehicles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 19);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 2, ctx_r1.overview.totalEvents));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(18, 4, ctx_r1.overview.uniqueVehicles));
  }
}
function AnprAnalyticsTableComponent_div_17_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "span", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 25);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const status_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(status_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(status_r3.count);
  }
}
function AnprAnalyticsTableComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "h3");
    \u0275\u0275text(2, "Event Status Breakdown");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 21);
    \u0275\u0275template(4, AnprAnalyticsTableComponent_div_17_div_4_Template, 5, 2, "div", 22);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.overview.statusCounts);
  }
}
function AnprAnalyticsTableComponent_div_18_div_8_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 37);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "strong", 38);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td")(7, "span", 39);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const i_r6 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r6 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r5.plateNumber);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("high-violations", item_r5.count > 10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r5.count, " ");
  }
}
function AnprAnalyticsTableComponent_div_18_div_8_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "p");
    \u0275\u0275text(2, "No repeat offenders found for the selected date range");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 41);
    \u0275\u0275text(4, "Try adjusting the date range or check if data exists");
    \u0275\u0275elementEnd()();
  }
}
function AnprAnalyticsTableComponent_div_18_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 31)(2, "h3");
    \u0275\u0275text(3, "Repeat Offenders (Most Wanted List)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 32);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 33)(7, "table", 34)(8, "thead")(9, "tr")(10, "th");
    \u0275\u0275text(11, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Plate Number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Violation Count");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody");
    \u0275\u0275template(17, AnprAnalyticsTableComponent_div_18_div_8_tr_17_Template, 9, 5, "tr", 35);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(18, AnprAnalyticsTableComponent_div_18_div_8_div_18_Template, 5, 0, "div", 36);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.repeatOffenders.length, " records");
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx_r1.repeatOffenders);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.repeatOffenders.length === 0);
  }
}
function AnprAnalyticsTableComponent_div_18_div_9_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 42)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const i_r8 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275classMap("rank-badge rank-" + (i_r8 + 1));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", i_r8 + 1, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r7.junctionName || "Unknown Junction");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 5, item_r7.count));
  }
}
function AnprAnalyticsTableComponent_div_18_div_9_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "p");
    \u0275\u0275text(2, "No junction data available for the selected date range");
    \u0275\u0275elementEnd()();
  }
}
function AnprAnalyticsTableComponent_div_18_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 31)(2, "h3");
    \u0275\u0275text(3, "Top Junctions by Events");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 32);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 33)(7, "table", 34)(8, "thead")(9, "tr")(10, "th");
    \u0275\u0275text(11, "Rank");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Junction Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Events");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody");
    \u0275\u0275template(17, AnprAnalyticsTableComponent_div_18_div_9_tr_17_Template, 10, 7, "tr", 35);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(18, AnprAnalyticsTableComponent_div_18_div_9_div_18_Template, 3, 0, "div", 36);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.topJunctions.length, " records");
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx_r1.topJunctions);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.topJunctions.length === 0);
  }
}
function AnprAnalyticsTableComponent_div_18_div_10_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 42)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    const i_r10 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275classMap("rank-badge rank-" + (i_r10 + 1));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", i_r10 + 1, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r9.name || "Unknown Camera");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 5, item_r9.count));
  }
}
function AnprAnalyticsTableComponent_div_18_div_10_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "p");
    \u0275\u0275text(2, "No camera data available for the selected date range");
    \u0275\u0275elementEnd()();
  }
}
function AnprAnalyticsTableComponent_div_18_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 31)(2, "h3");
    \u0275\u0275text(3, "Top Cameras by Events");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 32);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 33)(7, "table", 34)(8, "thead")(9, "tr")(10, "th");
    \u0275\u0275text(11, "Rank");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Camera Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Events");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody");
    \u0275\u0275template(17, AnprAnalyticsTableComponent_div_18_div_10_tr_17_Template, 10, 7, "tr", 35);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(18, AnprAnalyticsTableComponent_div_18_div_10_div_18_Template, 3, 0, "div", 36);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.topCameras.length, " records");
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx_r1.topCameras);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.topCameras.length === 0);
  }
}
function AnprAnalyticsTableComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 27)(2, "button", 28);
    \u0275\u0275listener("click", function AnprAnalyticsTableComponent_div_18_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeTab = "repeat");
    });
    \u0275\u0275text(3, " \u{1F501} Repeat Offenders ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 28);
    \u0275\u0275listener("click", function AnprAnalyticsTableComponent_div_18_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeTab = "junctions");
    });
    \u0275\u0275text(5, " \u{1F4CD} Top Junctions ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 28);
    \u0275\u0275listener("click", function AnprAnalyticsTableComponent_div_18_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeTab = "cameras");
    });
    \u0275\u0275text(7, " \u{1F4F9} Top Cameras ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, AnprAnalyticsTableComponent_div_18_div_8_Template, 19, 3, "div", 29)(9, AnprAnalyticsTableComponent_div_18_div_9_Template, 19, 3, "div", 29)(10, AnprAnalyticsTableComponent_div_18_div_10_Template, 19, 3, "div", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "repeat");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "junctions");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "cameras");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "repeat");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "junctions");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "cameras");
  }
}
var AnprAnalyticsTableComponent = class _AnprAnalyticsTableComponent {
  http = inject(HttpClient);
  baseUrl = "/api/analytics";
  startDate;
  endDate;
  loading = false;
  error = false;
  errorMessage = "";
  activeTab = "repeat";
  overview = null;
  repeatOffenders = [];
  topJunctions = [];
  topCameras = [];
  constructor() {
    const today = /* @__PURE__ */ new Date();
    this.endDate = today.toISOString().split("T")[0];
    const monthAgo = new Date(today);
    monthAgo.setDate(monthAgo.getDate() - 30);
    this.startDate = monthAgo.toISOString().split("T")[0];
  }
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    if (this.loading)
      return;
    this.loading = true;
    this.error = false;
    this.errorMessage = "";
    const startIso = `${this.startDate}T00:00:00`;
    const endIso = `${this.endDate}T23:59:59`;
    if (new Date(startIso) > new Date(endIso)) {
      this.error = true;
      this.errorMessage = "Start date cannot be after end date";
      this.loading = false;
      return;
    }
    this.overview = null;
    this.repeatOffenders = [];
    this.topJunctions = [];
    this.topCameras = [];
    Promise.all([
      this.loadOverview(startIso, endIso),
      this.loadRepeatOffenders(startIso, endIso),
      this.loadTopJunctions(startIso, endIso),
      this.loadTopCameras(startIso, endIso)
    ]).catch((err) => {
      this.error = true;
      this.errorMessage = err.message || "Failed to load analytics data. Please try again.";
      console.error("Error loading data:", err);
    }).finally(() => {
      this.loading = false;
    });
  }
  onDateChange() {
    this.loadData();
  }
  loadOverview(startDate, endDate) {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/overview?start=${startDate}&end=${endDate}`;
      console.log("\u{1F517} API Call - Overview:", url);
      this.http.get(url).subscribe({
        next: (data) => {
          console.log("\u2705 Overview Response:", data);
          console.log("\u{1F50D} Expected Fields: totalEvents (number), uniqueVehicles (number), statusCounts (array)");
          console.log("   \u2713 totalEvents:", data?.totalEvents, typeof data?.totalEvents);
          console.log("   \u2713 uniqueVehicles:", data?.uniqueVehicles, typeof data?.uniqueVehicles);
          console.log("   \u2713 statusCounts:", data?.statusCounts);
          if (data?.statusCounts && data.statusCounts.length > 0) {
            console.log("     Sample status:", data.statusCounts[0]);
          }
          this.overview = data;
          resolve();
        },
        error: (err) => {
          console.error("\u274C Error loading overview:", err);
          console.error("\u{1F4CB} Failed URL:", url);
          console.error("\u{1F4CA} Error Status:", err.status);
          console.error("\u{1F4AC} Error Message:", err.message);
          if (err.status === 0) {
            console.error("\u{1F310} Network error: Cannot reach backend server at", this.baseUrl);
            this.errorMessage = `Cannot connect to backend server. Please verify the server at ${this.baseUrl} is running and accessible.`;
          } else if (err.status === 404) {
            this.errorMessage = `API endpoint not found: ${url}`;
          }
          reject(err);
        }
      });
    });
  }
  loadRepeatOffenders(startDate, endDate) {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/vehicles/repeat?start=${startDate}&end=${endDate}&min=3`;
      console.log("\u{1F517} API Call - Repeat Offenders:", url);
      this.http.get(url).subscribe({
        next: (data) => {
          console.log("\u2705 Repeat Offenders Response:", data);
          console.log("\u{1F4CA} Record Count:", data?.length || 0);
          if (data && data.length > 0) {
            console.log("\u{1F4CB} Sample Record:", data[0]);
            console.log("\u{1F50D} Expected Fields: plateNumber (string), count (number)");
            if (data[0]) {
              console.log("   \u2713 plateNumber:", data[0].plateNumber, typeof data[0].plateNumber);
              console.log("   \u2713 count:", data[0].count, typeof data[0].count);
            }
          }
          this.repeatOffenders = data;
          resolve();
        },
        error: (err) => {
          console.error("\u274C Error loading repeat offenders:", err);
          console.error("\u{1F4CB} Failed URL:", url);
          console.error("\u{1F4CA} Error Status:", err.status);
          console.error("\u{1F4AC} Error Message:", err.message);
          reject(err);
        }
      });
    });
  }
  loadTopJunctions(startDate, endDate) {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/junctions/top?start=${startDate}&end=${endDate}&limit=10`;
      console.log("\u{1F517} API Call - Top Junctions:", url);
      this.http.get(url).subscribe({
        next: (data) => {
          console.log("\u2705 Top Junctions Response:", data);
          console.log("\u{1F4CA} Record Count:", data?.length || 0);
          if (data && data.length > 0) {
            console.log("\u{1F4CB} Sample Record:", data[0]);
            console.log("\u{1F50D} Expected Fields: junctionName (string), count (number)");
            if (data[0]) {
              console.log("   \u2713 junctionName:", data[0].junctionName, typeof data[0].junctionName);
              console.log("   \u2713 count:", data[0].count, typeof data[0].count);
            }
          }
          this.topJunctions = data || [];
          resolve();
        },
        error: (err) => {
          console.error("\u274C Error loading top junctions:", err);
          console.error("\u{1F4CB} Failed URL:", url);
          console.error("\u{1F4CA} Error Status:", err.status);
          console.error("\u{1F4AC} Error Message:", err.message);
          reject(err);
        }
      });
    });
  }
  loadTopCameras(startDate, endDate) {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/cameras/top?start=${startDate}&end=${endDate}&limit=10`;
      console.log("\u{1F517} API Call - Top Cameras:", url);
      this.http.get(url).subscribe({
        next: (data) => {
          console.log("\u2705 Top Cameras Response:", data);
          console.log("\u{1F4CA} Record Count:", data?.length || 0);
          if (data && data.length > 0) {
            console.log("\u{1F4CB} Sample Record:", data[0]);
            console.log("\u{1F50D} Expected Fields: name (string), count (number)");
            if (data[0]) {
              console.log("   \u2713 name:", data[0].name, typeof data[0].name);
              console.log("   \u2713 count:", data[0].count, typeof data[0].count);
            }
          }
          this.topCameras = data || [];
          resolve();
        },
        error: (err) => {
          console.error("\u274C Error loading top cameras:", err);
          console.error("\u{1F4CB} Failed URL:", url);
          console.error("\u{1F4CA} Error Status:", err.status);
          console.error("\u{1F4AC} Error Message:", err.message);
          reject(err);
        }
      });
    });
  }
  formatDate(dateString) {
    if (!dateString)
      return "Never";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime()))
        return "Invalid Date";
      const now = /* @__PURE__ */ new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffMs / (1e3 * 60 * 60 * 24));
      if (diffDays === 0) {
        return "Today, " + date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        });
      } else if (diffDays === 1) {
        return "Yesterday, " + date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        });
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else {
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: date.getFullYear() !== now.getFullYear() ? "numeric" : void 0
        });
      }
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid Date";
    }
  }
  getColorValue(colorName) {
    const colors = {
      "red": "#dc3545",
      "blue": "#0066cc",
      "black": "#333333",
      "white": "#ffffff",
      "silver": "#c0c0c0",
      "gray": "#808080",
      "grey": "#808080",
      "green": "#28a745",
      "yellow": "#ffc107",
      "orange": "#fd7e14",
      "brown": "#8b4513",
      "gold": "#ffd700",
      "purple": "#6f42c1",
      "pink": "#e83e8c",
      "cyan": "#17a2b8",
      "maroon": "#800000",
      "navy": "#000080",
      "teal": "#008080",
      "olive": "#808000",
      "lime": "#00ff00",
      "aqua": "#00ffff",
      "magenta": "#ff00ff"
    };
    return colors[colorName?.toLowerCase()] || "#999999";
  }
  static \u0275fac = function AnprAnalyticsTableComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AnprAnalyticsTableComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AnprAnalyticsTableComponent, selectors: [["app-anpr-analytics-table"]], decls: 19, vars: 11, consts: [[1, "analytics-container"], [1, "controls"], [1, "date-input-group"], ["type", "date", 1, "input-field", 3, "ngModelChange", "change", "ngModel", "disabled"], [1, "load-btn", 3, "click", "disabled"], ["class", "loading", 4, "ngIf"], ["class", "error", 4, "ngIf"], ["class", "overview-cards", 4, "ngIf"], ["class", "status-distribution", 4, "ngIf"], ["class", "tab-container", 4, "ngIf"], [1, "loading"], [1, "spinner"], [1, "error"], [1, "retry-btn", 3, "click"], [1, "overview-cards"], [1, "overview-card"], [1, "card-icon"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "status-distribution"], [1, "status-items"], ["class", "status-item", 4, "ngFor", "ngForOf"], [1, "status-item"], [1, "status-name"], [1, "status-count"], [1, "tab-container"], [1, "tab-buttons"], [1, "tab-btn", 3, "click"], ["class", "tab-content", 4, "ngIf"], [1, "tab-content"], [1, "table-header"], [1, "record-count"], [1, "table-container"], [1, "data-table"], [4, "ngFor", "ngForOf"], ["class", "no-data", 4, "ngIf"], [1, "index"], [1, "plate-number"], [1, "violation-count"], [1, "no-data"], [1, "sub-text"], [1, "rank"]], template: function AnprAnalyticsTableComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2");
      \u0275\u0275text(2, "ANPR Analytics - Data Table");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 1)(4, "div", 2)(5, "label");
      \u0275\u0275text(6, "From Date:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function AnprAnalyticsTableComponent_Template_input_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.startDate, $event) || (ctx.startDate = $event);
        return $event;
      });
      \u0275\u0275listener("change", function AnprAnalyticsTableComponent_Template_input_change_7_listener() {
        return ctx.onDateChange();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 2)(9, "label");
      \u0275\u0275text(10, "To Date:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function AnprAnalyticsTableComponent_Template_input_ngModelChange_11_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.endDate, $event) || (ctx.endDate = $event);
        return $event;
      });
      \u0275\u0275listener("change", function AnprAnalyticsTableComponent_Template_input_change_11_listener() {
        return ctx.onDateChange();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "button", 4);
      \u0275\u0275listener("click", function AnprAnalyticsTableComponent_Template_button_click_12_listener() {
        return ctx.loadData();
      });
      \u0275\u0275text(13);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(14, AnprAnalyticsTableComponent_div_14_Template, 4, 0, "div", 5)(15, AnprAnalyticsTableComponent_div_15_Template, 5, 1, "div", 6)(16, AnprAnalyticsTableComponent_div_16_Template, 19, 6, "div", 7)(17, AnprAnalyticsTableComponent_div_17_Template, 5, 1, "div", 8)(18, AnprAnalyticsTableComponent_div_18_Template, 11, 9, "div", 9);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.startDate);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.endDate);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.loading ? "Loading..." : "Load Data", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.overview && !ctx.loading && !ctx.error);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.overview && ctx.overview.statusCounts && !ctx.loading && !ctx.error);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && !ctx.error);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, DecimalPipe], styles: ['\n\n.analytics-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  background: #f8f9fa;\n  min-height: 100vh;\n}\nh2[_ngcontent-%COMP%] {\n  color: #122e52;\n  margin-bottom: 20px;\n  font-size: 24px;\n  font-weight: 600;\n}\n.controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 15px;\n  margin-bottom: 20px;\n  align-items: end;\n  flex-wrap: wrap;\n  background: white;\n  padding: 15px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.date-input-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  flex: 1;\n  min-width: 200px;\n}\n.date-input-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 14px;\n  color: #333;\n}\n.input-field[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n  transition: border-color 0.3s;\n}\n.input-field[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #007bff;\n  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);\n}\n.input-field[_ngcontent-%COMP%]:disabled {\n  background: #f5f5f5;\n  cursor: not-allowed;\n}\n.load-btn[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  background: #007bff;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  transition: all 0.3s;\n  height: fit-content;\n}\n.load-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #0056b3;\n  transform: translateY(-1px);\n}\n.load-btn[_ngcontent-%COMP%]:disabled {\n  background: #cccccc;\n  cursor: not-allowed;\n  transform: none;\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #007bff;\n  font-size: 16px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 15px;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #f3f3f3;\n  border-top: 4px solid #007bff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.error[_ngcontent-%COMP%] {\n  background: #f8d7da;\n  color: #721c24;\n  padding: 20px;\n  border-radius: 8px;\n  border: 1px solid #f5c6cb;\n  margin-bottom: 20px;\n  text-align: center;\n}\n.retry-btn[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  padding: 8px 20px;\n  background: #dc3545;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-weight: 600;\n  transition: background-color 0.3s;\n}\n.retry-btn[_ngcontent-%COMP%]:hover {\n  background: #c82333;\n}\n.overview-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 20px;\n  margin-bottom: 30px;\n}\n.overview-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  border-left: 4px solid #007bff;\n  display: flex;\n  gap: 15px;\n  align-items: center;\n  transition: transform 0.3s, box-shadow 0.3s;\n}\n.overview-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.card-icon[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  opacity: 0.8;\n}\n.card-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.card-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #666;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 5px;\n  font-weight: 600;\n}\n.card-value[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 700;\n  color: #007bff;\n  line-height: 1.2;\n}\n.tab-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n  margin-top: 20px;\n}\n.tab-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n  border-bottom: 2px solid #e0e0e0;\n  background: #f8f9fa;\n  padding: 0 20px;\n}\n.tab-btn[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 600;\n  color: #666;\n  transition: all 0.3s;\n  border-bottom: 3px solid transparent;\n  margin-bottom: -2px;\n  white-space: nowrap;\n}\n.tab-btn[_ngcontent-%COMP%]:hover {\n  background: #e9ecef;\n  color: #333;\n}\n.tab-btn.active[_ngcontent-%COMP%] {\n  color: #007bff;\n  border-bottom-color: #007bff;\n  background: white;\n}\n.tab-content[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.table-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n  padding-bottom: 15px;\n  border-bottom: 2px solid #f0f0f0;\n}\n.table-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #122e52;\n  font-size: 18px;\n}\n.record-count[_ngcontent-%COMP%] {\n  background: #e9ecef;\n  color: #666;\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 13px;\n  font-weight: 600;\n}\n.table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  border-radius: 6px;\n  border: 1px solid #e0e0e0;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 14px;\n  min-width: 800px;\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #007bff;\n  color: white;\n  padding: 16px;\n  text-align: left;\n  font-weight: 600;\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child {\n  border-top-left-radius: 6px;\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child {\n  border-top-right-radius: 6px;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-bottom: 1px solid #e0e0e0;\n  vertical-align: middle;\n}\n.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  transition: background-color 0.2s;\n}\n.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f0f8ff;\n}\n.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.index[_ngcontent-%COMP%], \n.rank[_ngcontent-%COMP%] {\n  text-align: center;\n  font-weight: 600;\n  color: #666;\n  width: 60px;\n}\n.rank-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n  text-align: center;\n  border-radius: 50%;\n  font-weight: 700;\n  font-size: 13px;\n  color: white;\n}\n.rank-1[_ngcontent-%COMP%] {\n  background: #ffc107;\n}\n.rank-2[_ngcontent-%COMP%] {\n  background: #6c757d;\n}\n.rank-3[_ngcontent-%COMP%] {\n  background: #fd7e14;\n}\n.rank-4[_ngcontent-%COMP%], \n.rank-5[_ngcontent-%COMP%], \n.rank-6[_ngcontent-%COMP%], \n.rank-7[_ngcontent-%COMP%], \n.rank-8[_ngcontent-%COMP%], \n.rank-9[_ngcontent-%COMP%], \n.rank-10[_ngcontent-%COMP%] {\n  background: #6f42c1;\n}\n.plate-number[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-size: 15px;\n  letter-spacing: 1px;\n  background: #f8f9fa;\n  padding: 4px 8px;\n  border-radius: 4px;\n  border: 1px solid #e0e0e0;\n}\n.color-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 6px 12px;\n  border-radius: 4px;\n  color: white;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: capitalize;\n  min-width: 80px;\n  text-align: center;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n}\n.violation-count[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 15px;\n  color: #007bff;\n}\n.violation-count.high-violations[_ngcontent-%COMP%] {\n  color: #dc3545;\n  background: #f8d7da;\n  padding: 4px 8px;\n  border-radius: 4px;\n}\n.id[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  color: #666;\n  font-size: 13px;\n}\n.progress-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.progress-bar[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 20px;\n  background: #f0f0f0;\n  border-radius: 10px;\n  overflow: hidden;\n  position: relative;\n}\n.progress[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #28a745,\n      #20c997);\n  height: 100%;\n  border-radius: 10px;\n  transition: width 0.5s ease;\n  min-width: 4px;\n}\n.percentage-text[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #333;\n  min-width: 50px;\n  text-align: right;\n}\n.no-data[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #999;\n  font-size: 16px;\n  border: 2px dashed #ddd;\n  border-radius: 8px;\n  margin: 20px 0;\n}\n.no-data[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 10px 0;\n}\n.sub-text[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #ccc;\n}\n@media (max-width: 992px) {\n  .controls[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .date-input-group[_ngcontent-%COMP%] {\n    min-width: auto;\n  }\n  .overview-cards[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .tab-buttons[_ngcontent-%COMP%] {\n    overflow-x: auto;\n    flex-wrap: nowrap;\n    padding: 0;\n  }\n  .tab-btn[_ngcontent-%COMP%] {\n    padding: 16px;\n    font-size: 14px;\n    flex: 1;\n    min-width: 120px;\n  }\n}\n@media (max-width: 768px) {\n  .analytics-container[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n  .overview-cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 15px;\n  }\n  .card-value[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .tab-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .data-table[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], \n   .data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px 8px;\n  }\n}\n/*# sourceMappingURL=anpr-analytics-table.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnprAnalyticsTableComponent, [{
    type: Component,
    args: [{ standalone: true, imports: [CommonModule, FormsModule], selector: "app-anpr-analytics-table", template: `
    <div class="analytics-container">
      <h2>ANPR Analytics - Data Table</h2>

      <!-- Date Range Controls -->
      <div class="controls">
        <div class="date-input-group">
          <label>From Date:</label>
          <input 
            type="date" 
            [(ngModel)]="startDate" 
            (change)="onDateChange()"
            class="input-field"
            [disabled]="loading"
          >
        </div>
        <div class="date-input-group">
          <label>To Date:</label>
          <input 
            type="date" 
            [(ngModel)]="endDate" 
            (change)="onDateChange()"
            class="input-field"
            [disabled]="loading"
          >
        </div>
        <button 
          (click)="loadData()" 
          class="load-btn"
          [disabled]="loading"
        >
          {{ loading ? 'Loading...' : 'Load Data' }}
        </button>
      </div>

      <!-- Loading/Error States -->
      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading data...</p>
      </div>
      
      <div *ngIf="error" class="error">
        <p>{{ errorMessage }}</p>
        <button (click)="loadData()" class="retry-btn">Retry</button>
      </div>

      <!-- Overview Cards -->
      <div *ngIf="overview && !loading && !error" class="overview-cards">
        <div class="overview-card">
          <div class="card-icon">\u26A0\uFE0F</div>
          <div class="card-content">
            <div class="card-label">Total Events</div>
            <div class="card-value">{{ overview.totalEvents | number }}</div>
          </div>
        </div>
        <div class="overview-card">
          <div class="card-icon">\u{1F697}</div>
          <div class="card-content">
            <div class="card-label">Unique Vehicles</div>
            <div class="card-value">{{ overview.uniqueVehicles | number }}</div>
          </div>
        </div>
      </div>

      <!-- Status Distribution -->
      <div *ngIf="overview && overview.statusCounts && !loading && !error" class="status-distribution">
        <h3>Event Status Breakdown</h3>
        <div class="status-items">
          <div *ngFor="let status of overview.statusCounts" class="status-item">
            <span class="status-name">{{ status.name }}</span>
            <span class="status-count">{{ status.count }}</span>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tab-container" *ngIf="!loading && !error">
        <div class="tab-buttons">
          <button 
            (click)="activeTab = 'repeat'" 
            [class.active]="activeTab === 'repeat'"
            class="tab-btn"
          >
            \u{1F501} Repeat Offenders
          </button>
          <button 
            (click)="activeTab = 'junctions'" 
            [class.active]="activeTab === 'junctions'"
            class="tab-btn"
          >
            \u{1F4CD} Top Junctions
          </button>
          <button 
            (click)="activeTab = 'cameras'" 
            [class.active]="activeTab === 'cameras'"
            class="tab-btn"
          >
            \u{1F4F9} Top Cameras
          </button>
        </div>

        <!-- Repeat Offenders Table -->
        <div class="tab-content" *ngIf="activeTab === 'repeat'">
          <div class="table-header">
            <h3>Repeat Offenders (Most Wanted List)</h3>
            <span class="record-count">{{ repeatOffenders.length }} records</span>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Plate Number</th>
                  <th>Violation Count</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of repeatOffenders; let i = index">
                  <td class="index">{{ i + 1 }}</td>
                  <td><strong class="plate-number">{{ item.plateNumber }}</strong></td>
                  <td>
                    <span class="violation-count" [class.high-violations]="item.count > 10">
                      {{ item.count }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div *ngIf="repeatOffenders.length === 0" class="no-data">
              <p>No repeat offenders found for the selected date range</p>
              <p class="sub-text">Try adjusting the date range or check if data exists</p>
            </div>
          </div>
        </div>

        <!-- Top Junctions Table -->
        <div class="tab-content" *ngIf="activeTab === 'junctions'">
          <div class="table-header">
            <h3>Top Junctions by Events</h3>
            <span class="record-count">{{ topJunctions.length }} records</span>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Junction Name</th>
                  <th>Events</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of topJunctions; let i = index">
                  <td class="rank">
                    <span [class]="'rank-badge rank-' + (i + 1)">
                      {{ i + 1 }}
                    </span>
                  </td>
                  <td><strong>{{ item.junctionName || 'Unknown Junction' }}</strong></td>
                  <td>{{ item.count | number }}</td>
                </tr>
              </tbody>
            </table>
            <div *ngIf="topJunctions.length === 0" class="no-data">
              <p>No junction data available for the selected date range</p>
            </div>
          </div>
        </div>

        <!-- Top Cameras Table -->
        <div class="tab-content" *ngIf="activeTab === 'cameras'">
          <div class="table-header">
            <h3>Top Cameras by Events</h3>
            <span class="record-count">{{ topCameras.length }} records</span>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Camera Name</th>
                  <th>Events</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of topCameras; let i = index">
                  <td class="rank">
                    <span [class]="'rank-badge rank-' + (i + 1)">
                      {{ i + 1 }}
                    </span>
                  </td>
                  <td><strong>{{ item.name || 'Unknown Camera' }}</strong></td>
                  <td>{{ item.count | number }}</td>
                </tr>
              </tbody>
            </table>
            <div *ngIf="topCameras.length === 0" class="no-data">
              <p>No camera data available for the selected date range</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `, styles: ['/* angular:styles/component:scss;12342378277a0f201e4ca47bed12db45088f1f7be8a4025d10352d1d418054d9;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/admin/anpr-analytics-table.component.ts */\n.analytics-container {\n  padding: 20px;\n  background: #f8f9fa;\n  min-height: 100vh;\n}\nh2 {\n  color: #122e52;\n  margin-bottom: 20px;\n  font-size: 24px;\n  font-weight: 600;\n}\n.controls {\n  display: flex;\n  gap: 15px;\n  margin-bottom: 20px;\n  align-items: end;\n  flex-wrap: wrap;\n  background: white;\n  padding: 15px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.date-input-group {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  flex: 1;\n  min-width: 200px;\n}\n.date-input-group label {\n  font-weight: bold;\n  font-size: 14px;\n  color: #333;\n}\n.input-field {\n  padding: 10px 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n  transition: border-color 0.3s;\n}\n.input-field:focus {\n  outline: none;\n  border-color: #007bff;\n  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);\n}\n.input-field:disabled {\n  background: #f5f5f5;\n  cursor: not-allowed;\n}\n.load-btn {\n  padding: 10px 24px;\n  background: #007bff;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  transition: all 0.3s;\n  height: fit-content;\n}\n.load-btn:hover:not(:disabled) {\n  background: #0056b3;\n  transform: translateY(-1px);\n}\n.load-btn:disabled {\n  background: #cccccc;\n  cursor: not-allowed;\n  transform: none;\n}\n.loading {\n  text-align: center;\n  padding: 40px;\n  color: #007bff;\n  font-size: 16px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 15px;\n}\n.spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #f3f3f3;\n  border-top: 4px solid #007bff;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n}\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.error {\n  background: #f8d7da;\n  color: #721c24;\n  padding: 20px;\n  border-radius: 8px;\n  border: 1px solid #f5c6cb;\n  margin-bottom: 20px;\n  text-align: center;\n}\n.retry-btn {\n  margin-top: 10px;\n  padding: 8px 20px;\n  background: #dc3545;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-weight: 600;\n  transition: background-color 0.3s;\n}\n.retry-btn:hover {\n  background: #c82333;\n}\n.overview-cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 20px;\n  margin-bottom: 30px;\n}\n.overview-card {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  border-left: 4px solid #007bff;\n  display: flex;\n  gap: 15px;\n  align-items: center;\n  transition: transform 0.3s, box-shadow 0.3s;\n}\n.overview-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.card-icon {\n  font-size: 2.5rem;\n  opacity: 0.8;\n}\n.card-content {\n  flex: 1;\n}\n.card-label {\n  font-size: 13px;\n  color: #666;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 5px;\n  font-weight: 600;\n}\n.card-value {\n  font-size: 24px;\n  font-weight: 700;\n  color: #007bff;\n  line-height: 1.2;\n}\n.tab-container {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n  margin-top: 20px;\n}\n.tab-buttons {\n  display: flex;\n  gap: 0;\n  border-bottom: 2px solid #e0e0e0;\n  background: #f8f9fa;\n  padding: 0 20px;\n}\n.tab-btn {\n  padding: 16px 24px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 600;\n  color: #666;\n  transition: all 0.3s;\n  border-bottom: 3px solid transparent;\n  margin-bottom: -2px;\n  white-space: nowrap;\n}\n.tab-btn:hover {\n  background: #e9ecef;\n  color: #333;\n}\n.tab-btn.active {\n  color: #007bff;\n  border-bottom-color: #007bff;\n  background: white;\n}\n.tab-content {\n  padding: 24px;\n}\n.table-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n  padding-bottom: 15px;\n  border-bottom: 2px solid #f0f0f0;\n}\n.table-header h3 {\n  margin: 0;\n  color: #122e52;\n  font-size: 18px;\n}\n.record-count {\n  background: #e9ecef;\n  color: #666;\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 13px;\n  font-weight: 600;\n}\n.table-container {\n  overflow-x: auto;\n  border-radius: 6px;\n  border: 1px solid #e0e0e0;\n}\n.data-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 14px;\n  min-width: 800px;\n}\n.data-table th {\n  background: #007bff;\n  color: white;\n  padding: 16px;\n  text-align: left;\n  font-weight: 600;\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n.data-table th:first-child {\n  border-top-left-radius: 6px;\n}\n.data-table th:last-child {\n  border-top-right-radius: 6px;\n}\n.data-table td {\n  padding: 16px;\n  border-bottom: 1px solid #e0e0e0;\n  vertical-align: middle;\n}\n.data-table tbody tr {\n  transition: background-color 0.2s;\n}\n.data-table tbody tr:hover {\n  background: #f0f8ff;\n}\n.data-table tbody tr:last-child td {\n  border-bottom: none;\n}\n.index,\n.rank {\n  text-align: center;\n  font-weight: 600;\n  color: #666;\n  width: 60px;\n}\n.rank-badge {\n  display: inline-block;\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n  text-align: center;\n  border-radius: 50%;\n  font-weight: 700;\n  font-size: 13px;\n  color: white;\n}\n.rank-1 {\n  background: #ffc107;\n}\n.rank-2 {\n  background: #6c757d;\n}\n.rank-3 {\n  background: #fd7e14;\n}\n.rank-4,\n.rank-5,\n.rank-6,\n.rank-7,\n.rank-8,\n.rank-9,\n.rank-10 {\n  background: #6f42c1;\n}\n.plate-number {\n  font-family: "Courier New", monospace;\n  font-size: 15px;\n  letter-spacing: 1px;\n  background: #f8f9fa;\n  padding: 4px 8px;\n  border-radius: 4px;\n  border: 1px solid #e0e0e0;\n}\n.color-badge {\n  display: inline-block;\n  padding: 6px 12px;\n  border-radius: 4px;\n  color: white;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: capitalize;\n  min-width: 80px;\n  text-align: center;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n}\n.violation-count {\n  font-weight: 700;\n  font-size: 15px;\n  color: #007bff;\n}\n.violation-count.high-violations {\n  color: #dc3545;\n  background: #f8d7da;\n  padding: 4px 8px;\n  border-radius: 4px;\n}\n.id {\n  font-family: "Courier New", monospace;\n  color: #666;\n  font-size: 13px;\n}\n.progress-container {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.progress-bar {\n  flex: 1;\n  height: 20px;\n  background: #f0f0f0;\n  border-radius: 10px;\n  overflow: hidden;\n  position: relative;\n}\n.progress {\n  background:\n    linear-gradient(\n      90deg,\n      #28a745,\n      #20c997);\n  height: 100%;\n  border-radius: 10px;\n  transition: width 0.5s ease;\n  min-width: 4px;\n}\n.percentage-text {\n  font-size: 13px;\n  font-weight: 600;\n  color: #333;\n  min-width: 50px;\n  text-align: right;\n}\n.no-data {\n  text-align: center;\n  padding: 60px 20px;\n  color: #999;\n  font-size: 16px;\n  border: 2px dashed #ddd;\n  border-radius: 8px;\n  margin: 20px 0;\n}\n.no-data p {\n  margin: 0 0 10px 0;\n}\n.sub-text {\n  font-size: 14px;\n  color: #ccc;\n}\n@media (max-width: 992px) {\n  .controls {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .date-input-group {\n    min-width: auto;\n  }\n  .overview-cards {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .tab-buttons {\n    overflow-x: auto;\n    flex-wrap: nowrap;\n    padding: 0;\n  }\n  .tab-btn {\n    padding: 16px;\n    font-size: 14px;\n    flex: 1;\n    min-width: 120px;\n  }\n}\n@media (max-width: 768px) {\n  .analytics-container {\n    padding: 15px;\n  }\n  .overview-cards {\n    grid-template-columns: 1fr;\n    gap: 15px;\n  }\n  .card-value {\n    font-size: 20px;\n  }\n  .tab-content {\n    padding: 16px;\n  }\n  .data-table {\n    font-size: 13px;\n  }\n  .data-table td,\n  .data-table th {\n    padding: 12px 8px;\n  }\n}\n/*# sourceMappingURL=anpr-analytics-table.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AnprAnalyticsTableComponent, { className: "AnprAnalyticsTableComponent", filePath: "src/app/components/admin/anpr-analytics-table.component.ts", lineNumber: 727 });
})();

// src/app/components/admin/anpr-analytics-charts.component.ts
function AnprAnalyticsChartsComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "div", 9);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading charts...");
    \u0275\u0275elementEnd()();
  }
}
function AnprAnalyticsChartsComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 11);
    \u0275\u0275listener("click", function AnprAnalyticsChartsComponent_div_15_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadData());
    });
    \u0275\u0275text(4, "Retry");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function AnprAnalyticsChartsComponent_div_16_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1, " No data available for the selected date range ");
    \u0275\u0275elementEnd();
  }
}
function AnprAnalyticsChartsComponent_div_16_canvas_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "canvas", 18);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("data", ctx_r1.hourlyTrendData)("options", ctx_r1.getLineChartOptions("Hour"))("type", "line");
  }
}
function AnprAnalyticsChartsComponent_div_16_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1, " No data available for the selected date range ");
    \u0275\u0275elementEnd();
  }
}
function AnprAnalyticsChartsComponent_div_16_canvas_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "canvas", 18);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("data", ctx_r1.dailyTrendData)("options", ctx_r1.getLineChartOptions("Day"))("type", "line");
  }
}
function AnprAnalyticsChartsComponent_div_16_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1, " No data available for the selected date range ");
    \u0275\u0275elementEnd();
  }
}
function AnprAnalyticsChartsComponent_div_16_canvas_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "canvas", 18);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("data", ctx_r1.topJunctionsData)("options", ctx_r1.getBarChartOptions("Junctions"))("type", "bar");
  }
}
function AnprAnalyticsChartsComponent_div_16_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1, " No data available for the selected date range ");
    \u0275\u0275elementEnd();
  }
}
function AnprAnalyticsChartsComponent_div_16_canvas_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "canvas", 18);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("data", ctx_r1.topCamerasData)("options", ctx_r1.getBarChartOptions("Cameras"))("type", "bar");
  }
}
function AnprAnalyticsChartsComponent_div_16_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1, " No data available for the selected date range ");
    \u0275\u0275elementEnd();
  }
}
function AnprAnalyticsChartsComponent_div_16_canvas_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "canvas", 18);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("data", ctx_r1.vehicleColorData)("options", ctx_r1.getPieChartOptions())("type", "pie");
  }
}
function AnprAnalyticsChartsComponent_div_16_div_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1, " No data available for the selected date range ");
    \u0275\u0275elementEnd();
  }
}
function AnprAnalyticsChartsComponent_div_16_canvas_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "canvas", 18);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("data", ctx_r1.speedDistributionData)("options", ctx_r1.getBarChartOptions("Speed Range"))("type", "bar");
  }
}
function AnprAnalyticsChartsComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13)(2, "h3");
    \u0275\u0275text(3, "Events - Hourly Trend");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 14);
    \u0275\u0275template(5, AnprAnalyticsChartsComponent_div_16_div_5_Template, 2, 0, "div", 15)(6, AnprAnalyticsChartsComponent_div_16_canvas_6_Template, 1, 3, "canvas", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 13)(8, "h3");
    \u0275\u0275text(9, "Events - Daily Trend");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 14);
    \u0275\u0275template(11, AnprAnalyticsChartsComponent_div_16_div_11_Template, 2, 0, "div", 15)(12, AnprAnalyticsChartsComponent_div_16_canvas_12_Template, 1, 3, "canvas", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 13)(14, "h3");
    \u0275\u0275text(15, "Events by Top Junctions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 14);
    \u0275\u0275template(17, AnprAnalyticsChartsComponent_div_16_div_17_Template, 2, 0, "div", 15)(18, AnprAnalyticsChartsComponent_div_16_canvas_18_Template, 1, 3, "canvas", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 13)(20, "h3");
    \u0275\u0275text(21, "Events by Top Cameras");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 14);
    \u0275\u0275template(23, AnprAnalyticsChartsComponent_div_16_div_23_Template, 2, 0, "div", 15)(24, AnprAnalyticsChartsComponent_div_16_canvas_24_Template, 1, 3, "canvas", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 13)(26, "h3");
    \u0275\u0275text(27, "Events by Vehicle Color");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 14);
    \u0275\u0275template(29, AnprAnalyticsChartsComponent_div_16_div_29_Template, 2, 0, "div", 15)(30, AnprAnalyticsChartsComponent_div_16_canvas_30_Template, 1, 3, "canvas", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 13)(32, "h3");
    \u0275\u0275text(33, "Speed Distribution");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 14);
    \u0275\u0275template(35, AnprAnalyticsChartsComponent_div_16_div_35_Template, 2, 0, "div", 15)(36, AnprAnalyticsChartsComponent_div_16_canvas_36_Template, 1, 3, "canvas", 16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", !ctx_r1.hourlyTrendData.labels || ctx_r1.hourlyTrendData.labels.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.hourlyTrendData.labels && ctx_r1.hourlyTrendData.labels.length > 0);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", !ctx_r1.dailyTrendData.labels || ctx_r1.dailyTrendData.labels.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.dailyTrendData.labels && ctx_r1.dailyTrendData.labels.length > 0);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", !ctx_r1.topJunctionsData.labels || ctx_r1.topJunctionsData.labels.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.topJunctionsData.labels && ctx_r1.topJunctionsData.labels.length > 0);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", !ctx_r1.topCamerasData.labels || ctx_r1.topCamerasData.labels.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.topCamerasData.labels && ctx_r1.topCamerasData.labels.length > 0);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", !ctx_r1.vehicleColorData.labels || ctx_r1.vehicleColorData.labels.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.vehicleColorData.labels && ctx_r1.vehicleColorData.labels.length > 0);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", !ctx_r1.speedDistributionData.labels || ctx_r1.speedDistributionData.labels.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.speedDistributionData.labels && ctx_r1.speedDistributionData.labels.length > 0);
  }
}
var AnprAnalyticsChartsComponent = class _AnprAnalyticsChartsComponent {
  // Properties
  startDate;
  endDate;
  loading = false;
  error = false;
  errorMessage = "";
  // Chart data properties
  hourlyTrendData = { datasets: [], labels: [] };
  dailyTrendData = { datasets: [], labels: [] };
  topJunctionsData = { datasets: [], labels: [] };
  topCamerasData = { datasets: [], labels: [] };
  vehicleColorData = { datasets: [], labels: [] };
  speedDistributionData = { datasets: [], labels: [] };
  // Inject HTTP client
  http = inject(HttpClient);
  baseUrl = "/api/analytics";
  constructor() {
    const today = /* @__PURE__ */ new Date();
    this.endDate = today.toISOString().split("T")[0];
    const monthAgo = new Date(today);
    monthAgo.setDate(monthAgo.getDate() - 30);
    this.startDate = monthAgo.toISOString().split("T")[0];
  }
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    if (this.loading)
      return;
    this.loading = true;
    this.error = false;
    this.errorMessage = "";
    const startIso = `${this.startDate}T00:00:00`;
    const endIso = `${this.endDate}T23:59:59`;
    if (new Date(startIso) > new Date(endIso)) {
      this.error = true;
      this.errorMessage = "Start date cannot be after end date";
      this.loading = false;
      return;
    }
    this.resetChartData();
    Promise.all([
      this.loadHourlyTrend(startIso, endIso),
      this.loadDailyTrend(startIso, endIso),
      this.loadTopJunctions(startIso, endIso),
      this.loadTopCameras(startIso, endIso),
      this.loadVehicleColors(startIso, endIso),
      this.loadSpeedDistribution(startIso, endIso)
    ]).catch((err) => {
      this.error = true;
      this.errorMessage = err.message || "Failed to load analytics data";
      console.error("Error loading data:", err);
    }).finally(() => {
      this.loading = false;
    });
  }
  onDateChange() {
    this.loadData();
  }
  resetChartData() {
    this.hourlyTrendData = { datasets: [], labels: [] };
    this.dailyTrendData = { datasets: [], labels: [] };
    this.topJunctionsData = { datasets: [], labels: [] };
    this.topCamerasData = { datasets: [], labels: [] };
    this.vehicleColorData = { datasets: [], labels: [] };
    this.speedDistributionData = { datasets: [], labels: [] };
  }
  loadHourlyTrend(startDate, endDate) {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/trend/hourly?start=${startDate}&end=${endDate}`;
      console.log("\u{1F517} API Call - Hourly Trend:", url);
      this.http.get(url).subscribe({
        next: (data) => {
          console.log("\u2705 Hourly Trend Response:", data);
          console.log("\u{1F4CA} Record Count:", data?.length || 0);
          if (data && data.length > 0) {
            console.log("\u{1F4CB} Sample Record:", data[0]);
            console.log("\u{1F50D} Expected Fields: time (ISO string), count (number)");
            console.log("   \u2713 time:", data[0].time, typeof data[0].time);
            console.log("   \u2713 count:", data[0].count, typeof data[0].count);
          }
          this.hourlyTrendData = this.createLineChartData(data, "Events", "#007bff", "hour");
          resolve();
        },
        error: (err) => {
          console.error("\u274C Error loading hourly trend:", err);
          console.error("\u{1F4CB} Failed URL:", url);
          console.error("\u{1F4CA} Error Status:", err.status);
          console.error("\u{1F4AC} Error Message:", err.message);
          reject(err);
        }
      });
    });
  }
  loadDailyTrend(startDate, endDate) {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/trend/daily?start=${startDate}&end=${endDate}`;
      console.log("\u{1F517} API Call - Daily Trend:", url);
      this.http.get(url).subscribe({
        next: (data) => {
          console.log("\u2705 Daily Trend Response:", data);
          console.log("\u{1F4CA} Record Count:", data?.length || 0);
          if (data && data.length > 0) {
            console.log("\u{1F4CB} Sample Record:", data[0]);
            console.log("\u{1F50D} Expected Fields: time (ISO string), count (number)");
            console.log("   \u2713 time:", data[0].time, typeof data[0].time);
            console.log("   \u2713 count:", data[0].count, typeof data[0].count);
          }
          this.dailyTrendData = this.createLineChartData(data, "Events", "#28a745", "day");
          resolve();
        },
        error: (err) => {
          console.error("\u274C Error loading daily trend:", err);
          console.error("\u{1F4CB} Failed URL:", url);
          console.error("\u{1F4CA} Error Status:", err.status);
          console.error("\u{1F4AC} Error Message:", err.message);
          reject(err);
        }
      });
    });
  }
  loadTopJunctions(startDate, endDate) {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/junctions/top?start=${startDate}&end=${endDate}&limit=10`;
      console.log("\u{1F517} API Call - Top Junctions:", url);
      this.http.get(url).subscribe({
        next: (data) => {
          console.log("\u2705 Top Junctions Response:", data);
          console.log("\u{1F4CA} Record Count:", data?.length || 0);
          if (data && data.length > 0) {
            console.log("\u{1F4CB} Sample Record:", data[0]);
            console.log("\u{1F50D} Expected Fields: junctionName (string), count (number)");
            console.log("   \u2713 junctionName:", data[0].junctionName, typeof data[0].junctionName);
            console.log("   \u2713 count:", data[0].count, typeof data[0].count);
          }
          const labels = data.map((d) => d.junctionName || "Unknown Junction");
          const values = data.map((d) => d.count || 0);
          this.topJunctionsData = {
            labels,
            datasets: [{
              label: "Events",
              data: values,
              backgroundColor: "#fd7e14",
              borderColor: "#fd7e14",
              borderWidth: 1,
              borderRadius: 4
            }]
          };
          resolve();
        },
        error: (err) => {
          console.error("\u274C Error loading top junctions:", err);
          console.error("\u{1F4CB} Failed URL:", url);
          console.error("\u{1F4CA} Error Status:", err.status);
          console.error("\u{1F4AC} Error Message:", err.message);
          reject(err);
        }
      });
    });
  }
  loadTopCameras(startDate, endDate) {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/cameras/top?start=${startDate}&end=${endDate}&limit=10`;
      console.log("\u{1F517} API Call - Top Cameras:", url);
      this.http.get(url).subscribe({
        next: (data) => {
          console.log("\u2705 Top Cameras Response:", data);
          console.log("\u{1F4CA} Record Count:", data?.length || 0);
          if (data && data.length > 0) {
            console.log("\u{1F4CB} Sample Record:", data[0]);
            console.log("\u{1F50D} Expected Fields: name (string), count (number)");
            console.log("   \u2713 name:", data[0].name, typeof data[0].name);
            console.log("   \u2713 count:", data[0].count, typeof data[0].count);
          }
          const labels = data.map((d) => d.name || "Unknown Camera");
          const values = data.map((d) => d.count || 0);
          this.topCamerasData = {
            labels,
            datasets: [{
              label: "Events",
              data: values,
              backgroundColor: "#6f42c1",
              borderColor: "#6f42c1",
              borderWidth: 1,
              borderRadius: 4
            }]
          };
          resolve();
        },
        error: (err) => {
          console.error("\u274C Error loading top cameras:", err);
          console.error("\u{1F4CB} Failed URL:", url);
          console.error("\u{1F4CA} Error Status:", err.status);
          console.error("\u{1F4AC} Error Message:", err.message);
          reject(err);
        }
      });
    });
  }
  loadVehicleColors(startDate, endDate) {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/vehicles/colors?start=${startDate}&end=${endDate}`;
      console.log("\u{1F517} API Call - Vehicle Colors:", url);
      this.http.get(url).subscribe({
        next: (data) => {
          console.log("\u2705 Vehicle Colors Response:", data);
          console.log("\u{1F4CA} Record Count:", data?.length || 0);
          if (data && data.length > 0) {
            console.log("\u{1F4CB} Sample Record:", data[0]);
            console.log("\u{1F50D} Expected Fields: name (string), count (number)");
            console.log("   \u2713 name:", data[0].name, typeof data[0].name);
            console.log("   \u2713 count:", data[0].count, typeof data[0].count);
          }
          const labels = data.map((d) => d.name || "Unknown");
          const values = data.map((d) => d.count || 0);
          const colors = labels.map((colorName) => this.getColorCode(colorName));
          this.vehicleColorData = {
            labels,
            datasets: [{
              label: "Events",
              data: values,
              backgroundColor: colors,
              borderColor: "#fff",
              borderWidth: 2,
              hoverOffset: 10
            }]
          };
          resolve();
        },
        error: (err) => {
          console.error("\u274C Error loading vehicle colors:", err);
          console.error("\u{1F4CB} Failed URL:", url);
          console.error("\u{1F4CA} Error Status:", err.status);
          console.error("\u{1F4AC} Error Message:", err.message);
          reject(err);
        }
      });
    });
  }
  loadSpeedDistribution(startDate, endDate) {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/vehicles/speed?start=${startDate}&end=${endDate}`;
      console.log("\u{1F517} API Call - Speed Distribution:", url);
      this.http.get(url).subscribe({
        next: (data) => {
          console.log("\u2705 Speed Distribution Response:", data);
          console.log("\u{1F4CA} Record Count:", data?.length || 0);
          if (data && data.length > 0) {
            console.log("\u{1F4CB} Sample Record:", data[0]);
            console.log("\u{1F50D} Expected Fields: name (string), count (number)");
            console.log("   \u2713 name:", data[0].name, typeof data[0].name);
            console.log("   \u2713 count:", data[0].count, typeof data[0].count);
          }
          const labels = data.map((d) => d.name || "Unknown");
          const values = data.map((d) => d.count || 0);
          this.speedDistributionData = {
            labels,
            datasets: [{
              label: "Events",
              data: values,
              backgroundColor: "#17a2b8",
              borderColor: "#17a2b8",
              borderWidth: 1,
              borderRadius: 4
            }]
          };
          resolve();
        },
        error: (err) => {
          console.error("\u274C Error loading speed distribution:", err);
          console.error("\u{1F4CB} Failed URL:", url);
          console.error("\u{1F4CA} Error Status:", err.status);
          console.error("\u{1F4AC} Error Message:", err.message);
          reject(err);
        }
      });
    });
  }
  createLineChartData(data, label, color, type) {
    if (!data || data.length === 0) {
      return { labels: [], datasets: [] };
    }
    const sortedData = [...data].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
    const labels = sortedData.map((item) => {
      try {
        const date = new Date(item.time);
        if (type === "hour") {
          return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          });
        } else {
          return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          });
        }
      } catch (e) {
        return "Invalid Date";
      }
    });
    const values = sortedData.map((item) => item.count || 0);
    return {
      labels,
      datasets: [{
        label,
        data: values,
        borderColor: color,
        backgroundColor: color + "20",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: color,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    };
  }
  getLineChartOptions(xLabel) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Number of Events",
            font: {
              weight: "bold"
            }
          },
          grid: {
            color: "rgba(0, 0, 0, 0.1)"
          }
        },
        x: {
          title: {
            display: true,
            text: xLabel,
            font: {
              weight: "bold"
            }
          },
          grid: {
            color: "rgba(0, 0, 0, 0.1)"
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          mode: "index",
          intersect: false,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          }
        }
      },
      interaction: {
        intersect: false,
        mode: "nearest"
      }
    };
  }
  getBarChartOptions(xLabel) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Number of Events",
            font: {
              weight: "bold"
            }
          },
          grid: {
            color: "rgba(0, 0, 0, 0.1)"
          }
        },
        x: {
          title: {
            display: true,
            text: xLabel,
            font: {
              weight: "bold"
            }
          },
          grid: {
            display: false
          },
          ticks: {
            maxRotation: 45,
            minRotation: 0,
            autoSkip: true,
            maxTicksLimit: 10
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          }
        }
      }
    };
  }
  getPieChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "right",
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || "";
              const value = context.raw;
              const datasetData = context.dataset.data;
              const total = datasetData.reduce((acc, curr) => {
                const num = typeof curr === "number" ? curr : curr?.y || 0;
                return acc + num;
              }, 0);
              const percentage = total > 0 ? Math.round(value / total * 100) : 0;
              return `${label}: ${value} (${percentage}%)`;
            }
          },
          backgroundColor: "rgba(0, 0, 0, 0.7)"
        }
      }
    };
  }
  getColorCode(colorName) {
    const colors = {
      "red": "#dc3545",
      "blue": "#0066cc",
      "black": "#333333",
      "white": "#e9ecef",
      "silver": "#c0c0c0",
      "gray": "#808080",
      "grey": "#808080",
      "green": "#28a745",
      "yellow": "#ffc107",
      "orange": "#fd7e14",
      "brown": "#8b4513",
      "gold": "#ffd700",
      "purple": "#6f42c1",
      "pink": "#e83e8c",
      "cyan": "#17a2b8",
      "maroon": "#800000",
      "navy": "#000080",
      "teal": "#008080",
      "olive": "#808000",
      "lime": "#00ff00",
      "aqua": "#00ffff",
      "magenta": "#ff00ff"
    };
    return colors[colorName?.toLowerCase()] || "#999999";
  }
  static \u0275fac = function AnprAnalyticsChartsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AnprAnalyticsChartsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AnprAnalyticsChartsComponent, selectors: [["app-anpr-analytics-charts"]], decls: 17, vars: 9, consts: [[1, "analytics-container"], [1, "controls"], [1, "date-input-group"], ["type", "date", 1, "input-field", 3, "ngModelChange", "change", "ngModel", "disabled"], [1, "load-btn", 3, "click", "disabled"], ["class", "loading", 4, "ngIf"], ["class", "error", 4, "ngIf"], ["class", "charts-grid", 4, "ngIf"], [1, "loading"], [1, "spinner"], [1, "error"], [1, "retry-btn", 3, "click"], [1, "charts-grid"], [1, "chart-card"], [1, "chart-container"], ["class", "no-data-message", 4, "ngIf"], ["baseChart", "", 3, "data", "options", "type", 4, "ngIf"], [1, "no-data-message"], ["baseChart", "", 3, "data", "options", "type"]], template: function AnprAnalyticsChartsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2");
      \u0275\u0275text(2, "ANPR Analytics - Charts");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 1)(4, "div", 2)(5, "label");
      \u0275\u0275text(6, "From Date:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function AnprAnalyticsChartsComponent_Template_input_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.startDate, $event) || (ctx.startDate = $event);
        return $event;
      });
      \u0275\u0275listener("change", function AnprAnalyticsChartsComponent_Template_input_change_7_listener() {
        return ctx.onDateChange();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 2)(9, "label");
      \u0275\u0275text(10, "To Date:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function AnprAnalyticsChartsComponent_Template_input_ngModelChange_11_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.endDate, $event) || (ctx.endDate = $event);
        return $event;
      });
      \u0275\u0275listener("change", function AnprAnalyticsChartsComponent_Template_input_change_11_listener() {
        return ctx.onDateChange();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "button", 4);
      \u0275\u0275listener("click", function AnprAnalyticsChartsComponent_Template_button_click_12_listener() {
        return ctx.loadData();
      });
      \u0275\u0275text(13);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(14, AnprAnalyticsChartsComponent_div_14_Template, 4, 0, "div", 5)(15, AnprAnalyticsChartsComponent_div_15_Template, 5, 1, "div", 6)(16, AnprAnalyticsChartsComponent_div_16_Template, 37, 12, "div", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.startDate);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.endDate);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.loading ? "Loading..." : "Load Data", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && !ctx.error);
    }
  }, dependencies: [CommonModule, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, NgChartsModule, BaseChartDirective, HttpClientModule], styles: ["\n\n.analytics-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  background: #f8f9fa;\n  min-height: 100vh;\n}\nh2[_ngcontent-%COMP%] {\n  color: #122e52;\n  margin-bottom: 20px;\n  font-size: 24px;\n}\n.controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 15px;\n  margin-bottom: 20px;\n  align-items: end;\n  flex-wrap: wrap;\n  background: white;\n  padding: 15px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.date-input-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.date-input-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 14px;\n  color: #333;\n}\n.input-field[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n  width: 200px;\n}\n.input-field[_ngcontent-%COMP%]:disabled {\n  background: #f5f5f5;\n  cursor: not-allowed;\n}\n.load-btn[_ngcontent-%COMP%] {\n  padding: 8px 20px;\n  background: #007bff;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  transition: background-color 0.3s;\n}\n.load-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #0056b3;\n}\n.load-btn[_ngcontent-%COMP%]:disabled {\n  background: #cccccc;\n  cursor: not-allowed;\n}\n.retry-btn[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  padding: 8px 15px;\n  background: #dc3545;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-weight: 600;\n}\n.retry-btn[_ngcontent-%COMP%]:hover {\n  background: #c82333;\n}\n.charts-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));\n  gap: 20px;\n}\n.chart-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  height: fit-content;\n}\n.chart-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 15px 0;\n  color: #122e52;\n  font-size: 16px;\n}\n.chart-container[_ngcontent-%COMP%] {\n  position: relative;\n  height: 300px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.no-data-message[_ngcontent-%COMP%] {\n  color: #999;\n  font-size: 16px;\n  font-weight: 500;\n  text-align: center;\n  padding: 20px;\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #007bff;\n  font-size: 16px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 15px;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #f3f3f3;\n  border-top: 4px solid #007bff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.error[_ngcontent-%COMP%] {\n  background: #f8d7da;\n  color: #721c24;\n  padding: 20px;\n  border-radius: 8px;\n  border: 1px solid #f5c6cb;\n  margin-bottom: 20px;\n  text-align: center;\n}\n@media (max-width: 768px) {\n  .controls[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .input-field[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .charts-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .chart-container[_ngcontent-%COMP%] {\n    height: 250px;\n  }\n}\n/*# sourceMappingURL=anpr-analytics-charts.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnprAnalyticsChartsComponent, [{
    type: Component,
    args: [{ standalone: true, imports: [CommonModule, FormsModule, NgChartsModule, HttpClientModule], selector: "app-anpr-analytics-charts", template: `
    <div class="analytics-container">
      <h2>ANPR Analytics - Charts</h2>

      <!-- Date Range Controls -->
      <div class="controls">
        <div class="date-input-group">
          <label>From Date:</label>
          <input 
            type="date" 
            [(ngModel)]="startDate" 
            (change)="onDateChange()"
            class="input-field"
            [disabled]="loading"
          >
        </div>
        <div class="date-input-group">
          <label>To Date:</label>
          <input 
            type="date" 
            [(ngModel)]="endDate" 
            (change)="onDateChange()"
            class="input-field"
            [disabled]="loading"
          >
        </div>
        <button (click)="loadData()" class="load-btn" [disabled]="loading">
          {{ loading ? 'Loading...' : 'Load Data' }}
        </button>
      </div>

      <!-- Loading/Error States -->
      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading charts...</p>
      </div>
      <div *ngIf="error" class="error">
        <p>{{ errorMessage }}</p>
        <button (click)="loadData()" class="retry-btn">Retry</button>
      </div>

      <!-- Charts Grid -->
      <div class="charts-grid" *ngIf="!loading && !error">
        <!-- Hourly Trend Chart -->
        <div class="chart-card">
          <h3>Events - Hourly Trend</h3>
          <div class="chart-container">
            <div *ngIf="!hourlyTrendData.labels || hourlyTrendData.labels.length === 0" class="no-data-message">
              No data available for the selected date range
            </div>
            <canvas 
              *ngIf="hourlyTrendData.labels && hourlyTrendData.labels.length > 0"
              baseChart
              [data]="hourlyTrendData"
              [options]="getLineChartOptions('Hour')"
              [type]="'line'"
            >
            </canvas>
          </div>
        </div>

        <!-- Daily Trend Chart -->
        <div class="chart-card">
          <h3>Events - Daily Trend</h3>
          <div class="chart-container">
            <div *ngIf="!dailyTrendData.labels || dailyTrendData.labels.length === 0" class="no-data-message">
              No data available for the selected date range
            </div>
            <canvas 
              *ngIf="dailyTrendData.labels && dailyTrendData.labels.length > 0"
              baseChart
              [data]="dailyTrendData"
              [options]="getLineChartOptions('Day')"
              [type]="'line'"
            >
            </canvas>
          </div>
        </div>

        <!-- Top Junctions Chart -->
        <div class="chart-card">
          <h3>Events by Top Junctions</h3>
          <div class="chart-container">
            <div *ngIf="!topJunctionsData.labels || topJunctionsData.labels.length === 0" class="no-data-message">
              No data available for the selected date range
            </div>
            <canvas 
              *ngIf="topJunctionsData.labels && topJunctionsData.labels.length > 0"
              baseChart
              [data]="topJunctionsData"
              [options]="getBarChartOptions('Junctions')"
              [type]="'bar'"
            >
            </canvas>
          </div>
        </div>

        <!-- Top Cameras Chart -->
        <div class="chart-card">
          <h3>Events by Top Cameras</h3>
          <div class="chart-container">
            <div *ngIf="!topCamerasData.labels || topCamerasData.labels.length === 0" class="no-data-message">
              No data available for the selected date range
            </div>
            <canvas 
              *ngIf="topCamerasData.labels && topCamerasData.labels.length > 0"
              baseChart
              [data]="topCamerasData"
              [options]="getBarChartOptions('Cameras')"
              [type]="'bar'"
            >
            </canvas>
          </div>
        </div>

        <!-- Vehicle Color Distribution Chart -->
        <div class="chart-card">
          <h3>Events by Vehicle Color</h3>
          <div class="chart-container">
            <div *ngIf="!vehicleColorData.labels || vehicleColorData.labels.length === 0" class="no-data-message">
              No data available for the selected date range
            </div>
            <canvas 
              *ngIf="vehicleColorData.labels && vehicleColorData.labels.length > 0"
              baseChart
              [data]="vehicleColorData"
              [options]="getPieChartOptions()"
              [type]="'pie'"
            >
            </canvas>
          </div>
        </div>

        <!-- Speed Distribution Chart -->
        <div class="chart-card">
          <h3>Speed Distribution</h3>
          <div class="chart-container">
            <div *ngIf="!speedDistributionData.labels || speedDistributionData.labels.length === 0" class="no-data-message">
              No data available for the selected date range
            </div>
            <canvas 
              *ngIf="speedDistributionData.labels && speedDistributionData.labels.length > 0"
              baseChart
              [data]="speedDistributionData"
              [options]="getBarChartOptions('Speed Range')"
              [type]="'bar'"
            >
            </canvas>
          </div>
        </div>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;5c5fbe0ac16e901e28b92a03bafca519de88ea23656eb9f5d2ccd7629b613e6d;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/admin/anpr-analytics-charts.component.ts */\n.analytics-container {\n  padding: 20px;\n  background: #f8f9fa;\n  min-height: 100vh;\n}\nh2 {\n  color: #122e52;\n  margin-bottom: 20px;\n  font-size: 24px;\n}\n.controls {\n  display: flex;\n  gap: 15px;\n  margin-bottom: 20px;\n  align-items: end;\n  flex-wrap: wrap;\n  background: white;\n  padding: 15px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.date-input-group {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.date-input-group label {\n  font-weight: bold;\n  font-size: 14px;\n  color: #333;\n}\n.input-field {\n  padding: 8px 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n  width: 200px;\n}\n.input-field:disabled {\n  background: #f5f5f5;\n  cursor: not-allowed;\n}\n.load-btn {\n  padding: 8px 20px;\n  background: #007bff;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  transition: background-color 0.3s;\n}\n.load-btn:hover:not(:disabled) {\n  background: #0056b3;\n}\n.load-btn:disabled {\n  background: #cccccc;\n  cursor: not-allowed;\n}\n.retry-btn {\n  margin-top: 10px;\n  padding: 8px 15px;\n  background: #dc3545;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-weight: 600;\n}\n.retry-btn:hover {\n  background: #c82333;\n}\n.charts-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));\n  gap: 20px;\n}\n.chart-card {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  height: fit-content;\n}\n.chart-card h3 {\n  margin: 0 0 15px 0;\n  color: #122e52;\n  font-size: 16px;\n}\n.chart-container {\n  position: relative;\n  height: 300px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.no-data-message {\n  color: #999;\n  font-size: 16px;\n  font-weight: 500;\n  text-align: center;\n  padding: 20px;\n}\n.loading {\n  text-align: center;\n  padding: 40px;\n  color: #007bff;\n  font-size: 16px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 15px;\n}\n.spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #f3f3f3;\n  border-top: 4px solid #007bff;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n}\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.error {\n  background: #f8d7da;\n  color: #721c24;\n  padding: 20px;\n  border-radius: 8px;\n  border: 1px solid #f5c6cb;\n  margin-bottom: 20px;\n  text-align: center;\n}\n@media (max-width: 768px) {\n  .controls {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .input-field {\n    width: 100%;\n  }\n  .charts-grid {\n    grid-template-columns: 1fr;\n  }\n  .chart-container {\n    height: 250px;\n  }\n}\n/*# sourceMappingURL=anpr-analytics-charts.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AnprAnalyticsChartsComponent, { className: "AnprAnalyticsChartsComponent", filePath: "src/app/components/admin/anpr-analytics-charts.component.ts", lineNumber: 345 });
})();

// src/app/components/admin/bus-analytics.component.ts
function BusAnalyticsComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10)(2, "label");
    \u0275\u0275text(3, "Select Date:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 11);
    \u0275\u0275twoWayListener("ngModelChange", function BusAnalyticsComponent_div_8_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedDate, $event) || (ctx_r1.selectedDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function BusAnalyticsComponent_div_8_Template_input_change_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDateChange());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 10)(6, "label");
    \u0275\u0275text(7, "Frequent Absentees (Days):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 12);
    \u0275\u0275twoWayListener("ngModelChange", function BusAnalyticsComponent_div_8_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.frequentAbsenteeDays, $event) || (ctx_r1.frequentAbsenteeDays = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function BusAnalyticsComponent_div_8_Template_input_change_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDaysChange());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 13);
    \u0275\u0275listener("click", function BusAnalyticsComponent_div_8_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadData());
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedDate);
    \u0275\u0275property("disabled", ctx_r1.loading);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.frequentAbsenteeDays);
    \u0275\u0275property("disabled", ctx_r1.loading);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.loading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.loading ? "Loading..." : "Load Data", " ");
  }
}
function BusAnalyticsComponent_div_9_div_13_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36)(1, "div", 37);
    \u0275\u0275element(2, "div", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 39);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.uploadProgress, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.uploadProgress, "%");
  }
}
function BusAnalyticsComponent_div_9_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25)(2, "span", 26);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 27);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 28);
    \u0275\u0275listener("click", function BusAnalyticsComponent_div_9_div_13_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeFile());
    });
    \u0275\u0275text(7, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, BusAnalyticsComponent_div_9_div_13_div_8_Template, 5, 3, "div", 29);
    \u0275\u0275elementStart(9, "div", 30)(10, "div", 31)(11, "label")(12, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", function BusAnalyticsComponent_div_9_div_13_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.uploadTarget, $event) || (ctx_r1.uploadTarget = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " Upload as Bus Master ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "label")(15, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function BusAnalyticsComponent_div_9_div_13_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.uploadTarget, $event) || (ctx_r1.uploadTarget = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " Upload as Outshedding ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "button", 34);
    \u0275\u0275listener("click", function BusAnalyticsComponent_div_9_div_13_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.uploadExcel());
    });
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 35);
    \u0275\u0275listener("click", function BusAnalyticsComponent_div_9_div_13_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.downloadSample());
    });
    \u0275\u0275text(20, " \u{1F4E5} Download Sample Excel ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u{1F4C4} ", ctx_r1.selectedFile.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getFileSize(ctx_r1.selectedFile.size));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.uploadProgress > 0);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.uploadTarget);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.uploadTarget);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.uploading || !ctx_r1.selectedFile);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.uploading ? "Uploading..." : ctx_r1.uploadTarget === "master" ? "Upload Bus Master" : "Upload Outshedding", " ");
  }
}
function BusAnalyticsComponent_div_9_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "h4");
    \u0275\u0275text(2, "\u{1F4CB} Upload Summary");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 41)(4, "div", 42)(5, "span", 43);
    \u0275\u0275text(6, "Total Records");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 44);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 42)(10, "span", 43);
    \u0275\u0275text(11, "Valid Records");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 45);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 42)(15, "span", 43);
    \u0275\u0275text(16, "Invalid Records");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 46);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 42)(20, "span", 43);
    \u0275\u0275text(21, "Unique Buses");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 47);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 48)(25, "span");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.excelSummary.totalRecords);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.excelSummary.validRecords);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.excelSummary.invalidRecords);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.excelSummary.busCount);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Date Range: ", ctx_r1.excelSummary.dateRange.start, " to ", ctx_r1.excelSummary.dateRange.end);
  }
}
function BusAnalyticsComponent_div_9_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49)(1, "div", 50)(2, "label");
    \u0275\u0275text(3, "Analysis Period:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 51);
    \u0275\u0275twoWayListener("ngModelChange", function BusAnalyticsComponent_div_9_div_15_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedPeriod, $event) || (ctx_r1.selectedPeriod = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function BusAnalyticsComponent_div_9_div_15_Template_select_change_4_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateExcelCharts());
    });
    \u0275\u0275elementStart(5, "option", 52);
    \u0275\u0275text(6, "Last 7 Days");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 53);
    \u0275\u0275text(8, "Last 30 Days");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "option", 54);
    \u0275\u0275text(10, "Last 90 Days");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option", 55);
    \u0275\u0275text(12, "All Data");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 50)(14, "label");
    \u0275\u0275text(15, "View Type:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "select", 56);
    \u0275\u0275twoWayListener("ngModelChange", function BusAnalyticsComponent_div_9_div_15_Template_select_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedView, $event) || (ctx_r1.selectedView = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function BusAnalyticsComponent_div_9_div_15_Template_select_change_16_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateExcelCharts());
    });
    \u0275\u0275elementStart(17, "option", 57);
    \u0275\u0275text(18, "Daily Overview");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "option", 58);
    \u0275\u0275text(20, "Bus Performance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "option", 59);
    \u0275\u0275text(22, "Shift Analysis");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "option", 60);
    \u0275\u0275text(24, "Route Performance");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "button", 61);
    \u0275\u0275listener("click", function BusAnalyticsComponent_div_9_div_15_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.exportToExcel());
    });
    \u0275\u0275text(26, " \u{1F4CA} Export Analytics ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedPeriod);
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedView);
  }
}
function BusAnalyticsComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 15)(2, "div", 16);
    \u0275\u0275listener("drop", function BusAnalyticsComponent_div_9_Template_div_drop_2_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFileDrop($event));
    })("dragover", function BusAnalyticsComponent_div_9_Template_div_dragover_2_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDragOver($event));
    })("click", function BusAnalyticsComponent_div_9_Template_div_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const fileInput_r4 = \u0275\u0275reference(12);
      return \u0275\u0275resetView(fileInput_r4.click());
    });
    \u0275\u0275elementStart(3, "div", 17);
    \u0275\u0275text(4, "\u{1F4CA}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h4");
    \u0275\u0275text(6, "Upload Excel File");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 18);
    \u0275\u0275text(8, "Drag & drop your Excel file here or click to browse");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 19);
    \u0275\u0275text(10, "Supported formats: .xlsx, .xls");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 20, 0);
    \u0275\u0275listener("change", function BusAnalyticsComponent_div_9_Template_input_change_11_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFileSelected($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(13, BusAnalyticsComponent_div_9_div_13_Template, 21, 7, "div", 21)(14, BusAnalyticsComponent_div_9_div_14_Template, 27, 6, "div", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, BusAnalyticsComponent_div_9_div_15_Template, 27, 2, "div", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275classProp("dragover", ctx_r1.isDragging);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngIf", ctx_r1.selectedFile);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.excelSummary);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.excelDataAvailable);
  }
}
function BusAnalyticsComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62);
    \u0275\u0275element(1, "div", 63);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.useExcelMode ? "Processing Excel data..." : "Loading bus analytics data...");
  }
}
function BusAnalyticsComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 64)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 65);
    \u0275\u0275listener("click", function BusAnalyticsComponent_div_11_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.useExcelMode ? ctx_r1.retryExcel() : ctx_r1.loadData());
    });
    \u0275\u0275text(4, " Retry ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function BusAnalyticsComponent_div_12_div_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71)(1, "h3");
    \u0275\u0275text(2, "\u{1F4C8} Daily Attendance Trend");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 72);
    \u0275\u0275element(4, "canvas", 73);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("data", ctx_r1.dailyTrendChartData)("options", ctx_r1.dailyTrendChartOptions)("type", "line");
  }
}
function BusAnalyticsComponent_div_12_div_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71)(1, "h3");
    \u0275\u0275text(2, "\u{1F68C} Top 10 Bus Performance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 72);
    \u0275\u0275element(4, "canvas", 73);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("data", ctx_r1.busPerformanceChartData)("options", ctx_r1.busPerformanceChartOptions)("type", "bar");
  }
}
function BusAnalyticsComponent_div_12_div_1_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71)(1, "h3");
    \u0275\u0275text(2, "\u{1F550} Shift Distribution Analysis");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 74)(4, "div", 75);
    \u0275\u0275element(5, "canvas", 73);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 75);
    \u0275\u0275element(7, "canvas", 73);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275property("data", ctx_r1.shiftDistributionChartData)("options", ctx_r1.shiftDistributionChartOptions)("type", "doughnut");
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx_r1.shiftTrendChartData)("options", ctx_r1.shiftTrendChartOptions)("type", "line");
  }
}
function BusAnalyticsComponent_div_12_div_1_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71)(1, "h3");
    \u0275\u0275text(2, "\u{1F5FA}\uFE0F Route Performance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 72);
    \u0275\u0275element(4, "canvas", 73);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("data", ctx_r1.routePerformanceChartData)("options", ctx_r1.routePerformanceChartOptions)("type", "bar");
  }
}
function BusAnalyticsComponent_div_12_div_1_div_5_div_3_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 82);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td")(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td")(15, "span");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const bus_r8 = ctx.$implicit;
    const i_r9 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r9 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(bus_r8.busNo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(bus_r8.totalDays);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(bus_r8.presentDays);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(bus_r8.absentDays);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getAttendanceClass(bus_r8.attendanceRate));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", bus_r8.attendanceRate, "% ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getStatusClass(bus_r8.attendanceRate));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(bus_r8.attendanceRate), " ");
  }
}
function BusAnalyticsComponent_div_12_div_1_div_5_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 78)(1, "h4");
    \u0275\u0275text(2, "Bus Performance Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 79)(4, "table", 80)(5, "thead")(6, "tr")(7, "th");
    \u0275\u0275text(8, "Rank");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Bus No");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Total Days");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Present Days");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "Absent Days");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "Attendance %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20, "Status");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "tbody");
    \u0275\u0275template(22, BusAnalyticsComponent_div_12_div_1_div_5_div_3_tr_22_Template, 17, 11, "tr", 81);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(22);
    \u0275\u0275property("ngForOf", ctx_r1.getTopBuses(15));
  }
}
function BusAnalyticsComponent_div_12_div_1_div_5_div_4_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td")(12, "div", 83);
    \u0275\u0275element(13, "span", 84)(14, "span", 85);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const day_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(day_r10.date);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(day_r10.total);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(day_r10.present);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(day_r10.absent);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", day_r10.attendanceRate, "%");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("opacity", day_r10.morningCoverage);
    \u0275\u0275advance();
    \u0275\u0275styleProp("opacity", day_r10.eveningCoverage);
  }
}
function BusAnalyticsComponent_div_12_div_1_div_5_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 78)(1, "h4");
    \u0275\u0275text(2, "Daily Attendance Summary");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 79)(4, "table", 80)(5, "thead")(6, "tr")(7, "th");
    \u0275\u0275text(8, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Total Buses");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Present");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Absent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "Attendance %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "Shift Coverage");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "tbody");
    \u0275\u0275template(20, BusAnalyticsComponent_div_12_div_1_div_5_div_4_tr_20_Template, 15, 9, "tr", 81);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(20);
    \u0275\u0275property("ngForOf", ctx_r1.getDailySummary());
  }
}
function BusAnalyticsComponent_div_12_div_1_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 76)(1, "h3");
    \u0275\u0275text(2, "\u{1F4CA} Detailed Analytics");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, BusAnalyticsComponent_div_12_div_1_div_5_div_3_Template, 23, 1, "div", 77)(4, BusAnalyticsComponent_div_12_div_1_div_5_div_4_Template, 21, 1, "div", 77);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.selectedView === "buses");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedView === "daily");
  }
}
function BusAnalyticsComponent_div_12_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68);
    \u0275\u0275template(1, BusAnalyticsComponent_div_12_div_1_div_1_Template, 5, 3, "div", 69)(2, BusAnalyticsComponent_div_12_div_1_div_2_Template, 5, 3, "div", 69)(3, BusAnalyticsComponent_div_12_div_1_div_3_Template, 8, 6, "div", 69)(4, BusAnalyticsComponent_div_12_div_1_div_4_Template, 5, 3, "div", 69)(5, BusAnalyticsComponent_div_12_div_1_div_5_Template, 5, 2, "div", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedView === "daily");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedView === "buses");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedView === "shifts");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedView === "routes");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.excelAnalytics);
  }
}
function BusAnalyticsComponent_div_12_div_2_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 95);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getPercentage(ctx_r1.availability.present, ctx_r1.availability.totalRegistered), "% ");
  }
}
function BusAnalyticsComponent_div_12_div_2_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 95);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getPercentage(ctx_r1.availability.absent, ctx_r1.availability.totalRegistered), "% ");
  }
}
function BusAnalyticsComponent_div_12_div_2_div_31_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72);
    \u0275\u0275element(1, "canvas", 73);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx_r1.shiftChartData)("options", ctx_r1.getShiftChartOptions())("type", "doughnut");
  }
}
function BusAnalyticsComponent_div_12_div_2_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 76)(1, "h3");
    \u0275\u0275text(2, "\u{1F550} Shift-wise Summary");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 96)(4, "div", 97)(5, "span", 98);
    \u0275\u0275text(6, "\u{1F305}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 99);
    \u0275\u0275text(8, "Morning Only");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 100);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 101)(12, "span", 98);
    \u0275\u0275text(13, "\u{1F306}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 99);
    \u0275\u0275text(15, "Evening Only");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 100);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 102)(19, "span", 98);
    \u0275\u0275text(20, "\u{1F504}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 99);
    \u0275\u0275text(22, "Both Shifts");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 100);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 103)(26, "span", 98);
    \u0275\u0275text(27, "\u{1F6AB}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 99);
    \u0275\u0275text(29, "Absent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 100);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(32, BusAnalyticsComponent_div_12_div_2_div_31_div_32_Template, 2, 3, "div", 104);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.shiftSummary.morningOnly);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.shiftSummary.eveningOnly);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.shiftSummary.bothShifts);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.shiftSummary.absent);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.shiftChartData.labels);
  }
}
function BusAnalyticsComponent_div_12_div_2_div_32_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 107)(1, "p");
    \u0275\u0275text(2, "\u2705 All buses are accounted for!");
    \u0275\u0275elementEnd()();
  }
}
function BusAnalyticsComponent_div_12_div_2_div_32_div_4_tr_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 82);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "span", 108);
    \u0275\u0275text(7, "Absent");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const bus_r11 = ctx.$implicit;
    const i_r12 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r12 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(bus_r11);
  }
}
function BusAnalyticsComponent_div_12_div_2_div_32_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79)(1, "table", 80)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Bus Number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Status");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "tbody");
    \u0275\u0275template(11, BusAnalyticsComponent_div_12_div_2_div_32_div_4_tr_11_Template, 8, 2, "tr", 81);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngForOf", ctx_r1.missingBuses);
  }
}
function BusAnalyticsComponent_div_12_div_2_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 76)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, BusAnalyticsComponent_div_12_div_2_div_32_div_3_Template, 3, 0, "div", 105)(4, BusAnalyticsComponent_div_12_div_2_div_32_div_4_Template, 12, 1, "div", 106);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F50D} Missing Buses on ", ctx_r1.selectedDate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.missingBuses.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.missingBuses.length > 0);
  }
}
function BusAnalyticsComponent_div_12_div_2_div_33_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 107)(1, "p");
    \u0275\u0275text(2, "\u2705 No frequent absentees found!");
    \u0275\u0275elementEnd()();
  }
}
function BusAnalyticsComponent_div_12_div_2_div_33_div_4_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 110);
    \u0275\u0275listener("click", function BusAnalyticsComponent_div_12_div_2_div_33_div_4_tr_13_Template_tr_click_0_listener() {
      const absentee_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.viewBusHistory(absentee_r14.busNo));
    });
    \u0275\u0275elementStart(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 82);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "span", 111);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td")(9, "button", 112);
    \u0275\u0275listener("click", function BusAnalyticsComponent_div_12_div_2_div_33_div_4_tr_13_Template_button_click_9_listener($event) {
      const absentee_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      ctx_r1.viewBusHistory(absentee_r14.busNo);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(10, " View History ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const absentee_r14 = ctx.$implicit;
    const i_r15 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r15 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(absentee_r14.busNo);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", absentee_r14.absentCount, " days");
  }
}
function BusAnalyticsComponent_div_12_div_2_div_33_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79)(1, "table", 80)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Bus Number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Absent Days");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Details");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275template(13, BusAnalyticsComponent_div_12_div_2_div_33_div_4_tr_13_Template, 11, 3, "tr", 109);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r1.frequentAbsentees);
  }
}
function BusAnalyticsComponent_div_12_div_2_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 76)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, BusAnalyticsComponent_div_12_div_2_div_33_div_3_Template, 3, 0, "div", 105)(4, BusAnalyticsComponent_div_12_div_2_div_33_div_4_Template, 14, 1, "div", 106);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F4C8} Frequent Absentees (Last ", ctx_r1.frequentAbsenteeDays, " Days)");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.frequentAbsentees.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.frequentAbsentees.length > 0);
  }
}
function BusAnalyticsComponent_div_12_div_2_div_34_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 107)(1, "p");
    \u0275\u0275text(2, "No history records found for this bus.");
    \u0275\u0275elementEnd()();
  }
}
function BusAnalyticsComponent_div_12_div_2_div_34_div_7_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const record_r17 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(record_r17.date);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(record_r17.morningRoute);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(record_r17.outTime);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(record_r17.eveningRoute);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(record_r17.inTime);
  }
}
function BusAnalyticsComponent_div_12_div_2_div_34_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79)(1, "table", 80)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Morning Route");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Out Time");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Evening Route");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "In Time");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275template(15, BusAnalyticsComponent_div_12_div_2_div_34_div_7_tr_15_Template, 11, 5, "tr", 81);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(15);
    \u0275\u0275property("ngForOf", ctx_r1.selectedBusHistory);
  }
}
function BusAnalyticsComponent_div_12_div_2_div_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 76)(1, "div", 113)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 114);
    \u0275\u0275listener("click", function BusAnalyticsComponent_div_12_div_2_div_34_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.clearBusHistory());
    });
    \u0275\u0275text(5, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, BusAnalyticsComponent_div_12_div_2_div_34_div_6_Template, 3, 0, "div", 105)(7, BusAnalyticsComponent_div_12_div_2_div_34_div_7_Template, 16, 1, "div", 106);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u{1F4CB} Bus History - ", ctx_r1.selectedBusNo);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.selectedBusHistory.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedBusHistory.length > 0);
  }
}
function BusAnalyticsComponent_div_12_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66)(1, "div", 76)(2, "h3");
    \u0275\u0275text(3, "\u{1F4CA} Daily Availability Summary");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 86)(5, "div", 87)(6, "div", 88);
    \u0275\u0275text(7, "\u{1F4CB}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 89)(9, "div", 90);
    \u0275\u0275text(10, "Total Registered");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 91);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 92)(14, "div", 88);
    \u0275\u0275text(15, "\u2705");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 89)(17, "div", 90);
    \u0275\u0275text(18, "Present");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 91);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, BusAnalyticsComponent_div_12_div_2_div_21_Template, 2, 1, "div", 93);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 94)(23, "div", 88);
    \u0275\u0275text(24, "\u274C");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 89)(26, "div", 90);
    \u0275\u0275text(27, "Absent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 91);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275template(30, BusAnalyticsComponent_div_12_div_2_div_30_Template, 2, 1, "div", 93);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(31, BusAnalyticsComponent_div_12_div_2_div_31_Template, 33, 5, "div", 70)(32, BusAnalyticsComponent_div_12_div_2_div_32_Template, 5, 3, "div", 70)(33, BusAnalyticsComponent_div_12_div_2_div_33_Template, 5, 3, "div", 70)(34, BusAnalyticsComponent_div_12_div_2_div_34_Template, 8, 3, "div", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate((ctx_r1.availability == null ? null : ctx_r1.availability.totalRegistered) || 0);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate((ctx_r1.availability == null ? null : ctx_r1.availability.present) || 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.availability);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate((ctx_r1.availability == null ? null : ctx_r1.availability.absent) || 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.availability);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.shiftSummary);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.missingBuses);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.frequentAbsentees);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedBusHistory && ctx_r1.selectedBusNo);
  }
}
function BusAnalyticsComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66);
    \u0275\u0275template(1, BusAnalyticsComponent_div_12_div_1_Template, 6, 5, "div", 67)(2, BusAnalyticsComponent_div_12_div_2_Template, 35, 9, "div", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.useExcelMode && ctx_r1.excelDataAvailable);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.useExcelMode && !ctx_r1.loading && !ctx_r1.error);
  }
}
var BusAnalyticsComponent = class _BusAnalyticsComponent {
  // Live API Mode Properties
  selectedDate;
  frequentAbsenteeDays = 7;
  loading = false;
  error = false;
  errorMessage = "";
  availability = null;
  shiftSummary = null;
  missingBuses = [];
  frequentAbsentees = [];
  selectedBusHistory = [];
  selectedBusNo = "";
  shiftChartData = { datasets: [], labels: [] };
  // Excel Upload Mode Properties
  useExcelMode = false;
  selectedFile = null;
  isDragging = false;
  uploading = false;
  uploadProgress = 0;
  uploadTarget = "master";
  excelSummary = null;
  excelAnalytics = null;
  excelDataAvailable = false;
  selectedPeriod = "30";
  selectedView = "daily";
  // Excel Chart Data
  dailyTrendChartData = { datasets: [], labels: [] };
  busPerformanceChartData = { datasets: [], labels: [] };
  shiftDistributionChartData = { datasets: [], labels: [] };
  shiftTrendChartData = { datasets: [], labels: [] };
  routePerformanceChartData = { datasets: [], labels: [] };
  // Chart Options
  dailyTrendChartOptions = {};
  busPerformanceChartOptions = {};
  shiftDistributionChartOptions = {};
  shiftTrendChartOptions = {};
  routePerformanceChartOptions = {};
  http = inject(HttpClient);
  baseUrl = "/api";
  constructor() {
    const today = /* @__PURE__ */ new Date();
    this.selectedDate = today.toISOString().split("T")[0];
    this.initializeChartOptions();
  }
  ngOnInit() {
    this.loadData();
  }
  // Mode Toggle
  toggleMode(useExcel) {
    this.useExcelMode = useExcel;
    if (!useExcel) {
      this.loadData();
    }
  }
  // Excel Upload Methods
  onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }
  onFileDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }
  onFileSelected(event) {
    const input = event.target;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }
  handleFile(file) {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel"
    ];
    if (!validTypes.includes(file.type)) {
      this.error = true;
      this.errorMessage = "Please upload a valid Excel file (.xlsx or .xls)";
      return;
    }
    this.selectedFile = file;
    this.error = false;
  }
  removeFile() {
    this.selectedFile = null;
    this.excelSummary = null;
    this.excelAnalytics = null;
    this.excelDataAvailable = false;
    this.uploadProgress = 0;
  }
  getFileSize(bytes) {
    if (bytes === 0)
      return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
  uploadExcel() {
    if (!this.selectedFile)
      return;
    this.uploading = true;
    this.loading = true;
    this.error = false;
    this.uploadProgress = 0;
    const formData = new FormData();
    formData.append("file", this.selectedFile);
    const uploadUrl = this.uploadTarget === "master" ? `${this.baseUrl}/bus/upload-master` : `${this.baseUrl}/outshedding/upload`;
    this.http.post(uploadUrl, formData, {
      reportProgress: true,
      observe: "events"
    }).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * event.loaded / (event.total || 1));
        } else if (event.type === HttpEventType.Response) {
          const response = event.body;
          this.excelSummary = {
            totalRecords: response.total_rows ?? response.totalRecords ?? response.total ?? 0,
            validRecords: response.inserted ?? response.validRecords ?? 0,
            invalidRecords: response.duplicates ?? response.skipped_invalid_bus ?? response.invalidRecords ?? 0,
            dateRange: response.dateRange ?? { start: this.selectedDate, end: this.selectedDate },
            busCount: response.busCount ?? 0,
            routeCount: response.routeCount ?? 0
          };
          if (response.data && Array.isArray(response.data)) {
            this.processExcelData(response.data);
          }
          this.uploading = false;
          this.loading = false;
          this.loadData();
        }
      },
      error: (err) => {
        console.error("Excel upload error:", err);
        this.error = true;
        this.errorMessage = err.error?.message || "Failed to upload Excel file";
        this.uploading = false;
        this.loading = false;
      }
    });
  }
  processExcelData(data) {
    this.excelAnalytics = this.analyzeExcelData(data);
    this.excelDataAvailable = true;
    this.updateExcelCharts();
  }
  analyzeExcelData(data) {
    const dailyData = /* @__PURE__ */ new Map();
    const busPerformance = /* @__PURE__ */ new Map();
    const routePerformance = /* @__PURE__ */ new Map();
    let shiftDistribution = {
      morning: 0,
      evening: 0,
      both: 0,
      absent: 0
    };
    data.forEach((record) => {
      const daily = dailyData.get(record.date) || { total: 0, present: 0, absent: 0 };
      daily.total++;
      if (record.status === "Present") {
        daily.present++;
      } else {
        daily.absent++;
      }
      dailyData.set(record.date, daily);
      const bus = busPerformance.get(record.busNo) || { totalDays: 0, absentDays: 0 };
      bus.totalDays++;
      if (record.status === "Absent") {
        bus.absentDays++;
      }
      busPerformance.set(record.busNo, bus);
      if (record.status === "Present") {
        switch (record.shift) {
          case "Morning":
            shiftDistribution.morning++;
            break;
          case "Evening":
            shiftDistribution.evening++;
            break;
          case "Both":
            shiftDistribution.both++;
            break;
        }
      } else {
        shiftDistribution.absent++;
      }
      if (record.busRoute) {
        const route = routePerformance.get(record.busRoute) || { totalTrips: 0, completedTrips: 0 };
        route.totalTrips++;
        if (record.status === "Present") {
          route.completedTrips++;
        }
        routePerformance.set(record.busRoute, route);
      }
    });
    return {
      dailyData,
      busPerformance,
      shiftDistribution,
      routePerformance
    };
  }
  downloadSample() {
    const sampleData = [
      ["Date", "BusNo", "BusRoute", "Shift", "Status", "OutTime", "InTime", "DriverName", "ConductorName"],
      ["2024-01-01", "BUS-001", "Route A", "Morning", "Present", "08:00", "10:00", "John Doe", "Jane Smith"],
      ["2024-01-01", "BUS-002", "Route B", "Evening", "Present", "16:00", "18:00", "Mike Johnson", "Sarah Wilson"],
      ["2024-01-01", "BUS-003", "Route C", "Both", "Absent", "", "", "", ""],
      ["2024-01-02", "BUS-001", "Route A", "Morning", "Present", "08:00", "10:00", "John Doe", "Jane Smith"],
      ["2024-01-02", "BUS-002", "Route B", "Evening", "Absent", "", "", "", ""],
      ["2024-01-02", "BUS-003", "Route C", "Both", "Present", "08:00", "18:00", "Robert Brown", "Lisa Taylor"]
    ];
    const csvContent = sampleData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bus_analytics_sample.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  }
  updateExcelCharts() {
    if (!this.excelAnalytics)
      return;
    this.updateDailyTrendChart();
    this.updateBusPerformanceChart();
    this.updateShiftDistributionChart();
    this.updateRoutePerformanceChart();
  }
  updateDailyTrendChart() {
    const sortedDates = Array.from(this.excelAnalytics.dailyData.keys()).sort();
    const labels = sortedDates.slice(-parseInt(this.selectedPeriod));
    const presentData = [];
    const absentData = [];
    const attendanceRate = [];
    labels.forEach((date) => {
      const data = this.excelAnalytics.dailyData.get(date);
      presentData.push(data.present);
      absentData.push(data.absent);
      attendanceRate.push(Math.round(data.present / data.total * 100));
    });
    this.dailyTrendChartData = {
      labels,
      datasets: [
        {
          label: "Present",
          data: presentData,
          borderColor: "#28a745",
          backgroundColor: "rgba(40, 167, 69, 0.1)",
          fill: true,
          tension: 0.4
        },
        {
          label: "Absent",
          data: absentData,
          borderColor: "#dc3545",
          backgroundColor: "rgba(220, 53, 69, 0.1)",
          fill: true,
          tension: 0.4
        }
      ]
    };
  }
  updateBusPerformanceChart() {
    const busData = Array.from(this.excelAnalytics.busPerformance.entries()).map(([busNo, data]) => ({
      busNo,
      attendanceRate: Math.round((data.totalDays - data.absentDays) / data.totalDays * 100),
      absentDays: data.absentDays
    })).sort((a, b) => b.absentDays - a.absentDays).slice(0, 10);
    this.busPerformanceChartData = {
      labels: busData.map((d) => d.busNo),
      datasets: [
        {
          label: "Absent Days",
          data: busData.map((d) => d.absentDays),
          backgroundColor: busData.map((d) => d.attendanceRate >= 90 ? "#dc3545" : d.attendanceRate >= 80 ? "#ffc107" : "#28a745"),
          borderColor: "#fff",
          borderWidth: 1
        }
      ]
    };
  }
  updateShiftDistributionChart() {
    const shiftData = this.excelAnalytics.shiftDistribution;
    this.shiftDistributionChartData = {
      labels: ["Morning", "Evening", "Both Shifts", "Absent"],
      datasets: [{
        data: [shiftData.morning, shiftData.evening, shiftData.both, shiftData.absent],
        backgroundColor: [
          "#ffa751",
          "#667eea",
          "#11998e",
          "#eb3349"
        ],
        borderColor: "#fff",
        borderWidth: 2
      }]
    };
  }
  updateRoutePerformanceChart() {
    const routeData = Array.from(this.excelAnalytics.routePerformance.entries()).map(([route, data]) => ({
      route,
      completionRate: Math.round(data.completedTrips / data.totalTrips * 100),
      totalTrips: data.totalTrips
    })).sort((a, b) => a.completionRate - b.completionRate).slice(0, 10);
    this.routePerformanceChartData = {
      labels: routeData.map((d) => d.route),
      datasets: [{
        label: "Completion Rate %",
        data: routeData.map((d) => d.completionRate),
        backgroundColor: routeData.map((d) => d.completionRate >= 90 ? "#28a745" : d.completionRate >= 70 ? "#ffc107" : "#dc3545"),
        borderColor: "#fff",
        borderWidth: 1
      }]
    };
  }
  initializeChartOptions() {
    this.dailyTrendChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        tooltip: { mode: "index", intersect: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Number of Buses" }
        },
        x: {
          title: { display: true, text: "Date" }
        }
      }
    };
    this.busPerformanceChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const busNo = context.label;
              const absentDays = context.raw;
              const busData = this.getBusData(busNo);
              return [
                `Bus: ${busNo}`,
                `Absent Days: ${absentDays}`,
                `Attendance Rate: ${busData?.attendanceRate || 0}%`
              ];
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Absent Days" }
        },
        x: {
          title: { display: true, text: "Bus Number" }
        }
      }
    };
    this.shiftDistributionChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
          labels: { padding: 20 }
        }
      }
    };
    this.routePerformanceChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          title: { display: true, text: "Completion Rate (%)" }
        }
      }
    };
  }
  // Helper methods for data tables
  getTopBuses(limit) {
    if (!this.excelAnalytics)
      return [];
    return Array.from(this.excelAnalytics.busPerformance.entries()).map(([busNo, data]) => ({
      busNo,
      totalDays: data.totalDays,
      presentDays: data.totalDays - data.absentDays,
      absentDays: data.absentDays,
      attendanceRate: Math.round((data.totalDays - data.absentDays) / data.totalDays * 100)
    })).sort((a, b) => b.absentDays - a.absentDays).slice(0, limit);
  }
  getDailySummary() {
    if (!this.excelAnalytics)
      return [];
    return Array.from(this.excelAnalytics.dailyData.entries()).map(([date, data]) => ({
      date,
      total: data.total,
      present: data.present,
      absent: data.absent,
      attendanceRate: Math.round(data.present / data.total * 100),
      morningCoverage: 0.8,
      // These would be calculated from shift data
      eveningCoverage: 0.7
    })).sort((a, b) => a.date.localeCompare(b.date)).slice(-parseInt(this.selectedPeriod));
  }
  getBusData(busNo) {
    const data = this.excelAnalytics?.busPerformance.get(busNo);
    if (!data)
      return null;
    return __spreadValues({
      attendanceRate: Math.round((data.totalDays - data.absentDays) / data.totalDays * 100)
    }, data);
  }
  getAttendanceClass(rate) {
    if (rate >= 90)
      return "attendance-high";
    if (rate >= 80)
      return "attendance-medium";
    return "attendance-low";
  }
  getStatusClass(rate) {
    if (rate >= 90)
      return "status-good";
    if (rate >= 80)
      return "status-warning";
    return "status-critical";
  }
  getStatusLabel(rate) {
    if (rate >= 90)
      return "Good";
    if (rate >= 80)
      return "Warning";
    return "Critical";
  }
  exportToExcel() {
    alert("Export to Excel feature would be implemented here");
  }
  retryExcel() {
    this.error = false;
    if (this.selectedFile) {
      this.uploadExcel();
    }
  }
  // Existing Live API methods
  loadData() {
    if (this.useExcelMode || this.loading)
      return;
    this.loading = true;
    this.error = false;
    this.errorMessage = "";
    Promise.all([
      this.loadAvailability(),
      this.loadShiftSummary(),
      this.loadMissingBuses(),
      this.loadFrequentAbsentees()
    ]).catch((err) => {
      this.error = true;
      this.errorMessage = err.message || "Failed to load bus analytics data";
      console.error("Error loading data:", err);
    }).finally(() => {
      this.loading = false;
    });
  }
  onDateChange() {
    this.clearBusHistory();
    this.loadData();
  }
  onDaysChange() {
    this.loadFrequentAbsentees();
  }
  loadAvailability() {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/outshedding/availability?date=${this.selectedDate}`;
      console.log("\u{1F535} GET Availability:", url);
      this.http.get(url).subscribe({
        next: (data) => {
          console.log("\u2705 Availability Response:", data);
          this.availability = data;
          resolve();
        },
        error: (err) => {
          console.error("\u274C Availability Error:", err);
          reject(err);
        }
      });
    });
  }
  loadShiftSummary() {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/outshedding/shift-summary?date=${this.selectedDate}`;
      console.log("\u{1F535} GET Shift Summary:", url);
      this.http.get(url).subscribe({
        next: (data) => {
          console.log("\u2705 Shift Summary Response:", data);
          this.shiftSummary = data;
          this.updateShiftChart(data);
          resolve();
        },
        error: (err) => {
          console.error("\u274C Shift Summary Error:", err);
          reject(err);
        }
      });
    });
  }
  loadMissingBuses() {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/outshedding/missing?date=${this.selectedDate}`;
      console.log("\u{1F535} GET Missing Buses:", url);
      this.http.get(url).subscribe({
        next: (data) => {
          console.log("\u2705 Missing Buses Response:", data);
          this.missingBuses = data || [];
          resolve();
        },
        error: (err) => {
          console.error("\u274C Missing Buses Error:", err);
          reject(err);
        }
      });
    });
  }
  loadFrequentAbsentees() {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/outshedding/missing/frequent?days=${this.frequentAbsenteeDays}`;
      console.log("\u{1F535} GET Frequent Absentees:", url);
      this.http.get(url).subscribe({
        next: (data) => {
          console.log("\u2705 Frequent Absentees Response:", data);
          this.frequentAbsentees = data || [];
          resolve();
        },
        error: (err) => {
          console.error("\u274C Frequent Absentees Error:", err);
          reject(err);
        }
      });
    });
  }
  viewBusHistory(busNo) {
    this.selectedBusNo = busNo;
    const url = `${this.baseUrl}/outshedding/bus/${busNo}`;
    console.log("\u{1F535} GET Bus History:", url);
    this.http.get(url).subscribe({
      next: (data) => {
        console.log("\u2705 Bus History Response:", data);
        this.selectedBusHistory = data || [];
      },
      error: (err) => {
        console.error("\u274C Bus History Error:", err);
        this.errorMessage = "Failed to load bus history";
      }
    });
  }
  clearBusHistory() {
    this.selectedBusNo = "";
    this.selectedBusHistory = [];
  }
  updateShiftChart(data) {
    this.shiftChartData = {
      labels: ["Morning Only", "Evening Only", "Both Shifts", "Absent"],
      datasets: [{
        label: "Bus Distribution",
        data: [data.morningOnly, data.eveningOnly, data.bothShifts, data.absent],
        backgroundColor: [
          "#ffa751",
          "#667eea",
          "#11998e",
          "#eb3345"
        ],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 10
      }]
    };
  }
  getShiftChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 20,
            font: { size: 13 }
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || "";
              const value = context.raw;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? Math.round(value / total * 100) : 0;
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    };
  }
  getPercentage(value, total) {
    return total > 0 ? Math.round(value / total * 100) : 0;
  }
  static \u0275fac = function BusAnalyticsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BusAnalyticsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BusAnalyticsComponent, selectors: [["app-bus-analytics"]], decls: 13, vars: 9, consts: [["fileInput", ""], [1, "analytics-container"], [1, "mode-toggle"], [1, "mode-btn", 3, "click"], ["class", "controls", 4, "ngIf"], ["class", "excel-upload-section", 4, "ngIf"], ["class", "loading", 4, "ngIf"], ["class", "error", 4, "ngIf"], ["class", "content", 4, "ngIf"], [1, "controls"], [1, "date-input-group"], ["type", "date", 1, "input-field", 3, "ngModelChange", "change", "ngModel", "disabled"], ["type", "number", "min", "1", "max", "90", 1, "input-field", 3, "ngModelChange", "change", "ngModel", "disabled"], [1, "load-btn", 3, "click", "disabled"], [1, "excel-upload-section"], [1, "upload-container"], [1, "upload-area", 3, "drop", "dragover", "click"], [1, "upload-icon"], [1, "upload-hint"], [1, "upload-format"], ["type", "file", "accept", ".xlsx,.xls", 2, "display", "none", 3, "change"], ["class", "file-info", 4, "ngIf"], ["class", "upload-summary", 4, "ngIf"], ["class", "excel-controls", 4, "ngIf"], [1, "file-info"], [1, "file-details"], [1, "file-name"], [1, "file-size"], [1, "remove-btn", 3, "click"], ["class", "progress-container", 4, "ngIf"], [1, "upload-actions"], [1, "upload-target"], ["type", "radio", "name", "uploadTarget", "value", "master", 3, "ngModelChange", "ngModel"], ["type", "radio", "name", "uploadTarget", "value", "outshedding", 3, "ngModelChange", "ngModel"], [1, "upload-btn", 3, "click", "disabled"], [1, "sample-btn", 3, "click"], [1, "progress-container"], [1, "progress-bar"], [1, "progress-fill"], [1, "progress-text"], [1, "upload-summary"], [1, "summary-grid"], [1, "summary-card"], [1, "summary-label"], [1, "summary-value", "total"], [1, "summary-value", "valid"], [1, "summary-value", "invalid"], [1, "summary-value"], [1, "date-range"], [1, "excel-controls"], [1, "control-group"], [1, "period-select", 3, "ngModelChange", "change", "ngModel"], ["value", "7"], ["value", "30"], ["value", "90"], ["value", "all"], [1, "view-select", 3, "ngModelChange", "change", "ngModel"], ["value", "daily"], ["value", "buses"], ["value", "shifts"], ["value", "routes"], [1, "export-btn", 3, "click"], [1, "loading"], [1, "spinner"], [1, "error"], [1, "retry-btn", 3, "click"], [1, "content"], ["class", "excel-charts", 4, "ngIf"], [1, "excel-charts"], ["class", "section chart-section", 4, "ngIf"], ["class", "section", 4, "ngIf"], [1, "section", "chart-section"], [1, "chart-container"], ["baseChart", "", 3, "data", "options", "type"], [1, "chart-row"], [1, "chart-container", "half"], [1, "section"], ["class", "table-section", 4, "ngIf"], [1, "table-section"], [1, "table-container"], [1, "data-table"], [4, "ngFor", "ngForOf"], [1, "bus-number"], [1, "shift-indicator"], [1, "shift-dot", "morning"], [1, "shift-dot", "evening"], [1, "overview-cards"], [1, "card", "total"], [1, "card-icon"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card", "present"], ["class", "card-percentage", 4, "ngIf"], [1, "card", "absent"], [1, "card-percentage"], [1, "shift-cards"], [1, "shift-card", "morning"], [1, "shift-icon"], [1, "shift-label"], [1, "shift-value"], [1, "shift-card", "evening"], [1, "shift-card", "both"], [1, "shift-card", "absent"], ["class", "chart-container", 4, "ngIf"], ["class", "no-data", 4, "ngIf"], ["class", "table-container", 4, "ngIf"], [1, "no-data"], [1, "status-badge", "absent"], ["class", "clickable", 3, "click", 4, "ngFor", "ngForOf"], [1, "clickable", 3, "click"], [1, "badge-red"], [1, "action-btn", 3, "click"], [1, "history-header"], [1, "close-btn", 3, "click"]], template: function BusAnalyticsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "h2");
      \u0275\u0275text(2, "\u{1F68C} Bus Analytics Dashboard");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2)(4, "button", 3);
      \u0275\u0275listener("click", function BusAnalyticsComponent_Template_button_click_4_listener() {
        return ctx.toggleMode(false);
      });
      \u0275\u0275text(5, " \u{1F4E1} Live API Mode ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 3);
      \u0275\u0275listener("click", function BusAnalyticsComponent_Template_button_click_6_listener() {
        return ctx.toggleMode(true);
      });
      \u0275\u0275text(7, " \u{1F4CA} Excel Upload Mode ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(8, BusAnalyticsComponent_div_8_Template, 11, 6, "div", 4)(9, BusAnalyticsComponent_div_9_Template, 16, 5, "div", 5)(10, BusAnalyticsComponent_div_10_Template, 4, 1, "div", 6)(11, BusAnalyticsComponent_div_11_Template, 5, 1, "div", 7)(12, BusAnalyticsComponent_div_12_Template, 3, 2, "div", 8);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275classProp("active", !ctx.useExcelMode);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.useExcelMode);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", !ctx.useExcelMode);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.useExcelMode);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && !ctx.error);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, RadioControlValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel, NgChartsModule, BaseChartDirective], styles: ["\n\n.mode-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-bottom: 20px;\n  background: white;\n  padding: 15px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.mode-btn[_ngcontent-%COMP%] {\n  padding: 12px 24px;\n  border: 2px solid #e0e0e0;\n  border-radius: 6px;\n  background: white;\n  color: #666;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  flex: 1;\n}\n.mode-btn[_ngcontent-%COMP%]:hover {\n  border-color: #007bff;\n  color: #007bff;\n}\n.mode-btn.active[_ngcontent-%COMP%] {\n  background: #007bff;\n  color: white;\n  border-color: #007bff;\n}\n.excel-upload-section[_ngcontent-%COMP%] {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  margin-bottom: 25px;\n}\n.upload-container[_ngcontent-%COMP%] {\n  border: 2px dashed #ddd;\n  border-radius: 8px;\n  padding: 40px 20px;\n  text-align: center;\n  transition: border-color 0.3s;\n  margin-bottom: 20px;\n}\n.upload-container.dragover[_ngcontent-%COMP%] {\n  border-color: #007bff;\n  background-color: #f0f8ff;\n}\n.upload-area[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.upload-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 15px;\n}\n.upload-hint[_ngcontent-%COMP%] {\n  color: #666;\n  margin-bottom: 5px;\n}\n.upload-format[_ngcontent-%COMP%] {\n  color: #999;\n  font-size: 14px;\n}\n.file-info[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  padding: 15px;\n  background: #f8f9fa;\n  border-radius: 6px;\n}\n.file-details[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 15px;\n}\n.file-name[_ngcontent-%COMP%] {\n  flex: 1;\n  font-weight: 600;\n  color: #333;\n}\n.file-size[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 14px;\n}\n.remove-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #dc3545;\n  cursor: pointer;\n  font-size: 18px;\n  padding: 0 5px;\n}\n.progress-container[_ngcontent-%COMP%] {\n  margin: 15px 0;\n}\n.progress-bar[_ngcontent-%COMP%] {\n  height: 8px;\n  background: #e9ecef;\n  border-radius: 4px;\n  overflow: hidden;\n  margin-bottom: 5px;\n}\n.progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #28a745,\n      #20c997);\n  transition: width 0.3s ease;\n}\n.progress-text[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #28a745;\n  font-weight: 600;\n}\n.upload-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 20px;\n}\n.upload-btn[_ngcontent-%COMP%], \n.sample-btn[_ngcontent-%COMP%], \n.export-btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 6px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n.upload-btn[_ngcontent-%COMP%] {\n  background: #28a745;\n  color: white;\n  flex: 1;\n}\n.upload-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #218838;\n}\n.upload-btn[_ngcontent-%COMP%]:disabled {\n  background: #ccc;\n  cursor: not-allowed;\n}\n.sample-btn[_ngcontent-%COMP%], \n.export-btn[_ngcontent-%COMP%] {\n  background: #6c757d;\n  color: white;\n}\n.sample-btn[_ngcontent-%COMP%]:hover, \n.export-btn[_ngcontent-%COMP%]:hover {\n  background: #5a6268;\n}\n.upload-summary[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  padding: 20px;\n  background: #f8f9fa;\n  border-radius: 8px;\n  border-left: 4px solid #007bff;\n}\n.summary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 15px;\n  margin: 15px 0;\n}\n.summary-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 15px;\n  border-radius: 6px;\n  text-align: center;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.summary-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: #666;\n  margin-bottom: 5px;\n  text-transform: uppercase;\n}\n.summary-value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 24px;\n  font-weight: 700;\n}\n.summary-value.total[_ngcontent-%COMP%] {\n  color: #007bff;\n}\n.summary-value.valid[_ngcontent-%COMP%] {\n  color: #28a745;\n}\n.summary-value.invalid[_ngcontent-%COMP%] {\n  color: #dc3545;\n}\n.date-range[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #666;\n  text-align: center;\n}\n.excel-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 15px;\n  align-items: center;\n  flex-wrap: wrap;\n  margin-bottom: 20px;\n  padding: 15px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.control-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.control-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n}\n.period-select[_ngcontent-%COMP%], \n.view-select[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  min-width: 150px;\n}\n.excel-charts[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 25px;\n}\n.chart-section[_ngcontent-%COMP%] {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.chart-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n}\n.chart-container.half[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.table-section[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n.table-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  color: #495057;\n  margin-bottom: 15px;\n  font-size: 16px;\n}\n.shift-indicator[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 3px;\n}\n.shift-dot[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  display: inline-block;\n}\n.shift-dot.morning[_ngcontent-%COMP%] {\n  background: #ffa751;\n}\n.shift-dot.evening[_ngcontent-%COMP%] {\n  background: #667eea;\n}\n.attendance-high[_ngcontent-%COMP%] {\n  color: #28a745;\n  font-weight: 600;\n}\n.attendance-medium[_ngcontent-%COMP%] {\n  color: #ffc107;\n  font-weight: 600;\n}\n.attendance-low[_ngcontent-%COMP%] {\n  color: #dc3545;\n  font-weight: 600;\n}\n.status-good[_ngcontent-%COMP%] {\n  background: #d4edda;\n  color: #155724;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.status-warning[_ngcontent-%COMP%] {\n  background: #fff3cd;\n  color: #856404;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.status-critical[_ngcontent-%COMP%] {\n  background: #f8d7da;\n  color: #721c24;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 600;\n}\n@media (max-width: 768px) {\n  .mode-toggle[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .excel-controls[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .chart-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .upload-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n/*# sourceMappingURL=bus-analytics.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BusAnalyticsComponent, [{
    type: Component,
    args: [{ standalone: true, imports: [CommonModule, FormsModule, NgChartsModule], selector: "app-bus-analytics", template: `
    <div class="analytics-container">
      <h2>\u{1F68C} Bus Analytics Dashboard</h2>

      <!-- Mode Toggle -->
      <div class="mode-toggle">
        <button 
          class="mode-btn" 
          [class.active]="!useExcelMode"
          (click)="toggleMode(false)"
        >
          \u{1F4E1} Live API Mode
        </button>
        <button 
          class="mode-btn" 
          [class.active]="useExcelMode"
          (click)="toggleMode(true)"
        >
          \u{1F4CA} Excel Upload Mode
        </button>
      </div>

      <!-- Live API Mode Controls -->
      <div class="controls" *ngIf="!useExcelMode">
        <div class="date-input-group">
          <label>Select Date:</label>
          <input 
            type="date" 
            [(ngModel)]="selectedDate" 
            (change)="onDateChange()"
            class="input-field"
            [disabled]="loading"
          >
        </div>
        <div class="date-input-group">
          <label>Frequent Absentees (Days):</label>
          <input 
            type="number" 
            [(ngModel)]="frequentAbsenteeDays" 
            (change)="onDaysChange()"
            class="input-field"
            [disabled]="loading"
            min="1"
            max="90"
          >
        </div>
        <button 
          (click)="loadData()" 
          class="load-btn"
          [disabled]="loading"
        >
          {{ loading ? 'Loading...' : 'Load Data' }}
        </button>
      </div>

      <!-- Excel Upload Mode Controls -->
      <div class="excel-upload-section" *ngIf="useExcelMode">
        <div class="upload-container">
          <div class="upload-area" 
               (drop)="onFileDrop($event)"
               (dragover)="onDragOver($event)"
               (click)="fileInput.click()"
               [class.dragover]="isDragging">
            <div class="upload-icon">\u{1F4CA}</div>
            <h4>Upload Excel File</h4>
            <p class="upload-hint">Drag & drop your Excel file here or click to browse</p>
            <p class="upload-format">Supported formats: .xlsx, .xls</p>
            
            <input 
              #fileInput
              type="file" 
              accept=".xlsx,.xls"
              (change)="onFileSelected($event)"
              style="display: none"
            />
          </div>

          <!-- File Info & Progress -->
          <div class="file-info" *ngIf="selectedFile">
            <div class="file-details">
              <span class="file-name">\u{1F4C4} {{ selectedFile.name }}</span>
              <span class="file-size">{{ getFileSize(selectedFile.size) }}</span>
              <button class="remove-btn" (click)="removeFile()">\u2715</button>
            </div>
            
            <div class="progress-container" *ngIf="uploadProgress > 0">
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="uploadProgress"></div>
              </div>
              <span class="progress-text">{{ uploadProgress }}%</span>
            </div>

            <div class="upload-actions">
                <div class="upload-target">
                  <label>
                    <input type="radio" name="uploadTarget" [(ngModel)]="uploadTarget" value="master" />
                    Upload as Bus Master
                  </label>
                  <label>
                    <input type="radio" name="uploadTarget" [(ngModel)]="uploadTarget" value="outshedding" />
                    Upload as Outshedding
                  </label>
                </div>

                <button 
                  class="upload-btn"
                  (click)="uploadExcel()"
                  [disabled]="uploading || !selectedFile"
                >
                  {{ uploading ? 'Uploading...' : (uploadTarget === 'master' ? 'Upload Bus Master' : 'Upload Outshedding') }}
                </button>
                <button 
                  class="sample-btn"
                  (click)="downloadSample()"
                >
                  \u{1F4E5} Download Sample Excel
                </button>
            </div>
          </div>

          <!-- Upload Summary -->
          <div class="upload-summary" *ngIf="excelSummary">
            <h4>\u{1F4CB} Upload Summary</h4>
            <div class="summary-grid">
              <div class="summary-card">
                <span class="summary-label">Total Records</span>
                <span class="summary-value total">{{ excelSummary.totalRecords }}</span>
              </div>
              <div class="summary-card">
                <span class="summary-label">Valid Records</span>
                <span class="summary-value valid">{{ excelSummary.validRecords }}</span>
              </div>
              <div class="summary-card">
                <span class="summary-label">Invalid Records</span>
                <span class="summary-value invalid">{{ excelSummary.invalidRecords }}</span>
              </div>
              <div class="summary-card">
                <span class="summary-label">Unique Buses</span>
                <span class="summary-value">{{ excelSummary.busCount }}</span>
              </div>
            </div>
            <div class="date-range">
              <span>Date Range: {{ excelSummary.dateRange.start }} to {{ excelSummary.dateRange.end }}</span>
            </div>
          </div>
        </div>

        <!-- Excel Analytics Controls -->
        <div class="excel-controls" *ngIf="excelDataAvailable">
          <div class="control-group">
            <label>Analysis Period:</label>
            <select [(ngModel)]="selectedPeriod" (change)="updateExcelCharts()" class="period-select">
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="all">All Data</option>
            </select>
          </div>
          <div class="control-group">
            <label>View Type:</label>
            <select [(ngModel)]="selectedView" (change)="updateExcelCharts()" class="view-select">
              <option value="daily">Daily Overview</option>
              <option value="buses">Bus Performance</option>
              <option value="shifts">Shift Analysis</option>
              <option value="routes">Route Performance</option>
            </select>
          </div>
          <button class="export-btn" (click)="exportToExcel()">
            \u{1F4CA} Export Analytics
          </button>
        </div>
      </div>

      <!-- Loading/Error States -->
      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
        <p>{{ useExcelMode ? 'Processing Excel data...' : 'Loading bus analytics data...' }}</p>
      </div>
      
      <div *ngIf="error" class="error">
        <p>{{ errorMessage }}</p>
        <button (click)="useExcelMode ? retryExcel() : loadData()" class="retry-btn">
          Retry
        </button>
      </div>

      <!-- Main Content -->
      <div *ngIf="!loading && !error" class="content">
        <!-- Excel Mode Charts -->
        <div *ngIf="useExcelMode && excelDataAvailable" class="excel-charts">
          
          <!-- Daily Attendance Trend -->
          <div class="section chart-section" *ngIf="selectedView === 'daily'">
            <h3>\u{1F4C8} Daily Attendance Trend</h3>
            <div class="chart-container">
              <canvas 
                baseChart
                [data]="dailyTrendChartData"
                [options]="dailyTrendChartOptions"
                [type]="'line'"
              ></canvas>
            </div>
          </div>

          <!-- Bus Performance -->
          <div class="section chart-section" *ngIf="selectedView === 'buses'">
            <h3>\u{1F68C} Top 10 Bus Performance</h3>
            <div class="chart-container">
              <canvas 
                baseChart
                [data]="busPerformanceChartData"
                [options]="busPerformanceChartOptions"
                [type]="'bar'"
              ></canvas>
            </div>
          </div>

          <!-- Shift Distribution -->
          <div class="section chart-section" *ngIf="selectedView === 'shifts'">
            <h3>\u{1F550} Shift Distribution Analysis</h3>
            <div class="chart-row">
              <div class="chart-container half">
                <canvas 
                  baseChart
                  [data]="shiftDistributionChartData"
                  [options]="shiftDistributionChartOptions"
                  [type]="'doughnut'"
                ></canvas>
              </div>
              <div class="chart-container half">
                <canvas 
                  baseChart
                  [data]="shiftTrendChartData"
                  [options]="shiftTrendChartOptions"
                  [type]="'line'"
                ></canvas>
              </div>
            </div>
          </div>

          <!-- Route Performance -->
          <div class="section chart-section" *ngIf="selectedView === 'routes'">
            <h3>\u{1F5FA}\uFE0F Route Performance</h3>
            <div class="chart-container">
              <canvas 
                baseChart
                [data]="routePerformanceChartData"
                [options]="routePerformanceChartOptions"
                [type]="'bar'"
              ></canvas>
            </div>
          </div>

          <!-- Excel Data Tables -->
          <div class="section" *ngIf="excelAnalytics">
            <h3>\u{1F4CA} Detailed Analytics</h3>
            
            <!-- Bus Performance Table -->
            <div class="table-section" *ngIf="selectedView === 'buses'">
              <h4>Bus Performance Details</h4>
              <div class="table-container">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Bus No</th>
                      <th>Total Days</th>
                      <th>Present Days</th>
                      <th>Absent Days</th>
                      <th>Attendance %</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let bus of getTopBuses(15); let i = index">
                      <td>{{ i + 1 }}</td>
                      <td class="bus-number">{{ bus.busNo }}</td>
                      <td>{{ bus.totalDays }}</td>
                      <td>{{ bus.presentDays }}</td>
                      <td>{{ bus.absentDays }}</td>
                      <td>
                        <span [class]="getAttendanceClass(bus.attendanceRate)">
                          {{ bus.attendanceRate }}%
                        </span>
                      </td>
                      <td>
                        <span [class]="getStatusClass(bus.attendanceRate)">
                          {{ getStatusLabel(bus.attendanceRate) }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Daily Summary Table -->
            <div class="table-section" *ngIf="selectedView === 'daily'">
              <h4>Daily Attendance Summary</h4>
              <div class="table-container">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Total Buses</th>
                      <th>Present</th>
                      <th>Absent</th>
                      <th>Attendance %</th>
                      <th>Shift Coverage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let day of getDailySummary()">
                      <td>{{ day.date }}</td>
                      <td>{{ day.total }}</td>
                      <td>{{ day.present }}</td>
                      <td>{{ day.absent }}</td>
                      <td>{{ day.attendanceRate }}%</td>
                      <td>
                        <div class="shift-indicator">
                          <span class="shift-dot morning" [style.opacity]="day.morningCoverage"></span>
                          <span class="shift-dot evening" [style.opacity]="day.eveningCoverage"></span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Live API Mode Content (Existing) -->
        <div *ngIf="!useExcelMode && !loading && !error" class="content">
          <!-- Your existing Live API content here -->
          <!-- Daily Availability Overview -->
          <div class="section">
            <h3>\u{1F4CA} Daily Availability Summary</h3>
            <div class="overview-cards">
              <div class="card total">
                <div class="card-icon">\u{1F4CB}</div>
                <div class="card-content">
                  <div class="card-label">Total Registered</div>
                  <div class="card-value">{{ availability?.totalRegistered || 0 }}</div>
                </div>
              </div>
              <div class="card present">
                <div class="card-icon">\u2705</div>
                <div class="card-content">
                  <div class="card-label">Present</div>
                  <div class="card-value">{{ availability?.present || 0 }}</div>
                  <div class="card-percentage" *ngIf="availability">
                    {{ getPercentage(availability.present, availability.totalRegistered) }}%
                  </div>
                </div>
              </div>
              <div class="card absent">
                <div class="card-icon">\u274C</div>
                <div class="card-content">
                  <div class="card-label">Absent</div>
                  <div class="card-value">{{ availability?.absent || 0 }}</div>
                  <div class="card-percentage" *ngIf="availability">
                    {{ getPercentage(availability.absent, availability.totalRegistered) }}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Shift Summary -->
          <div class="section" *ngIf="shiftSummary">
            <h3>\u{1F550} Shift-wise Summary</h3>
            <div class="shift-cards">
              <div class="shift-card morning">
                <span class="shift-icon">\u{1F305}</span>
                <span class="shift-label">Morning Only</span>
                <span class="shift-value">{{ shiftSummary.morningOnly }}</span>
              </div>
              <div class="shift-card evening">
                <span class="shift-icon">\u{1F306}</span>
                <span class="shift-label">Evening Only</span>
                <span class="shift-value">{{ shiftSummary.eveningOnly }}</span>
              </div>
              <div class="shift-card both">
                <span class="shift-icon">\u{1F504}</span>
                <span class="shift-label">Both Shifts</span>
                <span class="shift-value">{{ shiftSummary.bothShifts }}</span>
              </div>
              <div class="shift-card absent">
                <span class="shift-icon">\u{1F6AB}</span>
                <span class="shift-label">Absent</span>
                <span class="shift-value">{{ shiftSummary.absent }}</span>
              </div>
            </div>

            <!-- Shift Distribution Chart -->
            <div class="chart-container" *ngIf="shiftChartData.labels">
              <canvas 
                baseChart
                [data]="shiftChartData"
                [options]="getShiftChartOptions()"
                [type]="'doughnut'"
              ></canvas>
            </div>
          </div>

          <!-- Missing Buses -->
          <div class="section" *ngIf="missingBuses">
            <h3>\u{1F50D} Missing Buses on {{ selectedDate }}</h3>
            <div *ngIf="missingBuses.length === 0" class="no-data">
              <p>\u2705 All buses are accounted for!</p>
            </div>
            <div *ngIf="missingBuses.length > 0" class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Bus Number</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let bus of missingBuses; let i = index">
                    <td>{{ i + 1 }}</td>
                    <td class="bus-number">{{ bus }}</td>
                    <td><span class="status-badge absent">Absent</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Frequent Absentees -->
          <div class="section" *ngIf="frequentAbsentees">
            <h3>\u{1F4C8} Frequent Absentees (Last {{ frequentAbsenteeDays }} Days)</h3>
            <div *ngIf="frequentAbsentees.length === 0" class="no-data">
              <p>\u2705 No frequent absentees found!</p>
            </div>
            <div *ngIf="frequentAbsentees.length > 0" class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Bus Number</th>
                    <th>Absent Days</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let absentee of frequentAbsentees; let i = index" 
                      (click)="viewBusHistory(absentee.busNo)"
                      class="clickable">
                    <td>{{ i + 1 }}</td>
                    <td class="bus-number">{{ absentee.busNo }}</td>
                    <td><span class="badge-red">{{ absentee.absentCount }} days</span></td>
                    <td>
                      <button class="action-btn" (click)="viewBusHistory(absentee.busNo); $event.stopPropagation()">
                        View History
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Bus History Modal/Section -->
          <div class="section" *ngIf="selectedBusHistory && selectedBusNo">
            <div class="history-header">
              <h3>\u{1F4CB} Bus History - {{ selectedBusNo }}</h3>
              <button class="close-btn" (click)="clearBusHistory()">\u2715</button>
            </div>
            <div *ngIf="selectedBusHistory.length === 0" class="no-data">
              <p>No history records found for this bus.</p>
            </div>
            <div *ngIf="selectedBusHistory.length > 0" class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Morning Route</th>
                    <th>Out Time</th>
                    <th>Evening Route</th>
                    <th>In Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let record of selectedBusHistory">
                    <td>{{ record.date }}</td>
                    <td>{{ record.morningRoute }}</td>
                    <td>{{ record.outTime }}</td>
                    <td>{{ record.eveningRoute }}</td>
                    <td>{{ record.inTime }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;75cb7204a424a23e1e3937c779dadb4fc6d1b17c3849bc0745b8dbfc2afa4656;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/admin/bus-analytics.component.ts */\n.mode-toggle {\n  display: flex;\n  gap: 10px;\n  margin-bottom: 20px;\n  background: white;\n  padding: 15px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.mode-btn {\n  padding: 12px 24px;\n  border: 2px solid #e0e0e0;\n  border-radius: 6px;\n  background: white;\n  color: #666;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  flex: 1;\n}\n.mode-btn:hover {\n  border-color: #007bff;\n  color: #007bff;\n}\n.mode-btn.active {\n  background: #007bff;\n  color: white;\n  border-color: #007bff;\n}\n.excel-upload-section {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  margin-bottom: 25px;\n}\n.upload-container {\n  border: 2px dashed #ddd;\n  border-radius: 8px;\n  padding: 40px 20px;\n  text-align: center;\n  transition: border-color 0.3s;\n  margin-bottom: 20px;\n}\n.upload-container.dragover {\n  border-color: #007bff;\n  background-color: #f0f8ff;\n}\n.upload-area {\n  cursor: pointer;\n}\n.upload-icon {\n  font-size: 48px;\n  margin-bottom: 15px;\n}\n.upload-hint {\n  color: #666;\n  margin-bottom: 5px;\n}\n.upload-format {\n  color: #999;\n  font-size: 14px;\n}\n.file-info {\n  margin-top: 20px;\n  padding: 15px;\n  background: #f8f9fa;\n  border-radius: 6px;\n}\n.file-details {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 15px;\n}\n.file-name {\n  flex: 1;\n  font-weight: 600;\n  color: #333;\n}\n.file-size {\n  color: #666;\n  font-size: 14px;\n}\n.remove-btn {\n  background: none;\n  border: none;\n  color: #dc3545;\n  cursor: pointer;\n  font-size: 18px;\n  padding: 0 5px;\n}\n.progress-container {\n  margin: 15px 0;\n}\n.progress-bar {\n  height: 8px;\n  background: #e9ecef;\n  border-radius: 4px;\n  overflow: hidden;\n  margin-bottom: 5px;\n}\n.progress-fill {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #28a745,\n      #20c997);\n  transition: width 0.3s ease;\n}\n.progress-text {\n  font-size: 14px;\n  color: #28a745;\n  font-weight: 600;\n}\n.upload-actions {\n  display: flex;\n  gap: 10px;\n  margin-top: 20px;\n}\n.upload-btn,\n.sample-btn,\n.export-btn {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 6px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n.upload-btn {\n  background: #28a745;\n  color: white;\n  flex: 1;\n}\n.upload-btn:hover:not(:disabled) {\n  background: #218838;\n}\n.upload-btn:disabled {\n  background: #ccc;\n  cursor: not-allowed;\n}\n.sample-btn,\n.export-btn {\n  background: #6c757d;\n  color: white;\n}\n.sample-btn:hover,\n.export-btn:hover {\n  background: #5a6268;\n}\n.upload-summary {\n  margin-top: 20px;\n  padding: 20px;\n  background: #f8f9fa;\n  border-radius: 8px;\n  border-left: 4px solid #007bff;\n}\n.summary-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 15px;\n  margin: 15px 0;\n}\n.summary-card {\n  background: white;\n  padding: 15px;\n  border-radius: 6px;\n  text-align: center;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.summary-label {\n  display: block;\n  font-size: 12px;\n  color: #666;\n  margin-bottom: 5px;\n  text-transform: uppercase;\n}\n.summary-value {\n  display: block;\n  font-size: 24px;\n  font-weight: 700;\n}\n.summary-value.total {\n  color: #007bff;\n}\n.summary-value.valid {\n  color: #28a745;\n}\n.summary-value.invalid {\n  color: #dc3545;\n}\n.date-range {\n  font-size: 14px;\n  color: #666;\n  text-align: center;\n}\n.excel-controls {\n  display: flex;\n  gap: 15px;\n  align-items: center;\n  flex-wrap: wrap;\n  margin-bottom: 20px;\n  padding: 15px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.control-group {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.control-group label {\n  font-weight: 600;\n  font-size: 14px;\n}\n.period-select,\n.view-select {\n  padding: 8px 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  min-width: 150px;\n}\n.excel-charts {\n  display: flex;\n  flex-direction: column;\n  gap: 25px;\n}\n.chart-section {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.chart-row {\n  display: flex;\n  gap: 20px;\n}\n.chart-container.half {\n  flex: 1;\n}\n.table-section {\n  margin-top: 20px;\n}\n.table-section h4 {\n  color: #495057;\n  margin-bottom: 15px;\n  font-size: 16px;\n}\n.shift-indicator {\n  display: flex;\n  gap: 3px;\n}\n.shift-dot {\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  display: inline-block;\n}\n.shift-dot.morning {\n  background: #ffa751;\n}\n.shift-dot.evening {\n  background: #667eea;\n}\n.attendance-high {\n  color: #28a745;\n  font-weight: 600;\n}\n.attendance-medium {\n  color: #ffc107;\n  font-weight: 600;\n}\n.attendance-low {\n  color: #dc3545;\n  font-weight: 600;\n}\n.status-good {\n  background: #d4edda;\n  color: #155724;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.status-warning {\n  background: #fff3cd;\n  color: #856404;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.status-critical {\n  background: #f8d7da;\n  color: #721c24;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 600;\n}\n@media (max-width: 768px) {\n  .mode-toggle {\n    flex-direction: column;\n  }\n  .excel-controls {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .chart-row {\n    flex-direction: column;\n  }\n  .upload-actions {\n    flex-direction: column;\n  }\n  .summary-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n/*# sourceMappingURL=bus-analytics.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BusAnalyticsComponent, { className: "BusAnalyticsComponent", filePath: "src/app/components/admin/bus-analytics.component.ts", lineNumber: 956 });
})();

// src/app/app.routes.ts
var routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    loadComponent: () => import("./chunk-IAAAEOKQ.js").then((m) => m.LoginComponent)
  },
  {
    path: "forgot-password",
    loadComponent: () => import("./chunk-MJBR2GNN.js").then((m) => m.ForgotPasswordComponent)
  },
  {
    path: "register",
    loadComponent: () => import("./chunk-M4QTA7VK.js").then((m) => m.RegisterComponent)
  },
  {
    path: "inventory",
    loadComponent: () => import("./chunk-DQBJXNHA.js").then((m) => m.InventoryListComponent)
  },
  {
    path: "charts",
    loadComponent: () => import("./chunk-HFSDUNMJ.js").then((m) => m.WeighbridgeChartsComponent)
  },
  {
    path: "smc",
    loadComponent: () => import("./chunk-TY2EF3DD.js").then((m) => m.SmcDashboardComponent)
  },
  {
    path: "admin/excel-upload",
    loadComponent: () => import("./chunk-L3ZOT67Z.js").then((m) => m.ExcelUploadComponent)
  },
  {
    path: "devices/search",
    loadComponent: () => import("./chunk-7WQ6GVUS.js").then((m) => m.DeviceSearchComponent)
  },
  {
    path: "devices/:deviceId/history",
    loadComponent: () => import("./chunk-VJVHYDQI.js").then((m) => m.DeviceHistoryComponent)
  },
  {
    path: "anpr",
    children: [
      {
        path: "analytics-table",
        component: AnprAnalyticsTableComponent
      },
      {
        path: "analytics-charts",
        component: AnprAnalyticsChartsComponent
      },
      {
        path: "bus-analytics",
        component: BusAnalyticsComponent
      }
    ]
  },
  {
    path: "maintenance/request",
    loadComponent: () => import("./chunk-K42T4JJ3.js").then((m) => m.MaintenanceRequestComponent)
  },
  {
    path: "admin/excel-upload",
    loadComponent: () => import("./chunk-L3ZOT67Z.js").then((m) => m.ExcelUploadComponent),
    canActivate: [AdminGuard]
  },
  {
    path: "admin/dashboard",
    loadComponent: () => import("./chunk-IX7QTB6U.js").then((m) => m.DashboardComponent),
    canActivate: [AdminGuard]
  },
  {
    path: "devices/:deviceId/history",
    loadComponent: () => import("./chunk-VJVHYDQI.js").then((m) => m.DeviceHistoryComponent)
  },
  {
    path: "admin/all-requests",
    loadComponent: () => import("./chunk-S6ZWEZ4U.js").then((m) => m.AllRequestsComponent)
  },
  {
    path: "admin/items/new",
    loadComponent: () => import("./chunk-7FJBYFQE.js").then((m) => m.ItemFormComponent),
    canActivate: [AdminGuard]
  },
  {
    path: "admin/items/:id/edit",
    loadComponent: () => import("./chunk-7FJBYFQE.js").then((m) => m.ItemFormComponent),
    canActivate: [AdminGuard]
  },
  // Parkadda Routes
  {
    path: "parkadda",
    children: [
      {
        path: "login",
        loadComponent: () => import("./chunk-OVO44RNE.js").then((m) => m.ParkaddaLoginComponent)
      },
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-EEJS3VYI.js").then((m) => m.AnalyticsDashboardComponent)
      },
      {
        path: "parking-list",
        loadComponent: () => import("./chunk-LVG2YLKH.js").then((m) => m.ParkingListComponent)
      },
      {
        path: "vehicle-reports",
        loadComponent: () => import("./chunk-MOWINO55.js").then((m) => m.VehicleReportsComponent)
      },
      {
        path: "transaction-reports",
        loadComponent: () => import("./chunk-DTBFB3NA.js").then((m) => m.TransactionReportsComponent)
      }
    ]
  },
  {
    path: "pages-not-found",
    loadComponent: () => import("./chunk-OLLWLM22.js").then((m) => m.PageNotFoundComponent)
  },
  {
    path: "coming-soon",
    loadComponent: () => import("./chunk-CQ2U2342.js").then((m) => m.ComingSoonComponent)
  },
  // fallback
  { path: "**", redirectTo: "inventory" }
];

// src/app/interceptors/auth.interceptor.ts
var AuthInterceptor = class _AuthInterceptor {
  auth;
  parkaddaAuth;
  constructor(auth, parkaddaAuth) {
    this.auth = auth;
    this.parkaddaAuth = parkaddaAuth;
  }
  intercept(req, next) {
    if (req.url.includes("localhost:8080/api")) {
      const parkaddaToken = this.parkaddaAuth.getParkaddaToken();
      if (parkaddaToken) {
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${parkaddaToken}`
          }
        });
        return next.handle(cloned);
      }
      return next.handle(req);
    }
    const token = this.auth.getToken();
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
  static \u0275fac = function AuthInterceptor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthInterceptor)(\u0275\u0275inject(AuthService), \u0275\u0275inject(ParkaddaAuthService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthInterceptor, factory: _AuthInterceptor.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthInterceptor, [{
    type: Injectable
  }], () => [{ type: AuthService }, { type: ParkaddaAuthService }], null);
})();

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};

// src/app/services/sidebar.service.ts
var SidebarService = class _SidebarService {
  sidebarCollapsed = signal(false, ...ngDevMode ? [{ debugName: "sidebarCollapsed" }] : []);
  isMobile = signal(false, ...ngDevMode ? [{ debugName: "isMobile" }] : []);
  toggleSidebar(state) {
    if (state !== void 0) {
      this.sidebarCollapsed.set(state);
    } else {
      this.sidebarCollapsed.update((val) => !val);
    }
  }
  setSidebarState(state) {
    this.sidebarCollapsed.set(state);
  }
  setMobileState(isMobile) {
    this.isMobile.set(isMobile);
  }
  static \u0275fac = function SidebarService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SidebarService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SidebarService, factory: _SidebarService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/components/shared/header/header.component.ts
function HeaderComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275listener("click", function HeaderComponent_div_1_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleSidebar());
    });
    \u0275\u0275elementStart(1, "span", 7);
    \u0275\u0275text(2, "\u2630");
    \u0275\u0275elementEnd()();
  }
}
function HeaderComponent_h2_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 27);
    \u0275\u0275text(1, "ICCC Dashboard");
    \u0275\u0275elementEnd();
  }
}
function HeaderComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29);
    \u0275\u0275text(2, "Inventory Management System");
    \u0275\u0275elementEnd()();
  }
}
function HeaderComponent_span_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, "Inventory");
    \u0275\u0275elementEnd();
  }
}
function HeaderComponent_span_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.openDropdown === "inventory" ? "\u25B2" : "\u25BC", " ");
  }
}
function HeaderComponent_div_16_a_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 38);
    \u0275\u0275listener("click", function HeaderComponent_div_16_a_6_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeSidebarIfMobile());
    });
    \u0275\u0275elementStart(1, "span", 34);
    \u0275\u0275text(2, "\u{1F468}\u200D\u{1F4BC}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Admin Dashboard");
    \u0275\u0275elementEnd()();
  }
}
function HeaderComponent_div_16_a_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 39);
    \u0275\u0275listener("click", function HeaderComponent_div_16_a_7_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeSidebarIfMobile());
    });
    \u0275\u0275elementStart(1, "span", 34);
    \u0275\u0275text(2, "\u{1F4C4}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "All Requests");
    \u0275\u0275elementEnd()();
  }
}
function HeaderComponent_div_16_a_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 40);
    \u0275\u0275listener("click", function HeaderComponent_div_16_a_8_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeSidebarIfMobile());
    });
    \u0275\u0275elementStart(1, "span", 34);
    \u0275\u0275text(2, "\u{1F527}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Maintenance Request");
    \u0275\u0275elementEnd()();
  }
}
function HeaderComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "a", 33);
    \u0275\u0275listener("click", function HeaderComponent_div_16_Template_a_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebarIfMobile());
    });
    \u0275\u0275elementStart(2, "span", 34);
    \u0275\u0275text(3, "\u{1F4CB}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Inventory");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, HeaderComponent_div_16_a_6_Template, 5, 0, "a", 35)(7, HeaderComponent_div_16_a_7_Template, 5, 0, "a", 36)(8, HeaderComponent_div_16_a_8_Template, 5, 0, "a", 37);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdmin || ctx_r1.isAgency);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdmin || ctx_r1.isAgency);
  }
}
function HeaderComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29);
    \u0275\u0275text(2, "SWM");
    \u0275\u0275elementEnd()();
  }
}
function HeaderComponent_span_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, "SWM");
    \u0275\u0275elementEnd();
  }
}
function HeaderComponent_span_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.openDropdown === "swm" ? "\u25B2" : "\u25BC", " ");
  }
}
function HeaderComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "a", 41);
    \u0275\u0275listener("click", function HeaderComponent_div_24_Template_a_click_1_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebarIfMobile());
    });
    \u0275\u0275elementStart(2, "span", 34);
    \u0275\u0275text(3, "\u{1F4CA}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "SWM Dashboard");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "a", 42);
    \u0275\u0275listener("click", function HeaderComponent_div_24_Template_a_click_6_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebarIfMobile());
    });
    \u0275\u0275elementStart(7, "span", 34);
    \u0275\u0275text(8, "\u{1F4C8}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10, "Charts");
    \u0275\u0275elementEnd()()();
  }
}
function HeaderComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29);
    \u0275\u0275text(2, "PBS");
    \u0275\u0275elementEnd()();
  }
}
function HeaderComponent_span_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, "PBS");
    \u0275\u0275elementEnd();
  }
}
function HeaderComponent_span_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.openDropdown === "pbs" ? "\u25B2" : "\u25BC", " ");
  }
}
function HeaderComponent_div_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "a", 43);
    \u0275\u0275listener("click", function HeaderComponent_div_32_Template_a_click_1_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebarIfMobile());
    });
    \u0275\u0275elementStart(2, "span", 34);
    \u0275\u0275text(3, "A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Option A");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "a", 43);
    \u0275\u0275listener("click", function HeaderComponent_div_32_Template_a_click_6_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebarIfMobile());
    });
    \u0275\u0275elementStart(7, "span", 34);
    \u0275\u0275text(8, "B");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10, "Option B");
    \u0275\u0275elementEnd()()();
  }
}
function HeaderComponent_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29);
    \u0275\u0275text(2, "ANPR Analytics");
    \u0275\u0275elementEnd()();
  }
}
function HeaderComponent_span_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, "ANPR Analytics");
    \u0275\u0275elementEnd();
  }
}
function HeaderComponent_span_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.openDropdown === "anpr" ? "\u25B2" : "\u25BC", " ");
  }
}
function HeaderComponent_div_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "a", 44);
    \u0275\u0275listener("click", function HeaderComponent_div_40_Template_a_click_1_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebarIfMobile());
    });
    \u0275\u0275elementStart(2, "span", 34);
    \u0275\u0275text(3, "\u{1F4CB}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Analytics Table");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "a", 45);
    \u0275\u0275listener("click", function HeaderComponent_div_40_Template_a_click_6_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebarIfMobile());
    });
    \u0275\u0275elementStart(7, "span", 34);
    \u0275\u0275text(8, "\u{1F4CA}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10, "Analytics Charts");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "a", 46);
    \u0275\u0275listener("click", function HeaderComponent_div_40_Template_a_click_11_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebarIfMobile());
    });
    \u0275\u0275elementStart(12, "span", 34);
    \u0275\u0275text(13, "\u{1F68C}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "Bus Analytics");
    \u0275\u0275elementEnd()()();
  }
}
function HeaderComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29);
    \u0275\u0275text(2, "Parkadda");
    \u0275\u0275elementEnd()();
  }
}
function HeaderComponent_span_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, "Parkadda");
    \u0275\u0275elementEnd();
  }
}
function HeaderComponent_span_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.openDropdown === "parkadda" ? "\u25B2" : "\u25BC", " ");
  }
}
function HeaderComponent_div_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "a", 47);
    \u0275\u0275listener("click", function HeaderComponent_div_48_Template_a_click_1_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebarIfMobile());
    });
    \u0275\u0275elementStart(2, "span", 34);
    \u0275\u0275text(3, "\u{1F510}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Login");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "a", 48);
    \u0275\u0275listener("click", function HeaderComponent_div_48_Template_a_click_6_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebarIfMobile());
    });
    \u0275\u0275elementStart(7, "span", 34);
    \u0275\u0275text(8, "\u{1F4CA}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10, "Dashboard");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "a", 49);
    \u0275\u0275listener("click", function HeaderComponent_div_48_Template_a_click_11_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebarIfMobile());
    });
    \u0275\u0275elementStart(12, "span", 34);
    \u0275\u0275text(13, "\u{1F4CD}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "Parking List");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "a", 50);
    \u0275\u0275listener("click", function HeaderComponent_div_48_Template_a_click_16_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebarIfMobile());
    });
    \u0275\u0275elementStart(17, "span", 34);
    \u0275\u0275text(18, "\u{1F697}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "Vehicle Reports");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "a", 51);
    \u0275\u0275listener("click", function HeaderComponent_div_48_Template_a_click_21_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebarIfMobile());
    });
    \u0275\u0275elementStart(22, "span", 34);
    \u0275\u0275text(23, "\u{1F4B3}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25, "Transaction Reports");
    \u0275\u0275elementEnd()()();
  }
}
function HeaderComponent_div_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "div", 53);
    \u0275\u0275element(2, "img", 54);
    \u0275\u0275elementStart(3, "div", 55)(4, "div", 56);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 57);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 58);
    \u0275\u0275text(9, "v1.0.0");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((ctx_r1.user == null ? null : ctx_r1.user.username) || "Guest");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((ctx_r1.user == null ? null : ctx_r1.user.role) || "No Role");
  }
}
function HeaderComponent_div_58_ng_container_1_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "a", 64);
    \u0275\u0275listener("click", function HeaderComponent_div_58_ng_container_1_ng_container_7_Template_a_click_1_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.closeUserDropdown());
    });
    \u0275\u0275text(2, "Create Account");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 65);
    \u0275\u0275listener("click", function HeaderComponent_div_58_ng_container_1_ng_container_7_Template_a_click_3_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.closeUserDropdown());
    });
    \u0275\u0275text(4, "Forgot password?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
}
function HeaderComponent_div_58_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "p", 53);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 61);
    \u0275\u0275listener("click", function HeaderComponent_div_58_ng_container_1_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.logout());
    });
    \u0275\u0275text(4, "Logout");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 62);
    \u0275\u0275listener("click", function HeaderComponent_div_58_ng_container_1_Template_a_click_5_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeUserDropdown());
    });
    \u0275\u0275text(6, " Login with another ID ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, HeaderComponent_div_58_ng_container_1_ng_container_7_Template, 5, 0, "ng-container", 63);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.user.username, " (", ctx_r1.user.role, ")");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
  }
}
function HeaderComponent_div_58_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 62);
    \u0275\u0275listener("click", function HeaderComponent_div_58_ng_template_2_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeUserDropdown());
    });
    \u0275\u0275text(1, "Login");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "a", 64);
    \u0275\u0275listener("click", function HeaderComponent_div_58_ng_template_2_Template_a_click_2_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeUserDropdown());
    });
    \u0275\u0275text(3, "Register");
    \u0275\u0275elementEnd();
  }
}
function HeaderComponent_div_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275listener("click", function HeaderComponent_div_58_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275template(1, HeaderComponent_div_58_ng_container_1_Template, 8, 3, "ng-container", 60)(2, HeaderComponent_div_58_ng_template_2_Template, 4, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const guestOptions_r15 = \u0275\u0275reference(3);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.user)("ngIfElse", guestOptions_r15);
  }
}
function HeaderComponent_div_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 66);
    \u0275\u0275listener("click", function HeaderComponent_div_59_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleSidebar());
    });
    \u0275\u0275elementEnd();
  }
}
var HeaderComponent = class _HeaderComponent {
  auth;
  router;
  sidebarService;
  isSidebarCollapsed = false;
  isMobile = false;
  userDropdownOpen = false;
  openDropdown = null;
  user = null;
  isAdmin = false;
  isAgency = false;
  sidebarCollapsedSignal = signal(false, ...ngDevMode ? [{ debugName: "sidebarCollapsedSignal" }] : []);
  destroy$ = new Subject();
  constructor(auth, router, sidebarService) {
    this.auth = auth;
    this.router = router;
    this.sidebarService = sidebarService;
  }
  ngOnInit() {
    this.auth.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((u) => {
      this.user = u;
      const role = u?.role?.toUpperCase();
      this.isAdmin = role === "ADMIN";
      this.isAgency = role === "AGENCY";
    });
    const stored = localStorage.getItem("currentUser");
    if (stored && !this.user) {
      const parsed = JSON.parse(stored);
      this.auth.setCurrentUser(parsed);
    }
    const savedSidebarState = localStorage.getItem("sidebarCollapsed");
    if (savedSidebarState !== null) {
      this.isSidebarCollapsed = JSON.parse(savedSidebarState);
      this.sidebarService.setSidebarState(this.isSidebarCollapsed);
    }
    this.checkMobile();
    window.addEventListener("resize", () => this.checkMobile());
  }
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.sidebarService.setSidebarState(this.isSidebarCollapsed);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(this.isSidebarCollapsed));
  }
  toggleDropdown(dropdownName) {
    if (this.openDropdown === dropdownName) {
      this.openDropdown = null;
    } else {
      this.openDropdown = dropdownName;
    }
  }
  closeSidebarIfMobile() {
    if (this.isMobile) {
      this.isSidebarCollapsed = true;
    }
  }
  toggleUserDropdown(event) {
    event.stopPropagation();
    this.userDropdownOpen = !this.userDropdownOpen;
  }
  closeUserDropdown() {
    this.userDropdownOpen = false;
  }
  checkMobile() {
    this.isMobile = window.innerWidth <= 768;
    this.sidebarService.setMobileState(this.isMobile);
    if (this.isMobile) {
      this.isSidebarCollapsed = true;
      this.sidebarService.setSidebarState(true);
      localStorage.setItem("sidebarCollapsed", JSON.stringify(true));
    }
  }
  logout() {
    this.auth.logout();
    this.closeUserDropdown();
    this.router.navigate(["/login"]);
  }
  onDocumentClick() {
    if (this.userDropdownOpen) {
      this.closeUserDropdown();
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    window.removeEventListener("resize", () => this.checkMobile());
  }
  static \u0275fac = function HeaderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HeaderComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(SidebarService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HeaderComponent, selectors: [["app-header"]], hostBindings: function HeaderComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function HeaderComponent_click_HostBindingHandler() {
        return ctx.onDocumentClick();
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 60, vars: 40, consts: [["guestOptions", ""], [1, "header-layout"], ["class", "mobile-toggle", 3, "click", 4, "ngIf"], [1, "sidebar"], [1, "sidebar-header"], ["class", "dashboard-title", 4, "ngIf"], [1, "sidebar-toggle", 3, "click"], [1, "toggle-icon"], [1, "sidebar-nav"], ["class", "nav-section", 4, "ngIf"], [1, "dropdown-container"], [1, "dropdown-header", 3, "click"], [1, "dropdown-icon"], ["class", "dropdown-title", 4, "ngIf"], ["class", "dropdown-arrow", 4, "ngIf"], ["class", "dropdown-content", 4, "ngIf"], ["class", "sidebar-footer", 4, "ngIf"], [1, "app-header"], [1, "logo-container"], ["src", "/logo.jfif", "alt", "Logo", 1, "logo-img"], [1, "logo-text"], [1, "auth"], [1, "profile", 3, "click"], ["src", "/download.png", "alt", "Profile", 1, "profile-icon"], ["class", "dropdown", 3, "click", 4, "ngIf"], ["class", "mobile-overlay", 3, "click", 4, "ngIf"], [1, "mobile-toggle", 3, "click"], [1, "dashboard-title"], [1, "nav-section"], [1, "section-label"], [1, "dropdown-title"], [1, "dropdown-arrow"], [1, "dropdown-content"], ["routerLink", "/inventory", "routerLinkActive", "active", 1, "dropdown-item", 3, "click"], [1, "item-icon"], ["routerLink", "/admin/dashboard", "routerLinkActive", "active", "class", "dropdown-item", 3, "click", 4, "ngIf"], ["routerLink", "/admin/all-requests", "routerLinkActive", "active", "class", "dropdown-item", 3, "click", 4, "ngIf"], ["routerLink", "/maintenance/request", "routerLinkActive", "active", "class", "dropdown-item", 3, "click", 4, "ngIf"], ["routerLink", "/admin/dashboard", "routerLinkActive", "active", 1, "dropdown-item", 3, "click"], ["routerLink", "/admin/all-requests", "routerLinkActive", "active", 1, "dropdown-item", 3, "click"], ["routerLink", "/maintenance/request", "routerLinkActive", "active", 1, "dropdown-item", 3, "click"], ["routerLink", "/smc", "routerLinkActive", "active", 1, "dropdown-item", 3, "click"], ["routerLink", "/charts", "routerLinkActive", "active", 1, "dropdown-item", 3, "click"], ["routerLink", "/coming-soon", "routerLinkActive", "active", 1, "dropdown-item", 3, "click"], ["routerLink", "/anpr/analytics-table", "routerLinkActive", "active", 1, "dropdown-item", 3, "click"], ["routerLink", "/anpr/analytics-charts", "routerLinkActive", "active", 1, "dropdown-item", 3, "click"], ["routerLink", "/anpr/bus-analytics", "routerLinkActive", "active", 1, "dropdown-item", 3, "click"], ["routerLink", "/parkadda/login", "routerLinkActive", "active", 1, "dropdown-item", 3, "click"], ["routerLink", "/parkadda/dashboard", "routerLinkActive", "active", 1, "dropdown-item", 3, "click"], ["routerLink", "/parkadda/parking-list", "routerLinkActive", "active", 1, "dropdown-item", 3, "click"], ["routerLink", "/parkadda/vehicle-reports", "routerLinkActive", "active", 1, "dropdown-item", 3, "click"], ["routerLink", "/parkadda/transaction-reports", "routerLinkActive", "active", 1, "dropdown-item", 3, "click"], [1, "sidebar-footer"], [1, "user-info"], ["src", "/download.png", "alt", "Profile", 1, "user-avatar"], [1, "user-details"], [1, "user-name"], [1, "user-role"], [1, "version-info"], [1, "dropdown", 3, "click"], [4, "ngIf", "ngIfElse"], [3, "click"], ["routerLink", "/login", 1, "dropdown-link", 3, "click"], [4, "ngIf"], ["routerLink", "/register", 1, "dropdown-link", 3, "click"], ["routerLink", "/forgot-password", 1, "dropdown-link", 3, "click"], [1, "mobile-overlay", 3, "click"]], template: function HeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275template(1, HeaderComponent_div_1_Template, 3, 0, "div", 2);
      \u0275\u0275elementStart(2, "aside", 3)(3, "div", 4);
      \u0275\u0275template(4, HeaderComponent_h2_4_Template, 2, 0, "h2", 5);
      \u0275\u0275elementStart(5, "div", 6);
      \u0275\u0275listener("click", function HeaderComponent_Template_div_click_5_listener() {
        return ctx.toggleSidebar();
      });
      \u0275\u0275elementStart(6, "span", 7);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(8, "nav", 8);
      \u0275\u0275template(9, HeaderComponent_div_9_Template, 3, 0, "div", 9);
      \u0275\u0275elementStart(10, "div", 10)(11, "div", 11);
      \u0275\u0275listener("click", function HeaderComponent_Template_div_click_11_listener() {
        return ctx.toggleDropdown("inventory");
      });
      \u0275\u0275elementStart(12, "span", 12);
      \u0275\u0275text(13, "\u{1F4E6}");
      \u0275\u0275elementEnd();
      \u0275\u0275template(14, HeaderComponent_span_14_Template, 2, 0, "span", 13)(15, HeaderComponent_span_15_Template, 2, 1, "span", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275template(16, HeaderComponent_div_16_Template, 9, 3, "div", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275template(17, HeaderComponent_div_17_Template, 3, 0, "div", 9);
      \u0275\u0275elementStart(18, "div", 10)(19, "div", 11);
      \u0275\u0275listener("click", function HeaderComponent_Template_div_click_19_listener() {
        return ctx.toggleDropdown("swm");
      });
      \u0275\u0275elementStart(20, "span", 12);
      \u0275\u0275text(21, "\u267B\uFE0F");
      \u0275\u0275elementEnd();
      \u0275\u0275template(22, HeaderComponent_span_22_Template, 2, 0, "span", 13)(23, HeaderComponent_span_23_Template, 2, 1, "span", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275template(24, HeaderComponent_div_24_Template, 11, 0, "div", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275template(25, HeaderComponent_div_25_Template, 3, 0, "div", 9);
      \u0275\u0275elementStart(26, "div", 10)(27, "div", 11);
      \u0275\u0275listener("click", function HeaderComponent_Template_div_click_27_listener() {
        return ctx.toggleDropdown("pbs");
      });
      \u0275\u0275elementStart(28, "span", 12);
      \u0275\u0275text(29, "\u{1F3E2}");
      \u0275\u0275elementEnd();
      \u0275\u0275template(30, HeaderComponent_span_30_Template, 2, 0, "span", 13)(31, HeaderComponent_span_31_Template, 2, 1, "span", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275template(32, HeaderComponent_div_32_Template, 11, 0, "div", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275template(33, HeaderComponent_div_33_Template, 3, 0, "div", 9);
      \u0275\u0275elementStart(34, "div", 10)(35, "div", 11);
      \u0275\u0275listener("click", function HeaderComponent_Template_div_click_35_listener() {
        return ctx.toggleDropdown("anpr");
      });
      \u0275\u0275elementStart(36, "span", 12);
      \u0275\u0275text(37, "\u{1F4F9}");
      \u0275\u0275elementEnd();
      \u0275\u0275template(38, HeaderComponent_span_38_Template, 2, 0, "span", 13)(39, HeaderComponent_span_39_Template, 2, 1, "span", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275template(40, HeaderComponent_div_40_Template, 16, 0, "div", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275template(41, HeaderComponent_div_41_Template, 3, 0, "div", 9);
      \u0275\u0275elementStart(42, "div", 10)(43, "div", 11);
      \u0275\u0275listener("click", function HeaderComponent_Template_div_click_43_listener() {
        return ctx.toggleDropdown("parkadda");
      });
      \u0275\u0275elementStart(44, "span", 12);
      \u0275\u0275text(45, "\u{1F17F}\uFE0F");
      \u0275\u0275elementEnd();
      \u0275\u0275template(46, HeaderComponent_span_46_Template, 2, 0, "span", 13)(47, HeaderComponent_span_47_Template, 2, 1, "span", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275template(48, HeaderComponent_div_48_Template, 26, 0, "div", 15);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(49, HeaderComponent_div_49_Template, 10, 2, "div", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "header", 17)(51, "div", 18);
      \u0275\u0275element(52, "img", 19);
      \u0275\u0275elementStart(53, "div", 20);
      \u0275\u0275text(54, "ICCC SMART DASHBOARD");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "div", 21)(56, "div", 22);
      \u0275\u0275listener("click", function HeaderComponent_Template_div_click_56_listener($event) {
        return ctx.toggleUserDropdown($event);
      });
      \u0275\u0275element(57, "img", 23);
      \u0275\u0275template(58, HeaderComponent_div_58_Template, 4, 2, "div", 24);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(59, HeaderComponent_div_59_Template, 1, 0, "div", 25);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isMobile);
      \u0275\u0275advance();
      \u0275\u0275classProp("collapsed", ctx.isSidebarCollapsed)("mobile-open", ctx.isMobile && !ctx.isSidebarCollapsed);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", !ctx.isSidebarCollapsed);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isSidebarCollapsed ? "\u2192" : "\u2190");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275classProp("collapsed", ctx.isSidebarCollapsed);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.openDropdown === "inventory" && !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275classProp("collapsed", ctx.isSidebarCollapsed);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.openDropdown === "swm" && !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275classProp("collapsed", ctx.isSidebarCollapsed);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.openDropdown === "pbs" && !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275classProp("collapsed", ctx.isSidebarCollapsed);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.openDropdown === "anpr" && !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275classProp("collapsed", ctx.isSidebarCollapsed);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.openDropdown === "parkadda" && !ctx.isSidebarCollapsed);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isSidebarCollapsed);
      \u0275\u0275advance(9);
      \u0275\u0275property("ngIf", ctx.userDropdownOpen);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isMobile && !ctx.isSidebarCollapsed);
    }
  }, dependencies: [CommonModule, NgIf, RouterModule, RouterLink, RouterLinkActive], styles: ['\n\n.header-layout[_ngcontent-%COMP%] {\n  display: contents;\n}\n.mobile-toggle[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 15px;\n  left: 15px;\n  z-index: 1002;\n  background: #122e52;\n  color: white;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n}\n.sidebar[_ngcontent-%COMP%] {\n  width: 250px;\n  background:\n    linear-gradient(\n      180deg,\n      #122e52 0%,\n      #1a3a6a 100%);\n  color: white;\n  display: flex;\n  flex-direction: column;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);\n  z-index: 999;\n  height: 100vh;\n  position: fixed;\n  left: 0;\n  top: 0;\n  flex-shrink: 0;\n}\n.sidebar.collapsed[_ngcontent-%COMP%] {\n  width: 70px;\n}\n.sidebar.mobile-open[_ngcontent-%COMP%] {\n  transform: translateX(0);\n}\n.sidebar-header[_ngcontent-%COMP%] {\n  padding: 20px 15px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 70px;\n}\n.dashboard-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: white;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.sidebar-toggle[_ngcontent-%COMP%] {\n  width: 35px;\n  height: 35px;\n  border-radius: 8px;\n  background: rgba(255, 255, 255, 0.1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.sidebar-toggle[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.2);\n  transform: scale(1.05);\n}\n.toggle-icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: white;\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 15px 0;\n  overflow-y: auto;\n}\n.nav-section[_ngcontent-%COMP%] {\n  padding: 15px 20px 5px;\n}\n.section-label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  color: rgba(255, 255, 255, 0.6);\n  font-weight: 500;\n}\n.dropdown-container[_ngcontent-%COMP%] {\n  margin-bottom: 5px;\n}\n.dropdown-container.collapsed[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n.dropdown-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 12px 20px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  border-left: 3px solid transparent;\n}\n.dropdown-header[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n  border-left-color: #00bfff;\n}\n.dropdown-icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  margin-right: 12px;\n  min-width: 24px;\n  text-align: center;\n}\n.dropdown-container.collapsed[_ngcontent-%COMP%]   .dropdown-icon[_ngcontent-%COMP%] {\n  margin-right: 0;\n}\n.dropdown-title[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 0.95rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.dropdown-arrow[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  opacity: 0.7;\n}\n.dropdown-content[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.2);\n  border-left: 3px solid #00bfff;\n  margin-left: 20px;\n}\n.dropdown-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 10px 15px 10px 35px;\n  color: rgba(255, 255, 255, 0.8);\n  text-decoration: none;\n  transition: all 0.2s ease;\n  cursor: pointer;\n}\n.dropdown-item[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: white;\n}\n.dropdown-item.active[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.15);\n  color: white;\n  font-weight: 500;\n}\n.item-icon[_ngcontent-%COMP%] {\n  margin-right: 10px;\n  font-size: 1rem;\n  min-width: 20px;\n  text-align: center;\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  padding: 15px 20px;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n}\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 10px;\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  margin-right: 10px;\n}\n.user-details[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 0.9rem;\n}\n.user-role[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: rgba(255, 255, 255, 0.7);\n}\n.version-info[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: rgba(255, 255, 255, 0.6);\n  text-align: center;\n}\n.app-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px;\n  border-bottom: 1px solid #eee;\n  background-color: #122e52;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);\n  position: relative;\n  color: #fff;\n  flex: 1;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  box-sizing: border-box;\n  width: 100%;\n}\n.logo-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n  position: relative;\n  margin-left: 300px;\n}\n.logo-img[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.logo-text[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 2rem;\n  font-family: "Raleway";\n  color: #fff;\n}\n.auth[_ngcontent-%COMP%] {\n  position: relative;\n}\n.profile[_ngcontent-%COMP%] {\n  position: relative;\n  cursor: pointer;\n}\n.profile-icon[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid #ddd;\n  background-color: #fff;\n  transition: transform 0.1s ease-in;\n}\n.profile-icon[_ngcontent-%COMP%]:hover {\n  transform: scale(1.05);\n}\n.dropdown[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  top: 45px;\n  background: #fff;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  min-width: 170px;\n  padding: 8px;\n  z-index: 1000;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease-in-out;\n}\n.dropdown[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  background: none;\n  border: none;\n  text-align: left;\n  padding: 6px 10px;\n  cursor: pointer;\n  border-radius: 4px;\n  color: #333;\n  font-size: 0.95rem;\n  transition: background 0.2s;\n}\n.dropdown[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: #f1f1f1;\n}\n.dropdown-link[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  text-align: left;\n  padding: 6px 10px;\n  cursor: pointer;\n  border-radius: 4px;\n  transition: background 0.2s;\n  color: #333;\n  text-decoration: none;\n  font-size: 0.95rem;\n}\n.dropdown-link[_ngcontent-%COMP%]:hover {\n  background: #f1f1f1;\n}\n.mobile-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n@media (max-width: 768px) {\n  .sidebar[_ngcontent-%COMP%] {\n    transform: translateX(-100%);\n    width: 250px;\n  }\n  .sidebar.mobile-open[_ngcontent-%COMP%] {\n    transform: translateX(0);\n  }\n  .sidebar.collapsed[_ngcontent-%COMP%] {\n    width: 70px;\n    transform: translateX(0);\n  }\n  .app-header[_ngcontent-%COMP%] {\n    margin-left: 0 !important;\n    width: 100% !important;\n  }\n  .logo-text[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .mobile-toggle[_ngcontent-%COMP%] {\n    display: flex;\n  }\n}\n@media (min-width: 769px) {\n  .mobile-toggle[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.sidebar-nav[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 4px;\n}\n.sidebar-nav[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: rgba(255, 255, 255, 0.1);\n}\n.sidebar-nav[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.3);\n  border-radius: 2px;\n}\n.sidebar-nav[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, 0.4);\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-5px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=header.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderComponent, [{
    type: Component,
    args: [{ standalone: true, imports: [CommonModule, RouterModule], selector: "app-header", template: `
    <div class="header-layout">
      <!-- Mobile Toggle Button -->
      <div class="mobile-toggle" *ngIf="isMobile" (click)="toggleSidebar()">
        <span class="toggle-icon">\u2630</span>
      </div>

      <!-- Sidebar Navigation -->
      <aside class="sidebar" [class.collapsed]="isSidebarCollapsed" [class.mobile-open]="isMobile && !isSidebarCollapsed">
      <div class="sidebar-header">
        <h2 class="dashboard-title" *ngIf="!isSidebarCollapsed">ICCC Dashboard</h2>
        <div class="sidebar-toggle" (click)="toggleSidebar()">
          <span class="toggle-icon">{{ isSidebarCollapsed ? '\u2192' : '\u2190' }}</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <!-- Inventory Management Dropdown -->
        <div class="nav-section" *ngIf="!isSidebarCollapsed">
          <div class="section-label">Inventory Management System</div>
        </div>

        <div class="dropdown-container" [class.collapsed]="isSidebarCollapsed">
          <div class="dropdown-header" (click)="toggleDropdown('inventory')">
            <span class="dropdown-icon">\u{1F4E6}</span>
            <span class="dropdown-title" *ngIf="!isSidebarCollapsed">Inventory</span>
            <span class="dropdown-arrow" *ngIf="!isSidebarCollapsed">
              {{ openDropdown === 'inventory' ? '\u25B2' : '\u25BC' }}
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'inventory' && !isSidebarCollapsed">
            <a routerLink="/inventory" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">\u{1F4CB}</span>
              <span>Inventory</span>
            </a>
            <a routerLink="/admin/dashboard" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()" *ngIf="isAdmin">
              <span class="item-icon">\u{1F468}\u200D\u{1F4BC}</span>
              <span>Admin Dashboard</span>
            </a>
            <a routerLink="/admin/all-requests" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()" *ngIf="isAdmin || isAgency">
              <span class="item-icon">\u{1F4C4}</span>
              <span>All Requests</span>
            </a>
            <a routerLink="/maintenance/request" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()" *ngIf="isAdmin || isAgency">
              <span class="item-icon">\u{1F527}</span>
              <span>Maintenance Request</span>
            </a>
          </div>
        </div>

        <!-- SWM Dropdown -->
        <div class="nav-section" *ngIf="!isSidebarCollapsed">
          <div class="section-label">SWM</div>
        </div>

        <div class="dropdown-container" [class.collapsed]="isSidebarCollapsed">
          <div class="dropdown-header" (click)="toggleDropdown('swm')">
            <span class="dropdown-icon">\u267B\uFE0F</span>
            <span class="dropdown-title" *ngIf="!isSidebarCollapsed">SWM</span>
            <span class="dropdown-arrow" *ngIf="!isSidebarCollapsed">
              {{ openDropdown === 'swm' ? '\u25B2' : '\u25BC' }}
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'swm' && !isSidebarCollapsed">
            <a routerLink="/smc" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">\u{1F4CA}</span>
              <span>SWM Dashboard</span>
            </a>
            <a routerLink="/charts" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">\u{1F4C8}</span>
              <span>Charts</span>
            </a>
          </div>
        </div>

        <!-- PBS Dropdown -->
        <div class="nav-section" *ngIf="!isSidebarCollapsed">
          <div class="section-label">PBS</div>
        </div>

        <div class="dropdown-container" [class.collapsed]="isSidebarCollapsed">
          <div class="dropdown-header" (click)="toggleDropdown('pbs')">
            <span class="dropdown-icon">\u{1F3E2}</span>
            <span class="dropdown-title" *ngIf="!isSidebarCollapsed">PBS</span>
            <span class="dropdown-arrow" *ngIf="!isSidebarCollapsed">
              {{ openDropdown === 'pbs' ? '\u25B2' : '\u25BC' }}
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'pbs' && !isSidebarCollapsed">
            <a routerLink="/coming-soon" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">A</span>
              <span>Option A</span>
            </a>
            <a routerLink="/coming-soon" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">B</span>
              <span>Option B</span>
            </a>
          </div>
        </div>

        <!-- ANPR Analytics Dropdown -->
        <div class="nav-section" *ngIf="!isSidebarCollapsed">
          <div class="section-label">ANPR Analytics</div>
        </div>

        <div class="dropdown-container" [class.collapsed]="isSidebarCollapsed">
          <div class="dropdown-header" (click)="toggleDropdown('anpr')">
            <span class="dropdown-icon">\u{1F4F9}</span>
            <span class="dropdown-title" *ngIf="!isSidebarCollapsed">ANPR Analytics</span>
            <span class="dropdown-arrow" *ngIf="!isSidebarCollapsed">
              {{ openDropdown === 'anpr' ? '\u25B2' : '\u25BC' }}
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'anpr' && !isSidebarCollapsed">
            <a routerLink="/anpr/analytics-table" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">\u{1F4CB}</span>
              <span>Analytics Table</span>
            </a>
            <a routerLink="/anpr/analytics-charts" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">\u{1F4CA}</span>
              <span>Analytics Charts</span>
            </a>
            <a routerLink="/anpr/bus-analytics" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">\u{1F68C}</span>
              <span>Bus Analytics</span>
            </a>
          </div>
        </div>

        <!-- Parkadda Dropdown -->
        <div class="nav-section" *ngIf="!isSidebarCollapsed">
          <div class="section-label">Parkadda</div>
        </div>

        <div class="dropdown-container" [class.collapsed]="isSidebarCollapsed">
          <div class="dropdown-header" (click)="toggleDropdown('parkadda')">
            <span class="dropdown-icon">\u{1F17F}\uFE0F</span>
            <span class="dropdown-title" *ngIf="!isSidebarCollapsed">Parkadda</span>
            <span class="dropdown-arrow" *ngIf="!isSidebarCollapsed">
              {{ openDropdown === 'parkadda' ? '\u25B2' : '\u25BC' }}
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'parkadda' && !isSidebarCollapsed">
            <a routerLink="/parkadda/login" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">\u{1F510}</span>
              <span>Login</span>
            </a>
            <a routerLink="/parkadda/dashboard" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">\u{1F4CA}</span>
              <span>Dashboard</span>
            </a>
            <a routerLink="/parkadda/parking-list" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">\u{1F4CD}</span>
              <span>Parking List</span>
            </a>
            <a routerLink="/parkadda/vehicle-reports" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">\u{1F697}</span>
              <span>Vehicle Reports</span>
            </a>
            <a routerLink="/parkadda/transaction-reports" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">\u{1F4B3}</span>
              <span>Transaction Reports</span>
            </a>
          </div>
        </div>
      </nav>

      <!-- Sidebar Footer -->
      <div class="sidebar-footer" *ngIf="!isSidebarCollapsed">
        <div class="user-info">
          <img src="/download.png" alt="Profile" class="user-avatar" />
          <div class="user-details">
            <div class="user-name">{{ user?.username || 'Guest' }}</div>
            <div class="user-role">{{ user?.role || 'No Role' }}</div>
          </div>
        </div>
        <div class="version-info">v1.0.0</div>
      </div>
    </aside>

    <!-- Main Header -->
    <header class="app-header">
      <div class="logo-container">
        <img src="/logo.jfif" alt="Logo" class="logo-img" />
        <div class="logo-text">ICCC SMART DASHBOARD</div>
      </div>

      <div class="auth">
        <div class="profile" (click)="toggleUserDropdown($event)">
          <img src="/download.png" alt="Profile" class="profile-icon" />
          <div class="dropdown" *ngIf="userDropdownOpen" (click)="$event.stopPropagation()">
            <ng-container *ngIf="user; else guestOptions">
              <p class="user-info">{{ user.username }} ({{ user.role }})</p>
              <button (click)="logout()">Logout</button>
              <a routerLink="/login" (click)="closeUserDropdown()" class="dropdown-link">
                Login with another ID
              </a>

              <ng-container *ngIf="isAdmin">
                <a routerLink="/register" (click)="closeUserDropdown()" class="dropdown-link">Create Account</a>
                <a routerLink="/forgot-password" (click)="closeUserDropdown()" class="dropdown-link">Forgot password?</a>
              </ng-container>

            </ng-container>

            <ng-template #guestOptions>
              <a routerLink="/login" (click)="closeUserDropdown()" class="dropdown-link">Login</a>
              <a routerLink="/register" (click)="closeUserDropdown()" class="dropdown-link">Register</a>
            </ng-template>
          </div>
        </div>
      </div>
      </header>

      <!-- Mobile Overlay -->
      <div class="mobile-overlay" *ngIf="isMobile && !isSidebarCollapsed" (click)="toggleSidebar()"></div>
    </div>
  `, styles: ['/* angular:styles/component:scss;075ec2f412e1af65b1db0f066dfb6c7bb7001b9b2fd53ab00436a76c238dc178;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/shared/header/header.component.ts */\n.header-layout {\n  display: contents;\n}\n.mobile-toggle {\n  position: fixed;\n  top: 15px;\n  left: 15px;\n  z-index: 1002;\n  background: #122e52;\n  color: white;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n}\n.sidebar {\n  width: 250px;\n  background:\n    linear-gradient(\n      180deg,\n      #122e52 0%,\n      #1a3a6a 100%);\n  color: white;\n  display: flex;\n  flex-direction: column;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);\n  z-index: 999;\n  height: 100vh;\n  position: fixed;\n  left: 0;\n  top: 0;\n  flex-shrink: 0;\n}\n.sidebar.collapsed {\n  width: 70px;\n}\n.sidebar.mobile-open {\n  transform: translateX(0);\n}\n.sidebar-header {\n  padding: 20px 15px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 70px;\n}\n.dashboard-title {\n  margin: 0;\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: white;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.sidebar-toggle {\n  width: 35px;\n  height: 35px;\n  border-radius: 8px;\n  background: rgba(255, 255, 255, 0.1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.sidebar-toggle:hover {\n  background: rgba(255, 255, 255, 0.2);\n  transform: scale(1.05);\n}\n.toggle-icon {\n  font-size: 1.2rem;\n  color: white;\n}\n.sidebar-nav {\n  flex: 1;\n  padding: 15px 0;\n  overflow-y: auto;\n}\n.nav-section {\n  padding: 15px 20px 5px;\n}\n.section-label {\n  font-size: 0.8rem;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  color: rgba(255, 255, 255, 0.6);\n  font-weight: 500;\n}\n.dropdown-container {\n  margin-bottom: 5px;\n}\n.dropdown-container.collapsed {\n  display: flex;\n  justify-content: center;\n}\n.dropdown-header {\n  display: flex;\n  align-items: center;\n  padding: 12px 20px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  border-left: 3px solid transparent;\n}\n.dropdown-header:hover {\n  background: rgba(255, 255, 255, 0.1);\n  border-left-color: #00bfff;\n}\n.dropdown-icon {\n  font-size: 1.2rem;\n  margin-right: 12px;\n  min-width: 24px;\n  text-align: center;\n}\n.dropdown-container.collapsed .dropdown-icon {\n  margin-right: 0;\n}\n.dropdown-title {\n  flex: 1;\n  font-size: 0.95rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.dropdown-arrow {\n  font-size: 0.8rem;\n  opacity: 0.7;\n}\n.dropdown-content {\n  background: rgba(0, 0, 0, 0.2);\n  border-left: 3px solid #00bfff;\n  margin-left: 20px;\n}\n.dropdown-item {\n  display: flex;\n  align-items: center;\n  padding: 10px 15px 10px 35px;\n  color: rgba(255, 255, 255, 0.8);\n  text-decoration: none;\n  transition: all 0.2s ease;\n  cursor: pointer;\n}\n.dropdown-item:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: white;\n}\n.dropdown-item.active {\n  background: rgba(255, 255, 255, 0.15);\n  color: white;\n  font-weight: 500;\n}\n.item-icon {\n  margin-right: 10px;\n  font-size: 1rem;\n  min-width: 20px;\n  text-align: center;\n}\n.sidebar-footer {\n  padding: 15px 20px;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n}\n.user-info {\n  display: flex;\n  align-items: center;\n  margin-bottom: 10px;\n}\n.user-avatar {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  margin-right: 10px;\n}\n.user-details {\n  flex: 1;\n}\n.user-name {\n  font-weight: 600;\n  font-size: 0.9rem;\n}\n.user-role {\n  font-size: 0.8rem;\n  color: rgba(255, 255, 255, 0.7);\n}\n.version-info {\n  font-size: 0.8rem;\n  color: rgba(255, 255, 255, 0.6);\n  text-align: center;\n}\n.app-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px;\n  border-bottom: 1px solid #eee;\n  background-color: #122e52;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);\n  position: relative;\n  color: #fff;\n  flex: 1;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  box-sizing: border-box;\n  width: 100%;\n}\n.logo-container {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n  position: relative;\n  margin-left: 300px;\n}\n.logo-img {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.logo-text {\n  font-weight: 600;\n  font-size: 2rem;\n  font-family: "Raleway";\n  color: #fff;\n}\n.auth {\n  position: relative;\n}\n.profile {\n  position: relative;\n  cursor: pointer;\n}\n.profile-icon {\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid #ddd;\n  background-color: #fff;\n  transition: transform 0.1s ease-in;\n}\n.profile-icon:hover {\n  transform: scale(1.05);\n}\n.dropdown {\n  position: absolute;\n  right: 0;\n  top: 45px;\n  background: #fff;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  min-width: 170px;\n  padding: 8px;\n  z-index: 1000;\n  animation: fadeIn 0.2s ease-in-out;\n}\n.dropdown button {\n  display: block;\n  width: 100%;\n  background: none;\n  border: none;\n  text-align: left;\n  padding: 6px 10px;\n  cursor: pointer;\n  border-radius: 4px;\n  color: #333;\n  font-size: 0.95rem;\n  transition: background 0.2s;\n}\n.dropdown button:hover {\n  background: #f1f1f1;\n}\n.dropdown-link {\n  display: block;\n  width: 100%;\n  text-align: left;\n  padding: 6px 10px;\n  cursor: pointer;\n  border-radius: 4px;\n  transition: background 0.2s;\n  color: #333;\n  text-decoration: none;\n  font-size: 0.95rem;\n}\n.dropdown-link:hover {\n  background: #f1f1f1;\n}\n.mobile-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n@media (max-width: 768px) {\n  .sidebar {\n    transform: translateX(-100%);\n    width: 250px;\n  }\n  .sidebar.mobile-open {\n    transform: translateX(0);\n  }\n  .sidebar.collapsed {\n    width: 70px;\n    transform: translateX(0);\n  }\n  .app-header {\n    margin-left: 0 !important;\n    width: 100% !important;\n  }\n  .logo-text {\n    font-size: 1.5rem;\n  }\n  .mobile-toggle {\n    display: flex;\n  }\n}\n@media (min-width: 769px) {\n  .mobile-toggle {\n    display: none;\n  }\n}\n.sidebar-nav::-webkit-scrollbar {\n  width: 4px;\n}\n.sidebar-nav::-webkit-scrollbar-track {\n  background: rgba(255, 255, 255, 0.1);\n}\n.sidebar-nav::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.3);\n  border-radius: 2px;\n}\n.sidebar-nav::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, 0.4);\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-5px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=header.component.css.map */\n'] }]
  }], () => [{ type: AuthService }, { type: Router }, { type: SidebarService }], { onDocumentClick: [{
    type: HostListener,
    args: ["document:click"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HeaderComponent, { className: "HeaderComponent", filePath: "src/app/components/shared/header/header.component.ts", lineNumber: 648 });
})();

// src/app/app.ts
var App = class _App {
  sidebarService;
  title = signal("inventory-management", ...ngDevMode ? [{ debugName: "title" }] : []);
  constructor(sidebarService) {
    this.sidebarService = sidebarService;
    effect(() => {
      const isCollapsed = this.sidebarService.sidebarCollapsed();
      const isMobile = this.sidebarService.isMobile();
      const contentWrapper = document.querySelector(".content-wrapper");
      if (contentWrapper) {
        if (isMobile) {
          contentWrapper.style.paddingLeft = "0";
        } else {
          contentWrapper.style.paddingLeft = isCollapsed ? "70px" : "250px";
        }
      }
    });
  }
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)(\u0275\u0275directiveInject(SidebarService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 4, vars: 0, consts: [[1, "content-wrapper"]], template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-header");
      \u0275\u0275elementStart(1, "div", 0)(2, "main");
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd()();
    }
  }, dependencies: [CommonModule, RouterOutlet, HeaderComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n.content-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  overflow: hidden;\n  width: 100%;\n  padding-left: 250px;\n  transition: padding-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  box-sizing: border-box;\n}\n.content-wrapper.sidebar-collapsed[_ngcontent-%COMP%] {\n  padding-left: 70px;\n}\n@media (max-width: 768px) {\n  .content-wrapper[_ngcontent-%COMP%] {\n    padding-left: 0;\n  }\n}\nmain[_ngcontent-%COMP%] {\n  flex: 1;\n  width: 100%;\n  padding: 16px;\n  overflow-y: auto;\n  overflow-x: hidden;\n  box-sizing: border-box;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  margin: 0;\n}\nmain[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nmain[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\nmain[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f1f1f1;\n}\nmain[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #888;\n  border-radius: 4px;\n}\nmain[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #555;\n}\napp-header[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  z-index: 100;\n}\n@media (max-width: 768px) {\n  .content-wrapper[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=app.css.map */", "\n\n[_nghost-%COMP%] {\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  margin: 0;\n  padding: 0;\n}\nbody[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family:\n    Inter,\n    system-ui,\n    Arial,\n    sans-serif;\n  padding: 0;\n}\napp-header[_ngcontent-%COMP%] {\n  display: block;\n  flex-shrink: 0;\n  z-index: 100;\n}\n.content-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  overflow: hidden;\n  width: 100%;\n}\nmain[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 16px;\n  width: 100%;\n  overflow-y: auto;\n  overflow-x: hidden;\n  box-sizing: border-box;\n  margin: 0;\n}\n/*# sourceMappingURL=app.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", imports: [CommonModule, RouterOutlet, HeaderComponent], template: '\r\n<!doctype html>\r\n<style>\r\n	:host { \r\n		box-sizing: border-box; \r\n		display: flex; \r\n		flex-direction: column; \r\n		height: 100vh;\r\n		margin: 0;\r\n		padding: 0;\r\n	}\r\n	body { \r\n		margin: 0; \r\n		font-family: Inter, system-ui, Arial, sans-serif;\r\n		padding: 0;\r\n	}\r\n	app-header { \r\n		display: block; \r\n		flex-shrink: 0;\r\n		z-index: 100;\r\n	}\r\n	.content-wrapper {\r\n		display: flex;\r\n		flex: 1;\r\n		overflow: hidden;\r\n		width: 100%;\r\n	}\r\n	main { \r\n		flex: 1; \r\n		padding: 16px; \r\n		width: 100%;\r\n		overflow-y: auto;\r\n		overflow-x: hidden;\r\n		box-sizing: border-box;\r\n		margin: 0;\r\n	}\r\n</style>\r\n\r\n<app-header></app-header>\r\n<!-- <app-weighbridge-charts></app-weighbridge-charts> -->\r\n<div class="content-wrapper">\r\n	<main>\r\n		<router-outlet></router-outlet>\r\n	</main>\r\n</div>\r\n', styles: ["/* src/app/app.scss */\n:host {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n.content-wrapper {\n  display: flex;\n  flex: 1;\n  overflow: hidden;\n  width: 100%;\n  padding-left: 250px;\n  transition: padding-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  box-sizing: border-box;\n}\n.content-wrapper.sidebar-collapsed {\n  padding-left: 70px;\n}\n@media (max-width: 768px) {\n  .content-wrapper {\n    padding-left: 0;\n  }\n}\nmain {\n  flex: 1;\n  width: 100%;\n  padding: 16px;\n  overflow-y: auto;\n  overflow-x: hidden;\n  box-sizing: border-box;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  margin: 0;\n}\nmain > * {\n  box-sizing: border-box;\n}\nmain::-webkit-scrollbar {\n  width: 8px;\n}\nmain::-webkit-scrollbar-track {\n  background: #f1f1f1;\n}\nmain::-webkit-scrollbar-thumb {\n  background: #888;\n  border-radius: 4px;\n}\nmain::-webkit-scrollbar-thumb:hover {\n  background: #555;\n}\napp-header {\n  flex-shrink: 0;\n  z-index: 100;\n}\n@media (max-width: 768px) {\n  .content-wrapper {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=app.css.map */\n", "/* angular:styles/component:css;d6ef685aa0db05ad8123066cb2ea41b997e8a6f47609f8594b9036a96854eff4;C:\\Users\\Administrator\\Documents\\GitHub\\iccc-smart-dashboard\\src\\app\\app.html */\n:host {\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  margin: 0;\n  padding: 0;\n}\nbody {\n  margin: 0;\n  font-family:\n    Inter,\n    system-ui,\n    Arial,\n    sans-serif;\n  padding: 0;\n}\napp-header {\n  display: block;\n  flex-shrink: 0;\n  z-index: 100;\n}\n.content-wrapper {\n  display: flex;\n  flex: 1;\n  overflow: hidden;\n  width: 100%;\n}\nmain {\n  flex: 1;\n  padding: 16px;\n  width: 100%;\n  overflow-y: auto;\n  overflow-x: hidden;\n  box-sizing: border-box;\n  margin: 0;\n}\n/*# sourceMappingURL=app.css.map */\n"] }]
  }], () => [{ type: SidebarService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 14 });
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
