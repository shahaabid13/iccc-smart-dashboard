import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DevicesService, Device } from '../../../services/devices.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';

// Import export functionality
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <!-- Summary Cards -->
    <div class="summary-cards" *ngIf="devices.length > 0">
      <mat-card class="summary-card total-card">
        <mat-card-content>
          <div class="summary-content">
            <mat-icon class="summary-icon">devices</mat-icon>
            <div class="summary-text">
              <div class="summary-number">{{ devices.length }}</div>
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

    <!-- Toolbar -->
    <mat-toolbar color="primary" class="toolbar">
      <div class="toolbar-content">
        <span class="toolbar-title">Admin Dashboard</span>
        <span class="spacer"></span>
        <div class="toolbar-actions">
          <!-- Export Menu -->
          <button mat-raised-button color="accent" [matMenuTriggerFor]="exportMenu" class="action-btn">
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

          <button mat-raised-button color="accent" routerLink="/admin/excel-upload" class="action-btn">
            <mat-icon>upload_file</mat-icon>
            EXCEL
          </button>
          <button mat-raised-button color="warn" (click)="createNew()" class="action-btn">
            <mat-icon>add_circle</mat-icon>
            New Device
          </button>
        </div>
      </div>
    </mat-toolbar>

    <!-- Main Content -->
    <div class="dashboard-container">
      <mat-card class="main-card">
        <mat-card-header class="card-header">
          <div class="header-content">
            <div class="header-text">
              <mat-card-title>Device Inventory Management</mat-card-title>
              <mat-card-subtitle>Complete device inventory with detailed information and export capabilities</mat-card-subtitle>
            </div>
            <div class="header-actions">
              <button mat-stroked-button (click)="refreshDevices()" [disabled]="loading" class="refresh-btn">
                <mat-icon>refresh</mat-icon>
                Refresh
              </button>
            </div>
          </div>
        </mat-card-header>

        <mat-divider></mat-divider>

        <!-- Loading State -->
        <div *ngIf="loading" class="loading-state">
          <mat-spinner diameter="40"></mat-spinner>
          <p>Loading devices...</p>
        </div>

        <!-- Data Table -->
        <div class="table-container" *ngIf="!loading && pagedDevices.length > 0; else noData">
          <div class="table-header">
            <div class="table-info">
              Showing {{ getStartIndex() + 1 }}-{{ getEndIndex() }} of {{ devices.length }} devices
            </div>
            <div class="table-actions">
              <button mat-stroked-button (click)="toggleCompactView()" class="view-toggle">
                <mat-icon>{{ compactView ? 'view_stream' : 'view_module' }}</mat-icon>
                {{ compactView ? 'Detailed' : 'Compact' }} View
              </button>
            </div>
          </div>

          <table mat-table [dataSource]="pagedDevices" class="mat-elevation-z2 detailed-table" [class.compact-table]="compactView">

            <!-- ID -->
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let d" class="id-cell">
                <strong>#{{ d.id }}</strong>
              </td>
            </ng-container>

            <!-- Serial Number -->
            <ng-container matColumnDef="serialNumber">
              <th mat-header-cell *matHeaderCellDef>Serial Number</th>
              <td mat-cell *matCellDef="let d" class="serial-cell">
                <code>{{ d.serialNumber || 'N/A' }}</code>
              </td>
            </ng-container>

            <!-- Device Type -->
            <ng-container matColumnDef="deviceType">
              <th mat-header-cell *matHeaderCellDef>Device Type</th>
              <td mat-cell *matCellDef="let d">
                <mat-chip [color]="getDeviceTypeColor(d.deviceType)" selected class="device-type-chip">
                  {{ d.deviceType || 'Unknown' }}
                </mat-chip>
              </td>
            </ng-container>

            <!-- Location -->
            <ng-container matColumnDef="locationName">
              <th mat-header-cell *matHeaderCellDef>Location</th>
              <td mat-cell *matCellDef="let d" class="location-cell">
                <mat-icon class="location-icon">location_on</mat-icon>
                {{ d.locationName || 'No location' }}
              </td>
            </ng-container>

            <!-- Coordinates -->
            <ng-container matColumnDef="coordinates" *ngIf="!compactView">
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

            <!-- Status -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let d">
                <mat-chip
                  [ngClass]="'status-chip status-' + (d.status?.toLowerCase() || 'unknown')"
                  class="status-chip">
                  {{ d.status || 'Unknown' }}
                </mat-chip>
              </td>
            </ng-container>

            <!-- Poles -->
            <ng-container matColumnDef="poles">
              <th mat-header-cell *matHeaderCellDef>Poles</th>
              <td mat-cell *matCellDef="let d">
                <mat-icon
                  [color]="d.poles ? 'primary' : 'warn'"
                  class="boolean-icon">
                  {{ d.poles ? 'check_circle' : 'cancel' }}
                </mat-icon>
                <span class="boolean-text">{{ d.poles ? 'Yes' : 'No' }}</span>
              </td>
            </ng-container>

            <!-- ECB Present -->
            <ng-container matColumnDef="ecbPresent">
              <th mat-header-cell *matHeaderCellDef>ECB</th>
              <td mat-cell *matCellDef="let d">
                <mat-icon
                  [color]="d.ecbPresent ? 'primary' : 'warn'"
                  class="boolean-icon">
                  {{ d.ecbPresent ? 'check_circle' : 'cancel' }}
                </mat-icon>
                <span class="boolean-text">{{ d.ecbPresent ? 'Yes' : 'No' }}</span>
              </td>
            </ng-container>

            <!-- Approach Road -->
            <ng-container matColumnDef="approachRoad" *ngIf="!compactView">
              <th mat-header-cell *matHeaderCellDef>Approach Road</th>
              <td mat-cell *matCellDef="let d" class="approach-road-cell">
                {{ d.approachRoad || 'Not specified' }}
              </td>
            </ng-container>

            <!-- Actions -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef class="actions-header">Actions</th>
              <td mat-cell *matCellDef="let d" class="action-buttons">
                <button
                  mat-icon-button
                  color="primary"
                  (click)="edit(d.id)"
                  matTooltip="Edit Device"
                  class="action-btn">
                  <mat-icon>edit</mat-icon>
                </button>
                <button
                  mat-icon-button
                  color="warn"
                  (click)="remove(d.id)"
                  matTooltip="Delete Device"
                  class="action-btn">
                  <mat-icon>delete</mat-icon>
                </button>
                <button
                  mat-icon-button
                  color="accent"
                  (click)="viewDetails(d)"
                  matTooltip="View Details"
                  class="action-btn">
                  <mat-icon>visibility</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="getDisplayedColumns()"></tr>
            <tr mat-row *matRowDef="let row; columns: getDisplayedColumns()"></tr>
          </table>

          <!-- Pagination -->
          <div class="pagination-container" *ngIf="devices.length > pageSize">
            <div class="pagination-controls">
              <div class="pagination-wrapper">
                <button
                  mat-icon-button
                  [disabled]="currentPage === 1"
                  (click)="previousPage()"
                  class="pagination-nav-btn">
                  <mat-icon>chevron_left</mat-icon>
                </button>

                <div class="pagination-pages">
                  <button
                    *ngFor="let page of getVisiblePages()"
                    mat-button
                    [class.active]="page.number === currentPage"
                    [class.ellipsis]="page.isEllipsis"
                    (click)="!page.isEllipsis && goToPage(page.number)"
                    class="pagination-page-btn"
                    [disabled]="page.isEllipsis">
                    {{ page.display }}
                  </button>
                </div>

                <button
                  mat-icon-button
                  [disabled]="currentPage === totalPages"
                  (click)="nextPage()"
                  class="pagination-nav-btn">
                  <mat-icon>chevron_right</mat-icon>
                </button>
              </div>

              <div class="pagination-info">
                Page {{ currentPage }} of {{ totalPages }} • {{ devices.length }} total devices
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <ng-template #noData>
          <div class="empty-state" *ngIf="!loading">
            <mat-icon class="empty-icon">devices_other</mat-icon>
            <h3>No devices found</h3>
            <p>Get started by adding your first device or uploading an Excel file.</p>
            <div class="empty-actions">
              <button mat-raised-button color="primary" (click)="createNew()">
                <mat-icon>add</mat-icon>
                Add First Device
              </button>
              <button mat-stroked-button color="accent" routerLink="/admin/excel-upload">
                <mat-icon>upload</mat-icon>
                Upload Excel
              </button>
            </div>
          </div>
        </ng-template>
      </mat-card>
    </div>
  `,
  styles: [`
  :host {
    display: block;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .toolbar {
    box-shadow: 0 2px 12px rgba(0,0,0,0.15);
    padding: 12px 24px;
    width: 100%;
    box-sizing: border-box;
  }

  .toolbar-content {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: none;
  }

  .toolbar-title {
    font-size: 20px;
    font-weight: 600;
  }

  .spacer {
    flex: 1 1 auto;
  }

  .toolbar-actions {
    display: flex;
    gap: 32px;
    align-items: center;
    
  }

  .action-btn {
    margin-left: 8px;
    border-radius: 8px;
    font-weight: 500;
    background-color: #fffff;
    align-items: center;
  }

  /* REMOVE the max-width constraint from dashboard container */
  .dashboard-container {
    padding: 24px;
    width: 100%;
    max-width: none; /* Remove this constraint */
    margin: 0;
    box-sizing: border-box;
  }

  .main-card {
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
    overflow: hidden;
    background: white;
    width: 100%;
    margin: 0;
  }

  .card-header {
    padding: 24px 24px 16px 24px;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }

  .header-text {
    flex: 1;
  }

  .header-actions {
    margin-left: 16px;
  }

  .refresh-btn {
    border-radius: 8px;
  }

  mat-card-title {
    font-size: 28px;
    font-weight: 700;
    color: #1976d2;
    margin-bottom: 4px;
  }

  mat-card-subtitle {
    color: #666;
    font-size: 15px;
    font-weight: 400;
  }

  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    color: #666;
  }

  .loading-state p {
    margin-top: 16px;
    font-size: 16px;
  }

  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px 16px 24px;
    background: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
    
  }

  .table-info {
    font-size: 14px;
    color: #666;
    font-weight: 500;
  }

  .table-actions {
    display: flex;
    gap: 12px;
    
  }

  .view-toggle {
    border-radius: 8px;
    font-size: 14px;
  }

  .table-container {
    overflow-x: auto;
    padding: 16px 24px 0 24px;
    width: 100%;
    box-sizing: border-box;
  }

  /* FIX TABLE WIDTH - Remove min-width constraints */
  .detailed-table {
    width: 100%;
    min-width: 100%; /* Changed from 1000px to 100% */
  }

  .compact-table {
    width: 100%;
    min-width: 100%; /* Changed from 800px to 100% */
  }

  /* Ensure table cells use full available space */
  table {
    width: 100%;
    table-layout: auto; /* Changed to auto for better distribution */
  }

  th.mat-header-cell {
    font-weight: 700;
    background: linear-gradient(135deg, #1976d2, #1565c0);
    color: white;
    text-transform: uppercase;
    font-size: 13px;
    padding: 16px 12px;
    position: sticky;
    top: 0;
    z-index: 2;
    white-space: nowrap;
    border: none;
        font-weight: bold;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .actions-header {
    text-align: center;
    font-weight: bold;
  }

  tr.mat-row:nth-child(even) {
    background-color: #f8f9fa;
  }

  th.mat-header-cell, td.mat-cell {
    white-space: nowrap;
    padding: 14px 12px;
        font-weight: bold;
    border-right: 1px solid #e9ecef;
  }

  td.mat-cell:last-child, th.mat-header-cell:last-child {
    border-right: none;
  }

  td.mat-cell {
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #e9ecef;
    vertical-align: middle;
    border-right: 1px solid #e9ecef;
  }

  tr.mat-row:hover td {
    background: #e3f2fd;
    transition: background-color 0.2s ease;
  }

  .action-buttons {
    display: flex;
    gap: 4px;
    justify-content: center;
    min-width: 140px;
          line-height:90px;
  }

  .action-btn {
    width: 36px;
    height: 36px;
    line-height: 36px;
    transition: all 0.2s ease;
  }

  .action-btn:hover {
    transform: scale(1.1);
  }

  /* Special cell styles */
  .id-cell {
    font-weight: 600;
    color: #1976d2;
  }

  .serial-cell code {
    background: #f1f3f4;
    padding: 6px 10px;
    border-radius: 6px;
    font-family: 'Courier New', monospace;
    font-size: 13px;
    color: #d32f2f;
    border: 1px solid #e0e0e0;
  }

  .device-type-chip {
    font-size: 12px;
    height: 26px;
    font-weight: 500;
  }

  /* Make specific columns flexible */
  .location-cell, .approach-road-cell {
    white-space: normal !important;
    min-width: 200px;
    font-style:bold;
  }

  .location-cell {
    display: flex;
    align-items: center;
    gap: 8px;
            line-height: 4.2;
    font-size: 13px;
  }

  .location-icon {
    font-size: 18px;
    width: 18px;
    height: 18px;
    color: #f44336;
  }

  .coordinates-cell {
    font-size: 12px;
    line-height: 1.4;
    min-width: 150px;
  }

  .status-chip {
    font-size: 12px;
    height: 26px;
    font-weight: 500;
    min-width: 80px;
  }

  .status-active, .status-installed {
    background-color: #e8f5e8 !important;
    color: #2e7d32 !important;
  }

  .status-inactive {
    background-color: #ffebee !important;
    color: #c62828 !important;
  }

  .status-maintenance {
    background-color: #fff3e0 !important;
    color: #ef6c00 !important;
  }

  .status-unknown {
    background-color: #f5f5f5 !important;
    color: #666 !important;
  }

  .boolean-icon {
    font-size: 20px;
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }

  .boolean-text {
    font-size: 13px;
    font-weight: 500;
  }

  .approach-road-cell {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .no-data {
    color: #999;
    font-style: italic;
    font-size: 12px;
  }

  /* Summary cards */
  .summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
    width: 100%;
    box-sizing: border-box;
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

  /* Pagination Styles */
  .pagination-container {
    padding: 20px 24px;
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
  }

  .pagination-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pagination-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pagination-nav-btn {
    border: 1px solid #dee2e6;
    background: white;
    border-radius: 6px;
    width: 40px;
    height: 40px;
    transition: all 0.2s ease;
  }

  .pagination-nav-btn:not([disabled]):hover {
    background: #1976d2;
    color: white;
    border-color: #1976d2;
  }

  .pagination-nav-btn[disabled] {
    color: #adb5bd;
    background: #f8f9fa;
  }

  .pagination-pages {
    display: flex;
    gap: 4px;
  }

  .pagination-page-btn {
    min-width: 40px;
    height: 40px;
    border: 1px solid #dee2e6;
    background: white;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    color: #495057;
    transition: all 0.2s ease;
  }

  .pagination-page-btn:not([disabled]):hover {
    background: #e9ecef;
    border-color: #1976d2;
  }

  .pagination-page-btn.active {
    background: #1976d2;
    color: white;
    border-color: #1976d2;
  }

  .pagination-page-btn.ellipsis {
    border: none;
    background: transparent;
    cursor: default;
  }

  .pagination-info {
    font-size: 14px;
    color: #666;
    font-weight: 500;
  }

  /* Empty state */
  .empty-state {
    text-align: center;
    padding: 80px 20px;
    color: #666;
  }

  .empty-icon {
    font-size: 80px;
    width: 80px;
    height: 80px;
    color: #bdbdbd;
    margin-bottom: 24px;
  }

  .empty-state h3 {
    margin: 0 0 12px 0;
    color: #555;
    font-size: 24px;
    font-weight: 600;
  }

  .empty-state p {
    margin: 0 0 32px 0;
    font-size: 16px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .empty-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
  }

  /* Responsive Design - Update media queries */
  @media (max-width: 1400px) {
    .dashboard-container {
      padding: 16px;
    }

    .toolbar-content {
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }

    .summary-cards {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .header-content {
      flex-direction: column;
      gap: 12px;
    }

    .header-actions {
      margin-left: 0;
      align-self: flex-end;
    }

    .pagination-controls {
      flex-direction: column;
      gap: 16px;
    }

    .empty-actions {
      flex-direction: column;
      align-items: center;
    }

    /* Ensure table remains full width on mobile */
    .detailed-table, .compact-table {
      min-width: 100%;
    }
  }

  @media (max-width: 768px) {
    .dashboard-container {
      padding: 12px;
    }

    .summary-cards {
      grid-template-columns: 1fr;
    }

    .table-container {
      padding: 12px 16px 0 16px;
    }

    /* Adjust table for mobile */
    th.mat-header-cell, td.mat-cell {
      padding: 10px 8px;
      font-size: 12px;
    }

    .action-buttons {
      min-width: 120px;
      line-height:50px;
    }
  }

  @media (max-width: 480px) {
    .dashboard-container {
      padding: 8px;
    }

    .table-container {
      padding: 8px 12px 0 12px;
    }

    /* Stack action buttons vertically on very small screens */
    .action-buttons {
      flex-direction: column;
      gap: 2px;
    }

    .action-btn {
      width: 32px;
      height: 32px;
    }
  }
`]
})
export class DashboardComponent implements OnInit {
  devices: Device[] = [];
  pagedDevices: Device[] = [];
  displayedColumns = [
    'id',
    'serialNumber',
    'deviceType',
    'locationName',
    'coordinates',
    'status',
    'poles',
    'ecbPresent',
    'approachRoad',
    'actions',
  ];

  compactView = false;
  loading = false;

  // Pagination properties
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  constructor(private deviceService: DevicesService, private router: Router) {}

  ngOnInit() {
    this.loadDevices();
  }

  /** Load devices with loading state */
  loadDevices() {
    this.loading = true;
    this.deviceService.getAllDevices().subscribe({
      next: (data) => {
        this.devices = data;
        this.updatePagination();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading devices:', err);
        this.loading = false;
      },
    });
  }

  /** Refresh devices */
  refreshDevices() {
    this.loadDevices();
  }

  /** Toggle compact view */
  toggleCompactView() {
    this.compactView = !this.compactView;
  }

  /** Get displayed columns based on view mode */
  getDisplayedColumns(): string[] {
    if (this.compactView) {
      return this.displayedColumns.filter(col =>
        !['coordinates', 'approachRoad'].includes(col)
      );
    }
    return this.displayedColumns;
  }

  /** Update pagination when devices change */
  updatePagination() {
    this.totalPages = Math.ceil(this.devices.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
    this.updatePagedDevices();
  }

  /** Update the paged devices array */
  updatePagedDevices() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedDevices = this.devices.slice(startIndex, endIndex);
  }

  /** Navigate to previous page */
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedDevices();
    }
  }

  /** Navigate to next page */
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedDevices();
    }
  }

  /** Go to specific page */
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedDevices();
    }
  }

  /** Get visible pages for pagination */
  getVisiblePages(): { number: number; display: string; isEllipsis: boolean }[] {
    const pages: { number: number; display: string; isEllipsis: boolean }[] = [];
    const maxVisiblePages = 5;

    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push({ number: i, display: i.toString(), isEllipsis: false });
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push({ number: i, display: i.toString(), isEllipsis: false });
        }
        pages.push({ number: 0, display: '...', isEllipsis: true });
        pages.push({ number: this.totalPages, display: this.totalPages.toString(), isEllipsis: false });
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push({ number: 1, display: '1', isEllipsis: false });
        pages.push({ number: 0, display: '...', isEllipsis: true });
        for (let i = this.totalPages - 3; i <= this.totalPages; i++) {
          pages.push({ number: i, display: i.toString(), isEllipsis: false });
        }
      } else {
        pages.push({ number: 1, display: '1', isEllipsis: false });
        pages.push({ number: 0, display: '...', isEllipsis: true });
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
          pages.push({ number: i, display: i.toString(), isEllipsis: false });
        }
        pages.push({ number: 0, display: '...', isEllipsis: true });
        pages.push({ number: this.totalPages, display: this.totalPages.toString(), isEllipsis: false });
      }
    }

    return pages;
  }

  /** Get start index of current page */
  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  /** Get end index of current page */
  getEndIndex(): number {
    return Math.min(this.getStartIndex() + this.pageSize, this.devices.length);
  }

  /** Export to Excel */
  exportToExcel() {
    try {
      const worksheet = XLSX.utils.json_to_sheet(this.prepareExportData());
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Devices');

      // Generate Excel file and trigger download
      XLSX.writeFile(workbook, `device-inventory-${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Error exporting to Excel. Please try again.');
    }
  }

  /** Export to PDF */
  exportToPDF() {
    try {
      const doc = new jsPDF();

      // Title
      doc.setFontSize(20);
      doc.setTextColor(40, 53, 147);
      doc.text('Device Inventory Report', 14, 22);

      // Date
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

      // Table
      autoTable(doc, {
        head: [['ID', 'Serial', 'Type', 'Location', 'Status', 'Poles', 'ECB', 'Coordinates']],
        body: this.prepareExportData().map(device => [
          device.id,
          device.serialNumber,
          device.deviceType,
          device.locationName,
          device.status,
          device.poles ? 'Yes' : 'No',
          device.ecbPresent ? 'Yes' : 'No',
          device.latitude && device.longitude ?
            `${device.latitude}, ${device.longitude}` : 'N/A'
        ]),
        startY: 40,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [25, 118, 210] }
      });

      // Save PDF
      doc.save(`device-inventory-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      alert('Error exporting to PDF. Please try again.');
    }
  }

  /** Prepare data for export */
  private prepareExportData(): any[] {
    return this.devices.map(device => ({
      id: device.id,
      serialNumber: device.serialNumber || 'N/A',
      deviceType: device.deviceType || 'Unknown',
      locationName: device.locationName || 'No location',
      status: device.status || 'Unknown',
      poles: device.poles ? 'Yes' : 'No',
      ecbPresent: device.ecbPresent ? 'Yes' : 'No',
      approachRoad: device.approachRoad || 'Not specified',
      latitude: device.latitude || 'N/A',
      longitude: device.longitude || 'N/A',
      placeholder: device.placeholder ? 'Yes' : 'No'
    }));
  }

  /** Navigate to create form */
  createNew() {
    this.router.navigate(['/admin/items/new']);
  }

  /** Navigate to edit */
  edit(id?: number) {
    if (id) this.router.navigate(['/admin/items', id, 'edit']);
  }

  /** View device details */
  viewDetails(device: Device) {
    this.router.navigate(['/devices', device.id, 'details']);
  }

  /** Delete device and refresh */
  remove(id?: number) {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this device? This action cannot be undone.')) return;

    this.deviceService.deleteDevice(id).subscribe({
      next: () => {
        this.loadDevices();
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert('Failed to delete device. Please try again.');
      },
    });
  }

  /** Get device type color */
  getDeviceTypeColor(deviceType: string): string {
    switch (deviceType?.toLowerCase()) {
      case 'anpr': return 'primary';
      case 'rlvd': return 'accent';
      case 'ptz': return 'warn';
      case 'fixed': return 'primary';
      case 'analytical': return 'accent';
      default: return '';
    }
  }

  /** Count active devices */
  getActiveDevicesCount(): number {
    return this.devices.filter(device =>
      device.status?.toLowerCase() === 'active' ||
      device.status?.toLowerCase() === 'installed'
    ).length;
  }

  /** Count devices with poles */
  getPolesCount(): number {
    return this.devices.filter(device => device.poles).length;
  }

  /** Count devices with ECB present */
  getECBCount(): number {
    return this.devices.filter(device => device.ecbPresent).length;
  }
}
