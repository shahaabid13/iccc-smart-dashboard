import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-GZFZG7RZ.js";
import {
  SmcService
} from "./chunk-C2E4MYPM.js";
import {
  MatTooltipModule
} from "./chunk-CDHLY53M.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-NUGY3VFH.js";
import {
  BaseChartDirective,
  NgChartsModule
} from "./chunk-FAVIO6DA.js";
import {
  MatNativeDateModule
} from "./chunk-I2GMTQVL.js";
import "./chunk-LDVFDARF.js";
import "./chunk-FHWKHDJD.js";
import {
  MatOptgroup,
  MatOption,
  MatSelect,
  MatSelectModule
} from "./chunk-GP53F2Q2.js";
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
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-LZCG3VZ3.js";
import {
  CommonModule,
  DecimalPipe,
  NgForOf,
  NgIf
} from "./chunk-6LIGNQX5.js";
import {
  Component,
  Subject,
  ViewChild,
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
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-OXNL7LB6.js";
import "./chunk-TXDUYLVM.js";

// src/app/components/admin/chartered-bike-stats/chartered-bike-stats.component.ts
var _c0 = ["lineChart"];
function CharteredBikeStatsComponent_mat_card_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 23)(1, "div", 24)(2, "mat-icon");
    \u0275\u0275text(3, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 25);
    \u0275\u0275listener("click", function CharteredBikeStatsComponent_mat_card_7_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.dismissError());
    });
    \u0275\u0275elementStart(7, "mat-icon");
    \u0275\u0275text(8, "close");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.error);
  }
}
function CharteredBikeStatsComponent_mat_option_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const station_r4 = ctx.$implicit;
    \u0275\u0275property("value", station_r4.stationName);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", station_r4.stationName, " ");
  }
}
function CharteredBikeStatsComponent_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275element(1, "mat-spinner", 28);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading statistics...");
    \u0275\u0275elementEnd()();
  }
}
function CharteredBikeStatsComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "mat-card", 30)(2, "div", 31)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 32);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 33)(8, "div", 34)(9, "div", 35)(10, "mat-icon");
    \u0275\u0275text(11, "trending_down");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 36)(13, "div", 37);
    \u0275\u0275text(14, "Minimum Bikes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 38);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 34)(18, "div", 39)(19, "mat-icon");
    \u0275\u0275text(20, "show_chart");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 36)(22, "div", 37);
    \u0275\u0275text(23, "Average Bikes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 38);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 34)(28, "div", 40)(29, "mat-icon");
    \u0275\u0275text(30, "trending_up");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 36)(32, "div", 37);
    \u0275\u0275text(33, "Maximum Bikes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 38);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "div", 34)(37, "div", 41)(38, "mat-icon");
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 36)(41, "div", 37);
    \u0275\u0275text(42, "Trend");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 38);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(45, "div", 34)(46, "div", 42)(47, "mat-icon");
    \u0275\u0275text(48, "storage");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 36)(50, "div", 37);
    \u0275\u0275text(51, "Avg Rack Available");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "div", 38);
    \u0275\u0275text(53);
    \u0275\u0275pipe(54, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(55, "div", 34)(56, "div", 43)(57, "mat-icon");
    \u0275\u0275text(58, "dataset");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "div", 36)(60, "div", 37);
    \u0275\u0275text(61, "Data Points");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "div", 38);
    \u0275\u0275text(63);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(64, "mat-card", 44)(65, "h3");
    \u0275\u0275text(66, "Availability Range");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "div", 45);
    \u0275\u0275element(68, "canvas", 46, 2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(70, "mat-card", 47)(71, "h3");
    \u0275\u0275text(72, "Bike Rack Statistics");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "div", 48)(74, "div", 49)(75, "div", 50);
    \u0275\u0275text(76, "Minimum");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "div", 51);
    \u0275\u0275text(78);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(79, "div", 49)(80, "div", 50);
    \u0275\u0275text(81, "Average");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "div", 51);
    \u0275\u0275text(83);
    \u0275\u0275pipe(84, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(85, "div", 49)(86, "div", 50);
    \u0275\u0275text(87, "Maximum");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "div", 51);
    \u0275\u0275text(89);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.selectedStats.stationName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r2.formatDate(ctx_r2.selectedStats.startDate), " to ", ctx_r2.formatDate(ctx_r2.selectedStats.endDate));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r2.selectedStats.minBikes);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(26, 17, ctx_r2.selectedStats.avgBikes, "1.0-0"));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r2.selectedStats.maxBikes);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.getTrendArrow(ctx_r2.selectedStats.trend));
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("color", ctx_r2.getTrendColor(ctx_r2.selectedStats.trend));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedStats.trend, " ");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(54, 20, ctx_r2.selectedStats.avgRackAvailable, "1.0-0"));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r2.selectedStats.dataPoints);
    \u0275\u0275advance(5);
    \u0275\u0275property("data", ctx_r2.lineChartData)("options", ctx_r2.lineChartOptions);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r2.selectedStats.minRackAvailable);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(84, 23, ctx_r2.selectedStats.avgRackAvailable, "1.0-0"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.selectedStats.maxRackAvailable);
  }
}
function CharteredBikeStatsComponent_mat_card_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 52)(1, "div", 53)(2, "mat-icon", 54);
    \u0275\u0275text(3, "bar_chart");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, "No Statistics Found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Select a station and date range to view statistics.");
    \u0275\u0275elementEnd()()();
  }
}
var CharteredBikeStatsComponent = class _CharteredBikeStatsComponent {
  smcService;
  fb;
  lineChart;
  statsForm;
  stationNames = [];
  statsData = [];
  selectedStats = null;
  loading = false;
  error = null;
  // Chart data
  lineChartData;
  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 15
        }
      },
      tooltip: {
        mode: "index",
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        ticks: { color: "#666" }
      },
      x: {
        grid: { display: false },
        ticks: { color: "#666" }
      }
    }
  };
  destroy$ = new Subject();
  constructor(smcService, fb) {
    this.smcService = smcService;
    this.fb = fb;
    this.initializeForm();
  }
  ngOnInit() {
    this.loadStationNames();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  initializeForm() {
    const today = /* @__PURE__ */ new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1e3);
    this.statsForm = this.fb.group({
      stationName: ["", Validators.required],
      startDate: [sevenDaysAgo, Validators.required],
      endDate: [today, Validators.required]
    });
  }
  loadStationNames() {
    this.loading = true;
    this.smcService.getCharteredBikeStationNames().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.stationNames = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading station names:", err);
        this.error = "Failed to load station names. Please try again.";
        this.loading = false;
      }
    });
  }
  loadStats() {
    if (!this.statsForm.valid) {
      this.error = "Please select a station and date range.";
      return;
    }
    this.loading = true;
    this.error = null;
    const { stationName, startDate, endDate } = this.statsForm.value;
    const startDateStr = this.formatDate(startDate);
    const endDateStr = this.formatDate(endDate);
    this.smcService.getCharteredBikeStationStats(stationName, startDateStr, endDateStr).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.statsData = data;
        if (data.length > 0) {
          this.selectedStats = data[0];
          this.updateCharts();
        }
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading stats:", err);
        this.error = "Failed to load statistics. Please try again.";
        this.loading = false;
      }
    });
  }
  onStatSelected(stat) {
    this.selectedStats = stat;
    this.updateCharts();
  }
  updateCharts() {
    if (!this.selectedStats)
      return;
    const stat = this.selectedStats;
    this.lineChartData = {
      labels: ["Min", "Avg", "Max"],
      datasets: [
        {
          label: "Bikes Available",
          data: [stat.minBikes, Math.round(stat.avgBikes), stat.maxBikes],
          borderColor: "#1976d2",
          backgroundColor: "rgba(25, 118, 210, 0.1)",
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 5,
          pointBackgroundColor: "#1976d2"
        }
      ]
    };
  }
  getTrendArrow(trend) {
    switch (trend) {
      case "UP":
        return "\u2191";
      case "DOWN":
        return "\u2193";
      case "STABLE":
        return "\u2192";
      default:
        return "\u2022";
    }
  }
  getTrendColor(trend) {
    switch (trend) {
      case "UP":
        return "#4caf50";
      case "DOWN":
        return "#f44336";
      case "STABLE":
        return "#ff9800";
      default:
        return "#999";
    }
  }
  formatDate(date) {
    if (!date)
      return "";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (!dateObj || Number.isNaN(dateObj.getTime())) {
      return "";
    }
    return dateObj.toISOString().split("T")[0];
  }
  dismissError() {
    this.error = null;
  }
  static \u0275fac = function CharteredBikeStatsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CharteredBikeStatsComponent)(\u0275\u0275directiveInject(SmcService), \u0275\u0275directiveInject(FormBuilder));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CharteredBikeStatsComponent, selectors: [["app-chartered-bike-stats"]], viewQuery: function CharteredBikeStatsComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.lineChart = _t.first);
    }
  }, decls: 39, vars: 11, consts: [["startPicker", ""], ["endPicker", ""], ["lineChart", ""], [1, "stats-container"], [1, "header-card"], [1, "header-content"], [1, "subtitle"], ["class", "error-card", 4, "ngIf"], [1, "filters-card"], [1, "filter-form", 3, "formGroup"], [1, "filter-row"], [1, "filter-field"], ["formControlName", "stationName"], ["label", "Select a Station"], [3, "value", 4, "ngFor", "ngForOf"], ["matInput", "", "formControlName", "startDate", 3, "matDatepicker"], ["matSuffix", "", 3, "for"], ["matInput", "", "formControlName", "endDate", 3, "matDatepicker"], [1, "button-row"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["class", "loading-container", 4, "ngIf"], ["class", "stats-display", 4, "ngIf"], ["class", "empty-card", 4, "ngIf"], [1, "error-card"], [1, "error-content"], ["mat-icon-button", "", 3, "click"], [3, "value"], [1, "loading-container"], ["diameter", "50"], [1, "stats-display"], [1, "main-stats-card"], [1, "stats-header"], [1, "period"], [1, "stats-grid"], [1, "stat-card"], [1, "stat-icon", "min"], [1, "stat-info"], [1, "stat-label"], [1, "stat-value"], [1, "stat-icon", "avg"], [1, "stat-icon", "max"], [1, "stat-icon", "trend"], [1, "stat-icon", "rack"], [1, "stat-icon", "data"], [1, "chart-card"], [1, "chart-container"], ["baseChart", "", "type", "line", 3, "data", "options"], [1, "rack-stats-card"], [1, "rack-stats"], [1, "rack-stat"], [1, "rack-label"], [1, "rack-value"], [1, "empty-card"], [1, "empty-content"], [1, "empty-icon"]], template: function CharteredBikeStatsComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 3)(1, "mat-card", 4)(2, "div", 5)(3, "h1");
      \u0275\u0275text(4, "Chartered Bike Statistics");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 6);
      \u0275\u0275text(6, "View min, max, and average bike availability statistics");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(7, CharteredBikeStatsComponent_mat_card_7_Template, 9, 1, "mat-card", 7);
      \u0275\u0275elementStart(8, "mat-card", 8)(9, "form", 9)(10, "div", 10)(11, "mat-form-field", 11)(12, "mat-label");
      \u0275\u0275text(13, "Station");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "mat-select", 12)(15, "mat-optgroup", 13);
      \u0275\u0275template(16, CharteredBikeStatsComponent_mat_option_16_Template, 2, 2, "mat-option", 14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(17, "mat-form-field", 11)(18, "mat-label");
      \u0275\u0275text(19, "Start Date");
      \u0275\u0275elementEnd();
      \u0275\u0275element(20, "input", 15)(21, "mat-datepicker-toggle", 16)(22, "mat-datepicker", null, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "mat-form-field", 11)(25, "mat-label");
      \u0275\u0275text(26, "End Date");
      \u0275\u0275elementEnd();
      \u0275\u0275element(27, "input", 17)(28, "mat-datepicker-toggle", 16)(29, "mat-datepicker", null, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "div", 18)(32, "button", 19);
      \u0275\u0275listener("click", function CharteredBikeStatsComponent_Template_button_click_32_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.loadStats());
      });
      \u0275\u0275elementStart(33, "mat-icon");
      \u0275\u0275text(34, "bar_chart");
      \u0275\u0275elementEnd();
      \u0275\u0275text(35, " Load Statistics ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(36, CharteredBikeStatsComponent_div_36_Template, 4, 0, "div", 20)(37, CharteredBikeStatsComponent_div_37_Template, 90, 26, "div", 21)(38, CharteredBikeStatsComponent_mat_card_38_Template, 8, 0, "mat-card", 22);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      const startPicker_r5 = \u0275\u0275reference(23);
      const endPicker_r6 = \u0275\u0275reference(30);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ctx.error);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.statsForm);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngForOf", ctx.stationNames);
      \u0275\u0275advance(4);
      \u0275\u0275property("matDatepicker", startPicker_r5);
      \u0275\u0275advance();
      \u0275\u0275property("for", startPicker_r5);
      \u0275\u0275advance(6);
      \u0275\u0275property("matDatepicker", endPicker_r6);
      \u0275\u0275advance();
      \u0275\u0275property("for", endPicker_r6);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.loading || ctx.statsForm.invalid);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.selectedStats);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && !ctx.selectedStats && ctx.statsData.length === 0);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    FormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    ReactiveFormsModule,
    FormGroupDirective,
    FormControlName,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatIconModule,
    MatIcon,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatOptgroup,
    MatCardModule,
    MatCard,
    MatTooltipModule,
    NgChartsModule,
    BaseChartDirective,
    DecimalPipe
  ], styles: ["\n\n.stats-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  background-color: #f5f5f5;\n  min-height: 100vh;\n}\n.stats-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.stats-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: 24px;\n  font-weight: 600;\n  color: #333;\n}\n.stats-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #666;\n  font-size: 14px;\n}\n.stats-container[_ngcontent-%COMP%]   .error-card[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  background-color: #ffebee;\n  border-left: 4px solid #f44336;\n}\n.stats-container[_ngcontent-%COMP%]   .error-card[_ngcontent-%COMP%]   .error-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: #c62828;\n}\n.stats-container[_ngcontent-%COMP%]   .error-card[_ngcontent-%COMP%]   .error-content[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.stats-container[_ngcontent-%COMP%]   .error-card[_ngcontent-%COMP%]   .error-content[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n.stats-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.stats-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filter-form[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.stats-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.stats-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.stats-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .button-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.stats-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .button-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.stats-container[_ngcontent-%COMP%]   .loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px 24px;\n  gap: 16px;\n}\n.stats-container[_ngcontent-%COMP%]   .loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #666;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%]   .stats-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  padding-bottom: 16px;\n  border-bottom: 2px solid #e0e0e0;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%]   .stats-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: 20px;\n  font-weight: 600;\n  color: #333;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%]   .stats-header[_ngcontent-%COMP%]   .period[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #999;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 16px;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px;\n  background-color: #f9f9f9;\n  border-radius: 8px;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  flex-shrink: 0;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-icon.min[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f44336,\n      #e91e63);\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-icon.avg[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #2196f3,\n      #1976d2);\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-icon.max[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4caf50,\n      #388e3c);\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-icon.trend[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ff9800,\n      #f57c00);\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-icon.rack[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #9c27b0,\n      #7b1fa2);\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-icon.data[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #00bcd4,\n      #0097a7);\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-info[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #999;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 4px;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-info[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 700;\n  color: #333;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .chart-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  padding: 24px;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .chart-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: #333;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .chart-card[_ngcontent-%COMP%]   .chart-container[_ngcontent-%COMP%] {\n  height: 300px;\n  position: relative;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .rack-stats-card[_ngcontent-%COMP%] {\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  padding: 24px;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .rack-stats-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: #333;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .rack-stats-card[_ngcontent-%COMP%]   .rack-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 16px;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .rack-stats-card[_ngcontent-%COMP%]   .rack-stats[_ngcontent-%COMP%]   .rack-stat[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 16px;\n  background-color: #f9f9f9;\n  border-radius: 8px;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .rack-stats-card[_ngcontent-%COMP%]   .rack-stats[_ngcontent-%COMP%]   .rack-stat[_ngcontent-%COMP%]   .rack-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #999;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 8px;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .rack-stats-card[_ngcontent-%COMP%]   .rack-stats[_ngcontent-%COMP%]   .rack-stat[_ngcontent-%COMP%]   .rack-value[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  color: #9c27b0;\n}\n.stats-container[_ngcontent-%COMP%]   .empty-card[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 24px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.stats-container[_ngcontent-%COMP%]   .empty-card[_ngcontent-%COMP%]   .empty-content[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #ccc;\n  margin: 0 auto 16px;\n}\n.stats-container[_ngcontent-%COMP%]   .empty-card[_ngcontent-%COMP%]   .empty-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #666;\n  margin: 0 0 8px;\n}\n.stats-container[_ngcontent-%COMP%]   .empty-card[_ngcontent-%COMP%]   .empty-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #999;\n  margin: 0;\n}\n@media (max-width: 768px) {\n  .stats-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .stats-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .stats-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .button-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n  .stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .stats-container[_ngcontent-%COMP%]   .stats-display[_ngcontent-%COMP%]   .main-stats-card[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n  }\n}\n/*# sourceMappingURL=chartered-bike-stats.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CharteredBikeStatsComponent, [{
    type: Component,
    args: [{ selector: "app-chartered-bike-stats", standalone: true, imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatSelectModule,
      MatCardModule,
      MatTooltipModule,
      NgChartsModule
    ], template: `<div class="stats-container">\r
  <mat-card class="header-card">\r
    <div class="header-content">\r
      <h1>Chartered Bike Statistics</h1>\r
      <p class="subtitle">View min, max, and average bike availability statistics</p>\r
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
    <form [formGroup]="statsForm" class="filter-form">\r
      <div class="filter-row">\r
        <mat-form-field class="filter-field">\r
          <mat-label>Station</mat-label>\r
          <mat-select formControlName="stationName">\r
            <mat-optgroup label="Select a Station">\r
              <mat-option *ngFor="let station of stationNames" [value]="station.stationName">\r
                {{ station.stationName }}\r
              </mat-option>\r
            </mat-optgroup>\r
          </mat-select>\r
        </mat-form-field>\r
\r
        <mat-form-field class="filter-field">\r
          <mat-label>Start Date</mat-label>\r
          <input matInput [matDatepicker]="startPicker" formControlName="startDate" />\r
          <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>\r
          <mat-datepicker #startPicker></mat-datepicker>\r
        </mat-form-field>\r
\r
        <mat-form-field class="filter-field">\r
          <mat-label>End Date</mat-label>\r
          <input matInput [matDatepicker]="endPicker" formControlName="endDate" />\r
          <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>\r
          <mat-datepicker #endPicker></mat-datepicker>\r
        </mat-form-field>\r
      </div>\r
\r
      <div class="button-row">\r
        <button\r
          mat-raised-button\r
          color="primary"\r
          (click)="loadStats()"\r
          [disabled]="loading || statsForm.invalid"\r
        >\r
          <mat-icon>bar_chart</mat-icon>\r
          Load Statistics\r
        </button>\r
      </div>\r
    </form>\r
  </mat-card>\r
\r
  <!-- Loading Spinner -->\r
  <div *ngIf="loading" class="loading-container">\r
    <mat-spinner diameter="50"></mat-spinner>\r
    <p>Loading statistics...</p>\r
  </div>\r
\r
  <!-- Stats Display -->\r
  <div *ngIf="!loading && selectedStats" class="stats-display">\r
    <!-- Main Stats Card -->\r
    <mat-card class="main-stats-card">\r
      <div class="stats-header">\r
        <h2>{{ selectedStats.stationName }}</h2>\r
        <span class="period">{{ formatDate(selectedStats.startDate) }} to {{ formatDate(selectedStats.endDate) }}</span>\r
      </div>\r
\r
      <div class="stats-grid">\r
        <div class="stat-card">\r
          <div class="stat-icon min">\r
            <mat-icon>trending_down</mat-icon>\r
          </div>\r
          <div class="stat-info">\r
            <div class="stat-label">Minimum Bikes</div>\r
            <div class="stat-value">{{ selectedStats.minBikes }}</div>\r
          </div>\r
        </div>\r
\r
        <div class="stat-card">\r
          <div class="stat-icon avg">\r
            <mat-icon>show_chart</mat-icon>\r
          </div>\r
          <div class="stat-info">\r
            <div class="stat-label">Average Bikes</div>\r
            <div class="stat-value">{{ selectedStats.avgBikes | number: '1.0-0' }}</div>\r
          </div>\r
        </div>\r
\r
        <div class="stat-card">\r
          <div class="stat-icon max">\r
            <mat-icon>trending_up</mat-icon>\r
          </div>\r
          <div class="stat-info">\r
            <div class="stat-label">Maximum Bikes</div>\r
            <div class="stat-value">{{ selectedStats.maxBikes }}</div>\r
          </div>\r
        </div>\r
\r
        <div class="stat-card">\r
          <div class="stat-icon trend">\r
            <mat-icon>{{ getTrendArrow(selectedStats.trend) }}</mat-icon>\r
          </div>\r
          <div class="stat-info">\r
            <div class="stat-label">Trend</div>\r
            <div class="stat-value" [style.color]="getTrendColor(selectedStats.trend)">\r
              {{ selectedStats.trend }}\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div class="stat-card">\r
          <div class="stat-icon rack">\r
            <mat-icon>storage</mat-icon>\r
          </div>\r
          <div class="stat-info">\r
            <div class="stat-label">Avg Rack Available</div>\r
            <div class="stat-value">{{ selectedStats.avgRackAvailable | number: '1.0-0' }}</div>\r
          </div>\r
        </div>\r
\r
        <div class="stat-card">\r
          <div class="stat-icon data">\r
            <mat-icon>dataset</mat-icon>\r
          </div>\r
          <div class="stat-info">\r
            <div class="stat-label">Data Points</div>\r
            <div class="stat-value">{{ selectedStats.dataPoints }}</div>\r
          </div>\r
        </div>\r
      </div>\r
    </mat-card>\r
\r
    <!-- Chart -->\r
    <mat-card class="chart-card">\r
      <h3>Availability Range</h3>\r
      <div class="chart-container">\r
        <canvas\r
          baseChart\r
          [data]="lineChartData"\r
          [options]="lineChartOptions"\r
          type="line"\r
          #lineChart\r
        ></canvas>\r
      </div>\r
    </mat-card>\r
\r
    <!-- Rack Statistics -->\r
    <mat-card class="rack-stats-card">\r
      <h3>Bike Rack Statistics</h3>\r
      <div class="rack-stats">\r
        <div class="rack-stat">\r
          <div class="rack-label">Minimum</div>\r
          <div class="rack-value">{{ selectedStats.minRackAvailable }}</div>\r
        </div>\r
        <div class="rack-stat">\r
          <div class="rack-label">Average</div>\r
          <div class="rack-value">{{ selectedStats.avgRackAvailable | number: '1.0-0' }}</div>\r
        </div>\r
        <div class="rack-stat">\r
          <div class="rack-label">Maximum</div>\r
          <div class="rack-value">{{ selectedStats.maxRackAvailable }}</div>\r
        </div>\r
      </div>\r
    </mat-card>\r
  </div>\r
\r
  <!-- Empty State -->\r
  <mat-card *ngIf="!loading && !selectedStats && statsData.length === 0" class="empty-card">\r
    <div class="empty-content">\r
      <mat-icon class="empty-icon">bar_chart</mat-icon>\r
      <h3>No Statistics Found</h3>\r
      <p>Select a station and date range to view statistics.</p>\r
    </div>\r
  </mat-card>\r
</div>\r
`, styles: ["/* src/app/components/admin/chartered-bike-stats/chartered-bike-stats.component.scss */\n.stats-container {\n  padding: 24px;\n  background-color: #f5f5f5;\n  min-height: 100vh;\n}\n.stats-container .header-card {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.stats-container .header-card .header-content h1 {\n  margin: 0 0 8px 0;\n  font-size: 24px;\n  font-weight: 600;\n  color: #333;\n}\n.stats-container .header-card .header-content .subtitle {\n  margin: 0;\n  color: #666;\n  font-size: 14px;\n}\n.stats-container .error-card {\n  margin-bottom: 16px;\n  background-color: #ffebee;\n  border-left: 4px solid #f44336;\n}\n.stats-container .error-card .error-content {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: #c62828;\n}\n.stats-container .error-card .error-content mat-icon {\n  color: #f44336;\n}\n.stats-container .error-card .error-content button {\n  margin-left: auto;\n}\n.stats-container .filters-card {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.stats-container .filters-card .filter-form {\n  padding: 16px;\n}\n.stats-container .filters-card .filter-row {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.stats-container .filters-card .filter-row .filter-field {\n  width: 100%;\n}\n.stats-container .filters-card .button-row {\n  display: flex;\n  gap: 12px;\n}\n.stats-container .filters-card .button-row button {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.stats-container .loading-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px 24px;\n  gap: 16px;\n}\n.stats-container .loading-container p {\n  font-size: 16px;\n  color: #666;\n}\n.stats-container .stats-display {\n  margin-top: 24px;\n}\n.stats-container .stats-display .main-stats-card {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.stats-container .stats-display .main-stats-card .stats-header {\n  margin-bottom: 24px;\n  padding-bottom: 16px;\n  border-bottom: 2px solid #e0e0e0;\n}\n.stats-container .stats-display .main-stats-card .stats-header h2 {\n  margin: 0 0 8px 0;\n  font-size: 20px;\n  font-weight: 600;\n  color: #333;\n}\n.stats-container .stats-display .main-stats-card .stats-header .period {\n  font-size: 12px;\n  color: #999;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.stats-container .stats-display .main-stats-card .stats-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 16px;\n}\n.stats-container .stats-display .main-stats-card .stats-grid .stat-card {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px;\n  background-color: #f9f9f9;\n  border-radius: 8px;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.stats-container .stats-display .main-stats-card .stats-grid .stat-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n}\n.stats-container .stats-display .main-stats-card .stats-grid .stat-card .stat-icon {\n  width: 50px;\n  height: 50px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  flex-shrink: 0;\n}\n.stats-container .stats-display .main-stats-card .stats-grid .stat-card .stat-icon mat-icon {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.stats-container .stats-display .main-stats-card .stats-grid .stat-card .stat-icon.min {\n  background:\n    linear-gradient(\n      135deg,\n      #f44336,\n      #e91e63);\n}\n.stats-container .stats-display .main-stats-card .stats-grid .stat-card .stat-icon.avg {\n  background:\n    linear-gradient(\n      135deg,\n      #2196f3,\n      #1976d2);\n}\n.stats-container .stats-display .main-stats-card .stats-grid .stat-card .stat-icon.max {\n  background:\n    linear-gradient(\n      135deg,\n      #4caf50,\n      #388e3c);\n}\n.stats-container .stats-display .main-stats-card .stats-grid .stat-card .stat-icon.trend {\n  background:\n    linear-gradient(\n      135deg,\n      #ff9800,\n      #f57c00);\n}\n.stats-container .stats-display .main-stats-card .stats-grid .stat-card .stat-icon.rack {\n  background:\n    linear-gradient(\n      135deg,\n      #9c27b0,\n      #7b1fa2);\n}\n.stats-container .stats-display .main-stats-card .stats-grid .stat-card .stat-icon.data {\n  background:\n    linear-gradient(\n      135deg,\n      #00bcd4,\n      #0097a7);\n}\n.stats-container .stats-display .main-stats-card .stats-grid .stat-card .stat-info {\n  flex: 1;\n}\n.stats-container .stats-display .main-stats-card .stats-grid .stat-card .stat-info .stat-label {\n  font-size: 12px;\n  color: #999;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 4px;\n}\n.stats-container .stats-display .main-stats-card .stats-grid .stat-card .stat-info .stat-value {\n  font-size: 24px;\n  font-weight: 700;\n  color: #333;\n}\n.stats-container .stats-display .chart-card {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  padding: 24px;\n}\n.stats-container .stats-display .chart-card h3 {\n  margin: 0 0 16px 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: #333;\n}\n.stats-container .stats-display .chart-card .chart-container {\n  height: 300px;\n  position: relative;\n}\n.stats-container .stats-display .rack-stats-card {\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  padding: 24px;\n}\n.stats-container .stats-display .rack-stats-card h3 {\n  margin: 0 0 16px 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: #333;\n}\n.stats-container .stats-display .rack-stats-card .rack-stats {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 16px;\n}\n.stats-container .stats-display .rack-stats-card .rack-stats .rack-stat {\n  text-align: center;\n  padding: 16px;\n  background-color: #f9f9f9;\n  border-radius: 8px;\n}\n.stats-container .stats-display .rack-stats-card .rack-stats .rack-stat .rack-label {\n  font-size: 12px;\n  color: #999;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 8px;\n}\n.stats-container .stats-display .rack-stats-card .rack-stats .rack-stat .rack-value {\n  font-size: 28px;\n  font-weight: 700;\n  color: #9c27b0;\n}\n.stats-container .empty-card {\n  text-align: center;\n  padding: 80px 24px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.stats-container .empty-card .empty-content .empty-icon {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #ccc;\n  margin: 0 auto 16px;\n}\n.stats-container .empty-card .empty-content h3 {\n  font-size: 20px;\n  color: #666;\n  margin: 0 0 8px;\n}\n.stats-container .empty-card .empty-content p {\n  color: #999;\n  margin: 0;\n}\n@media (max-width: 768px) {\n  .stats-container {\n    padding: 16px;\n  }\n  .stats-container .filters-card .filter-row {\n    grid-template-columns: 1fr;\n  }\n  .stats-container .filters-card .button-row button {\n    flex: 1;\n  }\n  .stats-container .stats-display .main-stats-card .stats-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .stats-container .stats-display .main-stats-card .stats-grid .stat-card {\n    flex-direction: column;\n    text-align: center;\n  }\n}\n/*# sourceMappingURL=chartered-bike-stats.component.css.map */\n"] }]
  }], () => [{ type: SmcService }, { type: FormBuilder }], { lineChart: [{
    type: ViewChild,
    args: ["lineChart"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CharteredBikeStatsComponent, { className: "CharteredBikeStatsComponent", filePath: "src/app/components/admin/chartered-bike-stats/chartered-bike-stats.component.ts", lineNumber: 42 });
})();
export {
  CharteredBikeStatsComponent
};
//# sourceMappingURL=chunk-L5CF3UJ5.js.map
