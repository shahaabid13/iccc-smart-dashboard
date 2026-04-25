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
  DecimalPipe,
  NgForOf,
  NgIf,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WPHUMBF2.js";
import "./chunk-ETVPICVQ.js";
import "./chunk-YP43Q66R.js";

// src/app/components/admin/smc-dashboard/smc-dashboard.component.ts
function SmcDashboardComponent_ul_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ul", 32)(1, "li")(2, "button", 33);
    \u0275\u0275listener("click", function SmcDashboardComponent_ul_44_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.exportToExcel();
      return \u0275\u0275resetView(ctx_r1.toggleExportDropdown(false));
    });
    \u0275\u0275text(3, "Export as Excel");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "li")(5, "button", 33);
    \u0275\u0275listener("click", function SmcDashboardComponent_ul_44_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.exportToPDF();
      return \u0275\u0275resetView(ctx_r1.toggleExportDropdown(false));
    });
    \u0275\u0275text(6, "Export as PDF");
    \u0275\u0275elementEnd()()();
  }
}
function SmcDashboardComponent_ul_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ul", 32)(1, "li")(2, "button", 33);
    \u0275\u0275listener("click", function SmcDashboardComponent_ul_50_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.exportReportToExcel();
      return \u0275\u0275resetView(ctx_r1.toggleReportDropdown(false));
    });
    \u0275\u0275text(3, "Report as Excel");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "li")(5, "button", 33);
    \u0275\u0275listener("click", function SmcDashboardComponent_ul_50_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.exportReportToPDF();
      return \u0275\u0275resetView(ctx_r1.toggleReportDropdown(false));
    });
    \u0275\u0275text(6, "Report as PDF");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "li")(8, "button", 33);
    \u0275\u0275listener("click", function SmcDashboardComponent_ul_50_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.exportDailyDataReportToPDF();
      return \u0275\u0275resetView(ctx_r1.toggleReportDropdown(false));
    });
    \u0275\u0275text(9, "Daily Data Report (PDF)");
    \u0275\u0275elementEnd()()();
  }
}
function SmcDashboardComponent_div_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 35)(2, "span", 36);
    \u0275\u0275text(3, "Total Records:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 37);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 35)(7, "span", 36);
    \u0275\u0275text(8, "Total Weight:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 37);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 35)(13, "span", 36);
    \u0275\u0275text(14, "Date Range:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 37);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 35)(18, "span", 36);
    \u0275\u0275text(19, "Average Weight:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 37);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.filteredRecords.length);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(11, 4, ctx_r1.getTotalWeight()), " kg");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.getDateRangeLabel());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(22, 6, ctx_r1.getAverageWeight()), " kg");
  }
}
function SmcDashboardComponent_div_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275text(1, "Loading SMC data...");
    \u0275\u0275elementEnd();
  }
}
function SmcDashboardComponent_div_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 39)(1, "h3");
    \u0275\u0275text(2, "Failed to load data");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 40);
    \u0275\u0275listener("click", function SmcDashboardComponent_div_55_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.load());
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
function SmcDashboardComponent_div_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "h3");
    \u0275\u0275text(2, "\u26A0\uFE0F API Connection Issue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Showing fallback data. The live API might be unavailable.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 40);
    \u0275\u0275listener("click", function SmcDashboardComponent_div_56_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.load());
    });
    \u0275\u0275text(6, "Retry Connection");
    \u0275\u0275elementEnd()();
  }
}
function SmcDashboardComponent_div_57_tr_27_Template(rf, ctx) {
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
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "td");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((r_r6.id == null ? null : r_r6.id.slipno) || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r6.vno || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r6.vname || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r6.sname || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r6.tweight || "0");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r6.gweight || "0");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(r_r6.gdate));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r6.nweight || "0");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r6.driver || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(r_r6.edate));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((r_r6.id == null ? null : r_r6.id.wbId) || "-");
  }
}
function SmcDashboardComponent_div_57_div_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46)(1, "button", 47);
    \u0275\u0275listener("click", function SmcDashboardComponent_div_57_div_28_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.previousPage());
    });
    \u0275\u0275text(2, " Previous ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 48);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 47);
    \u0275\u0275listener("click", function SmcDashboardComponent_div_57_div_28_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.nextPage());
    });
    \u0275\u0275text(6, " Next ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage === 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate3(" Page ", ctx_r1.currentPage, " of ", ctx_r1.totalPages, " (", ctx_r1.filteredRecords.length, " total records) ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage === ctx_r1.totalPages);
  }
}
function SmcDashboardComponent_div_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "table", 43)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Slip No");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "VNo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "VName");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "SName");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "TWeight");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "GWeight");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "GDate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th");
    \u0275\u0275text(19, "NWeight");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th");
    \u0275\u0275text(21, "Driver");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "th");
    \u0275\u0275text(23, "EDate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th");
    \u0275\u0275text(25, "WB_ID");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "tbody");
    \u0275\u0275template(27, SmcDashboardComponent_div_57_tr_27_Template, 23, 11, "tr", 44);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(28, SmcDashboardComponent_div_57_div_28_Template, 7, 5, "div", 45);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(27);
    \u0275\u0275property("ngForOf", ctx_r1.paginatedRecords);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.totalPages > 1);
  }
}
function SmcDashboardComponent_div_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275text(1, " No records found for the selected filters. ");
    \u0275\u0275elementEnd();
  }
}
var SmcDashboardComponent = class _SmcDashboardComponent {
  smc;
  records = [];
  filteredRecords = [];
  paginatedRecords = [];
  loading = false;
  error = false;
  errorMessage = "";
  apiUnavailable = false;
  // Filter properties
  selectedPeriod = "week";
  fromDate = "";
  toDate = "";
  // Pagination properties
  currentPage = 1;
  itemsPerPage = 25;
  totalPages = 1;
  // UI dropdown states
  exportDropdownOpen = false;
  reportDropdownOpen = false;
  constructor(smc) {
    this.smc = smc;
    this.initializeDates();
  }
  ngOnInit() {
    this.load();
  }
  initializeDates() {
    const today = /* @__PURE__ */ new Date();
    this.toDate = today.toISOString().split("T")[0];
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    this.fromDate = weekAgo.toISOString().split("T")[0];
  }
  load() {
    this.loading = true;
    this.error = false;
    this.apiUnavailable = false;
    this.errorMessage = "";
    this.smc.getAllWeighbridgeData("SRNGR_LANDFILL_WB1").subscribe({
      next: (res) => {
        this.records = res || [];
        this.applyFilters();
        this.loading = false;
        if (this.records.length === 1 && this.records[0].id?.slipno === 1) {
          this.apiUnavailable = true;
        }
      },
      error: (err) => {
        console.error("SMC load error", err);
        this.error = true;
        this.loading = false;
        this.errorMessage = err?.message || "Unknown error occurred";
        this.records = this.smc["getFallbackData"] ? this.smc["getFallbackData"]() : [];
        this.applyFilters();
      }
    });
  }
  onPeriodChange() {
    const today = /* @__PURE__ */ new Date();
    switch (this.selectedPeriod) {
      case "today":
        this.fromDate = today.toISOString().split("T")[0];
        this.toDate = today.toISOString().split("T")[0];
        break;
      case "week":
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        this.fromDate = weekAgo.toISOString().split("T")[0];
        this.toDate = today.toISOString().split("T")[0];
        break;
      case "month":
        const monthAgo = new Date(today);
        monthAgo.setDate(monthAgo.getDate() - 30);
        this.fromDate = monthAgo.toISOString().split("T")[0];
        this.toDate = today.toISOString().split("T")[0];
        break;
      case "all":
        this.fromDate = "";
        this.toDate = "";
        break;
    }
    this.applyFilters();
  }
  onCustomDateChange() {
    this.selectedPeriod = "custom";
  }
  onPageSizeChange() {
    this.currentPage = 1;
    this.updatePagination();
  }
  applyFilters() {
    this.currentPage = 1;
    if (!this.records.length) {
      this.filteredRecords = [];
      this.updatePagination();
      return;
    }
    this.filteredRecords = this.records.filter((record) => {
      const recordDate = this.getRecordDate(record);
      if (!recordDate)
        return true;
      if (this.fromDate && recordDate < new Date(this.fromDate)) {
        return false;
      }
      if (this.toDate && recordDate > /* @__PURE__ */ new Date(this.toDate + "T23:59:59")) {
        return false;
      }
      return true;
    });
    this.updatePagination();
  }
  resetFilters() {
    this.selectedPeriod = "week";
    this.initializeDates();
    this.applyFilters();
  }
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredRecords.length / this.itemsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRecords = this.filteredRecords.slice(startIndex, endIndex);
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
  getRecordDate(record) {
    const dateStr = record.edate || record.gdate;
    if (!dateStr)
      return null;
    try {
      return new Date(dateStr);
    } catch {
      return null;
    }
  }
  getTotalWeight() {
    return this.filteredRecords.reduce((total, record) => {
      return total + (parseFloat(record.nweight) || 0);
    }, 0);
  }
  getAverageWeight() {
    if (this.filteredRecords.length === 0)
      return 0;
    return this.getTotalWeight() / this.filteredRecords.length;
  }
  getDateRangeLabel() {
    if (!this.fromDate && !this.toDate)
      return "All Dates";
    if (this.fromDate === this.toDate)
      return this.fromDate;
    return `${this.fromDate} to ${this.toDate}`;
  }
  exportToExcel() {
    if (!this.filteredRecords.length) {
      alert("No data to export");
      return;
    }
    try {
      const excelData = this.filteredRecords.map((record) => ({
        "Slip No": record.id?.slipno || "-",
        "Vehicle No": record.vno || "-",
        "Vehicle Name": record.vname || "-",
        "Supplier Name": record.sname || "-",
        "Tare Weight (kg)": record.tweight || "0",
        "Gross Weight (kg)": record.gweight || "0",
        "Gross Date": this.formatDateForExport(record.gdate),
        "Net Weight (kg)": record.nweight || "0",
        "Driver": record.driver || "-",
        "Entry Date": this.formatDateForExport(record.edate),
        "Weighbridge ID": record.id?.wbId || "-"
      }));
      const worksheet = utils.json_to_sheet(excelData);
      const colWidths = [
        { wch: 10 },
        // Slip No
        { wch: 15 },
        // Vehicle No
        { wch: 20 },
        // Vehicle Name
        { wch: 20 },
        // Supplier Name
        { wch: 15 },
        // Tare Weight
        { wch: 15 },
        // Gross Weight
        { wch: 20 },
        // Gross Date
        { wch: 15 },
        // Net Weight
        { wch: 15 },
        // Driver
        { wch: 20 },
        // Entry Date
        { wch: 15 }
        // Weighbridge ID
      ];
      worksheet["!cols"] = colWidths;
      const workbook = {
        Sheets: { "Weighbridge Data": worksheet },
        SheetNames: ["Weighbridge Data"]
      };
      const fileName = `Weighbridge_Data_${this.getDateRangeLabel().replace(/ /g, "_")}_${(/* @__PURE__ */ new Date()).getTime()}.xlsx`;
      writeFileSync(workbook, fileName);
      console.log("Excel export completed successfully");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert("Error exporting to Excel. Please try again.");
    }
  }
  exportToPDF() {
    if (!this.filteredRecords.length) {
      alert("No data to export");
      return;
    }
    try {
      const doc = new E();
      doc.setFontSize(16);
      doc.setTextColor(40);
      doc.text("Weighbridge Data Report", 14, 15);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Date Range: ${this.getDateRangeLabel()}`, 14, 22);
      doc.text(`Total Records: ${this.filteredRecords.length}`, 14, 28);
      doc.text(`Total Net Weight: ${this.getTotalWeight().toLocaleString()} kg`, 14, 34);
      doc.text(`Generated on: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`, 14, 40);
      const tableData = this.filteredRecords.map((record) => [
        record.id?.slipno || "-",
        record.vno || "-",
        record.vname || "-",
        record.sname || "-",
        record.tweight || "0",
        record.gweight || "0",
        this.formatDateForExport(record.gdate),
        record.nweight || "0",
        record.driver || "-",
        this.formatDateForExport(record.edate),
        record.id?.wbId || "-"
      ]);
      const tableColumns = [
        "Slip No",
        "VNo",
        "VName",
        "SName",
        "TWeight",
        "GWeight",
        "GDate",
        "NWeight",
        "Driver",
        "EDate",
        "WB_ID"
      ];
      autoTable(doc, {
        head: [tableColumns],
        body: tableData,
        startY: 45,
        styles: {
          fontSize: 7,
          cellPadding: 2
        },
        headStyles: {
          fillColor: [18, 46, 82],
          textColor: 255,
          fontStyle: "bold"
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        },
        margin: { top: 45 }
      });
      const fileName = `Weighbridge_Report_${this.getDateRangeLabel().replace(/ /g, "_")}_${(/* @__PURE__ */ new Date()).getTime()}.pdf`;
      doc.save(fileName);
      console.log("PDF export completed successfully");
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      alert("Error exporting to PDF. Please try again.");
    }
  }
  // Toggle export dropdown
  toggleExportDropdown(force) {
    if (typeof force === "boolean") {
      this.exportDropdownOpen = force;
    } else {
      this.exportDropdownOpen = !this.exportDropdownOpen;
    }
    if (this.exportDropdownOpen)
      this.reportDropdownOpen = false;
  }
  // Toggle report dropdown
  toggleReportDropdown(force) {
    if (typeof force === "boolean") {
      this.reportDropdownOpen = force;
    } else {
      this.reportDropdownOpen = !this.reportDropdownOpen;
    }
    if (this.reportDropdownOpen)
      this.exportDropdownOpen = false;
  }
  // Generate report rows (limited columns)
  getReportRows() {
    return this.filteredRecords.map((r) => ({
      "Slip No": r.id?.slipno || "-",
      "VNo": r.vno || "-",
      "EDate": this.formatDateForExport(r.edate),
      "GWeight": parseFloat(r.gweight) || 0,
      "NWeight": parseFloat(r.nweight) || 0
    }));
  }
  // Export the limited report to Excel with totals
  // Helper method to format numbers with dots for thousands and optional decimals
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
  // Helper method to format individual weight values (no units for individual rows)
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
  // Updated export to Excel method
  exportReportToExcel() {
    if (!this.filteredRecords.length) {
      alert("No data to export");
      return;
    }
    try {
      const rows = this.getReportRows();
      const header = ["Slip No", "VNo", "EDate", "GWeight", "NWeight"];
      const body = rows.map((r) => [
        r["Slip No"],
        r["VNo"],
        r["EDate"],
        this.formatWeightSimple(r["GWeight"]),
        this.formatWeightSimple(r["NWeight"])
      ]);
      const sumG = rows.reduce((s, x) => {
        const value = parseFloat(x["GWeight"].toString().replace(/\./g, "").replace(/,/g, "."));
        return s + (isNaN(value) ? 0 : value);
      }, 0);
      const sumN = rows.reduce((s, x) => {
        const value = parseFloat(x["NWeight"].toString().replace(/\./g, "").replace(/,/g, "."));
        return s + (isNaN(value) ? 0 : value);
      }, 0);
      const trips = rows.length;
      body.push(["", "", "", "", ""]);
      body.push([
        "",
        "",
        "Totals",
        this.formatNumberWithUnits(sumG),
        this.formatNumberWithUnits(sumN)
      ]);
      body.push(["", "", "Total Trips", trips.toString(), ""]);
      const aoa = [header, ...body];
      const worksheet = utils.aoa_to_sheet(aoa);
      worksheet["!cols"] = [
        { wch: 12 },
        // Slip No
        { wch: 12 },
        // VNo
        { wch: 20 },
        // EDate
        { wch: 18 },
        // GWeight
        { wch: 18 }
        // NWeight
      ];
      const range = utils.decode_range(worksheet["!ref"] || "A1");
      for (let R = 1; R <= range.e.r; R++) {
        const gWeightCell = utils.encode_cell({ r: R, c: 3 });
        const nWeightCell = utils.encode_cell({ r: R, c: 4 });
        if (worksheet[gWeightCell]) {
          worksheet[gWeightCell].z = "#.##0";
        }
        if (worksheet[nWeightCell]) {
          worksheet[nWeightCell].z = "#.##0";
        }
      }
      const workbook = { Sheets: { "Report": worksheet }, SheetNames: ["Report"] };
      const fileName = `SMC_Report_${this.getDateRangeLabel().replace(/ /g, "_")}_${(/* @__PURE__ */ new Date()).getTime()}.xlsx`;
      writeFileSync(workbook, fileName);
    } catch (err) {
      console.error("Error exporting report to Excel", err);
      alert("Error exporting report to Excel");
    }
  }
  // Updated export to PDF method
  exportReportToPDF() {
    if (!this.filteredRecords.length) {
      alert("No data to export");
      return;
    }
    try {
      const rows = this.getReportRows();
      const doc = new E();
      doc.setFontSize(14);
      doc.text("SMC Report", 14, 15);
      doc.setFontSize(10);
      doc.text(`Date Range: ${this.getDateRangeLabel()}`, 14, 22);
      const formatWithCommas = (num) => {
        return num.toLocaleString("en-US", {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
          useGrouping: true
        });
      };
      let sumG = 0;
      let sumN = 0;
      const formattedRows = rows.map((row) => {
        const gWeightStr = row["GWeight"].toString().replace(/,/g, "");
        const gWeight = parseFloat(gWeightStr);
        const formattedGWeight = isNaN(gWeight) ? "0" : formatWithCommas(gWeight);
        sumG += isNaN(gWeight) ? 0 : gWeight;
        const nWeightStr = row["NWeight"].toString().replace(/,/g, "");
        const nWeight = parseFloat(nWeightStr);
        const formattedNWeight = isNaN(nWeight) ? "0" : formatWithCommas(nWeight);
        sumN += isNaN(nWeight) ? 0 : nWeight;
        return {
          slipNo: row["Slip No"],
          vNo: row["VNo"],
          eDate: row["EDate"],
          gWeight: formattedGWeight,
          // Comma-formatted
          nWeight: formattedNWeight
          // Comma-formatted
        };
      });
      const trips = rows.length;
      const tableBody = formattedRows.map((r) => [
        r.slipNo,
        r.vNo,
        r.eDate,
        r.gWeight,
        // Comma-formatted (e.g., "424,410")
        r.nWeight
        // Comma-formatted (e.g., "424,410")
      ]);
      tableBody.push(["", "", "", "", ""]);
      tableBody.push([
        "",
        "",
        "Totals",
        formatWithCommas(sumG),
        // e.g., "424,410,000"
        formatWithCommas(sumN)
        // e.g., "424,410,000"
      ]);
      tableBody.push(["", "", "Total Trips", trips.toString(), ""]);
      autoTable(doc, {
        head: [["Slip No", "VNo", "EDate", "GWeight (kg)", "NWeight (kg)"]],
        body: tableBody,
        startY: 30,
        margin: { left: 10, right: 10 },
        tableWidth: "auto",
        styles: {
          fontSize: 8,
          cellPadding: 5,
          font: "helvetica",
          lineWidth: 0.1,
          overflow: "linebreak",
          halign: "center"
        },
        columnStyles: {
          0: { cellWidth: 20, halign: "center" },
          1: { cellWidth: 45, halign: "center" },
          2: { cellWidth: 45, halign: "center" },
          3: { cellWidth: 45, halign: "right" },
          4: { cellWidth: 45, halign: "right" }
        },
        headStyles: {
          fillColor: [18, 46, 82],
          textColor: 255,
          fontSize: 9,
          fontStyle: "bold",
          lineWidth: 0.1,
          halign: "center"
        },
        bodyStyles: {
          fontSize: 8,
          lineWidth: 0.1
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        didParseCell: function(data) {
          if (data.column.index === 3 || data.column.index === 4) {
            data.cell.styles.halign = "right";
            data.cell.styles.font = "helvetica";
          }
          const lastRows = data.table.body.length;
          const currentRow = data.row.index;
          const isTotalsRow = currentRow >= lastRows - 3;
          if (isTotalsRow) {
            data.cell.styles.fontStyle = "bold";
            if (currentRow === lastRows - 2) {
              data.cell.styles.fillColor = [220, 230, 241];
            }
          }
        }
      });
      const fileName = `SMC_Report_${this.getDateRangeLabel().replace(/ /g, "_")}_${(/* @__PURE__ */ new Date()).getTime()}.pdf`;
      doc.save(fileName);
    } catch (err) {
      console.error("Error exporting report to PDF", err);
      alert("Error exporting report to PDF");
    }
  }
  // Helper method to format numbers with Indian numbering system (10,000 and 1,00,000)
  formatNumberWithCommas(num) {
    const numStr = num.toString();
    const parts = numStr.split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1] || "";
    let reversed = integerPart.split("").reverse().join("");
    let formatted = "";
    for (let i = 0; i < reversed.length; i++) {
      if (i === 3 || i > 3 && (i - 3) % 2 === 0) {
        formatted += ",";
      }
      formatted += reversed[i];
    }
    const result = formatted.split("").reverse().join("");
    return decimalPart ? result + "." + decimalPart : result;
  }
  // Helper method to format dates for export
  formatDateForExport(dateString) {
    if (!dateString)
      return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }).replace(",", "");
    } catch {
      return dateString;
    }
  }
  formatDate(dateString) {
    if (!dateString)
      return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    } catch {
      return dateString;
    }
  }
  // ==================== DAILY DATA REPORT METHOD ====================
  /**
   * Export daily data report to PDF with data organized by date
   * Shows: S.No, Date (day-month-year), Trips, Net Weight
   * One row per date with totals
   */
  exportDailyDataReportToPDF() {
    if (!this.filteredRecords.length) {
      alert("No data to export");
      return;
    }
    try {
      const doc = new E();
      const formatWithCommas = (num) => {
        return num.toLocaleString("en-US", {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
          useGrouping: true
        });
      };
      const formatDateAsDDMMMYYYY = (dateStr) => {
        try {
          const date = new Date(dateStr);
          return date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          });
        } catch {
          return dateStr;
        }
      };
      const recordsByDate = /* @__PURE__ */ new Map();
      this.filteredRecords.forEach((record) => {
        const formattedDate = formatDateAsDDMMMYYYY(record.edate);
        const nWeight = parseFloat(record.nweight.toString().replace(/,/g, "")) || 0;
        if (!recordsByDate.has(formattedDate)) {
          recordsByDate.set(formattedDate, { netWeight: 0, trips: 0, formattedDate });
        }
        const dayData = recordsByDate.get(formattedDate);
        dayData.netWeight += nWeight;
        dayData.trips += 1;
      });
      const sortedDates = Array.from(recordsByDate.keys()).sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateB.getTime() - dateA.getTime();
      });
      let overallNetWeight = 0;
      let overallTrips = 0;
      const tableBody = [];
      sortedDates.forEach((date, index) => {
        const dayData = recordsByDate.get(date);
        overallNetWeight += dayData.netWeight;
        overallTrips += dayData.trips;
        tableBody.push([
          (index + 1).toString(),
          date,
          dayData.trips.toString(),
          formatWithCommas(dayData.netWeight)
        ]);
      });
      tableBody.push([
        "",
        "TOTALS",
        overallTrips.toString(),
        formatWithCommas(overallNetWeight)
      ]);
      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.text("SMC Daily Data Report", 14, 15);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Date Range: ${this.getDateRangeLabel()}`, 14, 22);
      doc.text(`Generated on: ${(/* @__PURE__ */ new Date()).toLocaleString()}`, 14, 28);
      const pageWidth = doc.internal.pageSize.getWidth();
      const tableWidth = 150;
      const leftMargin = (pageWidth - tableWidth) / 2;
      autoTable(doc, {
        head: [["S.No", "Date", "Trips", "Net Weight (kg)"]],
        body: tableBody,
        startY: 35,
        margin: { left: leftMargin, right: leftMargin },
        tableWidth: 150,
        styles: {
          fontSize: 9,
          cellPadding: 5,
          font: "helvetica",
          lineWidth: 0.1,
          overflow: "linebreak",
          halign: "center"
        },
        columnStyles: {
          0: { cellWidth: 25, halign: "center" },
          1: { cellWidth: 45, halign: "center" },
          2: { cellWidth: 25, halign: "center" },
          3: { cellWidth: 55, halign: "right" }
        },
        headStyles: {
          fillColor: [18, 46, 82],
          textColor: 255,
          fontSize: 9,
          fontStyle: "bold",
          lineWidth: 0.1,
          halign: "center"
        },
        bodyStyles: {
          fontSize: 9,
          lineWidth: 0.1
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        didParseCell: function(data) {
          if (data.column.index === 3) {
            data.cell.styles.halign = "right";
          }
          if (data.row.index === data.table.body.length - 1) {
            data.cell.styles.fontStyle = "bold";
            data.cell.styles.fillColor = [220, 230, 241];
          }
        }
      });
      const pageCount = doc.getNumberOfPages();
      const pageHeight = doc.internal.pageSize.getHeight();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: "center" });
      }
      const fileName = `SMC_Daily_Data_Report_${this.getDateRangeLabel().replace(/ /g, "_")}_${(/* @__PURE__ */ new Date()).getTime()}.pdf`;
      doc.save(fileName);
      console.log("\u2705 Daily data report exported to PDF successfully");
    } catch (error) {
      console.error("\u274C Error exporting daily data report to PDF", error);
      alert("Error exporting daily data report to PDF. Please check the console for details.");
    }
  }
  static \u0275fac = function SmcDashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SmcDashboardComponent)(\u0275\u0275directiveInject(SmcService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SmcDashboardComponent, selectors: [["app-smc-dashboard"]], decls: 59, vars: 18, consts: [[1, "smc-dashboard"], [1, "filters-section"], [1, "filter-group"], ["for", "periodFilter"], ["id", "periodFilter", 1, "filter-select", 3, "ngModelChange", "change", "ngModel"], ["value", "today"], ["value", "week"], ["value", "month"], ["value", "all"], ["for", "fromDate"], ["id", "fromDate", "type", "date", 1, "filter-input", 3, "ngModelChange", "change", "ngModel"], ["for", "toDate"], ["id", "toDate", "type", "date", 1, "filter-input", 3, "ngModelChange", "change", "ngModel"], ["for", "itemsPerPage"], ["id", "itemsPerPage", 1, "filter-select", 3, "ngModelChange", "change", "ngModel"], ["value", "10"], ["value", "25"], ["value", "50"], ["value", "100"], [1, "action-buttons"], [1, "btn", "btn-primary", 3, "click"], [1, "dropdown"], [1, "btn", "btn-secondary", 3, "click", "disabled"], [1, "export-icon"], ["class", "dropdown-menu", 4, "ngIf"], [1, "btn", "btn-outline", 3, "click"], ["class", "summary-stats", 4, "ngIf"], ["class", "loading", 4, "ngIf"], ["class", "error", 4, "ngIf"], ["class", "warning", 4, "ngIf"], ["class", "table-container", 4, "ngIf"], ["class", "no-data", 4, "ngIf"], [1, "dropdown-menu"], [1, "dropdown-item", 3, "click"], [1, "summary-stats"], [1, "stat-card"], [1, "stat-label"], [1, "stat-value"], [1, "loading"], [1, "error"], [1, "retry-btn", 3, "click"], [1, "warning"], [1, "table-container"], [1, "smc-table"], [4, "ngFor", "ngForOf"], ["class", "pagination", 4, "ngIf"], [1, "pagination"], [1, "pagination-btn", 3, "click", "disabled"], [1, "pagination-info"], [1, "no-data"]], template: function SmcDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2");
      \u0275\u0275text(2, "Solid Waste Management Dashboard");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 1)(4, "div", 2)(5, "label", 3);
      \u0275\u0275text(6, "Time Period:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "select", 4);
      \u0275\u0275twoWayListener("ngModelChange", function SmcDashboardComponent_Template_select_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedPeriod, $event) || (ctx.selectedPeriod = $event);
        return $event;
      });
      \u0275\u0275listener("change", function SmcDashboardComponent_Template_select_change_7_listener() {
        return ctx.onPeriodChange();
      });
      \u0275\u0275elementStart(8, "option", 5);
      \u0275\u0275text(9, "Today");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "option", 6);
      \u0275\u0275text(11, "This Week");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "option", 7);
      \u0275\u0275text(13, "This Month");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "option", 8);
      \u0275\u0275text(15, "All Data");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(16, "div", 2)(17, "label", 9);
      \u0275\u0275text(18, "From Date:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "input", 10);
      \u0275\u0275twoWayListener("ngModelChange", function SmcDashboardComponent_Template_input_ngModelChange_19_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.fromDate, $event) || (ctx.fromDate = $event);
        return $event;
      });
      \u0275\u0275listener("change", function SmcDashboardComponent_Template_input_change_19_listener() {
        return ctx.onCustomDateChange();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 2)(21, "label", 11);
      \u0275\u0275text(22, "To Date:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "input", 12);
      \u0275\u0275twoWayListener("ngModelChange", function SmcDashboardComponent_Template_input_ngModelChange_23_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.toDate, $event) || (ctx.toDate = $event);
        return $event;
      });
      \u0275\u0275listener("change", function SmcDashboardComponent_Template_input_change_23_listener() {
        return ctx.onCustomDateChange();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div", 2)(25, "label", 13);
      \u0275\u0275text(26, "Items per page:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "select", 14);
      \u0275\u0275twoWayListener("ngModelChange", function SmcDashboardComponent_Template_select_ngModelChange_27_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.itemsPerPage, $event) || (ctx.itemsPerPage = $event);
        return $event;
      });
      \u0275\u0275listener("change", function SmcDashboardComponent_Template_select_change_27_listener() {
        return ctx.onPageSizeChange();
      });
      \u0275\u0275elementStart(28, "option", 15);
      \u0275\u0275text(29, "10");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "option", 16);
      \u0275\u0275text(31, "25");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "option", 17);
      \u0275\u0275text(33, "50");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "option", 18);
      \u0275\u0275text(35, "100");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(36, "div", 19)(37, "button", 20);
      \u0275\u0275listener("click", function SmcDashboardComponent_Template_button_click_37_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275text(38, "Apply Filters");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "div", 21)(40, "button", 22);
      \u0275\u0275listener("click", function SmcDashboardComponent_Template_button_click_40_listener() {
        return ctx.toggleExportDropdown();
      });
      \u0275\u0275elementStart(41, "span", 23);
      \u0275\u0275text(42, "\u{1F4E4}");
      \u0275\u0275elementEnd();
      \u0275\u0275text(43, " Export ");
      \u0275\u0275elementEnd();
      \u0275\u0275template(44, SmcDashboardComponent_ul_44_Template, 7, 0, "ul", 24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "div", 21)(46, "button", 22);
      \u0275\u0275listener("click", function SmcDashboardComponent_Template_button_click_46_listener() {
        return ctx.toggleReportDropdown();
      });
      \u0275\u0275elementStart(47, "span", 23);
      \u0275\u0275text(48, "\u{1F4D1}");
      \u0275\u0275elementEnd();
      \u0275\u0275text(49, " Report ");
      \u0275\u0275elementEnd();
      \u0275\u0275template(50, SmcDashboardComponent_ul_50_Template, 10, 0, "ul", 24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "button", 25);
      \u0275\u0275listener("click", function SmcDashboardComponent_Template_button_click_51_listener() {
        return ctx.resetFilters();
      });
      \u0275\u0275text(52, "Reset");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(53, SmcDashboardComponent_div_53_Template, 23, 8, "div", 26)(54, SmcDashboardComponent_div_54_Template, 2, 0, "div", 27)(55, SmcDashboardComponent_div_55_Template, 7, 1, "div", 28)(56, SmcDashboardComponent_div_56_Template, 7, 0, "div", 29)(57, SmcDashboardComponent_div_57_Template, 29, 2, "div", 30)(58, SmcDashboardComponent_div_58_Template, 2, 0, "div", 31);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedPeriod);
      \u0275\u0275advance(12);
      \u0275\u0275twoWayProperty("ngModel", ctx.fromDate);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.toDate);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.itemsPerPage);
      \u0275\u0275advance(12);
      \u0275\u0275classProp("open", ctx.exportDropdownOpen);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !ctx.filteredRecords.length);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.exportDropdownOpen);
      \u0275\u0275advance();
      \u0275\u0275classProp("open", ctx.reportDropdownOpen);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !ctx.filteredRecords.length);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.reportDropdownOpen);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.filteredRecords.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.apiUnavailable);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.paginatedRecords.length);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && !ctx.filteredRecords.length && !ctx.error);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DecimalPipe], styles: ["\n\n.smc-dashboard[_ngcontent-%COMP%] {\n  padding: 20px;\n  background: #f8f9fa;\n  min-height: 100vh;\n}\n.filters-section[_ngcontent-%COMP%] {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  margin-bottom: 20px;\n  display: flex;\n  gap: 15px;\n  flex-wrap: wrap;\n  align-items: end;\n}\n.filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 12px;\n  color: #555;\n}\n.filter-select[_ngcontent-%COMP%], \n.filter-input[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n  min-width: 120px;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-left: auto;\n  flex-wrap: wrap;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: background-color 0.3s;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #007bff;\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #0056b3;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #6c757d;\n  color: white;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #545b62;\n}\n.btn-outline[_ngcontent-%COMP%] {\n  background: white;\n  color: #007bff;\n  border: 1px solid #007bff;\n}\n.btn-outline[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #007bff;\n  color: white;\n}\n.export-icon[_ngcontent-%COMP%] {\n  margin-right: 5px;\n}\n.dropdown[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n}\n.dropdown[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%] {\n  display: none;\n  position: absolute;\n  right: 0;\n  top: calc(100% + 6px);\n  background: white;\n  min-width: 180px;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);\n  z-index: 2000;\n  padding: 6px 0;\n}\n.dropdown.open[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%] {\n  display: block;\n}\n.dropdown[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  width: 100%;\n  text-align: left;\n  padding: 8px 12px;\n  cursor: pointer;\n  font-size: 14px;\n  color: #333;\n}\n.dropdown[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]:hover {\n  background: #f1f1f1;\n}\n.summary-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 15px;\n  margin-bottom: 20px;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n  margin-bottom: 8px;\n  text-transform: uppercase;\n  font-weight: bold;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: bold;\n  color: #122e52;\n}\n.table-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.smc-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 14px;\n}\n.smc-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.smc-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border: 1px solid #ddd;\n  padding: 12px;\n  text-align: left;\n}\n.smc-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #122e52;\n  color: #fff;\n  position: sticky;\n  top: 0;\n  font-weight: 600;\n}\n.smc-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(even) {\n  background: #f8f9fa;\n}\n.smc-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #e9ecef;\n}\n.pagination[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 15px 20px;\n  background: #f8f9fa;\n  border-top: 1px solid #ddd;\n}\n.pagination-btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: 1px solid #ddd;\n  background: white;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.pagination-btn[_ngcontent-%COMP%]:disabled {\n  background: #f8f9fa;\n  color: #6c757d;\n  cursor: not-allowed;\n}\n.pagination-btn[_ngcontent-%COMP%]:not(:disabled):hover {\n  background: #007bff;\n  color: white;\n  border-color: #007bff;\n}\n.pagination-info[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 14px;\n}\n.loading[_ngcontent-%COMP%] {\n  color: #007bff;\n  padding: 20px;\n  background: #f8f9fa;\n  border-radius: 4px;\n  text-align: center;\n  margin: 20px 0;\n}\n.error[_ngcontent-%COMP%] {\n  color: #dc3545;\n  padding: 20px;\n  background: #f8d7da;\n  border: 1px solid #f5c6cb;\n  border-radius: 4px;\n  margin: 20px 0;\n  text-align: center;\n}\n.warning[_ngcontent-%COMP%] {\n  color: #856404;\n  padding: 20px;\n  background: #fff3cd;\n  border: 1px solid #ffeaa7;\n  border-radius: 4px;\n  margin: 20px 0;\n  text-align: center;\n}\n.retry-btn[_ngcontent-%COMP%] {\n  background: #007bff;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n  margin-top: 10px;\n}\n.retry-btn[_ngcontent-%COMP%]:hover {\n  background: #0056b3;\n}\n.no-data[_ngcontent-%COMP%] {\n  padding: 40px;\n  text-align: center;\n  color: #6c757d;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  margin: 20px 0;\n}\n@media (max-width: 768px) {\n  .filters-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .action-buttons[_ngcontent-%COMP%] {\n    margin-left: 0;\n    justify-content: center;\n  }\n  .pagination[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 10px;\n    text-align: center;\n  }\n  .summary-stats[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .filter-select[_ngcontent-%COMP%], \n   .filter-input[_ngcontent-%COMP%] {\n    min-width: unset;\n  }\n}\n/*# sourceMappingURL=smc-dashboard.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SmcDashboardComponent, [{
    type: Component,
    args: [{ standalone: true, imports: [CommonModule, FormsModule], selector: "app-smc-dashboard", template: `
    <div class="smc-dashboard">
      <h2>Solid Waste Management Dashboard</h2>

      <!-- Filters Section -->
      <div class="filters-section">
        <div class="filter-group">
          <label for="periodFilter">Time Period:</label>
          <select 
            id="periodFilter" 
            [(ngModel)]="selectedPeriod" 
            (change)="onPeriodChange()"
            class="filter-select"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Data</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="fromDate">From Date:</label>
          <input 
            id="fromDate" 
            type="date" 
            [(ngModel)]="fromDate" 
            (change)="onCustomDateChange()"
            class="filter-input"
          >
        </div>

        <div class="filter-group">
          <label for="toDate">To Date:</label>
          <input 
            id="toDate" 
            type="date" 
            [(ngModel)]="toDate" 
            (change)="onCustomDateChange()"
            class="filter-input"
          >
        </div>

        <div class="filter-group">
          <label for="itemsPerPage">Items per page:</label>
          <select 
            id="itemsPerPage" 
            [(ngModel)]="itemsPerPage" 
            (change)="onPageSizeChange()"
            class="filter-select"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div class="action-buttons">
          <button (click)="applyFilters()" class="btn btn-primary">Apply Filters</button>

          <!-- Export dropdown -->
          <div class="dropdown" [class.open]="exportDropdownOpen">
            <button (click)="toggleExportDropdown()" class="btn btn-secondary" [disabled]="!filteredRecords.length">
              <span class="export-icon">\u{1F4E4}</span> Export
            </button>
            <ul class="dropdown-menu" *ngIf="exportDropdownOpen">
              <li><button class="dropdown-item" (click)="exportToExcel(); toggleExportDropdown(false)">Export as Excel</button></li>
              <li><button class="dropdown-item" (click)="exportToPDF(); toggleExportDropdown(false)">Export as PDF</button></li>
            </ul>
          </div>

          <!-- Report dropdown (limited columns + totals) -->
          <div class="dropdown" [class.open]="reportDropdownOpen">
            <button (click)="toggleReportDropdown()" class="btn btn-secondary" [disabled]="!filteredRecords.length">
              <span class="export-icon">\u{1F4D1}</span> Report
            </button>
            <ul class="dropdown-menu" *ngIf="reportDropdownOpen">
              <li><button class="dropdown-item" (click)="exportReportToExcel(); toggleReportDropdown(false)">Report as Excel</button></li>
              <li><button class="dropdown-item" (click)="exportReportToPDF(); toggleReportDropdown(false)">Report as PDF</button></li>
              <li><button class="dropdown-item" (click)="exportDailyDataReportToPDF(); toggleReportDropdown(false)">Daily Data Report (PDF)</button></li>
            </ul>
          </div>

          <button (click)="resetFilters()" class="btn btn-outline">Reset</button>
        </div>
      </div>

      <!-- Summary Stats -->
      <div *ngIf="filteredRecords.length > 0" class="summary-stats">
        <div class="stat-card">
          <span class="stat-label">Total Records:</span>
          <span class="stat-value">{{ filteredRecords.length }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Total Weight:</span>
          <span class="stat-value">{{ getTotalWeight() | number }} kg</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Date Range:</span>
          <span class="stat-value">{{ getDateRangeLabel() }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Average Weight:</span>
          <span class="stat-value">{{ getAverageWeight() | number }} kg</span>
        </div>
      </div>

      <div *ngIf="loading" class="loading">Loading SMC data...</div>
      
      <div *ngIf="error" class="error">
        <h3>Failed to load data</h3>
        <p>{{ errorMessage }}</p>
        <button (click)="load()" class="retry-btn">Retry</button>
      </div>

      <div *ngIf="apiUnavailable" class="warning">
        <h3>\u26A0\uFE0F API Connection Issue</h3>
        <p>Showing fallback data. The live API might be unavailable.</p>
        <button (click)="load()" class="retry-btn">Retry Connection</button>
      </div>

      <!-- Data Table -->
      <div *ngIf="!loading && !error && paginatedRecords.length" class="table-container">
        <table class="smc-table">
          <thead>
            <tr>
              <th>Slip No</th>
              <th>VNo</th>
              <th>VName</th>
              <th>SName</th>
              <th>TWeight</th>
              <th>GWeight</th>
              <th>GDate</th>
              <th>NWeight</th>
              <th>Driver</th>
              <th>EDate</th>
              <th>WB_ID</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of paginatedRecords">
              <td>{{ r.id?.slipno || '-' }}</td>
              <td>{{ r.vno || '-' }}</td>
              <td>{{ r.vname || '-' }}</td>
              <td>{{ r.sname || '-' }}</td>
              <td>{{ r.tweight || '0' }}</td>
              <td>{{ r.gweight || '0' }}</td>
              <td>{{ formatDate(r.gdate) }}</td>
              <td>{{ r.nweight || '0' }}</td>
              <td>{{ r.driver || '-' }}</td>
              <td>{{ formatDate(r.edate) }}</td>
              <td>{{ r.id?.wbId || '-' }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="pagination" *ngIf="totalPages > 1">
          <button 
            (click)="previousPage()" 
            [disabled]="currentPage === 1"
            class="pagination-btn"
          >
            Previous
          </button>
          
          <span class="pagination-info">
            Page {{ currentPage }} of {{ totalPages }} 
            ({{ filteredRecords.length }} total records)
          </span>

          <button 
            (click)="nextPage()" 
            [disabled]="currentPage === totalPages"
            class="pagination-btn"
          >
            Next
          </button>
        </div>
      </div>

      <div *ngIf="!loading && !filteredRecords.length && !error" class="no-data">
        No records found for the selected filters.
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;826a8bfb56bcd83a1bc17eee28024f5b1cbaf5990b46ac22fd440f819960165f;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/admin/smc-dashboard/smc-dashboard.component.ts */\n.smc-dashboard {\n  padding: 20px;\n  background: #f8f9fa;\n  min-height: 100vh;\n}\n.filters-section {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  margin-bottom: 20px;\n  display: flex;\n  gap: 15px;\n  flex-wrap: wrap;\n  align-items: end;\n}\n.filter-group {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.filter-group label {\n  font-weight: bold;\n  font-size: 12px;\n  color: #555;\n}\n.filter-select,\n.filter-input {\n  padding: 8px 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n  min-width: 120px;\n}\n.action-buttons {\n  display: flex;\n  gap: 10px;\n  margin-left: auto;\n  flex-wrap: wrap;\n}\n.btn {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: background-color 0.3s;\n}\n.btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-primary {\n  background: #007bff;\n  color: white;\n}\n.btn-primary:hover:not(:disabled) {\n  background: #0056b3;\n}\n.btn-secondary {\n  background: #6c757d;\n  color: white;\n}\n.btn-secondary:hover:not(:disabled) {\n  background: #545b62;\n}\n.btn-outline {\n  background: white;\n  color: #007bff;\n  border: 1px solid #007bff;\n}\n.btn-outline:hover:not(:disabled) {\n  background: #007bff;\n  color: white;\n}\n.export-icon {\n  margin-right: 5px;\n}\n.dropdown {\n  position: relative;\n  display: inline-block;\n}\n.dropdown .dropdown-menu {\n  display: none;\n  position: absolute;\n  right: 0;\n  top: calc(100% + 6px);\n  background: white;\n  min-width: 180px;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);\n  z-index: 2000;\n  padding: 6px 0;\n}\n.dropdown.open .dropdown-menu {\n  display: block;\n}\n.dropdown .dropdown-item {\n  background: transparent;\n  border: none;\n  width: 100%;\n  text-align: left;\n  padding: 8px 12px;\n  cursor: pointer;\n  font-size: 14px;\n  color: #333;\n}\n.dropdown .dropdown-item:hover {\n  background: #f1f1f1;\n}\n.summary-stats {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 15px;\n  margin-bottom: 20px;\n}\n.stat-card {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n.stat-label {\n  font-size: 12px;\n  color: #666;\n  margin-bottom: 8px;\n  text-transform: uppercase;\n  font-weight: bold;\n}\n.stat-value {\n  font-size: 18px;\n  font-weight: bold;\n  color: #122e52;\n}\n.table-container {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.smc-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 14px;\n}\n.smc-table th,\n.smc-table td {\n  border: 1px solid #ddd;\n  padding: 12px;\n  text-align: left;\n}\n.smc-table th {\n  background: #122e52;\n  color: #fff;\n  position: sticky;\n  top: 0;\n  font-weight: 600;\n}\n.smc-table tr:nth-child(even) {\n  background: #f8f9fa;\n}\n.smc-table tr:hover {\n  background: #e9ecef;\n}\n.pagination {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 15px 20px;\n  background: #f8f9fa;\n  border-top: 1px solid #ddd;\n}\n.pagination-btn {\n  padding: 8px 16px;\n  border: 1px solid #ddd;\n  background: white;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.pagination-btn:disabled {\n  background: #f8f9fa;\n  color: #6c757d;\n  cursor: not-allowed;\n}\n.pagination-btn:not(:disabled):hover {\n  background: #007bff;\n  color: white;\n  border-color: #007bff;\n}\n.pagination-info {\n  color: #666;\n  font-size: 14px;\n}\n.loading {\n  color: #007bff;\n  padding: 20px;\n  background: #f8f9fa;\n  border-radius: 4px;\n  text-align: center;\n  margin: 20px 0;\n}\n.error {\n  color: #dc3545;\n  padding: 20px;\n  background: #f8d7da;\n  border: 1px solid #f5c6cb;\n  border-radius: 4px;\n  margin: 20px 0;\n  text-align: center;\n}\n.warning {\n  color: #856404;\n  padding: 20px;\n  background: #fff3cd;\n  border: 1px solid #ffeaa7;\n  border-radius: 4px;\n  margin: 20px 0;\n  text-align: center;\n}\n.retry-btn {\n  background: #007bff;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n  margin-top: 10px;\n}\n.retry-btn:hover {\n  background: #0056b3;\n}\n.no-data {\n  padding: 40px;\n  text-align: center;\n  color: #6c757d;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  margin: 20px 0;\n}\n@media (max-width: 768px) {\n  .filters-section {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .action-buttons {\n    margin-left: 0;\n    justify-content: center;\n  }\n  .pagination {\n    flex-direction: column;\n    gap: 10px;\n    text-align: center;\n  }\n  .summary-stats {\n    grid-template-columns: 1fr;\n  }\n  .filter-select,\n  .filter-input {\n    min-width: unset;\n  }\n}\n/*# sourceMappingURL=smc-dashboard.component.css.map */\n"] }]
  }], () => [{ type: SmcService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SmcDashboardComponent, { className: "SmcDashboardComponent", filePath: "src/app/components/admin/smc-dashboard/smc-dashboard.component.ts", lineNumber: 474 });
})();
export {
  SmcDashboardComponent
};
//# sourceMappingURL=chunk-TY2EF3DD.js.map
