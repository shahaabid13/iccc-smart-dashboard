import {
  LocationsService
} from "./chunk-JILHC6PV.js";
import {
  DevicesService
} from "./chunk-QAOD4PKB.js";
import "./chunk-IQHQ2JGN.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-NUGY3VFH.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-2FLHCNEB.js";
import {
  MatOption,
  MatSelect,
  MatSelectModule
} from "./chunk-GP53F2Q2.js";
import "./chunk-AREEN4Y3.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-FCQFOFUY.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-L77IW56B.js";
import {
  MatFormFieldModule
} from "./chunk-WHDPFR7X.js";
import "./chunk-QWWSWOTY.js";
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel
} from "./chunk-MSRYKTCV.js";
import "./chunk-54RZU52J.js";
import {
  MatCard,
  MatCardModule
} from "./chunk-A5CP52TD.js";
import {
  MatButton,
  MatButtonModule
} from "./chunk-NNMEMFZC.js";
import {
  Router
} from "./chunk-YWEFX6MF.js";
import "./chunk-W7WDMGEW.js";
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
} from "./chunk-LZCG3VZ3.js";
import {
  CommonModule,
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-6LIGNQX5.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
} from "./chunk-OXNL7LB6.js";
import {
  __async
} from "./chunk-TXDUYLVM.js";

// src/app/components/maintenance/maintenance-request/maintenance-request.component.ts
function MaintenanceRequestComponent_mat_error_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Device serial number is required ");
    \u0275\u0275elementEnd();
  }
}
function MaintenanceRequestComponent_mat_progress_spinner_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 26);
  }
}
function MaintenanceRequestComponent_mat_icon_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "search");
    \u0275\u0275elementEnd();
  }
}
function MaintenanceRequestComponent_ng_container_17_mat_option_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const loc_r3 = ctx.$implicit;
    \u0275\u0275property("value", loc_r3.name || loc_r3.locationName || loc_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(loc_r3.name || loc_r3.locationName || loc_r3);
  }
}
function MaintenanceRequestComponent_ng_container_17_mat_form_field_9_mat_option_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r4 = ctx.$implicit;
    \u0275\u0275property("value", r_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r4);
  }
}
function MaintenanceRequestComponent_ng_container_17_mat_form_field_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 13)(1, "mat-label");
    \u0275\u0275text(2, "Approach Road");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-select", 30);
    \u0275\u0275template(4, MaintenanceRequestComponent_ng_container_17_mat_form_field_9_mat_option_4_Template, 2, 2, "mat-option", 15);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.approachRoads);
  }
}
function MaintenanceRequestComponent_ng_container_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 27)(2, "h4", 12);
    \u0275\u0275text(3, "Device Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-form-field", 13)(5, "mat-label");
    \u0275\u0275text(6, "Location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-select", 28);
    \u0275\u0275listener("selectionChange", function MaintenanceRequestComponent_ng_container_17_Template_mat_select_selectionChange_7_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onLocationChange($event.value));
    })("opened", function MaintenanceRequestComponent_ng_container_17_Template_mat_select_opened_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.locations.length || ctx_r1.loadLocations());
    });
    \u0275\u0275template(8, MaintenanceRequestComponent_ng_container_17_mat_option_8_Template, 2, 2, "mat-option", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, MaintenanceRequestComponent_ng_container_17_mat_form_field_9_Template, 5, 1, "mat-form-field", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("ngForOf", ctx_r1.locations);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.approachRoads && ctx_r1.approachRoads.length > 0);
  }
}
function MaintenanceRequestComponent_div_18_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "mat-form-field", 13)(2, "mat-label");
    \u0275\u0275text(3, "Location");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-form-field", 13)(6, "mat-label");
    \u0275\u0275text(7, "Approach Road");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", (tmp_2_0 = ctx_r1.form.get("locationName")) == null ? null : tmp_2_0.value);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", (tmp_3_0 = ctx_r1.form.get("approachRoadName")) == null ? null : tmp_3_0.value);
  }
}
function MaintenanceRequestComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "h4", 12);
    \u0275\u0275text(2, "Device Details");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, MaintenanceRequestComponent_div_18_ng_container_3_Template, 9, 2, "ng-container", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ((tmp_1_0 = ctx_r1.form.get("requestType")) == null ? null : tmp_1_0.value) !== "MOVE");
  }
}
function MaintenanceRequestComponent_mat_option_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rt_r5 = ctx.$implicit;
    \u0275\u0275property("value", rt_r5.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", rt_r5.label, " ");
  }
}
function MaintenanceRequestComponent_mat_form_field_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 13)(1, "mat-label");
    \u0275\u0275text(2, "New Serial Number");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 31);
    \u0275\u0275elementEnd();
  }
}
function MaintenanceRequestComponent_mat_form_field_28_mat_option_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r6 = ctx.$implicit;
    \u0275\u0275property("value", s_r6);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r6);
  }
}
function MaintenanceRequestComponent_mat_form_field_28_mat_hint_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-hint");
    \u0275\u0275text(1, "No available serials found");
    \u0275\u0275elementEnd();
  }
}
function MaintenanceRequestComponent_mat_form_field_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 13)(1, "mat-label");
    \u0275\u0275text(2, "New Serial Number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-select", 32);
    \u0275\u0275template(4, MaintenanceRequestComponent_mat_form_field_28_mat_option_4_Template, 2, 2, "mat-option", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, MaintenanceRequestComponent_mat_form_field_28_mat_hint_5_Template, 2, 0, "mat-hint", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.availableSerials);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.availableSerials.length === 0);
  }
}
function MaintenanceRequestComponent_mat_progress_spinner_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 33);
  }
}
function MaintenanceRequestComponent_span_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Submit Request");
    \u0275\u0275elementEnd();
  }
}
function MaintenanceRequestComponent_span_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Submitting...");
    \u0275\u0275elementEnd();
  }
}
function MaintenanceRequestComponent_div_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "mat-icon", 35);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", "email-status-" + ctx_r1.emailStatus);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.emailStatus === "sending" ? "send" : ctx_r1.emailStatus === "sent" ? "mark_email_read" : ctx_r1.emailStatus === "failed" ? "email" : "email", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.emailStatusMessage);
  }
}
var EMAILJS_SERVICE_ID = "service_654leop";
var EMAILJS_TEMPLATE_ID = "template_ybf7q51";
var EMAILJS_PUBLIC_KEY = "s5Rl1UDf_tba2Zita";
var NOTIFICATION_EMAIL = "shahaabid902@gmail.com";
var MaintenanceRequestComponent = class _MaintenanceRequestComponent {
  fb;
  snackBar;
  router;
  http;
  locationsService;
  devicesService;
  form;
  submitting = false;
  fetchingDetails = false;
  detailsLoaded = false;
  // deviceLastSeen removed per UX: not shown in the first column
  // Meta fields shown on the right
  submittedBy = "";
  submittedAt = "";
  requestDate = "";
  locations = [];
  approachRoads = [];
  availableSerials = [];
  // Backend status code mapping — put known exact status codes here.
  // Update these if your backend uses different codes.
  REPAIRED_STATUSES = /* @__PURE__ */ new Set(["REPAIRED", "REPAIR_DONE", "REPAIR_COMPLETE", "REPAIRED_SPARE", "REPAIRED_NOT_INSTALLED"]);
  INSTALLED_STATUSES = /* @__PURE__ */ new Set(["INSTALLED", "ACTIVE", "DEPLOYED"]);
  /** Controls the in-form email status banner */
  emailStatus = "";
  // 'sending' | 'sent' | 'failed' | ''
  emailStatusMessage = "";
  baseUrl = "/api/maintenance/requests";
  deviceBaseUrl = "/api/devices";
  requestTypes = [
    { value: "FAULT", label: "Fault" },
    { value: "REPAIR", label: "Repair" },
    { value: "REPLACE", label: "Replace" },
    { value: "SERIAL_UPDATE", label: "Serial Update" },
    { value: "MOVE", label: "Move" }
  ];
  constructor(fb, snackBar, router, http, locationsService, devicesService) {
    this.fb = fb;
    this.snackBar = snackBar;
    this.router = router;
    this.http = http;
    this.locationsService = locationsService;
    this.devicesService = devicesService;
    this.form = this.fb.group({
      deviceSerial: ["", Validators.required],
      newSerial: [""],
      locationName: ["", Validators.required],
      approachRoadName: ["", Validators.required],
      requestType: ["", Validators.required],
      remarks: [""]
    });
    this.form.get("newSerial")?.disable({ emitEvent: false });
    this.form.get("requestType")?.valueChanges.subscribe((requestType) => {
      if (requestType === "SERIAL_UPDATE" || requestType === "REPLACE") {
        this.form.get("newSerial")?.setValidators([Validators.required]);
        this.form.get("newSerial")?.enable({ emitEvent: false });
        this.snackBar.open("Please provide a new serial number for this request type", "OK", { duration: 3e3, panelClass: ["info-snackbar"] });
      } else {
        this.form.get("newSerial")?.clearValidators();
        this.form.get("newSerial")?.setValue("");
        this.form.get("newSerial")?.disable({ emitEvent: false });
      }
      this.form.get("newSerial")?.updateValueAndValidity({ emitEvent: false });
      if (requestType === "MOVE") {
        this.loadLocations();
        this.form.get("locationName")?.enable({ emitEvent: false });
        this.form.get("approachRoadName")?.enable({ emitEvent: false });
      } else {
        if (this.detailsLoaded) {
          this.form.get("locationName")?.disable({ emitEvent: false });
          this.form.get("approachRoadName")?.disable({ emitEvent: false });
        }
      }
      if (requestType === "REPLACE") {
        this.loadAvailableSerials();
      }
    });
  }
  ngOnInit() {
    this.loadEmailJsScript();
  }
  loadLocations() {
    this.locationsService.getAll().subscribe({
      next: (list) => {
        this.locations = Array.isArray(list) ? list : [];
      },
      error: (err) => {
        console.error("Failed to load locations:", err);
        this.locations = [];
      }
    });
  }
  loadAvailableSerials() {
    this.devicesService.getAllDevices().subscribe({
      next: (devices) => {
        const current = this.form.get("deviceSerial")?.value;
        this.availableSerials = (devices || []).filter((d) => {
          const raw = (d.status || "").toString();
          const code = raw.toUpperCase().trim();
          const isRepairedExact = this.REPAIRED_STATUSES.has(code);
          const isInstalledExact = this.INSTALLED_STATUSES.has(code);
          if (isRepairedExact || isInstalledExact) {
            return isRepairedExact && !isInstalledExact;
          }
          const lower = raw.toLowerCase();
          const isRepaired = lower.includes("repair") || lower.includes("repaired");
          const isInstalled = lower.includes("install") || lower.includes("installed") || lower.includes("active") || lower.includes("deployed");
          return isRepaired && !isInstalled;
        }).map((d) => (d.serialNumber || d.name || "").toString()).filter((s) => s && s !== current);
      },
      error: (err) => {
        console.error("Failed to load available serials:", err);
        this.availableSerials = [];
      }
    });
  }
  onLocationChange(locationName) {
    this.devicesService.getAllDevices().subscribe({
      next: (devices) => {
        const roads = (devices || []).filter((d) => (d.locationName || "").toString() === locationName).map((d) => (d.approachRoad || "").toString().trim()).filter((r) => !!r);
        this.approachRoads = Array.from(new Set(roads));
        this.form.get("approachRoadName")?.enable({ emitEvent: false });
        this.form.get("approachRoadName")?.setValue("");
        try {
          const payload = { deviceSerial: this.form.get("deviceSerial")?.value || null, locationName };
          window.dispatchEvent(new CustomEvent("device-location-changed", { detail: payload }));
        } catch (e) {
        }
      },
      error: (err) => {
        console.error("Failed to derive approach roads:", err);
        this.approachRoads = [];
      }
    });
  }
  // ─── EmailJS SDK loader ───────────────────────────────────────────────────
  loadEmailJsScript() {
    if (document.getElementById("emailjs-sdk"))
      return;
    const script = document.createElement("script");
    script.id = "emailjs-sdk";
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.async = true;
    script.onload = () => {
      window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      console.log("[EmailJS] SDK loaded & initialised.");
    };
    document.head.appendChild(script);
  }
  // ─── Send notification email via EmailJS ──────────────────────────────────
  /**
   * Sends a notification email to NOTIFICATION_EMAIL after a successful
   * maintenance request submission.
   *
   * Template variables used (configure these in your EmailJS template):
   *   {{to_email}}      – recipient address
   *   {{device_serial}} – device serial number
   *   {{location_name}} – installation location
   *   {{approach_road}} – approach road
   *   {{request_type}}  – FAULT / REPAIR / REPLACE / SERIAL_UPDATE / MOVE
   *   {{new_serial}}    – new serial (if applicable, else 'N/A')
   *   {{remarks}}       – additional notes (if any, else 'None')
   *   {{submitted_by}}  – user name / 'System'
   *   {{submitted_at}}  – human-readable timestamp
   */
  sendMaintenanceNotificationEmail(payload) {
    return __async(this, null, function* () {
      const emailjs = window.emailjs;
      if (!emailjs) {
        console.warn("[EmailJS] SDK not ready yet \u2014 skipping email.");
        return;
      }
      const submittedBy = localStorage.getItem("username") || localStorage.getItem("name") || "Admin";
      const submittedAt = (/* @__PURE__ */ new Date()).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short"
      });
      const templateParams = {
        to_email: NOTIFICATION_EMAIL,
        device_serial: payload.deviceSerial,
        location_name: payload.locationName,
        approach_road: payload.approachRoadName,
        request_type: payload.requestType,
        new_serial: payload.newSerial || "N/A",
        remarks: payload.remarks || "None",
        submitted_by: submittedBy,
        submitted_at: submittedAt
      };
      this.emailStatus = "sending";
      this.emailStatusMessage = `Sending notification to ${NOTIFICATION_EMAIL}\u2026`;
      try {
        yield emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        this.emailStatus = "sent";
        this.emailStatusMessage = `\u2713 Notification sent to ${NOTIFICATION_EMAIL}`;
        console.log("[EmailJS] Notification email sent successfully.");
        setTimeout(() => {
          this.emailStatus = "";
        }, 6e3);
      } catch (err) {
        console.error("[EmailJS] Failed to send notification email:", err);
        this.emailStatus = "failed";
        this.emailStatusMessage = `Notification email could not be delivered \u2014 please inform ${NOTIFICATION_EMAIL} manually.`;
      }
    });
  }
  // ─── Get device details ───────────────────────────────────────────────────
  getDeviceDetails() {
    const deviceSerial = this.form.get("deviceSerial")?.value?.trim();
    if (!deviceSerial) {
      this.snackBar.open("\u26A0\uFE0F Please enter a device serial number first", "Close", { duration: 3e3, panelClass: ["warning-snackbar"] });
      return;
    }
    this.fetchingDetails = true;
    const token = localStorage.getItem("token");
    if (!token) {
      this.snackBar.open("\u274C You must log in to fetch device details", "Close", { duration: 3e3, panelClass: ["error-snackbar"] });
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
          });
          this.detailsLoaded = true;
          this.form.get("locationName")?.disable({ emitEvent: false });
          this.form.get("approachRoadName")?.disable({ emitEvent: false });
          this.submittedBy = localStorage.getItem("username") || localStorage.getItem("name") || "Admin";
          this.submittedAt = (/* @__PURE__ */ new Date()).toLocaleString();
          this.requestDate = (/* @__PURE__ */ new Date()).toLocaleDateString();
          this.snackBar.open("\u2705 Device details loaded successfully!", "Close", { duration: 3e3, panelClass: ["success-snackbar"] });
        } else {
          this.snackBar.open("\u26A0\uFE0F Device found but no location data available", "Close", { duration: 3e3, panelClass: ["warning-snackbar"] });
        }
      },
      error: (err) => {
        this.fetchingDetails = false;
        console.error("Error fetching device details:", err);
        let msg = "\u274C Failed to fetch device details. Please check the serial number.";
        if (err.status === 404)
          msg = "\u274C Device not found. Please check the serial number.";
        else if (err.status === 401)
          msg = "\u274C Authentication failed. Please log in again.";
        else if (err.status === 403)
          msg = "\u274C You do not have permission to access device details.";
        else if (err.status === 500)
          msg = "\u274C Server error while fetching device details.";
        else if (err.error?.message)
          msg = `\u274C ${err.error.message}`;
        this.snackBar.open(msg, "Close", { duration: 5e3, panelClass: ["error-snackbar"] });
      }
    });
  }
  onSerialBlur() {
    const deviceSerial = this.form.get("deviceSerial")?.value?.trim();
    const locationName = this.form.get("locationName")?.value;
    const approachRoad = this.form.get("approachRoadName")?.value;
    if (deviceSerial && (!locationName || !approachRoad)) {
      setTimeout(() => this.getDeviceDetails(), 500);
    }
  }
  // ─── Submit ───────────────────────────────────────────────────────────────
  submit() {
    if (this.form.invalid) {
      this.markFormGroupTouched();
      this.snackBar.open("\u26A0\uFE0F Please fill all required fields correctly.", "Close", { duration: 3e3, panelClass: ["warning-snackbar"] });
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      this.snackBar.open("\u274C You must log in before submitting a request.", "Close", { duration: 3e3, panelClass: ["error-snackbar"] });
      return;
    }
    const raw = this.form.getRawValue();
    const deviceSerial = (raw.deviceSerial || "").toString().trim();
    const newSerial = raw.newSerial ? raw.newSerial.toString().trim() : null;
    const requestType = raw.requestType;
    const locationName = (raw.locationName || this.form.get("locationName")?.value || "").toString().trim();
    const approachRoadName = (raw.approachRoadName || this.form.get("approachRoadName")?.value || "").toString().trim();
    const remarks = raw.remarks ? raw.remarks.toString().trim() : null;
    const requestPayload = {
      deviceSerial,
      newSerial: newSerial || null,
      requestType,
      remarks
    };
    if (requestType === "MOVE" && locationName)
      requestPayload.newLocationName = locationName;
    if (requestType === "MOVE" && approachRoadName)
      requestPayload.newApproachRoadName = approachRoadName;
    const ref = (raw.referenceId || "").toString().trim();
    if (ref)
      requestPayload.referenceId = ref;
    this.submitting = true;
    const headers = new HttpHeaders({ "Authorization": `Bearer ${token}`, "Content-Type": "application/json" });
    console.log("Submitting maintenance request:", requestPayload);
    this.http.post(this.baseUrl, requestPayload, { headers }).subscribe({
      next: (response) => __async(this, null, function* () {
        this.snackBar.open("\u2705 Maintenance request submitted successfully!", "Close", { duration: 4e3, panelClass: ["success-snackbar"] });
        this.submitting = false;
        yield this.sendMaintenanceNotificationEmail({ deviceSerial: requestPayload.deviceSerial, locationName: requestPayload.locationName, approachRoadName: requestPayload.approachRoadName, requestType: requestPayload.requestType, newSerial: requestPayload.newSerial, remarks: requestPayload.remarks });
        this.form.reset();
        this.detailsLoaded = false;
        this.submittedAt = "";
        this.submittedBy = "";
        this.requestDate = "";
        this.form.get("newSerial")?.disable({ emitEvent: false });
        this.form.get("locationName")?.enable({ emitEvent: false });
        this.form.get("approachRoadName")?.enable({ emitEvent: false });
        this.router.navigate(["/all-requests"]);
      }),
      error: (err) => {
        console.error("Error submitting request:", err);
        let msg = "\u274C Failed to submit request. Please try again.";
        if (err.status === 400 && err.error?.message)
          msg = `\u274C ${err.error.message}`;
        else if (err.status === 400)
          msg = "\u274C Invalid request data. Please check your inputs.";
        else if (err.status === 401)
          msg = "\u274C Authentication failed. Please log in again.";
        else if (err.status === 403)
          msg = "\u274C You do not have permission to submit requests.";
        else if (err.status === 404)
          msg = "\u274C Device not found. Please check the Device Serial.";
        else if (err.status === 409)
          msg = "\u274C A request for this device is already pending.";
        else if (err.error?.message)
          msg = `\u274C ${err.error.message}`;
        this.snackBar.open(msg, "Close", { duration: 5e3, panelClass: ["error-snackbar"] });
        this.submitting = false;
      }
    });
  }
  // ─── Helpers ─────────────────────────────────────────────────────────────
  cancel() {
    if (this.form.dirty) {
      const confirm = window.confirm("You have unsaved changes. Are you sure you want to cancel?");
      if (!confirm)
        return;
    }
    this.router.navigate(["/dashboard"]);
  }
  markFormGroupTouched() {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.markAsTouched();
    });
  }
  isNewSerialRecommended() {
    const t = this.form.get("requestType")?.value;
    return t === "SERIAL_UPDATE" || t === "REPLACE";
  }
  getRequestTypeDescription(type) {
    const map = {
      "FAULT": "Device is faulty and needs attention",
      "REPAIR": "Device needs repair work",
      "REPLACE": "Device needs to be replaced with a new one",
      "SERIAL_UPDATE": "Update device serial number",
      "MOVE": "Relocate device to different location"
    };
    return map[type] || "";
  }
  static \u0275fac = function MaintenanceRequestComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MaintenanceRequestComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(HttpClient), \u0275\u0275directiveInject(LocationsService), \u0275\u0275directiveInject(DevicesService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MaintenanceRequestComponent, selectors: [["app-maintenance-request"]], decls: 54, vars: 20, consts: [[1, "maintenance-card"], [3, "ngSubmit", "formGroup"], [1, "two-column"], [1, "left-column"], [1, "serial-with-button"], ["appearance", "outline", 1, "serial-field"], ["matInput", "", "formControlName", "deviceSerial", "required", "", "placeholder", "Enter device serial", 3, "blur"], [4, "ngIf"], ["mat-raised-button", "", "color", "accent", "type", "button", 1, "get-details-btn", 3, "click", "disabled"], ["diameter", "16", "mode", "indeterminate", "color", "primary", "class", "spinner-small", 4, "ngIf"], ["class", "device-details card-soft", 4, "ngIf"], [1, "right-column", "card-soft"], [1, "muted"], ["appearance", "outline", 1, "full"], ["formControlName", "requestType", "required", ""], [3, "value", 4, "ngFor", "ngForOf"], ["appearance", "outline", "class", "full", 4, "ngIf"], [1, "meta-grid"], ["appearance", "outline", 1, "meta-field"], ["matInput", "", "disabled", "", 3, "value"], ["matInput", "", "formControlName", "remarks", "rows", "4", "placeholder", "Additional notes"], [1, "form-actions"], ["mat-raised-button", "", "color", "primary", "type", "submit", 1, "submit-btn", 3, "disabled"], ["diameter", "20", "mode", "indeterminate", "color", "accent", "class", "spinner", 4, "ngIf"], ["mat-stroked-button", "", "type", "button", 1, "cancel-btn", 3, "click", "disabled"], ["class", "email-status-banner", 3, "ngClass", 4, "ngIf"], ["diameter", "16", "mode", "indeterminate", "color", "primary", 1, "spinner-small"], [1, "device-details", "card-soft"], ["formControlName", "locationName", 3, "selectionChange", "opened"], [3, "value"], ["formControlName", "approachRoadName"], ["matInput", "", "formControlName", "newSerial", "placeholder", "Enter new serial"], ["formControlName", "newSerial"], ["diameter", "20", "mode", "indeterminate", "color", "accent", 1, "spinner"], [1, "email-status-banner", 3, "ngClass"], [1, "email-status-icon"]], template: function MaintenanceRequestComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-card", 0)(1, "h2");
      \u0275\u0275text(2, "Create Maintenance Request");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "form", 1);
      \u0275\u0275listener("ngSubmit", function MaintenanceRequestComponent_Template_form_ngSubmit_3_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementStart(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "mat-form-field", 5)(8, "mat-label");
      \u0275\u0275text(9, "Device Serial Number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 6);
      \u0275\u0275listener("blur", function MaintenanceRequestComponent_Template_input_blur_10_listener() {
        return ctx.onSerialBlur();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(11, MaintenanceRequestComponent_mat_error_11_Template, 2, 0, "mat-error", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "button", 8);
      \u0275\u0275listener("click", function MaintenanceRequestComponent_Template_button_click_12_listener() {
        return ctx.getDeviceDetails();
      });
      \u0275\u0275template(13, MaintenanceRequestComponent_mat_progress_spinner_13_Template, 1, 0, "mat-progress-spinner", 9)(14, MaintenanceRequestComponent_mat_icon_14_Template, 2, 0, "mat-icon", 7);
      \u0275\u0275elementStart(15, "span");
      \u0275\u0275text(16);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(17, MaintenanceRequestComponent_ng_container_17_Template, 10, 2, "ng-container", 7)(18, MaintenanceRequestComponent_div_18_Template, 4, 1, "div", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 11)(20, "h4", 12);
      \u0275\u0275text(21, "Request Details");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "mat-form-field", 13)(23, "mat-label");
      \u0275\u0275text(24, "Request Type");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "mat-select", 14);
      \u0275\u0275template(26, MaintenanceRequestComponent_mat_option_26_Template, 2, 2, "mat-option", 15);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(27, MaintenanceRequestComponent_mat_form_field_27_Template, 4, 0, "mat-form-field", 16)(28, MaintenanceRequestComponent_mat_form_field_28_Template, 6, 2, "mat-form-field", 16);
      \u0275\u0275elementStart(29, "div", 17)(30, "mat-form-field", 18)(31, "mat-label");
      \u0275\u0275text(32, "Submitted By");
      \u0275\u0275elementEnd();
      \u0275\u0275element(33, "input", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "mat-form-field", 18)(35, "mat-label");
      \u0275\u0275text(36, "Submitted At");
      \u0275\u0275elementEnd();
      \u0275\u0275element(37, "input", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "mat-form-field", 18)(39, "mat-label");
      \u0275\u0275text(40, "Request Date");
      \u0275\u0275elementEnd();
      \u0275\u0275element(41, "input", 19);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(42, "mat-form-field", 13)(43, "mat-label");
      \u0275\u0275text(44, "Remarks");
      \u0275\u0275elementEnd();
      \u0275\u0275element(45, "textarea", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "div", 21)(47, "button", 22);
      \u0275\u0275template(48, MaintenanceRequestComponent_mat_progress_spinner_48_Template, 1, 0, "mat-progress-spinner", 23)(49, MaintenanceRequestComponent_span_49_Template, 2, 0, "span", 7)(50, MaintenanceRequestComponent_span_50_Template, 2, 0, "span", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "button", 24);
      \u0275\u0275listener("click", function MaintenanceRequestComponent_Template_button_click_51_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(52, "Cancel");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(53, MaintenanceRequestComponent_div_53_Template, 5, 3, "div", 25);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      let tmp_6_0;
      let tmp_9_0;
      let tmp_10_0;
      \u0275\u0275advance(3);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(8);
      \u0275\u0275property("ngIf", (tmp_1_0 = ctx.form.get("deviceSerial")) == null ? null : tmp_1_0.hasError("required"));
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !((tmp_2_0 = ctx.form.get("deviceSerial")) == null ? null : tmp_2_0.value) || ctx.fetchingDetails);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.fetchingDetails);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.fetchingDetails);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.fetchingDetails ? "Fetching..." : "Get Details");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_6_0 = ctx.form.get("requestType")) == null ? null : tmp_6_0.value) === "MOVE");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.detailsLoaded);
      \u0275\u0275advance(8);
      \u0275\u0275property("ngForOf", ctx.requestTypes);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isNewSerialRecommended() && ((tmp_9_0 = ctx.form.get("requestType")) == null ? null : tmp_9_0.value) !== "REPLACE");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_10_0 = ctx.form.get("requestType")) == null ? null : tmp_10_0.value) === "REPLACE");
      \u0275\u0275advance(5);
      \u0275\u0275property("value", ctx.submittedBy);
      \u0275\u0275advance(4);
      \u0275\u0275property("value", ctx.submittedAt);
      \u0275\u0275advance(4);
      \u0275\u0275property("value", ctx.requestDate);
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
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.emailStatus);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgForOf,
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
    MatHint,
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
  ], styles: ['@charset "UTF-8";\n\n\n\n.maintenance-card[_ngcontent-%COMP%] {\n  max-width: 980px;\n  margin: 32px auto;\n  padding: 26px;\n  border-radius: 12px;\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);\n  background: #fafafa;\n}\nh2[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #1565c0;\n  font-weight: 600;\n  margin-bottom: 28px;\n  letter-spacing: 0.5px;\n}\n.full[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 14px;\n}\n.two-column[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 18px;\n  align-items: flex-start;\n}\n.left-column[_ngcontent-%COMP%] {\n  flex: 0.65;\n}\n.right-column[_ngcontent-%COMP%] {\n  flex: 0.35;\n}\n.card-soft[_ngcontent-%COMP%] {\n  background: #fff;\n  padding: 14px;\n  border-radius: 8px;\n  box-shadow: 0 2px 6px rgba(16, 24, 40, 0.04);\n}\n.muted[_ngcontent-%COMP%] {\n  margin: 0 0 10px 0;\n  color: #4b5563;\n  font-weight: 600;\n}\n.serial-with-button[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n}\n.serial-field[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.options-select[_ngcontent-%COMP%] {\n  font-weight: 500;\n  background-color: #f8f9fa !important;\n}\n.get-details-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  height: 56px;\n  margin-top: 0.25em;\n  white-space: nowrap;\n  min-width: 140px;\n  font-weight: 500;\n  background:\n    linear-gradient(\n      135deg,\n      #ff9800,\n      #f57c00);\n  color: white;\n}\n.get-details-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background:\n    linear-gradient(\n      135deg,\n      #f57c00,\n      #ef6c00);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(245, 124, 0, 0.3);\n}\n.get-details-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.spinner-small[_ngcontent-%COMP%] {\n  margin-right: 4px;\n}\nmat-form-field[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.email-status-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 500;\n  margin-bottom: 16px;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.email-status-sending[_ngcontent-%COMP%] {\n  background: #fff8e1;\n  color: #f57f17;\n  border: 1px solid #ffe082;\n}\n.email-status-sent[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n  border: 1px solid #a5d6a7;\n}\n.email-status-failed[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #e65100;\n  border: 1px solid #ffcc80;\n}\n.email-status-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-top: 20px;\n  margin-bottom: 30px;\n}\n.submit-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  flex: 1;\n  font-weight: 600;\n  height: 48px;\n  border-radius: 8px;\n  letter-spacing: 0.5px;\n  transition: all 0.3s ease;\n}\n.cancel-btn[_ngcontent-%COMP%] {\n  flex: 0.5;\n  height: 48px;\n  border-radius: 8px;\n  font-weight: 500;\n}\n.submit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #1565c0;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(21, 101, 192, 0.3);\n}\n.submit-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.cancel-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #f5f5f5;\n}\n.spinner[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n.help-section[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  padding: 16px;\n  border-radius: 8px;\n  border-left: 4px solid #2196f3;\n  margin-top: 20px;\n}\n.meta-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  gap: 10px;\n  margin-bottom: 12px;\n}\n@media (min-width: 720px) {\n  .meta-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n.meta-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.help-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  color: #1565c0;\n  font-weight: 600;\n}\n.help-section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: 20px;\n}\n.help-section[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n  line-height: 1.4;\n}\n.help-section[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #1976d2;\n}\n  .mat-form-field-appearance-outline .mat-form-field-outline {\n  background-color: #ffffff !important;\n  border-radius: 4px !important;\n}\n  .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {\n  background-color: #f5f5f5 !important;\n}\n  .mat-select-panel {\n  background: #ffffff !important;\n  border: 2px solid #e0e0e0 !important;\n  border-radius: 8px !important;\n}\n  .mat-option {\n  background: #ffffff !important;\n  color: #333333 !important;\n  font-weight: 500;\n}\n  .mat-option:hover:not(.mat-option-disabled) {\n  background: #f0f8ff !important;\n  color: #1976d2 !important;\n}\n  .mat-option.mat-selected:not(.mat-option-multiple) {\n  background: #e3f2fd !important;\n  color: #1976d2 !important;\n  font-weight: 600;\n}\n  .mat-option.mat-active {\n  background: #e3f2fd !important;\n  color: #1976d2 !important;\n}\n  .mat-input-element {\n  background-color: transparent !important;\n}\n  textarea.mat-input-element {\n  background-color: transparent !important;\n}\n  .success-snackbar {\n  background: #4caf50 !important;\n  color: white !important;\n}\n  .error-snackbar {\n  background: #f44336 !important;\n  color: white !important;\n}\n  .warning-snackbar {\n  background: #ff9800 !important;\n  color: white !important;\n}\n  .info-snackbar {\n  background: #2196f3 !important;\n  color: white !important;\n}\n@media (max-width: 768px) {\n  .maintenance-card[_ngcontent-%COMP%] {\n    margin: 20px;\n    padding: 20px;\n  }\n  .serial-with-button[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .get-details-btn[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 48px;\n    margin-top: 0;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .cancel-btn[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n}\n/*# sourceMappingURL=maintenance-request.component.css.map */'] });
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
        <div class="two-column">
          <!-- LEFT: Serial + Device Details (details hidden until fetched) -->
          <div class="left-column">
            <div class="serial-with-button">
              <mat-form-field appearance="outline" class="serial-field">
                <mat-label>Device Serial Number</mat-label>
                <input
                  matInput
                  formControlName="deviceSerial"
                  required
                  placeholder="Enter device serial"
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
            <!-- When Move is selected we show editable selects even before device details are loaded -->
            <ng-container *ngIf="form.get('requestType')?.value === 'MOVE'">
              <div class="device-details card-soft">
                <h4 class="muted">Device Details</h4>
                <mat-form-field appearance="outline" class="full">
                  <mat-label>Location</mat-label>
                  <mat-select formControlName="locationName" (selectionChange)="onLocationChange($event.value)" (opened)="locations.length || loadLocations()">
                    <mat-option *ngFor="let loc of locations" [value]="loc.name || loc.locationName || loc">{{ loc.name || loc.locationName || loc }}</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full" *ngIf="approachRoads && approachRoads.length > 0">
                  <mat-label>Approach Road</mat-label>
                  <mat-select formControlName="approachRoadName">
                    <mat-option *ngFor="let r of approachRoads" [value]="r">{{ r }}</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
            </ng-container>

            <div *ngIf="detailsLoaded" class="device-details card-soft">
              <h4 class="muted">Device Details</h4>

              <!-- Show Location and Approach only once. For MOVE allow selection; otherwise show read-only values. -->
              <ng-container *ngIf="form.get('requestType')?.value !== 'MOVE'">
                <mat-form-field appearance="outline" class="full">
                  <mat-label>Location</mat-label>
                  <input matInput [value]="form.get('locationName')?.value" disabled />
                </mat-form-field>

                <mat-form-field appearance="outline" class="full">
                  <mat-label>Approach Road</mat-label>
                  <input matInput [value]="form.get('approachRoadName')?.value" disabled />
                </mat-form-field>
              </ng-container>
            </div>
          </div>

          <!-- RIGHT: Request details + actions -->
          <div class="right-column card-soft">
            <h4 class="muted">Request Details</h4>

            <mat-form-field appearance="outline" class="full">
              <mat-label>Request Type</mat-label>
              <mat-select formControlName="requestType" required>
                <mat-option *ngFor="let rt of requestTypes" [value]="rt.value">
                  {{ rt.label }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <!-- New serial: visible only for REPLACE or SERIAL_UPDATE -->
              <!-- New serial: input for serial-update, select for replace (fetch available serials) -->
              <mat-form-field *ngIf="isNewSerialRecommended() && form.get('requestType')?.value !== 'REPLACE'" appearance="outline" class="full">
                <mat-label>New Serial Number</mat-label>
                <input matInput formControlName="newSerial" placeholder="Enter new serial" />
              </mat-form-field>

              <mat-form-field *ngIf="form.get('requestType')?.value === 'REPLACE'" appearance="outline" class="full">
                <mat-label>New Serial Number</mat-label>
                <mat-select formControlName="newSerial">
                  <mat-option *ngFor="let s of availableSerials" [value]="s">{{ s }}</mat-option>
                </mat-select>
                <mat-hint *ngIf="availableSerials.length === 0">No available serials found</mat-hint>
              </mat-form-field>

            <!-- Non-editable meta fields -->
            <div class="meta-grid">
              <mat-form-field appearance="outline" class="meta-field">
                <mat-label>Submitted By</mat-label>
                <input matInput [value]="submittedBy" disabled />
              </mat-form-field>

              <mat-form-field appearance="outline" class="meta-field">
                <mat-label>Submitted At</mat-label>
                <input matInput [value]="submittedAt" disabled />
              </mat-form-field>

              <mat-form-field appearance="outline" class="meta-field">
                <mat-label>Request Date</mat-label>
                <input matInput [value]="requestDate" disabled />
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full">
              <mat-label>Remarks</mat-label>
              <textarea matInput formControlName="remarks" rows="4" placeholder="Additional notes"></textarea>
            </mat-form-field>

            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || submitting" class="submit-btn">
                <mat-progress-spinner *ngIf="submitting" diameter="20" mode="indeterminate" color="accent" class="spinner"></mat-progress-spinner>
                <span *ngIf="!submitting">Submit Request</span>
                <span *ngIf="submitting">Submitting...</span>
              </button>

              <button mat-stroked-button type="button" (click)="cancel()" [disabled]="submitting" class="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>

        <!-- Email status banner -->
        <div *ngIf="emailStatus" class="email-status-banner" [ngClass]="'email-status-' + emailStatus">
          <mat-icon class="email-status-icon">
            {{ emailStatus === 'sending'  ? 'send'          :
               emailStatus === 'sent'     ? 'mark_email_read' :
               emailStatus === 'failed'   ? 'email'         : 'email' }}
          </mat-icon>
          <span>{{ emailStatusMessage }}</span>
        </div>
      </form>
    </mat-card>
  `, styles: ['@charset "UTF-8";\n\n/* angular:styles/component:scss;b554370b5be38dbffbc9e884ba08b1e172dac49bac3f73b2946ff8d658e50bfe;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/maintenance/maintenance-request/maintenance-request.component.ts */\n.maintenance-card {\n  max-width: 980px;\n  margin: 32px auto;\n  padding: 26px;\n  border-radius: 12px;\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);\n  background: #fafafa;\n}\nh2 {\n  text-align: center;\n  color: #1565c0;\n  font-weight: 600;\n  margin-bottom: 28px;\n  letter-spacing: 0.5px;\n}\n.full {\n  width: 100%;\n  margin-bottom: 14px;\n}\n.two-column {\n  display: flex;\n  gap: 18px;\n  align-items: flex-start;\n}\n.left-column {\n  flex: 0.65;\n}\n.right-column {\n  flex: 0.35;\n}\n.card-soft {\n  background: #fff;\n  padding: 14px;\n  border-radius: 8px;\n  box-shadow: 0 2px 6px rgba(16, 24, 40, 0.04);\n}\n.muted {\n  margin: 0 0 10px 0;\n  color: #4b5563;\n  font-weight: 600;\n}\n.serial-with-button {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n}\n.serial-field {\n  flex: 1;\n}\n.options-select {\n  font-weight: 500;\n  background-color: #f8f9fa !important;\n}\n.get-details-btn {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  height: 56px;\n  margin-top: 0.25em;\n  white-space: nowrap;\n  min-width: 140px;\n  font-weight: 500;\n  background:\n    linear-gradient(\n      135deg,\n      #ff9800,\n      #f57c00);\n  color: white;\n}\n.get-details-btn:hover:not(:disabled) {\n  background:\n    linear-gradient(\n      135deg,\n      #f57c00,\n      #ef6c00);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(245, 124, 0, 0.3);\n}\n.get-details-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.spinner-small {\n  margin-right: 4px;\n}\nmat-form-field {\n  font-size: 15px;\n}\n.email-status-banner {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 500;\n  margin-bottom: 16px;\n  animation: fadeIn 0.3s ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.email-status-sending {\n  background: #fff8e1;\n  color: #f57f17;\n  border: 1px solid #ffe082;\n}\n.email-status-sent {\n  background: #e8f5e9;\n  color: #2e7d32;\n  border: 1px solid #a5d6a7;\n}\n.email-status-failed {\n  background: #fff3e0;\n  color: #e65100;\n  border: 1px solid #ffcc80;\n}\n.email-status-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.form-actions {\n  display: flex;\n  gap: 12px;\n  margin-top: 20px;\n  margin-bottom: 30px;\n}\n.submit-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  flex: 1;\n  font-weight: 600;\n  height: 48px;\n  border-radius: 8px;\n  letter-spacing: 0.5px;\n  transition: all 0.3s ease;\n}\n.cancel-btn {\n  flex: 0.5;\n  height: 48px;\n  border-radius: 8px;\n  font-weight: 500;\n}\n.submit-btn:hover:not(:disabled) {\n  background-color: #1565c0;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(21, 101, 192, 0.3);\n}\n.submit-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.cancel-btn:hover:not(:disabled) {\n  background-color: #f5f5f5;\n}\n.spinner {\n  margin-right: 8px;\n}\n.help-section {\n  background: #e3f2fd;\n  padding: 16px;\n  border-radius: 8px;\n  border-left: 4px solid #2196f3;\n  margin-top: 20px;\n}\n.meta-grid {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  gap: 10px;\n  margin-bottom: 12px;\n}\n@media (min-width: 720px) {\n  .meta-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n.meta-field {\n  width: 100%;\n}\n.help-section h4 {\n  margin: 0 0 12px 0;\n  color: #1565c0;\n  font-weight: 600;\n}\n.help-section ul {\n  margin: 0;\n  padding-left: 20px;\n}\n.help-section li {\n  margin-bottom: 8px;\n  line-height: 1.4;\n}\n.help-section strong {\n  color: #1976d2;\n}\n::ng-deep .mat-form-field-appearance-outline .mat-form-field-outline {\n  background-color: #ffffff !important;\n  border-radius: 4px !important;\n}\n::ng-deep .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {\n  background-color: #f5f5f5 !important;\n}\n::ng-deep .mat-select-panel {\n  background: #ffffff !important;\n  border: 2px solid #e0e0e0 !important;\n  border-radius: 8px !important;\n}\n::ng-deep .mat-option {\n  background: #ffffff !important;\n  color: #333333 !important;\n  font-weight: 500;\n}\n::ng-deep .mat-option:hover:not(.mat-option-disabled) {\n  background: #f0f8ff !important;\n  color: #1976d2 !important;\n}\n::ng-deep .mat-option.mat-selected:not(.mat-option-multiple) {\n  background: #e3f2fd !important;\n  color: #1976d2 !important;\n  font-weight: 600;\n}\n::ng-deep .mat-option.mat-active {\n  background: #e3f2fd !important;\n  color: #1976d2 !important;\n}\n::ng-deep .mat-input-element {\n  background-color: transparent !important;\n}\n::ng-deep textarea.mat-input-element {\n  background-color: transparent !important;\n}\n::ng-deep .success-snackbar {\n  background: #4caf50 !important;\n  color: white !important;\n}\n::ng-deep .error-snackbar {\n  background: #f44336 !important;\n  color: white !important;\n}\n::ng-deep .warning-snackbar {\n  background: #ff9800 !important;\n  color: white !important;\n}\n::ng-deep .info-snackbar {\n  background: #2196f3 !important;\n  color: white !important;\n}\n@media (max-width: 768px) {\n  .maintenance-card {\n    margin: 20px;\n    padding: 20px;\n  }\n  .serial-with-button {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .get-details-btn {\n    width: 100%;\n    height: 48px;\n    margin-top: 0;\n  }\n  .form-actions {\n    flex-direction: column;\n  }\n  .cancel-btn {\n    flex: 1;\n  }\n}\n/*# sourceMappingURL=maintenance-request.component.css.map */\n'] }]
  }], () => [{ type: FormBuilder }, { type: MatSnackBar }, { type: Router }, { type: HttpClient }, { type: LocationsService }, { type: DevicesService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MaintenanceRequestComponent, { className: "MaintenanceRequestComponent", filePath: "src/app/components/maintenance/maintenance-request/maintenance-request.component.ts", lineNumber: 414 });
})();
export {
  MaintenanceRequestComponent
};
//# sourceMappingURL=chunk-YXDISTLE.js.map
