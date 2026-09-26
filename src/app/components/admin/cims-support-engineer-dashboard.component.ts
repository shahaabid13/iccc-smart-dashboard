import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CimsService } from '../../services/cims.service';
import { Ticket, PaginatedResponse } from '../../models/cims.models';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-cims-support-engineer-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule,
    NgChartsModule
  ],
  template: `
    <div class="dashboard-container">
      <!-- Header -->
      <div class="dashboard-header">
        <div class="header-content">
          <div class="header-title-block">
            <div class="title-icon">📊</div>
            <div>
              <h1>My Tickets Dashboard</h1>
              <p class="subtitle">Manage and track all tickets you have raised</p>
            </div>
          </div>
          <div class="header-actions">
            <button mat-stroked-button class="action-btn" (click)="loadDashboardData()" [disabled]="isLoading">
              <mat-icon>refresh</mat-icon>
              Refresh
            </button>
            <button mat-flat-button class="action-btn export-btn" [matMenuTriggerFor]="exportMenu" [disabled]="filteredTickets.length===0">
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
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="loading-container">
        <mat-spinner diameter="50"></mat-spinner>
        <p>Loading dashboard data...</p>
      </div>

      <!-- Stats Grid -->
      <div *ngIf="!isLoading" class="stats-grid">
        <div class="stat-card total">
          <div class="stat-icon-wrap"><span class="stat-icon">📝</span></div>
          <div class="stat-text">
            <div class="stat-value">{{ stats.totalRaised }}</div>
            <div class="stat-label">Total Raised</div>
          </div>
        </div>

        <div class="stat-card open">
          <div class="stat-icon-wrap"><span class="stat-icon">📂</span></div>
          <div class="stat-text">
            <div class="stat-value">{{ stats.open }}</div>
            <div class="stat-label">Open</div>
          </div>
        </div>

        <div class="stat-card inProgress">
          <div class="stat-icon-wrap"><span class="stat-icon">⚙️</span></div>
          <div class="stat-text">
            <div class="stat-value">{{ stats.inProgress }}</div>
            <div class="stat-label">In Progress</div>
          </div>
        </div>

        <div class="stat-card resolved">
          <div class="stat-icon-wrap"><span class="stat-icon">✅</span></div>
          <div class="stat-text">
            <div class="stat-value">{{ stats.resolved }}</div>
            <div class="stat-label">Resolved</div>
          </div>
        </div>
      </div>
      <p class="stats-note" *ngIf="!isLoading">Open + In Progress + Resolved = {{ stats.open + stats.inProgress + stats.resolved }} of {{ stats.totalRaised }} total</p>

      <!-- Chart Section -->
      <div *ngIf="!isLoading" class="charts-grid">
        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Tickets by Status</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-container">
              <canvas
                baseChart
                [type]="'bar'"
                [data]="statusChartData"
                [options]="statusChartOptions"
                [plugins]="statusChartPlugins">
              </canvas>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Tickets Table with Filters -->
      <mat-card class="tickets-table-card" *ngIf="!isLoading">
        <div class="table-card-header">
          <h2>My Tickets</h2>
        </div>

        <mat-card-content>
          <!-- Status Filter Tabs -->
          <mat-tab-group class="status-tabs" (selectedIndexChange)="onStatusFilterChange($event)" mat-stretch-tabs="false">
            <mat-tab>
              <ng-template mat-tab-label>All <span class="tab-count">{{ stats.totalRaised }}</span></ng-template>
            </mat-tab>
            <mat-tab>
              <ng-template mat-tab-label>Open <span class="tab-count">{{ stats.open }}</span></ng-template>
            </mat-tab>
            <mat-tab>
              <ng-template mat-tab-label>In Progress <span class="tab-count">{{ stats.inProgress }}</span></ng-template>
            </mat-tab>
            <mat-tab>
              <ng-template mat-tab-label>Resolved <span class="tab-count">{{ stats.resolved }}</span></ng-template>
            </mat-tab>
          </mat-tab-group>

          <!-- Table -->
          <div class="table-wrapper" *ngIf="pagedTickets.length > 0">
            <table mat-table [dataSource]="pagedTickets" class="tickets-table">
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>ID</th>
                <td mat-cell *matCellDef="let element" class="ticket-id">#{{ element.id }}</td>
              </ng-container>

              <ng-container matColumnDef="type">
                <th mat-header-cell *matHeaderCellDef>Type</th>
                <td mat-cell *matCellDef="let element">{{ element.incidentTypeName }}</td>
              </ng-container>

              <ng-container matColumnDef="location">
                <th mat-header-cell *matHeaderCellDef>Location</th>
                <td mat-cell *matCellDef="let element">
                  <span class="location-cell">
                    <mat-icon class="loc-icon">place</mat-icon>
                    {{ element.locationName }}
                  </span>
                </td>
              </ng-container>

              <ng-container matColumnDef="priority">
                <th mat-header-cell *matHeaderCellDef>Priority</th>
                <td mat-cell *matCellDef="let element">
                  <span class="badge priority-badge" [ngClass]="'priority-' + element.priority.toLowerCase()">
                    {{ element.priority }}
                  </span>
                </td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let element">
                  <span class="badge status-badge" [ngClass]="'status-' + element.status.toLowerCase()">
                    <span class="status-dot"></span>
                    {{ element.status }}
                  </span>
                </td>
              </ng-container>

              <ng-container matColumnDef="createdAt">
                <th mat-header-cell *matHeaderCellDef>Raised Date</th>
                <td mat-cell *matCellDef="let element" class="date-cell">
                  {{ element.createdAt | date: 'MMM d, y, h:mm a' }}
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let element">
                  <button mat-icon-button class="view-icon-btn" [routerLink]="['/cims/support-engineer/tickets', element.id]" matTooltip="View Details">
                    <mat-icon>visibility</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"
                  [class.row-revalidation]="row.status?.toUpperCase() === 'REVALIDATION'"></tr>
            </table>
          </div>

          <!-- Empty State -->
          <div *ngIf="filteredTickets.length === 0" class="empty-state">
            <div class="empty-icon">✨</div>
            <p>No tickets found for this filter</p>
          </div>

          <!-- Paginator -->
          <mat-paginator
            *ngIf="filteredTickets.length > 0"
            class="ticket-paginator"
            [length]="filteredTickets.length"
            [pageIndex]="currentPage"
            [pageSize]="pageSize"
            [pageSizeOptions]="[5, 10, 20, 50]"
            (page)="onPageChange($event)">
          </mat-paginator>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
      background: #f4f6f9;
    }

    /* ---------- Header ---------- */
    .dashboard-header {
      background: linear-gradient(135deg, #1e3a8a 0%, #1976d2 100%);
      border-radius: 16px;
      padding: 26px 28px;
      margin-bottom: 28px;
      box-shadow: 0 4px 20px rgba(20, 30, 60, 0.12);
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .header-title-block {
      display: flex;
      align-items: center;
      gap: 16px;
      color: #fff;
    }

    .title-icon {
      font-size: 30px;
      width: 54px;
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 14px;
    }

    .header-title-block h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
    }

    .subtitle {
      margin: 2px 0 0;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.8);
    }

    .header-actions {
      display: flex;
      gap: 10px;
    }

    .action-btn {
      border-radius: 10px;
      font-weight: 600;
      color: #fff !important;
      border-color: rgba(255, 255, 255, 0.4) !important;
    }

    .export-btn {
      background: #fff !important;
      color: #1565c0 !important;
    }

    /* ---------- Loading ---------- */
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 20px;
      gap: 16px;
      color: #607d8b;
    }

    /* ---------- Stat cards ---------- */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 18px;
      margin-bottom: 6px;
    }

    .stat-card {
      display: flex;
      align-items: center;
      gap: 16px;
      border-radius: 14px;
      padding: 20px 22px;
      box-shadow: 0 3px 12px rgba(20, 30, 60, 0.08);
      color: #fff;
    }

    .stat-card.total { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .stat-card.open { background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); }
    .stat-card.inProgress { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
    .stat-card.resolved { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }

    .stat-icon-wrap {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .stat-icon {
      font-size: 24px;
    }

    .stat-value {
      font-size: 30px;
      font-weight: 700;
      line-height: 1.1;
    }

    .stat-label {
      font-size: 13px;
      font-weight: 500;
      opacity: 0.95;
      margin-top: 2px;
    }

    .stats-note {
      text-align: right;
      font-size: 12px;
      color: #90a4ae;
      margin: 8px 4px 24px;
    }

    /* ---------- Charts ---------- */
    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
      margin-bottom: 28px;
    }

    .chart-card {
      border-radius: 14px;
      box-shadow: 0 3px 12px rgba(20, 30, 60, 0.08);
    }

    .chart-container {
      position: relative;
      height: 300px;
      margin: 12px 0;
    }

    /* ---------- Table card ---------- */
    .tickets-table-card {
      border-radius: 14px;
      box-shadow: 0 3px 12px rgba(20, 30, 60, 0.08);
      padding-bottom: 8px;
    }

    .table-card-header {
      padding: 20px 24px 0;
    }

    .table-card-header h2 {
      margin: 0;
      font-size: 17px;
      font-weight: 700;
      color: #263238;
    }

    .status-tabs {
      margin-top: 14px;
    }

    ::ng-deep .status-tabs .mat-mdc-tab-label-container {
      border-bottom: 1px solid #eceff1;
    }

    .tab-count {
      background: #eceff1;
      color: #546e7a;
      border-radius: 999px;
      padding: 1px 8px;
      font-size: 11px;
      font-weight: 700;
      margin-left: 6px;
    }

    .table-wrapper {
      overflow-x: auto;
      border-radius: 12px;
      border: 1px solid #eef1f5;
      margin: 18px 0 4px;
    }

    .tickets-table {
      width: 100%;
    }

    ::ng-deep .tickets-table .mat-mdc-header-row {
      background: #f8fafc;
    }

    ::ng-deep .tickets-table .mat-mdc-header-cell {
      color: #607d8b;
      font-weight: 700;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      border-bottom: 2px solid #eceff1;
    }

    ::ng-deep .tickets-table .mat-mdc-row:nth-child(even) {
      background-color: #fafbfc;
    }

    ::ng-deep .tickets-table .mat-mdc-row:hover {
      background-color: #eef5fd !important;
    }

    ::ng-deep .tickets-table .row-revalidation {
      background-color: #fff8e6 !important;
      border-left: 3px solid #ffa726;
    }

    ::ng-deep .tickets-table .row-revalidation:hover {
      background-color: #fff2d6 !important;
    }

    ::ng-deep .tickets-table .mat-mdc-cell {
      border-bottom: 1px solid #f1f3f5;
      font-size: 13.5px;
      color: #37474f;
    }

    .ticket-id {
      font-weight: 700;
      color: #1565c0;
      font-size: 14px;
    }

    .date-cell {
      color: #78909c;
      white-space: nowrap;
    }

    .location-cell {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .loc-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: #90a4ae;
    }

    /* ---------- Badges ---------- */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .priority-low { background: #e3f2fd; color: #1565c0; }
    .priority-medium { background: #fff3e0; color: #e65100; }
    .priority-high { background: #ffebee; color: #c62828; }

    .status-badge .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
    }

    .status-open { background: #e3f2fd; color: #1565c0; }
    .status-resolved { background: #e8f5e9; color: #2e7d32; }
    .status-acknowledged,
    .status-in_review,
    .status-pending,
    .status-coordinator_review,
    .status-assigned_to_reviewer { background: #fff3e0; color: #ef6c00; }
    .status-reopened { background: #fce4ec; color: #c2185b; }
    .status-revalidation { background: #fff3e0; color: #ef6c00; }
    .status-rejected { background: #ffebee; color: #c62828; }
    .status-ticket_created { background: #ede7f6; color: #5e35b1; }
    .status-sent_for_review { background: #e0f2f1; color: #00695c; }

    .view-icon-btn {
      color: #1976d2;
    }

    .ticket-paginator {
      background: transparent;
    }

    /* ---------- Empty state ---------- */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      gap: 12px;
      color: #90a4ae;
    }

    .empty-icon {
      font-size: 64px;
      opacity: 0.6;
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 12px;
      }

      .header-content {
        flex-direction: column;
        align-items: flex-start;
      }

      .header-actions {
        width: 100%;
      }

      .action-btn {
        flex: 1;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class CimsSupportEngineerDashboardComponent implements OnInit {
  /** Full set of tickets raised by this engineer — every page merged, not just one. */
  tickets: Ticket[] = [];
  /** tickets after the active status-tab filter, still the full matching set (not paginated). */
  filteredTickets: Ticket[] = [];
  /** Just the slice of filteredTickets shown on the current page. */
  pagedTickets: Ticket[] = [];

  displayedColumns: string[] = ['id', 'type', 'location', 'priority', 'status', 'createdAt', 'actions'];

  stats = {
    totalRaised: 0,
    open: 0,
    inProgress: 0,
    resolved: 0
  };

  isLoading = false;
  currentStatusFilter: 'ALL' | 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' = 'ALL';
  pageSize = 10;
  currentPage = 0;

  statusChartData: any;
  statusChartOptions: ChartConfiguration['options'];
  statusChartPlugins: any[] = [];

  // Batch size used when pulling pages from the backend to assemble the
  // full ticket set, since the backend endpoint is paginated.
  private readonly FETCH_BATCH_SIZE = 200;

  constructor(
    private cimsService: CimsService,
    private snackBar: MatSnackBar
  ) {
    this.initializeCharts();
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;

    this.cimsService.getMyTickets(0, this.FETCH_BATCH_SIZE).subscribe({
      next: (response: Ticket[] | PaginatedResponse<Ticket>) => {
        // Some environments may return a plain array with no pagination envelope.
        if (Array.isArray(response)) {
          this.finishLoading(response);
          return;
        }

        const total = response?.totalElements ?? 0;
        const firstBatch = response?.content ?? [];
        const totalBatches = Math.ceil(total / this.FETCH_BATCH_SIZE);

        if (totalBatches <= 1) {
          this.finishLoading(firstBatch);
          return;
        }

        const remainingRequests = [];
        for (let page = 1; page < totalBatches; page++) {
          remainingRequests.push(this.cimsService.getMyTickets(page, this.FETCH_BATCH_SIZE));
        }

        forkJoin(remainingRequests).subscribe({
          next: (responses: (Ticket[] | PaginatedResponse<Ticket>)[]) => {
            const rest = responses.flatMap(r => Array.isArray(r) ? r : (r?.content ?? []));
            this.finishLoading([...firstBatch, ...rest]);
          },
          error: (err: any) => {
            console.error('Failed to load remaining ticket pages', err);
            this.finishLoading(firstBatch);
          }
        });
      },
      error: (err: any) => {
        console.error('Failed to load my tickets', err);
        this.snackBar.open('Failed to load dashboard data', 'Close', { duration: 5000 });
        this.isLoading = false;
      }
    });
  }

  private finishLoading(allTickets: Ticket[]): void {
    this.tickets = allTickets.slice().sort((a, b) => {
      const aPriority = (a.status || '').toUpperCase() === 'REVALIDATION' ? 1 : 0;
      const bPriority = (b.status || '').toUpperCase() === 'REVALIDATION' ? 1 : 0;
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    this.calculateStats();
    this.currentPage = 0;
    this.applyStatusFilter();
    this.updateCharts();
    this.isLoading = false;
  }

  /**
   * Open + In Progress + Resolved always sum to exactly totalRaised, because
   * "In Progress" is a catch-all for every status that isn't OPEN or RESOLVED
   * (REVALIDATION, ASSIGNED_TO_REVIEWER, COORDINATOR_REVIEW, TICKET_CREATED,
   * SENT_FOR_REVIEW, etc.) rather than a hardcoded list that could silently
   * miss a status your workflow actually uses.
   */
  calculateStats(): void {
    this.stats.totalRaised = this.tickets.length;
    this.stats.open = this.tickets.filter(t => (t.status || '').toUpperCase() === 'OPEN').length;
    this.stats.resolved = this.tickets.filter(t => (t.status || '').toUpperCase() === 'RESOLVED').length;
    this.stats.inProgress = this.stats.totalRaised - this.stats.open - this.stats.resolved;
  }

  onStatusFilterChange(index: number): void {
    const statuses: ('ALL' | 'OPEN' | 'IN_PROGRESS' | 'RESOLVED')[] = ['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED'];
    this.currentStatusFilter = statuses[index];
    this.currentPage = 0;
    this.applyStatusFilter();
  }

  applyStatusFilter(): void {
    if (this.currentStatusFilter === 'ALL') {
      this.filteredTickets = this.tickets;
    } else if (this.currentStatusFilter === 'OPEN') {
      this.filteredTickets = this.tickets.filter(t => (t.status || '').toUpperCase() === 'OPEN');
    } else if (this.currentStatusFilter === 'RESOLVED') {
      this.filteredTickets = this.tickets.filter(t => (t.status || '').toUpperCase() === 'RESOLVED');
    } else {
      // IN_PROGRESS: same catch-all definition used in calculateStats()
      this.filteredTickets = this.tickets.filter(t => {
        const s = (t.status || '').toUpperCase();
        return s !== 'OPEN' && s !== 'RESOLVED';
      });
    }
    this.updatePagedTickets();
  }

  private updatePagedTickets(): void {
    const start = this.currentPage * this.pageSize;
    this.pagedTickets = this.filteredTickets.slice(start, start + this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    const previousPageSize = this.pageSize;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;

    if (event.pageSize !== previousPageSize) {
      this.currentPage = 0;
    }

    this.updatePagedTickets();
  }

  initializeCharts(): void {
    this.statusChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true }
      }
    };
  }

  updateCharts(): void {
    const statusCounts: Record<string, number> = {};
    this.tickets.forEach(ticket => {
      const status = ticket.status || 'UNKNOWN';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    this.statusChartData = {
      labels: Object.keys(statusCounts),
      datasets: [{
        label: 'Tickets by Status',
        data: Object.values(statusCounts),
        backgroundColor: [
          '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
          '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16'
        ]
      }]
    };
  }

  exportToExcel(): void {
    try {
      // Exports every ticket matching the active tab filter, not just the current page.
      const data = this.filteredTickets.map(t => ({
        'ID': t.id,
        'Type': t.incidentTypeName,
        'Location': t.locationName,
        'Priority': t.priority,
        'Status': t.status,
        'Raised Date': new Date(t.createdAt).toLocaleDateString(),
        'Description': t.description
      }));

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'My Tickets');
      XLSX.writeFile(wb, `my-tickets-${new Date().getTime()}.xlsx`);
      this.snackBar.open('Excel file exported successfully', 'Close', { duration: 3000 });
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      this.snackBar.open('Error exporting to Excel', 'Close', { duration: 5000 });
    }
  }

  exportToPDF(): void {
    try {
      const doc = new jsPDF();
      const headers = ['ID', 'Type', 'Location', 'Priority', 'Status', 'Raised Date'];
      const data = this.filteredTickets.map(t => [
        t.id,
        t.incidentTypeName,
        t.locationName,
        t.priority,
        t.status,
        new Date(t.createdAt).toLocaleDateString()
      ]);

      autoTable(doc, {
        head: [headers],
        body: data,
        startY: 40,
        theme: 'grid',
        headStyles: { fillColor: [25, 118, 210], textColor: 255 }
      });

      doc.text('My Raised Tickets', 14, 22);
      doc.save(`my-tickets-${new Date().getTime()}.pdf`);
      this.snackBar.open('PDF file exported successfully', 'Close', { duration: 3000 });
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      this.snackBar.open('Error exporting to PDF', 'Close', { duration: 5000 });
    }
  }
}