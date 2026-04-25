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
  Router
} from "./chunk-AAXJDYQS.js";
import "./chunk-BIRBC32G.js";
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
  ɵɵpipe,
  ɵɵpipeBind2,
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

// src/app/components/admin/parkadda/parking-list/parking-list.component.ts
function ParkingListComponent_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function ParkingListComponent_button_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openAddDialog());
    });
    \u0275\u0275element(1, "i", 20);
    \u0275\u0275text(2, " Add New Parking ");
    \u0275\u0275elementEnd();
  }
}
function ParkingListComponent_div_18_tr_24_button_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function ParkingListComponent_div_18_tr_24_button_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const parking_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editParking(parking_r4));
    });
    \u0275\u0275element(1, "i", 40);
    \u0275\u0275elementEnd();
  }
}
function ParkingListComponent_div_18_tr_24_button_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", function ParkingListComponent_div_18_tr_24_button_27_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const parking_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteParking(parking_r4));
    });
    \u0275\u0275element(1, "i", 42);
    \u0275\u0275elementEnd();
  }
}
function ParkingListComponent_div_18_tr_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 26)(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 27)(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td")(13, "div", 28);
    \u0275\u0275element(14, "div", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 30);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td")(18, "span", 31);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "td");
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "td", 32)(24, "button", 33);
    \u0275\u0275listener("click", function ParkingListComponent_div_18_tr_24_Template_button_click_24_listener() {
      const parking_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewDetails(parking_r4));
    });
    \u0275\u0275element(25, "i", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, ParkingListComponent_div_18_tr_24_button_26_Template, 2, 0, "button", 35)(27, ParkingListComponent_div_18_tr_24_button_27_Template, 2, 0, "button", 36);
    \u0275\u0275elementStart(28, "button", 37);
    \u0275\u0275listener("click", function ParkingListComponent_div_18_tr_24_Template_button_click_28_listener() {
      const parking_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewAnalytics(parking_r4));
    });
    \u0275\u0275element(29, "i", 38);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const parking_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(parking_r4.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(parking_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(parking_r4.location || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(parking_r4.totalSlots || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(parking_r4.availableSlots || "-");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", parking_r4.occupancyRate || 0, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", parking_r4.occupancyRate || 0, "%");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", parking_r4.active ? "badge-success" : "badge-danger");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", parking_r4.active ? "Active" : "Inactive", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(22, 13, parking_r4.lastUpdated, "short"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.canEdit);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canDelete);
  }
}
function ParkingListComponent_div_18_tr_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 43)(1, "td", 44);
    \u0275\u0275text(2, "No parking locations found");
    \u0275\u0275elementEnd()();
  }
}
function ParkingListComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22)(2, "table", 23)(3, "thead")(4, "tr")(5, "th");
    \u0275\u0275text(6, "ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Parking Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Total Slots");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Available Slots");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "Occupancy Rate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20, "Last Updated");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th");
    \u0275\u0275text(22, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "tbody");
    \u0275\u0275template(24, ParkingListComponent_div_18_tr_24_Template, 30, 16, "tr", 24)(25, ParkingListComponent_div_18_tr_25_Template, 3, 0, "tr", 25);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(24);
    \u0275\u0275property("ngForOf", ctx_r1.filteredParkings);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.filteredParkings.length === 0);
  }
}
function ParkingListComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275element(1, "div", 46);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading parking locations...");
    \u0275\u0275elementEnd()();
  }
}
function ParkingListComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "div", 48);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 49)(4, "button", 50);
    \u0275\u0275listener("click", function ParkingListComponent_div_20_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.previousPage());
    });
    \u0275\u0275text(5, " Previous ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 51);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 50);
    \u0275\u0275listener("click", function ParkingListComponent_div_20_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nextPage());
    });
    \u0275\u0275text(9, " Next ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" Showing ", ctx_r1.filteredParkings.length, " of ", ctx_r1.totalCount, " locations ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.currentPage === 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Page ", ctx_r1.currentPage, " of ", ctx_r1.totalPages);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage >= ctx_r1.totalPages);
  }
}
function ParkingListComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 52)(1, "div", 53)(2, "div", 54)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 55);
    \u0275\u0275listener("click", function ParkingListComponent_div_21_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDetailsModal());
    });
    \u0275\u0275element(6, "i", 56);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 57)(8, "div", 58)(9, "div", 59)(10, "label");
    \u0275\u0275text(11, "Parking ID:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 59)(15, "label");
    \u0275\u0275text(16, "Name:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 59)(20, "label");
    \u0275\u0275text(21, "Location:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 59)(25, "label");
    \u0275\u0275text(26, "Total Slots:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 59)(30, "label");
    \u0275\u0275text(31, "Available Slots:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span");
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 59)(35, "label");
    \u0275\u0275text(36, "Occupancy Rate:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span");
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 59)(40, "label");
    \u0275\u0275text(41, "Status:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span", 31);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 59)(45, "label");
    \u0275\u0275text(46, "Last Updated:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "span");
    \u0275\u0275text(48);
    \u0275\u0275pipe(49, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(50, "div", 60)(51, "button", 61);
    \u0275\u0275listener("click", function ParkingListComponent_div_21_Template_button_click_51_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDetailsModal());
    });
    \u0275\u0275text(52, "Close");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "button", 19);
    \u0275\u0275listener("click", function ParkingListComponent_div_21_Template_button_click_53_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.viewAnalytics(ctx_r1.selectedParking));
    });
    \u0275\u0275text(54, "View Analytics");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("@fadeInOut", void 0);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r1.selectedParking.name, " - Details");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.selectedParking.id);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.selectedParking.name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.selectedParking.location);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.selectedParking.totalSlots);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.selectedParking.availableSlots);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.selectedParking.occupancyRate, "%");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r1.selectedParking.active ? "badge-success" : "badge-danger");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedParking.active ? "Active" : "Inactive", " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(49, 11, ctx_r1.selectedParking.lastUpdated, "medium"));
  }
}
function ParkingListComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62)(1, "div", 63);
    \u0275\u0275element(2, "i", 64);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const toast_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", "toast-" + toast_r9.type)("@slideIn", void 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.getToastIcon(toast_r9.type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(toast_r9.message);
  }
}
var ParkingListComponent = class _ParkingListComponent {
  parkaddaService;
  authService;
  router;
  parkingLocations = [];
  filteredParkings = [];
  occupancyData = /* @__PURE__ */ new Map();
  loading = false;
  error = null;
  searchTerm = "";
  selectedParkingId = null;
  selectedParking = null;
  isAuthenticated = false;
  showDetailsModal = false;
  canAdd = true;
  canEdit = true;
  canDelete = true;
  statusFilter = "all";
  currentPage = 1;
  totalPages = 1;
  totalCount = 0;
  toasts = [];
  destroy$ = new Subject();
  constructor(parkaddaService, authService, router) {
    this.parkaddaService = parkaddaService;
    this.authService = authService;
    this.router = router;
  }
  ngOnInit() {
    this.checkAuthentication();
    this.loadParkingLocations();
  }
  checkAuthentication() {
    this.isAuthenticated = this.authService.isParkaddaAuthenticated();
    if (!this.isAuthenticated) {
      this.error = "Please login to Parkadda first";
    }
  }
  loadParkingLocations() {
    if (!this.isAuthenticated) {
      return;
    }
    this.loading = true;
    this.error = null;
    this.parkaddaService.getParkingList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.parkingLocations = response.data || [];
        this.filteredParkings = this.parkingLocations;
        this.totalCount = this.parkingLocations.length;
        this.loading = false;
        this.loadOccupancyForAllParkings();
      },
      error: (err) => {
        this.error = err.message || "Failed to load parking locations";
        this.loading = false;
      }
    });
  }
  loadOccupancyForAllParkings() {
    this.parkingLocations.forEach((parking) => {
      this.parkaddaService.getParkingOccupancy(parking.parking_table_id).pipe(takeUntil(this.destroy$)).subscribe({
        next: (occupancy) => {
          this.occupancyData.set(parking.parking_table_id, occupancy);
        },
        error: (err) => {
          console.error(`Failed to load occupancy for parking ${parking.parking_table_id}`, err);
        }
      });
    });
  }
  getOccupancy(parkingId) {
    return this.occupancyData.get(parkingId);
  }
  selectParking(parking) {
    this.parkaddaService.setSelectedParking(parking);
    this.selectedParkingId = parking.parking_table_id;
  }
  openAddDialog() {
    this.selectedParking = null;
  }
  onSearchChange() {
    this.filteredParkings = this.searchTerm ? this.parkingLocations.filter((p) => p.parking_name?.toLowerCase().includes(this.searchTerm.toLowerCase()) || p.location?.toLowerCase().includes(this.searchTerm.toLowerCase())) : this.parkingLocations;
    this.currentPage = 1;
  }
  onFilterChange() {
    this.filterByStatus();
    this.currentPage = 1;
  }
  filterByStatus() {
    if (this.statusFilter === "all") {
      this.filteredParkings = this.parkingLocations;
    } else if (this.statusFilter === "active") {
      this.filteredParkings = this.parkingLocations.filter((p) => p.status === "active" || p.active === true);
    } else if (this.statusFilter === "inactive") {
      this.filteredParkings = this.parkingLocations.filter((p) => p.status !== "active" && p.active !== true);
    }
  }
  editParking(parking) {
    this.selectedParking = parking;
    this.showDetailsModal = true;
  }
  deleteParking(parking) {
    if (confirm(`Delete parking: ${parking.parking_name}?`)) {
      this.showToast("Parking deleted successfully", "success");
    }
  }
  viewAnalytics(parking) {
    this.selectParking(parking);
    this.router.navigate(["/parkadda/dashboard"], {
      queryParams: { parkingId: parking.parking_table_id }
    });
  }
  viewDetails(parking) {
    this.selectParking(parking);
    this.router.navigate(["/parkadda/dashboard"], {
      queryParams: { parkingId: parking.parking_table_id }
    });
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedParking = null;
  }
  showToast(message, type = "info") {
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
      case "info":
        return "fa-info-circle";
      default:
        return "fa-info-circle";
    }
  }
  getOccupancyPercentage(parkingId) {
    const occupancy = this.getOccupancy(parkingId);
    return occupancy ? occupancy.occupancy_percentage : 0;
  }
  getOccupancyStatus(percentage) {
    if (percentage < 30)
      return "low";
    if (percentage < 70)
      return "medium";
    return "high";
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static \u0275fac = function ParkingListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ParkingListComponent)(\u0275\u0275directiveInject(ParkaddaService), \u0275\u0275directiveInject(ParkaddaAuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ParkingListComponent, selectors: [["app-parking-list"]], decls: 24, vars: 8, consts: [[1, "parking-list-container"], [1, "header-section"], [1, "header-controls"], ["class", "btn btn-primary", 3, "click", 4, "ngIf"], [1, "filters-section"], [1, "search-box"], ["type", "text", "placeholder", "Search parking locations...", 3, "ngModelChange", "input", "ngModel"], [1, "fas", "fa-search"], [1, "filter-controls"], [1, "form-control", 3, "ngModelChange", "change", "ngModel"], ["value", ""], ["value", "active"], ["value", "inactive"], ["class", "table-section", 4, "ngIf"], ["class", "loading-spinner", 4, "ngIf"], ["class", "pagination-section", 4, "ngIf"], ["class", "modal", 4, "ngIf"], [1, "toast-container"], ["class", "toast", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "btn", "btn-primary", 3, "click"], [1, "fas", "fa-plus"], [1, "table-section"], [1, "table-responsive"], [1, "parking-table"], ["class", "parking-row", 4, "ngFor", "ngForOf"], ["class", "no-data", 4, "ngIf"], [1, "parking-row"], [1, "parking-name"], [1, "occupancy-bar"], [1, "occupancy-fill"], [1, "occupancy-text"], [1, "badge", 3, "ngClass"], [1, "actions-cell"], ["title", "View Details", 1, "btn-sm", "btn-info", 3, "click"], [1, "fas", "fa-eye"], ["class", "btn-sm btn-warning", "title", "Edit", 3, "click", 4, "ngIf"], ["class", "btn-sm btn-danger", "title", "Delete", 3, "click", 4, "ngIf"], ["title", "View Analytics", 1, "btn-sm", "btn-primary", 3, "click"], [1, "fas", "fa-chart-bar"], ["title", "Edit", 1, "btn-sm", "btn-warning", 3, "click"], [1, "fas", "fa-edit"], ["title", "Delete", 1, "btn-sm", "btn-danger", 3, "click"], [1, "fas", "fa-trash"], [1, "no-data"], ["colspan", "9", 1, "text-center"], [1, "loading-spinner"], [1, "spinner"], [1, "pagination-section"], [1, "pagination-info"], [1, "pagination-controls"], [1, "btn-sm", 3, "click", "disabled"], [1, "page-info"], [1, "modal"], [1, "modal-content"], [1, "modal-header"], [1, "close-btn", 3, "click"], [1, "fas", "fa-times"], [1, "modal-body"], [1, "details-grid"], [1, "detail-item"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], [1, "toast", 3, "ngClass"], [1, "toast-content"], [1, "fas", 3, "ngClass"]], template: function ParkingListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "Parking Locations");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2);
      \u0275\u0275template(5, ParkingListComponent_button_5_Template, 3, 0, "button", 3);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 4)(7, "div", 5)(8, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function ParkingListComponent_Template_input_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("input", function ParkingListComponent_Template_input_input_8_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(9, "i", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 8)(11, "select", 9);
      \u0275\u0275twoWayListener("ngModelChange", function ParkingListComponent_Template_select_ngModelChange_11_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event);
        return $event;
      });
      \u0275\u0275listener("change", function ParkingListComponent_Template_select_change_11_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementStart(12, "option", 10);
      \u0275\u0275text(13, "All Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "option", 11);
      \u0275\u0275text(15, "Active");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "option", 12);
      \u0275\u0275text(17, "Inactive");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(18, ParkingListComponent_div_18_Template, 26, 2, "div", 13)(19, ParkingListComponent_div_19_Template, 4, 0, "div", 14)(20, ParkingListComponent_div_20_Template, 10, 6, "div", 15)(21, ParkingListComponent_div_21_Template, 55, 14, "div", 16);
      \u0275\u0275elementStart(22, "div", 17);
      \u0275\u0275template(23, ParkingListComponent_div_23_Template, 5, 4, "div", 18);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.canAdd);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.statusFilter);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredParkings.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.selectedParking && ctx.showDetailsModal);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.toasts);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DatePipe], styles: ['\n\n.parking-list-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n  min-height: 100vh;\n  font-family:\n    "Segoe UI",\n    Tahoma,\n    Geneva,\n    Verdana,\n    sans-serif;\n}\n.parking-list-container[_ngcontent-%COMP%]   .header-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 30px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .header-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 32px;\n  color: #2c3e50;\n  margin: 0;\n  font-weight: 700;\n}\n.parking-list-container[_ngcontent-%COMP%]   .header-section[_ngcontent-%COMP%]   .header-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 15px;\n  margin-bottom: 25px;\n  background: white;\n  padding: 15px 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.parking-list-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%]   .search-box[_ngcontent-%COMP%] {\n  flex: 1;\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.parking-list-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%]   .search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 15px 10px 35px;\n  border: 2px solid #e0e0e0;\n  border-radius: 6px;\n  font-size: 14px;\n  transition: all 0.3s ease;\n}\n.parking-list-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%]   .search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3498db;\n  box-shadow: 0 0 10px rgba(52, 152, 219, 0.2);\n}\n.parking-list-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%]   .search-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 12px;\n  color: #95a5a6;\n  font-size: 16px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%]   .filter-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%]   .filter-controls[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 10px 15px;\n  border: 2px solid #e0e0e0;\n  border-radius: 6px;\n  background-color: white;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.parking-list-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%]   .filter-controls[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3498db;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 10px;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin: 0;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 16px;\n  text-align: left;\n  color: white;\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #f0f0f0;\n  transition: all 0.3s ease;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]:hover {\n  background-color: #f8f9fa;\n  box-shadow: inset 0 0 10px rgba(52, 152, 219, 0.05);\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  color: #2c3e50;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .parking-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2980b9;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .occupancy-bar[_ngcontent-%COMP%] {\n  position: relative;\n  height: 24px;\n  background-color: #ecf0f1;\n  border-radius: 12px;\n  overflow: hidden;\n  margin-bottom: 4px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .occupancy-bar[_ngcontent-%COMP%]   .occupancy-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #2ecc71 0%,\n      #f39c12 70%,\n      #e74c3c 100%);\n  transition: width 0.3s ease;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .occupancy-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #34495e;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .badge.badge-success[_ngcontent-%COMP%] {\n  background-color: #d4edda;\n  color: #155724;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .badge.badge-danger[_ngcontent-%COMP%] {\n  background-color: #f8d7da;\n  color: #721c24;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 6px 10px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  font-size: 12px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%]   button.btn-sm.btn-info[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  color: #1976d2;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%]   button.btn-sm.btn-info[_ngcontent-%COMP%]:hover {\n  background-color: #1976d2;\n  color: white;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%]   button.btn-sm.btn-warning[_ngcontent-%COMP%] {\n  background-color: #fff3cd;\n  color: #856404;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%]   button.btn-sm.btn-warning[_ngcontent-%COMP%]:hover {\n  background-color: #ffc107;\n  color: white;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%]   button.btn-sm.btn-danger[_ngcontent-%COMP%] {\n  background-color: #f8d7da;\n  color: #721c24;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%]   button.btn-sm.btn-danger[_ngcontent-%COMP%]:hover {\n  background-color: #dc3545;\n  color: white;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%]   button.btn-sm.btn-primary[_ngcontent-%COMP%] {\n  background-color: #d1ecf1;\n  color: #0c5460;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%]   button.btn-sm.btn-primary[_ngcontent-%COMP%]:hover {\n  background-color: #17a2b8;\n  color: white;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.no-data[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px !important;\n}\n.parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.no-data[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  color: #95a5a6;\n  font-size: 16px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 60px 20px;\n  background: white;\n  border-radius: 10px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {\n  border: 4px solid #f3f3f3;\n  border-top: 4px solid #667eea;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin-bottom: 15px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #7f8c8d;\n  font-size: 14px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .pagination-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px;\n  background: white;\n  border-top: 1px solid #e0e0e0;\n  margin-top: 1px;\n  border-radius: 0 0 10px 10px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .pagination-section[_ngcontent-%COMP%]   .pagination-info[_ngcontent-%COMP%] {\n  color: #7f8c8d;\n  font-size: 13px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .pagination-section[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .pagination-section[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 8px 15px;\n  border: 2px solid #667eea;\n  background: white;\n  color: #667eea;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  font-size: 12px;\n  font-weight: 600;\n}\n.parking-list-container[_ngcontent-%COMP%]   .pagination-section[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #667eea;\n  color: white;\n}\n.parking-list-container[_ngcontent-%COMP%]   .pagination-section[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.parking-list-container[_ngcontent-%COMP%]   .pagination-section[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .page-info[_ngcontent-%COMP%] {\n  color: #7f8c8d;\n  font-size: 13px;\n  min-width: 100px;\n  text-align: center;\n}\n.parking-list-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n}\n.parking-list-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 10px;\n  width: 90%;\n  max-width: 600px;\n  max-height: 80vh;\n  overflow-y: auto;\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);\n}\n.parking-list-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px;\n  border-bottom: 1px solid #e0e0e0;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n}\n.parking-list-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: white;\n  font-size: 20px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: white;\n  font-size: 24px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.parking-list-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover {\n  transform: scale(1.2);\n}\n.parking-list-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%] {\n  padding: 25px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   .details-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   .details-grid[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.parking-list-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   .details-grid[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #7f8c8d;\n  text-transform: uppercase;\n  margin-bottom: 6px;\n  letter-spacing: 0.5px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   .details-grid[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #2c3e50;\n  font-weight: 500;\n}\n.parking-list-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding: 15px 20px;\n  border-top: 1px solid #e0e0e0;\n  background: #f8f9fa;\n}\n.parking-list-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  transition: all 0.2s ease;\n}\n.parking-list-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]   button.btn-secondary[_ngcontent-%COMP%] {\n  background: #e0e0e0;\n  color: #2c3e50;\n}\n.parking-list-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]   button.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #bdbdbd;\n}\n.parking-list-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]   button.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.parking-list-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]   button.btn-primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);\n}\n.parking-list-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n  z-index: 2000;\n  max-width: 400px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  padding: 15px 20px;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  animation: _ngcontent-%COMP%_slideInRight 0.3s ease;\n}\n.parking-list-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n}\n.parking-list-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-success[_ngcontent-%COMP%] {\n  border-left: 4px solid #2ecc71;\n}\n.parking-list-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-success[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%] {\n  color: #27ae60;\n}\n.parking-list-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-success[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #2ecc71;\n}\n.parking-list-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-error[_ngcontent-%COMP%] {\n  border-left: 4px solid #e74c3c;\n}\n.parking-list-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-error[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%] {\n  color: #c0392b;\n}\n.parking-list-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-error[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #e74c3c;\n}\n.parking-list-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-warning[_ngcontent-%COMP%] {\n  border-left: 4px solid #f39c12;\n}\n.parking-list-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-warning[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%] {\n  color: #d68910;\n}\n.parking-list-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-warning[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #f39c12;\n}\n.parking-list-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-info[_ngcontent-%COMP%] {\n  border-left: 4px solid #3498db;\n}\n.parking-list-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-info[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%] {\n  color: #2980b9;\n}\n.parking-list-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.toast-info[_ngcontent-%COMP%]   .toast-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #3498db;\n}\n.parking-list-container[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.parking-list-container[_ngcontent-%COMP%]   .btn.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.parking-list-container[_ngcontent-%COMP%]   .btn.btn-primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);\n}\n.parking-list-container[_ngcontent-%COMP%]   .btn.btn-secondary[_ngcontent-%COMP%] {\n  background: #ecf0f1;\n  color: #2c3e50;\n}\n.parking-list-container[_ngcontent-%COMP%]   .btn.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #bdc3c7;\n}\n.parking-list-container[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  padding: 10px 15px;\n  border: 2px solid #e0e0e0;\n  border-radius: 6px;\n  background-color: white;\n  cursor: pointer;\n  font-size: 14px;\n  transition: all 0.3s ease;\n}\n.parking-list-container[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_slideInRight {\n  from {\n    transform: translateX(400px);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@media (max-width: 768px) {\n  .parking-list-container[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n  .parking-list-container[_ngcontent-%COMP%]   .header-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 15px;\n  }\n  .parking-list-container[_ngcontent-%COMP%]   .header-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .parking-list-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%] {\n    display: block;\n    margin-bottom: 15px;\n    border: 1px solid #e0e0e0;\n  }\n  .parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: block;\n    padding: 10px;\n    text-align: right;\n  }\n  .parking-list-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]   .parking-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.parking-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:before {\n    content: attr(data-label);\n    font-weight: 600;\n    color: #667eea;\n    float: left;\n  }\n  .parking-list-container[_ngcontent-%COMP%]   .pagination-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 15px;\n  }\n}\n/*# sourceMappingURL=parking-list.component.css.map */'], data: { animation: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-10px)" }),
        animate("300ms ease-in", style({ opacity: 1, transform: "translateY(0)" }))
      ])
    ])
  ] } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ParkingListComponent, [{
    type: Component,
    args: [{ selector: "app-parking-list", standalone: true, imports: [CommonModule, FormsModule], animations: [
      trigger("fadeInOut", [
        transition(":enter", [
          style({ opacity: 0, transform: "translateY(-10px)" }),
          animate("300ms ease-in", style({ opacity: 1, transform: "translateY(0)" }))
        ])
      ])
    ], template: `<div class="parking-list-container">\r
  <div class="header-section">\r
    <h1>Parking Locations</h1>\r
    <div class="header-controls">\r
      <button class="btn btn-primary" (click)="openAddDialog()" *ngIf="canAdd">\r
        <i class="fas fa-plus"></i> Add New Parking\r
      </button>\r
    </div>\r
  </div>\r
\r
  <div class="filters-section">\r
    <div class="search-box">\r
      <input\r
        type="text"\r
        placeholder="Search parking locations..."\r
        [(ngModel)]="searchTerm"\r
        (input)="onSearchChange()">\r
      <i class="fas fa-search"></i>\r
    </div>\r
    <div class="filter-controls">\r
      <select [(ngModel)]="statusFilter" (change)="onFilterChange()" class="form-control">\r
        <option value="">All Status</option>\r
        <option value="active">Active</option>\r
        <option value="inactive">Inactive</option>\r
      </select>\r
    </div>\r
  </div>\r
\r
  <div class="table-section" *ngIf="!loading">\r
    <div class="table-responsive">\r
      <table class="parking-table">\r
        <thead>\r
          <tr>\r
            <th>ID</th>\r
            <th>Parking Name</th>\r
            <th>Location</th>\r
            <th>Total Slots</th>\r
            <th>Available Slots</th>\r
            <th>Occupancy Rate</th>\r
            <th>Status</th>\r
            <th>Last Updated</th>\r
            <th>Actions</th>\r
          </tr>\r
        </thead>\r
        <tbody>\r
          <tr *ngFor="let parking of filteredParkings" class="parking-row">\r
            <td>{{ parking.id }}</td>\r
            <td class="parking-name">\r
              <strong>{{ parking.name }}</strong>\r
            </td>\r
            <td>{{ parking.location || '-' }}</td>\r
            <td>{{ parking.totalSlots || '-' }}</td>\r
            <td>{{ parking.availableSlots || '-' }}</td>\r
            <td>\r
              <div class="occupancy-bar">\r
                <div class="occupancy-fill" [style.width.%]="parking.occupancyRate || 0"></div>\r
              </div>\r
              <span class="occupancy-text">{{ parking.occupancyRate || 0 }}%</span>\r
            </td>\r
            <td>\r
              <span class="badge" [ngClass]="parking.active ? 'badge-success' : 'badge-danger'">\r
                {{ parking.active ? 'Active' : 'Inactive' }}\r
              </span>\r
            </td>\r
            <td>{{ parking.lastUpdated | date: 'short' }}</td>\r
            <td class="actions-cell">\r
              <button\r
                class="btn-sm btn-info"\r
                (click)="viewDetails(parking)"\r
                title="View Details">\r
                <i class="fas fa-eye"></i>\r
              </button>\r
              <button\r
                class="btn-sm btn-warning"\r
                (click)="editParking(parking)"\r
                *ngIf="canEdit"\r
                title="Edit">\r
                <i class="fas fa-edit"></i>\r
              </button>\r
              <button\r
                class="btn-sm btn-danger"\r
                (click)="deleteParking(parking)"\r
                *ngIf="canDelete"\r
                title="Delete">\r
                <i class="fas fa-trash"></i>\r
              </button>\r
              <button\r
                class="btn-sm btn-primary"\r
                (click)="viewAnalytics(parking)"\r
                title="View Analytics">\r
                <i class="fas fa-chart-bar"></i>\r
              </button>\r
            </td>\r
          </tr>\r
          <tr *ngIf="filteredParkings.length === 0" class="no-data">\r
            <td colspan="9" class="text-center">No parking locations found</td>\r
          </tr>\r
        </tbody>\r
      </table>\r
    </div>\r
  </div>\r
\r
  <div class="loading-spinner" *ngIf="loading">\r
    <div class="spinner"></div>\r
    <p>Loading parking locations...</p>\r
  </div>\r
\r
  <!-- Pagination -->\r
  <div class="pagination-section" *ngIf="!loading && filteredParkings.length > 0">\r
    <div class="pagination-info">\r
      Showing {{ filteredParkings.length }} of {{ totalCount }} locations\r
    </div>\r
    <div class="pagination-controls">\r
      <button\r
        class="btn-sm"\r
        (click)="previousPage()"\r
        [disabled]="currentPage === 1">\r
        Previous\r
      </button>\r
      <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>\r
      <button\r
        class="btn-sm"\r
        (click)="nextPage()"\r
        [disabled]="currentPage >= totalPages">\r
        Next\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- Details Modal -->\r
  <div class="modal" *ngIf="selectedParking && showDetailsModal" [@fadeInOut]>\r
    <div class="modal-content">\r
      <div class="modal-header">\r
        <h2>{{ selectedParking.name }} - Details</h2>\r
        <button class="close-btn" (click)="closeDetailsModal()">\r
          <i class="fas fa-times"></i>\r
        </button>\r
      </div>\r
      <div class="modal-body">\r
        <div class="details-grid">\r
          <div class="detail-item">\r
            <label>Parking ID:</label>\r
            <span>{{ selectedParking.id }}</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Name:</label>\r
            <span>{{ selectedParking.name }}</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Location:</label>\r
            <span>{{ selectedParking.location }}</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Total Slots:</label>\r
            <span>{{ selectedParking.totalSlots }}</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Available Slots:</label>\r
            <span>{{ selectedParking.availableSlots }}</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Occupancy Rate:</label>\r
            <span>{{ selectedParking.occupancyRate }}%</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Status:</label>\r
            <span class="badge" [ngClass]="selectedParking.active ? 'badge-success' : 'badge-danger'">\r
              {{ selectedParking.active ? 'Active' : 'Inactive' }}\r
            </span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Last Updated:</label>\r
            <span>{{ selectedParking.lastUpdated | date: 'medium' }}</span>\r
          </div>\r
        </div>\r
      </div>\r
      <div class="modal-footer">\r
        <button class="btn btn-secondary" (click)="closeDetailsModal()">Close</button>\r
        <button class="btn btn-primary" (click)="viewAnalytics(selectedParking)">View Analytics</button>\r
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
`, styles: ['/* src/app/components/admin/parkadda/parking-list/parking-list.component.scss */\n.parking-list-container {\n  padding: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n  min-height: 100vh;\n  font-family:\n    "Segoe UI",\n    Tahoma,\n    Geneva,\n    Verdana,\n    sans-serif;\n}\n.parking-list-container .header-section {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 30px;\n}\n.parking-list-container .header-section h1 {\n  font-size: 32px;\n  color: #2c3e50;\n  margin: 0;\n  font-weight: 700;\n}\n.parking-list-container .header-section .header-controls {\n  display: flex;\n  gap: 10px;\n}\n.parking-list-container .filters-section {\n  display: flex;\n  gap: 15px;\n  margin-bottom: 25px;\n  background: white;\n  padding: 15px 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.parking-list-container .filters-section .search-box {\n  flex: 1;\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.parking-list-container .filters-section .search-box input {\n  width: 100%;\n  padding: 10px 15px 10px 35px;\n  border: 2px solid #e0e0e0;\n  border-radius: 6px;\n  font-size: 14px;\n  transition: all 0.3s ease;\n}\n.parking-list-container .filters-section .search-box input:focus {\n  outline: none;\n  border-color: #3498db;\n  box-shadow: 0 0 10px rgba(52, 152, 219, 0.2);\n}\n.parking-list-container .filters-section .search-box i {\n  position: absolute;\n  left: 12px;\n  color: #95a5a6;\n  font-size: 16px;\n}\n.parking-list-container .filters-section .filter-controls {\n  display: flex;\n  gap: 10px;\n}\n.parking-list-container .filters-section .filter-controls select {\n  padding: 10px 15px;\n  border: 2px solid #e0e0e0;\n  border-radius: 6px;\n  background-color: white;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.parking-list-container .filters-section .filter-controls select:focus {\n  outline: none;\n  border-color: #3498db;\n}\n.parking-list-container .table-section {\n  background: white;\n  border-radius: 10px;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.parking-list-container .table-section .table-responsive {\n  overflow-x: auto;\n}\n.parking-list-container .table-section .table-responsive .parking-table {\n  width: 100%;\n  border-collapse: collapse;\n  margin: 0;\n}\n.parking-list-container .table-section .table-responsive .parking-table thead {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n.parking-list-container .table-section .table-responsive .parking-table thead th {\n  padding: 16px;\n  text-align: left;\n  color: white;\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row {\n  border-bottom: 1px solid #f0f0f0;\n  transition: all 0.3s ease;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row:hover {\n  background-color: #f8f9fa;\n  box-shadow: inset 0 0 10px rgba(52, 152, 219, 0.05);\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row td {\n  padding: 14px 16px;\n  font-size: 13px;\n  color: #2c3e50;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row td .parking-name {\n  font-weight: 600;\n  color: #2980b9;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row td .occupancy-bar {\n  position: relative;\n  height: 24px;\n  background-color: #ecf0f1;\n  border-radius: 12px;\n  overflow: hidden;\n  margin-bottom: 4px;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row td .occupancy-bar .occupancy-fill {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #2ecc71 0%,\n      #f39c12 70%,\n      #e74c3c 100%);\n  transition: width 0.3s ease;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row td .occupancy-text {\n  font-size: 12px;\n  font-weight: 600;\n  color: #34495e;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row td .badge {\n  display: inline-block;\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row td .badge.badge-success {\n  background-color: #d4edda;\n  color: #155724;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row td .badge.badge-danger {\n  background-color: #f8d7da;\n  color: #721c24;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row .actions-cell {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row .actions-cell button {\n  padding: 6px 10px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  font-size: 12px;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row .actions-cell button.btn-sm.btn-info {\n  background-color: #e3f2fd;\n  color: #1976d2;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row .actions-cell button.btn-sm.btn-info:hover {\n  background-color: #1976d2;\n  color: white;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row .actions-cell button.btn-sm.btn-warning {\n  background-color: #fff3cd;\n  color: #856404;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row .actions-cell button.btn-sm.btn-warning:hover {\n  background-color: #ffc107;\n  color: white;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row .actions-cell button.btn-sm.btn-danger {\n  background-color: #f8d7da;\n  color: #721c24;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row .actions-cell button.btn-sm.btn-danger:hover {\n  background-color: #dc3545;\n  color: white;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row .actions-cell button.btn-sm.btn-primary {\n  background-color: #d1ecf1;\n  color: #0c5460;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row .actions-cell button.btn-sm.btn-primary:hover {\n  background-color: #17a2b8;\n  color: white;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.no-data {\n  text-align: center;\n  padding: 40px !important;\n}\n.parking-list-container .table-section .table-responsive .parking-table tbody tr.no-data td {\n  color: #95a5a6;\n  font-size: 16px;\n}\n.parking-list-container .loading-spinner {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 60px 20px;\n  background: white;\n  border-radius: 10px;\n}\n.parking-list-container .loading-spinner .spinner {\n  border: 4px solid #f3f3f3;\n  border-top: 4px solid #667eea;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  animation: spin 1s linear infinite;\n  margin-bottom: 15px;\n}\n.parking-list-container .loading-spinner p {\n  color: #7f8c8d;\n  font-size: 14px;\n}\n.parking-list-container .pagination-section {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px;\n  background: white;\n  border-top: 1px solid #e0e0e0;\n  margin-top: 1px;\n  border-radius: 0 0 10px 10px;\n}\n.parking-list-container .pagination-section .pagination-info {\n  color: #7f8c8d;\n  font-size: 13px;\n}\n.parking-list-container .pagination-section .pagination-controls {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.parking-list-container .pagination-section .pagination-controls button {\n  padding: 8px 15px;\n  border: 2px solid #667eea;\n  background: white;\n  color: #667eea;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  font-size: 12px;\n  font-weight: 600;\n}\n.parking-list-container .pagination-section .pagination-controls button:hover:not(:disabled) {\n  background: #667eea;\n  color: white;\n}\n.parking-list-container .pagination-section .pagination-controls button:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.parking-list-container .pagination-section .pagination-controls .page-info {\n  color: #7f8c8d;\n  font-size: 13px;\n  min-width: 100px;\n  text-align: center;\n}\n.parking-list-container .modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n}\n.parking-list-container .modal .modal-content {\n  background: white;\n  border-radius: 10px;\n  width: 90%;\n  max-width: 600px;\n  max-height: 80vh;\n  overflow-y: auto;\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);\n}\n.parking-list-container .modal .modal-content .modal-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px;\n  border-bottom: 1px solid #e0e0e0;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n}\n.parking-list-container .modal .modal-content .modal-header h2 {\n  margin: 0;\n  color: white;\n  font-size: 20px;\n}\n.parking-list-container .modal .modal-content .modal-header .close-btn {\n  background: none;\n  border: none;\n  color: white;\n  font-size: 24px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.parking-list-container .modal .modal-content .modal-header .close-btn:hover {\n  transform: scale(1.2);\n}\n.parking-list-container .modal .modal-content .modal-body {\n  padding: 25px;\n}\n.parking-list-container .modal .modal-content .modal-body .details-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n}\n.parking-list-container .modal .modal-content .modal-body .details-grid .detail-item {\n  display: flex;\n  flex-direction: column;\n}\n.parking-list-container .modal .modal-content .modal-body .details-grid .detail-item label {\n  font-size: 12px;\n  font-weight: 600;\n  color: #7f8c8d;\n  text-transform: uppercase;\n  margin-bottom: 6px;\n  letter-spacing: 0.5px;\n}\n.parking-list-container .modal .modal-content .modal-body .details-grid .detail-item span {\n  font-size: 14px;\n  color: #2c3e50;\n  font-weight: 500;\n}\n.parking-list-container .modal .modal-content .modal-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding: 15px 20px;\n  border-top: 1px solid #e0e0e0;\n  background: #f8f9fa;\n}\n.parking-list-container .modal .modal-content .modal-footer button {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  transition: all 0.2s ease;\n}\n.parking-list-container .modal .modal-content .modal-footer button.btn-secondary {\n  background: #e0e0e0;\n  color: #2c3e50;\n}\n.parking-list-container .modal .modal-content .modal-footer button.btn-secondary:hover {\n  background: #bdbdbd;\n}\n.parking-list-container .modal .modal-content .modal-footer button.btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.parking-list-container .modal .modal-content .modal-footer button.btn-primary:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);\n}\n.parking-list-container .toast-container {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n  z-index: 2000;\n  max-width: 400px;\n}\n.parking-list-container .toast-container .toast {\n  background: white;\n  border-radius: 8px;\n  padding: 15px 20px;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  animation: slideInRight 0.3s ease;\n}\n.parking-list-container .toast-container .toast .toast-content {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.parking-list-container .toast-container .toast .toast-content i {\n  font-size: 18px;\n}\n.parking-list-container .toast-container .toast .toast-content span {\n  font-size: 14px;\n  font-weight: 500;\n}\n.parking-list-container .toast-container .toast.toast-success {\n  border-left: 4px solid #2ecc71;\n}\n.parking-list-container .toast-container .toast.toast-success .toast-content {\n  color: #27ae60;\n}\n.parking-list-container .toast-container .toast.toast-success .toast-content i {\n  color: #2ecc71;\n}\n.parking-list-container .toast-container .toast.toast-error {\n  border-left: 4px solid #e74c3c;\n}\n.parking-list-container .toast-container .toast.toast-error .toast-content {\n  color: #c0392b;\n}\n.parking-list-container .toast-container .toast.toast-error .toast-content i {\n  color: #e74c3c;\n}\n.parking-list-container .toast-container .toast.toast-warning {\n  border-left: 4px solid #f39c12;\n}\n.parking-list-container .toast-container .toast.toast-warning .toast-content {\n  color: #d68910;\n}\n.parking-list-container .toast-container .toast.toast-warning .toast-content i {\n  color: #f39c12;\n}\n.parking-list-container .toast-container .toast.toast-info {\n  border-left: 4px solid #3498db;\n}\n.parking-list-container .toast-container .toast.toast-info .toast-content {\n  color: #2980b9;\n}\n.parking-list-container .toast-container .toast.toast-info .toast-content i {\n  color: #3498db;\n}\n.parking-list-container .btn {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.parking-list-container .btn.btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.parking-list-container .btn.btn-primary:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);\n}\n.parking-list-container .btn.btn-secondary {\n  background: #ecf0f1;\n  color: #2c3e50;\n}\n.parking-list-container .btn.btn-secondary:hover {\n  background: #bdc3c7;\n}\n.parking-list-container .form-control {\n  padding: 10px 15px;\n  border: 2px solid #e0e0e0;\n  border-radius: 6px;\n  background-color: white;\n  cursor: pointer;\n  font-size: 14px;\n  transition: all 0.3s ease;\n}\n.parking-list-container .form-control:focus {\n  outline: none;\n  border-color: #667eea;\n}\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes slideInRight {\n  from {\n    transform: translateX(400px);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@media (max-width: 768px) {\n  .parking-list-container {\n    padding: 15px;\n  }\n  .parking-list-container .header-section {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 15px;\n  }\n  .parking-list-container .header-section h1 {\n    font-size: 24px;\n  }\n  .parking-list-container .filters-section {\n    flex-direction: column;\n  }\n  .parking-list-container .table-section .table-responsive .parking-table thead {\n    display: none;\n  }\n  .parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row {\n    display: block;\n    margin-bottom: 15px;\n    border: 1px solid #e0e0e0;\n  }\n  .parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row td {\n    display: block;\n    padding: 10px;\n    text-align: right;\n  }\n  .parking-list-container .table-section .table-responsive .parking-table tbody tr.parking-row td:before {\n    content: attr(data-label);\n    font-weight: 600;\n    color: #667eea;\n    float: left;\n  }\n  .parking-list-container .pagination-section {\n    flex-direction: column;\n    gap: 15px;\n  }\n}\n/*# sourceMappingURL=parking-list.component.css.map */\n'] }]
  }], () => [{ type: ParkaddaService }, { type: ParkaddaAuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ParkingListComponent, { className: "ParkingListComponent", filePath: "src/app/components/admin/parkadda/parking-list/parking-list.component.ts", lineNumber: 27 });
})();
export {
  ParkingListComponent
};
//# sourceMappingURL=chunk-LVG2YLKH.js.map
