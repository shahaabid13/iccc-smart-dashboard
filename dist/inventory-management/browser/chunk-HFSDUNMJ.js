import {
  SmcService
} from "./chunk-OHINZ2ZQ.js";
import {
  E,
  autoTable,
  utils,
  writeFileSync
} from "./chunk-XEM42QDI.js";
import {
  BaseChartDirective,
  NgChartsModule
} from "./chunk-TZLEL3OR.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-4AUWEQTR.js";
import {
  CommonModule,
  Component,
  NgForOf,
  NgIf,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
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
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WPHUMBF2.js";
import "./chunk-ETVPICVQ.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-YP43Q66R.js";

// src/app/components/admin/smc-dashboard/weighbridge-charts.component.ts
function WeighbridgeChartsComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12)(2, "label");
    \u0275\u0275text(3, "From Date:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 13);
    \u0275\u0275twoWayListener("ngModelChange", function WeighbridgeChartsComponent_div_10_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.startDate, $event) || (ctx_r1.startDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function WeighbridgeChartsComponent_div_10_Template_input_change_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDateChange());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 12)(6, "label");
    \u0275\u0275text(7, "To Date:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 13);
    \u0275\u0275twoWayListener("ngModelChange", function WeighbridgeChartsComponent_div_10_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.endDate, $event) || (ctx_r1.endDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function WeighbridgeChartsComponent_div_10_Template_input_change_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDateChange());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 14)(10, "button", 15);
    \u0275\u0275listener("click", function WeighbridgeChartsComponent_div_10_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setPeriod("today"));
    });
    \u0275\u0275text(11, "Today");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 15);
    \u0275\u0275listener("click", function WeighbridgeChartsComponent_div_10_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setPeriod("yesterday"));
    });
    \u0275\u0275text(13, "Yesterday");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 15);
    \u0275\u0275listener("click", function WeighbridgeChartsComponent_div_10_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setPeriod("week"));
    });
    \u0275\u0275text(15, "This Week");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 15);
    \u0275\u0275listener("click", function WeighbridgeChartsComponent_div_10_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setPeriod("month"));
    });
    \u0275\u0275text(17, "This Month");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 15);
    \u0275\u0275listener("click", function WeighbridgeChartsComponent_div_10_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setPeriod("custom"));
    });
    \u0275\u0275text(19, "Custom");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 16)(21, "button", 17);
    \u0275\u0275listener("click", function WeighbridgeChartsComponent_div_10_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.exportReportToExcel());
    });
    \u0275\u0275elementStart(22, "span", 18);
    \u0275\u0275text(23, "\u{1F4CA}");
    \u0275\u0275elementEnd();
    \u0275\u0275text(24, " Export Excel Report ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 19);
    \u0275\u0275listener("click", function WeighbridgeChartsComponent_div_10_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.exportReportToPDF());
    });
    \u0275\u0275elementStart(26, "span", 18);
    \u0275\u0275text(27, "\u{1F4C4}");
    \u0275\u0275elementEnd();
    \u0275\u0275text(28, " Export PDF Report ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.startDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.endDate);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.selectedPeriod === "today");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.selectedPeriod === "yesterday");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.selectedPeriod === "week");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.selectedPeriod === "month");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.selectedPeriod === "custom");
  }
}
function WeighbridgeChartsComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1, "Loading chart data...");
    \u0275\u0275elementEnd();
  }
}
function WeighbridgeChartsComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "h3");
    \u0275\u0275text(2, "Failed to load chart data");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 22);
    \u0275\u0275listener("click", function WeighbridgeChartsComponent_div_12_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadAllCharts());
    });
    \u0275\u0275text(6, "Retry");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function WeighbridgeChartsComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 24)(2, "div", 25);
    \u0275\u0275text(3, "\u{1F4CA}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 26)(5, "h3");
    \u0275\u0275text(6, "Total Net Weight (All Time)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 27);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 28);
    \u0275\u0275text(10, "Cumulative weight since data start");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 29);
    \u0275\u0275text(12, "Nov 21, 2025 to Current");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 24)(14, "div", 25);
    \u0275\u0275text(15, "\u2696\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 26)(17, "h3");
    \u0275\u0275text(18, "Net Weight");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 27);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 28);
    \u0275\u0275text(22, "Weight for selected period");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 29);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 24)(26, "div", 25);
    \u0275\u0275text(27, "\u{1F6E3}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 26)(29, "h3");
    \u0275\u0275text(30, "Total Trips");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 27);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 28);
    \u0275\u0275text(34, "Number of trips");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 29);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.formatWeight(ctx_r1.allTimeNetWeight));
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r1.formatWeight(ctx_r1.summaryData.totalNetWeight));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.getPeriodLabel());
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.summaryData.totalTrips || 0);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.getPeriodLabel());
  }
}
function WeighbridgeChartsComponent_div_14_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275text(1, " No data available for the selected period ");
    \u0275\u0275elementEnd();
  }
}
function WeighbridgeChartsComponent_div_14_canvas_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "canvas", 55);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("data", ctx_r1.netTrendChartData)("options", ctx_r1.getWeightTrendChartOptions("Day"))("type", ctx_r1.barChartType);
  }
}
function WeighbridgeChartsComponent_div_14_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275text(1, " No data available for the selected period ");
    \u0275\u0275elementEnd();
  }
}
function WeighbridgeChartsComponent_div_14_canvas_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "canvas", 55);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("data", ctx_r1.last24ChartData)("options", ctx_r1.getWeightTrendChartOptions("Hour"))("type", ctx_r1.barChartType);
  }
}
function WeighbridgeChartsComponent_div_14_div_32_option_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 59);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r6 = ctx.$implicit;
    \u0275\u0275property("value", option_r6.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r6.label, " ");
  }
}
function WeighbridgeChartsComponent_div_14_div_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "label", 56);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 57);
    \u0275\u0275twoWayListener("ngModelChange", function WeighbridgeChartsComponent_div_14_div_32_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedSecondaryFilter, $event) || (ctx_r1.selectedSecondaryFilter = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function WeighbridgeChartsComponent_div_14_div_32_Template_select_change_3_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onSecondaryFilterChange());
    });
    \u0275\u0275template(4, WeighbridgeChartsComponent_div_14_div_32_option_4_Template, 2, 2, "option", 58);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedTimeframe === "WEEKLY" ? "Month" : ctx_r1.selectedTimeframe === "YEARLY" ? "Fiscal Year" : "Year", ": ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedSecondaryFilter);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.secondaryFilterOptions);
  }
}
function WeighbridgeChartsComponent_div_14_div_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275listener("click", function WeighbridgeChartsComponent_div_14_div_39_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closePdfExportDialog($event));
    });
    \u0275\u0275elementStart(1, "div", 61);
    \u0275\u0275listener("click", function WeighbridgeChartsComponent_div_14_div_39_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 62)(3, "h3");
    \u0275\u0275text(4, "Export to PDF");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 63);
    \u0275\u0275listener("click", function WeighbridgeChartsComponent_div_14_div_39_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closePdfExportDialog());
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 64)(8, "div", 12)(9, "label", 65);
    \u0275\u0275text(10, "From Date:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 66);
    \u0275\u0275twoWayListener("ngModelChange", function WeighbridgeChartsComponent_div_14_div_39_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.pdfExportStartDate, $event) || (ctx_r1.pdfExportStartDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 12)(13, "label", 67);
    \u0275\u0275text(14, "To Date:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 68);
    \u0275\u0275twoWayListener("ngModelChange", function WeighbridgeChartsComponent_div_14_div_39_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.pdfExportEndDate, $event) || (ctx_r1.pdfExportEndDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 69)(17, "button", 70);
    \u0275\u0275listener("click", function WeighbridgeChartsComponent_div_14_div_39_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closePdfExportDialog());
    });
    \u0275\u0275text(18, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 71);
    \u0275\u0275listener("click", function WeighbridgeChartsComponent_div_14_div_39_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.generateAndExportPDF());
    });
    \u0275\u0275text(20, "Generate PDF");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.pdfExportStartDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.pdfExportEndDate);
  }
}
function WeighbridgeChartsComponent_div_14_div_40_div_8_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275text(1, " No data available for the selected timeframe ");
    \u0275\u0275elementEnd();
  }
}
function WeighbridgeChartsComponent_div_14_div_40_div_8_canvas_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "canvas", 55);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("data", ctx_r1.timeframeChartData)("options", ctx_r1.getTimeframeChartOptions())("type", ctx_r1.barChartType);
  }
}
function WeighbridgeChartsComponent_div_14_div_40_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 76)(1, "div", 32);
    \u0275\u0275template(2, WeighbridgeChartsComponent_div_14_div_40_div_8_div_2_Template, 2, 0, "div", 33)(3, WeighbridgeChartsComponent_div_14_div_40_div_8_canvas_3_Template, 1, 3, "canvas", 34);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r1.timeframeChartData.labels || ctx_r1.timeframeChartData.labels.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.timeframeChartData.labels && ctx_r1.timeframeChartData.labels.length > 0);
  }
}
function WeighbridgeChartsComponent_div_14_div_40_div_9_tr_22_Template(rf, ctx) {
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
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("highlight", item_r9.totalNetWeight === ctx_r1.maxWeight);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r9.periodName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(item_r9.startDate));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(item_r9.endDate));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r9.totalEntries);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatWeight(item_r9.totalNetWeight));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatWeight(item_r9.totalGrossWeight));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatWeight(item_r9.averageNetWeight));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatWeight(item_r9.averageGrossWeight));
  }
}
function WeighbridgeChartsComponent_div_14_div_40_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 76)(1, "div", 77)(2, "table", 78)(3, "thead")(4, "tr")(5, "th");
    \u0275\u0275text(6, "Period");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Start Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "End Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Total Trips");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Total Net Weight");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "Total Gross Weight");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "Avg Net Weight");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20, "Avg Gross Weight");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "tbody");
    \u0275\u0275template(22, WeighbridgeChartsComponent_div_14_div_40_div_9_tr_22_Template, 17, 10, "tr", 79);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(22);
    \u0275\u0275property("ngForOf", ctx_r1.timeframeData);
  }
}
function WeighbridgeChartsComponent_div_14_div_40_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 76)(1, "div", 80)(2, "div", 81)(3, "div", 82)(4, "div", 83);
    \u0275\u0275text(5, "Total Periods Analyzed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 84);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 82)(9, "div", 83);
    \u0275\u0275text(10, "Date Range Covered");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 84);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 82)(14, "div", 83);
    \u0275\u0275text(15, "Highest Weight Period");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 84);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 82)(19, "div", 83);
    \u0275\u0275text(20, "Highest Weight Value");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 84);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 82)(24, "div", 83);
    \u0275\u0275text(25, "Average Period Duration");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 84);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 82)(29, "div", 83);
    \u0275\u0275text(30, "Data Consistency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 84);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.timeframeData.length || 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.getDateRangeCovered());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((ctx_r1.highestWeightPeriod == null ? null : ctx_r1.highestWeightPeriod.periodName) || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatWeight((ctx_r1.highestWeightPeriod == null ? null : ctx_r1.highestWeightPeriod.totalNetWeight) || 0));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.calculateAverageDuration(), " days");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.calculateDataConsistency());
  }
}
function WeighbridgeChartsComponent_div_14_div_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 72)(1, "div", 73)(2, "button", 74);
    \u0275\u0275listener("click", function WeighbridgeChartsComponent_div_14_div_40_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.activeTab = "chart");
    });
    \u0275\u0275text(3, " \u{1F4C8} Chart View ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 74);
    \u0275\u0275listener("click", function WeighbridgeChartsComponent_div_14_div_40_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.activeTab = "table");
    });
    \u0275\u0275text(5, " \u{1F4CB} Data Table ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 74);
    \u0275\u0275listener("click", function WeighbridgeChartsComponent_div_14_div_40_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.activeTab = "details");
    });
    \u0275\u0275text(7, " \u{1F50D} Details ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, WeighbridgeChartsComponent_div_14_div_40_div_8_Template, 4, 2, "div", 75)(9, WeighbridgeChartsComponent_div_14_div_40_div_9_Template, 23, 1, "div", 75)(10, WeighbridgeChartsComponent_div_14_div_40_div_10_Template, 33, 6, "div", 75);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "chart");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "table");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "details");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "chart");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "table");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "details");
  }
}
function WeighbridgeChartsComponent_div_14_div_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 85)(1, "div", 86)(2, "span", 87);
    \u0275\u0275text(3, "Total Periods");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 88);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 86)(7, "span", 87);
    \u0275\u0275text(8, "Total Net Weight");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 88);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 86)(12, "span", 87);
    \u0275\u0275text(13, "Total Gross Weight");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 88);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 86)(17, "span", 87);
    \u0275\u0275text(18, "Total Trips");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 88);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 86)(22, "span", 87);
    \u0275\u0275text(23, "Avg Net Weight/Trip");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 88);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 86)(27, "span", 87);
    \u0275\u0275text(28, "Period with Max Weight");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 88);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.timeframeData.length);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatWeight(ctx_r1.calculateTotalNetWeight()));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatWeight(ctx_r1.calculateTotalGrossWeight()));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.calculateTotalTrips());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatWeight(ctx_r1.calculateAvgNetWeightPerTrip()));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(((ctx_r1.highestWeightPeriod == null ? null : ctx_r1.highestWeightPeriod.periodName) || "").split(":")[0] || "N/A");
  }
}
function WeighbridgeChartsComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 31)(2, "h3");
    \u0275\u0275text(3, "Monthly/Daily Net Weight Trend");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 32);
    \u0275\u0275template(5, WeighbridgeChartsComponent_div_14_div_5_Template, 2, 0, "div", 33)(6, WeighbridgeChartsComponent_div_14_canvas_6_Template, 1, 3, "canvas", 34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 31)(8, "h3");
    \u0275\u0275text(9, "Last 24 Hours Trend");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 32);
    \u0275\u0275template(11, WeighbridgeChartsComponent_div_14_div_11_Template, 2, 0, "div", 33)(12, WeighbridgeChartsComponent_div_14_canvas_12_Template, 1, 3, "canvas", 34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 35)(14, "div", 36)(15, "h3");
    \u0275\u0275text(16, "Timeframe Analysis");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 37)(18, "div", 38)(19, "label", 39);
    \u0275\u0275text(20, "Timeframe:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "select", 40);
    \u0275\u0275twoWayListener("ngModelChange", function WeighbridgeChartsComponent_div_14_Template_select_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedTimeframe, $event) || (ctx_r1.selectedTimeframe = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function WeighbridgeChartsComponent_div_14_Template_select_change_21_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTimeframeChange());
    });
    \u0275\u0275elementStart(22, "option", 41);
    \u0275\u0275text(23, "Weekly");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option", 42);
    \u0275\u0275text(25, "Monthly");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option", 43);
    \u0275\u0275text(27, "Quarterly");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "option", 44);
    \u0275\u0275text(29, "Half-Yearly");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "option", 45);
    \u0275\u0275text(31, "Yearly");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(32, WeighbridgeChartsComponent_div_14_div_32_Template, 5, 3, "div", 46);
    \u0275\u0275elementStart(33, "div", 47)(34, "span", 48);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 49)(37, "button", 50);
    \u0275\u0275listener("click", function WeighbridgeChartsComponent_div_14_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openPdfExportDialog());
    });
    \u0275\u0275text(38, " \u{1F4C4} Export to PDF ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(39, WeighbridgeChartsComponent_div_14_div_39_Template, 21, 2, "div", 51)(40, WeighbridgeChartsComponent_div_14_div_40_Template, 11, 9, "div", 52)(41, WeighbridgeChartsComponent_div_14_div_41_Template, 31, 6, "div", 53);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", !ctx_r1.netTrendChartData.labels || ctx_r1.netTrendChartData.labels.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.netTrendChartData.labels && ctx_r1.netTrendChartData.labels.length > 0);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", !ctx_r1.last24ChartData.labels || ctx_r1.last24ChartData.labels.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.last24ChartData.labels && ctx_r1.last24ChartData.labels.length > 0);
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedTimeframe);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngIf", ctx_r1.secondaryFilterOptions.length > 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getTimeframeDateRange());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !(ctx_r1.timeframeChartData.labels == null ? null : ctx_r1.timeframeChartData.labels.length));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.showPdfExportDialog);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.timeframeData == null ? null : ctx_r1.timeframeData.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.timeframeData == null ? null : ctx_r1.timeframeData.length);
  }
}
var WeighbridgeChartsComponent = class _WeighbridgeChartsComponent {
  smcService;
  wbId = "SRNGR_LANDFILL_WB1";
  loading = false;
  error = false;
  errorMessage = "";
  debugInfo = true;
  // Date range properties
  startDate;
  endDate;
  selectedPeriod = "week";
  // Weighbridge data properties (for report generation)
  allWeighbridgeData = [];
  filteredRecords = [];
  // Timeframe properties
  selectedTimeframe = "WEEKLY";
  timeframeChartData = { datasets: [], labels: [] };
  timeframeData = [];
  maxWeight = 0;
  highestWeightPeriod = null;
  activeTab = "chart";
  // PDF Export properties
  showPdfExportDialog = false;
  pdfExportStartDate = "";
  pdfExportEndDate = "";
  // Secondary Filter properties (Month/Year based on timeframe)
  selectedSecondaryFilter = "";
  secondaryFilterOptions = [];
  // Chart data
  netTrendChartData = { datasets: [], labels: [] };
  last24ChartData = { datasets: [], labels: [] };
  // Summary data
  summaryData = null;
  allTimeNetWeight = 0;
  // Chart types
  barChartType = "bar";
  // Base chart options
  baseChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Weight (kg)"
        },
        ticks: {
          callback: (value) => {
            const numValue = Number(value);
            if (numValue >= 1e3) {
              return (numValue / 1e3).toFixed(1) + " tons";
            }
            return numValue + " kg";
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            const value = Number(context.parsed.y);
            if (value >= 1e3) {
              label += (value / 1e3).toFixed(2) + " tons";
            } else {
              label += value + " kg";
            }
            if (context.datasetIndex === 0 && context.dataIndex !== void 0) {
              const period = this.timeframeData?.[context.dataIndex];
              if (period) {
                label += ` (${period.totalEntries} trips)`;
              }
            }
            return label;
          }
        }
      }
    }
  };
  constructor(smcService) {
    this.smcService = smcService;
    const today = /* @__PURE__ */ new Date();
    this.endDate = today.toISOString().split("T")[0];
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 30);
    this.startDate = weekAgo.toISOString().split("T")[0];
  }
  ngOnInit() {
    this.loadAllCharts();
  }
  setPeriod(period) {
    this.selectedPeriod = period;
    const today = /* @__PURE__ */ new Date();
    switch (period) {
      case "today":
        this.startDate = today.toISOString().split("T")[0];
        this.endDate = today.toISOString().split("T")[0];
        break;
      case "yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        this.startDate = yesterday.toISOString().split("T")[0];
        this.endDate = yesterday.toISOString().split("T")[0];
        break;
      case "week":
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        this.startDate = weekAgo.toISOString().split("T")[0];
        this.endDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        break;
      case "month":
        const monthAgo = new Date(today);
        monthAgo.setDate(monthAgo.getDate() - 30);
        this.startDate = monthAgo.toISOString().split("T")[0];
        this.endDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        break;
      case "custom":
        break;
    }
    if (this.allWeighbridgeData && this.allWeighbridgeData.length > 0) {
      console.log("\n\u{1F4CC} Period changed to:", period);
      console.log("New date range:", this.startDate, "to", this.endDate);
      this.filterRecordsByDateRange();
    }
    this.loadSummary();
    this.loadNetTrend();
    this.loadTimeframeData();
  }
  onDateChange() {
    this.selectedPeriod = "custom";
    if (this.allWeighbridgeData && this.allWeighbridgeData.length > 0) {
      console.log("\n\u{1F4CC} Custom dates changed");
      console.log("New date range:", this.startDate, "to", this.endDate);
      this.filterRecordsByDateRange();
    }
    this.loadSummary();
    this.loadNetTrend();
    this.loadTimeframeData();
  }
  onTimeframeChange() {
    this.generateSecondaryFilterOptions();
    this.selectedSecondaryFilter = this.secondaryFilterOptions.length > 0 ? this.secondaryFilterOptions[0].value : "";
    this.loadTimeframeData();
  }
  generateSecondaryFilterOptions() {
    const currentDate = /* @__PURE__ */ new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    this.secondaryFilterOptions = [];
    if (this.selectedTimeframe === "WEEKLY") {
      const startMonth = 10;
      const startYear = 2025;
      for (let year = startYear; year <= currentYear; year++) {
        const endMonth = year === currentYear ? currentMonth : 11;
        const start = year === startYear ? startMonth : 0;
        for (let month = start; month <= endMonth; month++) {
          const monthName = new Date(year, month, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
          this.secondaryFilterOptions.push({
            label: monthName,
            value: `${year}-${String(month + 1).padStart(2, "0")}`
          });
        }
      }
    } else if (this.selectedTimeframe === "MONTHLY" || this.selectedTimeframe === "QUARTERLY" || this.selectedTimeframe === "HALF_YEARLY") {
      for (let year = 2025; year <= currentYear; year++) {
        this.secondaryFilterOptions.push({
          label: year.toString(),
          value: year.toString()
        });
      }
    } else if (this.selectedTimeframe === "YEARLY") {
      for (let year = 2025; year <= currentYear; year++) {
        const fiscalYear = `${year}-${year + 1}`;
        this.secondaryFilterOptions.push({
          label: fiscalYear,
          value: fiscalYear
        });
      }
    }
  }
  onSecondaryFilterChange() {
    this.loadTimeframeData();
  }
  getTimeframeDateRange() {
    if (this.selectedSecondaryFilter && this.secondaryFilterOptions.length > 0) {
      if (this.selectedTimeframe === "WEEKLY") {
        const [year, month] = this.selectedSecondaryFilter.split("-");
        const monthDate = new Date(parseInt(year), parseInt(month) - 1, 1);
        const monthName = monthDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
        const firstDay = new Date(parseInt(year), parseInt(month) - 1, 1);
        const lastDay = new Date(parseInt(year), parseInt(month), 0);
        return `${firstDay.toLocaleDateString("en-US", { month: "short", day: "numeric" })} to ${lastDay.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
      } else if (this.selectedTimeframe === "YEARLY") {
        const [startYear, endYear] = this.selectedSecondaryFilter.split("-");
        return `${startYear}-${endYear}`;
      } else {
        return `Year: ${this.selectedSecondaryFilter}`;
      }
    }
    if (this.startDate === this.endDate) {
      return `Date: ${this.formatDate(this.startDate)}`;
    }
    return `Date Range: ${this.formatDate(this.startDate)} to ${this.formatDate(this.endDate)}`;
  }
  loadAllCharts() {
    if (!this.wbId) {
      this.error = true;
      this.errorMessage = "Please enter a Weighbridge ID";
      return;
    }
    console.log("\n========== LOADING DATA ==========");
    console.log("\u{1F535} WB ID:", this.wbId);
    console.log("\u{1F4C5} Date Range:", this.startDate, "to", this.endDate);
    console.log("================================\n");
    this.loading = true;
    this.error = false;
    Promise.all([
      this.loadNetTrend(),
      this.loadLast24Trend(),
      this.loadSummary(),
      this.loadTimeframeData(),
      this.loadAllTimeSummary(),
      this.loadAllWeighbridgeRecords()
    ]).finally(() => {
      this.loading = false;
    });
  }
  loadNetTrend() {
    return new Promise((resolve) => {
      this.smcService.getNetTrend(this.wbId, this.startDate, this.endDate).subscribe({
        next: (data) => {
          console.log("Net Trend Data:", data);
          this.netTrendChartData = this.createBarChartData(data, "Net Weight (kg)", "#007bff", "daily");
          resolve();
        },
        error: (err) => {
          console.error("Error loading net trend:", err);
          resolve();
        }
      });
    });
  }
  loadLast24Trend() {
    return new Promise((resolve) => {
      this.smcService.getLast24Trend(this.wbId).subscribe({
        next: (data) => {
          console.log("Last 24 Trend Data:", data);
          this.last24ChartData = this.createBarChartData(data, "Net Weight (kg)", "#dc3545", "hourly");
          resolve();
        },
        error: (err) => {
          console.error("Error loading last 24 trend:", err);
          resolve();
        }
      });
    });
  }
  loadSummary() {
    return new Promise((resolve) => {
      const startIso = this.startDate.includes("T") ? this.startDate : `${this.startDate}T00:00:00`;
      const endIso = this.endDate.includes("T") ? this.endDate : `${this.endDate}T23:59:59`;
      this.smcService.getSummary(startIso, endIso, this.wbId).subscribe({
        next: (data) => {
          this.summaryData = data;
          resolve();
        },
        error: (err) => {
          console.error("Error loading summary:", err);
          resolve();
        }
      });
    });
  }
  loadAllTimeSummary() {
    return new Promise((resolve) => {
      const allTimeStartDate = "2025-11-21";
      const today = /* @__PURE__ */ new Date();
      const allTimeEndDate = today.toISOString().split("T")[0];
      const startIso = `${allTimeStartDate}T00:00:00`;
      const endIso = `${allTimeEndDate}T23:59:59`;
      this.smcService.getSummary(startIso, endIso, this.wbId).subscribe({
        next: (data) => {
          this.allTimeNetWeight = data?.totalNetWeight || 0;
          console.log("All-time net weight loaded:", this.allTimeNetWeight);
          resolve();
        },
        error: (err) => {
          console.error("Error loading all-time summary:", err);
          this.allTimeNetWeight = 0;
          resolve();
        }
      });
    });
  }
  /**
   * Load all weighbridge records for report generation
   */
  loadAllWeighbridgeRecords() {
    return new Promise((resolve) => {
      console.log("\n\u{1F4CA} === LOADING ALL WEIGHBRIDGE RECORDS ===");
      console.log("WB ID:", this.wbId);
      this.smcService.getAllWeighbridgeData(this.wbId).subscribe({
        next: (data) => {
          this.allWeighbridgeData = data || [];
          console.log("\u2705 Total records loaded:", this.allWeighbridgeData.length);
          if (this.allWeighbridgeData.length > 0) {
            console.log("\n\u{1F4CB} FIRST RECORD STRUCTURE:");
            const firstRecord = this.allWeighbridgeData[0];
            console.log("Full first record:", JSON.stringify(firstRecord, null, 2));
            console.log("\n\u{1F5C2}\uFE0F AVAILABLE FIELDS:");
            console.log(Object.keys(firstRecord));
            console.log("\n\u{1F50D} KEY FIELDS IN FIRST RECORD:");
            console.log("  id:", firstRecord.id);
            console.log("  vno:", firstRecord.vno);
            console.log("  edate:", firstRecord.edate);
            console.log("  gdate:", firstRecord.gdate);
            console.log("  gweight:", firstRecord.gweight);
            console.log("  nweight:", firstRecord.nweight);
          }
          console.log("\n=== STARTING DATE FILTER ===\n");
          this.filterRecordsByDateRange();
          resolve();
        },
        error: (err) => {
          console.error("\u274C Error loading all weighbridge data:", err);
          this.allWeighbridgeData = [];
          this.filteredRecords = [];
          resolve();
        }
      });
    });
  }
  /**
   * Filter records by date range (for report generation)
   */
  filterRecordsByDateRange() {
    console.log("\n\u{1F50D} === FILTERING BY DATE RANGE ===");
    console.log("Filter Date Range:", this.startDate, "to", this.endDate);
    console.log("Total records to filter:", this.allWeighbridgeData?.length || 0);
    if (!this.allWeighbridgeData || this.allWeighbridgeData.length === 0) {
      console.warn("\u26A0\uFE0F  No data available for filtering");
      this.filteredRecords = [];
      return;
    }
    this.filteredRecords = this.allWeighbridgeData.filter((record, index) => {
      const recordDate = this.getRecordDate(record);
      if (!recordDate) {
        console.log(`Record ${index}: \u274C NO VALID DATE - Skipping`);
        return false;
      }
      if (this.startDate && recordDate < new Date(this.startDate)) {
        return false;
      }
      if (this.endDate && recordDate > /* @__PURE__ */ new Date(this.endDate + "T23:59:59")) {
        return false;
      }
      console.log(`Record ${index}: \u2705 INCLUDED`);
      console.log("  Slip No:", record.id?.slipno);
      console.log("  VNo:", record.vno);
      console.log("  Record Date:", recordDate.toISOString());
      console.log("  GWeight:", record.gweight);
      console.log("  NWeight:", record.nweight);
      return true;
    });
    console.log("\n\u2705 === FILTER COMPLETE ===");
    console.log("Total filtered records:", this.filteredRecords.length);
    console.log("=========================\n");
  }
  /**
   * Extract date from record (handles multiple possible date fields)
   */
  getRecordDate(record) {
    const dateStr = record.edate || record.gdate || record.entryDate || record.date;
    if (!dateStr) {
      return null;
    }
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime()))
        return null;
      return date;
    } catch {
      return null;
    }
  }
  loadTimeframeData() {
    return new Promise((resolve) => {
      this.loading = true;
      const request = {
        wbId: this.wbId,
        startDate: this.startDate,
        endDate: this.endDate,
        timeframe: this.selectedTimeframe
      };
      this.smcService.getTimeframeData(request).subscribe({
        next: (data) => {
          console.log("Timeframe Data from API:", data);
          const filteredData = this.filterDataBySecondarySelection(data);
          this.timeframeData = filteredData;
          this.prepareTimeframeChartData(filteredData);
          this.calculateTimeframeMetrics();
          resolve();
        },
        error: (err) => {
          console.error("Error loading timeframe data:", err);
          this.timeframeData = [];
          this.timeframeChartData = { labels: [], datasets: [] };
          resolve();
        },
        complete: () => {
          this.loading = false;
        }
      });
    });
  }
  filterDataBySecondarySelection(data) {
    if (!this.selectedSecondaryFilter || this.selectedTimeframe !== "WEEKLY") {
      return data;
    }
    const [year, month] = this.selectedSecondaryFilter.split("-");
    const selectedYear = parseInt(year);
    const selectedMonth = parseInt(month);
    const monthStart = new Date(selectedYear, selectedMonth - 1, 1);
    const monthEnd = new Date(selectedYear, selectedMonth, 0);
    monthEnd.setHours(23, 59, 59, 999);
    return data.filter((item) => {
      const itemStart = new Date(item.startDate);
      const itemEnd = new Date(item.endDate);
      return itemStart <= monthEnd && itemEnd >= monthStart;
    });
  }
  prepareTimeframeChartData(data) {
    if (!data || data.length === 0) {
      this.timeframeChartData = { labels: [], datasets: [] };
      return;
    }
    const allData = data.sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return dateA - dateB;
    });
    const labels = allData.map((period) => {
      const shortLabel = this.extractShortLabel(period.periodName);
      const daysInPeriod = this.calculateDaysInPeriod(period.startDate, period.endDate);
      return `${shortLabel}
(${daysInPeriod}d)`;
    });
    const netWeights = allData.map((period) => period.totalNetWeight || 0);
    const grossWeights = allData.map((period) => period.totalGrossWeight || 0);
    const tripCounts = allData.map((period) => period.totalEntries || 0);
    const backgroundColor = this.getTimeframeColor(this.selectedTimeframe);
    this.timeframeChartData = {
      labels,
      datasets: [
        {
          label: "Net Weight",
          data: netWeights,
          backgroundColor,
          borderColor: backgroundColor,
          borderWidth: 2,
          barPercentage: 0.7,
          categoryPercentage: 0.8,
          yAxisID: "y"
        },
        {
          label: "Number of Trips",
          data: tripCounts,
          backgroundColor: "rgba(108, 117, 125, 0.3)",
          borderColor: "rgba(108, 117, 125, 1)",
          borderWidth: 1,
          type: "line",
          yAxisID: "y1",
          tension: 0.4,
          fill: false
        }
      ]
    };
  }
  calculateDaysInPeriod(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24)) + 1;
    return diffDays;
  }
  extractShortLabel(periodName) {
    if (!periodName)
      return "Unknown";
    switch (this.selectedTimeframe) {
      case "WEEKLY":
        const weekMatch = periodName.match(/Week (\d+)/);
        return weekMatch ? `W${weekMatch[1]}` : periodName;
      case "MONTHLY":
        const monthMatch = periodName.match(/(\w+) (\d+)/);
        if (monthMatch) {
          const month = monthMatch[1].substring(0, 3);
          const year = monthMatch[2].substring(2);
          return `${month}'${year}`;
        }
        return periodName;
      case "QUARTERLY":
        const quarterMatch = periodName.match(/Quarter (\d+), (\d+)/);
        if (quarterMatch) {
          const quarter = quarterMatch[1];
          const year = quarterMatch[2].substring(2);
          return `Q${quarter}'${year}`;
        }
        return periodName;
      case "HALF_YEARLY":
        if (periodName.includes("First Half")) {
          const yearMatch2 = periodName.match(/\d+/);
          const year = yearMatch2 ? yearMatch2[0].substring(2) : "";
          return `H1'${year}`;
        } else if (periodName.includes("Second Half")) {
          const yearMatch2 = periodName.match(/\d+/);
          const year = yearMatch2 ? yearMatch2[0].substring(2) : "";
          return `H2'${year}`;
        }
        return periodName;
      case "YEARLY":
        const yearMatch = periodName.match(/\d+/);
        return yearMatch ? yearMatch[0] : periodName;
      default:
        return periodName;
    }
  }
  calculateTimeframeMetrics() {
    if (!this.timeframeData || this.timeframeData.length === 0) {
      this.maxWeight = 0;
      this.highestWeightPeriod = null;
      return;
    }
    this.maxWeight = Math.max(...this.timeframeData.map((p) => p.totalNetWeight || 0));
    this.highestWeightPeriod = this.timeframeData.find((p) => p.totalNetWeight === this.maxWeight) || null;
  }
  getTimeframeColor(timeframe) {
    switch (timeframe) {
      case "WEEKLY":
        return "#28a745";
      // Green
      case "MONTHLY":
        return "#007bff";
      // Blue
      case "QUARTERLY":
        return "#ffc107";
      // Yellow
      case "HALF_YEARLY":
        return "#fd7e14";
      // Orange
      case "YEARLY":
        return "#6f42c1";
      // Purple
      default:
        return "#28a745";
    }
  }
  // Helper methods for calculations
  calculateTotalNetWeight() {
    if (!this.timeframeData)
      return 0;
    return this.timeframeData.reduce((sum, period) => sum + (period.totalNetWeight || 0), 0);
  }
  calculateTotalGrossWeight() {
    if (!this.timeframeData)
      return 0;
    return this.timeframeData.reduce((sum, period) => sum + (period.totalGrossWeight || 0), 0);
  }
  calculateTotalTrips() {
    if (!this.timeframeData)
      return 0;
    return this.timeframeData.reduce((sum, period) => sum + (period.totalEntries || 0), 0);
  }
  calculateAvgNetWeightPerTrip() {
    const totalTrips = this.calculateTotalTrips();
    if (totalTrips === 0)
      return 0;
    return this.calculateTotalNetWeight() / totalTrips;
  }
  getDateRangeCovered() {
    if (!this.timeframeData || this.timeframeData.length === 0) {
      return "No data";
    }
    const firstPeriod = this.timeframeData[0];
    const lastPeriod = this.timeframeData[this.timeframeData.length - 1];
    return `${this.formatDate(firstPeriod.startDate)} to ${this.formatDate(lastPeriod.endDate)}`;
  }
  calculateAverageDuration() {
    if (!this.timeframeData || this.timeframeData.length === 0)
      return 0;
    const totalDays = this.timeframeData.reduce((sum, period) => {
      const start = new Date(period.startDate);
      const end = new Date(period.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24)) + 1;
      return sum + diffDays;
    }, 0);
    return Math.round(totalDays / this.timeframeData.length);
  }
  calculateDataConsistency() {
    if (!this.timeframeData || this.timeframeData.length === 0)
      return "No data";
    const periodsWithData = this.timeframeData.filter((p) => p.totalEntries > 0).length;
    const percentage = periodsWithData / this.timeframeData.length * 100;
    if (percentage >= 90)
      return "Excellent";
    if (percentage >= 70)
      return "Good";
    if (percentage >= 50)
      return "Fair";
    return "Poor";
  }
  openPdfExportDialog() {
    this.pdfExportStartDate = this.startDate;
    this.pdfExportEndDate = this.endDate;
    this.showPdfExportDialog = true;
  }
  closePdfExportDialog(event) {
    if (event && event.target !== event.currentTarget) {
      return;
    }
    this.showPdfExportDialog = false;
  }
  generateAndExportPDF() {
    if (!this.pdfExportStartDate || !this.pdfExportEndDate) {
      alert("Please select both from and to dates");
      return;
    }
    if (new Date(this.pdfExportStartDate) > new Date(this.pdfExportEndDate)) {
      alert("From date must be before to date");
      return;
    }
    const rangeStart = new Date(this.pdfExportStartDate);
    const rangeEnd = new Date(this.pdfExportEndDate);
    const weeklyData = this.generateWeeklyDataForRange(rangeStart, rangeEnd);
    if (weeklyData.length === 0) {
      alert("No data available for the selected date range");
      return;
    }
    this.exportTimeframeDataToPdf(weeklyData);
    this.closePdfExportDialog();
  }
  generateWeeklyDataForRange(startDate, endDate) {
    const weeks = [];
    let currentWeekStart = new Date(startDate);
    let weekNumber = 1;
    while (currentWeekStart < endDate) {
      let currentWeekEnd = new Date(currentWeekStart);
      currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);
      if (currentWeekEnd > endDate) {
        currentWeekEnd = new Date(endDate);
      }
      const daysInWeek = Math.floor((currentWeekEnd.getTime() - currentWeekStart.getTime()) / (1e3 * 60 * 60 * 24)) + 1;
      const weekData = this.timeframeData.filter((item) => {
        const itemStart = new Date(item.startDate);
        const itemEnd = new Date(item.endDate);
        return itemStart <= currentWeekEnd && itemEnd >= currentWeekStart;
      });
      const aggregatedWeek = {
        periodName: `Week ${weekNumber} (${daysInWeek} days)`,
        startDate: currentWeekStart.toISOString().split("T")[0],
        endDate: currentWeekEnd.toISOString().split("T")[0],
        totalEntries: weekData.reduce((sum, item) => sum + item.totalEntries, 0),
        totalNetWeight: weekData.reduce((sum, item) => sum + item.totalNetWeight, 0),
        totalGrossWeight: weekData.reduce((sum, item) => sum + item.totalGrossWeight, 0),
        averageNetWeight: 0,
        averageGrossWeight: 0
      };
      if (aggregatedWeek.totalEntries > 0) {
        aggregatedWeek.averageNetWeight = aggregatedWeek.totalNetWeight / aggregatedWeek.totalEntries;
        aggregatedWeek.averageGrossWeight = aggregatedWeek.totalGrossWeight / aggregatedWeek.totalEntries;
      }
      weeks.push(aggregatedWeek);
      currentWeekStart = new Date(currentWeekEnd);
      currentWeekStart.setDate(currentWeekStart.getDate() + 1);
      weekNumber++;
    }
    return weeks;
  }
  exportTimeframeDataToPdf(data) {
    try {
      const doc = new E();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPosition = 15;
      doc.setFontSize(18);
      doc.setTextColor(33, 37, 41);
      doc.text("Timeframe Analysis Report", pageWidth / 2, yPosition, { align: "center" });
      yPosition += 10;
      doc.setFontSize(11);
      doc.setTextColor(100, 100, 100);
      const dateRange = `From: ${this.formatDate(this.pdfExportStartDate)} to ${this.formatDate(this.pdfExportEndDate)}`;
      doc.text(dateRange, pageWidth / 2, yPosition, { align: "center" });
      yPosition += 5;
      const timeframeType = `Timeframe: ${this.selectedTimeframe}`;
      doc.text(timeframeType, pageWidth / 2, yPosition, { align: "center" });
      yPosition += 5;
      const reportDate = `Report Generated: ${(/* @__PURE__ */ new Date()).toLocaleString()}`;
      doc.text(reportDate, pageWidth / 2, yPosition, { align: "center" });
      yPosition += 8;
      doc.setFontSize(12);
      doc.setTextColor(33, 37, 41);
      doc.text("Summary", 15, yPosition);
      yPosition += 5;
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      const totalTrips = data.reduce((sum, item) => sum + item.totalEntries, 0);
      const totalNetWeight = data.reduce((sum, item) => sum + item.totalNetWeight, 0);
      const totalGrossWeight = data.reduce((sum, item) => sum + item.totalGrossWeight, 0);
      const avgNetWeight = totalTrips > 0 ? totalNetWeight / totalTrips : 0;
      doc.text(`Total Periods: ${data.length}`, 20, yPosition);
      yPosition += 4;
      doc.text(`Total Trips: ${totalTrips}`, 20, yPosition);
      yPosition += 4;
      doc.text(`Total Net Weight: ${this.formatWeight(totalNetWeight)}`, 20, yPosition);
      yPosition += 4;
      doc.text(`Total Gross Weight: ${this.formatWeight(totalGrossWeight)}`, 20, yPosition);
      yPosition += 4;
      doc.text(`Average Net Weight per Trip: ${this.formatWeight(avgNetWeight)}`, 20, yPosition);
      yPosition += 8;
      const tableColumns = [
        "Period",
        "Start Date",
        "End Date",
        "Trips",
        "Net Weight",
        "Gross Weight",
        "Avg Net Wt",
        "Avg Gross Wt"
      ];
      const tableData = data.map((item) => [
        item.periodName || "N/A",
        this.formatDate(item.startDate),
        this.formatDate(item.endDate),
        item.totalEntries.toString(),
        this.formatWeight(item.totalNetWeight),
        this.formatWeight(item.totalGrossWeight),
        this.formatWeight(item.averageNetWeight),
        this.formatWeight(item.averageGrossWeight)
      ]);
      autoTable(doc, {
        head: [tableColumns],
        body: tableData,
        startY: yPosition,
        margin: { top: 10, right: 15, bottom: 15, left: 15 },
        styles: {
          fontSize: 9,
          textColor: [33, 37, 41],
          fillColor: [247, 248, 249],
          halign: "center",
          valign: "middle"
        },
        headStyles: {
          fillColor: [0, 123, 255],
          textColor: [255, 255, 255],
          fontStyle: "bold"
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        columnStyles: {
          3: { halign: "right" },
          4: { halign: "right" },
          5: { halign: "right" },
          6: { halign: "right" },
          7: { halign: "right" }
        }
      });
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: "center" });
      }
      const fileName = `timeframe_analysis_${this.selectedTimeframe.toLowerCase()}_${this.pdfExportStartDate}_to_${this.pdfExportEndDate}.pdf`;
      doc.save(fileName);
      console.log("PDF exported successfully:", fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please check the console for details.");
    }
  }
  exportTimeframeData() {
    if (!this.timeframeData || this.timeframeData.length === 0) {
      alert("No data to export");
      return;
    }
    const csvContent = this.convertToCSV(this.timeframeData);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `timeframe_data_${this.selectedTimeframe.toLowerCase()}_${this.startDate}_${this.endDate}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  convertToCSV(data) {
    const headers = ["Period", "Start Date", "End Date", "Total Trips", "Total Net Weight", "Total Gross Weight", "Avg Net Weight", "Avg Gross Weight"];
    const rows = data.map((item) => [
      item.periodName,
      item.startDate,
      item.endDate,
      item.totalEntries,
      item.totalNetWeight,
      item.totalGrossWeight,
      item.averageNetWeight,
      item.averageGrossWeight
    ]);
    return [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
  }
  createBarChartData(apiData, label, backgroundColor, dataType) {
    console.log(`Creating ${dataType} chart data:`, apiData);
    const filteredData = apiData.filter((item) => {
      const weight = item.weight || item.netWeight || item.value || item.totalWeight || 0;
      return weight > 0;
    });
    console.log(`Filtered data (only non-zero): ${filteredData.length} entries from ${apiData.length}`);
    const labels = filteredData.map((item, index) => {
      const dateValue = item.dateTime || item.date || item.time || item.day || item.hour || item.label || item.period;
      const formattedLabel = this.formatLabel(dateValue, dataType);
      return formattedLabel;
    });
    const data = filteredData.map((item) => {
      return item.weight || item.netWeight || item.value || item.totalWeight || 0;
    });
    return {
      labels,
      datasets: [
        {
          label,
          data,
          backgroundColor,
          borderColor: backgroundColor,
          borderWidth: 1,
          barPercentage: 0.8,
          categoryPercentage: 0.8
        }
      ]
    };
  }
  formatLabel(labelString, dataType) {
    console.log(`Formatting label for ${dataType}:`, labelString, "Type:", typeof labelString);
    if (!labelString)
      return "Unknown";
    if (typeof labelString === "string") {
      if (labelString.includes("T")) {
        const date = new Date(labelString);
        if (!isNaN(date.getTime())) {
          if (dataType === "hourly") {
            return date.toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true,
              minute: "2-digit"
            });
          } else {
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric"
            });
          }
        }
      } else if (/^\d{4}-\d{2}-\d{2}$/.test(labelString)) {
        const date = /* @__PURE__ */ new Date(labelString + "T00:00:00");
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          });
        }
      } else if (/^\d{2}:\d{2}/.test(labelString)) {
        const timeParts = labelString.split(":");
        const hour = parseInt(timeParts[0], 10);
        if (hour === 0)
          return "12 AM";
        if (hour === 12)
          return "12 PM";
        return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
      } else if (/^\d+$/.test(labelString)) {
        const dayNum = parseInt(labelString, 10);
        return `Day ${dayNum}`;
      }
    }
    if (typeof labelString === "number") {
      if (dataType === "hourly") {
        const hour = labelString % 24;
        if (hour === 0)
          return "12 AM";
        if (hour === 12)
          return "12 PM";
        return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
      } else {
        return `Day ${labelString}`;
      }
    }
    return String(labelString);
  }
  getWeightTrendChartOptions(xAxisLabel) {
    return __spreadProps(__spreadValues({}, this.baseChartOptions), {
      scales: __spreadProps(__spreadValues({}, this.baseChartOptions?.scales || {}), {
        x: {
          title: {
            display: true,
            text: xAxisLabel
          },
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        }
      })
    });
  }
  getTimeframeChartOptions() {
    return __spreadProps(__spreadValues({}, this.baseChartOptions), {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Weight (kg)"
          },
          ticks: {
            callback: (value) => {
              const numValue = Number(value);
              if (numValue >= 1e3) {
                return (numValue / 1e3).toFixed(1) + " tons";
              }
              return numValue + " kg";
            }
          }
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          title: {
            display: true,
            text: "Number of Trips"
          },
          grid: {
            drawOnChartArea: false
          },
          beginAtZero: true
        },
        x: {
          title: {
            display: true,
            text: this.getTimeframeXAxisLabel()
          },
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: "top"
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              const value = Number(context.parsed.y);
              if (context.datasetIndex === 0) {
                if (value >= 1e3) {
                  label += (value / 1e3).toFixed(2) + " tons";
                } else {
                  label += value + " kg";
                }
              } else {
                label += value + " trips";
              }
              return label;
            }
          }
        }
      }
    });
  }
  getTimeframeXAxisLabel() {
    switch (this.selectedTimeframe) {
      case "WEEKLY":
        return "Week";
      case "MONTHLY":
        return "Month";
      case "QUARTERLY":
        return "Quarter";
      case "HALF_YEARLY":
        return "Half Year";
      case "YEARLY":
        return "Year";
      default:
        return "Period";
    }
  }
  handleError(error) {
    this.error = true;
    this.errorMessage = error?.message || "Failed to load chart data";
    this.loading = false;
  }
  formatWeight(weight) {
    if (!weight && weight !== 0)
      return "0 kg";
    if (weight >= 1e3) {
      return (weight / 1e3).toFixed(1) + " tons";
    }
    return Math.round(weight) + " kg";
  }
  formatDate(dateString) {
    if (!dateString)
      return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  getPeriodLabel() {
    if (this.startDate === this.endDate) {
      return this.startDate;
    }
    return `${this.startDate} to ${this.endDate}`;
  }
  // ==================== REPORT GENERATION METHODS ====================
  /**
   * Export weighbridge data as an Excel report with totals
   */
  exportReportToExcel() {
    if (!this.summaryData) {
      alert("No data to export. Please load data first.");
      return;
    }
    try {
      const reportRows = this.getReportRows();
      if (reportRows.length === 0) {
        alert("No data available for export");
        return;
      }
      const header = ["WB ID", "Date", "Time", "Net Weight (kg)", "Gross Weight (kg)"];
      const body = reportRows.map((r) => [
        r["wbId"] || "N/A",
        r["date"] || "N/A",
        r["time"] || "N/A",
        this.formatWeightSimple(r["netWeight"]),
        this.formatWeightSimple(r["grossWeight"])
      ]);
      const sumNetWeight = reportRows.reduce((s, x) => {
        const value = parseFloat(x["netWeight"].toString().replace(/\./g, "").replace(/,/g, "."));
        return s + (isNaN(value) ? 0 : value);
      }, 0);
      const sumGrossWeight = reportRows.reduce((s, x) => {
        const value = parseFloat(x["grossWeight"].toString().replace(/\./g, "").replace(/,/g, "."));
        return s + (isNaN(value) ? 0 : value);
      }, 0);
      body.push(["", "", "", "", ""]);
      body.push([
        "",
        "",
        "TOTALS",
        this.formatNumberWithUnits(sumNetWeight),
        this.formatNumberWithUnits(sumGrossWeight)
      ]);
      body.push(["", "", "Total Records", reportRows.length.toString(), ""]);
      const aoa = [header, ...body];
      const worksheet = utils.aoa_to_sheet(aoa);
      worksheet["!cols"] = [
        { wch: 20 },
        // WB ID
        { wch: 15 },
        // Date
        { wch: 12 },
        // Time
        { wch: 18 },
        // Net Weight
        { wch: 18 }
        // Gross Weight
      ];
      const workbook = {
        Sheets: { "Report": worksheet },
        SheetNames: ["Report"]
      };
      const fileName = `Weighbridge_Report_${this.getDateRangeLabel().replace(/ /g, "_")}_${(/* @__PURE__ */ new Date()).getTime()}.xlsx`;
      writeFileSync(workbook, fileName);
      console.log("\u2705 Report exported to Excel successfully");
    } catch (err) {
      console.error("\u274C Error exporting report to Excel", err);
      alert("Error exporting report to Excel");
    }
  }
  /**
   * Export weighbridge data as a PDF report with totals
   */
  exportReportToPDF() {
    if (!this.summaryData) {
      alert("No data to export. Please load data first.");
      return;
    }
    try {
      const reportRows = this.getReportRows();
      if (reportRows.length === 0) {
        alert("No data available for export");
        return;
      }
      const doc = new E();
      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.text("Weighbridge Analytics Report", 14, 15);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Weighbridge ID: ${this.wbId}`, 14, 22);
      doc.text(`Date Range: ${this.getDateRangeLabel()}`, 14, 28);
      doc.text(`Generated on: ${(/* @__PURE__ */ new Date()).toLocaleString()}`, 14, 34);
      let sumNetWeight = 0;
      let sumGrossWeight = 0;
      const formattedRows = reportRows.map((row) => {
        const netWt = parseFloat(row["netWeight"].toString().replace(/\./g, "").replace(/,/g, ".")) || 0;
        const grossWt = parseFloat(row["grossWeight"].toString().replace(/\./g, "").replace(/,/g, ".")) || 0;
        sumNetWeight += netWt;
        sumGrossWeight += grossWt;
        return [
          row["wbId"] || "N/A",
          row["date"] || "N/A",
          row["time"] || "N/A",
          this.formatNumberForPDF(netWt),
          this.formatNumberForPDF(grossWt)
        ];
      });
      formattedRows.push([
        "",
        "",
        "TOTALS",
        this.formatNumberForPDF(sumNetWeight),
        this.formatNumberForPDF(sumGrossWeight)
      ]);
      formattedRows.push(["", "", "Total Records", reportRows.length.toString(), ""]);
      autoTable(doc, {
        head: [["WB ID", "Date", "Time", "Net Weight (kg)", "Gross Weight (kg)"]],
        body: formattedRows,
        startY: 40,
        margin: { left: 10, right: 10 },
        tableWidth: "auto",
        styles: {
          fontSize: 8,
          cellPadding: 4,
          font: "helvetica",
          lineWidth: 0.1,
          overflow: "linebreak",
          halign: "center"
        },
        columnStyles: {
          0: { cellWidth: 25, halign: "center" },
          1: { cellWidth: 25, halign: "center" },
          2: { cellWidth: 20, halign: "center" },
          3: { cellWidth: 30, halign: "right" },
          4: { cellWidth: 30, halign: "right" }
        },
        headStyles: {
          fillColor: [18, 46, 82],
          textColor: 255,
          fontStyle: "bold",
          halign: "center"
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        }
      });
      const fileName = `Weighbridge_Report_${this.getDateRangeLabel().replace(/ /g, "_")}_${(/* @__PURE__ */ new Date()).getTime()}.pdf`;
      doc.save(fileName);
      console.log("\u2705 Report exported to PDF successfully");
    } catch (err) {
      console.error("\u274C Error exporting report to PDF", err);
      alert("Error exporting report to PDF");
    }
  }
  /**
   * Get report rows from trend data
   */
  getReportRows() {
    const reportRows = [];
    if (this.netTrendChartData.labels && this.netTrendChartData.datasets.length > 0) {
      const labels = this.netTrendChartData.labels;
      const netWeightData = this.netTrendChartData.datasets[0].data;
      labels.forEach((label, index) => {
        reportRows.push({
          "wbId": this.wbId,
          "date": label,
          "time": "",
          "netWeight": netWeightData[index] || 0,
          "grossWeight": 0
          // We don't have gross weight in the current implementation
        });
      });
    }
    return reportRows;
  }
  /**
   * Helper method to format numbers with dots for thousands and optional decimals
   */
  formatNumberWithUnits(num) {
    const cleanNum = num.toString().replace(/\./g, "").replace(/,/g, ".").replace(/[^\d.-]/g, "");
    const numberValue = parseFloat(cleanNum);
    if (isNaN(numberValue))
      return "0";
    if (Math.abs(numberValue) >= 1e6) {
      const millions = numberValue / 1e6;
      const formatted = millions % 1 === 0 ? Math.floor(millions).toString() : millions.toFixed(2).replace(".", ",");
      const parts = formatted.split(",");
      if (parts[0].length > 3) {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
      return parts.join(",") + " M";
    }
    if (Math.abs(numberValue) >= 1e3) {
      const formatted = numberValue % 1 === 0 ? Math.floor(numberValue).toString() : numberValue.toFixed(2).replace(".", ",");
      const parts = formatted.split(",");
      if (parts[0].length > 3) {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
      return parts.join(",") + " K";
    }
    if (numberValue % 1 === 0) {
      return Math.floor(numberValue).toString();
    } else {
      return numberValue.toFixed(2).replace(".", ",");
    }
  }
  /**
   * Helper method to format individual weight values (no units for individual rows)
   */
  formatWeightSimple(weight) {
    if (!weight && weight !== 0)
      return "0";
    const cleanWeight = weight.toString().replace(/\./g, "").replace(/,/g, ".").replace(/[^\d.-]/g, "");
    const weightNum = parseFloat(cleanWeight);
    if (isNaN(weightNum))
      return "0";
    if (weightNum % 1 === 0) {
      const intPart = Math.floor(Math.abs(weightNum)).toString();
      const sign = weightNum < 0 ? "-" : "";
      if (intPart.length > 3) {
        return sign + intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
      return sign + intPart;
    }
    const formatted = weightNum.toFixed(2).replace(".", ",");
    const parts = formatted.split(",");
    if (parts[0].replace("-", "").length > 3) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return parts.join(",");
  }
  /**
   * Helper method to format numbers for PDF display
   */
  formatNumberForPDF(num) {
    return num.toLocaleString("en-US", {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
      useGrouping: true
    });
  }
  /**
   * Get date range label for file names and reports
   */
  getDateRangeLabel() {
    if (!this.startDate && !this.endDate)
      return "AllDates";
    if (this.startDate === this.endDate)
      return this.startDate;
    return `${this.startDate}_to_${this.endDate}`;
  }
  static \u0275fac = function WeighbridgeChartsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WeighbridgeChartsComponent)(\u0275\u0275directiveInject(SmcService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WeighbridgeChartsComponent, selectors: [["app-weighbridge-charts"]], decls: 15, vars: 6, consts: [[1, "charts-container"], [1, "controls"], [1, "control-group"], ["for", "wbId"], ["id", "wbId", "type", "text", "placeholder", "Enter WB ID", 1, "input-field", 3, "ngModelChange", "ngModel"], [1, "load-btn", 3, "click"], ["class", "date-controls", 4, "ngIf"], ["class", "loading", 4, "ngIf"], ["class", "error", 4, "ngIf"], ["class", "summary-cards", 4, "ngIf"], ["class", "charts-grid", 4, "ngIf"], [1, "date-controls"], [1, "date-input-group"], ["type", "date", 1, "input-field", 3, "ngModelChange", "change", "ngModel"], [1, "period-buttons"], [3, "click"], [1, "report-buttons"], ["title", "Download report as Excel", 1, "report-btn", "excel-btn", 3, "click"], [1, "btn-icon"], ["title", "Download report as PDF", 1, "report-btn", "pdf-btn", 3, "click"], [1, "loading"], [1, "error"], [1, "retry-btn", 3, "click"], [1, "summary-cards"], [1, "summary-card"], [1, "card-icon"], [1, "card-content"], [1, "card-value"], [1, "card-label"], [1, "card-period"], [1, "charts-grid"], [1, "chart-card"], [1, "chart-container"], ["class", "no-data-message", 4, "ngIf"], ["baseChart", "", 3, "data", "options", "type", 4, "ngIf"], [1, "chart-card", "timeframe-chart"], [1, "timeframe-header"], [1, "timeframe-controls"], [1, "timeframe-dropdown"], ["for", "timeframe"], ["id", "timeframe", 1, "timeframe-select", 3, "ngModelChange", "change", "ngModel"], ["value", "WEEKLY"], ["value", "MONTHLY"], ["value", "QUARTERLY"], ["value", "HALF_YEARLY"], ["value", "YEARLY"], ["class", "timeframe-dropdown", 4, "ngIf"], [1, "timeframe-date-range"], [1, "date-range-label"], [1, "timeframe-actions"], [1, "export-btn", 3, "click", "disabled"], ["class", "pdf-export-dialog-overlay", 3, "click", 4, "ngIf"], ["class", "timeframe-tabs", 4, "ngIf"], ["class", "timeframe-summary", 4, "ngIf"], [1, "no-data-message"], ["baseChart", "", 3, "data", "options", "type"], ["for", "secondary-filter"], ["id", "secondary-filter", 1, "timeframe-select", 3, "ngModelChange", "change", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [1, "pdf-export-dialog-overlay", 3, "click"], [1, "pdf-export-dialog", 3, "click"], [1, "dialog-header"], [1, "close-btn", 3, "click"], [1, "dialog-content"], ["for", "pdf-start-date"], ["id", "pdf-start-date", "type", "date", 1, "input-field", 3, "ngModelChange", "ngModel"], ["for", "pdf-end-date"], ["id", "pdf-end-date", "type", "date", 1, "input-field", 3, "ngModelChange", "ngModel"], [1, "dialog-footer"], [1, "cancel-btn", 3, "click"], [1, "export-pdf-btn", 3, "click"], [1, "timeframe-tabs"], [1, "tab-buttons"], [1, "tab-btn", 3, "click"], ["class", "tab-content", 4, "ngIf"], [1, "tab-content"], [1, "data-table-container"], [1, "data-table"], [3, "highlight", 4, "ngFor", "ngForOf"], [1, "details-container"], [1, "details-grid"], [1, "detail-item"], [1, "detail-label"], [1, "detail-value"], [1, "timeframe-summary"], [1, "timeframe-summary-item"], [1, "summary-label"], [1, "summary-value"]], template: function WeighbridgeChartsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2");
      \u0275\u0275text(2, "Weighbridge Analytics Dashboard");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 1)(4, "div", 2)(5, "label", 3);
      \u0275\u0275text(6, "Weighbridge ID:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function WeighbridgeChartsComponent_Template_input_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.wbId, $event) || (ctx.wbId = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "button", 5);
      \u0275\u0275listener("click", function WeighbridgeChartsComponent_Template_button_click_8_listener() {
        return ctx.loadAllCharts();
      });
      \u0275\u0275text(9, "Load Data");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(10, WeighbridgeChartsComponent_div_10_Template, 29, 12, "div", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275template(11, WeighbridgeChartsComponent_div_11_Template, 2, 0, "div", 7)(12, WeighbridgeChartsComponent_div_12_Template, 7, 1, "div", 8)(13, WeighbridgeChartsComponent_div_13_Template, 37, 5, "div", 9)(14, WeighbridgeChartsComponent_div_14_Template, 42, 11, "div", 10);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.wbId);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.summaryData);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.summaryData);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && !ctx.error);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, NgChartsModule, BaseChartDirective], styles: ["\n\n.charts-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  background: #f8f9fa;\n  min-height: 100vh;\n}\n.controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n  align-items: end;\n}\n.control-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.date-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 15px;\n  align-items: end;\n  flex-wrap: wrap;\n}\n.date-input-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.date-input-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 14px;\n}\n.period-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.period-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border: 1px solid #ddd;\n  background: white;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n}\n.period-buttons[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: #007bff;\n  color: white;\n  border-color: #007bff;\n}\n.input-field[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n}\n.load-btn[_ngcontent-%COMP%], \n.retry-btn[_ngcontent-%COMP%] {\n  background: #007bff;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n}\n.load-btn[_ngcontent-%COMP%]:hover, \n.retry-btn[_ngcontent-%COMP%]:hover {\n  background: #0056b3;\n}\n.summary-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 20px;\n  margin-bottom: 20px;\n}\n.summary-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  padding: 20px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  border-left: 4px solid #007bff;\n  display: flex;\n  gap: 15px;\n}\n.card-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.card-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 10px 0;\n  color: #333;\n  font-size: 16px;\n}\n.card-value[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: bold;\n  color: #007bff;\n  margin-bottom: 5px;\n}\n.card-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #666;\n  margin-bottom: 10px;\n}\n.card-period[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n  margin-top: 5px;\n  font-style: italic;\n}\n.charts-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));\n  gap: 20px;\n}\n.chart-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.chart-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 15px 0;\n  color: #122e52;\n  font-size: 16px;\n}\n.chart-container[_ngcontent-%COMP%] {\n  position: relative;\n  height: 300px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.no-data-message[_ngcontent-%COMP%] {\n  color: #999;\n  font-size: 16px;\n  font-weight: 500;\n  text-align: center;\n  padding: 40px 20px;\n}\n.timeframe-chart[_ngcontent-%COMP%] {\n  grid-column: span 2;\n}\n.timeframe-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 15px;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n.timeframe-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  flex-wrap: wrap;\n}\n.timeframe-dropdown[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.timeframe-dropdown[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: bold;\n  color: #555;\n}\n.timeframe-select[_ngcontent-%COMP%] {\n  padding: 6px 10px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n  background: white;\n  min-width: 120px;\n}\n.timeframe-date-range[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  background: #e9ecef;\n  border-radius: 4px;\n  border: 1px solid #dee2e6;\n}\n.date-range-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #495057;\n  font-weight: 500;\n}\n.timeframe-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.export-btn[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  background: #28a745;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n}\n.export-btn[_ngcontent-%COMP%]:disabled {\n  background: #6c757d;\n  cursor: not-allowed;\n}\n.pdf-export-dialog-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.pdf-export-dialog[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);\n  max-width: 500px;\n  width: 90%;\n  overflow: hidden;\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px;\n  border-bottom: 1px solid #e0e0e0;\n  background: #f8f9fa;\n}\n.dialog-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #333;\n  font-size: 18px;\n}\n.close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #666;\n  padding: 0;\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  color: #333;\n}\n.dialog-content[_ngcontent-%COMP%] {\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n.dialog-content[_ngcontent-%COMP%]   .date-input-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.dialog-content[_ngcontent-%COMP%]   .date-input-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #333;\n  font-size: 14px;\n}\n.dialog-content[_ngcontent-%COMP%]   .input-field[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n}\n.dialog-footer[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  padding: 15px 20px;\n  border-top: 1px solid #e0e0e0;\n  background: #f8f9fa;\n  justify-content: flex-end;\n}\n.cancel-btn[_ngcontent-%COMP%], \n.export-pdf-btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n}\n.cancel-btn[_ngcontent-%COMP%] {\n  background: #e0e0e0;\n  color: #333;\n}\n.cancel-btn[_ngcontent-%COMP%]:hover {\n  background: #d0d0d0;\n}\n.export-pdf-btn[_ngcontent-%COMP%] {\n  background: #007bff;\n  color: white;\n}\n.export-pdf-btn[_ngcontent-%COMP%]:hover {\n  background: #0056b3;\n}\n.timeframe-tabs[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.tab-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-bottom: 15px;\n  flex-wrap: wrap;\n}\n.tab-btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: 1px solid #ddd;\n  background: #f8f9fa;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.tab-btn.active[_ngcontent-%COMP%] {\n  background: #007bff;\n  color: white;\n  border-color: #007bff;\n}\n.tab-content[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border-radius: 4px;\n  padding: 15px;\n}\n.data-table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 12px;\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #007bff;\n  color: white;\n  padding: 8px;\n  text-align: left;\n  font-weight: bold;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 8px;\n  border-bottom: 1px solid #ddd;\n}\n.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f0f8ff;\n}\n.data-table[_ngcontent-%COMP%]   tr.highlight[_ngcontent-%COMP%] {\n  background: #fff3cd;\n}\n.details-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 15px;\n}\n.detail-item[_ngcontent-%COMP%] {\n  background: white;\n  padding: 15px;\n  border-radius: 4px;\n  border-left: 4px solid #17a2b8;\n}\n.detail-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #666;\n  text-transform: uppercase;\n  margin-bottom: 5px;\n}\n.detail-value[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: bold;\n  color: #333;\n}\n.timeframe-summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 15px;\n  margin-top: 20px;\n  padding: 15px;\n  background: #f8f9fa;\n  border-radius: 6px;\n  border-left: 4px solid #28a745;\n}\n.timeframe-summary-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.summary-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #666;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.summary-value[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: bold;\n  color: #333;\n}\n.loading[_ngcontent-%COMP%] {\n  color: #007bff;\n  padding: 20px;\n  text-align: center;\n  background: white;\n  border-radius: 8px;\n  margin: 20px 0;\n}\n.error[_ngcontent-%COMP%] {\n  color: #dc3545;\n  padding: 20px;\n  background: #f8d7da;\n  border: 1px solid #f5c6cb;\n  border-radius: 8px;\n  margin: 20px 0;\n  text-align: center;\n}\n@media (max-width: 768px) {\n  .charts-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .timeframe-chart[_ngcontent-%COMP%] {\n    grid-column: span 1;\n  }\n  .chart-card[_ngcontent-%COMP%] {\n    min-width: unset;\n  }\n  .controls[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .date-controls[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .period-buttons[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .summary-cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .timeframe-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .timeframe-controls[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-direction: column;\n    align-items: stretch;\n    gap: 10px;\n  }\n  .timeframe-dropdown[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .timeframe-select[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n  .timeframe-date-range[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: center;\n  }\n  .timeframe-summary[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .tab-buttons[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .tab-btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .data-table[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .details-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=weighbridge-charts.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WeighbridgeChartsComponent, [{
    type: Component,
    args: [{ standalone: true, imports: [CommonModule, FormsModule, NgChartsModule], selector: "app-weighbridge-charts", template: `
    <div class="charts-container">
      <h2>Weighbridge Analytics Dashboard</h2>

      <div class="controls">
        <div class="control-group">
          <label for="wbId">Weighbridge ID:</label>
          <input 
            id="wbId" 
            type="text" 
            [(ngModel)]="wbId" 
            placeholder="Enter WB ID"
            class="input-field"
          >
          <button (click)="loadAllCharts()" class="load-btn">Load Data</button>
        </div>
        
        <div class="date-controls" *ngIf="summaryData">
          <div class="date-input-group">
            <label>From Date:</label>
            <input 
              type="date" 
              [(ngModel)]="startDate" 
              (change)="onDateChange()"
              class="input-field"
            >
          </div>
          <div class="date-input-group">
            <label>To Date:</label>
            <input 
              type="date" 
              [(ngModel)]="endDate" 
              (change)="onDateChange()"
              class="input-field"
            >
          </div>
          <div class="period-buttons">
            <button (click)="setPeriod('today')" [class.active]="selectedPeriod === 'today'">Today</button>
            <button (click)="setPeriod('yesterday')" [class.active]="selectedPeriod === 'yesterday'">Yesterday</button>
            <button (click)="setPeriod('week')" [class.active]="selectedPeriod === 'week'">This Week</button>
            <button (click)="setPeriod('month')" [class.active]="selectedPeriod === 'month'">This Month</button>
            <button (click)="setPeriod('custom')" [class.active]="selectedPeriod === 'custom'">Custom</button>
          </div>

          <!-- Report Buttons -->
          <div class="report-buttons">
            <button (click)="exportReportToExcel()" class="report-btn excel-btn" title="Download report as Excel">
              <span class="btn-icon">\u{1F4CA}</span> Export Excel Report
            </button>
            <button (click)="exportReportToPDF()" class="report-btn pdf-btn" title="Download report as PDF">
              <span class="btn-icon">\u{1F4C4}</span> Export PDF Report
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="loading" class="loading">Loading chart data...</div>
      
      <div *ngIf="error" class="error">
        <h3>Failed to load chart data</h3>
        <p>{{ errorMessage }}</p>
        <button (click)="loadAllCharts()" class="retry-btn">Retry</button>
      </div>

      <div *ngIf="summaryData" class="summary-cards">
       <div class="summary-card">
          <div class="card-icon">\u{1F4CA}</div>
          <div class="card-content">
            <h3>Total Net Weight (All Time)</h3>
            <div class="card-value">{{ formatWeight(allTimeNetWeight) }}</div>
            <div class="card-label">Cumulative weight since data start</div>
            <div class="card-period">Nov 21, 2025 to Current</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon">\u2696\uFE0F</div>
          <div class="card-content">
            <h3>Net Weight</h3>
            <div class="card-value">{{ formatWeight(summaryData.totalNetWeight) }}</div>
            <div class="card-label">Weight for selected period</div>
            <div class="card-period">{{ getPeriodLabel() }}</div>
          </div>
        </div>

        <div class="summary-card">
          <div class="card-icon">\u{1F6E3}\uFE0F</div>
          <div class="card-content">
            <h3>Total Trips</h3>
            <div class="card-value">{{ summaryData.totalTrips || 0 }}</div>
            <div class="card-label">Number of trips</div>
            <div class="card-period">{{ getPeriodLabel() }}</div>
          </div>
        </div>

       
      </div>

      <div class="charts-grid" *ngIf="!loading && !error">
        <div class="chart-card">
          <h3>Monthly/Daily Net Weight Trend</h3>
          <div class="chart-container">
            <div *ngIf="!netTrendChartData.labels || netTrendChartData.labels.length === 0" class="no-data-message">
              No data available for the selected period
            </div>
            <canvas 
              *ngIf="netTrendChartData.labels && netTrendChartData.labels.length > 0"
              baseChart
              [data]="netTrendChartData"
              [options]="getWeightTrendChartOptions('Day')"
              [type]="barChartType"
            >
            </canvas>
          </div>
        </div>

        <div class="chart-card">
          <h3>Last 24 Hours Trend</h3>
          <div class="chart-container">
            <div *ngIf="!last24ChartData.labels || last24ChartData.labels.length === 0" class="no-data-message">
              No data available for the selected period
            </div>
            <canvas 
              *ngIf="last24ChartData.labels && last24ChartData.labels.length > 0"
              baseChart
              [data]="last24ChartData"
              [options]="getWeightTrendChartOptions('Hour')"
              [type]="barChartType"
            >
            </canvas>
          </div>
        </div>

        <!-- Enhanced Timeframe Analysis Chart -->
        <div class="chart-card timeframe-chart">
          <div class="timeframe-header">
            <h3>Timeframe Analysis</h3>
            <div class="timeframe-controls">
              <div class="timeframe-dropdown">
                <label for="timeframe">Timeframe:</label>
                <select 
                  id="timeframe" 
                  [(ngModel)]="selectedTimeframe" 
                  (change)="onTimeframeChange()"
                  class="timeframe-select"
                >
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="QUARTERLY">Quarterly</option>
                  <option value="HALF_YEARLY">Half-Yearly</option>
                  <option value="YEARLY">Yearly</option>
                </select>
              </div>
              <div class="timeframe-dropdown" *ngIf="secondaryFilterOptions.length > 0">
                <label for="secondary-filter">
                  {{ selectedTimeframe === 'WEEKLY' ? 'Month' : selectedTimeframe === 'YEARLY' ? 'Fiscal Year' : 'Year' }}:
                </label>
                <select 
                  id="secondary-filter" 
                  [(ngModel)]="selectedSecondaryFilter" 
                  (change)="onSecondaryFilterChange()"
                  class="timeframe-select"
                >
                  <option *ngFor="let option of secondaryFilterOptions" [value]="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
              <div class="timeframe-date-range">
                <span class="date-range-label">{{ getTimeframeDateRange() }}</span>
              </div>
              <div class="timeframe-actions">
                <button (click)="openPdfExportDialog()" class="export-btn" [disabled]="!timeframeChartData.labels?.length">
                  \u{1F4C4} Export to PDF
                </button>
              </div>
            </div>
          </div>
          
          <!-- PDF Export Dialog -->
          <div *ngIf="showPdfExportDialog" class="pdf-export-dialog-overlay" (click)="closePdfExportDialog($event)">
            <div class="pdf-export-dialog" (click)="$event.stopPropagation()">
              <div class="dialog-header">
                <h3>Export to PDF</h3>
                <button class="close-btn" (click)="closePdfExportDialog()">\xD7</button>
              </div>
              <div class="dialog-content">
                <div class="date-input-group">
                  <label for="pdf-start-date">From Date:</label>
                  <input 
                    id="pdf-start-date"
                    type="date" 
                    [(ngModel)]="pdfExportStartDate"
                    class="input-field"
                  >
                </div>
                <div class="date-input-group">
                  <label for="pdf-end-date">To Date:</label>
                  <input 
                    id="pdf-end-date"
                    type="date" 
                    [(ngModel)]="pdfExportEndDate"
                    class="input-field"
                  >
                </div>
              </div>
              <div class="dialog-footer">
                <button (click)="closePdfExportDialog()" class="cancel-btn">Cancel</button>
                <button (click)="generateAndExportPDF()" class="export-pdf-btn">Generate PDF</button>
              </div>
            </div>
          </div>
          
          <!-- Timeframe Data Tabs -->
          <div class="timeframe-tabs" *ngIf="timeframeData?.length">
            <div class="tab-buttons">
              <button 
                (click)="activeTab = 'chart'" 
                [class.active]="activeTab === 'chart'"
                class="tab-btn"
              >
                \u{1F4C8} Chart View
              </button>
              <button 
                (click)="activeTab = 'table'" 
                [class.active]="activeTab === 'table'"
                class="tab-btn"
              >
                \u{1F4CB} Data Table
              </button>
              <button 
                (click)="activeTab = 'details'" 
                [class.active]="activeTab === 'details'"
                class="tab-btn"
              >
                \u{1F50D} Details
              </button>
            </div>
            
            <!-- Chart Tab -->
            <div class="tab-content" *ngIf="activeTab === 'chart'">
              <div class="chart-container">
                <div *ngIf="!timeframeChartData.labels || timeframeChartData.labels.length === 0" class="no-data-message">
                  No data available for the selected timeframe
                </div>
                <canvas 
                  *ngIf="timeframeChartData.labels && timeframeChartData.labels.length > 0"
                  baseChart
                  [data]="timeframeChartData"
                  [options]="getTimeframeChartOptions()"
                  [type]="barChartType"
                >
                </canvas>
              </div>
            </div>
            
            <!-- Table Tab -->
            <div class="tab-content" *ngIf="activeTab === 'table'">
              <div class="data-table-container">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Period</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Total Trips</th>
                      <th>Total Net Weight</th>
                      <th>Total Gross Weight</th>
                      <th>Avg Net Weight</th>
                      <th>Avg Gross Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let item of timeframeData" [class.highlight]="item.totalNetWeight === maxWeight">
                      <td>{{ item.periodName }}</td>
                      <td>{{ formatDate(item.startDate) }}</td>
                      <td>{{ formatDate(item.endDate) }}</td>
                      <td>{{ item.totalEntries }}</td>
                      <td>{{ formatWeight(item.totalNetWeight) }}</td>
                      <td>{{ formatWeight(item.totalGrossWeight) }}</td>
                      <td>{{ formatWeight(item.averageNetWeight) }}</td>
                      <td>{{ formatWeight(item.averageGrossWeight) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <!-- Details Tab -->
            <div class="tab-content" *ngIf="activeTab === 'details'">
              <div class="details-container">
                <div class="details-grid">
                  <div class="detail-item">
                    <div class="detail-label">Total Periods Analyzed</div>
                    <div class="detail-value">{{ timeframeData.length || 0 }}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Date Range Covered</div>
                    <div class="detail-value">{{ getDateRangeCovered() }}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Highest Weight Period</div>
                    <div class="detail-value">{{ highestWeightPeriod?.periodName || 'N/A' }}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Highest Weight Value</div>
                    <div class="detail-value">{{ formatWeight(highestWeightPeriod?.totalNetWeight || 0) }}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Average Period Duration</div>
                    <div class="detail-value">{{ calculateAverageDuration() }} days</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Data Consistency</div>
                    <div class="detail-value">{{ calculateDataConsistency() }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Timeframe Summary -->
          <div class="timeframe-summary" *ngIf="timeframeData?.length">
            <div class="timeframe-summary-item">
              <span class="summary-label">Total Periods</span>
              <span class="summary-value">{{ timeframeData.length }}</span>
            </div>
            <div class="timeframe-summary-item">
              <span class="summary-label">Total Net Weight</span>
              <span class="summary-value">{{ formatWeight(calculateTotalNetWeight()) }}</span>
            </div>
            <div class="timeframe-summary-item">
              <span class="summary-label">Total Gross Weight</span>
              <span class="summary-value">{{ formatWeight(calculateTotalGrossWeight()) }}</span>
            </div>
            <div class="timeframe-summary-item">
              <span class="summary-label">Total Trips</span>
              <span class="summary-value">{{ calculateTotalTrips() }}</span>
            </div>
            <div class="timeframe-summary-item">
              <span class="summary-label">Avg Net Weight/Trip</span>
              <span class="summary-value">{{ formatWeight(calculateAvgNetWeightPerTrip()) }}</span>
            </div>
            <div class="timeframe-summary-item">
              <span class="summary-label">Period with Max Weight</span>
              <span class="summary-value">{{ (highestWeightPeriod?.periodName || '').split(':')[0] || 'N/A' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;e6aaa2750445eb1919c5579321e8ad894c2287690632c2aa8882484ce8a8c5cd;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/admin/smc-dashboard/weighbridge-charts.component.ts */\n.charts-container {\n  padding: 20px;\n  background: #f8f9fa;\n  min-height: 100vh;\n}\n.controls {\n  display: flex;\n  gap: 20px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n  align-items: end;\n}\n.control-group {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.date-controls {\n  display: flex;\n  gap: 15px;\n  align-items: end;\n  flex-wrap: wrap;\n}\n.date-input-group {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.date-input-group label {\n  font-weight: bold;\n  font-size: 14px;\n}\n.period-buttons {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.period-buttons button {\n  padding: 6px 12px;\n  border: 1px solid #ddd;\n  background: white;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n}\n.period-buttons button.active {\n  background: #007bff;\n  color: white;\n  border-color: #007bff;\n}\n.input-field {\n  padding: 8px 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n}\n.load-btn,\n.retry-btn {\n  background: #007bff;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n}\n.load-btn:hover,\n.retry-btn:hover {\n  background: #0056b3;\n}\n.summary-cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 20px;\n  margin-bottom: 20px;\n}\n.summary-card {\n  background: white;\n  border-radius: 8px;\n  padding: 20px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  border-left: 4px solid #007bff;\n  display: flex;\n  gap: 15px;\n}\n.card-icon {\n  font-size: 2rem;\n}\n.card-content h3 {\n  margin: 0 0 10px 0;\n  color: #333;\n  font-size: 16px;\n}\n.card-value {\n  font-size: 2rem;\n  font-weight: bold;\n  color: #007bff;\n  margin-bottom: 5px;\n}\n.card-label {\n  font-size: 14px;\n  color: #666;\n  margin-bottom: 10px;\n}\n.card-period {\n  font-size: 12px;\n  color: #666;\n  margin-top: 5px;\n  font-style: italic;\n}\n.charts-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));\n  gap: 20px;\n}\n.chart-card {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.chart-card h3 {\n  margin: 0 0 15px 0;\n  color: #122e52;\n  font-size: 16px;\n}\n.chart-container {\n  position: relative;\n  height: 300px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.no-data-message {\n  color: #999;\n  font-size: 16px;\n  font-weight: 500;\n  text-align: center;\n  padding: 40px 20px;\n}\n.timeframe-chart {\n  grid-column: span 2;\n}\n.timeframe-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 15px;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n.timeframe-controls {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  flex-wrap: wrap;\n}\n.timeframe-dropdown {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.timeframe-dropdown label {\n  font-size: 14px;\n  font-weight: bold;\n  color: #555;\n}\n.timeframe-select {\n  padding: 6px 10px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n  background: white;\n  min-width: 120px;\n}\n.timeframe-date-range {\n  padding: 6px 12px;\n  background: #e9ecef;\n  border-radius: 4px;\n  border: 1px solid #dee2e6;\n}\n.date-range-label {\n  font-size: 12px;\n  color: #495057;\n  font-weight: 500;\n}\n.timeframe-actions {\n  display: flex;\n  gap: 10px;\n}\n.export-btn {\n  padding: 6px 12px;\n  background: #28a745;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n}\n.export-btn:disabled {\n  background: #6c757d;\n  cursor: not-allowed;\n}\n.pdf-export-dialog-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.pdf-export-dialog {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);\n  max-width: 500px;\n  width: 90%;\n  overflow: hidden;\n}\n.dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px;\n  border-bottom: 1px solid #e0e0e0;\n  background: #f8f9fa;\n}\n.dialog-header h3 {\n  margin: 0;\n  color: #333;\n  font-size: 18px;\n}\n.close-btn {\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #666;\n  padding: 0;\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  color: #333;\n}\n.dialog-content {\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n.dialog-content .date-input-group {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.dialog-content .date-input-group label {\n  font-weight: 600;\n  color: #333;\n  font-size: 14px;\n}\n.dialog-content .input-field {\n  padding: 8px 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n}\n.dialog-footer {\n  display: flex;\n  gap: 10px;\n  padding: 15px 20px;\n  border-top: 1px solid #e0e0e0;\n  background: #f8f9fa;\n  justify-content: flex-end;\n}\n.cancel-btn,\n.export-pdf-btn {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n}\n.cancel-btn {\n  background: #e0e0e0;\n  color: #333;\n}\n.cancel-btn:hover {\n  background: #d0d0d0;\n}\n.export-pdf-btn {\n  background: #007bff;\n  color: white;\n}\n.export-pdf-btn:hover {\n  background: #0056b3;\n}\n.timeframe-tabs {\n  margin-bottom: 20px;\n}\n.tab-buttons {\n  display: flex;\n  gap: 10px;\n  margin-bottom: 15px;\n  flex-wrap: wrap;\n}\n.tab-btn {\n  padding: 8px 16px;\n  border: 1px solid #ddd;\n  background: #f8f9fa;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.tab-btn.active {\n  background: #007bff;\n  color: white;\n  border-color: #007bff;\n}\n.tab-content {\n  background: #f8f9fa;\n  border-radius: 4px;\n  padding: 15px;\n}\n.data-table-container {\n  overflow-x: auto;\n}\n.data-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 12px;\n}\n.data-table th {\n  background: #007bff;\n  color: white;\n  padding: 8px;\n  text-align: left;\n  font-weight: bold;\n}\n.data-table td {\n  padding: 8px;\n  border-bottom: 1px solid #ddd;\n}\n.data-table tbody tr:hover {\n  background: #f0f8ff;\n}\n.data-table tr.highlight {\n  background: #fff3cd;\n}\n.details-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 15px;\n}\n.detail-item {\n  background: white;\n  padding: 15px;\n  border-radius: 4px;\n  border-left: 4px solid #17a2b8;\n}\n.detail-label {\n  font-size: 11px;\n  color: #666;\n  text-transform: uppercase;\n  margin-bottom: 5px;\n}\n.detail-value {\n  font-size: 14px;\n  font-weight: bold;\n  color: #333;\n}\n.timeframe-summary {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 15px;\n  margin-top: 20px;\n  padding: 15px;\n  background: #f8f9fa;\n  border-radius: 6px;\n  border-left: 4px solid #28a745;\n}\n.timeframe-summary-item {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.summary-label {\n  font-size: 11px;\n  color: #666;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.summary-value {\n  font-size: 14px;\n  font-weight: bold;\n  color: #333;\n}\n.loading {\n  color: #007bff;\n  padding: 20px;\n  text-align: center;\n  background: white;\n  border-radius: 8px;\n  margin: 20px 0;\n}\n.error {\n  color: #dc3545;\n  padding: 20px;\n  background: #f8d7da;\n  border: 1px solid #f5c6cb;\n  border-radius: 8px;\n  margin: 20px 0;\n  text-align: center;\n}\n@media (max-width: 768px) {\n  .charts-grid {\n    grid-template-columns: 1fr;\n  }\n  .timeframe-chart {\n    grid-column: span 1;\n  }\n  .chart-card {\n    min-width: unset;\n  }\n  .controls {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .date-controls {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .period-buttons {\n    justify-content: center;\n  }\n  .summary-cards {\n    grid-template-columns: 1fr;\n  }\n  .timeframe-header {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .timeframe-controls {\n    width: 100%;\n    flex-direction: column;\n    align-items: stretch;\n    gap: 10px;\n  }\n  .timeframe-dropdown {\n    width: 100%;\n  }\n  .timeframe-select {\n    flex: 1;\n  }\n  .timeframe-date-range {\n    width: 100%;\n    text-align: center;\n  }\n  .timeframe-summary {\n    grid-template-columns: 1fr;\n  }\n  .tab-buttons {\n    flex-direction: column;\n  }\n  .tab-btn {\n    width: 100%;\n  }\n  .data-table {\n    font-size: 10px;\n  }\n  .details-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=weighbridge-charts.component.css.map */\n"] }]
  }], () => [{ type: SmcService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WeighbridgeChartsComponent, { className: "WeighbridgeChartsComponent", filePath: "src/app/components/admin/smc-dashboard/weighbridge-charts.component.ts", lineNumber: 948 });
})();
export {
  WeighbridgeChartsComponent
};
//# sourceMappingURL=chunk-HFSDUNMJ.js.map
