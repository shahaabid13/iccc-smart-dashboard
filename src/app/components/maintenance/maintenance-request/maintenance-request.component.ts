import { Component } from '@angular/core';
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
  `,
  styles: [`
    .maintenance-card {
      max-width: 600px;
      margin: 40px auto;
      padding: 28px;
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
      margin-bottom: 18px;
    }

    .serial-with-button {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    .serial-field {
      flex: 1;
    }
    .options-select{
      text-color: #6610f2;
      font-weight: 500;
      background-color: #f8f9fa !important  
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

    .spinner-small {
      margin-right: 4px;
    }

    mat-form-field {
      font-size: 15px;
    }

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

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .cancel-btn:hover:not(:disabled) {
      background-color: #f5f5f5;
    }

    .spinner {
      margin-right: 8px;
    }

    .help-section {
      background: #e3f2fd;
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid #2196f3;
      margin-top: 20px;
    }

    .help-section h4 {
      margin: 0 0 12px 0;
      color: #1565c0;
      font-weight: 600;
    }

    .help-section ul {
      margin: 0;
      padding-left: 20px;
    }

    .help-section li {
      margin-bottom: 8px;
      line-height: 1.4;
    }

    .help-section strong {
      color: #1976d2;
    }

    /* SOLID BACKGROUND COLORS FOR ALL FORM ELEMENTS */
    ::ng-deep .mat-form-field-appearance-outline .mat-form-field-outline {
      background-color: #ffffff !important;
      border-radius: 4px !important;
    }

    ::ng-deep .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {
      background-color: #f5f5f5 !important;
    }

    /* SOLID BACKGROUND FOR SELECT PANEL */
    ::ng-deep .mat-select-panel {
      background: #ffffff !important;
      border: 2px solid #e0e0e0 !important;
      border-radius: 8px !important;
    }

    /* SOLID BACKGROUND FOR OPTIONS */
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

    /* SOLID BACKGROUND FOR INPUT FIELDS */
    ::ng-deep .mat-form-field-appearance-outline .mat-form-field-outline-thick {
      color: #e0e0e0 !important;
    }

    ::ng-deep .mat-input-element {
      background-color: transparent !important;
    }

    /* SOLID BACKGROUND FOR TEXTAREA */
    ::ng-deep textarea.mat-input-element {
      background-color: transparent !important;
    }

    /* Snackbar styles */
    ::ng-deep .success-snackbar {
      background: #4caf50 !important;
      color: white !important;
    }

    ::ng-deep .error-snackbar {
      background: #f44336 !important;
      color: white !important;
    }

    ::ng-deep .warning-snackbar {
      background: #ff9800 !important;
      color: white !important;
    }

    ::ng-deep .info-snackbar {
      background: #2196f3 !important;
      color: white !important;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .maintenance-card {
        margin: 20px;
        padding: 20px;
      }

      .serial-with-button {
        flex-direction: column;
        gap: 8px;
      }

      .get-details-btn {
        width: 100%;
        height: 48px;
        margin-top: 0;
      }

      .form-actions {
        flex-direction: column;
      }

      .cancel-btn {
        flex: 1;
      }
    }
  `]
})
export class MaintenanceRequestComponent {
  form: FormGroup;
  submitting = false;
  fetchingDetails = false;
  private baseUrl = 'http://localhost:8080/api/maintenance/requests';
  private deviceBaseUrl = 'http://localhost:8080/api/devices'; // FIXED: Base URL without the endpoint

  // Request types from your Java enum
  requestTypes = [
    { value: 'FAULT', label: 'Fault' },
    { value: 'REPAIR', label: 'Repair' },
    { value: 'REPLACE', label: 'Replace' },
    { value: 'SERIAL_UPDATE', label: 'Serial Update' },
    { value: 'MOVE', label: 'Move' }
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      deviceSerial: ['', Validators.required],
      newSerial: [''],
      locationName: ['', Validators.required],
      approachRoadName: ['', Validators.required],
      requestType: ['', Validators.required],
      remarks: ['']
    });

    // Auto-fill new serial when request type is SERIAL_UPDATE or REPLACE
    this.form.get('requestType')?.valueChanges.subscribe(requestType => {
      if (requestType === 'SERIAL_UPDATE' || requestType === 'REPLACE') {
        this.snackBar.open('Please provide a new serial number for this request type', 'OK', {
          duration: 3000,
          panelClass: ['info-snackbar']
        });
      }
    });
  }

  /** Get device details from backend API */
  getDeviceDetails() {
    const deviceSerial = this.form.get('deviceSerial')?.value?.trim();
    
    if (!deviceSerial) {
      this.snackBar.open('⚠️ Please enter a device serial number first', 'Close', {
        duration: 3000,
        panelClass: ['warning-snackbar']
      });
      return;
    }

    this.fetchingDetails = true;
    const token = localStorage.getItem('token');
    
    if (!token) {
      this.snackBar.open('❌ You must log in to fetch device details', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      this.fetchingDetails = false;
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // FIXED: Correct URL construction
    const url = `${this.deviceBaseUrl}/by-serial/${encodeURIComponent(deviceSerial)}`;
    
    console.log('Fetching device details from:', url);
    
    this.http.get(url, { headers }).subscribe({
      next: (response: any) => {
        this.fetchingDetails = false;
        
        if (response) {
          // Fill the form fields with the retrieved data
          this.form.patchValue({
            locationName: response.locationName || '',
            approachRoadName: response.approachRoad || '' // Note: approachRoad in DTO
          });
          
          this.snackBar.open('✅ Device details loaded successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          
          console.log('Device details loaded:', response);
        } else {
          this.snackBar.open('⚠️ Device found but no location data available', 'Close', {
            duration: 3000,
            panelClass: ['warning-snackbar']
          });
        }
      },
      error: (err) => {
        this.fetchingDetails = false;
        console.error('Error fetching device details:', err);

        let errorMessage = '❌ Failed to fetch device details. Please check the serial number.';
        
        if (err.status === 404) {
          errorMessage = '❌ Device not found. Please check the serial number.';
        } else if (err.status === 401) {
          errorMessage = '❌ Authentication failed. Please log in again.';
        } else if (err.status === 403) {
          errorMessage = '❌ You do not have permission to access device details.';
        } else if (err.status === 500) {
          errorMessage = '❌ Server error while fetching device details.';
        } else if (err.error?.message) {
          errorMessage = `❌ ${err.error.message}`;
        }

        this.snackBar.open(errorMessage, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  /** Auto-fetch details when user leaves serial field (optional) */
  onSerialBlur() {
    const deviceSerial = this.form.get('deviceSerial')?.value?.trim();
    const locationName = this.form.get('locationName')?.value;
    const approachRoad = this.form.get('approachRoadName')?.value;
    
    // Only auto-fetch if serial is provided and location fields are empty
    if (deviceSerial && (!locationName || !approachRoad)) {
      // Small delay to let user finish typing
      setTimeout(() => {
        this.getDeviceDetails();
      }, 500);
    }
  }

  /** Submit request to backend */
  submit() {
    if (this.form.invalid) {
      this.markFormGroupTouched();
      this.snackBar.open('⚠️ Please fill all required fields correctly.', 'Close', {
        duration: 3000,
        panelClass: ['warning-snackbar']
      });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.snackBar.open('❌ You must log in before submitting a request.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.submitting = true;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Prepare payload matching your API structure
    const requestPayload = {
      deviceSerial: this.form.value.deviceSerial.trim(),
      newSerial: this.form.value.newSerial?.trim() || null,
      requestType: this.form.value.requestType,
      locationName: this.form.value.locationName.trim(),
      approachRoadName: this.form.value.approachRoadName.trim(),
      remarks: this.form.value.remarks?.trim() || null
    };

    console.log('Submitting maintenance request:', requestPayload);

    this.http.post(this.baseUrl, requestPayload, { headers }).subscribe({
      next: (response: any) => {
        this.snackBar.open('✅ Maintenance request submitted successfully!', 'Close', {
          duration: 4000,
          panelClass: ['success-snackbar']
        });
        this.submitting = false;
        this.form.reset();
        this.router.navigate(['/all-requests']);
      },
      error: (err) => {
        console.error('Error submitting request:', err);

        let errorMessage = '❌ Failed to submit request. Please try again.';
        if (err.status === 400) {
          if (err.error?.message) {
            errorMessage = `❌ ${err.error.message}`;
          } else {
            errorMessage = '❌ Invalid request data. Please check your inputs.';
          }
        } else if (err.status === 401) {
          errorMessage = '❌ Authentication failed. Please log in again.';
        } else if (err.status === 403) {
          errorMessage = '❌ You do not have permission to submit requests.';
        } else if (err.status === 404) {
          errorMessage = '❌ Device not found. Please check the Device Serial.';
        } else if (err.status === 409) {
          errorMessage = '❌ A request for this device is already pending.';
        } else if (err.error?.message) {
          errorMessage = `❌ ${err.error.message}`;
        }

        this.snackBar.open(errorMessage, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.submitting = false;
      }
    });
  }

  /** Cancel and navigate back */
  cancel() {
    if (this.form.dirty) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
      if (!confirm) return;
    }
    this.router.navigate(['/dashboard']);
  }

  /** Mark all form controls as touched to trigger validation messages */
  private markFormGroupTouched() {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  /** Helper method to check if new serial is recommended */
  isNewSerialRecommended(): boolean {
    const requestType = this.form.get('requestType')?.value;
    return requestType === 'SERIAL_UPDATE' || requestType === 'REPLACE';
  }

  /** Get request type description */
  getRequestTypeDescription(type: string): string {
    const descriptions: { [key: string]: string } = {
      'FAULT': 'Device is faulty and needs attention',
      'REPAIR': 'Device needs repair work',
      'REPLACE': 'Device needs to be replaced with a new one',
      'SERIAL_UPDATE': 'Update device serial number',
      'MOVE': 'Relocate device to different location'
    };
    return descriptions[type] || '';
  }
}