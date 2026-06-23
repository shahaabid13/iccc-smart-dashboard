import {
  CharteredBikeService
} from "./chunk-UV3ND3FX.js";
import {
  E
} from "./chunk-J7PLA52L.js";
import "./chunk-7YWLATDR.js";
import {
  BaseChartDirective,
  NgChartsModule
} from "./chunk-FAVIO6DA.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-LZCG3VZ3.js";
import {
  CommonModule,
  NgForOf
} from "./chunk-6LIGNQX5.js";
import {
  Component,
  ViewChild,
  setClassMetadata,
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
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-OXNL7LB6.js";
import {
  require_html2canvas
} from "./chunk-BOCD53Q6.js";
import {
  __async,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-TXDUYLVM.js";

// src/app/components/admin/pbs-analytics/pbs-analytics.component.ts
var import_html2canvas = __toESM(require_html2canvas());
var _c0 = ["reportSection"];
function PbsAnalyticsComponent_li_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275element(1, "span", 46);
    \u0275\u0275elementStart(2, "span", 47);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 48);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", item_r2.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.count);
  }
}
function PbsAnalyticsComponent_li_114_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const station_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(station_r3.stationName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", station_r3.availabilityPercentage, "%");
  }
}
var PbsAnalyticsComponent = class _PbsAnalyticsComponent {
  service;
  stations = [];
  statusSummary = [];
  atRiskStations = [];
  selectedPeriod = "all";
  fromDate = "";
  toDate = "";
  reportSection;
  pieChartData;
  doughnutChartData;
  barChartData;
  pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 12, usePointStyle: true, padding: 16 }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label ?? "";
            const value = context.raw;
            return `${label}: ${value} stations`;
          }
        }
      }
    }
  };
  doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom", labels: { boxWidth: 12, usePointStyle: true } },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label ?? "";
            const value = context.raw;
            return `${label}: ${value} bikes`;
          }
        }
      }
    }
  };
  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y ?? context.parsed}`
        }
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#6b7280" } },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(15, 108, 255, 0.12)" },
        ticks: { color: "#6b7280" }
      }
    }
  };
  constructor(service) {
    this.service = service;
  }
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.service.getStations().subscribe((res) => {
      const company = res.data?.[0];
      this.stations = (company?.mapStationDTOs || []).map((s) => this.enrichStation(s));
      this.prepareCharts();
    });
  }
  enrichStation(station) {
    const total = station.bikesTotal || 0;
    const available = station.bikesAvailable || 0;
    const percentage = total ? Math.round(available / total * 100) : 0;
    let statusLabel = "Available";
    if (percentage === 0)
      statusLabel = "Empty";
    else if (percentage < 25)
      statusLabel = "Low Stock";
    else if (percentage < 75)
      statusLabel = "Moderate";
    return __spreadProps(__spreadValues({}, station), { availabilityPercentage: percentage, statusLabel });
  }
  // ================= CHART DATA =================
  prepareCharts() {
    const statusCounts = {
      Available: 0,
      Moderate: 0,
      "Low Stock": 0,
      Empty: 0
    };
    this.stations.forEach((s) => {
      const label = s.statusLabel ?? "Available";
      statusCounts[label] = (statusCounts[label] ?? 0) + 1;
    });
    this.statusSummary = [
      { label: "Available", count: statusCounts["Available"], color: "#4CAF50" },
      { label: "Moderate", count: statusCounts["Moderate"], color: "#FFC107" },
      { label: "Low Stock", count: statusCounts["Low Stock"], color: "#FF9800" },
      { label: "Empty", count: statusCounts["Empty"], color: "#F44336" }
    ];
    this.atRiskStations = [...this.stations].filter((s) => s.statusLabel === "Low Stock" || s.statusLabel === "Empty").sort((a, b) => (a.availabilityPercentage || 0) - (b.availabilityPercentage || 0)).slice(0, 5);
    this.pieChartData = {
      labels: this.statusSummary.map((item) => item.label),
      datasets: [
        {
          data: this.statusSummary.map((item) => item.count),
          backgroundColor: this.statusSummary.map((item) => item.color),
          hoverOffset: 8
        }
      ]
    };
    const total = this.getTotalFleet();
    const available = this.getTotalAvailable();
    this.doughnutChartData = {
      labels: ["Available", "In Use"],
      datasets: [
        {
          data: [available, Math.max(total - available, 0)],
          backgroundColor: ["#0f6cff", "#e5e7eb"],
          hoverOffset: 8
        }
      ]
    };
    const topStations = [...this.stations].sort((a, b) => b.bikesAvailable - a.bikesAvailable).slice(0, 5);
    this.barChartData = {
      labels: topStations.map((s) => s.stationName),
      datasets: [
        {
          label: "Available Bikes",
          data: topStations.map((s) => s.bikesAvailable),
          backgroundColor: "#0f6cff"
        }
      ]
    };
  }
  // ================= KPI =================
  getTotalFleet() {
    return this.stations.reduce((s, x) => s + (x.bikesTotal || 0), 0);
  }
  getTotalAvailable() {
    return this.stations.reduce((s, x) => s + (x.bikesAvailable || 0), 0);
  }
  getTotalStations() {
    return this.stations.length;
  }
  getAverageAvailability() {
    if (!this.stations.length) {
      return 0;
    }
    const totalPercentage = this.stations.reduce((sum, station) => sum + (station.availabilityPercentage || 0), 0);
    return Math.round(totalPercentage / this.stations.length);
  }
  getCriticalStationCount() {
    return this.stations.filter((station) => station.statusLabel === "Low Stock" || station.statusLabel === "Empty").length;
  }
  getUtilization() {
    const total = this.getTotalFleet();
    return total ? Math.round(this.getTotalAvailable() / total * 100) : 0;
  }
  getStatusCount(status) {
    return this.statusSummary.find((item) => item.label === status)?.count ?? 0;
  }
  onPeriodChange() {
    if (this.selectedPeriod !== "custom") {
      this.fromDate = "";
      this.toDate = "";
    }
  }
  onCustomDateChange() {
    if (this.fromDate || this.toDate) {
      this.selectedPeriod = "custom";
    }
  }
  applyFilters() {
    if (this.selectedPeriod === "custom" && this.fromDate && this.toDate && this.fromDate > this.toDate) {
      const temp = this.fromDate;
      this.fromDate = this.toDate;
      this.toDate = temp;
    }
    this.prepareCharts();
  }
  resetFilters() {
    this.selectedPeriod = "all";
    this.fromDate = "";
    this.toDate = "";
  }
  getDateRangeLabel() {
    if (this.selectedPeriod === "today") {
      return "Today";
    }
    if (this.selectedPeriod === "week") {
      return "This Week";
    }
    if (this.selectedPeriod === "month") {
      return "This Month";
    }
    if (this.selectedPeriod === "custom") {
      if (this.fromDate && this.toDate) {
        return `${this.fromDate} \u2192 ${this.toDate}`;
      }
      if (this.fromDate) {
        return `From ${this.fromDate}`;
      }
      if (this.toDate) {
        return `Until ${this.toDate}`;
      }
      return "Custom Range";
    }
    return "All Dates";
  }
  // ================= PDF =================
  downloadReport() {
    return __async(this, null, function* () {
      const element = this.reportSection.nativeElement;
      const canvas = yield (0, import_html2canvas.default)(element);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new E("p", "mm", "a4");
      const width = 210;
      const height = canvas.height * width / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 10, width, height);
      const safeLabel = this.getDateRangeLabel().replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_-]/g, "");
      pdf.save(`pbs-report-${safeLabel}-${(/* @__PURE__ */ new Date()).toISOString()}.pdf`);
    });
  }
  static \u0275fac = function PbsAnalyticsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PbsAnalyticsComponent)(\u0275\u0275directiveInject(CharteredBikeService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PbsAnalyticsComponent, selectors: [["app-pbs-analytics"]], viewQuery: function PbsAnalyticsComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.reportSection = _t.first);
    }
  }, decls: 115, vars: 20, consts: [["reportSection", ""], [1, "analytics-dashboard"], [1, "dashboard-header"], [1, "download-report", 3, "click"], [1, "filters-toolbar"], [1, "filters-row"], [1, "filter-item"], ["for", "periodSelect"], ["id", "periodSelect", 3, "ngModelChange", "change", "ngModel"], ["value", "today"], ["value", "week"], ["value", "month"], ["value", "all"], ["value", "custom"], ["for", "fromDate"], ["id", "fromDate", "type", "date", 3, "ngModelChange", "change", "ngModel"], ["for", "toDate"], ["id", "toDate", "type", "date", 3, "ngModelChange", "change", "ngModel"], [1, "filter-actions"], [1, "apply-btn", 3, "click"], [1, "reset-btn", 3, "click"], [1, "report-info"], [1, "kpi-row"], [1, "kpi-card"], [1, "kpi-title"], [1, "kpi-value"], [1, "kpi-note"], [1, "content-grid"], [1, "panel-left"], [1, "chart-card"], [1, "chart-card-header"], [1, "badge"], [1, "chart-body"], [1, "pie-chart-wrap"], ["baseChart", "", "chartType", "pie", 3, "data", "options"], [1, "status-list"], [4, "ngFor", "ngForOf"], [1, "badge", "badge-soft"], ["baseChart", "", "chartType", "doughnut", 3, "data", "options"], [1, "panel-right"], ["baseChart", "", "chartType", "bar", 3, "data", "options"], [1, "insights-card"], [1, "insight-row"], [1, "insight-label"], [1, "top-list"], [1, "top-list-title"], [1, "legend-dot"], [1, "status-name"], [1, "status-count"]], template: function PbsAnalyticsComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1, 0)(2, "div", 2)(3, "div")(4, "h2");
      \u0275\u0275text(5, "PBS Analytics Dashboard");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p");
      \u0275\u0275text(7, "Fleet health, station utilization, and capacity insights for smarter decisions.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "button", 3);
      \u0275\u0275listener("click", function PbsAnalyticsComponent_Template_button_click_8_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.downloadReport());
      });
      \u0275\u0275text(9, "Download Report");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 4)(11, "div", 5)(12, "div", 6)(13, "label", 7);
      \u0275\u0275text(14, "Time Period");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "select", 8);
      \u0275\u0275twoWayListener("ngModelChange", function PbsAnalyticsComponent_Template_select_ngModelChange_15_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.selectedPeriod, $event) || (ctx.selectedPeriod = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function PbsAnalyticsComponent_Template_select_change_15_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPeriodChange());
      });
      \u0275\u0275elementStart(16, "option", 9);
      \u0275\u0275text(17, "Today");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "option", 10);
      \u0275\u0275text(19, "This Week");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "option", 11);
      \u0275\u0275text(21, "This Month");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "option", 12);
      \u0275\u0275text(23, "All Dates");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "option", 13);
      \u0275\u0275text(25, "Custom Range");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "div", 6)(27, "label", 14);
      \u0275\u0275text(28, "From Date");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "input", 15);
      \u0275\u0275twoWayListener("ngModelChange", function PbsAnalyticsComponent_Template_input_ngModelChange_29_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.fromDate, $event) || (ctx.fromDate = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function PbsAnalyticsComponent_Template_input_change_29_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onCustomDateChange());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 6)(31, "label", 16);
      \u0275\u0275text(32, "To Date");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "input", 17);
      \u0275\u0275twoWayListener("ngModelChange", function PbsAnalyticsComponent_Template_input_ngModelChange_33_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.toDate, $event) || (ctx.toDate = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function PbsAnalyticsComponent_Template_input_change_33_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onCustomDateChange());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "div", 18)(35, "button", 19);
      \u0275\u0275listener("click", function PbsAnalyticsComponent_Template_button_click_35_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilters());
      });
      \u0275\u0275text(36, "Apply Filters");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "button", 20);
      \u0275\u0275listener("click", function PbsAnalyticsComponent_Template_button_click_37_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.resetFilters());
      });
      \u0275\u0275text(38, "Reset");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(39, "div", 21)(40, "span");
      \u0275\u0275text(41, "Reporting Range: ");
      \u0275\u0275elementStart(42, "strong");
      \u0275\u0275text(43);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(44, "div", 22)(45, "div", 23)(46, "div", 24);
      \u0275\u0275text(47, "Total Fleet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "div", 25);
      \u0275\u0275text(49);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "div", 26);
      \u0275\u0275text(51);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(52, "div", 23)(53, "div", 24);
      \u0275\u0275text(54, "Available Bikes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "div", 25);
      \u0275\u0275text(56);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "div", 26);
      \u0275\u0275text(58);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(59, "div", 23)(60, "div", 24);
      \u0275\u0275text(61, "Avg. Availability");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "div", 25);
      \u0275\u0275text(63);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "div", 26);
      \u0275\u0275text(65);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(66, "div", 27)(67, "div", 28)(68, "div", 29)(69, "div", 30)(70, "h3");
      \u0275\u0275text(71, "Status Breakdown");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "span", 31);
      \u0275\u0275text(73, "Real time");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(74, "div", 32)(75, "div", 33);
      \u0275\u0275element(76, "canvas", 34);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(77, "ul", 35);
      \u0275\u0275template(78, PbsAnalyticsComponent_li_78_Template, 6, 4, "li", 36);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(79, "div", 29)(80, "div", 30)(81, "h3");
      \u0275\u0275text(82, "Fleet Availability");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(83, "span", 37);
      \u0275\u0275text(84, "Available / In Use");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(85, "div", 32);
      \u0275\u0275element(86, "canvas", 38);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(87, "div", 39)(88, "div", 29)(89, "div", 30)(90, "h3");
      \u0275\u0275text(91, "Top 5 Stations");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(92, "span", 37);
      \u0275\u0275text(93, "Available bikes");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(94, "div", 32);
      \u0275\u0275element(95, "canvas", 40);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(96, "div", 41)(97, "h3");
      \u0275\u0275text(98, "Station health");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(99, "div", 42)(100, "div")(101, "span", 43);
      \u0275\u0275text(102, "Low stock");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(103, "strong");
      \u0275\u0275text(104);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(105, "div")(106, "span", 43);
      \u0275\u0275text(107, "Empty stations");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(108, "strong");
      \u0275\u0275text(109);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(110, "div", 44)(111, "div", 45);
      \u0275\u0275text(112, "At-risk stations");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(113, "ul");
      \u0275\u0275template(114, PbsAnalyticsComponent_li_114_Template, 5, 2, "li", 36);
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(15);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedPeriod);
      \u0275\u0275advance(14);
      \u0275\u0275twoWayProperty("ngModel", ctx.fromDate);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.toDate);
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate(ctx.getDateRangeLabel());
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.getTotalFleet());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.getTotalStations(), " stations");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.getTotalAvailable());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.getUtilization(), "% utilization");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("", ctx.getAverageAvailability(), "%");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.getCriticalStationCount(), " stations need attention");
      \u0275\u0275advance(11);
      \u0275\u0275property("data", ctx.pieChartData)("options", ctx.pieChartOptions);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.statusSummary);
      \u0275\u0275advance(8);
      \u0275\u0275property("data", ctx.doughnutChartData)("options", ctx.doughnutChartOptions);
      \u0275\u0275advance(9);
      \u0275\u0275property("data", ctx.barChartData)("options", ctx.barChartOptions);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.getStatusCount("Low Stock"));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.getStatusCount("Empty"));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngForOf", ctx.atRiskStations);
    }
  }, dependencies: [CommonModule, NgForOf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, NgChartsModule, BaseChartDirective], styles: ["\n\n.analytics-dashboard[_ngcontent-%COMP%] {\n  padding: 1.75rem;\n  background:\n    linear-gradient(\n      180deg,\n      #f7f9ff 0%,\n      #eef2ff 100%);\n  border-radius: 24px;\n}\n.dashboard-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1.5rem;\n  align-items: center;\n  margin-bottom: 1.5rem;\n}\n.dashboard-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.8rem;\n  color: #111827;\n}\n.dashboard-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0;\n  color: #6b7280;\n  font-size: 0.95rem;\n}\n.filters-toolbar[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  border-radius: 20px;\n  padding: 1rem 1.2rem;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 16px 35px rgba(15, 23, 42, 0.04);\n}\n.filters-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 1rem;\n  align-items: end;\n}\n.filter-item[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.5rem;\n}\n.filter-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #475569;\n}\n.filter-item[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.filter-item[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 42px;\n  border: 1px solid #d1d5db;\n  border-radius: 12px;\n  padding: 0 0.9rem;\n  color: #111827;\n  background: white;\n}\n.filter-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  justify-content: flex-end;\n  align-items: center;\n}\n.apply-btn[_ngcontent-%COMP%], \n.reset-btn[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  padding: 0.9rem 1.2rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.apply-btn[_ngcontent-%COMP%] {\n  background: #0f6cff;\n  color: white;\n}\n.reset-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #0f6cff;\n  border: 1px solid rgba(15, 108, 255, 0.16);\n}\n.report-info[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  display: flex;\n  justify-content: flex-end;\n  color: #475569;\n  font-size: 0.95rem;\n}\n.report-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #111827;\n}\n.download-report[_ngcontent-%COMP%] {\n  background: #0f6cff;\n  color: white;\n  border: none;\n  border-radius: 999px;\n  padding: 0.9rem 1.45rem;\n  font-weight: 600;\n  cursor: pointer;\n  box-shadow: 0 12px 30px rgba(15, 108, 255, 0.18);\n}\n.kpi-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n.kpi-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 1.25rem 1.35rem;\n  border-radius: 18px;\n  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.05);\n  border: 1px solid rgba(15, 23, 42, 0.05);\n}\n.kpi-title[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.92rem;\n  color: #6b7280;\n  margin-bottom: 0.75rem;\n}\n.kpi-value[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #111827;\n}\n.kpi-note[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.5rem;\n  color: #6b7280;\n  font-size: 0.92rem;\n}\n.content-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: 1.45fr 1fr;\n}\n.panel-left[_ngcontent-%COMP%], \n.panel-right[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n}\n.chart-card[_ngcontent-%COMP%], \n.insights-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 1.25rem;\n  border-radius: 20px;\n  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.06);\n  border: 1px solid rgba(15, 23, 42, 0.06);\n}\n.chart-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.chart-card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.insights-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  color: #111827;\n}\n.badge[_ngcontent-%COMP%] {\n  background: rgba(15, 108, 255, 0.12);\n  color: #0f6cff;\n  font-size: 0.78rem;\n  font-weight: 700;\n  padding: 0.45rem 0.8rem;\n  border-radius: 999px;\n}\n.badge-soft[_ngcontent-%COMP%] {\n  background: rgba(17, 24, 39, 0.06);\n  color: #374151;\n}\n.chart-body[_ngcontent-%COMP%] {\n  min-height: 280px;\n  position: relative;\n}\n.pie-chart-wrap[_ngcontent-%COMP%] {\n  height: 260px;\n  width: 100%;\n}\n.chart-body[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%] {\n  width: 100% !important;\n  height: 100% !important;\n}\n.status-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n  margin-top: 1.4rem;\n  padding: 0;\n  list-style: none;\n}\n.status-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 0.95rem;\n  border-radius: 14px;\n  background: #f8fafc;\n  color: #111827;\n}\n.legend-dot[_ngcontent-%COMP%] {\n  width: 0.85rem;\n  height: 0.85rem;\n  border-radius: 50%;\n  display: inline-block;\n}\n.status-name[_ngcontent-%COMP%] {\n  font-size: 0.96rem;\n  color: #111827;\n}\n.status-count[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #111827;\n}\n.insights-card[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n}\n.insight-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.insight-row[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border-radius: 16px;\n  padding: 1rem;\n}\n.insight-label[_ngcontent-%COMP%] {\n  display: block;\n  color: #6b7280;\n  margin-bottom: 0.35rem;\n}\n.top-list[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border-radius: 16px;\n  padding: 1rem;\n}\n.top-list-title[_ngcontent-%COMP%] {\n  color: #374151;\n  font-size: 0.95rem;\n  margin-bottom: 0.75rem;\n}\n.top-list[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: grid;\n  gap: 0.7rem;\n}\n.top-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  color: #111827;\n  font-size: 0.95rem;\n}\n.top-list[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #0f6cff;\n}\n@media (max-width: 1100px) {\n  .content-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 750px) {\n  .dashboard-header[_ngcontent-%COMP%], \n   .kpi-row[_ngcontent-%COMP%], \n   .insight-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .dashboard-header[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n  .kpi-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .download-report[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=pbs-analytics.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PbsAnalyticsComponent, [{
    type: Component,
    args: [{ selector: "app-pbs-analytics", standalone: true, imports: [CommonModule, FormsModule, NgChartsModule], template: `<div class="analytics-dashboard" #reportSection>\r
  <div class="dashboard-header">\r
    <div>\r
      <h2>PBS Analytics Dashboard</h2>\r
      <p>Fleet health, station utilization, and capacity insights for smarter decisions.</p>\r
    </div>\r
    <button class="download-report" (click)="downloadReport()">Download Report</button>\r
  </div>\r
\r
  <div class="filters-toolbar">\r
    <div class="filters-row">\r
      <div class="filter-item">\r
        <label for="periodSelect">Time Period</label>\r
        <select id="periodSelect" [(ngModel)]="selectedPeriod" (change)="onPeriodChange()">\r
          <option value="today">Today</option>\r
          <option value="week">This Week</option>\r
          <option value="month">This Month</option>\r
          <option value="all">All Dates</option>\r
          <option value="custom">Custom Range</option>\r
        </select>\r
      </div>\r
\r
      <div class="filter-item">\r
        <label for="fromDate">From Date</label>\r
        <input id="fromDate" type="date" [(ngModel)]="fromDate" (change)="onCustomDateChange()" />\r
      </div>\r
\r
      <div class="filter-item">\r
        <label for="toDate">To Date</label>\r
        <input id="toDate" type="date" [(ngModel)]="toDate" (change)="onCustomDateChange()" />\r
      </div>\r
\r
      <div class="filter-actions">\r
        <button class="apply-btn" (click)="applyFilters()">Apply Filters</button>\r
        <button class="reset-btn" (click)="resetFilters()">Reset</button>\r
      </div>\r
    </div>\r
\r
    <div class="report-info">\r
      <span>Reporting Range: <strong>{{ getDateRangeLabel() }}</strong></span>\r
    </div>\r
  </div>\r
\r
  <div class="kpi-row">\r
    <div class="kpi-card">\r
      <div class="kpi-title">Total Fleet</div>\r
      <div class="kpi-value">{{ getTotalFleet() }}</div>\r
      <div class="kpi-note">{{ getTotalStations() }} stations</div>\r
    </div>\r
\r
    <div class="kpi-card">\r
      <div class="kpi-title">Available Bikes</div>\r
      <div class="kpi-value">{{ getTotalAvailable() }}</div>\r
      <div class="kpi-note">{{ getUtilization() }}% utilization</div>\r
    </div>\r
\r
    <div class="kpi-card">\r
      <div class="kpi-title">Avg. Availability</div>\r
      <div class="kpi-value">{{ getAverageAvailability() }}%</div>\r
      <div class="kpi-note">{{ getCriticalStationCount() }} stations need attention</div>\r
    </div>\r
  </div>\r
\r
  <div class="content-grid">\r
    <div class="panel-left">\r
      <div class="chart-card">\r
        <div class="chart-card-header">\r
          <h3>Status Breakdown</h3>\r
          <span class="badge">Real time</span>\r
        </div>\r
        <div class="chart-body">\r
          <div class="pie-chart-wrap">\r
            <canvas baseChart [data]="pieChartData" chartType="pie" [options]="pieChartOptions"></canvas>\r
          </div>\r
          <ul class="status-list">\r
            <li *ngFor="let item of statusSummary">\r
              <span class="legend-dot" [style.background]="item.color"></span>\r
              <span class="status-name">{{ item.label }}</span>\r
              <span class="status-count">{{ item.count }}</span>\r
            </li>\r
          </ul>\r
        </div>\r
      </div>\r
\r
      <div class="chart-card">\r
        <div class="chart-card-header">\r
          <h3>Fleet Availability</h3>\r
          <span class="badge badge-soft">Available / In Use</span>\r
        </div>\r
        <div class="chart-body">\r
          <canvas baseChart [data]="doughnutChartData" chartType="doughnut" [options]="doughnutChartOptions"></canvas>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="panel-right">\r
      <div class="chart-card">\r
        <div class="chart-card-header">\r
          <h3>Top 5 Stations</h3>\r
          <span class="badge badge-soft">Available bikes</span>\r
        </div>\r
        <div class="chart-body">\r
          <canvas baseChart [data]="barChartData" chartType="bar" [options]="barChartOptions"></canvas>\r
        </div>\r
      </div>\r
\r
      <div class="insights-card">\r
        <h3>Station health</h3>\r
        <div class="insight-row">\r
          <div>\r
            <span class="insight-label">Low stock</span>\r
            <strong>{{ getStatusCount('Low Stock') }}</strong>\r
          </div>\r
          <div>\r
            <span class="insight-label">Empty stations</span>\r
            <strong>{{ getStatusCount('Empty') }}</strong>\r
          </div>\r
        </div>\r
        <div class="top-list">\r
          <div class="top-list-title">At-risk stations</div>\r
          <ul>\r
            <li *ngFor="let station of atRiskStations">\r
              <span>{{ station.stationName }}</span>\r
              <strong>{{ station.availabilityPercentage }}%</strong>\r
            </li>\r
          </ul>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>`, styles: ["/* src/app/components/admin/pbs-analytics/pbs-analytics.component.scss */\n.analytics-dashboard {\n  padding: 1.75rem;\n  background:\n    linear-gradient(\n      180deg,\n      #f7f9ff 0%,\n      #eef2ff 100%);\n  border-radius: 24px;\n}\n.dashboard-header {\n  display: flex;\n  justify-content: space-between;\n  gap: 1.5rem;\n  align-items: center;\n  margin-bottom: 1.5rem;\n}\n.dashboard-header h2 {\n  margin: 0;\n  font-size: 1.8rem;\n  color: #111827;\n}\n.dashboard-header p {\n  margin: 0.25rem 0 0;\n  color: #6b7280;\n  font-size: 0.95rem;\n}\n.filters-toolbar {\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  border-radius: 20px;\n  padding: 1rem 1.2rem;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 16px 35px rgba(15, 23, 42, 0.04);\n}\n.filters-row {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 1rem;\n  align-items: end;\n}\n.filter-item {\n  display: grid;\n  gap: 0.5rem;\n}\n.filter-item label {\n  font-size: 0.85rem;\n  color: #475569;\n}\n.filter-item select,\n.filter-item input {\n  width: 100%;\n  height: 42px;\n  border: 1px solid #d1d5db;\n  border-radius: 12px;\n  padding: 0 0.9rem;\n  color: #111827;\n  background: white;\n}\n.filter-actions {\n  display: flex;\n  gap: 0.75rem;\n  justify-content: flex-end;\n  align-items: center;\n}\n.apply-btn,\n.reset-btn {\n  border: none;\n  border-radius: 12px;\n  padding: 0.9rem 1.2rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.apply-btn {\n  background: #0f6cff;\n  color: white;\n}\n.reset-btn {\n  background: transparent;\n  color: #0f6cff;\n  border: 1px solid rgba(15, 108, 255, 0.16);\n}\n.report-info {\n  margin-top: 1rem;\n  display: flex;\n  justify-content: flex-end;\n  color: #475569;\n  font-size: 0.95rem;\n}\n.report-info strong {\n  color: #111827;\n}\n.download-report {\n  background: #0f6cff;\n  color: white;\n  border: none;\n  border-radius: 999px;\n  padding: 0.9rem 1.45rem;\n  font-weight: 600;\n  cursor: pointer;\n  box-shadow: 0 12px 30px rgba(15, 108, 255, 0.18);\n}\n.kpi-row {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n.kpi-card {\n  background: white;\n  padding: 1.25rem 1.35rem;\n  border-radius: 18px;\n  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.05);\n  border: 1px solid rgba(15, 23, 42, 0.05);\n}\n.kpi-title {\n  display: block;\n  font-size: 0.92rem;\n  color: #6b7280;\n  margin-bottom: 0.75rem;\n}\n.kpi-value {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #111827;\n}\n.kpi-note {\n  display: block;\n  margin-top: 0.5rem;\n  color: #6b7280;\n  font-size: 0.92rem;\n}\n.content-grid {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: 1.45fr 1fr;\n}\n.panel-left,\n.panel-right {\n  display: grid;\n  gap: 1rem;\n}\n.chart-card,\n.insights-card {\n  background: white;\n  padding: 1.25rem;\n  border-radius: 20px;\n  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.06);\n  border: 1px solid rgba(15, 23, 42, 0.06);\n}\n.chart-card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.chart-card-header h3,\n.insights-card h3 {\n  margin: 0;\n  font-size: 1rem;\n  color: #111827;\n}\n.badge {\n  background: rgba(15, 108, 255, 0.12);\n  color: #0f6cff;\n  font-size: 0.78rem;\n  font-weight: 700;\n  padding: 0.45rem 0.8rem;\n  border-radius: 999px;\n}\n.badge-soft {\n  background: rgba(17, 24, 39, 0.06);\n  color: #374151;\n}\n.chart-body {\n  min-height: 280px;\n  position: relative;\n}\n.pie-chart-wrap {\n  height: 260px;\n  width: 100%;\n}\n.chart-body canvas {\n  width: 100% !important;\n  height: 100% !important;\n}\n.status-list {\n  display: grid;\n  gap: 0.75rem;\n  margin-top: 1.4rem;\n  padding: 0;\n  list-style: none;\n}\n.status-list li {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 0.95rem;\n  border-radius: 14px;\n  background: #f8fafc;\n  color: #111827;\n}\n.legend-dot {\n  width: 0.85rem;\n  height: 0.85rem;\n  border-radius: 50%;\n  display: inline-block;\n}\n.status-name {\n  font-size: 0.96rem;\n  color: #111827;\n}\n.status-count {\n  font-weight: 700;\n  color: #111827;\n}\n.insights-card {\n  display: grid;\n  gap: 1rem;\n}\n.insight-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.insight-row div {\n  background: #f8fafc;\n  border-radius: 16px;\n  padding: 1rem;\n}\n.insight-label {\n  display: block;\n  color: #6b7280;\n  margin-bottom: 0.35rem;\n}\n.top-list {\n  background: #f8fafc;\n  border-radius: 16px;\n  padding: 1rem;\n}\n.top-list-title {\n  color: #374151;\n  font-size: 0.95rem;\n  margin-bottom: 0.75rem;\n}\n.top-list ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: grid;\n  gap: 0.7rem;\n}\n.top-list li {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  color: #111827;\n  font-size: 0.95rem;\n}\n.top-list strong {\n  color: #0f6cff;\n}\n@media (max-width: 1100px) {\n  .content-grid {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 750px) {\n  .dashboard-header,\n  .kpi-row,\n  .insight-row {\n    grid-template-columns: 1fr;\n  }\n  .dashboard-header {\n    align-items: flex-start;\n  }\n  .kpi-row {\n    grid-template-columns: 1fr;\n  }\n  .download-report {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=pbs-analytics.component.css.map */\n"] }]
  }], () => [{ type: CharteredBikeService }], { reportSection: [{
    type: ViewChild,
    args: ["reportSection"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PbsAnalyticsComponent, { className: "PbsAnalyticsComponent", filePath: "src/app/components/admin/pbs-analytics/pbs-analytics.component.ts", lineNumber: 19 });
})();
export {
  PbsAnalyticsComponent
};
//# sourceMappingURL=chunk-WAA74LZI.js.map
