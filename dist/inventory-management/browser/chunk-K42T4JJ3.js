import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-PDO42MVQ.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-CSMEO5BW.js";
import {
  MatOption,
  MatSelect,
  MatSelectModule
} from "./chunk-T6BSVYIB.js";
import "./chunk-LORH3QDJ.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-25OIJ6Q5.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-DUN6GKUJ.js";
import {
  MatFormFieldModule
} from "./chunk-OMQ3L3ZA.js";
import "./chunk-VD67GU43.js";
import {
  MatCard,
  MatCardModule,
  MatError,
  MatFormField,
  MatLabel
} from "./chunk-AK2ZYAID.js";
import {
  MatButton,
  MatButtonModule
} from "./chunk-AJHCE7D6.js";
import {
  Router
} from "./chunk-AAXJDYQS.js";
import "./chunk-BIRBC32G.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
  ɵNgNoValidate
} from "./chunk-4AUWEQTR.js";
import {
  CommonModule,
  Component,
  HttpClient,
  HttpClientModule,
  HttpHeaders,
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
  ɵɵtextInterpolate
} from "./chunk-WPHUMBF2.js";
import "./chunk-YP43Q66R.js";

// src/app/components/maintenance/maintenance-request/maintenance-request.component.ts
function MaintenanceRequestComponent_mat_error_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Device serial number is required ");
    \u0275\u0275elementEnd();
  }
}
function MaintenanceRequestComponent_mat_progress_spinner_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 24);
  }
}
function MaintenanceRequestComponent_mat_icon_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "search");
    \u0275\u0275elementEnd();
  }
}
function MaintenanceRequestComponent_mat_error_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Location name is required ");
    \u0275\u0275elementEnd();
  }
}
function MaintenanceRequestComponent_mat_error_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Approach road name is required ");
    \u0275\u0275elementEnd();
  }
}
function MaintenanceRequestComponent_mat_error_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Request type is required ");
    \u0275\u0275elementEnd();
  }
}
function MaintenanceRequestComponent_mat_progress_spinner_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 25);
  }
}
function MaintenanceRequestComponent_span_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Submit Request");
    \u0275\u0275elementEnd();
  }
}
function MaintenanceRequestComponent_span_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Submitting...");
    \u0275\u0275elementEnd();
  }
}
var MaintenanceRequestComponent = class _MaintenanceRequestComponent {
  fb;
  snackBar;
  router;
  http;
  form;
  submitting = false;
  fetchingDetails = false;
  baseUrl = "/api/maintenance/requests";
  deviceBaseUrl = "/api/devices";
  // FIXED: Base URL without the endpoint
  // Request types from your Java enum
  requestTypes = [
    { value: "FAULT", label: "Fault" },
    { value: "REPAIR", label: "Repair" },
    { value: "REPLACE", label: "Replace" },
    { value: "SERIAL_UPDATE", label: "Serial Update" },
    { value: "MOVE", label: "Move" }
  ];
  constructor(fb, snackBar, router, http) {
    this.fb = fb;
    this.snackBar = snackBar;
    this.router = router;
    this.http = http;
    this.form = this.fb.group({
      deviceSerial: ["", Validators.required],
      newSerial: [""],
      locationName: ["", Validators.required],
      approachRoadName: ["", Validators.required],
      requestType: ["", Validators.required],
      remarks: [""]
    });
    this.form.get("requestType")?.valueChanges.subscribe((requestType) => {
      if (requestType === "SERIAL_UPDATE" || requestType === "REPLACE") {
        this.snackBar.open("Please provide a new serial number for this request type", "OK", {
          duration: 3e3,
          panelClass: ["info-snackbar"]
        });
      }
    });
  }
  /** Get device details from backend API */
  getDeviceDetails() {
    const deviceSerial = this.form.get("deviceSerial")?.value?.trim();
    if (!deviceSerial) {
      this.snackBar.open("\u26A0\uFE0F Please enter a device serial number first", "Close", {
        duration: 3e3,
        panelClass: ["warning-snackbar"]
      });
      return;
    }
    this.fetchingDetails = true;
    const token = localStorage.getItem("token");
    if (!token) {
      this.snackBar.open("\u274C You must log in to fetch device details", "Close", {
        duration: 3e3,
        panelClass: ["error-snackbar"]
      });
      this.fetchingDetails = false;
      return;
    }
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    });
    const url = `${this.deviceBaseUrl}/by-serial/${encodeURIComponent(deviceSerial)}`;
    console.log("Fetching device details from:", url);
    this.http.get(url, { headers }).subscribe({
      next: (response) => {
        this.fetchingDetails = false;
        if (response) {
          this.form.patchValue({
            locationName: response.locationName || "",
            approachRoadName: response.approachRoad || ""
            // Note: approachRoad in DTO
          });
          this.snackBar.open("\u2705 Device details loaded successfully!", "Close", {
            duration: 3e3,
            panelClass: ["success-snackbar"]
          });
          console.log("Device details loaded:", response);
        } else {
          this.snackBar.open("\u26A0\uFE0F Device found but no location data available", "Close", {
            duration: 3e3,
            panelClass: ["warning-snackbar"]
          });
        }
      },
      error: (err) => {
        this.fetchingDetails = false;
        console.error("Error fetching device details:", err);
        let errorMessage = "\u274C Failed to fetch device details. Please check the serial number.";
        if (err.status === 404) {
          errorMessage = "\u274C Device not found. Please check the serial number.";
        } else if (err.status === 401) {
          errorMessage = "\u274C Authentication failed. Please log in again.";
        } else if (err.status === 403) {
          errorMessage = "\u274C You do not have permission to access device details.";
        } else if (err.status === 500) {
          errorMessage = "\u274C Server error while fetching device details.";
        } else if (err.error?.message) {
          errorMessage = `\u274C ${err.error.message}`;
        }
        this.snackBar.open(errorMessage, "Close", {
          duration: 5e3,
          panelClass: ["error-snackbar"]
        });
      }
    });
  }
  /** Auto-fetch details when user leaves serial field (optional) */
  onSerialBlur() {
    const deviceSerial = this.form.get("deviceSerial")?.value?.trim();
    const locationName = this.form.get("locationName")?.value;
    const approachRoad = this.form.get("approachRoadName")?.value;
    if (deviceSerial && (!locationName || !approachRoad)) {
      setTimeout(() => {
        this.getDeviceDetails();
      }, 500);
    }
  }
  /** Submit request to backend */
  submit() {
    if (this.form.invalid) {
      this.markFormGroupTouched();
      this.snackBar.open("\u26A0\uFE0F Please fill all required fields correctly.", "Close", {
        duration: 3e3,
        panelClass: ["warning-snackbar"]
      });
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      this.snackBar.open("\u274C You must log in before submitting a request.", "Close", {
        duration: 3e3,
        panelClass: ["error-snackbar"]
      });
      return;
    }
    this.submitting = true;
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    });
    const requestPayload = {
      deviceSerial: this.form.value.deviceSerial.trim(),
      newSerial: this.form.value.newSerial?.trim() || null,
      requestType: this.form.value.requestType,
      locationName: this.form.value.locationName.trim(),
      approachRoadName: this.form.value.approachRoadName.trim(),
      remarks: this.form.value.remarks?.trim() || null
    };
    console.log("Submitting maintenance request:", requestPayload);
    this.http.post(this.baseUrl, requestPayload, { headers }).subscribe({
      next: (response) => {
        this.snackBar.open("\u2705 Maintenance request submitted successfully!", "Close", {
          duration: 4e3,
          panelClass: ["success-snackbar"]
        });
        this.submitting = false;
        this.form.reset();
        this.router.navigate(["/all-requests"]);
      },
      error: (err) => {
        console.error("Error submitting request:", err);
        let errorMessage = "\u274C Failed to submit request. Please try again.";
        if (err.status === 400) {
          if (err.error?.message) {
            errorMessage = `\u274C ${err.error.message}`;
          } else {
            errorMessage = "\u274C Invalid request data. Please check your inputs.";
          }
        } else if (err.status === 401) {
          errorMessage = "\u274C Authentication failed. Please log in again.";
        } else if (err.status === 403) {
          errorMessage = "\u274C You do not have permission to submit requests.";
        } else if (err.status === 404) {
          errorMessage = "\u274C Device not found. Please check the Device Serial.";
        } else if (err.status === 409) {
          errorMessage = "\u274C A request for this device is already pending.";
        } else if (err.error?.message) {
          errorMessage = `\u274C ${err.error.message}`;
        }
        this.snackBar.open(errorMessage, "Close", {
          duration: 5e3,
          panelClass: ["error-snackbar"]
        });
        this.submitting = false;
      }
    });
  }
  /** Cancel and navigate back */
  cancel() {
    if (this.form.dirty) {
      const confirm = window.confirm("You have unsaved changes. Are you sure you want to cancel?");
      if (!confirm)
        return;
    }
    this.router.navigate(["/dashboard"]);
  }
  /** Mark all form controls as touched to trigger validation messages */
  markFormGroupTouched() {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }
  /** Helper method to check if new serial is recommended */
  isNewSerialRecommended() {
    const requestType = this.form.get("requestType")?.value;
    return requestType === "SERIAL_UPDATE" || requestType === "REPLACE";
  }
  /** Get request type description */
  getRequestTypeDescription(type) {
    const descriptions = {
      "FAULT": "Device is faulty and needs attention",
      "REPAIR": "Device needs repair work",
      "REPLACE": "Device needs to be replaced with a new one",
      "SERIAL_UPDATE": "Update device serial number",
      "MOVE": "Relocate device to different location"
    };
    return descriptions[type] || "";
  }
  static \u0275fac = function MaintenanceRequestComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MaintenanceRequestComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(HttpClient));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MaintenanceRequestComponent, selectors: [["app-maintenance-request"]], decls: 79, vars: 14, consts: [[1, "maintenance-card"], [3, "ngSubmit", "formGroup"], [1, "serial-with-button"], ["appearance", "outline", 1, "full", "serial-field"], ["matInput", "", "formControlName", "deviceSerial", "required", "", "placeholder", "Enter current device serial number", 3, "blur"], [4, "ngIf"], ["mat-raised-button", "", "color", "accent", "type", "button", 1, "get-details-btn", 3, "click", "disabled"], ["diameter", "16", "mode", "indeterminate", "color", "primary", "class", "spinner-small", 4, "ngIf"], ["appearance", "outline", 1, "full"], ["matInput", "", "formControlName", "newSerial", "placeholder", "Enter new serial number if applicable"], ["matInput", "", "formControlName", "locationName", "required", "", "placeholder", "Enter location name"], ["matInput", "", "formControlName", "approachRoadName", "required", "", "placeholder", "Enter approach road name"], ["formControlName", "requestType", "required", ""], ["value", "FAULT", 1, "options-select"], ["value", "REPAIR", 1, "options-select"], ["value", "REPLACE", 1, "options-select"], ["value", "SERIAL_UPDATE", 1, "options-select"], ["value", "MOVE", 1, "options-select"], ["matInput", "", "formControlName", "remarks", "rows", "3", "placeholder", "Additional notes, description, or reason for request"], [1, "form-actions"], ["mat-raised-button", "", "color", "primary", "type", "submit", 1, "submit-btn", 3, "disabled"], ["diameter", "20", "mode", "indeterminate", "color", "accent", "class", "spinner", 4, "ngIf"], ["mat-stroked-button", "", "type", "button", 1, "cancel-btn", 3, "click", "disabled"], [1, "help-section"], ["diameter", "16", "mode", "indeterminate", "color", "primary", 1, "spinner-small"], ["diameter", "20", "mode", "indeterminate", "color", "accent", 1, "spinner"]], template: function MaintenanceRequestComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-card", 0)(1, "h2");
      \u0275\u0275text(2, "Create Maintenance Request");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "form", 1);
      \u0275\u0275listener("ngSubmit", function MaintenanceRequestComponent_Template_form_ngSubmit_3_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementStart(4, "div", 2)(5, "mat-form-field", 3)(6, "mat-label");
      \u0275\u0275text(7, "Device Serial Number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "input", 4);
      \u0275\u0275listener("blur", function MaintenanceRequestComponent_Template_input_blur_8_listener() {
        return ctx.onSerialBlur();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, MaintenanceRequestComponent_mat_error_9_Template, 2, 0, "mat-error", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "button", 6);
      \u0275\u0275listener("click", function MaintenanceRequestComponent_Template_button_click_10_listener() {
        return ctx.getDeviceDetails();
      });
      \u0275\u0275template(11, MaintenanceRequestComponent_mat_progress_spinner_11_Template, 1, 0, "mat-progress-spinner", 7)(12, MaintenanceRequestComponent_mat_icon_12_Template, 2, 0, "mat-icon", 5);
      \u0275\u0275elementStart(13, "span");
      \u0275\u0275text(14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(15, "mat-form-field", 8)(16, "mat-label");
      \u0275\u0275text(17, "New Serial Number (if replacing/updating)");
      \u0275\u0275elementEnd();
      \u0275\u0275element(18, "input", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "mat-form-field", 8)(20, "mat-label");
      \u0275\u0275text(21, "Location Name");
      \u0275\u0275elementEnd();
      \u0275\u0275element(22, "input", 10);
      \u0275\u0275template(23, MaintenanceRequestComponent_mat_error_23_Template, 2, 0, "mat-error", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "mat-form-field", 8)(25, "mat-label");
      \u0275\u0275text(26, "Approach Road Name");
      \u0275\u0275elementEnd();
      \u0275\u0275element(27, "input", 11);
      \u0275\u0275template(28, MaintenanceRequestComponent_mat_error_28_Template, 2, 0, "mat-error", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "mat-form-field", 8)(30, "mat-label");
      \u0275\u0275text(31, "Request Type");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "mat-select", 12)(33, "mat-option", 13);
      \u0275\u0275text(34, "Fault");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "mat-option", 14);
      \u0275\u0275text(36, "Repair");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "mat-option", 15);
      \u0275\u0275text(38, "Replace");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "mat-option", 16);
      \u0275\u0275text(40, "Serial Update");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "mat-option", 17);
      \u0275\u0275text(42, "Move");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(43, MaintenanceRequestComponent_mat_error_43_Template, 2, 0, "mat-error", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "mat-form-field", 8)(45, "mat-label");
      \u0275\u0275text(46, "Remarks");
      \u0275\u0275elementEnd();
      \u0275\u0275element(47, "textarea", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "div", 19)(49, "button", 20);
      \u0275\u0275template(50, MaintenanceRequestComponent_mat_progress_spinner_50_Template, 1, 0, "mat-progress-spinner", 21)(51, MaintenanceRequestComponent_span_51_Template, 2, 0, "span", 5)(52, MaintenanceRequestComponent_span_52_Template, 2, 0, "span", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "button", 22);
      \u0275\u0275listener("click", function MaintenanceRequestComponent_Template_button_click_53_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(54, " Cancel ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "div", 23)(56, "h4");
      \u0275\u0275text(57, "Request Type Descriptions:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "ul")(59, "li")(60, "strong");
      \u0275\u0275text(61, "FAULT");
      \u0275\u0275elementEnd();
      \u0275\u0275text(62, " - Device is faulty and needs attention");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "li")(64, "strong");
      \u0275\u0275text(65, "REPAIR");
      \u0275\u0275elementEnd();
      \u0275\u0275text(66, " - Device needs repair work");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "li")(68, "strong");
      \u0275\u0275text(69, "REPLACE");
      \u0275\u0275elementEnd();
      \u0275\u0275text(70, " - Device needs to be replaced with a new one");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "li")(72, "strong");
      \u0275\u0275text(73, "SERIAL_UPDATE");
      \u0275\u0275elementEnd();
      \u0275\u0275text(74, " - Update device serial number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "li")(76, "strong");
      \u0275\u0275text(77, "MOVE");
      \u0275\u0275elementEnd();
      \u0275\u0275text(78, " - Relocate device to different location");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      let tmp_6_0;
      let tmp_7_0;
      let tmp_8_0;
      \u0275\u0275advance(3);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", (tmp_1_0 = ctx.form.get("deviceSerial")) == null ? null : tmp_1_0.hasError("required"));
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !((tmp_2_0 = ctx.form.get("deviceSerial")) == null ? null : tmp_2_0.value) || ctx.fetchingDetails);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.fetchingDetails);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.fetchingDetails);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.fetchingDetails ? "Fetching..." : "Get Details");
      \u0275\u0275advance(9);
      \u0275\u0275property("ngIf", (tmp_6_0 = ctx.form.get("locationName")) == null ? null : tmp_6_0.hasError("required"));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", (tmp_7_0 = ctx.form.get("approachRoadName")) == null ? null : tmp_7_0.hasError("required"));
      \u0275\u0275advance(15);
      \u0275\u0275property("ngIf", (tmp_8_0 = ctx.form.get("requestType")) == null ? null : tmp_8_0.hasError("required"));
      \u0275\u0275advance(6);
      \u0275\u0275property("disabled", ctx.form.invalid || ctx.submitting);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.submitting);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.submitting);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.submitting);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.submitting);
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    RequiredValidator,
    FormGroupDirective,
    FormControlName,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatButton,
    MatCardModule,
    MatCard,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatSelectModule,
    MatSelect,
    MatOption,
    HttpClientModule,
    MatIconModule,
    MatIcon
  ], styles: ["\n\n.maintenance-card[_ngcontent-%COMP%] {\n  max-width: 600px;\n  margin: 40px auto;\n  padding: 28px;\n  border-radius: 12px;\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);\n  background: #fafafa;\n}\nh2[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #1565c0;\n  font-weight: 600;\n  margin-bottom: 28px;\n  letter-spacing: 0.5px;\n}\n.full[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 18px;\n}\n.serial-with-button[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n}\n.serial-field[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.options-select[_ngcontent-%COMP%] {\n  text-color: #6610f2;\n  font-weight: 500;\n  background-color: #f8f9fa !important;\n}\n.get-details-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  height: 56px;\n  margin-top: 0.25em;\n  white-space: nowrap;\n  min-width: 140px;\n  font-weight: 500;\n  background:\n    linear-gradient(\n      135deg,\n      #ff9800,\n      #f57c00);\n  color: white;\n}\n.get-details-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background:\n    linear-gradient(\n      135deg,\n      #f57c00,\n      #ef6c00);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(245, 124, 0, 0.3);\n}\n.get-details-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.spinner-small[_ngcontent-%COMP%] {\n  margin-right: 4px;\n}\nmat-form-field[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-top: 20px;\n  margin-bottom: 30px;\n}\n.submit-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  flex: 1;\n  font-weight: 600;\n  height: 48px;\n  border-radius: 8px;\n  letter-spacing: 0.5px;\n  transition: all 0.3s ease;\n}\n.cancel-btn[_ngcontent-%COMP%] {\n  flex: 0.5;\n  height: 48px;\n  border-radius: 8px;\n  font-weight: 500;\n}\n.submit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #1565c0;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(21, 101, 192, 0.3);\n}\n.submit-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.cancel-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #f5f5f5;\n}\n.spinner[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n.help-section[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  padding: 16px;\n  border-radius: 8px;\n  border-left: 4px solid #2196f3;\n  margin-top: 20px;\n}\n.help-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  color: #1565c0;\n  font-weight: 600;\n}\n.help-section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: 20px;\n}\n.help-section[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n  line-height: 1.4;\n}\n.help-section[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #1976d2;\n}\n  .mat-form-field-appearance-outline .mat-form-field-outline {\n  background-color: #ffffff !important;\n  border-radius: 4px !important;\n}\n  .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {\n  background-color: #f5f5f5 !important;\n}\n  .mat-select-panel {\n  background: #ffffff !important;\n  border: 2px solid #e0e0e0 !important;\n  border-radius: 8px !important;\n}\n  .mat-option {\n  background: #ffffff !important;\n  color: #333333 !important;\n  font-weight: 500;\n}\n  .mat-option:hover:not(.mat-option-disabled) {\n  background: #f0f8ff !important;\n  color: #1976d2 !important;\n}\n  .mat-option.mat-selected:not(.mat-option-multiple) {\n  background: #e3f2fd !important;\n  color: #1976d2 !important;\n  font-weight: 600;\n}\n  .mat-option.mat-active {\n  background: #e3f2fd !important;\n  color: #1976d2 !important;\n}\n  .mat-form-field-appearance-outline .mat-form-field-outline-thick {\n  color: #e0e0e0 !important;\n}\n  .mat-input-element {\n  background-color: transparent !important;\n}\n  textarea.mat-input-element {\n  background-color: transparent !important;\n}\n  .success-snackbar {\n  background: #4caf50 !important;\n  color: white !important;\n}\n  .error-snackbar {\n  background: #f44336 !important;\n  color: white !important;\n}\n  .warning-snackbar {\n  background: #ff9800 !important;\n  color: white !important;\n}\n  .info-snackbar {\n  background: #2196f3 !important;\n  color: white !important;\n}\n@media (max-width: 768px) {\n  .maintenance-card[_ngcontent-%COMP%] {\n    margin: 20px;\n    padding: 20px;\n  }\n  .serial-with-button[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .get-details-btn[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 48px;\n    margin-top: 0;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .cancel-btn[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n}\n/*# sourceMappingURL=maintenance-request.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaintenanceRequestComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-maintenance-request", imports: [
      CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatCardModule,
      MatSnackBarModule,
      MatProgressSpinnerModule,
      MatSelectModule,
      HttpClientModule,
      MatIconModule
    ], template: `
    <mat-card class="maintenance-card">
      <h2>Create Maintenance Request</h2>

      <form [formGroup]="form" (ngSubmit)="submit()">
        <!-- Device Serial (required) with Get Details button -->
        <div class="serial-with-button">
          <mat-form-field appearance="outline" class="full serial-field">
            <mat-label>Device Serial Number</mat-label>
            <input
              matInput
              formControlName="deviceSerial"
              required
              placeholder="Enter current device serial number"
              (blur)="onSerialBlur()"
            />
            <mat-error *ngIf="form.get('deviceSerial')?.hasError('required')">
              Device serial number is required
            </mat-error>
          </mat-form-field>
          
          <button
            mat-raised-button
            color="accent"
            type="button"
            (click)="getDeviceDetails()"
            [disabled]="!form.get('deviceSerial')?.value || fetchingDetails"
            class="get-details-btn">
            <mat-progress-spinner
              *ngIf="fetchingDetails"
              diameter="16"
              mode="indeterminate"
              color="primary"
              class="spinner-small">
            </mat-progress-spinner>
            <mat-icon *ngIf="!fetchingDetails">search</mat-icon>
            <span>{{ fetchingDetails ? 'Fetching...' : 'Get Details' }}</span>
          </button>
        </div>

        <!-- New Serial Number (optional) -->
        <mat-form-field appearance="outline" class="full">
          <mat-label>New Serial Number (if replacing/updating)</mat-label>
          <input
            matInput
            formControlName="newSerial"
            placeholder="Enter new serial number if applicable"
          />
        </mat-form-field>

        <!-- Location Name (required) -->
        <mat-form-field appearance="outline" class="full">
          <mat-label>Location Name</mat-label>
          <input
            matInput
            formControlName="locationName"
            required
            placeholder="Enter location name"
          />
          <mat-error *ngIf="form.get('locationName')?.hasError('required')">
            Location name is required
          </mat-error>
        </mat-form-field>

        <!-- Approach Road Name (required) -->
        <mat-form-field appearance="outline" class="full">
          <mat-label>Approach Road Name</mat-label>
          <input
            matInput
            formControlName="approachRoadName"
            required
            placeholder="Enter approach road name"
          />
          <mat-error *ngIf="form.get('approachRoadName')?.hasError('required')">
            Approach road name is required
          </mat-error>
        </mat-form-field>

        <!-- Request Type (required) -->
        <mat-form-field appearance="outline" class="full">
          <mat-label>Request Type</mat-label>
          <mat-select formControlName="requestType" required>
            <mat-option value="FAULT" class="options-select">Fault</mat-option>
            <mat-option value="REPAIR" class="options-select">Repair</mat-option>
            <mat-option value="REPLACE" class="options-select">Replace</mat-option>
            <mat-option value="SERIAL_UPDATE" class="options-select">Serial Update</mat-option>
            <mat-option value="MOVE" class="options-select">Move</mat-option>
          </mat-select>
          <mat-error *ngIf="form.get('requestType')?.hasError('required')">
            Request type is required
          </mat-error>
        </mat-form-field>

        <!-- Remarks (optional) -->
        <mat-form-field appearance="outline" class="full">
          <mat-label>Remarks</mat-label>
          <textarea
            matInput
            formControlName="remarks"
            rows="3"
            placeholder="Additional notes, description, or reason for request"
          ></textarea>
        </mat-form-field>

        <div class="form-actions">
          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="form.invalid || submitting"
            class="submit-btn">
            <mat-progress-spinner
              *ngIf="submitting"
              diameter="20"
              mode="indeterminate"
              color="accent"
              class="spinner">
            </mat-progress-spinner>
            <span *ngIf="!submitting">Submit Request</span>
            <span *ngIf="submitting">Submitting...</span>
          </button>

          <button
            mat-stroked-button
            type="button"
            (click)="cancel()"
            [disabled]="submitting"
            class="cancel-btn">
            Cancel
          </button>
        </div>

        <!-- Request Type Help -->
        <div class="help-section">
          <h4>Request Type Descriptions:</h4>
          <ul>
            <li><strong>FAULT</strong> - Device is faulty and needs attention</li>
            <li><strong>REPAIR</strong> - Device needs repair work</li>
            <li><strong>REPLACE</strong> - Device needs to be replaced with a new one</li>
            <li><strong>SERIAL_UPDATE</strong> - Update device serial number</li>
            <li><strong>MOVE</strong> - Relocate device to different location</li>
          </ul>
        </div>
      </form>
    </mat-card>
  `, styles: ["/* angular:styles/component:scss;29925102045bd25627fbb94beb4a3fffc30d104794fb73947e040dd8bd6b32fe;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/maintenance/maintenance-request/maintenance-request.component.ts */\n.maintenance-card {\n  max-width: 600px;\n  margin: 40px auto;\n  padding: 28px;\n  border-radius: 12px;\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);\n  background: #fafafa;\n}\nh2 {\n  text-align: center;\n  color: #1565c0;\n  font-weight: 600;\n  margin-bottom: 28px;\n  letter-spacing: 0.5px;\n}\n.full {\n  width: 100%;\n  margin-bottom: 18px;\n}\n.serial-with-button {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n}\n.serial-field {\n  flex: 1;\n}\n.options-select {\n  text-color: #6610f2;\n  font-weight: 500;\n  background-color: #f8f9fa !important;\n}\n.get-details-btn {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  height: 56px;\n  margin-top: 0.25em;\n  white-space: nowrap;\n  min-width: 140px;\n  font-weight: 500;\n  background:\n    linear-gradient(\n      135deg,\n      #ff9800,\n      #f57c00);\n  color: white;\n}\n.get-details-btn:hover:not(:disabled) {\n  background:\n    linear-gradient(\n      135deg,\n      #f57c00,\n      #ef6c00);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(245, 124, 0, 0.3);\n}\n.get-details-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.spinner-small {\n  margin-right: 4px;\n}\nmat-form-field {\n  font-size: 15px;\n}\n.form-actions {\n  display: flex;\n  gap: 12px;\n  margin-top: 20px;\n  margin-bottom: 30px;\n}\n.submit-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  flex: 1;\n  font-weight: 600;\n  height: 48px;\n  border-radius: 8px;\n  letter-spacing: 0.5px;\n  transition: all 0.3s ease;\n}\n.cancel-btn {\n  flex: 0.5;\n  height: 48px;\n  border-radius: 8px;\n  font-weight: 500;\n}\n.submit-btn:hover:not(:disabled) {\n  background-color: #1565c0;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(21, 101, 192, 0.3);\n}\n.submit-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.cancel-btn:hover:not(:disabled) {\n  background-color: #f5f5f5;\n}\n.spinner {\n  margin-right: 8px;\n}\n.help-section {\n  background: #e3f2fd;\n  padding: 16px;\n  border-radius: 8px;\n  border-left: 4px solid #2196f3;\n  margin-top: 20px;\n}\n.help-section h4 {\n  margin: 0 0 12px 0;\n  color: #1565c0;\n  font-weight: 600;\n}\n.help-section ul {\n  margin: 0;\n  padding-left: 20px;\n}\n.help-section li {\n  margin-bottom: 8px;\n  line-height: 1.4;\n}\n.help-section strong {\n  color: #1976d2;\n}\n::ng-deep .mat-form-field-appearance-outline .mat-form-field-outline {\n  background-color: #ffffff !important;\n  border-radius: 4px !important;\n}\n::ng-deep .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {\n  background-color: #f5f5f5 !important;\n}\n::ng-deep .mat-select-panel {\n  background: #ffffff !important;\n  border: 2px solid #e0e0e0 !important;\n  border-radius: 8px !important;\n}\n::ng-deep .mat-option {\n  background: #ffffff !important;\n  color: #333333 !important;\n  font-weight: 500;\n}\n::ng-deep .mat-option:hover:not(.mat-option-disabled) {\n  background: #f0f8ff !important;\n  color: #1976d2 !important;\n}\n::ng-deep .mat-option.mat-selected:not(.mat-option-multiple) {\n  background: #e3f2fd !important;\n  color: #1976d2 !important;\n  font-weight: 600;\n}\n::ng-deep .mat-option.mat-active {\n  background: #e3f2fd !important;\n  color: #1976d2 !important;\n}\n::ng-deep .mat-form-field-appearance-outline .mat-form-field-outline-thick {\n  color: #e0e0e0 !important;\n}\n::ng-deep .mat-input-element {\n  background-color: transparent !important;\n}\n::ng-deep textarea.mat-input-element {\n  background-color: transparent !important;\n}\n::ng-deep .success-snackbar {\n  background: #4caf50 !important;\n  color: white !important;\n}\n::ng-deep .error-snackbar {\n  background: #f44336 !important;\n  color: white !important;\n}\n::ng-deep .warning-snackbar {\n  background: #ff9800 !important;\n  color: white !important;\n}\n::ng-deep .info-snackbar {\n  background: #2196f3 !important;\n  color: white !important;\n}\n@media (max-width: 768px) {\n  .maintenance-card {\n    margin: 20px;\n    padding: 20px;\n  }\n  .serial-with-button {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .get-details-btn {\n    width: 100%;\n    height: 48px;\n    margin-top: 0;\n  }\n  .form-actions {\n    flex-direction: column;\n  }\n  .cancel-btn {\n    flex: 1;\n  }\n}\n/*# sourceMappingURL=maintenance-request.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: MatSnackBar }, { type: Router }, { type: HttpClient }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MaintenanceRequestComponent, { className: "MaintenanceRequestComponent", filePath: "src/app/components/maintenance/maintenance-request/maintenance-request.component.ts", lineNumber: 426 });
})();
export {
  MaintenanceRequestComponent
};
//# sourceMappingURL=chunk-K42T4JJ3.js.map
