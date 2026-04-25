import {
  MatChip,
  MatChipsModule
} from "./chunk-6S3IFQ7P.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-PDO42MVQ.js";
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
  MatTableModule,
  MatTooltip,
  MatTooltipModule
} from "./chunk-WFLLRASB.js";
import "./chunk-LORH3QDJ.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-25OIJ6Q5.js";
import "./chunk-VD67GU43.js";
import {
  MatCard,
  MatCardContent,
  MatCardModule
} from "./chunk-AK2ZYAID.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-AJHCE7D6.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-AAXJDYQS.js";
import "./chunk-BIRBC32G.js";
import "./chunk-4AUWEQTR.js";
import {
  CommonModule,
  Component,
  HttpClient,
  NgClass,
  NgIf,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-WPHUMBF2.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-YP43Q66R.js";

// src/app/components/devices/device-history/device-history.component.ts
function DeviceHistoryComponent_mat_card_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 13)(1, "mat-card-content")(2, "div", 14)(3, "div", 15)(4, "span", 16);
    \u0275\u0275text(5, "Current Serial:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 17);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 15)(9, "span", 16);
    \u0275\u0275text(10, "Device Type:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 18);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 15)(14, "span", 16);
    \u0275\u0275text(15, "Current Location:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 18);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 15)(19, "span", 16);
    \u0275\u0275text(20, "Status:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "mat-chip", 19);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.deviceInfo.currentSerial || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.deviceInfo.deviceType || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.deviceInfo.currentLocation || "N/A");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r0.getStatusClass(ctx_r0.deviceInfo.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.deviceInfo.status || "UNKNOWN", " ");
  }
}
function DeviceHistoryComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275element(1, "mat-progress-spinner", 21);
    \u0275\u0275elementStart(2, "p", 22);
    \u0275\u0275text(3, "Loading device history...");
    \u0275\u0275elementEnd()();
  }
}
function DeviceHistoryComponent_div_18_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Action");
    \u0275\u0275elementEnd();
  }
}
function DeviceHistoryComponent_div_18_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39)(1, "mat-chip", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const h_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.getActionClass(h_r2.action));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", h_r2.action, " ");
  }
}
function DeviceHistoryComponent_div_18_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Serial Changes");
    \u0275\u0275elementEnd();
  }
}
function DeviceHistoryComponent_div_18_td_13_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const h_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(h_r3.oldSerial);
  }
}
function DeviceHistoryComponent_div_18_td_13_mat_icon_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 47);
    \u0275\u0275text(1, "arrow_forward");
    \u0275\u0275elementEnd();
  }
}
function DeviceHistoryComponent_div_18_td_13_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const h_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(h_r3.newSerial);
  }
}
function DeviceHistoryComponent_div_18_td_13_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
function DeviceHistoryComponent_div_18_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39)(1, "div", 41);
    \u0275\u0275template(2, DeviceHistoryComponent_div_18_td_13_span_2_Template, 2, 1, "span", 42)(3, DeviceHistoryComponent_div_18_td_13_mat_icon_3_Template, 2, 0, "mat-icon", 43)(4, DeviceHistoryComponent_div_18_td_13_span_4_Template, 2, 1, "span", 44)(5, DeviceHistoryComponent_div_18_td_13_span_5_Template, 2, 0, "span", 45);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const h_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", h_r3.oldSerial);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", h_r3.oldSerial && h_r3.newSerial);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", h_r3.newSerial);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !h_r3.oldSerial && !h_r3.newSerial);
  }
}
function DeviceHistoryComponent_div_18_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Location Changes");
    \u0275\u0275elementEnd();
  }
}
function DeviceHistoryComponent_div_18_td_16_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const h_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(h_r4.oldLocation);
  }
}
function DeviceHistoryComponent_div_18_td_16_mat_icon_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 47);
    \u0275\u0275text(1, "arrow_forward");
    \u0275\u0275elementEnd();
  }
}
function DeviceHistoryComponent_div_18_td_16_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const h_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(h_r4.newLocation);
  }
}
function DeviceHistoryComponent_div_18_td_16_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
function DeviceHistoryComponent_div_18_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39)(1, "div", 41);
    \u0275\u0275template(2, DeviceHistoryComponent_div_18_td_16_span_2_Template, 2, 1, "span", 42)(3, DeviceHistoryComponent_div_18_td_16_mat_icon_3_Template, 2, 0, "mat-icon", 43)(4, DeviceHistoryComponent_div_18_td_16_span_4_Template, 2, 1, "span", 44)(5, DeviceHistoryComponent_div_18_td_16_span_5_Template, 2, 0, "span", 45);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const h_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", h_r4.oldLocation);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", h_r4.oldLocation && h_r4.newLocation);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", h_r4.newLocation);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !h_r4.oldLocation && !h_r4.newLocation);
  }
}
function DeviceHistoryComponent_div_18_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Additional Info");
    \u0275\u0275elementEnd();
  }
}
function DeviceHistoryComponent_div_18_td_19_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "mat-icon", 54);
    \u0275\u0275text(2, "device_replace");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const h_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Replaced: ", h_r5.replacedDeviceSerial, " ");
  }
}
function DeviceHistoryComponent_div_18_td_19_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "mat-icon", 54);
    \u0275\u0275text(2, "receipt");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const h_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Ref: ", h_r5.referenceId, " ");
  }
}
function DeviceHistoryComponent_div_18_td_19_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55);
    \u0275\u0275text(1, " - ");
    \u0275\u0275elementEnd();
  }
}
function DeviceHistoryComponent_div_18_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39)(1, "div", 50);
    \u0275\u0275template(2, DeviceHistoryComponent_div_18_td_19_div_2_Template, 4, 1, "div", 51)(3, DeviceHistoryComponent_div_18_td_19_div_3_Template, 4, 1, "div", 51)(4, DeviceHistoryComponent_div_18_td_19_div_4_Template, 2, 0, "div", 52);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const h_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", h_r5.replacedDeviceSerial);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", h_r5.referenceId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !h_r5.replacedDeviceSerial && !h_r5.referenceId);
  }
}
function DeviceHistoryComponent_div_18_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Timestamp");
    \u0275\u0275elementEnd();
  }
}
function DeviceHistoryComponent_div_18_td_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39)(1, "div", 56)(2, "div", 57);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 58);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const h_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(h_r6.createdAt));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatTime(h_r6.createdAt));
  }
}
function DeviceHistoryComponent_div_18_th_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Performed By");
    \u0275\u0275elementEnd();
  }
}
function DeviceHistoryComponent_div_18_td_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39)(1, "div", 59)(2, "mat-icon", 60);
    \u0275\u0275text(3, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const h_r7 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", h_r7.performedBy || "System", " ");
  }
}
function DeviceHistoryComponent_div_18_tr_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 61);
  }
}
function DeviceHistoryComponent_div_18_tr_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 62);
  }
  if (rf & 2) {
    const row_r8 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("recent-row", ctx_r0.isRecent(row_r8.createdAt));
  }
}
function DeviceHistoryComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 24)(2, "h3");
    \u0275\u0275text(3, "Activity Timeline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 25);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 26)(7, "table", 27);
    \u0275\u0275elementContainerStart(8, 28);
    \u0275\u0275template(9, DeviceHistoryComponent_div_18_th_9_Template, 2, 0, "th", 29)(10, DeviceHistoryComponent_div_18_td_10_Template, 3, 2, "td", 30);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 31);
    \u0275\u0275template(12, DeviceHistoryComponent_div_18_th_12_Template, 2, 0, "th", 29)(13, DeviceHistoryComponent_div_18_td_13_Template, 6, 4, "td", 30);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 32);
    \u0275\u0275template(15, DeviceHistoryComponent_div_18_th_15_Template, 2, 0, "th", 29)(16, DeviceHistoryComponent_div_18_td_16_Template, 6, 4, "td", 30);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 33);
    \u0275\u0275template(18, DeviceHistoryComponent_div_18_th_18_Template, 2, 0, "th", 29)(19, DeviceHistoryComponent_div_18_td_19_Template, 5, 3, "td", 30);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(20, 34);
    \u0275\u0275template(21, DeviceHistoryComponent_div_18_th_21_Template, 2, 0, "th", 29)(22, DeviceHistoryComponent_div_18_td_22_Template, 6, 2, "td", 30);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(23, 35);
    \u0275\u0275template(24, DeviceHistoryComponent_div_18_th_24_Template, 2, 0, "th", 29)(25, DeviceHistoryComponent_div_18_td_25_Template, 5, 1, "td", 30);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(26, DeviceHistoryComponent_div_18_tr_26_Template, 1, 0, "tr", 36)(27, DeviceHistoryComponent_div_18_tr_27_Template, 1, 2, "tr", 37);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.history.length, " records found");
    \u0275\u0275advance(2);
    \u0275\u0275property("dataSource", ctx_r0.history);
    \u0275\u0275advance(19);
    \u0275\u0275property("matHeaderRowDef", ctx_r0.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r0.displayedColumns);
  }
}
function DeviceHistoryComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 63)(1, "mat-icon", 64);
    \u0275\u0275text(2, "history");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No History Available");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "No activity records found for this device.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 65);
    \u0275\u0275listener("click", function DeviceHistoryComponent_div_19_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.reload());
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " Check Again ");
    \u0275\u0275elementEnd()();
  }
}
function DeviceHistoryComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66)(1, "mat-card", 67)(2, "mat-card-content")(3, "h4");
    \u0275\u0275text(4, "Quick Stats");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 68)(6, "div", 69)(7, "span", 70);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 71);
    \u0275\u0275text(10, "Total Actions");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 69)(12, "span", 70);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 71);
    \u0275\u0275text(15, "Installations");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 69)(17, "span", 70);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 71);
    \u0275\u0275text(20, "Repairs");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 69)(22, "span", 70);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 71);
    \u0275\u0275text(25, "Replacements");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.getTotalActions());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.getActionCount("INSTALL"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.getActionCount("REPAIR"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.getActionCount("REPLACE"));
  }
}
var DeviceHistoryComponent = class _DeviceHistoryComponent {
  route;
  http;
  router;
  history = [];
  deviceInfo = null;
  displayedColumns = [
    "action",
    "serialChanges",
    "locationChanges",
    "additionalInfo",
    "timestamp",
    "performedBy"
  ];
  loading = false;
  constructor(route, http, router) {
    this.route = route;
    this.http = http;
    this.router = router;
  }
  ngOnInit() {
    const deviceId = this.route.snapshot.paramMap.get("deviceId");
    if (deviceId) {
      this.loadHistory(deviceId);
      this.loadDeviceInfo(deviceId);
    }
  }
  /** Fetch device history from backend API */
  loadHistory(deviceId) {
    this.loading = true;
    this.http.get(`/api/history/device/${deviceId}`).subscribe({
      next: (data) => {
        this.history = (data || []).map((item) => __spreadProps(__spreadValues({}, item), {
          // Convert the custom date format to a proper Date object
          createdAt: this.parseCustomDate(item.createdAt)
        })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.loading = false;
      },
      error: (err) => {
        console.error("Failed to load history:", err);
        this.loading = false;
      }
    });
  }
  /** Parse custom date format: "2025,11,14,14,28,46,956170000" */
  parseCustomDate(dateString) {
    if (!dateString)
      return /* @__PURE__ */ new Date();
    try {
      if (typeof dateString === "string" && dateString.includes(",")) {
        const parts = dateString.split(",").map((part) => parseInt(part, 10));
        if (parts.length >= 6) {
          const year = parts[0];
          const month = parts[1] - 1;
          const day = parts[2];
          const hour = parts[3];
          const minute = parts[4];
          const second = parts[5];
          const millisecond = parts[6] || 0;
          return new Date(year, month, day, hour, minute, second, millisecond / 1e6);
        }
      }
      return new Date(dateString);
    } catch (error) {
      console.warn("Failed to parse date:", dateString, error);
      return /* @__PURE__ */ new Date();
    }
  }
  /** Format date for display */
  formatDate(dateInput) {
    const date = this.parseCustomDate(dateInput);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  /** Format time for display */
  formatTime(dateInput) {
    const date = this.parseCustomDate(dateInput);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  }
  /** Fetch current device information */
  loadDeviceInfo(deviceId) {
    this.http.get(`/api/devices/${deviceId}`).subscribe({
      next: (data) => {
        this.deviceInfo = data;
      },
      error: (err) => {
        console.error("Failed to load device info:", err);
      }
    });
  }
  /** Get CSS class for action type */
  getActionClass(action) {
    const actionMap = {
      "INSTALL": "action-install",
      "REPAIR": "action-repair",
      "REPLACE": "action-replace",
      "UPDATE": "action-update",
      "MOVE": "action-move",
      "SERIAL_UPDATE": "action-update"
    };
    return actionMap[action] || "action-update";
  }
  /** Get CSS class for status */
  getStatusClass(status) {
    const statusMap = {
      "ACTIVE": "status-active",
      "INACTIVE": "status-inactive",
      "MAINTENANCE": "status-maintenance",
      "INSTALLED": "status-active"
    };
    return statusMap[status] || "status-inactive";
  }
  /** Check if record is recent (within 24 hours) */
  isRecent(timestamp) {
    const recordDate = this.parseCustomDate(timestamp);
    const now = /* @__PURE__ */ new Date();
    const diffHours = (now.getTime() - recordDate.getTime()) / (1e3 * 60 * 60);
    return diffHours < 24;
  }
  /** Get total number of actions */
  getTotalActions() {
    return this.history.length;
  }
  /** Get count of specific action type */
  getActionCount(actionType) {
    return this.history.filter((h) => h.action === actionType).length;
  }
  reload() {
    const deviceId = this.route.snapshot.paramMap.get("deviceId");
    if (deviceId) {
      this.loadHistory(deviceId);
      this.loadDeviceInfo(deviceId);
    }
  }
  goBack() {
    this.router.navigate(["/inventory"]);
  }
  static \u0275fac = function DeviceHistoryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DeviceHistoryComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(HttpClient), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DeviceHistoryComponent, selectors: [["app-device-history"]], decls: 21, vars: 5, consts: [[1, "page-container"], [1, "history-card", "mat-elevation-z8"], [1, "header-section"], [1, "header-content"], ["mat-icon-button", "", "matTooltip", "Back to Inventory", 1, "back-btn", 3, "click"], [1, "title-section"], [1, "subtitle"], ["mat-raised-button", "", "color", "primary", 1, "refresh-btn", 3, "click"], ["class", "device-summary-card", 4, "ngIf"], ["class", "loading-container", 4, "ngIf"], ["class", "table-section", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "stats-section", 4, "ngIf"], [1, "device-summary-card"], [1, "device-info-grid"], [1, "device-info-item"], [1, "label"], [1, "value", "serial"], [1, "value"], [1, "status-chip", 3, "ngClass"], [1, "loading-container"], ["mode", "indeterminate", "color", "primary", "diameter", "60"], [1, "loading-text"], [1, "table-section"], [1, "table-header"], [1, "record-count"], [1, "table-container"], ["mat-table", "", 1, "history-table", 3, "dataSource"], ["matColumnDef", "action"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "serialChanges"], ["matColumnDef", "locationChanges"], ["matColumnDef", "additionalInfo"], ["matColumnDef", "timestamp"], ["matColumnDef", "performedBy"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "recent-row", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "action-chip", 3, "ngClass"], [1, "change-comparison"], ["class", "old-value", 4, "ngIf"], ["class", "change-arrow", 4, "ngIf"], ["class", "new-value", 4, "ngIf"], ["class", "no-change", 4, "ngIf"], [1, "old-value"], [1, "change-arrow"], [1, "new-value"], [1, "no-change"], [1, "additional-info"], ["class", "info-item", 4, "ngIf"], ["class", "no-info", 4, "ngIf"], [1, "info-item"], [1, "info-icon"], [1, "no-info"], [1, "timestamp"], [1, "date"], [1, "time"], [1, "performed-by"], [1, "user-icon"], ["mat-header-row", ""], ["mat-row", ""], [1, "empty-state"], [1, "empty-icon"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "stats-section"], [1, "stats-card"], [1, "stats-grid"], [1, "stat-item"], [1, "stat-number"], [1, "stat-label"]], template: function DeviceHistoryComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "mat-card", 1)(2, "div", 2)(3, "div", 3)(4, "button", 4);
      \u0275\u0275listener("click", function DeviceHistoryComponent_Template_button_click_4_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(5, "mat-icon");
      \u0275\u0275text(6, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5)(8, "h1");
      \u0275\u0275text(9, "Device History");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "p", 6);
      \u0275\u0275text(11, "Complete audit trail for device activities");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "button", 7);
      \u0275\u0275listener("click", function DeviceHistoryComponent_Template_button_click_12_listener() {
        return ctx.reload();
      });
      \u0275\u0275elementStart(13, "mat-icon");
      \u0275\u0275text(14, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(15, " Refresh ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(16, DeviceHistoryComponent_mat_card_16_Template, 23, 5, "mat-card", 8)(17, DeviceHistoryComponent_div_17_Template, 4, 0, "div", 9)(18, DeviceHistoryComponent_div_18_Template, 28, 4, "div", 10)(19, DeviceHistoryComponent_div_19_Template, 11, 0, "div", 11)(20, DeviceHistoryComponent_div_20_Template, 26, 4, "div", 12);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275property("ngIf", ctx.deviceInfo);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.history.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.history.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.history.length > 0);
    }
  }, dependencies: [CommonModule, NgClass, NgIf, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatCardModule, MatCard, MatCardContent, MatButtonModule, MatButton, MatIconButton, MatProgressSpinnerModule, MatProgressSpinner, MatIconModule, MatIcon, MatChipsModule, MatChip, MatTooltipModule, MatTooltip], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  background: #f5f7fa;\n  min-height: 100vh;\n}\n.history-card[_ngcontent-%COMP%] {\n  border-radius: 16px;\n  overflow: hidden;\n  background: white;\n}\n.header-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 24px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.header-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.back-btn[_ngcontent-%COMP%] {\n  color: white;\n  background: rgba(255, 255, 255, 0.2);\n}\n.title-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 28px;\n  font-weight: 700;\n  letter-spacing: -0.5px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  margin: 4px 0 0 0;\n  opacity: 0.9;\n  font-size: 14px;\n}\n.refresh-btn[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  color: white;\n  border: 1px solid rgba(255, 255, 255, 0.3);\n}\n.device-summary-card[_ngcontent-%COMP%] {\n  margin: 20px 24px;\n  border-left: 4px solid #667eea;\n}\n.device-info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 16px;\n}\n.device-info-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n  text-transform: uppercase;\n  font-weight: 600;\n}\n.value[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 500;\n  color: #333;\n}\n.serial[_ngcontent-%COMP%] {\n  color: #667eea;\n  font-weight: 600;\n}\n.status-chip[_ngcontent-%COMP%] {\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 11px;\n}\n.status-active[_ngcontent-%COMP%] {\n  background: #4caf50 !important;\n  color: white !important;\n}\n.status-inactive[_ngcontent-%COMP%] {\n  background: #f44336 !important;\n  color: white !important;\n}\n.status-maintenance[_ngcontent-%COMP%] {\n  background: #ff9800 !important;\n  color: white !important;\n}\n.loading-container[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n}\n.loading-text[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  color: #666;\n  font-size: 16px;\n}\n.table-section[_ngcontent-%COMP%] {\n  padding: 0 24px 24px;\n}\n.table-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.table-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #333;\n  font-size: 20px;\n  font-weight: 600;\n}\n.record-count[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1976d2;\n  padding: 6px 12px;\n  border-radius: 16px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.table-container[_ngcontent-%COMP%] {\n  border: 1px solid #e0e0e0;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.history-table[_ngcontent-%COMP%] {\n  width: 100%;\n}\nth.mat-header-cell[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  font-weight: 600;\n  color: #333;\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  padding: 16px;\n  border-bottom: 2px solid #e0e0e0;\n}\ntd.mat-cell[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-bottom: 1px solid #f0f0f0;\n  vertical-align: top;\n}\n.action-chip[_ngcontent-%COMP%] {\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 11px;\n}\n.action-install[_ngcontent-%COMP%] {\n  background: #4caf50 !important;\n  color: white !important;\n}\n.action-repair[_ngcontent-%COMP%] {\n  background: #ff9800 !important;\n  color: white !important;\n}\n.action-replace[_ngcontent-%COMP%] {\n  background: #2196f3 !important;\n  color: white !important;\n}\n.action-update[_ngcontent-%COMP%] {\n  background: #9c27b0 !important;\n  color: white !important;\n}\n.action-move[_ngcontent-%COMP%] {\n  background: #607d8b !important;\n  color: white !important;\n}\n.change-comparison[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.old-value[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 12px;\n  text-decoration: line-through;\n}\n.new-value[_ngcontent-%COMP%] {\n  background: #e8f5e8;\n  color: #2e7d32;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.change-arrow[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #666;\n}\n.no-change[_ngcontent-%COMP%] {\n  color: #999;\n  font-style: italic;\n}\n.additional-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: #666;\n}\n.info-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.timestamp[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.date[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #333;\n  font-size: 13px;\n}\n.time[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 11px;\n}\n.performed-by[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n}\n.user-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #666;\n}\n.recent-row[_ngcontent-%COMP%] {\n  background: #f3f8ff !important;\n  border-left: 3px solid #2196f3;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #666;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #bdbdbd;\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  color: #333;\n}\n.stats-section[_ngcontent-%COMP%] {\n  padding: 0 24px 24px;\n}\n.stats-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.stats-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  color: white;\n  text-align: center;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n  gap: 16px;\n}\n.stat-item[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.stat-number[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 24px;\n  font-weight: 700;\n  margin-bottom: 4px;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  opacity: 0.9;\n  text-transform: uppercase;\n}\n@media (max-width: 768px) {\n  .page-container[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .header-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n    text-align: center;\n  }\n  .header-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .device-info-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .displayed-columns[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  th.mat-header-cell[_ngcontent-%COMP%], \n   td.mat-cell[_ngcontent-%COMP%] {\n    padding: 12px 8px;\n  }\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n/*# sourceMappingURL=device-history.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DeviceHistoryComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-device-history", imports: [
      CommonModule,
      MatTableModule,
      MatCardModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      MatIconModule,
      MatChipsModule,
      MatTooltipModule
    ], template: `
    <div class="page-container">
      <mat-card class="history-card mat-elevation-z8">
        <!-- Header Section -->
        <div class="header-section">
          <div class="header-content">
            <button mat-icon-button class="back-btn" (click)="goBack()" matTooltip="Back to Inventory">
              <mat-icon>arrow_back</mat-icon>
            </button>
            <div class="title-section">
              <h1>Device History</h1>
              <p class="subtitle">Complete audit trail for device activities</p>
            </div>
          </div>
          <button mat-raised-button color="primary" (click)="reload()" class="refresh-btn">
            <mat-icon>refresh</mat-icon>
            Refresh
          </button>
        </div>

        <!-- Device Summary Card -->
        <mat-card *ngIf="deviceInfo" class="device-summary-card">
          <mat-card-content>
            <div class="device-info-grid">
              <div class="device-info-item">
                <span class="label">Current Serial:</span>
                <span class="value serial">{{ deviceInfo.currentSerial || 'N/A' }}</span>
              </div>
              <div class="device-info-item">
                <span class="label">Device Type:</span>
                <span class="value">{{ deviceInfo.deviceType || 'N/A' }}</span>
              </div>
              <div class="device-info-item">
                <span class="label">Current Location:</span>
                <span class="value">{{ deviceInfo.currentLocation || 'N/A' }}</span>
              </div>
              <div class="device-info-item">
                <span class="label">Status:</span>
                <mat-chip [ngClass]="getStatusClass(deviceInfo.status)" class="status-chip">
                  {{ deviceInfo.status || 'UNKNOWN' }}
                </mat-chip>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Loading State -->
        <div *ngIf="loading" class="loading-container">
          <mat-progress-spinner mode="indeterminate" color="primary" diameter="60"></mat-progress-spinner>
          <p class="loading-text">Loading device history...</p>
        </div>

        <!-- History Table -->
        <div *ngIf="!loading && history.length > 0" class="table-section">
          <div class="table-header">
            <h3>Activity Timeline</h3>
            <span class="record-count">{{ history.length }} records found</span>
          </div>

          <div class="table-container">
            <table mat-table [dataSource]="history" class="history-table">
              
              <!-- Action Type -->
              <ng-container matColumnDef="action">
                <th mat-header-cell *matHeaderCellDef>Action</th>
                <td mat-cell *matCellDef="let h">
                  <mat-chip [ngClass]="getActionClass(h.action)" class="action-chip">
                    {{ h.action }}
                  </mat-chip>
                </td>
              </ng-container>

              <!-- Serial Changes -->
              <ng-container matColumnDef="serialChanges">
                <th mat-header-cell *matHeaderCellDef>Serial Changes</th>
                <td mat-cell *matCellDef="let h">
                  <div class="change-comparison">
                    <span class="old-value" *ngIf="h.oldSerial">{{ h.oldSerial }}</span>
                    <mat-icon *ngIf="h.oldSerial && h.newSerial" class="change-arrow">arrow_forward</mat-icon>
                    <span class="new-value" *ngIf="h.newSerial">{{ h.newSerial }}</span>
                    <span class="no-change" *ngIf="!h.oldSerial && !h.newSerial">-</span>
                  </div>
                </td>
              </ng-container>

              <!-- Location Changes -->
              <ng-container matColumnDef="locationChanges">
                <th mat-header-cell *matHeaderCellDef>Location Changes</th>
                <td mat-cell *matCellDef="let h">
                  <div class="change-comparison">
                    <span class="old-value" *ngIf="h.oldLocation">{{ h.oldLocation }}</span>
                    <mat-icon *ngIf="h.oldLocation && h.newLocation" class="change-arrow">arrow_forward</mat-icon>
                    <span class="new-value" *ngIf="h.newLocation">{{ h.newLocation }}</span>
                    <span class="no-change" *ngIf="!h.oldLocation && !h.newLocation">-</span>
                  </div>
                </td>
              </ng-container>

              <!-- Additional Info -->
              <ng-container matColumnDef="additionalInfo">
                <th mat-header-cell *matHeaderCellDef>Additional Info</th>
                <td mat-cell *matCellDef="let h">
                  <div class="additional-info">
                    <div *ngIf="h.replacedDeviceSerial" class="info-item">
                      <mat-icon class="info-icon">device_replace</mat-icon>
                      Replaced: {{ h.replacedDeviceSerial }}
                    </div>
                    <div *ngIf="h.referenceId" class="info-item">
                      <mat-icon class="info-icon">receipt</mat-icon>
                      Ref: {{ h.referenceId }}
                    </div>
                    <div *ngIf="!h.replacedDeviceSerial && !h.referenceId" class="no-info">
                      -
                    </div>
                  </div>
                </td>
              </ng-container>

              <!-- Timestamp -->
              <ng-container matColumnDef="timestamp">
                <th mat-header-cell *matHeaderCellDef>Timestamp</th>
                <td mat-cell *matCellDef="let h">
                  <div class="timestamp">
                    <div class="date">{{ formatDate(h.createdAt) }}</div>
                    <div class="time">{{ formatTime(h.createdAt) }}</div>
                  </div>
                </td>
              </ng-container>

              <!-- User/Performer -->
              <ng-container matColumnDef="performedBy">
                <th mat-header-cell *matHeaderCellDef>Performed By</th>
                <td mat-cell *matCellDef="let h">
                  <div class="performed-by">
                    <mat-icon class="user-icon">person</mat-icon>
                    {{ h.performedBy || 'System' }}
                  </div>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns" 
                  [class.recent-row]="isRecent(row.createdAt)"></tr>
            </table>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="!loading && history.length === 0" class="empty-state">
          <mat-icon class="empty-icon">history</mat-icon>
          <h3>No History Available</h3>
          <p>No activity records found for this device.</p>
          <button mat-raised-button color="primary" (click)="reload()">
            <mat-icon>refresh</mat-icon>
            Check Again
          </button>
        </div>

        <!-- Quick Stats -->
        <div *ngIf="!loading && history.length > 0" class="stats-section">
          <mat-card class="stats-card">
            <mat-card-content>
              <h4>Quick Stats</h4>
              <div class="stats-grid">
                <div class="stat-item">
                  <span class="stat-number">{{ getTotalActions() }}</span>
                  <span class="stat-label">Total Actions</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">{{ getActionCount('INSTALL') }}</span>
                  <span class="stat-label">Installations</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">{{ getActionCount('REPAIR') }}</span>
                  <span class="stat-label">Repairs</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">{{ getActionCount('REPLACE') }}</span>
                  <span class="stat-label">Replacements</span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </mat-card>
    </div>
  `, styles: ["/* angular:styles/component:scss;6a7690e9ba27174ae11cf08187237f5d58d5529a8616d3bb8c5e772910d4f2b9;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/devices/device-history/device-history.component.ts */\n.page-container {\n  padding: 20px;\n  background: #f5f7fa;\n  min-height: 100vh;\n}\n.history-card {\n  border-radius: 16px;\n  overflow: hidden;\n  background: white;\n}\n.header-section {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 24px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.header-content {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.back-btn {\n  color: white;\n  background: rgba(255, 255, 255, 0.2);\n}\n.title-section h1 {\n  margin: 0;\n  font-size: 28px;\n  font-weight: 700;\n  letter-spacing: -0.5px;\n}\n.subtitle {\n  margin: 4px 0 0 0;\n  opacity: 0.9;\n  font-size: 14px;\n}\n.refresh-btn {\n  background: rgba(255, 255, 255, 0.2);\n  color: white;\n  border: 1px solid rgba(255, 255, 255, 0.3);\n}\n.device-summary-card {\n  margin: 20px 24px;\n  border-left: 4px solid #667eea;\n}\n.device-info-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 16px;\n}\n.device-info-item {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.label {\n  font-size: 12px;\n  color: #666;\n  text-transform: uppercase;\n  font-weight: 600;\n}\n.value {\n  font-size: 16px;\n  font-weight: 500;\n  color: #333;\n}\n.serial {\n  color: #667eea;\n  font-weight: 600;\n}\n.status-chip {\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 11px;\n}\n.status-active {\n  background: #4caf50 !important;\n  color: white !important;\n}\n.status-inactive {\n  background: #f44336 !important;\n  color: white !important;\n}\n.status-maintenance {\n  background: #ff9800 !important;\n  color: white !important;\n}\n.loading-container {\n  text-align: center;\n  padding: 60px 20px;\n}\n.loading-text {\n  margin-top: 16px;\n  color: #666;\n  font-size: 16px;\n}\n.table-section {\n  padding: 0 24px 24px;\n}\n.table-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.table-header h3 {\n  margin: 0;\n  color: #333;\n  font-size: 20px;\n  font-weight: 600;\n}\n.record-count {\n  background: #e3f2fd;\n  color: #1976d2;\n  padding: 6px 12px;\n  border-radius: 16px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.table-container {\n  border: 1px solid #e0e0e0;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.history-table {\n  width: 100%;\n}\nth.mat-header-cell {\n  background: #f8f9fa;\n  font-weight: 600;\n  color: #333;\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  padding: 16px;\n  border-bottom: 2px solid #e0e0e0;\n}\ntd.mat-cell {\n  padding: 16px;\n  border-bottom: 1px solid #f0f0f0;\n  vertical-align: top;\n}\n.action-chip {\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 11px;\n}\n.action-install {\n  background: #4caf50 !important;\n  color: white !important;\n}\n.action-repair {\n  background: #ff9800 !important;\n  color: white !important;\n}\n.action-replace {\n  background: #2196f3 !important;\n  color: white !important;\n}\n.action-update {\n  background: #9c27b0 !important;\n  color: white !important;\n}\n.action-move {\n  background: #607d8b !important;\n  color: white !important;\n}\n.change-comparison {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.old-value {\n  background: #ffebee;\n  color: #c62828;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 12px;\n  text-decoration: line-through;\n}\n.new-value {\n  background: #e8f5e8;\n  color: #2e7d32;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.change-arrow {\n  font-size: 16px;\n  color: #666;\n}\n.no-change {\n  color: #999;\n  font-style: italic;\n}\n.additional-info {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.info-item {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: #666;\n}\n.info-icon {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.timestamp {\n  text-align: center;\n}\n.date {\n  font-weight: 600;\n  color: #333;\n  font-size: 13px;\n}\n.time {\n  color: #666;\n  font-size: 11px;\n}\n.performed-by {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n}\n.user-icon {\n  font-size: 18px;\n  color: #666;\n}\n.recent-row {\n  background: #f3f8ff !important;\n  border-left: 3px solid #2196f3;\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: #666;\n}\n.empty-icon {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #bdbdbd;\n  margin-bottom: 16px;\n}\n.empty-state h3 {\n  margin: 0 0 8px 0;\n  color: #333;\n}\n.stats-section {\n  padding: 0 24px 24px;\n}\n.stats-card {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.stats-card h4 {\n  margin: 0 0 16px 0;\n  color: white;\n  text-align: center;\n}\n.stats-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n  gap: 16px;\n}\n.stat-item {\n  text-align: center;\n}\n.stat-number {\n  display: block;\n  font-size: 24px;\n  font-weight: 700;\n  margin-bottom: 4px;\n}\n.stat-label {\n  font-size: 12px;\n  opacity: 0.9;\n  text-transform: uppercase;\n}\n@media (max-width: 768px) {\n  .page-container {\n    padding: 10px;\n  }\n  .header-section {\n    flex-direction: column;\n    gap: 16px;\n    text-align: center;\n  }\n  .header-content {\n    flex-direction: column;\n  }\n  .device-info-grid {\n    grid-template-columns: 1fr;\n  }\n  .displayed-columns {\n    font-size: 12px;\n  }\n  th.mat-header-cell,\n  td.mat-cell {\n    padding: 12px 8px;\n  }\n  .stats-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n/*# sourceMappingURL=device-history.component.css.map */\n"] }]
  }], () => [{ type: ActivatedRoute }, { type: HttpClient }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DeviceHistoryComponent, { className: "DeviceHistoryComponent", filePath: "src/app/components/devices/device-history/device-history.component.ts", lineNumber: 608 });
})();
export {
  DeviceHistoryComponent
};
//# sourceMappingURL=chunk-VJVHYDQI.js.map
