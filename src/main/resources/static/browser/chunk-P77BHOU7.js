import {
  MatDatepickerModule
} from "./chunk-GZFZG7RZ.js";
import {
  ReducePipe
} from "./chunk-TUEKHBXS.js";
import {
  SmcService
} from "./chunk-C2E4MYPM.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-CDHLY53M.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-NUGY3VFH.js";
import {
  MatNativeDateModule
} from "./chunk-I2GMTQVL.js";
import "./chunk-LDVFDARF.js";
import "./chunk-FHWKHDJD.js";
import {
  MatSelectModule
} from "./chunk-GP53F2Q2.js";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from "./chunk-YVIEHVQN.js";
import "./chunk-AREEN4Y3.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-FCQFOFUY.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-L77IW56B.js";
import {
  MatFormFieldModule
} from "./chunk-WHDPFR7X.js";
import "./chunk-QWWSWOTY.js";
import {
  MatFormField,
  MatLabel,
  MatSuffix
} from "./chunk-MSRYKTCV.js";
import "./chunk-54RZU52J.js";
import {
  MatCard,
  MatCardModule
} from "./chunk-A5CP52TD.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-NNMEMFZC.js";
import "./chunk-W7WDMGEW.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-LZCG3VZ3.js";
import {
  CommonModule,
  DecimalPipe,
  NgClass,
  NgIf
} from "./chunk-6LIGNQX5.js";
import {
  Component,
  Subject,
  setClassMetadata,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-OXNL7LB6.js";
import "./chunk-TXDUYLVM.js";

// src/app/components/admin/chartered-bike-stations/chartered-bike-stations.component.ts
function CharteredBikeStationsComponent_mat_card_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 19)(1, "div", 20)(2, "mat-icon");
    \u0275\u0275text(3, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 21);
    \u0275\u0275listener("click", function CharteredBikeStationsComponent_mat_card_18_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dismissError());
    });
    \u0275\u0275elementStart(7, "mat-icon");
    \u0275\u0275text(8, "close");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function CharteredBikeStationsComponent_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275element(1, "mat-spinner", 23);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading stations...");
    \u0275\u0275elementEnd()();
  }
}
function CharteredBikeStationsComponent_mat_card_34_th_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Station Name");
    \u0275\u0275elementEnd();
  }
}
function CharteredBikeStationsComponent_mat_card_34_td_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br");
    \u0275\u0275elementStart(4, "small", 40);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const station_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(station_r3.stationName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("#", station_r3.stationNumber);
  }
}
function CharteredBikeStationsComponent_mat_card_34_th_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Available");
    \u0275\u0275elementEnd();
  }
}
function CharteredBikeStationsComponent_mat_card_34_td_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39)(1, "span", 41);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 40);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const station_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(station_r4.bikesAvailable);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("/ ", station_r4.bikesTotal);
  }
}
function CharteredBikeStationsComponent_mat_card_34_th_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Total");
    \u0275\u0275elementEnd();
  }
}
function CharteredBikeStationsComponent_mat_card_34_td_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const station_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(station_r5.bikesTotal);
  }
}
function CharteredBikeStationsComponent_mat_card_34_th_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Availability %");
    \u0275\u0275elementEnd();
  }
}
function CharteredBikeStationsComponent_mat_card_34_td_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39)(1, "div", 42);
    \u0275\u0275element(2, "div", 43);
    \u0275\u0275elementStart(3, "span", 44);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const station_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.getAvailabilityPercentage(station_r6), "%");
    \u0275\u0275property("ngClass", ctx_r1.getStatusColor(station_r6));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.getAvailabilityPercentage(station_r6), "%");
  }
}
function CharteredBikeStationsComponent_mat_card_34_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Rack Available");
    \u0275\u0275elementEnd();
  }
}
function CharteredBikeStationsComponent_mat_card_34_td_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 40);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const station_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(station_r7.bikesRack);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("/ ", station_r7.bikesFree);
  }
}
function CharteredBikeStationsComponent_mat_card_34_th_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Status");
    \u0275\u0275elementEnd();
  }
}
function CharteredBikeStationsComponent_mat_card_34_td_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39)(1, "span", 45);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const station_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "status-" + ctx_r1.getStatusLabel(station_r8).toLowerCase())("matTooltip", "Availability: " + ctx_r1.getAvailabilityPercentage(station_r8) + "%");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(station_r8), " ");
  }
}
function CharteredBikeStationsComponent_mat_card_34_th_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function CharteredBikeStationsComponent_mat_card_34_td_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39)(1, "button", 46)(2, "mat-icon");
    \u0275\u0275text(3, "info");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 47)(5, "mat-icon");
    \u0275\u0275text(6, "location_on");
    \u0275\u0275elementEnd()()();
  }
}
function CharteredBikeStationsComponent_mat_card_34_tr_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 48);
  }
}
function CharteredBikeStationsComponent_mat_card_34_tr_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 49);
  }
}
function CharteredBikeStationsComponent_mat_card_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 24)(1, "div", 25)(2, "table", 26);
    \u0275\u0275elementContainerStart(3, 27);
    \u0275\u0275template(4, CharteredBikeStationsComponent_mat_card_34_th_4_Template, 2, 0, "th", 28)(5, CharteredBikeStationsComponent_mat_card_34_td_5_Template, 6, 2, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(6, 30);
    \u0275\u0275template(7, CharteredBikeStationsComponent_mat_card_34_th_7_Template, 2, 0, "th", 28)(8, CharteredBikeStationsComponent_mat_card_34_td_8_Template, 5, 2, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(9, 31);
    \u0275\u0275template(10, CharteredBikeStationsComponent_mat_card_34_th_10_Template, 2, 0, "th", 28)(11, CharteredBikeStationsComponent_mat_card_34_td_11_Template, 2, 1, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(12, 32);
    \u0275\u0275template(13, CharteredBikeStationsComponent_mat_card_34_th_13_Template, 2, 0, "th", 28)(14, CharteredBikeStationsComponent_mat_card_34_td_14_Template, 5, 4, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(15, 33);
    \u0275\u0275template(16, CharteredBikeStationsComponent_mat_card_34_th_16_Template, 2, 0, "th", 28)(17, CharteredBikeStationsComponent_mat_card_34_td_17_Template, 5, 2, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(18, 34);
    \u0275\u0275template(19, CharteredBikeStationsComponent_mat_card_34_th_19_Template, 2, 0, "th", 28)(20, CharteredBikeStationsComponent_mat_card_34_td_20_Template, 3, 3, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(21, 35);
    \u0275\u0275template(22, CharteredBikeStationsComponent_mat_card_34_th_22_Template, 2, 0, "th", 28)(23, CharteredBikeStationsComponent_mat_card_34_td_23_Template, 7, 0, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(24, CharteredBikeStationsComponent_mat_card_34_tr_24_Template, 1, 0, "tr", 36)(25, CharteredBikeStationsComponent_mat_card_34_tr_25_Template, 1, 0, "tr", 37);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("dataSource", ctx_r1.filteredStations);
    \u0275\u0275advance(22);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
  }
}
function CharteredBikeStationsComponent_mat_card_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 50)(1, "div", 51)(2, "mat-icon", 52);
    \u0275\u0275text(3, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, "No Stations Found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Try adjusting your filters or refresh the data.");
    \u0275\u0275elementEnd()()();
  }
}
function CharteredBikeStationsComponent_mat_card_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 53)(1, "div", 54)(2, "div", 55)(3, "div", 56);
    \u0275\u0275text(4, "Total Stations");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 57);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 55)(8, "div", 56);
    \u0275\u0275text(9, "Total Bikes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 57);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "reduce");
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 55)(15, "div", 56);
    \u0275\u0275text(16, "Available Bikes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 57);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "reduce");
    \u0275\u0275pipe(20, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 55)(22, "div", 56);
    \u0275\u0275text(23, "Average Availability");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 57);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "reduce");
    \u0275\u0275pipe(27, "reduce");
    \u0275\u0275pipe(28, "number");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.filteredStations.length);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(13, 8, \u0275\u0275pipeBind3(12, 4, ctx_r1.filteredStations, "bikesTotal", 0)), " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(20, 14, \u0275\u0275pipeBind3(19, 10, ctx_r1.filteredStations, "bikesAvailable", 0)), " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(28, 24, \u0275\u0275pipeBind3(26, 16, ctx_r1.filteredStations, "bikesAvailable", 0) / \u0275\u0275pipeBind3(27, 20, ctx_r1.filteredStations, "bikesTotal", 0) * 100, "1.0-0"), "% ");
  }
}
var CharteredBikeStationsComponent = class _CharteredBikeStationsComponent {
  smcService;
  stations = [];
  filteredStations = [];
  loading = false;
  error = null;
  searchText = "";
  minBikesFilter = 0;
  autoRefreshInterval;
  autoRefreshEnabled = false;
  displayedColumns = [
    "stationName",
    "bikesAvailable",
    "bikesTotal",
    "availabilityPercentage",
    "bikeRackAvailable",
    "status",
    "actions"
  ];
  destroy$ = new Subject();
  constructor(smcService) {
    this.smcService = smcService;
  }
  ngOnInit() {
    this.loadStations();
  }
  ngOnDestroy() {
    this.stopAutoRefresh();
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadStations() {
    this.loading = true;
    this.error = null;
    this.smcService.getCharteredBikeStations().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.stations = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading stations:", err);
        this.error = "Failed to load stations. Please try again.";
        this.loading = false;
      }
    });
  }
  loadFilteredStations() {
    if (this.minBikesFilter <= 0) {
      this.loadStations();
      return;
    }
    this.loading = true;
    this.error = null;
    this.smcService.getCharteredBikeStationsFiltered(this.minBikesFilter).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.stations = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading filtered stations:", err);
        this.error = "Failed to load filtered stations. Please try again.";
        this.loading = false;
      }
    });
  }
  applyFilters() {
    let filtered = this.stations;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = filtered.filter((station) => station.stationName.toLowerCase().includes(search));
    }
    this.filteredStations = filtered;
  }
  onSearchChange(value) {
    this.searchText = value;
    this.applyFilters();
  }
  getAvailabilityPercentage(station) {
    if (station.bikesTotal === 0)
      return 0;
    return Math.round(station.bikesAvailable / station.bikesTotal * 100);
  }
  getStatusColor(station) {
    const percentage = this.getAvailabilityPercentage(station);
    if (percentage >= 50)
      return "status-good";
    if (percentage >= 25)
      return "status-warning";
    return "status-critical";
  }
  getStatusLabel(station) {
    const percentage = this.getAvailabilityPercentage(station);
    if (percentage >= 50)
      return "Good";
    if (percentage >= 25)
      return "Low";
    return "Critical";
  }
  toggleAutoRefresh() {
    this.autoRefreshEnabled = !this.autoRefreshEnabled;
    if (this.autoRefreshEnabled) {
      this.startAutoRefresh();
    } else {
      this.stopAutoRefresh();
    }
  }
  startAutoRefresh() {
    this.autoRefreshInterval = setInterval(() => {
      this.loadStations();
    }, 3e4);
  }
  stopAutoRefresh() {
    if (this.autoRefreshInterval) {
      clearInterval(this.autoRefreshInterval);
      this.autoRefreshInterval = null;
    }
  }
  syncData() {
    this.loading = true;
    this.smcService.syncCharteredBikeData().pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.loadStations();
      },
      error: (err) => {
        console.error("Error syncing data:", err);
        this.error = "Failed to sync data. Please try again.";
        this.loading = false;
      }
    });
  }
  refreshStations() {
    this.loadStations();
  }
  dismissError() {
    this.error = null;
  }
  static \u0275fac = function CharteredBikeStationsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CharteredBikeStationsComponent)(\u0275\u0275directiveInject(SmcService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CharteredBikeStationsComponent, selectors: [["app-chartered-bike-stations"]], decls: 37, vars: 14, consts: [[1, "chartered-bike-container"], [1, "header-card"], [1, "header-content"], [1, "header-actions"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["mat-raised-button", "", 3, "click", "color", "disabled"], ["mat-raised-button", "", "color", "warn", 3, "click", "disabled"], ["class", "error-card", 4, "ngIf"], [1, "filters-card"], [1, "filters-content"], [1, "search-field"], ["matInput", "", "placeholder", "Enter station name", 3, "ngModelChange", "ngModel"], ["matSuffix", ""], [1, "filter-field"], ["matInput", "", "type", "number", "min", "0", "placeholder", "Filter by minimum bikes", 3, "ngModelChange", "ngModel"], ["class", "loading-container", 4, "ngIf"], ["class", "table-card", 4, "ngIf"], ["class", "empty-card", 4, "ngIf"], ["class", "stats-card", 4, "ngIf"], [1, "error-card"], [1, "error-content"], ["mat-icon-button", "", 3, "click"], [1, "loading-container"], ["diameter", "50"], [1, "table-card"], [1, "table-container"], ["mat-table", "", 1, "stations-table", 3, "dataSource"], ["matColumnDef", "stationName"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "bikesAvailable"], ["matColumnDef", "bikesTotal"], ["matColumnDef", "availabilityPercentage"], ["matColumnDef", "bikeRackAvailable"], ["matColumnDef", "status"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "text-muted"], [1, "bikes-available"], [1, "percentage-bar"], [1, "percentage-fill", 3, "ngClass"], [1, "percentage-text"], [1, "status-badge", 3, "ngClass", "matTooltip"], ["mat-icon-button", "", "matTooltip", "View Details", 1, "action-btn"], ["mat-icon-button", "", "matTooltip", "View on Map", 1, "action-btn"], ["mat-header-row", ""], ["mat-row", ""], [1, "empty-card"], [1, "empty-content"], [1, "empty-icon"], [1, "stats-card"], [1, "stats-grid"], [1, "stat-item"], [1, "stat-label"], [1, "stat-value"]], template: function CharteredBikeStationsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "mat-card", 1)(2, "div", 2)(3, "h1");
      \u0275\u0275text(4, "Chartered Bike Stations");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 3)(6, "button", 4);
      \u0275\u0275listener("click", function CharteredBikeStationsComponent_Template_button_click_6_listener() {
        return ctx.refreshStations();
      });
      \u0275\u0275elementStart(7, "mat-icon");
      \u0275\u0275text(8, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " Refresh ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "button", 5);
      \u0275\u0275listener("click", function CharteredBikeStationsComponent_Template_button_click_10_listener() {
        return ctx.toggleAutoRefresh();
      });
      \u0275\u0275elementStart(11, "mat-icon");
      \u0275\u0275text(12);
      \u0275\u0275elementEnd();
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "button", 6);
      \u0275\u0275listener("click", function CharteredBikeStationsComponent_Template_button_click_14_listener() {
        return ctx.syncData();
      });
      \u0275\u0275elementStart(15, "mat-icon");
      \u0275\u0275text(16, "sync");
      \u0275\u0275elementEnd();
      \u0275\u0275text(17, " Sync Data ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(18, CharteredBikeStationsComponent_mat_card_18_Template, 9, 1, "mat-card", 7);
      \u0275\u0275elementStart(19, "mat-card", 8)(20, "div", 9)(21, "mat-form-field", 10)(22, "mat-label");
      \u0275\u0275text(23, "Search Station");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "input", 11);
      \u0275\u0275twoWayListener("ngModelChange", function CharteredBikeStationsComponent_Template_input_ngModelChange_24_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchText, $event) || (ctx.searchText = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function CharteredBikeStationsComponent_Template_input_ngModelChange_24_listener($event) {
        return ctx.onSearchChange($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "mat-icon", 12);
      \u0275\u0275text(26, "search");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "mat-form-field", 13)(28, "mat-label");
      \u0275\u0275text(29, "Minimum Bikes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "input", 14);
      \u0275\u0275twoWayListener("ngModelChange", function CharteredBikeStationsComponent_Template_input_ngModelChange_30_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.minBikesFilter, $event) || (ctx.minBikesFilter = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "button", 4);
      \u0275\u0275listener("click", function CharteredBikeStationsComponent_Template_button_click_31_listener() {
        return ctx.loadFilteredStations();
      });
      \u0275\u0275text(32, " Apply Filter ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(33, CharteredBikeStationsComponent_div_33_Template, 4, 0, "div", 15)(34, CharteredBikeStationsComponent_mat_card_34_Template, 26, 3, "mat-card", 16)(35, CharteredBikeStationsComponent_mat_card_35_Template, 8, 0, "mat-card", 17)(36, CharteredBikeStationsComponent_mat_card_36_Template, 29, 27, "mat-card", 18);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance(4);
      \u0275\u0275property("color", ctx.autoRefreshEnabled ? "accent" : "primary")("disabled", ctx.loading);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.autoRefreshEnabled ? "pause" : "play_arrow");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.autoRefreshEnabled ? "Stop Auto-Refresh" : "Start Auto-Refresh", " ");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.error);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchText);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.minBikesFilter);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredStations.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredStations.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredStations.length > 0);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgIf,
    FormsModule,
    DefaultValueAccessor,
    NumberValueAccessor,
    NgControlStatus,
    MinValidator,
    NgModel,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatTableModule,
    MatTable,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatCellDef,
    MatRowDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatSelectModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatInput,
    MatIconModule,
    MatIcon,
    MatTooltipModule,
    MatTooltip,
    MatCardModule,
    MatCard,
    DecimalPipe,
    ReducePipe
  ], styles: ["\n\n.chartered-bike-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  background-color: #f5f5f5;\n  min-height: 100vh;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 24px;\n  font-weight: 600;\n  color: #333;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .error-card[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  background-color: #ffebee;\n  border-left: 4px solid #f44336;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .error-card[_ngcontent-%COMP%]   .error-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: #c62828;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .error-card[_ngcontent-%COMP%]   .error-content[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .error-card[_ngcontent-%COMP%]   .error-content[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filters-content[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: flex-end;\n  flex-wrap: wrap;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filters-content[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%], \n.chartered-bike-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filters-content[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 200px;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filters-content[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  height: 56px;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px 24px;\n  gap: 16px;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #666;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n  font-weight: 600;\n  color: #333;\n  padding: 16px;\n  text-align: left;\n  border-bottom: 2px solid #e0e0e0;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-bottom: 1px solid #e0e0e0;\n  vertical-align: middle;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n  text-align: right;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background-color: #fafafa;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%]   .bikes-available[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1976d2;\n  font-size: 18px;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%]   .text-muted[_ngcontent-%COMP%] {\n  color: #999;\n  font-size: 13px;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%]   .percentage-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  height: 30px;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%]   .percentage-bar[_ngcontent-%COMP%]   .percentage-fill[_ngcontent-%COMP%] {\n  height: 24px;\n  min-width: 60px;\n  border-radius: 4px;\n  transition: width 0.3s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: 600;\n  font-size: 12px;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%]   .percentage-bar[_ngcontent-%COMP%]   .percentage-fill.status-good[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #4caf50,\n      #66bb6a);\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%]   .percentage-bar[_ngcontent-%COMP%]   .percentage-fill.status-warning[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #ff9800,\n      #ffb74d);\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%]   .percentage-bar[_ngcontent-%COMP%]   .percentage-fill.status-critical[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #f44336,\n      #ef5350);\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%]   .percentage-bar[_ngcontent-%COMP%]   .percentage-text[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #333;\n  min-width: 45px;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-weight: 500;\n  font-size: 12px;\n  white-space: nowrap;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%]   .status-badge.status-good[_ngcontent-%COMP%] {\n  background-color: #e8f5e9;\n  color: #2e7d32;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%]   .status-badge.status-warning[_ngcontent-%COMP%] {\n  background-color: #fff3e0;\n  color: #e65100;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%]   .status-badge.status-low[_ngcontent-%COMP%] {\n  background-color: #fff3e0;\n  color: #e65100;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%]   .status-badge.status-critical[_ngcontent-%COMP%] {\n  background-color: #ffebee;\n  color: #c62828;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%] {\n  color: #1976d2;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .stations-table[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]:hover {\n  background-color: #e3f2fd;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .empty-card[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 24px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .empty-card[_ngcontent-%COMP%]   .empty-content[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #ccc;\n  margin: 0 auto 16px;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .empty-card[_ngcontent-%COMP%]   .empty-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #666;\n  margin: 0 0 8px;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .empty-card[_ngcontent-%COMP%]   .empty-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #999;\n  margin: 0;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .stats-card[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 24px;\n  padding: 24px;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #999;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 8px;\n}\n.chartered-bike-container[_ngcontent-%COMP%]   .stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: 700;\n  color: #1976d2;\n}\n@media (max-width: 768px) {\n  .chartered-bike-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .chartered-bike-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .chartered-bike-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .chartered-bike-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .chartered-bike-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n    min-width: 120px;\n  }\n  .chartered-bike-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filters-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .chartered-bike-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filters-content[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%], \n   .chartered-bike-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filters-content[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .chartered-bike-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filters-content[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .chartered-bike-container[_ngcontent-%COMP%]   .stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 16px;\n    padding: 16px;\n  }\n  .chartered-bike-container[_ngcontent-%COMP%]   .stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n}\n/*# sourceMappingURL=chartered-bike-stations.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CharteredBikeStationsComponent, [{
    type: Component,
    args: [{ selector: "app-chartered-bike-stations", standalone: true, imports: [
      CommonModule,
      FormsModule,
      MatButtonModule,
      MatTableModule,
      MatProgressSpinnerModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatTooltipModule,
      MatCardModule,
      ReducePipe
    ], template: `<div class="chartered-bike-container">\r
  <mat-card class="header-card">\r
    <div class="header-content">\r
      <h1>Chartered Bike Stations</h1>\r
      <div class="header-actions">\r
        <button mat-raised-button color="primary" (click)="refreshStations()" [disabled]="loading">\r
          <mat-icon>refresh</mat-icon>\r
          Refresh\r
        </button>\r
        <button\r
          mat-raised-button\r
          [color]="autoRefreshEnabled ? 'accent' : 'primary'"\r
          (click)="toggleAutoRefresh()"\r
          [disabled]="loading"\r
        >\r
          <mat-icon>{{ autoRefreshEnabled ? 'pause' : 'play_arrow' }}</mat-icon>\r
          {{ autoRefreshEnabled ? 'Stop Auto-Refresh' : 'Start Auto-Refresh' }}\r
        </button>\r
        <button mat-raised-button color="warn" (click)="syncData()" [disabled]="loading">\r
          <mat-icon>sync</mat-icon>\r
          Sync Data\r
        </button>\r
      </div>\r
    </div>\r
  </mat-card>\r
\r
  <!-- Error Message -->\r
  <mat-card *ngIf="error" class="error-card">\r
    <div class="error-content">\r
      <mat-icon>error</mat-icon>\r
      <span>{{ error }}</span>\r
      <button mat-icon-button (click)="dismissError()">\r
        <mat-icon>close</mat-icon>\r
      </button>\r
    </div>\r
  </mat-card>\r
\r
  <!-- Filters -->\r
  <mat-card class="filters-card">\r
    <div class="filters-content">\r
      <mat-form-field class="search-field">\r
        <mat-label>Search Station</mat-label>\r
        <input\r
          matInput\r
          placeholder="Enter station name"\r
          [(ngModel)]="searchText"\r
          (ngModelChange)="onSearchChange($event)"\r
        />\r
        <mat-icon matSuffix>search</mat-icon>\r
      </mat-form-field>\r
\r
      <mat-form-field class="filter-field">\r
        <mat-label>Minimum Bikes</mat-label>\r
        <input\r
          matInput\r
          type="number"\r
          [(ngModel)]="minBikesFilter"\r
          min="0"\r
          placeholder="Filter by minimum bikes"\r
        />\r
      </mat-form-field>\r
\r
      <button mat-raised-button color="primary" (click)="loadFilteredStations()" [disabled]="loading">\r
        Apply Filter\r
      </button>\r
    </div>\r
  </mat-card>\r
\r
  <!-- Loading Spinner -->\r
  <div *ngIf="loading" class="loading-container">\r
    <mat-spinner diameter="50"></mat-spinner>\r
    <p>Loading stations...</p>\r
  </div>\r
\r
  <!-- Stations Table -->\r
  <mat-card *ngIf="!loading && filteredStations.length > 0" class="table-card">\r
    <div class="table-container">\r
      <table mat-table [dataSource]="filteredStations" class="stations-table">\r
        <!-- Station Name Column -->\r
        <ng-container matColumnDef="stationName">\r
          <th mat-header-cell *matHeaderCellDef>Station Name</th>\r
          <td mat-cell *matCellDef="let station">\r
            <strong>{{ station.stationName }}</strong>\r
            <br />\r
            <small class="text-muted">#{{ station.stationNumber }}</small>\r
          </td>\r
        </ng-container>\r
\r
        <!-- Bikes Available Column -->\r
        <ng-container matColumnDef="bikesAvailable">\r
          <th mat-header-cell *matHeaderCellDef>Available</th>\r
          <td mat-cell *matCellDef="let station">\r
            <span class="bikes-available">{{ station.bikesAvailable }}</span>\r
            <span class="text-muted">/ {{ station.bikesTotal }}</span>\r
          </td>\r
        </ng-container>\r
\r
        <!-- Bikes Total Column -->\r
        <ng-container matColumnDef="bikesTotal">\r
          <th mat-header-cell *matHeaderCellDef>Total</th>\r
          <td mat-cell *matCellDef="let station">{{ station.bikesTotal }}</td>\r
        </ng-container>\r
\r
        <!-- Availability Percentage Column -->\r
        <ng-container matColumnDef="availabilityPercentage">\r
          <th mat-header-cell *matHeaderCellDef>Availability %</th>\r
          <td mat-cell *matCellDef="let station">\r
            <div class="percentage-bar">\r
              <div\r
                class="percentage-fill"\r
                [style.width.%]="getAvailabilityPercentage(station)"\r
                [ngClass]="getStatusColor(station)"\r
              ></div>\r
              <span class="percentage-text">{{ getAvailabilityPercentage(station) }}%</span>\r
            </div>\r
          </td>\r
        </ng-container>\r
\r
        <!-- Bike Rack Available Column -->\r
        <ng-container matColumnDef="bikeRackAvailable">\r
          <th mat-header-cell *matHeaderCellDef>Rack Available</th>\r
          <td mat-cell *matCellDef="let station">\r
            <span>{{ station.bikesRack }}</span>\r
            <span class="text-muted">/ {{ station.bikesFree }}</span>\r
          </td>\r
        </ng-container>\r
\r
        <!-- Status Column -->\r
        <ng-container matColumnDef="status">\r
          <th mat-header-cell *matHeaderCellDef>Status</th>\r
          <td mat-cell *matCellDef="let station">\r
            <span\r
              class="status-badge"\r
              [ngClass]="'status-' + getStatusLabel(station).toLowerCase()"\r
              [matTooltip]="'Availability: ' + getAvailabilityPercentage(station) + '%'"\r
            >\r
              {{ getStatusLabel(station) }}\r
            </span>\r
          </td>\r
        </ng-container>\r
\r
        <!-- Actions Column -->\r
        <ng-container matColumnDef="actions">\r
          <th mat-header-cell *matHeaderCellDef>Actions</th>\r
          <td mat-cell *matCellDef="let station">\r
            <button\r
              mat-icon-button\r
              matTooltip="View Details"\r
              class="action-btn"\r
            >\r
              <mat-icon>info</mat-icon>\r
            </button>\r
            <button\r
              mat-icon-button\r
              matTooltip="View on Map"\r
              class="action-btn"\r
            >\r
              <mat-icon>location_on</mat-icon>\r
            </button>\r
          </td>\r
        </ng-container>\r
\r
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>\r
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>\r
      </table>\r
    </div>\r
  </mat-card>\r
\r
  <!-- Empty State -->\r
  <mat-card *ngIf="!loading && filteredStations.length === 0" class="empty-card">\r
    <div class="empty-content">\r
      <mat-icon class="empty-icon">info</mat-icon>\r
      <h3>No Stations Found</h3>\r
      <p>Try adjusting your filters or refresh the data.</p>\r
    </div>\r
  </mat-card>\r
\r
  <!-- Summary Statistics -->\r
  <mat-card *ngIf="!loading && filteredStations.length > 0" class="stats-card">\r
    <div class="stats-grid">\r
      <div class="stat-item">\r
        <div class="stat-label">Total Stations</div>\r
        <div class="stat-value">{{ filteredStations.length }}</div>\r
      </div>\r
      <div class="stat-item">\r
        <div class="stat-label">Total Bikes</div>\r
        <div class="stat-value">\r
          {{ filteredStations | reduce: 'bikesTotal':0 | number }}\r
        </div>\r
      </div>\r
      <div class="stat-item">\r
        <div class="stat-label">Available Bikes</div>\r
        <div class="stat-value">\r
          {{ filteredStations | reduce: 'bikesAvailable':0 | number }}\r
        </div>\r
      </div>\r
      <div class="stat-item">\r
        <div class="stat-label">Average Availability</div>\r
        <div class="stat-value">\r
          {{\r
            (filteredStations\r
              | reduce: 'bikesAvailable':0) / (filteredStations | reduce: 'bikesTotal':0) * 100 | number: '1.0-0'\r
          }}%\r
        </div>\r
      </div>\r
    </div>\r
  </mat-card>\r
</div>\r
`, styles: ["/* src/app/components/admin/chartered-bike-stations/chartered-bike-stations.component.scss */\n.chartered-bike-container {\n  padding: 24px;\n  background-color: #f5f5f5;\n  min-height: 100vh;\n}\n.chartered-bike-container .header-card {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.chartered-bike-container .header-card .header-content {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.chartered-bike-container .header-card .header-content h1 {\n  margin: 0;\n  font-size: 24px;\n  font-weight: 600;\n  color: #333;\n}\n.chartered-bike-container .header-card .header-content .header-actions {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.chartered-bike-container .header-card .header-content .header-actions button {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.chartered-bike-container .header-card .header-content .header-actions button mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.chartered-bike-container .error-card {\n  margin-bottom: 16px;\n  background-color: #ffebee;\n  border-left: 4px solid #f44336;\n}\n.chartered-bike-container .error-card .error-content {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: #c62828;\n}\n.chartered-bike-container .error-card .error-content mat-icon {\n  color: #f44336;\n}\n.chartered-bike-container .error-card .error-content button {\n  margin-left: auto;\n}\n.chartered-bike-container .filters-card {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.chartered-bike-container .filters-card .filters-content {\n  display: flex;\n  gap: 16px;\n  align-items: flex-end;\n  flex-wrap: wrap;\n}\n.chartered-bike-container .filters-card .filters-content .search-field,\n.chartered-bike-container .filters-card .filters-content .filter-field {\n  flex: 1;\n  min-width: 200px;\n}\n.chartered-bike-container .filters-card .filters-content button {\n  height: 56px;\n}\n.chartered-bike-container .loading-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px 24px;\n  gap: 16px;\n}\n.chartered-bike-container .loading-container p {\n  font-size: 16px;\n  color: #666;\n}\n.chartered-bike-container .table-card {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.chartered-bike-container .table-card .table-container {\n  overflow-x: auto;\n}\n.chartered-bike-container .table-card .table-container .stations-table {\n  width: 100%;\n  border-collapse: collapse;\n}\n.chartered-bike-container .table-card .table-container .stations-table th {\n  background-color: #f5f5f5;\n  font-weight: 600;\n  color: #333;\n  padding: 16px;\n  text-align: left;\n  border-bottom: 2px solid #e0e0e0;\n}\n.chartered-bike-container .table-card .table-container .stations-table td {\n  padding: 16px;\n  border-bottom: 1px solid #e0e0e0;\n  vertical-align: middle;\n}\n.chartered-bike-container .table-card .table-container .stations-table td:last-child {\n  text-align: right;\n}\n.chartered-bike-container .table-card .table-container .stations-table tr:hover {\n  background-color: #fafafa;\n}\n.chartered-bike-container .table-card .table-container .stations-table .bikes-available {\n  font-weight: 600;\n  color: #1976d2;\n  font-size: 18px;\n}\n.chartered-bike-container .table-card .table-container .stations-table .text-muted {\n  color: #999;\n  font-size: 13px;\n}\n.chartered-bike-container .table-card .table-container .stations-table .percentage-bar {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  height: 30px;\n}\n.chartered-bike-container .table-card .table-container .stations-table .percentage-bar .percentage-fill {\n  height: 24px;\n  min-width: 60px;\n  border-radius: 4px;\n  transition: width 0.3s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: 600;\n  font-size: 12px;\n}\n.chartered-bike-container .table-card .table-container .stations-table .percentage-bar .percentage-fill.status-good {\n  background:\n    linear-gradient(\n      90deg,\n      #4caf50,\n      #66bb6a);\n}\n.chartered-bike-container .table-card .table-container .stations-table .percentage-bar .percentage-fill.status-warning {\n  background:\n    linear-gradient(\n      90deg,\n      #ff9800,\n      #ffb74d);\n}\n.chartered-bike-container .table-card .table-container .stations-table .percentage-bar .percentage-fill.status-critical {\n  background:\n    linear-gradient(\n      90deg,\n      #f44336,\n      #ef5350);\n}\n.chartered-bike-container .table-card .table-container .stations-table .percentage-bar .percentage-text {\n  font-weight: 600;\n  color: #333;\n  min-width: 45px;\n}\n.chartered-bike-container .table-card .table-container .stations-table .status-badge {\n  display: inline-block;\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-weight: 500;\n  font-size: 12px;\n  white-space: nowrap;\n}\n.chartered-bike-container .table-card .table-container .stations-table .status-badge.status-good {\n  background-color: #e8f5e9;\n  color: #2e7d32;\n}\n.chartered-bike-container .table-card .table-container .stations-table .status-badge.status-warning {\n  background-color: #fff3e0;\n  color: #e65100;\n}\n.chartered-bike-container .table-card .table-container .stations-table .status-badge.status-low {\n  background-color: #fff3e0;\n  color: #e65100;\n}\n.chartered-bike-container .table-card .table-container .stations-table .status-badge.status-critical {\n  background-color: #ffebee;\n  color: #c62828;\n}\n.chartered-bike-container .table-card .table-container .stations-table .action-btn {\n  color: #1976d2;\n}\n.chartered-bike-container .table-card .table-container .stations-table .action-btn:hover {\n  background-color: #e3f2fd;\n}\n.chartered-bike-container .empty-card {\n  text-align: center;\n  padding: 80px 24px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.chartered-bike-container .empty-card .empty-content .empty-icon {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #ccc;\n  margin: 0 auto 16px;\n}\n.chartered-bike-container .empty-card .empty-content h3 {\n  font-size: 20px;\n  color: #666;\n  margin: 0 0 8px;\n}\n.chartered-bike-container .empty-card .empty-content p {\n  color: #999;\n  margin: 0;\n}\n.chartered-bike-container .stats-card {\n  margin-top: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.chartered-bike-container .stats-card .stats-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 24px;\n  padding: 24px;\n}\n.chartered-bike-container .stats-card .stats-grid .stat-item {\n  text-align: center;\n}\n.chartered-bike-container .stats-card .stats-grid .stat-item .stat-label {\n  font-size: 12px;\n  color: #999;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 8px;\n}\n.chartered-bike-container .stats-card .stats-grid .stat-item .stat-value {\n  font-size: 32px;\n  font-weight: 700;\n  color: #1976d2;\n}\n@media (max-width: 768px) {\n  .chartered-bike-container {\n    padding: 16px;\n  }\n  .chartered-bike-container .header-card .header-content {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .chartered-bike-container .header-card .header-content h1 {\n    font-size: 20px;\n  }\n  .chartered-bike-container .header-card .header-content .header-actions {\n    width: 100%;\n  }\n  .chartered-bike-container .header-card .header-content .header-actions button {\n    flex: 1;\n    min-width: 120px;\n  }\n  .chartered-bike-container .filters-card .filters-content {\n    flex-direction: column;\n  }\n  .chartered-bike-container .filters-card .filters-content .search-field,\n  .chartered-bike-container .filters-card .filters-content .filter-field {\n    width: 100%;\n  }\n  .chartered-bike-container .filters-card .filters-content button {\n    width: 100%;\n  }\n  .chartered-bike-container .stats-card .stats-grid {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 16px;\n    padding: 16px;\n  }\n  .chartered-bike-container .stats-card .stats-grid .stat-value {\n    font-size: 24px;\n  }\n}\n/*# sourceMappingURL=chartered-bike-stations.component.css.map */\n"] }]
  }], () => [{ type: SmcService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CharteredBikeStationsComponent, { className: "CharteredBikeStationsComponent", filePath: "src/app/components/admin/chartered-bike-stations/chartered-bike-stations.component.ts", lineNumber: 42 });
})();
export {
  CharteredBikeStationsComponent
};
//# sourceMappingURL=chunk-P77BHOU7.js.map
