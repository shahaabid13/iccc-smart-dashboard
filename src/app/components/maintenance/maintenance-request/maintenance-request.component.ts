import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { LocationsService } from '../../../services/locations.service';
import { DevicesService } from '../../../services/devices.service';
const EMAILJS_SERVICE_ID  = 'service_654leop';   
const EMAILJS_TEMPLATE_ID = 'template_ybf7q51'; 
const EMAILJS_PUBLIC_KEY  = 's5Rl1UDf_tba2Zita';  

const NOTIFICATION_EMAIL  = 'shahaabid902@gmail.com';

@Component({
  standalone: true,
  selector: 'app-maintenance-request',
  imports: [
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
  ],
  template: `
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
  `,
  styles: [`
    .maintenance-card {
      max-width: 980px;
      margin: 32px auto;
      padding: 26px;
      border-radius: 12px;
      box-shadow: 0 6px 16px rgba(0,0,0,0.15);
      background: #fafafa;
    }

    h2 {
      text-align: center;
      color: #1565c0;
      font-weight: 600;
      margin-bottom: 28px;
      letter-spacing: 0.5px;
    }

    .full {
      width: 100%;
      margin-bottom: 14px;
    }

    .two-column {
      display: flex;
      gap: 18px;
      align-items: flex-start;
    }

    .left-column { flex: 0.65; }
    .right-column { flex: 0.35; }

    .card-soft { background: #fff; padding: 14px; border-radius: 8px; box-shadow: 0 2px 6px rgba(16,24,40,0.04); }

    .muted { margin: 0 0 10px 0; color: #4b5563; font-weight: 600; }

    .serial-with-button {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    .serial-field {
      flex: 1;
    }

    .options-select {
      font-weight: 500;
      background-color: #f8f9fa !important;
    }

    .get-details-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      height: 56px;
      margin-top: 0.25em;
      white-space: nowrap;
      min-width: 140px;
      font-weight: 500;
      background: linear-gradient(135deg, #ff9800, #f57c00);
      color: white;
    }

    .get-details-btn:hover:not(:disabled) {
      background: linear-gradient(135deg, #f57c00, #ef6c00);
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(245, 124, 0, 0.3);
    }

    .get-details-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .spinner-small { margin-right: 4px; }

    mat-form-field { font-size: 15px; }

    /* ── Email notification status banner ── */
    .email-status-banner {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 16px;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .email-status-sending {
      background: #fff8e1;
      color: #f57f17;
      border: 1px solid #ffe082;
    }

    .email-status-sent {
      background: #e8f5e9;
      color: #2e7d32;
      border: 1px solid #a5d6a7;
    }

    .email-status-failed {
      background: #fff3e0;
      color: #e65100;
      border: 1px solid #ffcc80;
    }

    .email-status-icon { font-size: 18px; width: 18px; height: 18px; }

    /* ── Form actions ── */
    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 20px;
      margin-bottom: 30px;
    }

    .submit-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      flex: 1;
      font-weight: 600;
      height: 48px;
      border-radius: 8px;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
    }

    .cancel-btn {
      flex: 0.5;
      height: 48px;
      border-radius: 8px;
      font-weight: 500;
    }

    .submit-btn:hover:not(:disabled) {
      background-color: #1565c0;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(21, 101, 192, 0.3);
    }

    .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
    .cancel-btn:hover:not(:disabled) { background-color: #f5f5f5; }

    .spinner { margin-right: 8px; }

    .help-section {
      background: #e3f2fd;
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid #2196f3;
      margin-top: 20px;
    }

    .meta-grid { display: grid; grid-template-columns: repeat(1, 1fr); gap: 10px; margin-bottom: 12px; }
    @media(min-width:720px) { .meta-grid { grid-template-columns: repeat(2, 1fr); } }
    .meta-field { width: 100%; }

    .help-section h4 { margin: 0 0 12px 0; color: #1565c0; font-weight: 600; }
    .help-section ul  { margin: 0; padding-left: 20px; }
    .help-section li  { margin-bottom: 8px; line-height: 1.4; }
    .help-section strong { color: #1976d2; }

    /* ── Global overrides ── */
    ::ng-deep .mat-form-field-appearance-outline .mat-form-field-outline {
      background-color: #ffffff !important;
      border-radius: 4px !important;
    }
    ::ng-deep .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {
      background-color: #f5f5f5 !important;
    }
    ::ng-deep .mat-select-panel {
      background: #ffffff !important;
      border: 2px solid #e0e0e0 !important;
      border-radius: 8px !important;
    }
    ::ng-deep .mat-option {
      background: #ffffff !important;
      color: #333333 !important;
      font-weight: 500;
    }
    ::ng-deep .mat-option:hover:not(.mat-option-disabled) {
      background: #f0f8ff !important;
      color: #1976d2 !important;
    }
    ::ng-deep .mat-option.mat-selected:not(.mat-option-multiple) {
      background: #e3f2fd !important;
      color: #1976d2 !important;
      font-weight: 600;
    }
    ::ng-deep .mat-option.mat-active {
      background: #e3f2fd !important;
      color: #1976d2 !important;
    }
    ::ng-deep .mat-input-element    { background-color: transparent !important; }
    ::ng-deep textarea.mat-input-element { background-color: transparent !important; }

    ::ng-deep .success-snackbar { background: #4caf50 !important; color: white !important; }
    ::ng-deep .error-snackbar   { background: #f44336 !important; color: white !important; }
    ::ng-deep .warning-snackbar { background: #ff9800 !important; color: white !important; }
    ::ng-deep .info-snackbar    { background: #2196f3 !important; color: white !important; }

    @media (max-width: 768px) {
      .maintenance-card { margin: 20px; padding: 20px; }
      .serial-with-button { flex-direction: column; gap: 8px; }
      .get-details-btn { width: 100%; height: 48px; margin-top: 0; }
      .form-actions { flex-direction: column; }
      .cancel-btn { flex: 1; }
    }
  `]
})
export class MaintenanceRequestComponent implements OnInit {
  form: FormGroup;
  submitting      = false;
  fetchingDetails = false;
  detailsLoaded   = false;
  // deviceLastSeen removed per UX: not shown in the first column

  // Meta fields shown on the right
  submittedBy: string = '';
  submittedAt: string = '';
  requestDate: string = '';
  locations: any[] = [];
  approachRoads: string[] = [];
  availableSerials: string[] = [];
  oldLocationName: string = '';
  oldApproachRoadName: string = '';

  // Backend status code mapping — put known exact status codes here.
  // Update these if your backend uses different codes.
  private readonly REPAIRED_STATUSES = new Set([ 'REPAIRED', 'REPAIR_DONE', 'REPAIR_COMPLETE', 'REPAIRED_SPARE', 'REPAIRED_NOT_INSTALLED' ]);
  private readonly INSTALLED_STATUSES = new Set([ 'INSTALLED', 'ACTIVE', 'DEPLOYED' ]);

  /** Controls the in-form email status banner */
  emailStatus        = '';          // 'sending' | 'sent' | 'failed' | ''
  emailStatusMessage = '';

  private baseUrl       = '/api/maintenance/requests';
  private deviceBaseUrl = '/api/devices';

  requestTypes = [
    { value: 'FAULT',         label: 'Fault' },
    { value: 'REPAIR',        label: 'Repair' },
    { value: 'REPLACE',       label: 'Replace' },
    { value: 'SERIAL_UPDATE', label: 'Serial Update' },
    { value: 'MOVE',          label: 'Move' }
  ];

  constructor(
    private fb:       FormBuilder,
    private snackBar: MatSnackBar,
    private router:   Router,
    private http:     HttpClient
    , private locationsService: LocationsService
    , private devicesService: DevicesService
  ) {
    this.form = this.fb.group({
      deviceSerial:    ['', Validators.required],
      newSerial:       [''],
      locationName:    ['', Validators.required],
      approachRoadName:['', Validators.required],
      requestType:     ['', Validators.required],
      remarks:         ['']
    });

    // New serial is only enabled for REPLACE or SERIAL_UPDATE
    this.form.get('newSerial')?.disable({ emitEvent: false });

    this.form.get('requestType')?.valueChanges.subscribe(requestType => {
      // Toggle newSerial control enabled state
      if (requestType === 'SERIAL_UPDATE' || requestType === 'REPLACE') {
        this.form.get('newSerial')?.setValidators([Validators.required]);
        this.form.get('newSerial')?.enable({ emitEvent: false });
        this.snackBar.open('Please provide a new serial number for this request type', 'OK', { duration: 3000, panelClass: ['info-snackbar'] });
      } else {
        this.form.get('newSerial')?.clearValidators();
        this.form.get('newSerial')?.setValue('');
        this.form.get('newSerial')?.disable({ emitEvent: false });
      }
      this.form.get('newSerial')?.updateValueAndValidity({ emitEvent: false });

      // Additional behaviour: when MOVE selected, show locations select and load approach roads on selection
      if (requestType === 'MOVE') {
        this.loadLocations();
        // ensure location & approach controls are enabled for selection
        this.form.get('locationName')?.enable({ emitEvent: false });
        this.form.get('approachRoadName')?.enable({ emitEvent: false });
      } else {
        // for other types keep location/approach read-only if detailsLoaded
        if (this.detailsLoaded) {
          this.form.get('locationName')?.disable({ emitEvent: false });
          this.form.get('approachRoadName')?.disable({ emitEvent: false });
        }
      }

      if (requestType === 'REPLACE') {
        this.loadAvailableSerials();
      }
    });
  }

  ngOnInit(): void {
    // Dynamically inject the EmailJS SDK so no npm install is required.
    this.loadEmailJsScript();
  }

  public loadLocations(): void {
    console.log('Loading locations...');
    this.locationsService.getAll().subscribe({
      next: (list) => {
        const raw = Array.isArray(list) ? list : [];
        // normalize to array of strings (prefer name/locationName properties)
        this.locations = raw.map((l: any) => (l && (l.name || l.locationName)) ? (l.name || l.locationName) : (typeof l === 'string' ? l : ''))
                          .filter((s: string) => !!s);
        console.log('Loaded locations:', this.locations);
      },
      error: (err) => {
        console.error('Failed to load locations:', err);
        // Fallback: derive locations from devices if locations API is down or returns 500
        this.devicesService.getAllDevices().subscribe({
          next: (devices: any[]) => {
            const derived = Array.from(new Set((devices || [])
              .map(d => (d.locationName || d.location || d.location_name || '').toString().trim())
              .filter(s => !!s)
            )).sort();
            if (derived.length) {
              console.warn('Derived locations from devices as fallback', derived);
              this.locations = derived;
              this.snackBar.open(`Loaded ${derived.length} locations from devices (fallback)`, 'Close', { duration: 3000, panelClass: ['info-snackbar'] });
            } else {
              this.locations = [];
              this.snackBar.open('No locations available', 'Close', { duration: 3000, panelClass: ['warning-snackbar'] });
            }
          },
          error: (e) => {
            console.error('Failed to derive locations from devices:', e);
            this.locations = [];
            this.snackBar.open('Failed to load locations', 'Close', { duration: 4000, panelClass: ['error-snackbar'] });
          }
        });
      }
    });
  }

  public loadAvailableSerials(): void {
    this.devicesService.getAllDevices().subscribe({
      next: (devices) => {
        const current = this.form.get('deviceSerial')?.value;
        // Prefer exact backend status codes (uppercase). Fall back to substring checks.
        this.availableSerials = (devices || [])
          .filter(d => {
            const raw = (d.status || '').toString();
            const code = raw.toUpperCase().trim();
            const isRepairedExact = this.REPAIRED_STATUSES.has(code);
            const isInstalledExact = this.INSTALLED_STATUSES.has(code);
            if (isRepairedExact || isInstalledExact) {
              return isRepairedExact && !isInstalledExact;
            }
            // fallback: legacy substring detection
            const lower = raw.toLowerCase();
            const isRepaired = lower.includes('repair') || lower.includes('repaired');
            const isInstalled = lower.includes('install') || lower.includes('installed') || lower.includes('active') || lower.includes('deployed');
            return isRepaired && !isInstalled;
          })
          .map(d => (d.serialNumber || d.name || '').toString())
          .filter(s => s && s !== current);
      },
      error: (err) => {
        console.error('Failed to load available serials:', err);
        this.availableSerials = [];
      }
    });
  }

  onLocationChange(locationName: string): void {
    // Derive approach roads from all devices for the selected location
    this.devicesService.getAllDevices().subscribe({
      next: (devices) => {
        const roads = (devices || [])
          .filter(d => (d.locationName || '').toString() === locationName)
          .map(d => (d.approachRoad || '').toString().trim())
          .filter(r => !!r);
        // unique
        this.approachRoads = Array.from(new Set(roads));
        // enable approach control
        this.form.get('approachRoadName')?.enable({ emitEvent: false });
        // clear previous value
        this.form.get('approachRoadName')?.setValue('');
        // Emit a DOM event so other components can react to the proposed location change
        try {
          const payload = { deviceSerial: this.form.get('deviceSerial')?.value || null, locationName };
          window.dispatchEvent(new CustomEvent('device-location-changed', { detail: payload }));
        } catch (e) {
          // ignore if browser doesn't support CustomEvent
        }
      },
      error: (err) => {
        console.error('Failed to derive approach roads:', err);
        this.approachRoads = [];
      }
    });
  }

  // ─── EmailJS SDK loader ───────────────────────────────────────────────────

  private loadEmailJsScript(): void {
    if (document.getElementById('emailjs-sdk')) return;   // already loaded

    const script   = document.createElement('script');
    script.id      = 'emailjs-sdk';
    script.src     = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.async   = true;
    script.onload  = () => {
      (window as any).emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      console.log('[EmailJS] SDK loaded & initialised.');
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
  private async sendMaintenanceNotificationEmail(payload: {
    deviceSerial:        string;
    locationName:        string;
    approachRoadName:    string;
    oldLocationName:     string;
    oldApproachRoadName: string;
    requestType:         string;
    newSerial:           string | null;
    remarks:             string | null;
  }): Promise<void> {

    const emailjs = (window as any).emailjs;

    if (!emailjs) {
      console.warn('[EmailJS] SDK not ready yet — skipping email.');
      return;
    }

    // Resolve the current user's name from localStorage (adjust key as needed)
    const submittedBy =
      localStorage.getItem('username') ||
      localStorage.getItem('name')     ||
      'Admin';

    const submittedAt = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const templateParams = {
      to_email:      NOTIFICATION_EMAIL,
      device_serial: payload.deviceSerial,
      location_name: payload.locationName,
      approach_road: payload.approachRoadName,
      old_location_name: payload.oldLocationName || 'N/A',
      old_approach_road: payload.oldApproachRoadName || 'N/A',
      request_type:  payload.requestType,
      new_serial:    payload.newSerial    || 'N/A',
      remarks:       payload.remarks      || 'None',
      submitted_by:  submittedBy,
      submitted_at:  submittedAt
    };

    this.emailStatus        = 'sending';
    this.emailStatusMessage = `Sending notification to ${NOTIFICATION_EMAIL}…`;

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

      this.emailStatus        = 'sent';
      this.emailStatusMessage = `✓ Notification sent to ${NOTIFICATION_EMAIL}`;
      console.log('[EmailJS] Notification email sent successfully.');

      // Auto-hide the banner after 6 s
      setTimeout(() => { this.emailStatus = ''; }, 6000);

    } catch (err) {
      console.error('[EmailJS] Failed to send notification email:', err);

      this.emailStatus        = 'failed';
      this.emailStatusMessage =
        `Notification email could not be delivered — ` +
        `please inform ${NOTIFICATION_EMAIL} manually.`;
    }
  }

  // ─── Get device details ───────────────────────────────────────────────────

  getDeviceDetails() {
    const deviceSerial = this.form.get('deviceSerial')?.value?.trim();

    if (!deviceSerial) {
      this.snackBar.open('⚠️ Please enter a device serial number first', 'Close',
        { duration: 3000, panelClass: ['warning-snackbar'] });
      return;
    }

    this.fetchingDetails = true;
    const token = localStorage.getItem('token');

    if (!token) {
      this.snackBar.open('❌ You must log in to fetch device details', 'Close',
        { duration: 3000, panelClass: ['error-snackbar'] });
      this.fetchingDetails = false;
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type':  'application/json'
    });

    const url = `${this.deviceBaseUrl}/by-serial/${encodeURIComponent(deviceSerial)}`;
    console.log('Fetching device details from:', url);

    this.http.get(url, { headers }).subscribe({
      next: (response: any) => {
        this.fetchingDetails = false;
        if (response) {
          this.form.patchValue({
            locationName:    response.locationName || '',
            approachRoadName:response.approachRoad  || ''
          });

          // Store original/old values so notification emails can include previous location/road
          this.oldLocationName = response.locationName || '';
          this.oldApproachRoadName = response.approachRoad || '';

          // Mark details loaded and make these fields read-only
          this.detailsLoaded = true;
          this.form.get('locationName')?.disable({ emitEvent: false });
          this.form.get('approachRoadName')?.disable({ emitEvent: false });

          // removed device last-seen display per UX requirements

          // Meta info
          this.submittedBy = localStorage.getItem('username') || localStorage.getItem('name') || 'Admin';
          this.submittedAt = new Date().toLocaleString();
          this.requestDate = new Date().toLocaleDateString();

          this.snackBar.open('✅ Device details loaded successfully!', 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
        } else {
          this.snackBar.open('⚠️ Device found but no location data available', 'Close', { duration: 3000, panelClass: ['warning-snackbar'] });
        }
      },
      error: (err) => {
        this.fetchingDetails = false;
        console.error('Error fetching device details:', err);

        let msg = '❌ Failed to fetch device details. Please check the serial number.';
        if      (err.status === 404) msg = '❌ Device not found. Please check the serial number.';
        else if (err.status === 401) msg = '❌ Authentication failed. Please log in again.';
        else if (err.status === 403) msg = '❌ You do not have permission to access device details.';
        else if (err.status === 500) msg = '❌ Server error while fetching device details.';
        else if (err.error?.message) msg = `❌ ${err.error.message}`;

        this.snackBar.open(msg, 'Close',
          { duration: 5000, panelClass: ['error-snackbar'] });
      }
    });
  }

  onSerialBlur() {
    const deviceSerial = this.form.get('deviceSerial')?.value?.trim();
    const locationName = this.form.get('locationName')?.value;
    const approachRoad = this.form.get('approachRoadName')?.value;

    if (deviceSerial && (!locationName || !approachRoad)) {
      setTimeout(() => this.getDeviceDetails(), 500);
    }
  }

  // ─── Submit ───────────────────────────────────────────────────────────────

  submit() {
    if (this.form.invalid) {
      this.markFormGroupTouched();
      this.snackBar.open('⚠️ Please fill all required fields correctly.', 'Close', { duration: 3000, panelClass: ['warning-snackbar'] });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.snackBar.open('❌ You must log in before submitting a request.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
      return;
    }

    // Use getRawValue() so disabled controls (location/approach) are included
    const raw = this.form.getRawValue() as any;

    const deviceSerial = (raw.deviceSerial || '').toString().trim();
    const newSerial = raw.newSerial ? raw.newSerial.toString().trim() : null;
    const requestType = raw.requestType;
    const locationName = (raw.locationName || this.form.get('locationName')?.value || '').toString().trim();
    const approachRoadName = (raw.approachRoadName || this.form.get('approachRoadName')?.value || '').toString().trim();
    const remarks = raw.remarks ? raw.remarks.toString().trim() : null;

    // Build payload following backend DTO: use name fields for MOVE (server expects newLocationName/newApproachRoadName)
    const requestPayload: any = {
      deviceSerial,
      newSerial: newSerial || null,
      requestType,
      remarks
    };

    // For MOVE send names using the exact DTO property names
    if (requestType === 'MOVE' && locationName) requestPayload.newLocationName = locationName;
    if (requestType === 'MOVE' && approachRoadName) requestPayload.newApproachRoadName = approachRoadName;

    // include referenceId if present on form (optional)
    const ref = (raw.referenceId || '').toString().trim();
    if (ref) requestPayload.referenceId = ref;

    this.submitting = true;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' });

    console.log('Submitting maintenance request:', requestPayload);

    this.http.post(this.baseUrl, requestPayload, { headers }).subscribe({
      next: async (response: any) => {
        this.snackBar.open('✅ Maintenance request submitted successfully!', 'Close', { duration: 4000, panelClass: ['success-snackbar'] });
        this.submitting = false;

        // Send notification email — prefer the new location/road names (for MOVE), fallback to current form values
        const emailLocation = requestPayload.newLocationName || this.form.get('locationName')?.value || '';
        const emailApproach = requestPayload.newApproachRoadName || this.form.get('approachRoadName')?.value || '';
        await this.sendMaintenanceNotificationEmail({
          deviceSerial:        requestPayload.deviceSerial,
          locationName:        emailLocation,
          approachRoadName:    emailApproach,
          oldLocationName:     this.oldLocationName,
          oldApproachRoadName: this.oldApproachRoadName,
          requestType:         requestPayload.requestType,
          newSerial:           requestPayload.newSerial,
          remarks:             requestPayload.remarks
        });

        this.form.reset();
        // Reset UI state
        this.detailsLoaded = false;
        this.submittedAt = '';
        this.submittedBy = '';
        this.requestDate = '';
        this.form.get('newSerial')?.disable({ emitEvent: false });
        this.form.get('locationName')?.enable({ emitEvent: false });
        this.form.get('approachRoadName')?.enable({ emitEvent: false });
        this.oldLocationName = '';
        this.oldApproachRoadName = '';
        this.router.navigate(['/all-requests']);
      },
      error: (err) => {
        console.error('Error submitting request:', err);
        let msg = '❌ Failed to submit request. Please try again.';
        if (err.status === 400 && err.error?.message) msg = `❌ ${err.error.message}`;
        else if (err.status === 400) msg = '❌ Invalid request data. Please check your inputs.';
        else if (err.status === 401) msg = '❌ Authentication failed. Please log in again.';
        else if (err.status === 403) msg = '❌ You do not have permission to submit requests.';
        else if (err.status === 404) msg = '❌ Device not found. Please check the Device Serial.';
        else if (err.status === 409) msg = '❌ A request for this device is already pending.';
        else if (err.error?.message) msg = `❌ ${err.error.message}`;
        this.snackBar.open(msg, 'Close', { duration: 5000, panelClass: ['error-snackbar'] });
        this.submitting = false;
      }
    });
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────

  cancel() {
    if (this.form.dirty) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
      if (!confirm) return;
    }
    this.router.navigate(['/dashboard']);
  }

  private markFormGroupTouched() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  isNewSerialRecommended(): boolean {
    const t = this.form.get('requestType')?.value;
    return t === 'SERIAL_UPDATE' || t === 'REPLACE';
  }

  getRequestTypeDescription(type: string): string {
    const map: Record<string, string> = {
      'FAULT':        'Device is faulty and needs attention',
      'REPAIR':       'Device needs repair work',
      'REPLACE':      'Device needs to be replaced with a new one',
      'SERIAL_UPDATE':'Update device serial number',
      'MOVE':         'Relocate device to different location'
    };
    return map[type] || '';
  }
}