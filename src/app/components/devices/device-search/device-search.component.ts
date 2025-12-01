import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { DevicesService } from '../../../services/devices.service';
import { LocationsService } from '../../../services/locations.service';
import { InventoryItem } from '../../../models/inventory-item';

@Component({
  standalone: true,
  selector: 'app-device-search',
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatOptionModule,
  ],
  template: `
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
  `,
  styles: [`
    .inventory-card {
      max-width: 900px;
      margin: 40px auto;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 6px 16px rgba(0,0,0,0.1);
    }
    h2 {
      text-align: center;
      font-weight: 600;
      color: #1565c0;
      margin-bottom: 24px;
    }
    .filters {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
    .filter-field {
      width: 220px;
    }
    button {
      height: 56px;
      min-width: 140px;
      font-weight: 600;
    }
    .spinner {
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .virt-table {
      margin-top: 12px;
    }
    .virt-header, .virt-row {
      display: grid;
      align-items: center;
      padding: 8px 12px;
    }
    .virt-header {
      font-weight: 600;
      background: #f1f3f6;
      border-bottom: 2px solid #ddd;
    }
    .virt-row {
      border-bottom: 1px solid #eee;
    }
    .virt-cell {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .virt-viewport {
      height: 320px;
    }
    .no-items {
      text-align: center;
      color: #777;
      font-style: italic;
      margin-top: 20px;
    }
  `],
})
export class DeviceSearchComponent {
  items: InventoryItem[] = [];
  locations: any[] = [];
  location = '';
  type = '';
  status = '';
  loading = false;

  columns = [200, 160, 120, 180, 120];

  get gridTemplate() {
    return this.columns.map((w) => `${w}px`).join(' ');
  }

  constructor(
    private http: HttpClient,
    private locSvc: LocationsService
  ) {}

  ngOnInit() {
    this.locSvc.getAll().subscribe((r) => (this.locations = r || []));
  }

  /** ✅ Real backend call */
  search(): void {
    this.loading = true;

    const params = new URLSearchParams();
    if (this.location) params.append('location', this.location);
    if (this.type) params.append('type', this.type);
    if (this.status) params.append('status', this.status);

    const url = `http://localhost:8080/api/devices/search?${params.toString()}`;

    this.http.get<InventoryItem[]>(url).subscribe({
      next: (data) => {
        this.items = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching devices:', err);
        this.loading = false;
      },
    });
  }

  trackById(i: number, it: InventoryItem) {
    return it.id ?? i;
  }
}
