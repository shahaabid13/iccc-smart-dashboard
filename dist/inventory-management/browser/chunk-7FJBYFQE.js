import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-PDO42MVQ.js";
import {
  MatSnackBar
} from "./chunk-CSMEO5BW.js";
import {
  InventoryService
} from "./chunk-LMI5OJGT.js";
import "./chunk-VD67GU43.js";
import "./chunk-AJHCE7D6.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-AAXJDYQS.js";
import "./chunk-BIRBC32G.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-4AUWEQTR.js";
import {
  CommonModule,
  Component,
  NgIf,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-WPHUMBF2.js";
import "./chunk-YP43Q66R.js";

// src/app/components/admin/item-form/item-form.component.ts
function ItemFormComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275text(1, " Location name is required ");
    \u0275\u0275elementEnd();
  }
}
function ItemFormComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275text(1, " Serial number is required ");
    \u0275\u0275elementEnd();
  }
}
function ItemFormComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275text(1, " Device type is required ");
    \u0275\u0275elementEnd();
  }
}
function ItemFormComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275text(1, " Status is required ");
    \u0275\u0275elementEnd();
  }
}
function ItemFormComponent_div_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275text(1, " Valid latitude is required ");
    \u0275\u0275elementEnd();
  }
}
function ItemFormComponent_div_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275text(1, " Valid longitude is required ");
    \u0275\u0275elementEnd();
  }
}
function ItemFormComponent_mat_progress_spinner_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 31);
  }
}
var ItemFormComponent = class _ItemFormComponent {
  fb;
  route;
  router;
  inventory;
  snackBar;
  form;
  isEdit = false;
  submitting = false;
  itemId = null;
  constructor(fb, route, router, inventory, snackBar) {
    this.fb = fb;
    this.route = route;
    this.router = router;
    this.inventory = inventory;
    this.snackBar = snackBar;
    this.initializeForm();
    this.itemId = this.route.snapshot.paramMap.get("id");
    if (this.itemId) {
      this.isEdit = true;
      this.loadItem(this.itemId);
    }
  }
  /** Initialize the form with proper validation */
  initializeForm() {
    this.form = this.fb.group({
      locationName: ["", [Validators.required, Validators.minLength(2)]],
      serialNumber: ["", [Validators.required, Validators.minLength(2)]],
      deviceType: ["", Validators.required],
      status: ["Installed", Validators.required],
      latitude: ["", [Validators.required, Validators.pattern(/^-?([0-8]?[0-9]|90)(\.[0-9]{1,6})?$/)]],
      longitude: ["", [Validators.required, Validators.pattern(/^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,6})?$/)]],
      approachRoad: [""],
      poles: [false],
      ecbPresent: [false],
      placeholder: [false]
    });
  }
  /** Load item details for edit mode */
  loadItem(id) {
    this.inventory.getById(id).subscribe({
      next: (item) => {
        if (item) {
          this.form.patchValue({
            locationName: item.locationName || "",
            serialNumber: item.serialNumber || "",
            deviceType: item.deviceType || "",
            status: item.status || "Installed",
            latitude: item.latitude || "",
            longitude: item.longitude || "",
            // If approachRoad is an object from backend, patch the name; otherwise use string
            approachRoad: item.approachRoad && typeof item.approachRoad === "object" ? item.approachRoad.name || "" : item.approachRoad || "",
            poles: item.poles || false,
            ecbPresent: item.ecbPresent || false,
            placeholder: item.placeholder || false
          });
        }
      },
      error: (err) => {
        console.error("Failed to load item:", err);
        this.snackBar.open("\u274C Failed to load device details", "Close", {
          duration: 3e3,
          panelClass: ["error-snackbar"]
        });
      }
    });
  }
  /** Create or update device */
  /** Create or update device */
  submit() {
    if (this.form.invalid) {
      this.markFormGroupTouched();
      this.snackBar.open("\u26A0\uFE0F Please fill all required fields correctly", "Close", { duration: 3e3 });
      return;
    }
    this.submitting = true;
    const payload = {
      // Frontend compatibility fields required by InventoryItemPayload
      name: this.form.value.locationName,
      location: this.form.value.locationName,
      quantity: 1,
      // Backend fields
      locationName: this.form.value.locationName,
      serialNumber: this.form.value.serialNumber,
      deviceType: this.form.value.deviceType,
      status: this.form.value.status,
      latitude: String(this.form.value.latitude),
      longitude: String(this.form.value.longitude),
      approachRoad: this.form.value.approachRoad,
      poles: !!this.form.value.poles,
      ecbPresent: !!this.form.value.ecbPresent,
      placeholder: !!this.form.value.placeholder,
      // optional
      description: void 0
    };
    const request$ = this.isEdit ? this.inventory.update(this.itemId, payload) : this.inventory.create(payload);
    request$.subscribe({
      next: (device) => {
        this.submitting = false;
        this.snackBar.open(this.isEdit ? "\u2705 Device updated successfully!" : "\u2705 Device created successfully!", "Close", { duration: 4e3 });
        const id = device?.id ?? (device && device.deviceId) ?? null;
        const needsRefresh = !device?.locationName || !device?.approachRoad;
        if (id && needsRefresh) {
          this.inventory.getById(id).subscribe({
            next: () => this.router.navigate(["/admin/inventory"]),
            error: () => this.router.navigate(["/admin/inventory"])
          });
        } else {
          this.router.navigate(["/admin/inventory"]);
        }
      },
      error: (err) => {
        this.submitting = false;
        console.error(err);
        this.snackBar.open(err.error?.message || "\u274C Error saving device. Try again.", "Close", { duration: 5e3 });
      }
    });
  }
  /** Mark all form controls as touched to show validation errors */
  markFormGroupTouched() {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.controls[key];
      control.markAsTouched();
    });
  }
  cancel() {
    if (this.form.dirty) {
      const confirm = window.confirm("You have unsaved changes. Are you sure you want to cancel?");
      if (!confirm)
        return;
    }
    this.router.navigate(["/admin/inventory"]);
  }
  static \u0275fac = function ItemFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ItemFormComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(InventoryService), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ItemFormComponent, selectors: [["app-item-form"]], decls: 70, vars: 12, consts: [[1, "item-form"], [3, "ngSubmit", "formGroup"], ["formControlName", "locationName", "placeholder", "Enter location name"], ["class", "error", 4, "ngIf"], ["formControlName", "serialNumber", "placeholder", "Enter serial number"], ["formControlName", "deviceType"], ["value", "", "disabled", ""], ["value", "ANPR"], ["value", "RLVD"], ["value", "PTZ"], ["value", "FIXED"], ["value", "ANALYTICAL"], ["formControlName", "status"], ["value", "Installed"], ["value", "Active"], ["value", "Inactive"], ["value", "Maintenance"], [1, "coordinates-group"], ["formControlName", "latitude", "placeholder", "e.g., 28.6139", "type", "number", "step", "any"], ["formControlName", "longitude", "placeholder", "e.g., 77.2090", "type", "number", "step", "any"], ["formControlName", "approachRoad", "placeholder", "Enter approach road"], [1, "checkbox-group"], [1, "checkbox"], ["type", "checkbox", "formControlName", "poles"], ["type", "checkbox", "formControlName", "ecbPresent"], ["type", "checkbox", "formControlName", "placeholder"], [1, "buttons"], ["type", "submit", 1, "btn", "primary", 3, "disabled"], ["diameter", "16", "mode", "indeterminate", "color", "white", "class", "spinner", 4, "ngIf"], ["type", "button", 1, "btn", "secondary", 3, "click", "disabled"], [1, "error"], ["diameter", "16", "mode", "indeterminate", "color", "white", 1, "spinner"]], template: function ItemFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2");
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "form", 1);
      \u0275\u0275listener("ngSubmit", function ItemFormComponent_Template_form_ngSubmit_3_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementStart(4, "label");
      \u0275\u0275text(5, " Location Name ");
      \u0275\u0275element(6, "input", 2);
      \u0275\u0275template(7, ItemFormComponent_div_7_Template, 2, 0, "div", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "label");
      \u0275\u0275text(9, " Serial Number ");
      \u0275\u0275element(10, "input", 4);
      \u0275\u0275template(11, ItemFormComponent_div_11_Template, 2, 0, "div", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "label");
      \u0275\u0275text(13, " Device Type ");
      \u0275\u0275elementStart(14, "select", 5)(15, "option", 6);
      \u0275\u0275text(16, "Select device type");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "option", 7);
      \u0275\u0275text(18, "ANPR");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "option", 8);
      \u0275\u0275text(20, "RLVD");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "option", 9);
      \u0275\u0275text(22, "PTZ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "option", 10);
      \u0275\u0275text(24, "FIXED");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "option", 11);
      \u0275\u0275text(26, "ANALYTICAL");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(27, ItemFormComponent_div_27_Template, 2, 0, "div", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "label");
      \u0275\u0275text(29, " Status ");
      \u0275\u0275elementStart(30, "select", 12)(31, "option", 6);
      \u0275\u0275text(32, "Select status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "option", 13);
      \u0275\u0275text(34, "Installed");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "option", 14);
      \u0275\u0275text(36, "Active");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "option", 15);
      \u0275\u0275text(38, "Inactive");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "option", 16);
      \u0275\u0275text(40, "Maintenance");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(41, ItemFormComponent_div_41_Template, 2, 0, "div", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "div", 17)(43, "label");
      \u0275\u0275text(44, " Latitude ");
      \u0275\u0275element(45, "input", 18);
      \u0275\u0275template(46, ItemFormComponent_div_46_Template, 2, 0, "div", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "label");
      \u0275\u0275text(48, " Longitude ");
      \u0275\u0275element(49, "input", 19);
      \u0275\u0275template(50, ItemFormComponent_div_50_Template, 2, 0, "div", 3);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(51, "label");
      \u0275\u0275text(52, " Approach Road ");
      \u0275\u0275element(53, "input", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "div", 21)(55, "label", 22);
      \u0275\u0275element(56, "input", 23);
      \u0275\u0275text(57, " Poles Installed ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "label", 22);
      \u0275\u0275element(59, "input", 24);
      \u0275\u0275text(60, " ECB Present ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "label", 22);
      \u0275\u0275element(62, "input", 25);
      \u0275\u0275text(63, " Placeholder Device ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "div", 26)(65, "button", 27);
      \u0275\u0275template(66, ItemFormComponent_mat_progress_spinner_66_Template, 1, 0, "mat-progress-spinner", 28);
      \u0275\u0275text(67);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "button", 29);
      \u0275\u0275listener("click", function ItemFormComponent_Template_button_click_68_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(69, " Cancel ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      let tmp_7_0;
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.isEdit ? "Edit" : "Create", " Device");
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ((tmp_2_0 = ctx.form.get("locationName")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.form.get("locationName")) == null ? null : tmp_2_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.form.get("serialNumber")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.form.get("serialNumber")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance(16);
      \u0275\u0275property("ngIf", ((tmp_4_0 = ctx.form.get("deviceType")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx.form.get("deviceType")) == null ? null : tmp_4_0.touched));
      \u0275\u0275advance(14);
      \u0275\u0275property("ngIf", ((tmp_5_0 = ctx.form.get("status")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.form.get("status")) == null ? null : tmp_5_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_6_0 = ctx.form.get("latitude")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx.form.get("latitude")) == null ? null : tmp_6_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ((tmp_7_0 = ctx.form.get("longitude")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.form.get("longitude")) == null ? null : tmp_7_0.touched));
      \u0275\u0275advance(15);
      \u0275\u0275property("disabled", ctx.form.invalid || ctx.submitting);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.submitting);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isEdit ? "Update" : "Create", " Device ");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.submitting);
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatProgressSpinnerModule, MatProgressSpinner], styles: ["\n\n.item-form[_ngcontent-%COMP%] {\n  max-width: 600px;\n  margin: 20px auto;\n  padding: 30px;\n  background: #fff;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\nh2[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #1976d2;\n  margin-bottom: 24px;\n  font-weight: 600;\n  font-size: 24px;\n}\nform[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  font-weight: 600;\n  color: #333;\n  font-size: 14px;\n}\ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  padding: 12px;\n  border: 2px solid #e0e0e0;\n  border-radius: 8px;\n  font-size: 14px;\n  margin-top: 6px;\n  transition: border-color 0.3s ease;\n  background: #fafafa;\n}\ninput[_ngcontent-%COMP%]:focus, \nselect[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1976d2;\n  background: white;\n}\n.coordinates-group[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 15px;\n}\n.checkbox-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin: 15px 0;\n  padding: 20px;\n  background: #f8f9fa;\n  border-radius: 8px;\n  border: 1px solid #e9ecef;\n}\n.checkbox[_ngcontent-%COMP%] {\n  flex-direction: row;\n  align-items: center;\n  gap: 10px;\n  font-weight: normal;\n  cursor: pointer;\n}\n.checkbox[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  margin: 0;\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n}\n.buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  margin-top: 30px;\n  padding-top: 20px;\n  border-top: 1px solid #e0e0e0;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 12px 24px;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 120px;\n  justify-content: center;\n}\n.btn.primary[_ngcontent-%COMP%] {\n  background-color: #1976d2;\n  color: #fff;\n}\n.btn.primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #1565c0;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(25, 118, 210, 0.3);\n}\n.btn.secondary[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n  color: #333;\n  border: 1px solid #ddd;\n}\n.btn.secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #e0e0e0;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none !important;\n}\n.error[_ngcontent-%COMP%] {\n  color: #d32f2f;\n  font-size: 12px;\n  margin-top: 4px;\n  font-weight: normal;\n}\n.spinner[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n@media (max-width: 768px) {\n  .item-form[_ngcontent-%COMP%] {\n    margin: 10px;\n    padding: 20px;\n  }\n  .coordinates-group[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .buttons[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=item-form.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ItemFormComponent, [{
    type: Component,
    args: [{ standalone: true, imports: [CommonModule, ReactiveFormsModule, MatProgressSpinnerModule], selector: "app-item-form", template: `
    <div class="item-form">
      <h2>{{ isEdit ? 'Edit' : 'Create' }} Device</h2>

      <form [formGroup]="form" (ngSubmit)="submit()">
        <label>
          Location Name
          <input formControlName="locationName" placeholder="Enter location name" />
          <div class="error" *ngIf="form.get('locationName')?.invalid && form.get('locationName')?.touched">
            Location name is required
          </div>
        </label>

        <label>
          Serial Number
          <input formControlName="serialNumber" placeholder="Enter serial number" />
          <div class="error" *ngIf="form.get('serialNumber')?.invalid && form.get('serialNumber')?.touched">
            Serial number is required
          </div>
        </label>

        <label>
          Device Type
          <select formControlName="deviceType">
            <option value="" disabled>Select device type</option>
            <option value="ANPR">ANPR</option>
            <option value="RLVD">RLVD</option>
            <option value="PTZ">PTZ</option>
            <option value="FIXED">FIXED</option>
            <option value="ANALYTICAL">ANALYTICAL</option>
          </select>
          <div class="error" *ngIf="form.get('deviceType')?.invalid && form.get('deviceType')?.touched">
            Device type is required
          </div>
        </label>

        <label>
          Status
          <select formControlName="status">
            <option value="" disabled>Select status</option>
            <option value="Installed">Installed</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          <div class="error" *ngIf="form.get('status')?.invalid && form.get('status')?.touched">
            Status is required
          </div>
        </label>

        <div class="coordinates-group">
          <label>
            Latitude
            <input formControlName="latitude" placeholder="e.g., 28.6139" type="number" step="any" />
            <div class="error" *ngIf="form.get('latitude')?.invalid && form.get('latitude')?.touched">
              Valid latitude is required
            </div>
          </label>

          <label>
            Longitude
            <input formControlName="longitude" placeholder="e.g., 77.2090" type="number" step="any" />
            <div class="error" *ngIf="form.get('longitude')?.invalid && form.get('longitude')?.touched">
              Valid longitude is required
            </div>
          </label>
        </div>

        <label>
          Approach Road
          <input formControlName="approachRoad" placeholder="Enter approach road" />
        </label>

        <div class="checkbox-group">
          <label class="checkbox">
            <input type="checkbox" formControlName="poles" />
            Poles Installed
          </label>

          <label class="checkbox">
            <input type="checkbox" formControlName="ecbPresent" />
            ECB Present
          </label>

          <label class="checkbox">
            <input type="checkbox" formControlName="placeholder" />
            Placeholder Device
          </label>
        </div>

        <div class="buttons">
          <button type="submit" [disabled]="form.invalid || submitting" class="btn primary">
            <mat-progress-spinner 
              *ngIf="submitting" 
              diameter="16" 
              mode="indeterminate" 
              color="white"
              class="spinner">
            </mat-progress-spinner>
            {{ isEdit ? 'Update' : 'Create' }} Device
          </button>
          <button type="button" (click)="cancel()" [disabled]="submitting" class="btn secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `, styles: ["/* angular:styles/component:scss;841dfb2151d8230f14c0076a72655fdd80aa4bc8d8adf21f9792b1fc07b51dcc;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/admin/item-form/item-form.component.ts */\n.item-form {\n  max-width: 600px;\n  margin: 20px auto;\n  padding: 30px;\n  background: #fff;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\nh2 {\n  text-align: center;\n  color: #1976d2;\n  margin-bottom: 24px;\n  font-weight: 600;\n  font-size: 24px;\n}\nform {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\nlabel {\n  display: flex;\n  flex-direction: column;\n  font-weight: 600;\n  color: #333;\n  font-size: 14px;\n}\ninput,\nselect {\n  padding: 12px;\n  border: 2px solid #e0e0e0;\n  border-radius: 8px;\n  font-size: 14px;\n  margin-top: 6px;\n  transition: border-color 0.3s ease;\n  background: #fafafa;\n}\ninput:focus,\nselect:focus {\n  outline: none;\n  border-color: #1976d2;\n  background: white;\n}\n.coordinates-group {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 15px;\n}\n.checkbox-group {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin: 15px 0;\n  padding: 20px;\n  background: #f8f9fa;\n  border-radius: 8px;\n  border: 1px solid #e9ecef;\n}\n.checkbox {\n  flex-direction: row;\n  align-items: center;\n  gap: 10px;\n  font-weight: normal;\n  cursor: pointer;\n}\n.checkbox input[type=checkbox] {\n  margin: 0;\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n}\n.buttons {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  margin-top: 30px;\n  padding-top: 20px;\n  border-top: 1px solid #e0e0e0;\n}\n.btn {\n  padding: 12px 24px;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 120px;\n  justify-content: center;\n}\n.btn.primary {\n  background-color: #1976d2;\n  color: #fff;\n}\n.btn.primary:hover:not(:disabled) {\n  background-color: #1565c0;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(25, 118, 210, 0.3);\n}\n.btn.secondary {\n  background-color: #f5f5f5;\n  color: #333;\n  border: 1px solid #ddd;\n}\n.btn.secondary:hover:not(:disabled) {\n  background-color: #e0e0e0;\n}\n.btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none !important;\n}\n.error {\n  color: #d32f2f;\n  font-size: 12px;\n  margin-top: 4px;\n  font-weight: normal;\n}\n.spinner {\n  display: inline-block;\n}\n@media (max-width: 768px) {\n  .item-form {\n    margin: 10px;\n    padding: 20px;\n  }\n  .coordinates-group {\n    grid-template-columns: 1fr;\n  }\n  .buttons {\n    flex-direction: column;\n  }\n  .btn {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=item-form.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: ActivatedRoute }, { type: Router }, { type: InventoryService }, { type: MatSnackBar }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ItemFormComponent, { className: "ItemFormComponent", filePath: "src/app/components/admin/item-form/item-form.component.ts", lineNumber: 285 });
})();
export {
  ItemFormComponent
};
//# sourceMappingURL=chunk-7FJBYFQE.js.map
