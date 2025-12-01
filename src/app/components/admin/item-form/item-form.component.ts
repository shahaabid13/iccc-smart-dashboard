import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryItemPayload } from '../../../models/inventory-item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatProgressSpinnerModule],
  selector: 'app-item-form',
  template: `
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
  `,
  styles: [`
    .item-form {
      max-width: 600px;
      margin: 20px auto;
      padding: 30px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    h2 {
      text-align: center;
      color: #1976d2;
      margin-bottom: 24px;
      font-weight: 600;
      font-size: 24px;
    }
    
    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    label {
      display: flex;
      flex-direction: column;
      font-weight: 600;
      color: #333;
      font-size: 14px;
    }
    
    input, select {
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      margin-top: 6px;
      transition: border-color 0.3s ease;
      background: #fafafa;
    }
    
    input:focus, select:focus {
      outline: none;
      border-color: #1976d2;
      background: white;
    }
    
    .coordinates-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    
    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin: 15px 0;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e9ecef;
    }
    
    .checkbox {
      flex-direction: row;
      align-items: center;
      gap: 10px;
      font-weight: normal;
      cursor: pointer;
    }
    
    .checkbox input[type="checkbox"] {
      margin: 0;
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    
    .buttons {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
    
    .btn {
      padding: 12px 24px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 120px;
      justify-content: center;
    }
    
    .btn.primary {
      background-color: #1976d2;
      color: #fff;
    }
    
    .btn.primary:hover:not(:disabled) {
      background-color: #1565c0;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(25, 118, 210, 0.3);
    }
    
    .btn.secondary {
      background-color: #f5f5f5;
      color: #333;
      border: 1px solid #ddd;
    }
    
    .btn.secondary:hover:not(:disabled) {
      background-color: #e0e0e0;
    }
    
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
    }
    
    .error {
      color: #d32f2f;
      font-size: 12px;
      margin-top: 4px;
      font-weight: normal;
    }
    
    .spinner {
      display: inline-block;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
      .item-form {
        margin: 10px;
        padding: 20px;
      }
      
      .coordinates-group {
        grid-template-columns: 1fr;
      }
      
      .buttons {
        flex-direction: column;
      }
      
      .btn {
        width: 100%;
      }
    }
  `]
})
export class ItemFormComponent {
  form!: FormGroup;
  isEdit = false;
  submitting = false;
  private itemId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private inventory: InventoryService,
    private snackBar: MatSnackBar
  ) {
    this.initializeForm();

    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) {
      this.isEdit = true;
      this.loadItem(this.itemId);
    }
  }

  /** Initialize the form with proper validation */
  private initializeForm() {
    this.form = this.fb.group({
      locationName: ['', [Validators.required, Validators.minLength(2)]],
      serialNumber: ['', [Validators.required, Validators.minLength(2)]],
      deviceType: ['', Validators.required],
      status: ['Installed', Validators.required],
      latitude: ['', [Validators.required, Validators.pattern(/^-?([0-8]?[0-9]|90)(\.[0-9]{1,6})?$/)]],
      longitude: ['', [Validators.required, Validators.pattern(/^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,6})?$/)]],
      approachRoad: [''],
      poles: [false],
      ecbPresent: [false],
      placeholder: [false]
    });
  }

  /** Load item details for edit mode */
  private loadItem(id: string) {
    this.inventory.getById(id).subscribe({
      next: (item) => {
        if (item) {
          this.form.patchValue({
            locationName: item.locationName || '',
            serialNumber: item.serialNumber || '',
            deviceType: item.deviceType || '',
            status: item.status || 'Installed',
            latitude: item.latitude || '',
            longitude: item.longitude || '',
            // If approachRoad is an object from backend, patch the name; otherwise use string
            approachRoad: (item.approachRoad && typeof item.approachRoad === 'object')
              ? ((item.approachRoad as any).name || '')
              : (item.approachRoad || ''),
            poles: item.poles || false,
            ecbPresent: item.ecbPresent || false,
            placeholder: item.placeholder || false
          });
        }
      },
      error: (err) => {
        console.error('Failed to load item:', err);
        this.snackBar.open('❌ Failed to load device details', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      },
    });
  }

  /** Create or update device */
  /** Create or update device */
submit() {
  if (this.form.invalid) {
    this.markFormGroupTouched();
    this.snackBar.open('⚠️ Please fill all required fields correctly', 'Close', { duration: 3000 });
    return;
  }

  this.submitting = true;

  const payload: InventoryItemPayload = {
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
    description: undefined,
  };

  const request$ = this.isEdit
    ? this.inventory.update(this.itemId!, payload)
    : this.inventory.create(payload);

  request$.subscribe({
    next: (device: any) => {
      this.submitting = false;
      this.snackBar.open(
        this.isEdit ? '✅ Device updated successfully!' : '✅ Device created successfully!',
        'Close',
        { duration: 4000 }
      );

      // Some backends return a minimal response for create/update. If the returned
      // device is missing `locationName` or `approachRoad`, fetch the full device
      // by id before navigating so the inventory list displays correct data.
      const id = device?.id ?? (device && (device as any).deviceId) ?? null;
      const needsRefresh = !device?.locationName || !device?.approachRoad;

      if (id && needsRefresh) {
        this.inventory.getById(id).subscribe({
          next: () => this.router.navigate(['/admin/inventory']),
          error: () => this.router.navigate(['/admin/inventory'])
        });
      } else {
        this.router.navigate(['/admin/inventory']);
      }
    },
    error: (err) => {
      this.submitting = false;
      console.error(err);
      this.snackBar.open(
        err.error?.message || '❌ Error saving device. Try again.',
        'Close',
        { duration: 5000 }
      );
    }
  });
}


  /** Mark all form controls as touched to show validation errors */
  private markFormGroupTouched() {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.controls[key];
      control.markAsTouched();
    });
  }

  cancel() {
    if (this.form.dirty) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
      if (!confirm) return;
    }
    this.router.navigate(['/admin/inventory']);
  }
}