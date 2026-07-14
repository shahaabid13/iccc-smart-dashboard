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
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

// Export libraries
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
    MatMenuModule,
    MatTooltipModule,
  ],
  template: `
    <div class="page-container">

      <!-- Summary Cards -->
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

        <!-- Card Header with title + export button -->
        <div class="card-top-bar">
          <h2>Device Inventory</h2>
          <div class="card-top-actions">
            <button mat-raised-button color="accent" [matMenuTriggerFor]="exportMenu" class="export-btn">
              <mat-icon>download</mat-icon>
              Export
            </button>
            <mat-menu #exportMenu="matMenu">
              <button mat-menu-item (click)="exportToExcel()">
                <mat-icon>description</mat-icon>
                Export to Excel
              </button>
              <button mat-menu-item (click)="exportToPDF()">
                <mat-icon>picture_as_pdf</mat-icon>
                Export to PDF
              </button>
            </mat-menu>
          </div>
        </div>

        <!-- Filters -->
        <div class="filters-container">
          <div class="filters">
            <!-- Search -->
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
                <mat-option class="options-select" *ngFor="let status of statuses" [value]="status.value">
                  {{ status.label }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <!-- Filter by Notified -->
            <mat-form-field appearance="fill" class="filter-field">
              <mat-label>Notified</mat-label>
              <mat-select [(ngModel)]="notifiedFilter" (selectionChange)="onFilterChange()">
                <mat-option value="" class="options-select">All</mat-option>
                <mat-option value="notified" class="options-select">Notified</mat-option>
                <mat-option value="not_notified" class="options-select">Not Notified</mat-option>
              </mat-select>
            </mat-form-field>

            <!-- Reset Filters -->
            <button mat-raised-button class="reset-btn" (click)="resetFilters()">
              Reset Filters
            </button>
          </div>
        </div>

        <!-- Export info bar -->
        <div class="export-info-bar" *ngIf="isActiveFilter()">
          <mat-icon class="info-icon">filter_list</mat-icon>
          <span>
            Showing {{ filteredItems.length }} of {{ items.length }} devices — export will reflect current filters.
          </span>
        </div>

        <!-- Table -->
        <div class="table-full-container">
          <table mat-table [dataSource]="paginatedItems" class="full-width-table">

            <!-- Location Name -->
            <ng-container matColumnDef="locationName">
              <th mat-header-cell *matHeaderCellDef>Location Name</th>
              <td mat-cell *matCellDef="let item">{{ item.locationName || 'N/A' }}</td>
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

            <!-- Approach Road -->
            <ng-container matColumnDef="approachRoad">
              <th mat-header-cell *matHeaderCellDef>Approach Road</th>
              <td mat-cell *matCellDef="let item">{{ item.approachRoad || 'N/A' }}</td>
            </ng-container>

            <!-- Device Type -->
            <ng-container matColumnDef="deviceType">
              <th mat-header-cell *matHeaderCellDef>Device Type</th>
              <td mat-cell *matCellDef="let item">{{ getDisplayDeviceType(item) }}</td>
            </ng-container>

            <!-- Serial Number -->
            <ng-container matColumnDef="serialNumber">
              <th mat-header-cell *matHeaderCellDef>Serial No.</th>
              <td mat-cell *matCellDef="let item">{{ item.serialNumber || 'N/A' }}</td>
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

            <!-- Notified Column — plain Yes/No, no toggle -->
            <ng-container matColumnDef="notified">
              <th mat-header-cell *matHeaderCellDef>Notified</th>
              <td mat-cell *matCellDef="let item">
                <span [class]="item.notified ? 'notified-yes' : 'notified-no'">
                  {{ item.notified ? 'Yes' : 'No' }}
                </span>
              </td>
            </ng-container>

            <!-- Poles -->
            <ng-container matColumnDef="poles">
              <th mat-header-cell *matHeaderCellDef>Poles</th>
              <td mat-cell *matCellDef="let item">{{ item.poles ? 'Yes' : 'No' }}</td>
            </ng-container>

            <!-- ECB Present -->
            <ng-container matColumnDef="ecbPresent">
              <th mat-header-cell *matHeaderCellDef>ECB Present</th>
              <td mat-cell *matCellDef="let item">{{ item.ecbPresent ? 'Yes' : 'No' }}</td>
            </ng-container>

            <!-- Actions (admin only) -->
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

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>

          <div *ngIf="filteredItems.length === 0" class="no-items">
            {{ items.length === 0 ? 'Loading devices...' : 'No devices found matching your filters.' }}
          </div>
        </div>

        <!-- Pagination -->
        <div class="pagination-container" *ngIf="filteredItems.length > pageSize">
          <div class="pagination-controls">
            <div class="pagination-wrapper">
              <button
                mat-icon-button
                [disabled]="pageIndex === 0"
                (click)="previousPage()"
                class="pagination-nav-btn">
                <mat-icon>chevron_left</mat-icon>
              </button>

              <div class="pagination-pages">
                <button
                  *ngFor="let page of getVisiblePages()"
                  mat-button
                  [class.active]="page.number === pageIndex + 1"
                  [class.ellipsis]="page.isEllipsis"
                  (click)="!page.isEllipsis && goToPage(page.number)"
                  class="pagination-page-btn"
                  [disabled]="page.isEllipsis">
                  {{ page.display }}
                </button>
              </div>

              <button
                mat-icon-button
                [disabled]="pageIndex === totalPages - 1"
                (click)="nextPage()"
                class="pagination-nav-btn">
                <mat-icon>chevron_right</mat-icon>
              </button>
            </div>

            <div class="pagination-info">
              Page {{ pageIndex + 1 }} of {{ totalPages }} &bull; {{ filteredItems.length }} total devices
            </div>
          </div>
        </div>

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

      /* ── Card top bar: title + export button ── */
      .card-top-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        flex-wrap: wrap;
        gap: 12px;
      }

      .card-top-bar h2 {
        margin: 0;
        font-weight: 600;
        color: #3f51b5;
      }

      .card-top-actions {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      .export-btn {
        border-radius: 8px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 4px;
      }

      /* ── Export info banner ── */
      .export-info-bar {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #e3f2fd;
        border: 1px solid #90caf9;
        border-radius: 6px;
        padding: 8px 14px;
        margin-bottom: 16px;
        font-size: 13px;
        color: #1565c0;
      }

      .info-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        color: #1976d2;
      }

      /* ── Summary cards ── */
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

      .options-select {
        font-weight: 500;
        background-color: #f8f9fa !important;
      }

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

      .total-card  { background: linear-gradient(135deg, #2196F3, #1976D2); color: white; }
      .active-card { background: linear-gradient(135deg, #4CAF50, #388E3C); color: white; }
      .poles-card  { background: linear-gradient(135deg, #FF9800, #F57C00); color: white; }
      .ecb-card    { background: linear-gradient(135deg, #9C27B0, #7B1FA2); color: white; }

      /* ── Filters ── */
      .filters-container {
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
        min-width: 180px;
        flex: 1;
      }

      ::ng-deep .filters-container .mat-form-field-appearance-fill .mat-form-field-flex {
        border-radius: 4px !important;
        border: 1px solid #e0e0e0 !important;
      }

      ::ng-deep .filters-container .mat-form-field-appearance-fill .mat-form-field-underline {
        display: none !important;
      }

      ::ng-deep .mat-select-panel {
        background: white !important;
        border: 2px solid #523e3e !important;
      }

      ::ng-deep .mat-option { background: white !important; }

      ::ng-deep .mat-option:hover:not(.mat-option-disabled) {
        background: #462f2f !important;
      }

      ::ng-deep .mat-option.mat-selected {
        background: #e3f2fd !important;
        color: #253b52 !important;
      }

      .reset-btn {
        background: linear-gradient(135deg, #f3e8e8, #ecdfdf);
        color: #555;
        font-weight: 600;
        border-radius: 8px;
        padding: 0 16px;
        display: flex;
        align-items: center;
        gap: 6px;
        height: 48px;
        transition: all 0.3s ease;
        white-space: nowrap;
        margin-top: 4px;
      }

      .reset-btn:hover {
        transform: translateY(-2px);
        background: linear-gradient(135deg, #ddc5c5, #e6d1d1);
      }

      /* ── Table ── */
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

      tr:hover { background-color: #e3f2fd; transition: background-color 0.2s ease; }

      .no-items {
        text-align: center;
        color: #777;
        padding: 40px 20px;
        font-size: 16px;
      }

      /* ── Status badge ── */
      .status-badge {
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
        text-transform: capitalize;
      }

      .status-active, .status-installed { background: #e8f5e8; color: #2e7d32; }
      .status-inactive                  { background: #ffebee; color: #c62828; }
      .status-maintenance               { background: #fff3e0; color: #ef6c00; }
      .status-unknown                   { background: #f5f5f5; color: #666; }

      /* ── Notified Yes / No badges ── */
      .notified-yes {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
        background: #e8f5e9;
        color: #2e7d32;
      }

      .notified-no {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
        background: #ffebee;
        color: #c62828;
      }

      /* ── Pagination ── */
      .pagination-container {
        margin-top: 16px;
        padding: 16px;
        background: #ffffff;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
      }

      .pagination-controls {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .pagination-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .pagination-pages {
        display: flex;
        gap: 4px;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      }

      .pagination-page-btn {
        min-width: 36px;
        height: 36px;
        padding: 0;
        font-size: 14px;
        border-radius: 4px;
        transition: all 0.2s ease;
      }

      .pagination-page-btn.active {
        background-color: #5687b8 !important;
        color: #ffffff !important;
        font-weight: 600;
      }

      .pagination-page-btn:not(.active):not(.ellipsis):hover:not([disabled]) {
        background-color: #f0f0f0;
      }

      .pagination-page-btn.ellipsis {
        min-width: auto;
        cursor: default;
      }

      .pagination-info {
        text-align: center;
        font-size: 13px;
        color: #666;
        font-weight: 500;
      }

      /* ── Responsive ── */
      @media (max-width: 768px) {
        .page-container { padding: 15px; }
        .summary-cards  { grid-template-columns: repeat(2, 1fr); }
        .filters        { flex-direction: column; align-items: stretch; }
        .filter-field   { min-width: auto; width: 100%; }
        .reset-btn      { width: 100%; justify-content: center; }
        .card-top-bar   { flex-direction: column; align-items: flex-start; }

        th.mat-header-cell,
        td.mat-cell { padding: 8px 4px; font-size: 12px; }
      }

      @media (max-width: 480px) {
        .summary-cards       { grid-template-columns: 1fr; }
        .table-full-container { max-height: 500px; }
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
  notifiedFilter: string = '';

  isAdmin = false;
  displayedColumns: string[] = [];

  /** Map to store display device types with numbering */
  deviceTypeMap = new Map<string, string>();

  // Pagination
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50, 100];

  deviceTypes: string[] = ['ANPR', 'RLVD', 'PTZ', 'FIXED', 'ANALYTICAL'];

  statuses: Array<{ value: string; label: string }> = [
    { value: 'Installed',    label: 'Installed'    },
    { value: 'Active',       label: 'Active'       },
    { value: 'Inactive',     label: 'Inactive'     },
    { value: 'Maintenance',  label: 'Maintenance'  },
    { value: 'Fault',        label: 'Faulty'       },
    { value: 'Under Repair', label: 'Under Repair' },
    { value: 'Moved',        label: 'Moved'        },
    { value: 'Relocated',    label: 'Relocated'    },
  ];

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

  // ─── Data loading ───────────────────────────────────────────────────────────

 private loadInventory() {
  this.inventory.getAll().subscribe({
    next: (data) => {
      // transformDevice() in service already coerces all booleans — just sort
      this.items = (data || []).sort((a, b) => {
        const locCompare = (a.locationName || '').toLowerCase()
          .localeCompare((b.locationName || '').toLowerCase());
        if (locCompare !== 0) return locCompare;
        return (a.approachRoad || '').toLowerCase()
          .localeCompare((b.approachRoad || '').toLowerCase());
      });
      this.applyFilters();
    },
    error: (error) => {
      console.error('Error loading inventory:', error);
      this.items = [];
      this.filteredItems = [];
      this.updatePaginatedItems();
    },
  });
}

  private setDisplayedColumns() {
    const baseColumns = [
      'locationName',
      'coordinates',
      'approachRoad',
      'deviceType',
      'serialNumber',
      'status',
      'notified',
      'poles',
      'ecbPresent',
    ];
    this.displayedColumns = this.isAdmin ? [...baseColumns, 'actions'] : baseColumns;
  }

  // ─── Filters ────────────────────────────────────────────────────────────────

  onFilterChange() {
    this.applyFilters();
  }

  resetFilters() {
    this.query = '';
    this.selectedLocation = '';
    this.selectedType = '';
    this.selectedStatus = '';
    this.notifiedFilter = '';
    this.pageIndex = 0;
    this.applyFilters();
  }

  /** Returns true when at least one filter is active */
  isActiveFilter(): boolean {
    return !!(this.query || this.selectedLocation || this.selectedType ||
              this.selectedStatus || this.notifiedFilter);
  }

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

      const matchesNotified =
        !this.notifiedFilter ||
        (this.notifiedFilter === 'notified'     &&  !!item.notified) ||
        (this.notifiedFilter === 'not_notified' && !item.notified);

      return matchesQuery && matchesLocation && matchesType && matchesStatus && matchesNotified;
    });

    this.applyDeviceTypeNumbering(this.filteredItems);
    this.pageIndex = 0;
    this.updatePaginatedItems();
  }

  // ─── Device-type display numbering ──────────────────────────────────────────

  private applyDeviceTypeNumbering(items: InventoryItem[]) {
    this.deviceTypeMap.clear();
    const countByLocationRoad = new Map<string, Map<string, number>>();

    items.forEach((item) => {
      const location     = item.locationName  || 'Unknown';
      const approachRoad = item.approachRoad  || 'Unknown';
      const baseType     = item.deviceType    || 'Unknown';
      const locationRoadKey = `${location}|||${approachRoad}`;

      if (!countByLocationRoad.has(locationRoadKey)) {
        countByLocationRoad.set(locationRoadKey, new Map());
      }

      const typeCountMap   = countByLocationRoad.get(locationRoadKey)!;
      const currentCount   = (typeCountMap.get(baseType) || 0) + 1;
      typeCountMap.set(baseType, currentCount);

      const itemKey      = `${item.id || item.serialNumber}`;
      const hasDupes     = this.hasMoreDuplicatesInGroup(items, location, approachRoad, baseType);
      const displayType  = (currentCount > 1 || hasDupes) ? `${baseType} ${currentCount}` : baseType;

      this.deviceTypeMap.set(itemKey, displayType);
    });
  }

  private hasMoreDuplicatesInGroup(
    items: InventoryItem[], location: string, approachRoad: string, deviceType: string
  ): boolean {
    return items.filter(
      item => item.locationName === location &&
              item.approachRoad === approachRoad &&
              item.deviceType   === deviceType
    ).length > 1;
  }

  getDisplayDeviceType(item: InventoryItem): string {
    const itemKey = `${item.id || item.serialNumber}`;
    return this.deviceTypeMap.get(itemKey) || item.deviceType || 'N/A';
  }

  // ─── Export ─────────────────────────────────────────────────────────────────

  /** Build a human-readable label describing active filters, used in report headers */
  private getFilterDescription(): string {
    const parts: string[] = [];
    if (this.query)           parts.push(`Search: "${this.query}"`);
    if (this.selectedLocation) parts.push(`Location: ${this.selectedLocation}`);
    if (this.selectedType)    parts.push(`Type: ${this.selectedType}`);
    if (this.selectedStatus)  parts.push(`Status: ${this.selectedStatus}`);
    if (this.notifiedFilter)  parts.push(`Notified: ${this.notifiedFilter === 'notified' ? 'Yes' : 'No'}`);
    return parts.length ? parts.join(' | ') : 'All devices';
  }

  /** Format date as dd/mm/yy (sep optional) */
  private formatShortDate(date: Date, sep: string = '/'): string {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);
    return `${dd}${sep}${mm}${sep}${yy}`;
  }

  /** Map filteredItems to flat export rows */
  private prepareExportData(): any[] {
    return this.filteredItems.map((item) => ({
      'Location Name':  item.locationName  || 'N/A',
      'Approach Road':  item.approachRoad  || 'N/A',
      'Device Type':    this.getDisplayDeviceType(item),
      'Serial Number':  item.serialNumber  || 'N/A',
      'Status':         item.status        || 'Unknown',
      'Notified':       item.notified      ? 'Yes' : 'No',
      'Poles':          item.poles         ? 'Yes' : 'No',
      'ECB Present':    item.ecbPresent    ? 'Yes' : 'No',
      'Latitude':       item.latitude      || 'N/A',
      'Longitude':      item.longitude     || 'N/A',
    }));
  }

  exportToExcel() {
  try {
    // ── 1. Group filteredItems by location then approach road ──────────────
    type GroupedData = {
      slNo: number;
      location: string;
      approachRoad: string;
      lat: string;
      lng: string;
      rlvd: string[];
      anpr1: string[];
      anpr2: string[];
      anpr3: string[];
      analytical: string[];
      ptz: string[];
    };

    const locationOrder: string[] = [];
    const locationMap = new Map<string, Map<string, GroupedData>>();

    this.filteredItems.forEach(item => {
      const loc  = item.locationName || 'Unknown';
      const road = item.approachRoad  || '';

      if (!locationMap.has(loc)) {
        locationMap.set(loc, new Map());
        locationOrder.push(loc);
      }

      const roadMap = locationMap.get(loc)!;
      if (!roadMap.has(road)) {
        roadMap.set(road, {
          slNo: 0,
          location: loc,
          approachRoad: road,
          lat: item.latitude  || '',
          lng: item.longitude || '',
          rlvd: [], anpr1: [], anpr2: [], anpr3: [], analytical: [], ptz: []
        });
      }

      const group = roadMap.get(road)!;
      const serial = item.serialNumber || '';
      const type   = (item.deviceType || '').toUpperCase();

      if      (type === 'RLVD')       group.rlvd.push(serial);
      else if (type === 'ANALYTICAL') group.analytical.push(serial);
      else if (type === 'PTZ')        group.ptz.push(serial);
      else if (type === 'ANPR') {
        if      (group.anpr1.length === 0) group.anpr1.push(serial);
        else if (group.anpr2.length === 0) group.anpr2.push(serial);
        else                               group.anpr3.push(serial);
      }
    });

    // Assign sl numbers
    let slNo = 1;
    locationOrder.forEach(loc => {
      locationMap.get(loc)!.forEach(g => { g.slNo = slNo; });
      slNo++;
    });

    // ── 2. Build rows exactly like the original Excel ──────────────────────
    const aoa: any[][] = [];

    // Row 0 — Title
    aoa.push(['ITMS SRINAGAR\nDetails of various cameras Installed at different locations/Junctions across Srinagar City',
      '', '', '', '', '', '', '', '', '', '']);

    // Row 1 — Headers
    aoa.push(['Sl. No', 'Location', 'Approach Road', 'Lat', 'Long',
      'RLVD', 'ANPR-1\n(IR Included)', 'ANPR-2\n(IR Included)', 'ANPR-3\n(IR Included)',
      'ANALYTICAL', 'PTZ']);

    // Row 2 — Sub-headers (model prefix row)
    aoa.push(['', '', '', '', '',
      'PLEXONICS\nPL-7573ERPR', 'PLEXONICS\nPL-7273RVPH', 'PLEXONICS\nPL-7273RVPH',
      'PLEXONICS\nPL-7273RVPH', 'PLEXONICS\nPL-7573ERVP', 'PLEXONICS\nPL-7875H']);

    // Data rows — one row per approach road, max devices per type as separate rows
    locationOrder.forEach(loc => {
      const roads = Array.from(locationMap.get(loc)!.values());

      roads.forEach((g, roadIdx) => {
        const maxRows = Math.max(
          g.rlvd.length, g.anpr1.length, g.anpr2.length,
          g.anpr3.length, g.analytical.length, g.ptz.length, 1
        );

        for (let i = 0; i < maxRows; i++) {
          aoa.push([
            i === 0 && roadIdx === 0 ? g.slNo : '',  // Sl.No only on first road/first row
            i === 0 && roadIdx === 0 ? g.location : '', // Location only on first row of location
            i === 0 ? g.approachRoad : '',             // Approach road only on first row
            i === 0 ? g.lat : '',
            i === 0 ? g.lng : '',
            g.rlvd[i]       || '',
            g.anpr1[i]      || '',
            g.anpr2[i]      || '',
            g.anpr3[i]      || '',
            g.analytical[i] || '',
            g.ptz[i]        || '',
          ]);
        }
      });
    });

    // ── 3. Build worksheet ─────────────────────────────────────────────────
    const ws = XLSX.utils.aoa_to_sheet(aoa);

    // Column widths
    ws['!cols'] = [
      { wch: 8  },  // Sl. No
      { wch: 28 },  // Location
      { wch: 32 },  // Approach Road
      { wch: 14 },  // Lat
      { wch: 14 },  // Long
      { wch: 20 },  // RLVD
      { wch: 22 },  // ANPR-1
      { wch: 22 },  // ANPR-2
      { wch: 22 },  // ANPR-3
      { wch: 22 },  // ANALYTICAL
      { wch: 20 },  // PTZ
    ];

    // Merge title row across all 11 columns
    ws['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 10 } }
    ];

    // Row heights for title and header rows
    ws['!rows'] = [
      { hpt: 40 },  // Title row
      { hpt: 30 },  // Header row
      { hpt: 30 },  // Sub-header row
    ];

    // ── 4. Create workbook with Summary sheet ──────────────────────────────
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ITMS Camera Details');

    // Summary sheet
    const summaryData = [
      ['Device Type', 'Count'],
      ['RLVD',        this.filteredItems.filter(i => i.deviceType === 'RLVD').length],
      ['ANPR',        this.filteredItems.filter(i => i.deviceType === 'ANPR').length],
      ['ANALYTICAL',  this.filteredItems.filter(i => i.deviceType === 'ANALYTICAL').length],
      ['PTZ',         this.filteredItems.filter(i => i.deviceType === 'PTZ').length],
      ['FIXED',       this.filteredItems.filter(i => i.deviceType === 'FIXED').length],
      ['TOTAL',       this.filteredItems.length],
    ];
    const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
    summaryWs['!cols'] = [{ wch: 16 }, { wch: 10 }];
    XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');

    // ── 5. Save ────────────────────────────────────────────────────────────
    const fileDate = this.formatShortDate(new Date(), '-');
    XLSX.writeFile(wb, `ITMS-Camera-Report-${fileDate}.xlsx`);

  } catch (error) {
    console.error('Error exporting to Excel:', error);
    alert('Error exporting to Excel. Please try again.');
  }
}

exportToPDF() {
  try {
    const loadImage = (url: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext('2d')!.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/jpeg'));
        };
        img.onerror = reject;
        img.src = url;
      });
    };

    loadImage('/download.jpg').then(logoBase64 => {
      this.generatePDF(logoBase64);
    }).catch(() => {
      this.generatePDF(null);
    });

  } catch (error) {
    console.error('Error exporting to PDF:', error);
    alert('Error exporting to PDF. Please try again.');
  }
}

private generatePDF(logoBase64: string | null) {
  try {
    type GroupedData = {
      slNo: number;
      location: string;
      approachRoad: string;
      lat: string;
      lng: string;
      rlvd: string[];
      anpr1: string[];
      anpr2: string[];
      anpr3: string[];
      analytical: string[];
      ptz: string[];
    };

    const locationOrder: string[] = [];
    const locationMap = new Map<string, Map<string, GroupedData>>();

    this.filteredItems.forEach(item => {
      const loc  = item.locationName || 'Unknown';
      const road = item.approachRoad  || '';

      if (!locationMap.has(loc)) {
        locationMap.set(loc, new Map());
        locationOrder.push(loc);
      }

      const roadMap = locationMap.get(loc)!;
      if (!roadMap.has(road)) {
        roadMap.set(road, {
          slNo: 0,
          location: loc,
          approachRoad: road,
          lat: item.latitude  || '',
          lng: item.longitude || '',
          rlvd: [], anpr1: [], anpr2: [], anpr3: [], analytical: [], ptz: []
        });
      }

      const group  = roadMap.get(road)!;
      const serial = item.serialNumber || '';
      const type   = (item.deviceType || '').toUpperCase();

      if      (type === 'RLVD')       group.rlvd.push(serial);
      else if (type === 'ANALYTICAL') group.analytical.push(serial);
      else if (type === 'PTZ')        group.ptz.push(serial);
      else if (type === 'ANPR') {
        if      (group.anpr1.length === 0) group.anpr1.push(serial);
        else if (group.anpr2.length === 0) group.anpr2.push(serial);
        else                               group.anpr3.push(serial);
      }
    });

    let slNo = 1;
    locationOrder.forEach(loc => {
      locationMap.get(loc)!.forEach(g => { g.slNo = slNo; });
      slNo++;
    });

    // ── 2. Build rows ──────────────────────────────────────────────────────
    const body: any[][] = [];

    locationOrder.forEach(loc => {
      const roads = Array.from(locationMap.get(loc)!.values());
      roads.forEach((g, roadIdx) => {
        const maxRows = Math.max(
          g.rlvd.length, g.anpr1.length, g.anpr2.length,
          g.anpr3.length, g.analytical.length, g.ptz.length, 1
        );
        for (let i = 0; i < maxRows; i++) {
          body.push([
            i === 0 && roadIdx === 0 ? g.slNo.toString() : '',
            i === 0 && roadIdx === 0 ? g.location        : '',
            i === 0                  ? g.approachRoad    : '',
            i === 0                  ? g.lat             : '',
            i === 0                  ? g.lng             : '',
            g.rlvd[i]       || '',
            g.anpr1[i]      || '',
            g.anpr2[i]      || '',
            g.anpr3[i]      || '',
            g.analytical[i] || '',
            g.ptz[i]        || '',
          ]);
        }
      });
    });

    // ── 3. Setup doc ───────────────────────────────────────────────────────
    const doc = new jsPDF({ orientation: 'landscape', format: 'a3' });
    const pageW      = doc.internal.pageSize.getWidth();
    const pageH      = doc.internal.pageSize.getHeight();
    const margin     = 10;
    const tableWidth = pageW - margin * 2;

    // ── Draw logo (page 1 only) ────────────────────────────────────────────
    const drawLogo = () => {
      if (logoBase64) {
        doc.addImage(logoBase64, 'JPEG', pageW - 52, 4, 42, 32);
      }
    };

    // ── Draw watermark ─────────────────────────────────────────────────────
    const drawWatermark = () => {
      if (!logoBase64) return;
      doc.saveGraphicsState();
      (doc as any).setGState(new (doc as any).GState({ opacity: 0.12 })); // ← more visible
      doc.addImage(logoBase64, 'JPEG', pageW / 2 - 50, pageH / 2 - 40, 100, 80);
      doc.restoreGraphicsState();
    };

    // ── Draw header ────────────────────────────────────────────────────────
    const drawHeader = () => {
      drawLogo();

      doc.setFontSize(18);
      doc.setTextColor(40, 53, 147);
      doc.text('ITMS SRINAGAR — Device Inventory Report', margin, 16);

      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      doc.text(`Generated: ${this.formatShortDate(new Date(), '/')} `,    margin, 24);
      // ← Filters line removed
      doc.text(`Total devices: ${this.filteredItems.length}`,  margin, 30);

      const rlvdCount       = this.filteredItems.filter(i => i.deviceType === 'RLVD').length;
      const anprCount       = this.filteredItems.filter(i => i.deviceType === 'ANPR').length;
      const analyticalCount = this.filteredItems.filter(i => i.deviceType === 'ANALYTICAL').length;
      const ptzCount        = this.filteredItems.filter(i => i.deviceType === 'PTZ').length;
      doc.text(
        `RLVD: ${rlvdCount}  |  ANPR: ${anprCount}  |  ANALYTICAL: ${analyticalCount}  |  PTZ: ${ptzCount}`,
        margin, 36
      );
    };

    // Draw page 1 header + watermark
    drawHeader();
    drawWatermark();

    // ── Column widths ──────────────────────────────────────────────────────
    const pct = [0.04, 0.11, 0.13, 0.06, 0.06, 0.10, 0.11, 0.11, 0.10, 0.10, 0.14];
    const colWidths = pct.map(p => parseFloat((tableWidth * p).toFixed(2)));
    const drift = tableWidth - colWidths.reduce((a, b) => a + b, 0);
    colWidths[colWidths.length - 1] = parseFloat(
      (colWidths[colWidths.length - 1] + drift).toFixed(2)
    );

    autoTable(doc, {
      head: [[
        'S.No.', 'Location', 'Approach Road', 'Lat', 'Long',
        'RLVD', 'ANPR-1', 'ANPR-2', 'ANPR-3', 'ANALYTICAL', 'PTZ'
      ]],
      body,
      startY: 41,   // ← moved up since filter line removed
      margin: { left: margin, right: margin },
      tableWidth,
      styles: {
        fontSize: 8,
        cellPadding: { top: 2.5, bottom: 2.5, left: 2, right: 2 },
        overflow: 'linebreak',
        valign: 'middle',
        lineWidth: 0,        
        halign: 'left',
      },
      headStyles: {
        fillColor: [56, 105, 164],
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 8.5,
        halign: 'left',
        lineWidth: 0,
      },
      alternateRowStyles: { fillColor: [247, 250, 255] },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [40, 40, 40],
      },
      columnStyles: {
        0:  { cellWidth: colWidths[0],  halign: 'center', fontStyle: 'bold' },
        1:  { cellWidth: colWidths[1],  halign: 'left' },
        2:  { cellWidth: colWidths[2],  halign: 'left' },
        3:  { cellWidth: colWidths[3],  halign: 'left', fontSize: 7 },
        4:  { cellWidth: colWidths[4],  halign: 'left', fontSize: 7 },
        5:  { cellWidth: colWidths[5],  halign: 'left' },
        6:  { cellWidth: colWidths[6],  halign: 'left' },
        7:  { cellWidth: colWidths[7],  halign: 'left' },
        8:  { cellWidth: colWidths[8],  halign: 'left' },
        9:  { cellWidth: colWidths[9],  halign: 'left' },
        10: { cellWidth: colWidths[10], halign: 'left', overflow: 'linebreak' },
      },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 1 &&
            (data.row.raw as any[])[1] !== '') {
          data.cell.styles.fontStyle = 'bold';
        }
      },
      willDrawCell: (data) => {
        // Blue separator line at each new location block
        if (data.section === 'body' && data.column.index === 0 &&
            (data.row.raw as any[])[1] !== '') {
          doc.setDrawColor(86, 135, 184);
          doc.setLineWidth(0.5);
          doc.line(margin, data.cell.y, pageW - margin, data.cell.y);
        }

        // Subtle horizontal row separator line (replaces cell boxes)
        if (data.section === 'body' &&
            data.column.index === data.table.columns.length - 1) {
          doc.setDrawColor(220, 228, 240);
          doc.setLineWidth(0.1);
          doc.line(
            margin,
            data.cell.y + data.cell.height,
            pageW - margin,
            data.cell.y + data.cell.height
          );
        }
      },
      didDrawPage: () => {
        const pageNum = (doc as any).internal.getCurrentPageInfo().pageNumber;
        const total   = (doc as any).internal.getNumberOfPages();

        // Pages after page 1 — watermark only, no logo
        if (pageNum > 0) {
          drawWatermark();
        }

        // Footer on every page
        doc.setFontSize(7.5);
        doc.setTextColor(140, 140, 140);
        doc.text(
          `Page ${pageNum} of ${total}  •  ITMS Srinagar Device Inventory  •  ${this.formatShortDate(new Date(), '/')}`,
          margin,
          pageH - 6
        );
      },
    });

    const fileDate = this.formatShortDate(new Date(), '-');
    doc.save(`ITMS-Camera-Report-${fileDate}.pdf`);

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error exporting to PDF. Please try again.');
  }
}

  edit(id?: string) {
    if (id) this.router.navigate(['/admin/items', id, 'edit']);
  }

  viewHistory(id?: string) {
    if (id) this.router.navigate(['/devices', id, 'history']);
  }

  // ─── Summary card helpers ────────────────────────────────────────────────────

  getActiveDevicesCount(): number {
    return this.items.filter(d =>
      d.status?.toLowerCase() === 'active' || d.status?.toLowerCase() === 'installed'
    ).length;
  }

  getPolesCount(): number {
    const uniquePoles = new Set(
      this.items
        .filter(d => d.poles)
        .map(d => `${(d.locationName || '').toLowerCase().trim()}|${(d.approachRoad || '').toLowerCase().trim()}`)
    );
    return uniquePoles.size;
  }

  getECBCount(): number {
    const uniqueECB = new Set(
      this.items
        .filter(d => d.ecbPresent)
        .map(d => `${(d.locationName || '').toLowerCase().trim()}|${(d.approachRoad || '').toLowerCase().trim()}`)
    );
    return uniqueECB.size;
  }

  // ─── Pagination ─────────────────────────────────────────────────────────────

  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.pageSize);
  }

  private updatePaginatedItems() {
    const start = this.pageIndex * this.pageSize;
    this.paginatedItems = this.filteredItems.slice(start, start + this.pageSize);
  }

  getVisiblePages(): Array<{ number: number; display: string; isEllipsis: boolean }> {
    const pages: Array<{ number: number; display: string; isEllipsis: boolean }> = [];
    const maxVisible  = 5;
    const currentPage = this.pageIndex + 1;

    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push({ number: i, display: i.toString(), isEllipsis: false });
      }
    } else {
      const half = Math.floor(maxVisible / 2);

      if (currentPage <= half + 1) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push({ number: i, display: i.toString(), isEllipsis: false });
        }
        pages.push({ number: 0, display: '...', isEllipsis: true });
        pages.push({ number: this.totalPages, display: this.totalPages.toString(), isEllipsis: false });

      } else if (currentPage >= this.totalPages - half) {
        pages.push({ number: 1, display: '1', isEllipsis: false });
        pages.push({ number: 0, display: '...', isEllipsis: true });
        for (let i = this.totalPages - maxVisible + 1; i <= this.totalPages; i++) {
          pages.push({ number: i, display: i.toString(), isEllipsis: false });
        }

      } else {
        pages.push({ number: 1, display: '1', isEllipsis: false });
        pages.push({ number: 0, display: '...', isEllipsis: true });
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push({ number: i, display: i.toString(), isEllipsis: false });
        }
        pages.push({ number: 0, display: '...', isEllipsis: true });
        pages.push({ number: this.totalPages, display: this.totalPages.toString(), isEllipsis: false });
      }
    }

    return pages;
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.pageIndex = pageNumber - 1;
      this.updatePaginatedItems();
    }
  }

  nextPage(): void {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageIndex++;
      this.updatePaginatedItems();
    }
  }

  previousPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.updatePaginatedItems();
    }
  }

  // ─── Unique location list for filter dropdown ────────────────────────────────

  get locations(): string[] {
    return Array.from(
      new Set(
        this.items
          .map(i => i.locationName)
          .filter((loc): loc is string => Boolean(loc?.trim()))
      )
    ).sort();
  }
}