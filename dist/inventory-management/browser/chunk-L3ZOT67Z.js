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
  MatCard,
  MatCardModule
} from "./chunk-AK2ZYAID.js";
import {
  MatButton,
  MatButtonModule
} from "./chunk-AJHCE7D6.js";
import "./chunk-BIRBC32G.js";
import {
  FormsModule
} from "./chunk-4AUWEQTR.js";
import {
  CommonModule,
  Component,
  HttpClient,
  Injectable,
  NgClass,
  NgIf,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-WPHUMBF2.js";
import "./chunk-YP43Q66R.js";

// src/app/services/excel.service.ts
var ExcelService = class _ExcelService {
  http;
  apiUrl = "/api/excel";
  // ✅ adjust if backend URL differs
  constructor(http) {
    this.http = http;
  }
  upload(fileData) {
    return this.http.post(`${this.apiUrl}/upload`, fileData);
  }
  static \u0275fac = function ExcelService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExcelService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ExcelService, factory: _ExcelService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExcelService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/components/admin/excel-upload/excel-upload.component.ts
var _c0 = (a0, a1) => ({ success: a0, error: a1 });
function ExcelUploadComponent_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275listener("click", function ExcelUploadComponent_button_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reset());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Reset ");
    \u0275\u0275elementEnd();
  }
}
var ExcelUploadComponent = class _ExcelUploadComponent {
  excel;
  file = null;
  message = "";
  success = false;
  constructor(excel) {
    this.excel = excel;
  }
  onFile(ev) {
    const input = ev.target;
    const f = input.files?.[0] ?? null;
    if (f && !f.name.toLowerCase().endsWith(".xlsx")) {
      this.message = "\u274C Please select a valid .xlsx file";
      this.file = null;
      this.success = false;
      return;
    }
    this.file = f;
    this.message = this.file ? `\u2705 Selected: ${this.file.name}` : "";
    this.success = true;
  }
  upload() {
    if (!this.file)
      return;
    const fd = new FormData();
    fd.append("file", this.file);
    this.excel.upload(fd).subscribe({
      next: () => {
        this.message = "\u2705 Upload successful!";
        this.success = true;
      },
      error: (e) => {
        this.message = `\u274C Upload failed: ${e?.message || "Server error"}`;
        this.success = false;
      }
    });
  }
  reset() {
    this.file = null;
    this.message = "";
    this.success = false;
  }
  static \u0275fac = function ExcelUploadComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExcelUploadComponent)(\u0275\u0275directiveInject(ExcelService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExcelUploadComponent, selectors: [["app-excel-upload"]], decls: 15, vars: 7, consts: [[1, "excel-card", "mat-elevation-z4"], [1, "upload-section"], ["type", "file", "accept", ".xlsx", 3, "change"], [1, "btn-group"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["mat-raised-button", "", "color", "warn", "class", "reset-btn", 3, "click", 4, "ngIf"], [1, "status", 3, "ngClass"], ["mat-raised-button", "", "color", "warn", 1, "reset-btn", 3, "click"]], template: function ExcelUploadComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-card", 0)(1, "h2")(2, "mat-icon");
      \u0275\u0275text(3, "upload_file");
      \u0275\u0275elementEnd();
      \u0275\u0275text(4, " Upload Excel File (.xlsx)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 1)(6, "input", 2);
      \u0275\u0275listener("change", function ExcelUploadComponent_Template_input_change_6_listener($event) {
        return ctx.onFile($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 3)(8, "button", 4);
      \u0275\u0275listener("click", function ExcelUploadComponent_Template_button_click_8_listener() {
        return ctx.upload();
      });
      \u0275\u0275elementStart(9, "mat-icon");
      \u0275\u0275text(10, "cloud_upload");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11, " Upload ");
      \u0275\u0275elementEnd();
      \u0275\u0275template(12, ExcelUploadComponent_button_12_Template, 4, 0, "button", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "p", 6);
      \u0275\u0275text(14);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275property("disabled", !ctx.file);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.file);
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(4, _c0, ctx.success, !ctx.success));
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.message, " ");
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgIf,
    FormsModule,
    MatCardModule,
    MatCard,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButton,
    MatIconModule,
    MatIcon
  ], styles: ["\n\n.excel-card[_ngcontent-%COMP%] {\n  margin: 30px;\n  padding: 24px;\n  border-radius: 12px;\n  max-width: 480px;\n}\nh2[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #3f51b5;\n  margin-bottom: 16px;\n  font-weight: 600;\n}\n.upload-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\ninput[type=file][_ngcontent-%COMP%] {\n  padding: 8px;\n  border: 1px dashed #90caf9;\n  border-radius: 8px;\n  background: #e3f2fd;\n}\n.btn-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.status[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  font-weight: 500;\n  font-size: 15px;\n}\n.success[_ngcontent-%COMP%] {\n  color: #43a047;\n}\n.error[_ngcontent-%COMP%] {\n  color: #e53935;\n}\n.reset-btn[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef5350,\n      #e53935);\n  color: white;\n  transition: all 0.3s ease;\n  border-radius: 6px;\n}\n.reset-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  background:\n    linear-gradient(\n      135deg,\n      #e53935,\n      #d32f2f);\n}\n/*# sourceMappingURL=excel-upload.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExcelUploadComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-excel-upload", imports: [
      CommonModule,
      FormsModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule
    ], template: `
    <mat-card class="excel-card mat-elevation-z4">
      <h2><mat-icon>upload_file</mat-icon> Upload Excel File (.xlsx)</h2>

      <div class="upload-section">
        <input type="file" accept=".xlsx" (change)="onFile($event)" />
        <div class="btn-group">
          <button
            mat-raised-button
            color="primary"
            (click)="upload()"
            [disabled]="!file"
          >
            <mat-icon>cloud_upload</mat-icon> Upload
          </button>

          <button
            mat-raised-button
            color="warn"
            class="reset-btn"
            (click)="reset()"
            *ngIf="file"
          >
            <mat-icon>refresh</mat-icon> Reset
          </button>
        </div>
      </div>

      <p class="status" [ngClass]="{ success: success, error: !success }">
        {{ message }}
      </p>
    </mat-card>
  `, styles: ["/* angular:styles/component:scss;9f4921f48222dd37c799c11e80245c16aa2d4138a549a9a174aa37a8f11c4df8;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/admin/excel-upload/excel-upload.component.ts */\n.excel-card {\n  margin: 30px;\n  padding: 24px;\n  border-radius: 12px;\n  max-width: 480px;\n}\nh2 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #3f51b5;\n  margin-bottom: 16px;\n  font-weight: 600;\n}\n.upload-section {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\ninput[type=file] {\n  padding: 8px;\n  border: 1px dashed #90caf9;\n  border-radius: 8px;\n  background: #e3f2fd;\n}\n.btn-group {\n  display: flex;\n  gap: 10px;\n}\n.status {\n  margin-top: 16px;\n  font-weight: 500;\n  font-size: 15px;\n}\n.success {\n  color: #43a047;\n}\n.error {\n  color: #e53935;\n}\n.reset-btn {\n  background:\n    linear-gradient(\n      135deg,\n      #ef5350,\n      #e53935);\n  color: white;\n  transition: all 0.3s ease;\n  border-radius: 6px;\n}\n.reset-btn:hover {\n  transform: translateY(-2px);\n  background:\n    linear-gradient(\n      135deg,\n      #e53935,\n      #d32f2f);\n}\n/*# sourceMappingURL=excel-upload.component.css.map */\n"] }]
  }], () => [{ type: ExcelService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExcelUploadComponent, { className: "ExcelUploadComponent", filePath: "src/app/components/admin/excel-upload/excel-upload.component.ts", lineNumber: 118 });
})();
export {
  ExcelUploadComponent
};
//# sourceMappingURL=chunk-L3ZOT67Z.js.map
