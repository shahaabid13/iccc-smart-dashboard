import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CimsService } from '../../services/cims.service';
import { CimsNotificationService } from '../../services/cims-notification.service';
import { DevicesService } from '../../services/devices.service';
import { IncidentType, FieldPerson, Ticket, Location, ApproachRoad, DeviceType } from '../../models/cims.models';

interface PriorityOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-cims-create-ticket',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <div class="cims-container">
      <div class="page-header">
        <div class="header-title-block">
          <div class="title-icon">📹</div>
          <div>
            <h1>Raise New Incident Ticket</h1>
            <p class="subtitle">Submit a new camera incident for investigation</p>
          </div>
        </div>
      </div>

      <mat-card class="ticket-form-card">
        <mat-card-content>
          <form [formGroup]="ticketForm" (ngSubmit)="submitForm()">

            <div class="section-label">
              <mat-icon>location_on</mat-icon>
              <span>Location Details</span>
            </div>

            <div class="form-grid">
              <!-- Location -->
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Location *</mat-label>
                <input
                  matInput
                  type="text"
                  placeholder="Type to search location..."
                  [formControl]="locationCtrl"
                  [matAutocomplete]="autoLocation"
                  #locationTrigger="matAutocompleteTrigger">
                <mat-icon matSuffix class="dropdown-arrow" (click)="toggleAutocomplete(locationTrigger)">arrow_drop_down</mat-icon>
                <mat-autocomplete #autoLocation="matAutocomplete" [displayWith]="displayLocation" (optionSelected)="onLocationSelected($event)">
                  <mat-option *ngFor="let location of filterLocations(locationCtrl.value)" [value]="location">
                    {{ location.name }}
                  </mat-option>
                </mat-autocomplete>
                <mat-error *ngIf="getControl('locationId')?.hasError('required')">
                  Location is required
                </mat-error>
              </mat-form-field>

              <!-- Approach Road -->
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Approach Road</mat-label>
                <input
                  matInput
                  type="text"
                  placeholder="Type to search approach road... (or select All)"
                  [formControl]="approachRoadCtrl"
                  [matAutocomplete]="autoApproachRoad"
                  [disabled]="!getControl('locationId')?.value"
                  #approachRoadTrigger="matAutocompleteTrigger">
                <mat-icon matSuffix class="dropdown-arrow"
                          [class.disabled]="!getControl('locationId')?.value"
                          (click)="toggleAutocomplete(approachRoadTrigger)">arrow_drop_down</mat-icon>
                <mat-autocomplete #autoApproachRoad="matAutocomplete" [displayWith]="displayApproachRoad" (optionSelected)="onApproachRoadSelected($event)">
                  <mat-option *ngFor="let road of filterApproachRoads(approachRoadCtrl.value)" [value]="road">
                    {{ road.name }}
                  </mat-option>
                </mat-autocomplete>
              </mat-form-field>

              <!-- Device Type -->
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Device Type</mat-label>
                <input
                  matInput
                  type="text"
                  placeholder="Type to search device type... (or select All)"
                  [formControl]="deviceTypeCtrl"
                  [matAutocomplete]="autoDeviceType"
                  #deviceTypeTrigger="matAutocompleteTrigger">
                <mat-icon matSuffix class="dropdown-arrow" (click)="toggleAutocomplete(deviceTypeTrigger)">arrow_drop_down</mat-icon>
                <mat-autocomplete #autoDeviceType="matAutocomplete" [displayWith]="displayDeviceType" (optionSelected)="onDeviceTypeSelected($event)">
                  <mat-option *ngFor="let device of filterDeviceTypes(deviceTypeCtrl.value)" [value]="device">
                    {{ device.name }}
                  </mat-option>
                </mat-autocomplete>
              </mat-form-field>
            </div>

            <mat-divider class="section-divider"></mat-divider>

            <div class="section-label">
              <mat-icon>report_problem</mat-icon>
              <span>Incident Details</span>
            </div>

            <div class="form-grid">
              <!-- Incident Type -->
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Incident Type *</mat-label>
                <input
                  matInput
                  type="text"
                  placeholder="Type to search incident type..."
                  [formControl]="incidentTypeCtrl"
                  [matAutocomplete]="autoIncidentType"
                  #incidentTypeTrigger="matAutocompleteTrigger">
                <mat-icon matSuffix class="dropdown-arrow" (click)="toggleAutocomplete(incidentTypeTrigger)">arrow_drop_down</mat-icon>
                <mat-autocomplete #autoIncidentType="matAutocomplete" [displayWith]="displayIncidentType" (optionSelected)="onIncidentTypeSelected($event)">
                  <mat-option *ngFor="let type of filterIncidentTypes(incidentTypeCtrl.value)" [value]="type">
                    {{ type.name }}
                  </mat-option>
                </mat-autocomplete>
                <mat-error *ngIf="getControl('incidentTypeId')?.hasError('required')">
                  Incident Type is required
                </mat-error>
              </mat-form-field>

              <!-- Priority -->
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Priority *</mat-label>
                <input
                  matInput
                  type="text"
                  placeholder="Type to search priority..."
                  [formControl]="priorityCtrl"
                  [matAutocomplete]="autoPriority"
                  #priorityTrigger="matAutocompleteTrigger">
                <mat-icon matSuffix class="dropdown-arrow" (click)="toggleAutocomplete(priorityTrigger)">arrow_drop_down</mat-icon>
                <mat-autocomplete #autoPriority="matAutocomplete" [displayWith]="displayPriority" (optionSelected)="onPrioritySelected($event)">
                  <mat-option *ngFor="let option of filterPriorities(priorityCtrl.value)" [value]="option">
                    <span class="priority-option" [ngClass]="'priority-opt-' + option.value.toLowerCase()">
                      <span class="priority-dot"></span>{{ option.label }}
                    </span>
                  </mat-option>
                </mat-autocomplete>
                <mat-error *ngIf="getControl('priority')?.hasError('required')">
                  Priority is required
                </mat-error>
              </mat-form-field>

              <!-- Field Person -->
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Field Person *</mat-label>
                <input
                  matInput
                  type="text"
                  placeholder="Type to search field person..."
                  [formControl]="fieldPersonCtrl"
                  [matAutocomplete]="autoFieldPerson"
                  #fieldPersonTrigger="matAutocompleteTrigger">
                <mat-icon matSuffix class="dropdown-arrow" (click)="toggleAutocomplete(fieldPersonTrigger)">arrow_drop_down</mat-icon>
                <mat-autocomplete #autoFieldPerson="matAutocomplete" [displayWith]="displayFieldPerson" (optionSelected)="onFieldPersonSelected($event)">
                  <mat-option *ngFor="let person of filterFieldPersons(fieldPersonCtrl.value)" [value]="person">
                    {{ formatDisplayName(person.name) }} - {{ formatDisplayName(person.role) }}
                  </mat-option>
                </mat-autocomplete>
                <mat-error *ngIf="getControl('fieldPersonId')?.hasError('required')">
                  Field Person is required
                </mat-error>
              </mat-form-field>

              <!-- Description (Full Width, optional) -->
              <mat-form-field appearance="outline" class="form-field full-width">
                <mat-label>Description</mat-label>
                <textarea matInput formControlName="description" rows="5" placeholder="Describe the incident in detail... (optional)"></textarea>
                <mat-error *ngIf="getControl('description')?.hasError('minlength')">
                  Description must be at least 10 characters if provided
                </mat-error>
              </mat-form-field>
            </div>

            <!-- Form Actions -->
            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" class="submit-btn" [disabled]="isLoading">
                <span *ngIf="!isLoading" class="btn-inner"><mat-icon>send</mat-icon> Raise Ticket</span>
                <span *ngIf="isLoading" class="btn-inner">
                  <mat-spinner diameter="18"></mat-spinner> Submitting...
                </span>
              </button>
              <button mat-stroked-button type="button" (click)="resetForm()" [disabled]="isLoading">
                <mat-icon>restart_alt</mat-icon> Reset
              </button>
              <button mat-button type="button" class="back-btn" (click)="goBack()">
                <mat-icon>arrow_back</mat-icon> Back to My Tickets
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .cims-container {
      padding: 24px;
      max-width: 900px;
      margin: 0 auto;
      background: #f4f6f9;
    }

    /* ---------- Page header ---------- */
    .page-header {
      background: linear-gradient(135deg, #1e3a8a 0%, #1976d2 100%);
      border-radius: 16px;
      padding: 24px 28px;
      margin-bottom: 22px;
      box-shadow: 0 4px 20px rgba(20, 30, 60, 0.12);
    }

    .header-title-block {
      display: flex;
      align-items: center;
      gap: 16px;
      color: #fff;
    }

    .title-icon {
      font-size: 28px;
      width: 52px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 14px;
      flex-shrink: 0;
    }

    .header-title-block h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
    }

    .subtitle {
      margin: 2px 0 0;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.8);
    }

    /* ---------- Card ---------- */
    .ticket-form-card {
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(20, 30, 60, 0.08);
      padding: 8px;
    }

    .section-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #1976d2;
      margin: 18px 0 14px;
    }

    .section-label mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .section-divider {
      margin: 12px 0 6px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px 20px;
    }

    .form-field {
      width: 100%;
    }

    .form-field.full-width {
      grid-column: 1 / -1;
    }

    ::ng-deep .form-field .mat-mdc-text-field-wrapper {
      border-radius: 10px;
    }

    .dropdown-arrow {
      cursor: pointer;
      color: rgba(0, 0, 0, 0.4);
      user-select: none;
    }

    .dropdown-arrow.disabled {
      cursor: not-allowed;
      color: rgba(0, 0, 0, 0.2);
      pointer-events: none;
    }

    .priority-option {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .priority-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
    }

    .priority-opt-low .priority-dot { background: #1565c0; }
    .priority-opt-medium .priority-dot { background: #e65100; }
    .priority-opt-high .priority-dot { background: #c62828; }

    /* ---------- Actions ---------- */
    .form-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 28px;
      padding-top: 20px;
      border-top: 1px solid #eceff1;
    }

    .submit-btn {
      border-radius: 10px;
      padding: 0 22px;
      min-width: 160px;
      font-weight: 600;
    }

    .btn-inner {
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: center;
    }

    .btn-inner mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    button[mat-stroked-button] {
      border-radius: 10px;
    }

    .back-btn {
      margin-left: auto;
      color: #607d8b;
    }

    button {
      min-width: 120px;
    }

    mat-spinner {
      display: inline-block;
    }

    @media (max-width: 768px) {
      .cims-container {
        padding: 12px;
      }

      .page-header {
        padding: 18px 20px;
      }

      .form-grid {
        grid-template-columns: 1fr;
      }

      .form-actions {
        flex-direction: column;
        align-items: stretch;
      }

      .back-btn {
        margin-left: 0;
      }

      button {
        width: 100%;
      }
    }
  `]
})
export class CimsCreateTicketComponent implements OnInit {
  ticketForm!: FormGroup;
  isLoading = false;

  incidentTypes: IncidentType[] = [];
  fieldPersons: FieldPerson[] = [];
  locations: Location[] = [];
  approachRoads: ApproachRoad[] = [];
  deviceTypes: DeviceType[] = [];

  priorityOptions: PriorityOption[] = [
    { value: 'LOW', label: 'Low' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'HIGH', label: 'High' }
  ];

  private readonly ALL_APPROACH_ROAD: ApproachRoad = { id: 'ALL' as any, name: 'All', locationId: 0 as any };
  private readonly ALL_DEVICE_TYPE: DeviceType = { id: 'ALL' as any, name: 'All' } as any;

  // Path to redirect to after successful creation. Update this if your
  // actual route is different (e.g. lazy-loaded module prefix).
  private readonly MY_TICKETS_ROUTE = '/cims/support-engineer/my-tickets';

  locationCtrl = new FormControl('');
  approachRoadCtrl = new FormControl('');
  deviceTypeCtrl = new FormControl('');
  incidentTypeCtrl = new FormControl('');
  fieldPersonCtrl = new FormControl('');
  priorityCtrl = new FormControl(this.priorityOptions[1]);

  constructor(
    private fb: FormBuilder,
    private cimsService: CimsService,
    private notificationService: CimsNotificationService,
    private devicesService: DevicesService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    console.log('[CIMS Form] Initializing component...');
    this.loadIncidentTypes();
    this.loadFieldPersons();
    this.loadLocations();
    this.loadDeviceTypes();
    this.setupLocationChangeListener();
  }

  initializeForm(): void {
    this.ticketForm = this.fb.group({
      locationId: ['', Validators.required],
      approachRoadId: [''],
      deviceTypeId: [''],
      incidentTypeId: ['', Validators.required],
      fieldPersonId: ['', Validators.required],
      priority: ['MEDIUM', Validators.required],
      description: ['', [Validators.minLength(10)]]
    });
  }

  // ---------- Dropdown toggle ----------

  toggleAutocomplete(trigger: MatAutocompleteTrigger): void {
    if (trigger.panelOpen) {
      trigger.closePanel();
    } else {
      trigger.openPanel();
    }
  }

  // ---------- Data loading ----------

  loadIncidentTypes(): void {
    this.cimsService.getIncidentTypes().subscribe({
      next: (response: any) => {
        const types = Array.isArray(response) ? response : (response?.content || []);
        this.incidentTypes = types.slice().sort((a: IncidentType, b: IncidentType) => (a?.name || '').localeCompare(b?.name || ''));
      },
      error: (err: any) => {
        console.error('[CIMS Form] Failed to load incident types:', err);
        this.snackBar.open('Failed to load incident types: ' + (err.error?.message || err.message), 'Close', { duration: 5000 });
      }
    });
  }

  loadFieldPersons(): void {
    this.cimsService.getAssignableFieldPersons().subscribe({
      next: (response: any) => {
        const persons = Array.isArray(response) ? response : (response?.content || []);
        this.fieldPersons = persons.slice().sort((a: FieldPerson, b: FieldPerson) => (a?.name || '').localeCompare(b?.name || ''));
      },
      error: (err: any) => {
        console.error('[CIMS Form] Failed to load assignable field persons:', err);
        this.snackBar.open('Failed to load field persons: ' + (err.error?.message || err.message), 'Close', { duration: 5000 });
      }
    });
  }

  loadLocations(): void {
    this.cimsService.getLocations().subscribe({
      next: (response: any) => {
        const locs = Array.isArray(response) ? response : (response?.content || []);
        this.locations = locs.slice().sort((a: Location, b: Location) => (a?.name || '').localeCompare(b?.name || ''));
      },
      error: (err: any) => {
        console.error('[CIMS Form] Failed to load locations:', err);
        this.snackBar.open('Failed to load locations: ' + (err.error?.message || err.message), 'Close', { duration: 5000 });
      }
    });
  }

  loadApproachRoads(locationId: number): void {
    this.cimsService.getApproachRoads(locationId).subscribe({
      next: (response: any) => {
        const roads = Array.isArray(response) ? response : (response?.content || []);
        if (Array.isArray(roads) && roads.length && roads[0] && typeof roads[0] === 'object' && ('name' in roads[0])) {
          this.approachRoads = roads.slice().sort((a: ApproachRoad, b: ApproachRoad) => (a?.name || '').localeCompare(b?.name || ''));
        } else {
          const loc = this.locations.find(l => l.id === locationId);
          const locName = loc ? (loc.name || (loc as any).locationName) : undefined;
          if (locName) {
            this.devicesService.getAllDevices().subscribe({
              next: (devices: any[]) => {
                const roadsFromDevices = Array.from(new Set((devices || [])
                  .filter(d => {
                    const dLoc = (d.locationName || d.location || d.location_name || '').toString();
                    return dLoc === locName || String(d.locationId || d.location || '') === String(locationId);
                  })
                  .map(d => (d.approachRoad || d.approach_road || '').toString().trim())
                  .filter(r => !!r)
                ));
                this.approachRoads = roadsFromDevices.map((r, idx) => ({ id: -(idx + 1), name: r, locationId: locationId }));
                this.ticketForm.patchValue({ approachRoadId: '' });
                this.approachRoadCtrl.setValue('');
              },
              error: (e) => {
                console.error('[CIMS Form] Failed to derive approach roads from devices:', e);
                this.approachRoads = [];
              }
            });
          } else {
            this.approachRoads = [];
          }
        }
        this.ticketForm.patchValue({ approachRoadId: '' });
        this.approachRoadCtrl.setValue('');
      },
      error: (err: any) => {
        console.error('[CIMS Form] Failed to load approach roads:', err);
        this.approachRoads = [];
        this.snackBar.open('Failed to load approach roads: ' + (err.error?.message || err.message), 'Close', { duration: 5000 });
      }
    });
  }

  loadDeviceTypes(): void {
    this.cimsService.getDeviceTypes().subscribe({
      next: (response: any) => {
        const types = Array.isArray(response) ? response : (response?.content || []);
        this.deviceTypes = types.slice().sort((a: DeviceType, b: DeviceType) => (a?.name || '').localeCompare(b?.name || ''));
      },
      error: (err: any) => {
        console.error('[CIMS Form] Failed to load device types:', err);
        this.snackBar.open('Failed to load device types: ' + (err.error?.message || err.message), 'Close', { duration: 5000 });
      }
    });
  }

  setupLocationChangeListener(): void {
    this.ticketForm.get('locationId')?.valueChanges.subscribe({
      next: (locationId: number) => {
        if (locationId) {
          this.loadApproachRoads(locationId);
        } else {
          this.approachRoads = [];
        }
      }
    });
  }

  // ---------- Autocomplete: filtering ----------

  filterLocations(term: string | Location | null): Location[] {
    const value = this.normalizeSearchTerm(term);
    return this.locations.filter(l => l.name.toLowerCase().includes(value));
  }

  filterApproachRoads(term: string | ApproachRoad | null): ApproachRoad[] {
    const value = this.normalizeSearchTerm(term);
    const filtered = this.approachRoads.filter(r => r.name.toLowerCase().includes(value));
    if ('all'.includes(value)) {
      return [this.ALL_APPROACH_ROAD, ...filtered];
    }
    return filtered;
  }

  filterDeviceTypes(term: string | DeviceType | null): DeviceType[] {
    const value = this.normalizeSearchTerm(term);
    const filtered = this.deviceTypes.filter(d => d.name.toLowerCase().includes(value));
    if ('all'.includes(value)) {
      return [this.ALL_DEVICE_TYPE, ...filtered];
    }
    return filtered;
  }

  filterIncidentTypes(term: string | IncidentType | null): IncidentType[] {
    const value = this.normalizeSearchTerm(term);
    return this.incidentTypes.filter(t => t.name.toLowerCase().includes(value));
  }

  filterFieldPersons(term: string | FieldPerson | null): FieldPerson[] {
    const value = this.normalizeSearchTerm(term);
    return this.fieldPersons.filter(p => `${this.formatDisplayName(p.name)} ${this.formatDisplayName(p.role)}`.toLowerCase().includes(value));
  }

  filterPriorities(term: string | PriorityOption | null): PriorityOption[] {
    const value = this.normalizeSearchTerm(term);
    return this.priorityOptions.filter(p => p.label.toLowerCase().includes(value));
  }

  private normalizeSearchTerm(term: any): string {
    if (!term || typeof term !== 'string') {
      return '';
    }
    return term.toLowerCase();
  }

  // ---------- Autocomplete: display ----------

  displayLocation = (location: Location): string => location?.name || '';
  displayApproachRoad = (road: ApproachRoad): string => road?.name || '';
  displayDeviceType = (device: DeviceType): string => device?.name || '';
  displayIncidentType = (type: IncidentType): string => type?.name || '';
  displayFieldPerson = (person: FieldPerson): string => (person ? `${this.formatDisplayName(person.name)} - ${this.formatDisplayName(person.role)}` : '');
  displayPriority = (option: PriorityOption): string => option?.label || '';

  formatDisplayName(value: string | null | undefined): string {
    if (!value) return '';

    const normalized = value
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!normalized) return '';

    return normalized
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // ---------- Autocomplete: selection ----------

  onLocationSelected(event: MatAutocompleteSelectedEvent): void {
    const location: Location = event.option.value;
    this.ticketForm.patchValue({ locationId: location.id });
  }

  onApproachRoadSelected(event: MatAutocompleteSelectedEvent): void {
    const road: ApproachRoad = event.option.value;
    if (road.id === ('ALL' as any)) {
      this.ticketForm.patchValue({ approachRoadId: null });
      return;
    }
    this.ticketForm.patchValue({ approachRoadId: road.id });
  }

  onDeviceTypeSelected(event: MatAutocompleteSelectedEvent): void {
    const device: DeviceType = event.option.value;
    if (device.id === ('ALL' as any)) {
      this.ticketForm.patchValue({ deviceTypeId: null });
      return;
    }
    this.ticketForm.patchValue({ deviceTypeId: device.id });
  }

  onIncidentTypeSelected(event: MatAutocompleteSelectedEvent): void {
    const type: IncidentType = event.option.value;
    this.ticketForm.patchValue({ incidentTypeId: type.id });
  }

  onFieldPersonSelected(event: MatAutocompleteSelectedEvent): void {
    const person: FieldPerson = event.option.value;
    this.ticketForm.patchValue({ fieldPersonId: person.id });
  }

  onPrioritySelected(event: MatAutocompleteSelectedEvent): void {
    const option: PriorityOption = event.option.value;
    this.ticketForm.patchValue({ priority: option.value });
  }

  // ---------- Form helpers ----------

  getControl(name: string) {
    return this.ticketForm.get(name);
  }

  submitForm(): void {
    if (this.ticketForm.invalid) {
      this.snackBar.open('Please fill all required fields', 'Close', { duration: 5000 });
      return;
    }

    this.isLoading = true;
    const payload = this.ticketForm.value;

    if (!payload.approachRoadId) delete payload.approachRoadId;
    if (!payload.deviceTypeId) delete payload.deviceTypeId;
    if (!payload.description) delete payload.description;

    if (payload.approachRoadId && Number(payload.approachRoadId) <= 0) {
      const selected = this.approachRoads.find((r: any) => Number(r.id) === Number(payload.approachRoadId));
      if (selected) {
        payload.approachRoadName = selected.name;
      }
      delete payload.approachRoadId;
    }

    this.checkDuplicateToday(payload).subscribe({
      next: (isDup) => {
        if (isDup) {
          this.isLoading = false;
          this.snackBar.open('A similar ticket has already been created today. Duplicate creation is not allowed.', 'Close', { duration: 7000 });
          return;
        }
        this.createTicketAndRedirect(payload);
      },
      error: (err: any) => {
        console.error('Duplicate check failed:', err);
        this.createTicketAndRedirect(payload);
      }
    });
  }

  private createTicketAndRedirect(payload: any): void {
  this.cimsService.createTicket(payload).subscribe({
    next: (response: Ticket) => {
      this.isLoading = false;

      this.snackBar.open(`Ticket #${response.id} created successfully!`, 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });

      // Notification failures must never block the redirect — isolate it.
      try {
        this.notificationService.notifyTicketUpdate(response.id, 'TICKET_CREATED', response);
      } catch (notifyErr) {
        console.error('[CIMS Form] notifyTicketUpdate failed (non-blocking):', notifyErr);
      }

      this.redirectToMyTickets();
    },
    error: (err: any) => {
      this.isLoading = false;
      const errorMsg = err.error?.message || 'Failed to create ticket';
      this.snackBar.open(errorMsg, 'Close', { duration: 5000 });
      console.error('Error creating ticket:', err);
    }
  });
}

  // Navigates to My Tickets right after a successful create. Uses the
  // navigate() Promise result to detect *silent* failures (e.g. a route
  // guard returning false) which don't throw and don't show up as errors —
  // they just do nothing, which looks like "redirect isn't working".
  private redirectToMyTickets(): void {
    this.router.navigate([this.MY_TICKETS_ROUTE]).then(success => {
      if (!success) {
        console.warn(
          `[CIMS Form] router.navigate to "${this.MY_TICKETS_ROUTE}" resolved false ` +
          `(likely blocked by a route guard or the path doesn't match any route). ` +
          `Falling back to navigateByUrl with replaceUrl.`
        );
        this.router.navigateByUrl(this.MY_TICKETS_ROUTE, { replaceUrl: true }).catch(err => {
          console.error('[CIMS Form] Fallback navigation also failed:', err);
        });
      }
    }).catch(err => {
      console.error('[CIMS Form] router.navigate threw an error:', err);
    });
  }

  private checkDuplicateToday(payload: any): Observable<boolean> {
    return this.cimsService.getMyTickets(0, 200).pipe(
      map((response: any) => {
        const tickets = Array.isArray(response) ? response : (response?.content || []);
        const today = new Date();

        const isSameDay = (iso: string) => {
          if (!iso) return false;
          const d = new Date(iso);
          return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
        };

        return tickets.some((t: any) => isSameDay(t.createdAt) && this.isSameTicketPayload(t, payload));
      }),
      catchError((err) => {
        console.error('[CIMS Form] Duplicate check failed:', err);
        return of(false);
      })
    );
  }

  private isSameTicketPayload(ticket: any, payload: any): boolean {
    const eq = (a: any, b: any) => {
      if (a == null && b == null) return true;
      return String(a) === String(b);
    };

    return (
      eq(ticket.locationId, payload.locationId) &&
      eq(ticket.incidentTypeId, payload.incidentTypeId) &&
      eq(ticket.fieldPersonId, payload.fieldPersonId) &&
      eq(ticket.approachRoadId || '', payload.approachRoadId || '') &&
      eq(ticket.deviceTypeId || '', payload.deviceTypeId || '')
    );
  }

  resetForm(): void {
    this.ticketForm.reset({
      priority: 'MEDIUM'
    });
    this.locationCtrl.setValue('');
    this.approachRoadCtrl.setValue('');
    this.deviceTypeCtrl.setValue('');
    this.incidentTypeCtrl.setValue('');
    this.fieldPersonCtrl.setValue('');
    this.priorityCtrl.setValue(this.priorityOptions[1]);
  }

  goBack(): void {
    this.router.navigate([this.MY_TICKETS_ROUTE]);
  }
}