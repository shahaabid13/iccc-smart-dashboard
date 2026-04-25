import {
  ParkaddaService,
  animate,
  style,
  transition,
  trigger
} from "./chunk-4EWWK26B.js";
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
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  Subject,
  debounceTime,
  setClassMetadata,
  takeUntil,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
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

// src/app/components/admin/parkadda/vehicle-reports/vehicle-reports.component.ts
function VehicleReportsComponent_option_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const parking_r1 = ctx.$implicit;
    \u0275\u0275property("value", parking_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", parking_r1.name, " ");
  }
}
function VehicleReportsComponent_div_52_tr_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 44)(1, "td", 45)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 46);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 46);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 47);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td")(19, "span", 48);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "td");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "td", 49)(24, "button", 50);
    \u0275\u0275listener("click", function VehicleReportsComponent_div_52_tr_29_Template_button_click_24_listener() {
      const report_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.viewDetails(report_r3));
    });
    \u0275\u0275element(25, "i", 51);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const report_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("@fadeInOut", void 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(report_r3.vehicleNumber);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(report_r3.vehicleType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 11, report_r3.entryTime, "short"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(report_r3.exitTime ? \u0275\u0275pipeBind2(11, 14, report_r3.exitTime, "short") : "-");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(report_r3.duration || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(report_r3.parkingLocation);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(report_r3.fee);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r3.getStatusClass(report_r3.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", report_r3.status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(report_r3.rangerName);
  }
}
function VehicleReportsComponent_div_52_tr_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 52)(1, "td", 53);
    \u0275\u0275text(2, "No vehicle reports found");
    \u0275\u0275elementEnd()();
  }
}
function VehicleReportsComponent_div_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 40)(5, "table", 41)(6, "thead")(7, "tr")(8, "th");
    \u0275\u0275text(9, "Vehicle Number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Entry Time");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Exit Time");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "Duration");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th");
    \u0275\u0275text(19, "Parking Location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th");
    \u0275\u0275text(21, "Fee (\u20B9)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "th");
    \u0275\u0275text(23, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th");
    \u0275\u0275text(25, "Ranger");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "th");
    \u0275\u0275text(27, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "tbody");
    \u0275\u0275template(29, VehicleReportsComponent_div_52_tr_29_Template, 26, 17, "tr", 42)(30, VehicleReportsComponent_div_52_tr_30_Template, 3, 0, "tr", 43);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Total Results: ", ctx_r3.filteredReports.length, " of ", ctx_r3.totalCount);
    \u0275\u0275advance(26);
    \u0275\u0275property("ngForOf", ctx_r3.filteredReports);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.filteredReports.length === 0);
  }
}
function VehicleReportsComponent_div_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275element(1, "div", 55);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading vehicle reports...");
    \u0275\u0275elementEnd()();
  }
}
function VehicleReportsComponent_div_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 56)(1, "div", 57)(2, "button", 58);
    \u0275\u0275listener("click", function VehicleReportsComponent_div_54_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.previousPage());
    });
    \u0275\u0275element(3, "i", 59);
    \u0275\u0275text(4, " Previous ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 60);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 58);
    \u0275\u0275listener("click", function VehicleReportsComponent_div_54_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.nextPage());
    });
    \u0275\u0275text(8, " Next ");
    \u0275\u0275element(9, "i", 61);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.currentPage === 1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("Page ", ctx_r3.currentPage, " of ", ctx_r3.totalPages);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.currentPage >= ctx_r3.totalPages);
  }
}
function VehicleReportsComponent_div_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 62)(1, "div", 63)(2, "div", 64)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 65);
    \u0275\u0275listener("click", function VehicleReportsComponent_div_55_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeDetailsModal());
    });
    \u0275\u0275element(6, "i", 66);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 67)(8, "div", 68)(9, "div", 69)(10, "label");
    \u0275\u0275text(11, "Vehicle Number:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 69)(15, "label");
    \u0275\u0275text(16, "Vehicle Type:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 69)(20, "label");
    \u0275\u0275text(21, "Entry Time:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 69)(26, "label");
    \u0275\u0275text(27, "Exit Time:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span");
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 69)(32, "label");
    \u0275\u0275text(33, "Duration:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "span");
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 69)(37, "label");
    \u0275\u0275text(38, "Parking Location:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span");
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 69)(42, "label");
    \u0275\u0275text(43, "Fee:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span");
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 69)(47, "label");
    \u0275\u0275text(48, "Status:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "span", 48);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 69)(52, "label");
    \u0275\u0275text(53, "Ranger Name:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "span");
    \u0275\u0275text(55);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(56, "div", 70)(57, "button", 71);
    \u0275\u0275listener("click", function VehicleReportsComponent_div_55_Template_button_click_57_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeDetailsModal());
    });
    \u0275\u0275text(58, "Close");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("@fadeInOut", void 0);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Vehicle Report Details - ", ctx_r3.selectedReport.vehicleNumber);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r3.selectedReport.vehicleNumber);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.selectedReport.vehicleType);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(24, 12, ctx_r3.selectedReport.entryTime, "medium"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r3.selectedReport.exitTime ? \u0275\u0275pipeBind2(30, 15, ctx_r3.selectedReport.exitTime, "medium") : "-");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r3.selectedReport.duration || "-");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.selectedReport.parkingLocation);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u20B9", ctx_r3.selectedReport.fee);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r3.getStatusClass(ctx_r3.selectedReport.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.selectedReport.status, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.selectedReport.rangerName);
  }
}
function VehicleReportsComponent_div_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72)(1, "div", 73);
    \u0275\u0275element(2, "i", 74);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const toast_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", "toast-" + toast_r7.type)("@slideIn", void 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r3.getToastIcon(toast_r7.type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(toast_r7.message);
  }
}
var VehicleReportsComponent = class _VehicleReportsComponent {
  parkaddaService;
  vehicleReports = [];
  inReports = [];
  outReports = [];
  allReports = [];
  filteredReports = [];
  loading = false;
  selectedReportType = "in";
  // 'in', 'out', 'all'
  searchTerm = "";
  selectedReport = null;
  showDetailsModal = false;
  toasts = [];
  parkings = [];
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;
  totalPages = 1;
  filter = {
    parkingId: null,
    fromDate: this.getFormattedDate(new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - 30))),
    toDate: this.getFormattedDate(/* @__PURE__ */ new Date()),
    vehicleType: "",
    pageSize: 10,
    currentPage: 1
  };
  destroy$ = new Subject();
  searchSubject$ = new Subject();
  constructor(parkaddaService) {
    this.parkaddaService = parkaddaService;
  }
  ngOnInit() {
    this.loadParkings();
    this.loadVehicleReports();
    this.searchSubject$.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe(() => {
      this.filterReports();
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadParkings() {
    this.parkaddaService.getParkingList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        const parkingData = response.data || [];
        this.parkings = parkingData.map((p) => ({
          id: p.parking_table_id || p.id,
          name: p.parking_name || p.name
        }));
        if (this.parkings.length > 0) {
          this.filter.parkingId = response.data?.[0]?.parking_table_id || response.data?.[0]?.id;
        }
      },
      error: (error) => {
        console.error("Error loading parkings:", error);
        this.showToast("Error loading parkings", "error");
      }
    });
  }
  loadVehicleReports() {
    if (!this.filter.parkingId) {
      this.showToast("Please select a parking location", "warning");
      return;
    }
    this.loading = true;
    const params = {
      page: this.filter.currentPage,
      page_size: this.filter.pageSize,
      parking_table_id: this.filter.parkingId,
      from_date_filter: this.filter.fromDate,
      to_date_filter: this.filter.toDate
    };
    Promise.all([
      this.parkaddaService.searchAdminVehicleInReports(params).toPromise(),
      this.parkaddaService.searchAdminVehicleOutReports(params).toPromise(),
      this.parkaddaService.searchAdminVehicleReports(params).toPromise()
    ]).then(([inRes, outRes, allRes]) => {
      this.inReports = inRes?.data?.results || [];
      this.outReports = outRes?.data?.results || [];
      this.allReports = allRes?.data?.results || [];
      this.updateDisplayedReports();
      this.totalCount = allRes?.data?.total_count || 0;
      this.totalPages = Math.ceil(this.totalCount / this.filter.pageSize);
      this.loading = false;
    }).catch((error) => {
      console.error("Error loading vehicle reports:", error);
      this.showToast("Error loading vehicle reports", "error");
      this.loading = false;
    });
  }
  updateDisplayedReports() {
    switch (this.selectedReportType) {
      case "in":
        this.vehicleReports = this.inReports;
        break;
      case "out":
        this.vehicleReports = this.outReports;
        break;
      case "all":
        this.vehicleReports = this.allReports;
        break;
      default:
        this.vehicleReports = this.allReports;
    }
    this.filterReports();
  }
  onReportTypeChange() {
    this.currentPage = 1;
    this.updateDisplayedReports();
  }
  onFilterChange() {
    this.currentPage = 1;
    this.loadVehicleReports();
  }
  onSearchChange() {
    this.searchSubject$.next(this.searchTerm);
  }
  filterReports() {
    this.filteredReports = this.vehicleReports.filter((report) => {
      const matchesSearch = !this.searchTerm || report.vehicleNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) || report.parkingLocation.toLowerCase().includes(this.searchTerm.toLowerCase()) || report.rangerName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesVehicleType = !this.filter.vehicleType || report.vehicleType === this.filter.vehicleType;
      return matchesSearch && matchesVehicleType;
    });
  }
  viewDetails(report) {
    this.selectedReport = report;
    this.showDetailsModal = true;
  }
  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedReport = null;
  }
  exportToCSV() {
    if (this.filteredReports.length === 0) {
      this.showToast("No data to export", "warning");
      return;
    }
    const headers = ["Vehicle Number", "Type", "Entry Time", "Exit Time", "Duration", "Location", "Fee", "Status"];
    const rows = this.filteredReports.map((r) => [
      r.vehicleNumber,
      r.vehicleType,
      r.entryTime,
      r.exitTime || "-",
      r.duration || "-",
      r.parkingLocation,
      r.fee,
      r.status
    ]);
    let csvContent = headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.map((cell) => `"${cell}"`).join(",") + "\n";
    });
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vehicle-reports-${(/* @__PURE__ */ new Date()).getTime()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    this.showToast("Report exported successfully", "success");
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.filter.currentPage = this.currentPage;
      this.loadVehicleReports();
    }
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filter.currentPage = this.currentPage;
      this.loadVehicleReports();
    }
  }
  showToast(message, type) {
    this.toasts.push({ message, type });
    setTimeout(() => {
      this.toasts.shift();
    }, 3e3);
  }
  getToastIcon(type) {
    switch (type) {
      case "success":
        return "fa-check-circle";
      case "error":
        return "fa-exclamation-circle";
      case "warning":
        return "fa-exclamation-triangle";
      case "info":
        return "fa-info-circle";
      default:
        return "fa-info-circle";
    }
  }
  getStatusClass(status) {
    switch (status.toLowerCase()) {
      case "active":
        return "status-active";
      case "completed":
        return "status-completed";
      case "pending":
        return "status-pending";
      default:
        return "status-default";
    }
  }
  getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  static \u0275fac = function VehicleReportsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VehicleReportsComponent)(\u0275\u0275directiveInject(ParkaddaService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VehicleReportsComponent, selectors: [["app-vehicle-reports"]], decls: 58, vars: 17, consts: [[1, "vehicle-reports-container"], [1, "header-section"], [1, "header-controls"], [1, "btn", "btn-primary", 3, "click"], [1, "fas", "fa-download"], [1, "filters-section"], [1, "filter-group"], ["for", "parkingSelect"], ["id", "parkingSelect", 1, "form-control", 3, "ngModelChange", "change", "ngModel"], ["value", "", "disabled", ""], [3, "value", 4, "ngFor", "ngForOf"], ["for", "fromDate"], ["id", "fromDate", "type", "date", 1, "form-control", 3, "ngModelChange", "change", "ngModel"], ["for", "toDate"], ["id", "toDate", "type", "date", 1, "form-control", 3, "ngModelChange", "change", "ngModel"], ["for", "vehicleType"], ["id", "vehicleType", 1, "form-control", 3, "ngModelChange", "change", "ngModel"], ["value", ""], ["value", "car"], ["value", "bike"], ["value", "truck"], ["value", "auto"], [1, "report-type-selector"], [1, "type-btn", 3, "click"], [1, "fas", "fa-arrow-right"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-list"], [1, "search-section"], [1, "search-box"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Search by vehicle number, location, or ranger name...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], ["class", "table-section", 4, "ngIf"], ["class", "loading-spinner", 4, "ngIf"], ["class", "pagination-section", 4, "ngIf"], ["class", "modal", 4, "ngIf"], [1, "toast-container"], ["class", "toast", 3, "ngClass", 4, "ngFor", "ngForOf"], [3, "value"], [1, "table-section"], [1, "results-info"], [1, "table-responsive"], [1, "reports-table"], ["class", "report-row", 4, "ngFor", "ngForOf"], ["class", "no-data", 4, "ngIf"], [1, "report-row"], [1, "vehicle-number"], [1, "time"], [1, "fee"], [1, "badge", 3, "ngClass"], [1, "actions-cell"], ["title", "View Details", 1, "btn-sm", "btn-info", 3, "click"], [1, "fas", "fa-eye"], [1, "no-data"], ["colspan", "10", 1, "text-center"], [1, "loading-spinner"], [1, "spinner"], [1, "pagination-section"], [1, "pagination-controls"], [1, "btn-sm", 3, "click", "disabled"], [1, "fas", "fa-chevron-left"], [1, "page-info"], [1, "fas", "fa-chevron-right"], [1, "modal"], [1, "modal-content"], [1, "modal-header"], [1, "close-btn", 3, "click"], [1, "fas", "fa-times"], [1, "modal-body"], [1, "details-grid"], [1, "detail-item"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], [1, "toast", 3, "ngClass"], [1, "toast-content"], [1, "fas", 3, "ngClass"]], template: function VehicleReportsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "Vehicle Reports");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2)(5, "button", 3);
      \u0275\u0275listener("click", function VehicleReportsComponent_Template_button_click_5_listener() {
        return ctx.exportToCSV();
      });
      \u0275\u0275element(6, "i", 4);
      \u0275\u0275text(7, " Export to CSV ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(8, "div", 5)(9, "div", 6)(10, "label", 7);
      \u0275\u0275text(11, "Parking Location:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "select", 8);
      \u0275\u0275twoWayListener("ngModelChange", function VehicleReportsComponent_Template_select_ngModelChange_12_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filter.parkingId, $event) || (ctx.filter.parkingId = $event);
        return $event;
      });
      \u0275\u0275listener("change", function VehicleReportsComponent_Template_select_change_12_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementStart(13, "option", 9);
      \u0275\u0275text(14, "Select Parking");
      \u0275\u0275elementEnd();
      \u0275\u0275template(15, VehicleReportsComponent_option_15_Template, 2, 2, "option", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 6)(17, "label", 11);
      \u0275\u0275text(18, "From Date:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "input", 12);
      \u0275\u0275twoWayListener("ngModelChange", function VehicleReportsComponent_Template_input_ngModelChange_19_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filter.fromDate, $event) || (ctx.filter.fromDate = $event);
        return $event;
      });
      \u0275\u0275listener("change", function VehicleReportsComponent_Template_input_change_19_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 6)(21, "label", 13);
      \u0275\u0275text(22, "To Date:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "input", 14);
      \u0275\u0275twoWayListener("ngModelChange", function VehicleReportsComponent_Template_input_ngModelChange_23_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filter.toDate, $event) || (ctx.filter.toDate = $event);
        return $event;
      });
      \u0275\u0275listener("change", function VehicleReportsComponent_Template_input_change_23_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div", 6)(25, "label", 15);
      \u0275\u0275text(26, "Vehicle Type:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "select", 16);
      \u0275\u0275twoWayListener("ngModelChange", function VehicleReportsComponent_Template_select_ngModelChange_27_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filter.vehicleType, $event) || (ctx.filter.vehicleType = $event);
        return $event;
      });
      \u0275\u0275listener("change", function VehicleReportsComponent_Template_select_change_27_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementStart(28, "option", 17);
      \u0275\u0275text(29, "All Types");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "option", 18);
      \u0275\u0275text(31, "Car");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "option", 19);
      \u0275\u0275text(33, "Bike");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "option", 20);
      \u0275\u0275text(35, "Truck");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "option", 21);
      \u0275\u0275text(37, "Auto");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(38, "div", 22)(39, "button", 23);
      \u0275\u0275listener("click", function VehicleReportsComponent_Template_button_click_39_listener() {
        ctx.selectedReportType = "in";
        return ctx.onReportTypeChange();
      });
      \u0275\u0275element(40, "i", 24);
      \u0275\u0275text(41, " Vehicle In Reports ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "button", 23);
      \u0275\u0275listener("click", function VehicleReportsComponent_Template_button_click_42_listener() {
        ctx.selectedReportType = "out";
        return ctx.onReportTypeChange();
      });
      \u0275\u0275element(43, "i", 25);
      \u0275\u0275text(44, " Vehicle Out Reports ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "button", 23);
      \u0275\u0275listener("click", function VehicleReportsComponent_Template_button_click_45_listener() {
        ctx.selectedReportType = "all";
        return ctx.onReportTypeChange();
      });
      \u0275\u0275element(46, "i", 26);
      \u0275\u0275text(47, " All Reports ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(48, "div", 27)(49, "div", 28);
      \u0275\u0275element(50, "i", 29);
      \u0275\u0275elementStart(51, "input", 30);
      \u0275\u0275twoWayListener("ngModelChange", function VehicleReportsComponent_Template_input_ngModelChange_51_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("input", function VehicleReportsComponent_Template_input_input_51_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(52, VehicleReportsComponent_div_52_Template, 31, 4, "div", 31)(53, VehicleReportsComponent_div_53_Template, 4, 0, "div", 32)(54, VehicleReportsComponent_div_54_Template, 10, 4, "div", 33)(55, VehicleReportsComponent_div_55_Template, 59, 18, "div", 34);
      \u0275\u0275elementStart(56, "div", 35);
      \u0275\u0275template(57, VehicleReportsComponent_div_57_Template, 5, 4, "div", 36);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(12);
      \u0275\u0275twoWayProperty("ngModel", ctx.filter.parkingId);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.parkings);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.filter.fromDate);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.filter.toDate);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.filter.vehicleType);
      \u0275\u0275advance(12);
      \u0275\u0275classProp("active", ctx.selectedReportType === "in");
      \u0275\u0275advance(3);
      \u0275\u0275classProp("active", ctx.selectedReportType === "out");
      \u0275\u0275advance(3);
      \u0275\u0275classProp("active", ctx.selectedReportType === "all");
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredReports.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.selectedReport && ctx.showDetailsModal);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.toasts);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DatePipe], styles: ['\n\n.vehicle-reports-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n  min-height: 100vh;\n  font-family:\n    "Segoe UI",\n    Tahoma,\n    Geneva,\n    Verdana,\n    sans-serif;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .header-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 30px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .header-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 32px;\n  color: #2c3e50;\n  margin: 0;\n  font-weight: 700;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .header-section[_ngcontent-%COMP%]   .header-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 15px;\n  margin-bottom: 25px;\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #7f8c8d;\n  margin-bottom: 6px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.vehicle-reports-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  border: 2px solid #e0e0e0;\n  border-radius: 6px;\n  font-size: 14px;\n  transition: all 0.3s ease;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.vehicle-reports-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 10px rgba(52, 152, 219, 0.2);\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .report-type-selector[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-bottom: 25px;\n  flex-wrap: wrap;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .report-type-selector[_ngcontent-%COMP%]   .type-btn[_ngcontent-%COMP%] {\n  padding: 12px 20px;\n  border: 2px solid white;\n  background: white;\n  color: #667eea;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .report-type-selector[_ngcontent-%COMP%]   .type-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .report-type-selector[_ngcontent-%COMP%]   .type-btn.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border-color: #667eea;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%] {\n  margin-bottom: 25px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   .search-box[_ngcontent-%COMP%] {\n  position: relative;\n  background: white;\n  padding: 15px 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  display: flex;\n  align-items: center;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   .search-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 20px;\n  color: #95a5a6;\n  font-size: 16px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   .search-box[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 15px 10px 40px;\n  border: none;\n  background: transparent;\n  font-size: 14px;\n  transition: all 0.3s ease;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   .search-box[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   .search-box[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]::placeholder {\n  color: #bdc3c7;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 10px;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .results-info[_ngcontent-%COMP%] {\n  padding: 15px 20px;\n  border-bottom: 1px solid #f0f0f0;\n  color: #7f8c8d;\n  font-size: 13px;\n  background: #f8f9fa;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin: 0;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 16px;\n  text-align: left;\n  color: white;\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.report-row[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #f0f0f0;\n  transition: all 0.3s ease;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.report-row[_ngcontent-%COMP%]:hover {\n  background-color: #f8f9fa;\n  box-shadow: inset 0 0 10px rgba(52, 152, 219, 0.05);\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.report-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  color: #2c3e50;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.report-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .vehicle-number[_ngcontent-%COMP%] {\n  color: #2980b9;\n  font-weight: 600;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.report-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #7f8c8d;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.report-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .fee[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #27ae60;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.report-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.report-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .badge.status-active[_ngcontent-%COMP%] {\n  background-color: #d4edda;\n  color: #155724;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.report-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .badge.status-completed[_ngcontent-%COMP%] {\n  background-color: #cce5ff;\n  color: #004085;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.report-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .badge.status-pending[_ngcontent-%COMP%] {\n  background-color: #fff3cd;\n  color: #856404;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.report-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .badge.status-default[_ngcontent-%COMP%] {\n  background-color: #e2e3e5;\n  color: #383d41;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.report-row[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.report-row[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 6px 10px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  font-size: 12px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.report-row[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%]   button.btn-sm.btn-info[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  color: #1976d2;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.report-row[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%]   button.btn-sm.btn-info[_ngcontent-%COMP%]:hover {\n  background-color: #1976d2;\n  color: white;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.no-data[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.no-data[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 40px !important;\n  color: #95a5a6;\n  font-size: 16px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 60px 20px;\n  background: white;\n  border-radius: 10px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {\n  border: 4px solid #f3f3f3;\n  border-top: 4px solid #667eea;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin-bottom: 15px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #7f8c8d;\n  font-size: 14px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .pagination-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 20px;\n  background: white;\n  border-top: 1px solid #e0e0e0;\n  margin-top: 1px;\n  border-radius: 0 0 10px 10px;\n  gap: 15px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .pagination-section[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .pagination-section[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 8px 15px;\n  border: 2px solid #667eea;\n  background: white;\n  color: #667eea;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  font-size: 12px;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .pagination-section[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #667eea;\n  color: white;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .pagination-section[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .pagination-section[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .page-info[_ngcontent-%COMP%] {\n  color: #7f8c8d;\n  font-size: 13px;\n  min-width: 120px;\n  text-align: center;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 10px;\n  width: 90%;\n  max-width: 700px;\n  max-height: 80vh;\n  overflow-y: auto;\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px;\n  border-bottom: 1px solid #e0e0e0;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: white;\n  font-size: 18px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: white;\n  font-size: 24px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover {\n  transform: scale(1.2);\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%] {\n  padding: 25px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   .details-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   .details-grid[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   .details-grid[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #7f8c8d;\n  text-transform: uppercase;\n  margin-bottom: 6px;\n  letter-spacing: 0.5px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   .details-grid[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #2c3e50;\n  font-weight: 500;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding: 15px 20px;\n  border-top: 1px solid #e0e0e0;\n  background: #f8f9fa;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  transition: all 0.2s ease;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]   button.btn-secondary[_ngcontent-%COMP%] {\n  background: #e0e0e0;\n  color: #2c3e50;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]   button.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #bdbdbd;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n  z-index: 2000;\n  max-width: 400px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  padding: 15px 20px;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-success[_ngcontent-%COMP%] {\n  border-left: 4px solid #2ecc71;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-success[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%] {\n  color: #27ae60;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-success[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #2ecc71;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-error[_ngcontent-%COMP%] {\n  border-left: 4px solid #e74c3c;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-error[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%] {\n  color: #c0392b;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-error[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #e74c3c;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-warning[_ngcontent-%COMP%] {\n  border-left: 4px solid #f39c12;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-warning[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%] {\n  color: #d68910;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-warning[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #f39c12;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-info[_ngcontent-%COMP%] {\n  border-left: 4px solid #3498db;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-info[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%] {\n  color: #2980b9;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-info[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #3498db;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .btn.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .btn.btn-primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  padding: 10px 15px;\n  border: 2px solid #e0e0e0;\n  border-radius: 6px;\n  background-color: white;\n  cursor: pointer;\n  font-size: 14px;\n  transition: all 0.3s ease;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n}\n.vehicle-reports-container[_ngcontent-%COMP%]   .text-center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 768px) {\n  .vehicle-reports-container[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n  .vehicle-reports-container[_ngcontent-%COMP%]   .header-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 15px;\n  }\n  .vehicle-reports-container[_ngcontent-%COMP%]   .header-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .vehicle-reports-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .vehicle-reports-container[_ngcontent-%COMP%]   .report-type-selector[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .vehicle-reports-container[_ngcontent-%COMP%]   .report-type-selector[_ngcontent-%COMP%]   .type-btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.report-row[_ngcontent-%COMP%] {\n    display: block;\n    margin-bottom: 15px;\n    border: 1px solid #e0e0e0;\n  }\n  .vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.report-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: block;\n    padding: 10px;\n    text-align: right;\n  }\n  .vehicle-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.report-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:before {\n    content: attr(data-label);\n    font-weight: 600;\n    color: #667eea;\n    float: left;\n  }\n  .vehicle-reports-container[_ngcontent-%COMP%]   .pagination-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .vehicle-reports-container[_ngcontent-%COMP%]   .pagination-section[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=vehicle-reports.component.css.map */'], data: { animation: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-10px)" }),
        animate("300ms ease-in", style({ opacity: 1, transform: "translateY(0)" }))
      ]),
      transition(":leave", [
        animate("300ms ease-out", style({ opacity: 0, transform: "translateY(-10px)" }))
      ])
    ]),
    trigger("slideIn", [
      transition(":enter", [
        style({ transform: "translateX(400px)", opacity: 0 }),
        animate("300ms ease-out", style({ transform: "translateX(0)", opacity: 1 }))
      ])
    ])
  ] } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VehicleReportsComponent, [{
    type: Component,
    args: [{ selector: "app-vehicle-reports", standalone: true, imports: [CommonModule, FormsModule], animations: [
      trigger("fadeInOut", [
        transition(":enter", [
          style({ opacity: 0, transform: "translateY(-10px)" }),
          animate("300ms ease-in", style({ opacity: 1, transform: "translateY(0)" }))
        ]),
        transition(":leave", [
          animate("300ms ease-out", style({ opacity: 0, transform: "translateY(-10px)" }))
        ])
      ]),
      trigger("slideIn", [
        transition(":enter", [
          style({ transform: "translateX(400px)", opacity: 0 }),
          animate("300ms ease-out", style({ transform: "translateX(0)", opacity: 1 }))
        ])
      ])
    ], template: `<div class="vehicle-reports-container">\r
  <div class="header-section">\r
    <h1>Vehicle Reports</h1>\r
    <div class="header-controls">\r
      <button class="btn btn-primary" (click)="exportToCSV()">\r
        <i class="fas fa-download"></i> Export to CSV\r
      </button>\r
    </div>\r
  </div>\r
\r
  <div class="filters-section">\r
    <div class="filter-group">\r
      <label for="parkingSelect">Parking Location:</label>\r
      <select\r
        id="parkingSelect"\r
        [(ngModel)]="filter.parkingId"\r
        (change)="onFilterChange()"\r
        class="form-control">\r
        <option value="" disabled>Select Parking</option>\r
        <option *ngFor="let parking of parkings" [value]="parking.id">\r
          {{ parking.name }}\r
        </option>\r
      </select>\r
    </div>\r
\r
    <div class="filter-group">\r
      <label for="fromDate">From Date:</label>\r
      <input\r
        id="fromDate"\r
        type="date"\r
        [(ngModel)]="filter.fromDate"\r
        (change)="onFilterChange()"\r
        class="form-control">\r
    </div>\r
\r
    <div class="filter-group">\r
      <label for="toDate">To Date:</label>\r
      <input\r
        id="toDate"\r
        type="date"\r
        [(ngModel)]="filter.toDate"\r
        (change)="onFilterChange()"\r
        class="form-control">\r
    </div>\r
\r
    <div class="filter-group">\r
      <label for="vehicleType">Vehicle Type:</label>\r
      <select\r
        id="vehicleType"\r
        [(ngModel)]="filter.vehicleType"\r
        (change)="onFilterChange()"\r
        class="form-control">\r
        <option value="">All Types</option>\r
        <option value="car">Car</option>\r
        <option value="bike">Bike</option>\r
        <option value="truck">Truck</option>\r
        <option value="auto">Auto</option>\r
      </select>\r
    </div>\r
  </div>\r
\r
  <div class="report-type-selector">\r
    <button\r
      class="type-btn"\r
      [class.active]="selectedReportType === 'in'"\r
      (click)="selectedReportType = 'in'; onReportTypeChange()">\r
      <i class="fas fa-arrow-right"></i> Vehicle In Reports\r
    </button>\r
    <button\r
      class="type-btn"\r
      [class.active]="selectedReportType === 'out'"\r
      (click)="selectedReportType = 'out'; onReportTypeChange()">\r
      <i class="fas fa-arrow-left"></i> Vehicle Out Reports\r
    </button>\r
    <button\r
      class="type-btn"\r
      [class.active]="selectedReportType === 'all'"\r
      (click)="selectedReportType = 'all'; onReportTypeChange()">\r
      <i class="fas fa-list"></i> All Reports\r
    </button>\r
  </div>\r
\r
  <div class="search-section">\r
    <div class="search-box">\r
      <i class="fas fa-search"></i>\r
      <input\r
        type="text"\r
        placeholder="Search by vehicle number, location, or ranger name..."\r
        [(ngModel)]="searchTerm"\r
        (input)="onSearchChange()"\r
        class="search-input">\r
    </div>\r
  </div>\r
\r
  <div class="table-section" *ngIf="!loading">\r
    <div class="results-info">\r
      <span>Total Results: {{ filteredReports.length }} of {{ totalCount }}</span>\r
    </div>\r
    <div class="table-responsive">\r
      <table class="reports-table">\r
        <thead>\r
          <tr>\r
            <th>Vehicle Number</th>\r
            <th>Type</th>\r
            <th>Entry Time</th>\r
            <th>Exit Time</th>\r
            <th>Duration</th>\r
            <th>Parking Location</th>\r
            <th>Fee (\u20B9)</th>\r
            <th>Status</th>\r
            <th>Ranger</th>\r
            <th>Actions</th>\r
          </tr>\r
        </thead>\r
        <tbody>\r
          <tr *ngFor="let report of filteredReports" class="report-row" [@fadeInOut]>\r
            <td class="vehicle-number"><strong>{{ report.vehicleNumber }}</strong></td>\r
            <td>{{ report.vehicleType }}</td>\r
            <td class="time">{{ report.entryTime | date: 'short' }}</td>\r
            <td class="time">{{ report.exitTime ? (report.exitTime | date: 'short') : '-' }}</td>\r
            <td>{{ report.duration || '-' }}</td>\r
            <td>{{ report.parkingLocation }}</td>\r
            <td class="fee">{{ report.fee }}</td>\r
            <td>\r
              <span class="badge" [ngClass]="getStatusClass(report.status)">\r
                {{ report.status }}\r
              </span>\r
            </td>\r
            <td>{{ report.rangerName }}</td>\r
            <td class="actions-cell">\r
              <button\r
                class="btn-sm btn-info"\r
                (click)="viewDetails(report)"\r
                title="View Details">\r
                <i class="fas fa-eye"></i>\r
              </button>\r
            </td>\r
          </tr>\r
          <tr *ngIf="filteredReports.length === 0" class="no-data">\r
            <td colspan="10" class="text-center">No vehicle reports found</td>\r
          </tr>\r
        </tbody>\r
      </table>\r
    </div>\r
  </div>\r
\r
  <div class="loading-spinner" *ngIf="loading">\r
    <div class="spinner"></div>\r
    <p>Loading vehicle reports...</p>\r
  </div>\r
\r
  <!-- Pagination -->\r
  <div class="pagination-section" *ngIf="!loading && filteredReports.length > 0">\r
    <div class="pagination-controls">\r
      <button\r
        class="btn-sm"\r
        (click)="previousPage()"\r
        [disabled]="currentPage === 1">\r
        <i class="fas fa-chevron-left"></i> Previous\r
      </button>\r
      <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>\r
      <button\r
        class="btn-sm"\r
        (click)="nextPage()"\r
        [disabled]="currentPage >= totalPages">\r
        Next <i class="fas fa-chevron-right"></i>\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- Details Modal -->\r
  <div class="modal" *ngIf="selectedReport && showDetailsModal" [@fadeInOut]>\r
    <div class="modal-content">\r
      <div class="modal-header">\r
        <h2>Vehicle Report Details - {{ selectedReport.vehicleNumber }}</h2>\r
        <button class="close-btn" (click)="closeDetailsModal()">\r
          <i class="fas fa-times"></i>\r
        </button>\r
      </div>\r
      <div class="modal-body">\r
        <div class="details-grid">\r
          <div class="detail-item">\r
            <label>Vehicle Number:</label>\r
            <span>{{ selectedReport.vehicleNumber }}</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Vehicle Type:</label>\r
            <span>{{ selectedReport.vehicleType }}</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Entry Time:</label>\r
            <span>{{ selectedReport.entryTime | date: 'medium' }}</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Exit Time:</label>\r
            <span>{{ selectedReport.exitTime ? (selectedReport.exitTime | date: 'medium') : '-' }}</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Duration:</label>\r
            <span>{{ selectedReport.duration || '-' }}</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Parking Location:</label>\r
            <span>{{ selectedReport.parkingLocation }}</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Fee:</label>\r
            <span>\u20B9{{ selectedReport.fee }}</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Status:</label>\r
            <span class="badge" [ngClass]="getStatusClass(selectedReport.status)">\r
              {{ selectedReport.status }}\r
            </span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Ranger Name:</label>\r
            <span>{{ selectedReport.rangerName }}</span>\r
          </div>\r
        </div>\r
      </div>\r
      <div class="modal-footer">\r
        <button class="btn btn-secondary" (click)="closeDetailsModal()">Close</button>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Toast Notifications -->\r
  <div class="toast-container">\r
    <div class="toast" *ngFor="let toast of toasts" [ngClass]="'toast-' + toast.type" [@slideIn]>\r
      <div class="toast-content">\r
        <i class="fas" [ngClass]="getToastIcon(toast.type)"></i>\r
        <span>{{ toast.message }}</span>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ['/* src/app/components/admin/parkadda/vehicle-reports/vehicle-reports.component.scss */\n.vehicle-reports-container {\n  padding: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n  min-height: 100vh;\n  font-family:\n    "Segoe UI",\n    Tahoma,\n    Geneva,\n    Verdana,\n    sans-serif;\n}\n.vehicle-reports-container .header-section {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 30px;\n}\n.vehicle-reports-container .header-section h1 {\n  font-size: 32px;\n  color: #2c3e50;\n  margin: 0;\n  font-weight: 700;\n}\n.vehicle-reports-container .header-section .header-controls {\n  display: flex;\n  gap: 10px;\n}\n.vehicle-reports-container .filters-section {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 15px;\n  margin-bottom: 25px;\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.vehicle-reports-container .filters-section .filter-group {\n  display: flex;\n  flex-direction: column;\n}\n.vehicle-reports-container .filters-section .filter-group label {\n  font-size: 12px;\n  font-weight: 600;\n  color: #7f8c8d;\n  margin-bottom: 6px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.vehicle-reports-container .filters-section .filter-group input,\n.vehicle-reports-container .filters-section .filter-group select {\n  padding: 10px 12px;\n  border: 2px solid #e0e0e0;\n  border-radius: 6px;\n  font-size: 14px;\n  transition: all 0.3s ease;\n}\n.vehicle-reports-container .filters-section .filter-group input:focus,\n.vehicle-reports-container .filters-section .filter-group select:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 10px rgba(52, 152, 219, 0.2);\n}\n.vehicle-reports-container .report-type-selector {\n  display: flex;\n  gap: 10px;\n  margin-bottom: 25px;\n  flex-wrap: wrap;\n}\n.vehicle-reports-container .report-type-selector .type-btn {\n  padding: 12px 20px;\n  border: 2px solid white;\n  background: white;\n  color: #667eea;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.vehicle-reports-container .report-type-selector .type-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.vehicle-reports-container .report-type-selector .type-btn.active {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border-color: #667eea;\n}\n.vehicle-reports-container .search-section {\n  margin-bottom: 25px;\n}\n.vehicle-reports-container .search-section .search-box {\n  position: relative;\n  background: white;\n  padding: 15px 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  display: flex;\n  align-items: center;\n}\n.vehicle-reports-container .search-section .search-box i {\n  position: absolute;\n  left: 20px;\n  color: #95a5a6;\n  font-size: 16px;\n}\n.vehicle-reports-container .search-section .search-box .search-input {\n  width: 100%;\n  padding: 10px 15px 10px 40px;\n  border: none;\n  background: transparent;\n  font-size: 14px;\n  transition: all 0.3s ease;\n}\n.vehicle-reports-container .search-section .search-box .search-input:focus {\n  outline: none;\n}\n.vehicle-reports-container .search-section .search-box .search-input::placeholder {\n  color: #bdc3c7;\n}\n.vehicle-reports-container .table-section {\n  background: white;\n  border-radius: 10px;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.vehicle-reports-container .table-section .results-info {\n  padding: 15px 20px;\n  border-bottom: 1px solid #f0f0f0;\n  color: #7f8c8d;\n  font-size: 13px;\n  background: #f8f9fa;\n}\n.vehicle-reports-container .table-section .table-responsive {\n  overflow-x: auto;\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table {\n  width: 100%;\n  border-collapse: collapse;\n  margin: 0;\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table thead {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table thead th {\n  padding: 16px;\n  text-align: left;\n  color: white;\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.report-row {\n  border-bottom: 1px solid #f0f0f0;\n  transition: all 0.3s ease;\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.report-row:hover {\n  background-color: #f8f9fa;\n  box-shadow: inset 0 0 10px rgba(52, 152, 219, 0.05);\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.report-row td {\n  padding: 14px 16px;\n  font-size: 13px;\n  color: #2c3e50;\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.report-row td .vehicle-number {\n  color: #2980b9;\n  font-weight: 600;\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.report-row td .time {\n  font-size: 12px;\n  color: #7f8c8d;\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.report-row td .fee {\n  font-weight: 600;\n  color: #27ae60;\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.report-row td .badge {\n  display: inline-block;\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.report-row td .badge.status-active {\n  background-color: #d4edda;\n  color: #155724;\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.report-row td .badge.status-completed {\n  background-color: #cce5ff;\n  color: #004085;\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.report-row td .badge.status-pending {\n  background-color: #fff3cd;\n  color: #856404;\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.report-row td .badge.status-default {\n  background-color: #e2e3e5;\n  color: #383d41;\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.report-row .actions-cell {\n  padding: 14px 16px;\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.report-row .actions-cell button {\n  padding: 6px 10px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  font-size: 12px;\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.report-row .actions-cell button.btn-sm.btn-info {\n  background-color: #e3f2fd;\n  color: #1976d2;\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.report-row .actions-cell button.btn-sm.btn-info:hover {\n  background-color: #1976d2;\n  color: white;\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.no-data {\n  text-align: center;\n}\n.vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.no-data td {\n  padding: 40px !important;\n  color: #95a5a6;\n  font-size: 16px;\n}\n.vehicle-reports-container .loading-spinner {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 60px 20px;\n  background: white;\n  border-radius: 10px;\n}\n.vehicle-reports-container .loading-spinner .spinner {\n  border: 4px solid #f3f3f3;\n  border-top: 4px solid #667eea;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  animation: spin 1s linear infinite;\n  margin-bottom: 15px;\n}\n.vehicle-reports-container .loading-spinner p {\n  color: #7f8c8d;\n  font-size: 14px;\n}\n.vehicle-reports-container .pagination-section {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 20px;\n  background: white;\n  border-top: 1px solid #e0e0e0;\n  margin-top: 1px;\n  border-radius: 0 0 10px 10px;\n  gap: 15px;\n}\n.vehicle-reports-container .pagination-section .pagination-controls {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n.vehicle-reports-container .pagination-section .pagination-controls button {\n  padding: 8px 15px;\n  border: 2px solid #667eea;\n  background: white;\n  color: #667eea;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  font-size: 12px;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.vehicle-reports-container .pagination-section .pagination-controls button:hover:not(:disabled) {\n  background: #667eea;\n  color: white;\n}\n.vehicle-reports-container .pagination-section .pagination-controls button:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.vehicle-reports-container .pagination-section .pagination-controls .page-info {\n  color: #7f8c8d;\n  font-size: 13px;\n  min-width: 120px;\n  text-align: center;\n}\n.vehicle-reports-container .modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n}\n.vehicle-reports-container .modal .modal-content {\n  background: white;\n  border-radius: 10px;\n  width: 90%;\n  max-width: 700px;\n  max-height: 80vh;\n  overflow-y: auto;\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);\n}\n.vehicle-reports-container .modal .modal-content .modal-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px;\n  border-bottom: 1px solid #e0e0e0;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n}\n.vehicle-reports-container .modal .modal-content .modal-header h2 {\n  margin: 0;\n  color: white;\n  font-size: 18px;\n}\n.vehicle-reports-container .modal .modal-content .modal-header .close-btn {\n  background: none;\n  border: none;\n  color: white;\n  font-size: 24px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.vehicle-reports-container .modal .modal-content .modal-header .close-btn:hover {\n  transform: scale(1.2);\n}\n.vehicle-reports-container .modal .modal-content .modal-body {\n  padding: 25px;\n}\n.vehicle-reports-container .modal .modal-content .modal-body .details-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n}\n.vehicle-reports-container .modal .modal-content .modal-body .details-grid .detail-item {\n  display: flex;\n  flex-direction: column;\n}\n.vehicle-reports-container .modal .modal-content .modal-body .details-grid .detail-item label {\n  font-size: 12px;\n  font-weight: 600;\n  color: #7f8c8d;\n  text-transform: uppercase;\n  margin-bottom: 6px;\n  letter-spacing: 0.5px;\n}\n.vehicle-reports-container .modal .modal-content .modal-body .details-grid .detail-item span {\n  font-size: 14px;\n  color: #2c3e50;\n  font-weight: 500;\n}\n.vehicle-reports-container .modal .modal-content .modal-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding: 15px 20px;\n  border-top: 1px solid #e0e0e0;\n  background: #f8f9fa;\n}\n.vehicle-reports-container .modal .modal-content .modal-footer button {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  transition: all 0.2s ease;\n}\n.vehicle-reports-container .modal .modal-content .modal-footer button.btn-secondary {\n  background: #e0e0e0;\n  color: #2c3e50;\n}\n.vehicle-reports-container .modal .modal-content .modal-footer button.btn-secondary:hover {\n  background: #bdbdbd;\n}\n.vehicle-reports-container .toast-container {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n  z-index: 2000;\n  max-width: 400px;\n}\n.vehicle-reports-container .toast-container .toast {\n  background: white;\n  border-radius: 8px;\n  padding: 15px 20px;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.vehicle-reports-container .toast-container .toast .toast-content {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.vehicle-reports-container .toast-container .toast .toast-content i {\n  font-size: 18px;\n}\n.vehicle-reports-container .toast-container .toast .toast-content span {\n  font-size: 14px;\n  font-weight: 500;\n}\n.vehicle-reports-container .toast-container .toast.toast-success {\n  border-left: 4px solid #2ecc71;\n}\n.vehicle-reports-container .toast-container .toast.toast-success .toast-content {\n  color: #27ae60;\n}\n.vehicle-reports-container .toast-container .toast.toast-success .toast-content i {\n  color: #2ecc71;\n}\n.vehicle-reports-container .toast-container .toast.toast-error {\n  border-left: 4px solid #e74c3c;\n}\n.vehicle-reports-container .toast-container .toast.toast-error .toast-content {\n  color: #c0392b;\n}\n.vehicle-reports-container .toast-container .toast.toast-error .toast-content i {\n  color: #e74c3c;\n}\n.vehicle-reports-container .toast-container .toast.toast-warning {\n  border-left: 4px solid #f39c12;\n}\n.vehicle-reports-container .toast-container .toast.toast-warning .toast-content {\n  color: #d68910;\n}\n.vehicle-reports-container .toast-container .toast.toast-warning .toast-content i {\n  color: #f39c12;\n}\n.vehicle-reports-container .toast-container .toast.toast-info {\n  border-left: 4px solid #3498db;\n}\n.vehicle-reports-container .toast-container .toast.toast-info .toast-content {\n  color: #2980b9;\n}\n.vehicle-reports-container .toast-container .toast.toast-info .toast-content i {\n  color: #3498db;\n}\n.vehicle-reports-container .btn {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.vehicle-reports-container .btn.btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.vehicle-reports-container .btn.btn-primary:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);\n}\n.vehicle-reports-container .form-control {\n  padding: 10px 15px;\n  border: 2px solid #e0e0e0;\n  border-radius: 6px;\n  background-color: white;\n  cursor: pointer;\n  font-size: 14px;\n  transition: all 0.3s ease;\n}\n.vehicle-reports-container .form-control:focus {\n  outline: none;\n  border-color: #667eea;\n}\n.vehicle-reports-container .text-center {\n  text-align: center;\n}\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 768px) {\n  .vehicle-reports-container {\n    padding: 15px;\n  }\n  .vehicle-reports-container .header-section {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 15px;\n  }\n  .vehicle-reports-container .header-section h1 {\n    font-size: 24px;\n  }\n  .vehicle-reports-container .filters-section {\n    grid-template-columns: 1fr;\n  }\n  .vehicle-reports-container .report-type-selector {\n    flex-direction: column;\n  }\n  .vehicle-reports-container .report-type-selector .type-btn {\n    width: 100%;\n  }\n  .vehicle-reports-container .table-section .table-responsive .reports-table thead {\n    display: none;\n  }\n  .vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.report-row {\n    display: block;\n    margin-bottom: 15px;\n    border: 1px solid #e0e0e0;\n  }\n  .vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.report-row td {\n    display: block;\n    padding: 10px;\n    text-align: right;\n  }\n  .vehicle-reports-container .table-section .table-responsive .reports-table tbody tr.report-row td:before {\n    content: attr(data-label);\n    font-weight: 600;\n    color: #667eea;\n    float: left;\n  }\n  .vehicle-reports-container .pagination-section {\n    flex-direction: column;\n  }\n  .vehicle-reports-container .pagination-section .pagination-controls {\n    width: 100%;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=vehicle-reports.component.css.map */\n'] }]
  }], () => [{ type: ParkaddaService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VehicleReportsComponent, { className: "VehicleReportsComponent", filePath: "src/app/components/admin/parkadda/vehicle-reports/vehicle-reports.component.ts", lineNumber: 55 });
})();
export {
  VehicleReportsComponent
};
//# sourceMappingURL=chunk-MOWINO55.js.map
