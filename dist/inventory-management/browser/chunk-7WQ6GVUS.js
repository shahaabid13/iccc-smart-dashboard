import {
  ApiService
} from "./chunk-EFW3VKAX.js";
import "./chunk-V7AIRKMU.js";
import "./chunk-N5NV2E2H.js";
import {
  MatOption,
  MatOptionModule,
  MatSelect,
  MatSelectModule
} from "./chunk-T6BSVYIB.js";
import "./chunk-LORH3QDJ.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-25OIJ6Q5.js";
import {
  MatInputModule
} from "./chunk-DUN6GKUJ.js";
import {
  MatFormFieldModule
} from "./chunk-OMQ3L3ZA.js";
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
  ScrollingModule
} from "./chunk-VD67GU43.js";
import {
  MatCard,
  MatCardModule,
  MatFormField,
  MatLabel
} from "./chunk-AK2ZYAID.js";
import {
  MatButton,
  MatButtonModule
} from "./chunk-AJHCE7D6.js";
import "./chunk-BIRBC32G.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-4AUWEQTR.js";
import {
  CommonModule,
  Component,
  HttpClient,
  Injectable,
  NgForOf,
  NgIf,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WPHUMBF2.js";
import "./chunk-YP43Q66R.js";

// src/app/services/locations.service.ts
var LocationsService = class _LocationsService {
  api;
  constructor(api) {
    this.api = api;
  }
  getAll() {
    return this.api.get("/locations");
  }
  searchByName(name) {
    return this.api.get("/locations/search", { name });
  }
  static \u0275fac = function LocationsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LocationsService)(\u0275\u0275inject(ApiService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LocationsService, factory: _LocationsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LocationsService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: ApiService }], null);
})();

// src/app/components/devices/device-search/device-search.component.ts
function DeviceSearchComponent_mat_option_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const l_r1 = ctx.$implicit;
    \u0275\u0275property("value", l_r1.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", l_r1.name, " ");
  }
}
function DeviceSearchComponent_mat_icon_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "search");
    \u0275\u0275elementEnd();
  }
}
function DeviceSearchComponent_mat_icon_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 18);
    \u0275\u0275text(1, "autorenew");
    \u0275\u0275elementEnd();
  }
}
function DeviceSearchComponent_div_39_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 25);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 25);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 25);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 25);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("grid-template-columns", ctx_r2.gridTemplate);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.serialNumber);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.deviceType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.locationName || item_r2.location);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.status);
  }
}
function DeviceSearchComponent_div_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 20)(2, "div", 21);
    \u0275\u0275text(3, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 21);
    \u0275\u0275text(5, "Serial No.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 21);
    \u0275\u0275text(7, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 21);
    \u0275\u0275text(9, "Location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 21);
    \u0275\u0275text(11, "Status");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "cdk-virtual-scroll-viewport", 22);
    \u0275\u0275template(13, DeviceSearchComponent_div_39_div_13_Template, 11, 7, "div", 23);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275styleProp("grid-template-columns", ctx_r2.gridTemplate);
    \u0275\u0275advance(12);
    \u0275\u0275property("cdkVirtualForOf", ctx_r2.items)("cdkVirtualForTrackBy", ctx_r2.trackById);
  }
}
function DeviceSearchComponent_p_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 26);
    \u0275\u0275text(1, " No devices found. ");
    \u0275\u0275elementEnd();
  }
}
var DeviceSearchComponent = class _DeviceSearchComponent {
  http;
  locSvc;
  items = [];
  locations = [];
  location = "";
  type = "";
  status = "";
  loading = false;
  columns = [200, 160, 120, 180, 120];
  get gridTemplate() {
    return this.columns.map((w) => `${w}px`).join(" ");
  }
  constructor(http, locSvc) {
    this.http = http;
    this.locSvc = locSvc;
  }
  ngOnInit() {
    this.locSvc.getAll().subscribe((r) => this.locations = r || []);
  }
  /** ✅ Real backend call */
  search() {
    this.loading = true;
    const params = new URLSearchParams();
    if (this.location)
      params.append("location", this.location);
    if (this.type)
      params.append("type", this.type);
    if (this.status)
      params.append("status", this.status);
    const url = `/api/devices/search?${params.toString()}`;
    this.http.get(url).subscribe({
      next: (data) => {
        this.items = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error("Error fetching devices:", err);
        this.loading = false;
      }
    });
  }
  trackById(i, it) {
    return it.id ?? i;
  }
  static \u0275fac = function DeviceSearchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DeviceSearchComponent)(\u0275\u0275directiveInject(HttpClient), \u0275\u0275directiveInject(LocationsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DeviceSearchComponent, selectors: [["app-device-search"]], decls: 41, vars: 9, consts: [[1, "inventory-card"], [1, "filters"], ["appearance", "outline", 1, "filter-field"], [3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["value", "ANPR"], ["value", "RLVD"], ["value", "PTZ"], ["value", "FIXED"], ["value", "installed"], ["value", "missing"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], [4, "ngIf"], ["class", "spinner", 4, "ngIf"], ["class", "virt-table mat-elevation-z8", 4, "ngIf"], ["class", "no-items", 4, "ngIf"], [3, "value"], [1, "spinner"], [1, "virt-table", "mat-elevation-z8"], [1, "virt-header"], [1, "virt-head-cell"], ["itemSize", "56", 1, "virt-viewport"], ["class", "virt-row", 3, "gridTemplateColumns", 4, "cdkVirtualFor", "cdkVirtualForOf", "cdkVirtualForTrackBy"], [1, "virt-row"], [1, "virt-cell"], [1, "no-items"]], template: function DeviceSearchComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-card", 0)(1, "h2");
      \u0275\u0275text(2, "Device Search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 1)(4, "mat-form-field", 2)(5, "mat-label");
      \u0275\u0275text(6, "Location");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "mat-select", 3);
      \u0275\u0275twoWayListener("ngModelChange", function DeviceSearchComponent_Template_mat_select_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.location, $event) || (ctx.location = $event);
        return $event;
      });
      \u0275\u0275elementStart(8, "mat-option", 4);
      \u0275\u0275text(9, "Select location");
      \u0275\u0275elementEnd();
      \u0275\u0275template(10, DeviceSearchComponent_mat_option_10_Template, 2, 2, "mat-option", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "mat-form-field", 2)(12, "mat-label");
      \u0275\u0275text(13, "Type");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "mat-select", 3);
      \u0275\u0275twoWayListener("ngModelChange", function DeviceSearchComponent_Template_mat_select_ngModelChange_14_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.type, $event) || (ctx.type = $event);
        return $event;
      });
      \u0275\u0275elementStart(15, "mat-option", 4);
      \u0275\u0275text(16, "Any");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "mat-option", 6);
      \u0275\u0275text(18, "ANPR");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "mat-option", 7);
      \u0275\u0275text(20, "RLVD");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "mat-option", 8);
      \u0275\u0275text(22, "PTZ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "mat-option", 9);
      \u0275\u0275text(24, "FIXED");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(25, "mat-form-field", 2)(26, "mat-label");
      \u0275\u0275text(27, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "mat-select", 3);
      \u0275\u0275twoWayListener("ngModelChange", function DeviceSearchComponent_Template_mat_select_ngModelChange_28_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.status, $event) || (ctx.status = $event);
        return $event;
      });
      \u0275\u0275elementStart(29, "mat-option", 4);
      \u0275\u0275text(30, "Any");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "mat-option", 10);
      \u0275\u0275text(32, "Installed");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "mat-option", 11);
      \u0275\u0275text(34, "Missing");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(35, "button", 12);
      \u0275\u0275listener("click", function DeviceSearchComponent_Template_button_click_35_listener() {
        return ctx.search();
      });
      \u0275\u0275template(36, DeviceSearchComponent_mat_icon_36_Template, 2, 0, "mat-icon", 13)(37, DeviceSearchComponent_mat_icon_37_Template, 2, 0, "mat-icon", 14);
      \u0275\u0275text(38, " Search ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(39, DeviceSearchComponent_div_39_Template, 14, 4, "div", 15)(40, DeviceSearchComponent_p_40_Template, 2, 0, "p", 16);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.location);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.locations);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.type);
      \u0275\u0275advance(14);
      \u0275\u0275twoWayProperty("ngModel", ctx.status);
      \u0275\u0275advance(7);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.items.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.items.length === 0);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    FormsModule,
    NgControlStatus,
    NgModel,
    ScrollingModule,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatInputModule,
    MatButtonModule,
    MatButton,
    MatCardModule,
    MatCard,
    MatIconModule,
    MatIcon,
    MatOptionModule
  ], styles: ["\n\n.inventory-card[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 40px auto;\n  padding: 24px;\n  border-radius: 12px;\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);\n}\nh2[_ngcontent-%COMP%] {\n  text-align: center;\n  font-weight: 600;\n  color: #1565c0;\n  margin-bottom: 24px;\n}\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 20px;\n}\n.filter-field[_ngcontent-%COMP%] {\n  width: 220px;\n}\nbutton[_ngcontent-%COMP%] {\n  height: 56px;\n  min-width: 140px;\n  font-weight: 600;\n}\n.spinner[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.virt-table[_ngcontent-%COMP%] {\n  margin-top: 12px;\n}\n.virt-header[_ngcontent-%COMP%], \n.virt-row[_ngcontent-%COMP%] {\n  display: grid;\n  align-items: center;\n  padding: 8px 12px;\n}\n.virt-header[_ngcontent-%COMP%] {\n  font-weight: 600;\n  background: #f1f3f6;\n  border-bottom: 2px solid #ddd;\n}\n.virt-row[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #eee;\n}\n.virt-cell[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.virt-viewport[_ngcontent-%COMP%] {\n  height: 320px;\n}\n.no-items[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #777;\n  font-style: italic;\n  margin-top: 20px;\n}\n/*# sourceMappingURL=device-search.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DeviceSearchComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-device-search", imports: [
      CommonModule,
      FormsModule,
      ScrollingModule,
      MatFormFieldModule,
      MatSelectModule,
      MatInputModule,
      MatButtonModule,
      MatCardModule,
      MatIconModule,
      MatOptionModule
    ], template: `
    <mat-card class="inventory-card">
      <h2>Device Search</h2>

      <div class="filters">
        <mat-form-field appearance="outline" class="filter-field">
          <mat-label>Location</mat-label>
          <mat-select [(ngModel)]="location">
            <mat-option value="">Select location</mat-option>
            <mat-option *ngFor="let l of locations" [value]="l.name">
              {{ l.name }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="filter-field">
          <mat-label>Type</mat-label>
          <mat-select [(ngModel)]="type">
            <mat-option value="">Any</mat-option>
            <mat-option value="ANPR">ANPR</mat-option>
            <mat-option value="RLVD">RLVD</mat-option>
            <mat-option value="PTZ">PTZ</mat-option>
            <mat-option value="FIXED">FIXED</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="filter-field">
          <mat-label>Status</mat-label>
          <mat-select [(ngModel)]="status">
            <mat-option value="">Any</mat-option>
            <mat-option value="installed">Installed</mat-option>
            <mat-option value="missing">Missing</mat-option>
          </mat-select>
        </mat-form-field>

        <button mat-raised-button color="primary" (click)="search()" [disabled]="loading">
          <mat-icon *ngIf="!loading">search</mat-icon>
          <mat-icon *ngIf="loading" class="spinner">autorenew</mat-icon>
          Search
        </button>
      </div>

      <div class="virt-table mat-elevation-z8" *ngIf="items.length > 0">
        <div class="virt-header" [style.gridTemplateColumns]="gridTemplate">
          <div class="virt-head-cell">Name</div>
          <div class="virt-head-cell">Serial No.</div>
          <div class="virt-head-cell">Type</div>
          <div class="virt-head-cell">Location</div>
          <div class="virt-head-cell">Status</div>
        </div>

        <cdk-virtual-scroll-viewport itemSize="56" class="virt-viewport">
          <div
            *cdkVirtualFor="let item of items; trackBy: trackById"
            class="virt-row"
            [style.gridTemplateColumns]="gridTemplate"
          >
            <div class="virt-cell">{{ item.name }}</div>
            <div class="virt-cell">{{ item.serialNumber }}</div>
            <div class="virt-cell">{{ item.deviceType }}</div>
            <div class="virt-cell">{{ item.locationName || item.location }}</div>
            <div class="virt-cell">{{ item.status }}</div>
          </div>
        </cdk-virtual-scroll-viewport>
      </div>

      <p *ngIf="!loading && items.length === 0" class="no-items">
        No devices found.
      </p>
    </mat-card>
  `, styles: ["/* angular:styles/component:scss;a2a67c0aa2b7da166a014d2604ff0c478546e8e85041e59817863a1f48ccb4a2;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/devices/device-search/device-search.component.ts */\n.inventory-card {\n  max-width: 900px;\n  margin: 40px auto;\n  padding: 24px;\n  border-radius: 12px;\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);\n}\nh2 {\n  text-align: center;\n  font-weight: 600;\n  color: #1565c0;\n  margin-bottom: 24px;\n}\n.filters {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 20px;\n}\n.filter-field {\n  width: 220px;\n}\nbutton {\n  height: 56px;\n  min-width: 140px;\n  font-weight: 600;\n}\n.spinner {\n  animation: spin 1s linear infinite;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.virt-table {\n  margin-top: 12px;\n}\n.virt-header,\n.virt-row {\n  display: grid;\n  align-items: center;\n  padding: 8px 12px;\n}\n.virt-header {\n  font-weight: 600;\n  background: #f1f3f6;\n  border-bottom: 2px solid #ddd;\n}\n.virt-row {\n  border-bottom: 1px solid #eee;\n}\n.virt-cell {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.virt-viewport {\n  height: 320px;\n}\n.no-items {\n  text-align: center;\n  color: #777;\n  font-style: italic;\n  margin-top: 20px;\n}\n/*# sourceMappingURL=device-search.component.css.map */\n"] }]
  }], () => [{ type: HttpClient }, { type: LocationsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DeviceSearchComponent, { className: "DeviceSearchComponent", filePath: "src/app/components/devices/device-search/device-search.component.ts", lineNumber: 172 });
})();
export {
  DeviceSearchComponent
};
//# sourceMappingURL=chunk-7WQ6GVUS.js.map
