import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryItem } from '../../../models/inventory-item';
import { AuthService } from '../../../services/auth.service';

// Angular Material imports
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  standalone: true,
  selector: 'app-inventory-list',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatPaginatorModule,
  ],
  template: `
    <div class="page-container">
      <div class="summary-cards" *ngIf="items.length > 0">
        <mat-card class="summary-card total-card">
          <mat-card-content>
            <div class="summary-content">
              <mat-icon class="summary-icon">devices</mat-icon>
              <div class="summary-text">
                <div class="summary-number">{{ items.length }}</div>
                <div class="summary-label">Total Devices</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="summary-card active-card">
          <mat-card-content>
            <div class="summary-content">
              <mat-icon class="summary-icon">check_circle</mat-icon>
              <div class="summary-text">
                <div class="summary-number">{{ getActiveDevicesCount() }}</div>
                <div class="summary-label">Active</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="summary-card poles-card">
          <mat-card-content>
            <div class="summary-content">
              <mat-icon class="summary-icon">electric_bolt</mat-icon>
              <div class="summary-text">
                <div class="summary-number">{{ getPolesCount() }}</div>
                <div class="summary-label">Poles</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="summary-card ecb-card">
          <mat-card-content>
            <div class="summary-content">
              <mat-icon class="summary-icon">security</mat-icon>
              <div class="summary-text">
                <div class="summary-number">{{ getECBCount() }}</div>
                <div class="summary-label">ECB Present</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-card class="inventory-card mat-elevation-z4">
        <h2>Device Inventory</h2>

        <!-- 🔍 Filters -->
        <div class="filters-container">
          <div class="filters">
            <!-- Search by location name or serial -->
            <mat-form-field appearance="fill" class="filter-field">
              <mat-label>Search</mat-label>
              <input
                matInput
                placeholder="Search location or serial"
                [(ngModel)]="query"
                (input)="onFilterChange()"
              />
            </mat-form-field>

            <!-- Filter by Location -->
            <mat-form-field appearance="fill" class="filter-field">
              <mat-label>Location</mat-label>
              <mat-select [(ngModel)]="selectedLocation" (selectionChange)="onFilterChange()">
                <mat-option value="" class="options-select">All Locations</mat-option>
                <mat-option class="options-select" *ngFor="let loc of locations" [value]="loc">
                  {{ loc }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <!-- Filter by Device Type -->
            <mat-form-field appearance="fill" class="filter-field">
              <mat-label>Device Type</mat-label>
              <mat-select [(ngModel)]="selectedType" (selectionChange)="onFilterChange()">
                <mat-option value="" class="options-select">All Types</mat-option>
                <mat-option class="options-select" *ngFor="let type of deviceTypes" [value]="type">
                  {{ type }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <!-- Filter by Status -->
            <mat-form-field appearance="fill" class="filter-field">
              <mat-label>Status</mat-label>
              <mat-select [(ngModel)]="selectedStatus" (selectionChange)="onFilterChange()">
                <mat-option value="" class="options-select">All Status</mat-option>
                <mat-option class="options-select" *ngFor="let status of statuses" [value]="status">
                  {{ status }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <!-- 🧹 Reset Filters -->
            <button mat-raised-button class="reset-btn" (click)="resetFilters()">
              Reset Filters
            </button>
          </div>
        </div>

        <!-- 🧾 Table -->
        <div class="table-full-container">
          <table mat-table [dataSource]="paginatedItems" class="full-width-table">

            <!-- Location Name -->
            <ng-container matColumnDef="locationName">
              <th mat-header-cell *matHeaderCellDef>Location Name</th>
              <td mat-cell *matCellDef="let item">{{ item.locationName || 'N/A' }}</td>
            </ng-container>

            <!-- Serial Number -->
            <ng-container matColumnDef="serialNumber">
              <th mat-header-cell *matHeaderCellDef>Serial No.</th>
              <td mat-cell *matCellDef="let item">{{ item.serialNumber || 'N/A' }}</td>
            </ng-container>

            <!-- Device Type -->
            <ng-container matColumnDef="deviceType">
              <th mat-header-cell *matHeaderCellDef>Device Type</th>
              <td mat-cell *matCellDef="let item">{{ item.deviceType || 'N/A' }}</td>
            </ng-container>

            <!-- Status -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let item">
                <span [class]="'status-badge status-' + (item.status?.toLowerCase() || 'unknown')">
                  {{ item.status || 'Unknown' }}
                </span>
              </td>
            </ng-container>

            <!-- Poles -->
            <ng-container matColumnDef="poles">
              <th mat-header-cell *matHeaderCellDef>Poles</th>
              <td mat-cell *matCellDef="let item">
                {{ item.poles ? 'Yes' : 'No' }}
              </td>
            </ng-container>

            <!-- ECB Present -->
            <ng-container matColumnDef="ecbPresent">
              <th mat-header-cell *matHeaderCellDef>ECB Present</th>
              <td mat-cell *matCellDef="let item">
                {{ item.ecbPresent ? 'Yes' : 'No' }}
              </td>
            </ng-container>

            <!-- Approach Road -->
            <ng-container matColumnDef="approachRoad">
              <th mat-header-cell *matHeaderCellDef>Approach Road</th>
              <td mat-cell *matCellDef="let item">{{ item.approachRoad || 'N/A' }}</td>
            </ng-container>

            <!-- Coordinates -->
          <ng-container matColumnDef="coordinates">
              <th mat-header-cell *matHeaderCellDef>Coordinates</th>
              <td mat-cell *matCellDef="let d" class="coordinates-cell">
                <div *ngIf="d.latitude && d.longitude; else noCoords">
                  <small>Lat: {{ d.latitude | number:'1.4-4' }}</small><br>
                  <small>Lng: {{ d.longitude | number:'1.4-4' }}</small>
                </div>
                <ng-template #noCoords>
                  <span class="no-data">No coordinates</span>
                </ng-template>
              </td>
            </ng-container>

            <!-- Actions (only for admin) -->
            <ng-container *ngIf="isAdmin" matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let item">
                <button mat-icon-button color="accent" (click)="edit(item.id)" matTooltip="Edit">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="primary" (click)="viewHistory(item.id)" matTooltip="View History">
                  <mat-icon>history</mat-icon>
                </button>
              </td>
            </ng-container>

            <!-- Header + Rows -->
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>

          <div *ngIf="filteredItems.length === 0" class="no-items">
            {{ items.length === 0 ? 'Loading devices...' : 'No devices found matching your filters.' }}
          </div>
        </div>

        <!-- Pagination -->
        <mat-paginator
          *ngIf="filteredItems.length > 0"
          [length]="filteredItems.length"
          [pageSize]="pageSize"
          [pageIndex]="pageIndex"
          [pageSizeOptions]="[10, 25, 50, 100]"
          (page)="onPageChange($event)"
          showFirstLastButtons
          class="paginator">
        </mat-paginator>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .page-container {
        width: 100%;
        padding: 20px;
        background: #f5f5f5;
        min-height: 100vh;
        box-sizing: border-box;
      }

      .inventory-card {
        padding: 20px;
        width: 100%;
        border-radius: 8px;
        box-sizing: border-box;
      }

      .summary-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
      }

      .summary-card {
        border-radius: 8px;
        transition: transform 0.2s ease;
      }

      .summary-card:hover {
        transform: translateY(-2px);
      }

      .summary-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }
 .options-select{
      text-color: #6610f2;
      font-weight: 500;
      background-color: #f8f9fa !important;      }

      .summary-icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
      }

      .summary-text {
        display: flex;
        flex-direction: column;
      }

      .summary-number {
        font-size: 24px;
        font-weight: bold;
        line-height: 1;
      }

      .summary-label {
        font-size: 14px;
        color: #f0f0f0;
      }

      .total-card {
        background: linear-gradient(135deg, #2196F3, #1976D2);
        color: white;
      }

      .active-card {
        background: linear-gradient(135deg, #4CAF50, #388E3C);
        color: white;
      }

      .poles-card {
        background: linear-gradient(135deg, #FF9800, #F57C00);
        color: white;
      }

      .ecb-card {
        background: linear-gradient(135deg, #9C27B0, #7B1FA2);
        color: white;
      }

      h2 {
        margin-bottom: 20px;
        font-weight: 600;
        color: #3f51b5;
        text-align: center;
      }

      .filters-container {
        background: #ffffff;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;
        border: 1px solid #e0e0e0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .filters {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        align-items: center;
      }

      .filter-field {
        min-width: 200px;
        flex: 1;
      }

      /* Solid backgrounds for form fields */
      ::ng-deep .filters-container .mat-form-field-appearance-fill .mat-form-field-flex {
        background-color: #f5f5f5 !important;
        border-radius: 4px !important;
        border: 1px solid #e0e0e0 !important;
      }

      ::ng-deep .filters-container .mat-form-field-appearance-fill .mat-form-field-underline {
        display: none !important;
      }

      ::ng-deep .filters-container .mat-select-value {
        background-color: #f5f5f5 !important;
      }

      ::ng-deep .filters-container .mat-form-field-infix {
        background-color: #f5f5f5 !important;
      }

      ::ng-deep .filters-container input {
        background-color: #f5f5f5 !important;
      }

      ::ng-deep .mat-select-panel {
        background: white !important;
        border: 2px solid #ccc !important;
      }

      ::ng-deep .mat-option {
        background: white !important;
      }

      ::ng-deep .mat-option:hover:not(.mat-option-disabled) {
        background: #f0f0f0 !important;
      }

      ::ng-deep .mat-option.mat-selected {
        background: #e3f2fd !important;
        color: #1976d2 !important;
      }

      .reset-btn {
        background: linear-gradient(135deg, #ef5350, #e53935);
        color: white;
        font-weight: 600;
        border-radius: 8px;
        padding: 0 16px;
        display: flex;
        align-items: center;
        gap: 6px;
        height: 48px;
        transition: all 0.3s ease;
        box-shadow: 0 3px 8px rgba(244, 67, 54, 0.25);
        white-space: nowrap;
        margin-top: 4px;
      }

      .reset-btn:hover {
        transform: translateY(-2px);
        background: linear-gradient(135deg, #e53935, #d32f2f);
      }

      .table-full-container {
        width: 100%;
        max-height: 600px;
        overflow-y: auto;
        overflow-x: auto;
        border-radius: 8px;
        background: #fff;
        border: 1px solid #e0e0e0;
        margin-bottom: 16px;
      }

      .full-width-table {
        width: 100%;
        min-width: 100%;
        border-spacing: 0;
        border-collapse: collapse;
      }

      th.mat-header-cell {
        position: sticky;
        top: 0;
        background: #5687b8;
        font-weight: 600;
        font-size: 14px;
        color: #fff;
        text-transform: uppercase;
        border-bottom: 2px solid #e0e0e0;
        z-index: 1;
        padding: 12px 8px;
        white-space: nowrap;
      }

      td.mat-cell {
        font-size: 14px;
        color: #333;
        border-bottom: 1px solid #eaeaea;
        padding: 12px 8px;
        white-space: nowrap;
      }

      tr:hover {
        background-color: #e3f2fd;
        transition: background-color 0.2s ease;
      }

      .no-items {
        text-align: center;
        color: #777;
        padding: 40px 20px;
        font-size: 16px;
      }

      .status-badge {
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
        text-transform: capitalize;
      }

      .status-active, .status-installed {
        background: #e8f5e8;
        color: #2e7d32;
      }

      .status-inactive {
        background: #ffebee;
        color: #c62828;
      }

      .status-maintenance {
        background: #fff3e0;
        color: #ef6c00;
      }

      .status-unknown {
        background: #f5f5f5;
        color: #666;
      }

      .paginator {
        border-radius: 8px;
        background: #fafafa;
        border: 1px solid #e0e0e0;
        width: 100%;
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .page-container {
          padding: 15px;
        }

        .summary-cards {
          grid-template-columns: repeat(2, 1fr);
        }

        .filters {
          flex-direction: column;
          align-items: stretch;
        }

        .filter-field {
          min-width: auto;
          width: 100%;
        }

        .reset-btn {
          width: 100%;
          justify-content: center;
        }

        th.mat-header-cell,
        td.mat-cell {
          padding: 8px 4px;
          font-size: 12px;
        }
      }

      @media (max-width: 480px) {
        .summary-cards {
          grid-template-columns: 1fr;
        }

        .table-full-container {
          max-height: 500px;
        }
      }
    `,
  ],
})
export class InventoryListComponent implements OnInit {
  items: InventoryItem[] = [];
  filteredItems: InventoryItem[] = [];
  paginatedItems: InventoryItem[] = [];
  query: string = '';
  selectedLocation: string = '';
  selectedType: string = '';
  selectedStatus: string = '';
  isAdmin = false;
  displayedColumns: string[] = [];

  // Pagination
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50, 100];

  // Device types based on your backend data
  deviceTypes: string[] = ['ANPR', 'RLVD', 'PTZ', 'FIXED', 'ANALYTICAL'];

  // Status options from your backend data
  statuses: string[] = ['Installed', 'Active', 'Inactive', 'Maintenance'];

  constructor(
    private inventory: InventoryService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loadInventory();
    this.isAdmin = this.auth.isAdmin();
    this.setDisplayedColumns();
  }

  private loadInventory() {
    this.inventory.getAll().subscribe({
      next: (data) => {
        this.items = data || [];
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading inventory:', error);
        this.items = [];
        this.filteredItems = [];
        this.updatePaginatedItems();
      }
    });
  }

  private setDisplayedColumns() {
    const baseColumns = [
      'locationName',
      'serialNumber',
      'deviceType',
      'status',
      'poles',
      'ecbPresent',
      'approachRoad',
      'coordinates'
    ];

    if (this.isAdmin) {
      this.displayedColumns = [...baseColumns, 'actions'];
    } else {
      this.displayedColumns = baseColumns;
    }
  }

  onFilterChange() {
    this.applyFilters();
  }

  resetFilters() {
    this.query = '';
    this.selectedLocation = '';
    this.selectedType = '';
    this.selectedStatus = '';
    this.pageIndex = 0;
    this.applyFilters();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedItems();
  }

  /** Apply Filters */
  private applyFilters() {
    const q = (this.query || '').toLowerCase().trim();

    this.filteredItems = this.items.filter((item) => {
      const matchesQuery =
        !q ||
        (item.locationName?.toLowerCase().includes(q) ?? false) ||
        (item.serialNumber?.toLowerCase().includes(q) ?? false) ||
        (item.approachRoad?.toLowerCase().includes(q) ?? false);

      const matchesLocation =
        !this.selectedLocation || item.locationName === this.selectedLocation;

      const matchesType =
        !this.selectedType || item.deviceType === this.selectedType;

      const matchesStatus =
        !this.selectedStatus || item.status === this.selectedStatus;

      return matchesQuery && matchesLocation && matchesType && matchesStatus;
    });

    this.pageIndex = 0; // Reset to first page when filters change
    this.updatePaginatedItems();
  }

  private updatePaginatedItems() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedItems = this.filteredItems.slice(startIndex, endIndex);
  }

  /** Unique Locations */
  get locations(): string[] {
    const locations = this.items
      .map((i) => i.locationName)
      .filter((loc): loc is string => Boolean(loc && loc.trim()));

    return Array.from(new Set(locations)).sort();
  }

  edit(id?: string) {
    if (id) {
      this.router.navigate(['/admin/items', id, 'edit']);
    }
  }

  viewHistory(id?: string) {
    if (id) {
      this.router.navigate(['/devices', id, 'history']);
    }
  }

  /** Count active devices */
  getActiveDevicesCount(): number {
    return this.items.filter(device =>
      device.status?.toLowerCase() === 'active' ||
      device.status?.toLowerCase() === 'installed'
    ).length;
  }

  /** Count devices with poles */
  getPolesCount(): number {
    return this.items.filter(device => device.poles).length;
  }

  /** Count devices with ECB present */
  getECBCount(): number {
    return this.items.filter(device => device.ecbPresent).length;
  }
}