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
  DecimalPipe,
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

// src/app/components/admin/parkadda/transaction-reports/transaction-reports.component.ts
function TransactionReportsComponent_option_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 38);
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
function TransactionReportsComponent_div_65_tr_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 45)(1, "td", 46)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 47);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 48)(8, "span", 49);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 50);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td")(18, "span", 51);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "td");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td", 52)(23, "button", 53);
    \u0275\u0275listener("click", function TransactionReportsComponent_div_65_tr_27_Template_button_click_23_listener() {
      const transaction_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.viewDetails(transaction_r3));
    });
    \u0275\u0275element(24, "i", 54);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const transaction_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("@fadeInOut", void 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(transaction_r3.transactionId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 10, transaction_r3.amount, "1.2-2"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(transaction_r3.transactionType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(transaction_r3.vehicleNumber);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(transaction_r3.parkingLocation);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(16, 13, transaction_r3.transactionDate, "short"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r3.getStatusClass(transaction_r3.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", transaction_r3.status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(transaction_r3.paymentMethod);
  }
}
function TransactionReportsComponent_div_65_tr_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 55)(1, "td", 56);
    \u0275\u0275text(2, "No transactions found");
    \u0275\u0275elementEnd()();
  }
}
function TransactionReportsComponent_div_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39)(1, "div", 40)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 41)(5, "table", 42)(6, "thead")(7, "tr")(8, "th");
    \u0275\u0275text(9, "Transaction ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Amount (\u20B9)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Vehicle Number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "Location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th");
    \u0275\u0275text(19, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th");
    \u0275\u0275text(21, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "th");
    \u0275\u0275text(23, "Payment Method");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th");
    \u0275\u0275text(25, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "tbody");
    \u0275\u0275template(27, TransactionReportsComponent_div_65_tr_27_Template, 25, 16, "tr", 43)(28, TransactionReportsComponent_div_65_tr_28_Template, 3, 0, "tr", 44);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Total Results: ", ctx_r3.filteredTransactions.length, " of ", ctx_r3.totalCount);
    \u0275\u0275advance(24);
    \u0275\u0275property("ngForOf", ctx_r3.filteredTransactions);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.filteredTransactions.length === 0);
  }
}
function TransactionReportsComponent_div_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57);
    \u0275\u0275element(1, "div", 58);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading transactions...");
    \u0275\u0275elementEnd()();
  }
}
function TransactionReportsComponent_div_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59)(1, "div", 60)(2, "button", 61);
    \u0275\u0275listener("click", function TransactionReportsComponent_div_67_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.previousPage());
    });
    \u0275\u0275element(3, "i", 62);
    \u0275\u0275text(4, " Previous ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 63);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 61);
    \u0275\u0275listener("click", function TransactionReportsComponent_div_67_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.nextPage());
    });
    \u0275\u0275text(8, " Next ");
    \u0275\u0275element(9, "i", 64);
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
function TransactionReportsComponent_div_68_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 65)(1, "div", 66)(2, "div", 67)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 68);
    \u0275\u0275listener("click", function TransactionReportsComponent_div_68_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeDetailsModal());
    });
    \u0275\u0275element(6, "i", 69);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 70)(8, "div", 71)(9, "div", 72)(10, "label");
    \u0275\u0275text(11, "Transaction ID:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 72)(15, "label");
    \u0275\u0275text(16, "Amount:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 72)(21, "label");
    \u0275\u0275text(22, "Type:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 49);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 72)(26, "label");
    \u0275\u0275text(27, "Vehicle Number:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 72)(31, "label");
    \u0275\u0275text(32, "Location:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span");
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 72)(36, "label");
    \u0275\u0275text(37, "Date:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "span");
    \u0275\u0275text(39);
    \u0275\u0275pipe(40, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 72)(42, "label");
    \u0275\u0275text(43, "Status:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span", 51);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 72)(47, "label");
    \u0275\u0275text(48, "Payment Method:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "span");
    \u0275\u0275text(50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 72)(52, "label");
    \u0275\u0275text(53, "Reference:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "span");
    \u0275\u0275text(55);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(56, "div", 73)(57, "button", 74);
    \u0275\u0275listener("click", function TransactionReportsComponent_div_68_Template_button_click_57_listener() {
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
    \u0275\u0275textInterpolate1("Transaction Details - ", ctx_r3.selectedTransaction.transactionId);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r3.selectedTransaction.transactionId);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind2(19, 12, ctx_r3.selectedTransaction.amount, "1.2-2"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r3.selectedTransaction.transactionType);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.selectedTransaction.vehicleNumber);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.selectedTransaction.parkingLocation);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(40, 15, ctx_r3.selectedTransaction.transactionDate, "medium"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", ctx_r3.getStatusClass(ctx_r3.selectedTransaction.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.selectedTransaction.status, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.selectedTransaction.paymentMethod);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.selectedTransaction.reference);
  }
}
function TransactionReportsComponent_div_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 75)(1, "div", 76);
    \u0275\u0275element(2, "i", 77);
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
var TransactionReportsComponent = class _TransactionReportsComponent {
  parkaddaService;
  cashTransactions = [];
  cardTransactions = [];
  upiTransactions = [];
  fastagTransactions = [];
  paymentGatewayTransactions = [];
  filteredTransactions = [];
  loading = false;
  selectedTransactionType = "cash";
  // 'cash', 'card', 'upi', 'fastag', 'gateway', 'all'
  searchTerm = "";
  selectedTransaction = null;
  showDetailsModal = false;
  toasts = [];
  parkings = [];
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;
  totalPages = 1;
  totalAmount = 0;
  filter = {
    parkingId: null,
    fromDate: this.getFormattedDate(new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - 30))),
    toDate: this.getFormattedDate(/* @__PURE__ */ new Date()),
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
    this.loadTransactions();
    this.searchSubject$.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe(() => {
      this.filterTransactions();
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
  loadTransactions() {
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
      this.parkaddaService.getCashTransactions(params).toPromise(),
      this.parkaddaService.getCardTransactions(params).toPromise(),
      this.parkaddaService.getUPITransactions(params).toPromise(),
      this.parkaddaService.getFastagTransactions(params).toPromise(),
      this.parkaddaService.getPaymentGatewayTransactions(params).toPromise()
    ]).then(([cashRes, cardRes, upiRes, fastagRes, gatewayRes]) => {
      this.cashTransactions = cashRes?.data?.results || [];
      this.cardTransactions = cardRes?.data?.results || [];
      this.upiTransactions = upiRes?.data?.results || [];
      this.fastagTransactions = fastagRes?.data?.results || [];
      this.paymentGatewayTransactions = gatewayRes?.data?.results || [];
      this.updateDisplayedTransactions();
      this.totalCount = cashRes?.data?.total_count || 0;
      this.totalPages = Math.ceil(this.totalCount / this.filter.pageSize);
      this.calculateTotalAmount();
      this.loading = false;
    }).catch((error) => {
      console.error("Error loading transactions:", error);
      this.showToast("Error loading transactions", "error");
      this.loading = false;
    });
  }
  updateDisplayedTransactions() {
    let transactions = [];
    switch (this.selectedTransactionType) {
      case "cash":
        transactions = this.cashTransactions;
        break;
      case "card":
        transactions = this.cardTransactions;
        break;
      case "upi":
        transactions = this.upiTransactions;
        break;
      case "fastag":
        transactions = this.fastagTransactions;
        break;
      case "gateway":
        transactions = this.paymentGatewayTransactions;
        break;
      case "all":
        transactions = [
          ...this.cashTransactions,
          ...this.cardTransactions,
          ...this.upiTransactions,
          ...this.fastagTransactions,
          ...this.paymentGatewayTransactions
        ];
        break;
      default:
        transactions = this.cashTransactions;
    }
    this.filteredTransactions = transactions;
    this.filterTransactions();
  }
  onTransactionTypeChange() {
    this.currentPage = 1;
    this.updateDisplayedTransactions();
  }
  onFilterChange() {
    this.currentPage = 1;
    this.loadTransactions();
  }
  onSearchChange() {
    this.searchSubject$.next(this.searchTerm);
  }
  filterTransactions() {
    this.filteredTransactions = this.filteredTransactions.filter((tx) => {
      return !this.searchTerm || tx.transactionId.toLowerCase().includes(this.searchTerm.toLowerCase()) || tx.vehicleNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) || tx.parkingLocation.toLowerCase().includes(this.searchTerm.toLowerCase()) || tx.reference.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
  calculateTotalAmount() {
    this.totalAmount = this.filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  }
  viewDetails(transaction) {
    this.selectedTransaction = transaction;
    this.showDetailsModal = true;
  }
  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedTransaction = null;
  }
  exportToCSV() {
    if (this.filteredTransactions.length === 0) {
      this.showToast("No data to export", "warning");
      return;
    }
    const headers = ["Transaction ID", "Amount", "Type", "Vehicle Number", "Location", "Date", "Status", "Payment Method"];
    const rows = this.filteredTransactions.map((tx) => [
      tx.transactionId,
      tx.amount,
      tx.transactionType,
      tx.vehicleNumber,
      tx.parkingLocation,
      tx.transactionDate,
      tx.status,
      tx.paymentMethod
    ]);
    let csvContent = headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.map((cell) => `"${cell}"`).join(",") + "\n";
    });
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transaction-reports-${(/* @__PURE__ */ new Date()).getTime()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    this.showToast("Report exported successfully", "success");
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.filter.currentPage = this.currentPage;
      this.loadTransactions();
    }
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filter.currentPage = this.currentPage;
      this.loadTransactions();
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
      case "success":
        return "status-success";
      case "pending":
        return "status-pending";
      case "failed":
        return "status-failed";
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
  static \u0275fac = function TransactionReportsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TransactionReportsComponent)(\u0275\u0275directiveInject(ParkaddaService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TransactionReportsComponent, selectors: [["app-transaction-reports"]], decls: 71, vars: 31, consts: [[1, "transaction-reports-container"], [1, "header-section"], [1, "header-controls"], [1, "btn", "btn-primary", 3, "click"], [1, "fas", "fa-download"], [1, "filters-section"], [1, "filter-group"], ["for", "parkingSelect"], ["id", "parkingSelect", 1, "form-control", 3, "ngModelChange", "change", "ngModel"], ["value", "", "disabled", ""], [3, "value", 4, "ngFor", "ngForOf"], ["for", "fromDate"], ["id", "fromDate", "type", "date", 1, "form-control", 3, "ngModelChange", "change", "ngModel"], ["for", "toDate"], ["id", "toDate", "type", "date", 1, "form-control", 3, "ngModelChange", "change", "ngModel"], [1, "transaction-type-selector"], [1, "type-btn", 3, "click"], [1, "fas", "fa-money-bill"], [1, "fas", "fa-credit-card"], [1, "fas", "fa-mobile-alt"], [1, "fas", "fa-tag"], [1, "fas", "fa-gateway"], [1, "fas", "fa-list"], [1, "stats-section"], [1, "stat-card"], [1, "stat-label"], [1, "stat-value"], [1, "stat-card", "highlight"], [1, "search-section"], [1, "search-box"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Search by transaction ID, vehicle number, or location...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], ["class", "table-section", 4, "ngIf"], ["class", "loading-spinner", 4, "ngIf"], ["class", "pagination-section", 4, "ngIf"], ["class", "modal", 4, "ngIf"], [1, "toast-container"], ["class", "toast", 3, "ngClass", 4, "ngFor", "ngForOf"], [3, "value"], [1, "table-section"], [1, "results-info"], [1, "table-responsive"], [1, "transactions-table"], ["class", "transaction-row", 4, "ngFor", "ngForOf"], ["class", "no-data", 4, "ngIf"], [1, "transaction-row"], [1, "transaction-id"], [1, "amount"], [1, "type-badge"], [1, "badge", "badge-type"], [1, "date"], [1, "badge", 3, "ngClass"], [1, "actions-cell"], ["title", "View Details", 1, "btn-sm", "btn-info", 3, "click"], [1, "fas", "fa-eye"], [1, "no-data"], ["colspan", "9", 1, "text-center"], [1, "loading-spinner"], [1, "spinner"], [1, "pagination-section"], [1, "pagination-controls"], [1, "btn-sm", 3, "click", "disabled"], [1, "fas", "fa-chevron-left"], [1, "page-info"], [1, "fas", "fa-chevron-right"], [1, "modal"], [1, "modal-content"], [1, "modal-header"], [1, "close-btn", 3, "click"], [1, "fas", "fa-times"], [1, "modal-body"], [1, "details-grid"], [1, "detail-item"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], [1, "toast", 3, "ngClass"], [1, "toast-content"], [1, "fas", 3, "ngClass"]], template: function TransactionReportsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "Transaction Reports");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2)(5, "button", 3);
      \u0275\u0275listener("click", function TransactionReportsComponent_Template_button_click_5_listener() {
        return ctx.exportToCSV();
      });
      \u0275\u0275element(6, "i", 4);
      \u0275\u0275text(7, " Export to CSV ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(8, "div", 5)(9, "div", 6)(10, "label", 7);
      \u0275\u0275text(11, "Parking Location:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "select", 8);
      \u0275\u0275twoWayListener("ngModelChange", function TransactionReportsComponent_Template_select_ngModelChange_12_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filter.parkingId, $event) || (ctx.filter.parkingId = $event);
        return $event;
      });
      \u0275\u0275listener("change", function TransactionReportsComponent_Template_select_change_12_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementStart(13, "option", 9);
      \u0275\u0275text(14, "Select Parking");
      \u0275\u0275elementEnd();
      \u0275\u0275template(15, TransactionReportsComponent_option_15_Template, 2, 2, "option", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 6)(17, "label", 11);
      \u0275\u0275text(18, "From Date:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "input", 12);
      \u0275\u0275twoWayListener("ngModelChange", function TransactionReportsComponent_Template_input_ngModelChange_19_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filter.fromDate, $event) || (ctx.filter.fromDate = $event);
        return $event;
      });
      \u0275\u0275listener("change", function TransactionReportsComponent_Template_input_change_19_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 6)(21, "label", 13);
      \u0275\u0275text(22, "To Date:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "input", 14);
      \u0275\u0275twoWayListener("ngModelChange", function TransactionReportsComponent_Template_input_ngModelChange_23_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filter.toDate, $event) || (ctx.filter.toDate = $event);
        return $event;
      });
      \u0275\u0275listener("change", function TransactionReportsComponent_Template_input_change_23_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "div", 15)(25, "button", 16);
      \u0275\u0275listener("click", function TransactionReportsComponent_Template_button_click_25_listener() {
        ctx.selectedTransactionType = "cash";
        return ctx.onTransactionTypeChange();
      });
      \u0275\u0275element(26, "i", 17);
      \u0275\u0275text(27, " Cash ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "button", 16);
      \u0275\u0275listener("click", function TransactionReportsComponent_Template_button_click_28_listener() {
        ctx.selectedTransactionType = "card";
        return ctx.onTransactionTypeChange();
      });
      \u0275\u0275element(29, "i", 18);
      \u0275\u0275text(30, " Card ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "button", 16);
      \u0275\u0275listener("click", function TransactionReportsComponent_Template_button_click_31_listener() {
        ctx.selectedTransactionType = "upi";
        return ctx.onTransactionTypeChange();
      });
      \u0275\u0275element(32, "i", 19);
      \u0275\u0275text(33, " UPI ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "button", 16);
      \u0275\u0275listener("click", function TransactionReportsComponent_Template_button_click_34_listener() {
        ctx.selectedTransactionType = "fastag";
        return ctx.onTransactionTypeChange();
      });
      \u0275\u0275element(35, "i", 20);
      \u0275\u0275text(36, " FASTag ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "button", 16);
      \u0275\u0275listener("click", function TransactionReportsComponent_Template_button_click_37_listener() {
        ctx.selectedTransactionType = "gateway";
        return ctx.onTransactionTypeChange();
      });
      \u0275\u0275element(38, "i", 21);
      \u0275\u0275text(39, " Payment Gateway ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "button", 16);
      \u0275\u0275listener("click", function TransactionReportsComponent_Template_button_click_40_listener() {
        ctx.selectedTransactionType = "all";
        return ctx.onTransactionTypeChange();
      });
      \u0275\u0275element(41, "i", 22);
      \u0275\u0275text(42, " All ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "div", 23)(44, "div", 24)(45, "div", 25);
      \u0275\u0275text(46, "Total Transactions");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "div", 26);
      \u0275\u0275text(48);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "div", 27)(50, "div", 25);
      \u0275\u0275text(51, "Total Amount");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "div", 26);
      \u0275\u0275text(53);
      \u0275\u0275pipe(54, "number");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "div", 24)(56, "div", 25);
      \u0275\u0275text(57, "Avg Amount");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "div", 26);
      \u0275\u0275text(59);
      \u0275\u0275pipe(60, "number");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(61, "div", 28)(62, "div", 29);
      \u0275\u0275element(63, "i", 30);
      \u0275\u0275elementStart(64, "input", 31);
      \u0275\u0275twoWayListener("ngModelChange", function TransactionReportsComponent_Template_input_ngModelChange_64_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("input", function TransactionReportsComponent_Template_input_input_64_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(65, TransactionReportsComponent_div_65_Template, 29, 4, "div", 32)(66, TransactionReportsComponent_div_66_Template, 4, 0, "div", 33)(67, TransactionReportsComponent_div_67_Template, 10, 4, "div", 34)(68, TransactionReportsComponent_div_68_Template, 59, 18, "div", 35);
      \u0275\u0275elementStart(69, "div", 36);
      \u0275\u0275template(70, TransactionReportsComponent_div_70_Template, 5, 4, "div", 37);
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
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.selectedTransactionType === "cash");
      \u0275\u0275advance(3);
      \u0275\u0275classProp("active", ctx.selectedTransactionType === "card");
      \u0275\u0275advance(3);
      \u0275\u0275classProp("active", ctx.selectedTransactionType === "upi");
      \u0275\u0275advance(3);
      \u0275\u0275classProp("active", ctx.selectedTransactionType === "fastag");
      \u0275\u0275advance(3);
      \u0275\u0275classProp("active", ctx.selectedTransactionType === "gateway");
      \u0275\u0275advance(3);
      \u0275\u0275classProp("active", ctx.selectedTransactionType === "all");
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.filteredTransactions.length);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind2(54, 25, ctx.totalAmount, "1.2-2"));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind2(60, 28, ctx.totalAmount / (ctx.filteredTransactions.length || 1), "1.2-2"));
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredTransactions.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.selectedTransaction && ctx.showDetailsModal);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.toasts);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DecimalPipe, DatePipe], styles: ["\n\n.transaction-reports-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  background-color: #f5f7fa;\n  min-height: 100vh;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .header-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 30px;\n  padding: 20px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .header-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #2c3e50;\n  font-size: 28px;\n  font-weight: 600;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .header-section[_ngcontent-%COMP%]   .header-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 15px;\n  margin-bottom: 25px;\n  padding: 20px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  margin-bottom: 8px;\n  color: #2c3e50;\n  font-size: 14px;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  padding: 10px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n  transition: border-color 0.3s;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #007bff;\n  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .transaction-type-selector[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-bottom: 25px;\n  flex-wrap: wrap;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .transaction-type-selector[_ngcontent-%COMP%]   .type-btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border: 2px solid #ddd;\n  background: white;\n  border-radius: 4px;\n  cursor: pointer;\n  font-weight: 500;\n  transition: all 0.3s;\n  font-size: 14px;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .transaction-type-selector[_ngcontent-%COMP%]   .type-btn[_ngcontent-%COMP%]:hover {\n  border-color: #007bff;\n  color: #007bff;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .transaction-type-selector[_ngcontent-%COMP%]   .type-btn.active[_ngcontent-%COMP%] {\n  background: #007bff;\n  color: white;\n  border-color: #007bff;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .search-bar[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .search-bar[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .search-bar[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #007bff;\n  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {\n  border: 4px solid #f3f3f3;\n  border-top: 4px solid #007bff;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .stats-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 20px;\n  margin-bottom: 25px;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .stats-section[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%] {\n  padding: 20px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  text-align: center;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .stats-section[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n  text-transform: uppercase;\n  font-weight: 600;\n  margin-bottom: 10px;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .stats-section[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  color: #2c3e50;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border-bottom: 2px solid #dee2e6;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 15px;\n  text-align: left;\n  font-weight: 600;\n  color: #2c3e50;\n  font-size: 13px;\n  text-transform: uppercase;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #dee2e6;\n  transition: background-color 0.2s;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background-color: #f8f9fa;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 15px;\n  color: #555;\n  font-size: 14px;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n  font-weight: 600;\n  transition: all 0.3s;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   .action-btn.view-btn[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #007bff;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   .action-btn.view-btn[_ngcontent-%COMP%]:hover {\n  background: #007bff;\n  color: white;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 5px;\n  margin-top: 20px;\n  padding: 20px;\n  background: white;\n  border-radius: 8px;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.transaction-reports-container[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #ddd;\n  background: white;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: all 0.3s;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled), \n.transaction-reports-container[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #007bff;\n  color: white;\n  border-color: #007bff;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%], \n.transaction-reports-container[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   span.active[_ngcontent-%COMP%] {\n  background: #007bff;\n  color: white;\n  border-color: #007bff;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled, \n.transaction-reports-container[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .no-data-message[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  color: #666;\n  font-size: 16px;\n  background: white;\n  border-radius: 8px;\n  margin-top: 20px;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 20px;\n  right: 20px;\n  z-index: 1000;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast[_ngcontent-%COMP%] {\n  padding: 15px 20px;\n  margin-bottom: 10px;\n  border-radius: 4px;\n  animation: _ngcontent-%COMP%_slideIn 0.3s ease-out;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.success[_ngcontent-%COMP%] {\n  background: #d4edda;\n  color: #155724;\n  border: 1px solid #c3e6cb;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.error[_ngcontent-%COMP%] {\n  background: #f8d7da;\n  color: #721c24;\n  border: 1px solid #f5c6cb;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.warning[_ngcontent-%COMP%] {\n  background: #fff3cd;\n  color: #856404;\n  border: 1px solid #ffeeba;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .toast-container[_ngcontent-%COMP%]   .toast.info[_ngcontent-%COMP%] {\n  background: #d1ecf1;\n  color: #0c5460;\n  border: 1px solid #bee5eb;\n}\n@keyframes _ngcontent-%COMP%_slideIn {\n  from {\n    transform: translateX(400px);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 900;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);\n  max-width: 600px;\n  width: 90%;\n  max-height: 90vh;\n  overflow-y: auto;\n  animation: _ngcontent-%COMP%_slideUp 0.3s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(50px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%] {\n  padding: 20px;\n  border-bottom: 1px solid #dee2e6;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #2c3e50;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #666;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover {\n  color: #000;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 12px 0;\n  border-bottom: 1px solid #eee;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .detail-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2c3e50;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .detail-value[_ngcontent-%COMP%] {\n  color: #555;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%] {\n  padding: 20px;\n  border-top: 1px solid #dee2e6;\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 4px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .btn.btn-primary[_ngcontent-%COMP%] {\n  background: #007bff;\n  color: white;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .btn.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #0056b3;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .btn.btn-secondary[_ngcontent-%COMP%] {\n  background: #6c757d;\n  color: white;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .btn.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #545b62;\n}\n.transaction-reports-container[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n@media (max-width: 768px) {\n  .transaction-reports-container[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n  .transaction-reports-container[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .transaction-reports-container[_ngcontent-%COMP%]   .header-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 15px;\n    text-align: center;\n  }\n  .transaction-reports-container[_ngcontent-%COMP%]   .header-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .transaction-reports-container[_ngcontent-%COMP%]   .transaction-type-selector[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .transaction-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%] {\n    overflow-x: auto;\n  }\n  .transaction-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .transaction-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n   .transaction-reports-container[_ngcontent-%COMP%]   .table-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n}\n/*# sourceMappingURL=transaction-reports.component.css.map */"], data: { animation: [
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TransactionReportsComponent, [{
    type: Component,
    args: [{ selector: "app-transaction-reports", standalone: true, imports: [CommonModule, FormsModule], animations: [
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
    ], template: `<div class="transaction-reports-container">\r
  <div class="header-section">\r
    <h1>Transaction Reports</h1>\r
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
      <select \r
        id="parkingSelect"\r
        [(ngModel)]="filter.parkingId" \r
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
      <input \r
        id="fromDate"\r
        type="date" \r
        [(ngModel)]="filter.fromDate"\r
        (change)="onFilterChange()"\r
        class="form-control">\r
    </div>\r
\r
    <div class="filter-group">\r
      <label for="toDate">To Date:</label>\r
      <input \r
        id="toDate"\r
        type="date" \r
        [(ngModel)]="filter.toDate"\r
        (change)="onFilterChange()"\r
        class="form-control">\r
    </div>\r
  </div>\r
\r
  <div class="transaction-type-selector">\r
    <button \r
      class="type-btn" \r
      [class.active]="selectedTransactionType === 'cash'"\r
      (click)="selectedTransactionType = 'cash'; onTransactionTypeChange()">\r
      <i class="fas fa-money-bill"></i> Cash\r
    </button>\r
    <button \r
      class="type-btn" \r
      [class.active]="selectedTransactionType === 'card'"\r
      (click)="selectedTransactionType = 'card'; onTransactionTypeChange()">\r
      <i class="fas fa-credit-card"></i> Card\r
    </button>\r
    <button \r
      class="type-btn" \r
      [class.active]="selectedTransactionType === 'upi'"\r
      (click)="selectedTransactionType = 'upi'; onTransactionTypeChange()">\r
      <i class="fas fa-mobile-alt"></i> UPI\r
    </button>\r
    <button \r
      class="type-btn" \r
      [class.active]="selectedTransactionType === 'fastag'"\r
      (click)="selectedTransactionType = 'fastag'; onTransactionTypeChange()">\r
        <i class="fas fa-tag"></i> FASTag\r
    </button>\r
    <button \r
      class="type-btn" \r
      [class.active]="selectedTransactionType === 'gateway'"\r
      (click)="selectedTransactionType = 'gateway'; onTransactionTypeChange()">\r
      <i class="fas fa-gateway"></i> Payment Gateway\r
    </button>\r
    <button \r
      class="type-btn" \r
      [class.active]="selectedTransactionType === 'all'"\r
      (click)="selectedTransactionType = 'all'; onTransactionTypeChange()">\r
      <i class="fas fa-list"></i> All\r
    </button>\r
  </div>\r
\r
  <div class="stats-section">\r
    <div class="stat-card">\r
      <div class="stat-label">Total Transactions</div>\r
      <div class="stat-value">{{ filteredTransactions.length }}</div>\r
    </div>\r
    <div class="stat-card highlight">\r
      <div class="stat-label">Total Amount</div>\r
      <div class="stat-value">\u20B9{{ totalAmount | number: '1.2-2' }}</div>\r
    </div>\r
    <div class="stat-card">\r
      <div class="stat-label">Avg Amount</div>\r
      <div class="stat-value">\u20B9{{ (totalAmount / (filteredTransactions.length || 1)) | number: '1.2-2' }}</div>\r
    </div>\r
  </div>\r
\r
  <div class="search-section">\r
    <div class="search-box">\r
      <i class="fas fa-search"></i>\r
      <input \r
        type="text" \r
        placeholder="Search by transaction ID, vehicle number, or location..." \r
        [(ngModel)]="searchTerm"\r
        (input)="onSearchChange()"\r
        class="search-input">\r
    </div>\r
  </div>\r
\r
  <div class="table-section" *ngIf="!loading">\r
    <div class="results-info">\r
      <span>Total Results: {{ filteredTransactions.length }} of {{ totalCount }}</span>\r
    </div>\r
    <div class="table-responsive">\r
      <table class="transactions-table">\r
        <thead>\r
          <tr>\r
            <th>Transaction ID</th>\r
            <th>Amount (\u20B9)</th>\r
            <th>Type</th>\r
            <th>Vehicle Number</th>\r
            <th>Location</th>\r
            <th>Date</th>\r
            <th>Status</th>\r
            <th>Payment Method</th>\r
            <th>Actions</th>\r
          </tr>\r
        </thead>\r
        <tbody>\r
          <tr *ngFor="let transaction of filteredTransactions" class="transaction-row" [@fadeInOut]>\r
            <td class="transaction-id"><strong>{{ transaction.transactionId }}</strong></td>\r
            <td class="amount">{{ transaction.amount | number: '1.2-2' }}</td>\r
            <td class="type-badge">\r
              <span class="badge badge-type">{{ transaction.transactionType }}</span>\r
            </td>\r
            <td>{{ transaction.vehicleNumber }}</td>\r
            <td>{{ transaction.parkingLocation }}</td>\r
            <td class="date">{{ transaction.transactionDate | date: 'short' }}</td>\r
            <td>\r
              <span class="badge" [ngClass]="getStatusClass(transaction.status)">\r
                {{ transaction.status }}\r
              </span>\r
            </td>\r
            <td>{{ transaction.paymentMethod }}</td>\r
            <td class="actions-cell">\r
              <button \r
                class="btn-sm btn-info"\r
                (click)="viewDetails(transaction)"\r
                title="View Details">\r
                <i class="fas fa-eye"></i>\r
              </button>\r
            </td>\r
          </tr>\r
          <tr *ngIf="filteredTransactions.length === 0" class="no-data">\r
            <td colspan="9" class="text-center">No transactions found</td>\r
          </tr>\r
        </tbody>\r
      </table>\r
    </div>\r
  </div>\r
\r
  <div class="loading-spinner" *ngIf="loading">\r
    <div class="spinner"></div>\r
    <p>Loading transactions...</p>\r
  </div>\r
\r
  <!-- Pagination -->\r
  <div class="pagination-section" *ngIf="!loading && filteredTransactions.length > 0">\r
    <div class="pagination-controls">\r
      <button \r
        class="btn-sm"\r
        (click)="previousPage()"\r
        [disabled]="currentPage === 1">\r
        <i class="fas fa-chevron-left"></i> Previous\r
      </button>\r
      <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>\r
      <button \r
        class="btn-sm"\r
        (click)="nextPage()"\r
        [disabled]="currentPage >= totalPages">\r
        Next <i class="fas fa-chevron-right"></i>\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- Details Modal -->\r
  <div class="modal" *ngIf="selectedTransaction && showDetailsModal" [@fadeInOut]>\r
    <div class="modal-content">\r
      <div class="modal-header">\r
        <h2>Transaction Details - {{ selectedTransaction.transactionId }}</h2>\r
        <button class="close-btn" (click)="closeDetailsModal()">\r
          <i class="fas fa-times"></i>\r
        </button>\r
      </div>\r
      <div class="modal-body">\r
        <div class="details-grid">\r
          <div class="detail-item">\r
            <label>Transaction ID:</label>\r
            <span>{{ selectedTransaction.transactionId }}</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Amount:</label>\r
            <span>\u20B9{{ selectedTransaction.amount | number: '1.2-2' }}</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Type:</label>\r
            <span class="badge badge-type">{{ selectedTransaction.transactionType }}</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Vehicle Number:</label>\r
            <span>{{ selectedTransaction.vehicleNumber }}</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Location:</label>\r
            <span>{{ selectedTransaction.parkingLocation }}</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Date:</label>\r
            <span>{{ selectedTransaction.transactionDate | date: 'medium' }}</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Status:</label>\r
            <span class="badge" [ngClass]="getStatusClass(selectedTransaction.status)">\r
              {{ selectedTransaction.status }}\r
            </span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Payment Method:</label>\r
            <span>{{ selectedTransaction.paymentMethod }}</span>\r
          </div>\r
          <div class="detail-item">\r
            <label>Reference:</label>\r
            <span>{{ selectedTransaction.reference }}</span>\r
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
`, styles: ["/* src/app/components/admin/parkadda/transaction-reports/transaction-reports.component.scss */\n.transaction-reports-container {\n  padding: 20px;\n  background-color: #f5f7fa;\n  min-height: 100vh;\n}\n.transaction-reports-container .header-section {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 30px;\n  padding: 20px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.transaction-reports-container .header-section h1 {\n  margin: 0;\n  color: #2c3e50;\n  font-size: 28px;\n  font-weight: 600;\n}\n.transaction-reports-container .header-section .header-controls {\n  display: flex;\n  gap: 10px;\n}\n.transaction-reports-container .filters-section {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 15px;\n  margin-bottom: 25px;\n  padding: 20px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.transaction-reports-container .filters-section .filter-group {\n  display: flex;\n  flex-direction: column;\n}\n.transaction-reports-container .filters-section .filter-group label {\n  font-weight: 600;\n  margin-bottom: 8px;\n  color: #2c3e50;\n  font-size: 14px;\n}\n.transaction-reports-container .filters-section .filter-group .form-control {\n  padding: 10px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n  transition: border-color 0.3s;\n}\n.transaction-reports-container .filters-section .filter-group .form-control:focus {\n  outline: none;\n  border-color: #007bff;\n  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);\n}\n.transaction-reports-container .transaction-type-selector {\n  display: flex;\n  gap: 10px;\n  margin-bottom: 25px;\n  flex-wrap: wrap;\n}\n.transaction-reports-container .transaction-type-selector .type-btn {\n  padding: 10px 20px;\n  border: 2px solid #ddd;\n  background: white;\n  border-radius: 4px;\n  cursor: pointer;\n  font-weight: 500;\n  transition: all 0.3s;\n  font-size: 14px;\n}\n.transaction-reports-container .transaction-type-selector .type-btn:hover {\n  border-color: #007bff;\n  color: #007bff;\n}\n.transaction-reports-container .transaction-type-selector .type-btn.active {\n  background: #007bff;\n  color: white;\n  border-color: #007bff;\n}\n.transaction-reports-container .search-bar {\n  margin-bottom: 20px;\n}\n.transaction-reports-container .search-bar input {\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n}\n.transaction-reports-container .search-bar input:focus {\n  outline: none;\n  border-color: #007bff;\n  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);\n}\n.transaction-reports-container .loading-spinner {\n  text-align: center;\n  padding: 40px;\n}\n.transaction-reports-container .loading-spinner .spinner {\n  border: 4px solid #f3f3f3;\n  border-top: 4px solid #007bff;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  animation: spin 1s linear infinite;\n  margin: 0 auto;\n}\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.transaction-reports-container .stats-section {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 20px;\n  margin-bottom: 25px;\n}\n.transaction-reports-container .stats-section .stat-card {\n  padding: 20px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  text-align: center;\n}\n.transaction-reports-container .stats-section .stat-card .stat-label {\n  font-size: 12px;\n  color: #666;\n  text-transform: uppercase;\n  font-weight: 600;\n  margin-bottom: 10px;\n}\n.transaction-reports-container .stats-section .stat-card .stat-value {\n  font-size: 28px;\n  font-weight: 700;\n  color: #2c3e50;\n}\n.transaction-reports-container .table-section {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.transaction-reports-container .table-section table {\n  width: 100%;\n  border-collapse: collapse;\n}\n.transaction-reports-container .table-section table thead {\n  background: #f8f9fa;\n  border-bottom: 2px solid #dee2e6;\n}\n.transaction-reports-container .table-section table thead th {\n  padding: 15px;\n  text-align: left;\n  font-weight: 600;\n  color: #2c3e50;\n  font-size: 13px;\n  text-transform: uppercase;\n}\n.transaction-reports-container .table-section table tbody tr {\n  border-bottom: 1px solid #dee2e6;\n  transition: background-color 0.2s;\n}\n.transaction-reports-container .table-section table tbody tr:hover {\n  background-color: #f8f9fa;\n}\n.transaction-reports-container .table-section table tbody tr td {\n  padding: 15px;\n  color: #555;\n  font-size: 14px;\n}\n.transaction-reports-container .table-section table tbody tr .action-btn {\n  padding: 6px 12px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n  font-weight: 600;\n  transition: all 0.3s;\n}\n.transaction-reports-container .table-section table tbody tr .action-btn.view-btn {\n  background: #e3f2fd;\n  color: #007bff;\n}\n.transaction-reports-container .table-section table tbody tr .action-btn.view-btn:hover {\n  background: #007bff;\n  color: white;\n}\n.transaction-reports-container .pagination {\n  display: flex;\n  justify-content: center;\n  gap: 5px;\n  margin-top: 20px;\n  padding: 20px;\n  background: white;\n  border-radius: 8px;\n}\n.transaction-reports-container .pagination button,\n.transaction-reports-container .pagination span {\n  padding: 8px 12px;\n  border: 1px solid #ddd;\n  background: white;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: all 0.3s;\n}\n.transaction-reports-container .pagination button:hover:not(:disabled),\n.transaction-reports-container .pagination span:hover:not(:disabled) {\n  background: #007bff;\n  color: white;\n  border-color: #007bff;\n}\n.transaction-reports-container .pagination button.active,\n.transaction-reports-container .pagination span.active {\n  background: #007bff;\n  color: white;\n  border-color: #007bff;\n}\n.transaction-reports-container .pagination button:disabled,\n.transaction-reports-container .pagination span:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.transaction-reports-container .no-data-message {\n  text-align: center;\n  padding: 40px 20px;\n  color: #666;\n  font-size: 16px;\n  background: white;\n  border-radius: 8px;\n  margin-top: 20px;\n}\n.transaction-reports-container .toast-container {\n  position: fixed;\n  top: 20px;\n  right: 20px;\n  z-index: 1000;\n}\n.transaction-reports-container .toast-container .toast {\n  padding: 15px 20px;\n  margin-bottom: 10px;\n  border-radius: 4px;\n  animation: slideIn 0.3s ease-out;\n}\n.transaction-reports-container .toast-container .toast.success {\n  background: #d4edda;\n  color: #155724;\n  border: 1px solid #c3e6cb;\n}\n.transaction-reports-container .toast-container .toast.error {\n  background: #f8d7da;\n  color: #721c24;\n  border: 1px solid #f5c6cb;\n}\n.transaction-reports-container .toast-container .toast.warning {\n  background: #fff3cd;\n  color: #856404;\n  border: 1px solid #ffeeba;\n}\n.transaction-reports-container .toast-container .toast.info {\n  background: #d1ecf1;\n  color: #0c5460;\n  border: 1px solid #bee5eb;\n}\n@keyframes slideIn {\n  from {\n    transform: translateX(400px);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n.transaction-reports-container .modal-backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 900;\n  animation: fadeIn 0.3s ease-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.transaction-reports-container .modal {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);\n  max-width: 600px;\n  width: 90%;\n  max-height: 90vh;\n  overflow-y: auto;\n  animation: slideUp 0.3s ease-out;\n}\n@keyframes slideUp {\n  from {\n    transform: translateY(50px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.transaction-reports-container .modal .modal-header {\n  padding: 20px;\n  border-bottom: 1px solid #dee2e6;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.transaction-reports-container .modal .modal-header h5 {\n  margin: 0;\n  color: #2c3e50;\n}\n.transaction-reports-container .modal .modal-header .close-btn {\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #666;\n}\n.transaction-reports-container .modal .modal-header .close-btn:hover {\n  color: #000;\n}\n.transaction-reports-container .modal .modal-body {\n  padding: 20px;\n}\n.transaction-reports-container .modal .modal-body .detail-row {\n  display: flex;\n  justify-content: space-between;\n  padding: 12px 0;\n  border-bottom: 1px solid #eee;\n}\n.transaction-reports-container .modal .modal-body .detail-row .detail-label {\n  font-weight: 600;\n  color: #2c3e50;\n}\n.transaction-reports-container .modal .modal-body .detail-row .detail-value {\n  color: #555;\n}\n.transaction-reports-container .modal .modal-footer {\n  padding: 20px;\n  border-top: 1px solid #dee2e6;\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n}\n.transaction-reports-container .btn {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 4px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n.transaction-reports-container .btn.btn-primary {\n  background: #007bff;\n  color: white;\n}\n.transaction-reports-container .btn.btn-primary:hover {\n  background: #0056b3;\n}\n.transaction-reports-container .btn.btn-secondary {\n  background: #6c757d;\n  color: white;\n}\n.transaction-reports-container .btn.btn-secondary:hover {\n  background: #545b62;\n}\n.transaction-reports-container .btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n@media (max-width: 768px) {\n  .transaction-reports-container {\n    padding: 15px;\n  }\n  .transaction-reports-container .filters-section {\n    grid-template-columns: 1fr;\n  }\n  .transaction-reports-container .header-section {\n    flex-direction: column;\n    gap: 15px;\n    text-align: center;\n  }\n  .transaction-reports-container .header-section h1 {\n    font-size: 22px;\n  }\n  .transaction-reports-container .transaction-type-selector {\n    justify-content: center;\n  }\n  .transaction-reports-container .table-section {\n    overflow-x: auto;\n  }\n  .transaction-reports-container .table-section table {\n    font-size: 12px;\n  }\n  .transaction-reports-container .table-section table th,\n  .transaction-reports-container .table-section table td {\n    padding: 10px;\n  }\n}\n/*# sourceMappingURL=transaction-reports.component.css.map */\n"] }]
  }], () => [{ type: ParkaddaService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TransactionReportsComponent, { className: "TransactionReportsComponent", filePath: "src/app/components/admin/parkadda/transaction-reports/transaction-reports.component.ts", lineNumber: 54 });
})();
export {
  TransactionReportsComponent
};
//# sourceMappingURL=chunk-DTBFB3NA.js.map
