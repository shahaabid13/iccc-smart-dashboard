import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { forkJoin } from 'rxjs';
import { CimsService } from '../../services/cims.service';
import { Ticket, PaginatedResponse } from '../../models/cims.models';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Mirrors backend com.inventory.msp.incident.model.TicketStatus exactly.
// Keep this in sync if the backend enum changes.
type TicketStatusValue =
  | 'OPEN'
  | 'COORDINATOR_REVIEW'
  | 'ASSIGNED_TO_REVIEWER'
  | 'PENDING'
  | 'RESOLVED'
  | 'REOPENED'
  | 'REJECTED';

interface StatusTab {
  label: string;
  value: 'ALL' | TicketStatusValue;
}

const STATUS_TABS: StatusTab[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Coordinator Review', value: 'COORDINATOR_REVIEW' },
  { label: 'Assigned to Reviewer', value: 'ASSIGNED_TO_REVIEWER' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Resolved', value: 'RESOLVED' },
  { label: 'Reopened', value: 'REOPENED' },
  { label: 'Rejected', value: 'REJECTED' }
];

@Component({
  selector: 'app-cims-coordinator-dashboard',
  standalone: true,
  imports: [
    CommonModule,
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
    NgChartsModule
  ],
  template: `
    <div class="dashboard-container">
      <mat-card class="dashboard-header header-card">
        <div class="header-content">
          <div>
            <h1>My Coordination Dashboard</h1>
            <p class="subtitle">Monitor your coordination activities and ticket flow</p>
          </div>
          <div class="header-actions">
            <button mat-raised-button color="primary" (click)="ngOnInit()" [disabled]="isLoading">
              <mat-icon>refresh</mat-icon>
              Refresh
            </button>
            <button mat-stroked-button color="primary" (click)="exportToExcel()">
              <mat-icon>download</mat-icon>
              Export Excel
            </button>
            <button mat-stroked-button color="accent" (click)="exportToPDF()">
              <mat-icon>picture_as_pdf</mat-icon>
              Export PDF
            </button>
          </div>
        </div>
      </mat-card>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="loading-container">
        <mat-spinner diameter="50"></mat-spinner>
        <p>Loading dashboard data...</p>
      </div>

      <!-- Stats Grid -->
      <div *ngIf="!isLoading" class="stats-grid">
        <mat-card class="stat-card total">
          <mat-card-content>
            <div class="stat-value">{{ stats.total }}</div>
            <div class="stat-label">Total Tickets</div>
            <div class="stat-icon">📋</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card open">
          <mat-card-content>
            <div class="stat-value">{{ stats.open }}</div>
            <div class="stat-label">Open (Needs Acknowledgment)</div>
            <div class="stat-icon">🆕</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card review">
          <mat-card-content>
            <div class="stat-value">{{ stats.coordinatorReview }}</div>
            <div class="stat-label">Awaiting Reviewer Assignment</div>
            <div class="stat-icon">⏳</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card assigned">
          <mat-card-content>
            <div class="stat-value">{{ stats.assignedToReviewer }}</div>
            <div class="stat-label">Assigned to Reviewer</div>
            <div class="stat-icon">✋</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card resolved">
          <mat-card-content>
            <div class="stat-value">{{ stats.resolved }}</div>
            <div class="stat-label">Resolved</div>
            <div class="stat-icon">✅</div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Chart Section -->
      <div *ngIf="!isLoading" class="charts-grid">
        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>My Coordination Activity by Status</mat-card-title>
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
        <mat-card-header>
          <mat-card-title>Coordination History</mat-card-title>
          <div class="export-menu">
            <button mat-raised-button color="accent" [matMenuTriggerFor]="exportMenu">
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
        </mat-card-header>

        <mat-card-content>
          <!-- Status Filter Tabs -->
          <mat-tab-group (selectedIndexChange)="onStatusFilterChange($event)">
            <mat-tab *ngFor="let tab of statusTabs">
              <ng-template mat-tab-label>{{ tab.label }} ({{ getCountByTab(tab.value) }})</ng-template>
            </mat-tab>
          </mat-tab-group>

          <!-- Table -->
          <div class="table-wrapper">
            <table mat-table [dataSource]="dataSource" class="tickets-table">
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
                <td mat-cell *matCellDef="let element">{{ element.locationName }}</td>
              </ng-container>

              <ng-container matColumnDef="priority">
                <th mat-header-cell *matHeaderCellDef>Priority</th>
                <td mat-cell *matCellDef="let element">
                  <mat-chip [class]="'priority-' + element.priority.toLowerCase()">
                    {{ element.priority }}
                  </mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let element">
                  <mat-chip [class]="'status-' + element.status.toLowerCase()">
                    {{ element.status }}
                  </mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="createdAt">
                <th mat-header-cell *matHeaderCellDef>Created</th>
                <td mat-cell *matCellDef="let element">
                  {{ element.createdAt | date: 'short' }}
                </td>
              </ng-container>

              <ng-container matColumnDef="raisedBy">
                <th mat-header-cell *matHeaderCellDef>Raised By</th>
                <td mat-cell *matCellDef="let element">{{ element.raisedByUsername }}</td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>

          <!-- Empty State -->
          <div *ngIf="dataSource.data.length === 0" class="empty-state">
            <div class="empty-icon">✨</div>
            <p>No tickets found for this filter</p>
          </div>

          <!-- Paginator: stays in DOM whenever !isLoading so @ViewChild binds
               to a stable element; client-side paging over the merged,
               filtered ticket set (queue + history combined). -->
          <mat-paginator
            [pageSizeOptions]="[5, 10, 20]"
            [pageSize]="10"
            showFirstLastButtons>
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
    }

    .dashboard-header {
      margin-bottom: 32px;
    }

    .header-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 28px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 8px;
    }

    .icon {
      font-size: 32px;
    }

    .subtitle {
      color: #666;
      font-size: 14px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 20px;
      gap: 16px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }

    .stat-card {
      position: relative;
      overflow: hidden;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .stat-card.total {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .stat-card.open {
      background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
      color: white;
    }

    .stat-card.review {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
    }

    .stat-card.assigned {
      background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
      color: white;
    }

    .stat-card.resolved {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }

    mat-card-content {
      position: relative;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 12px;
      text-align: center;
    }

    .stat-value {
      font-size: 40px;
      font-weight: 700;
    }

    .stat-label {
      font-size: 14px;
      font-weight: 500;
      opacity: 0.95;
    }

    .stat-icon {
      font-size: 32px;
      position: absolute;
      top: 12px;
      right: 12px;
      opacity: 0.3;
    }

    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }

    .chart-card {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .chart-container {
      position: relative;
      height: 300px;
      margin: 20px 0;
    }

    .tickets-table-card {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    mat-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .export-menu {
      display: flex;
      gap: 8px;
    }

    .table-wrapper {
      overflow-x: auto;
      margin-top: 20px;
    }

    .tickets-table {
      width: 100%;
    }

    .ticket-id {
      font-weight: 600;
      color: #1976d2;
    }

    .priority-low {
      background-color: #e3f2fd;
      color: #1565c0;
    }

    .priority-medium {
      background-color: #fff3e0;
      color: #e65100;
    }

    .priority-high {
      background-color: #ffebee;
      color: #c62828;
    }

    .status-open {
      background-color: #ffebee;
      color: #c62828;
    }

    .status-coordinator_review {
      background-color: #fff3e0;
      color: #e65100;
    }

    .status-assigned_to_reviewer {
      background-color: #e3f2fd;
      color: #1565c0;
    }

    .status-pending {
      background-color: #f3e5f5;
      color: #6a1b9a;
    }

    .status-resolved {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    .status-reopened {
      background-color: #fce4ec;
      color: #c2185b;
    }

    .status-rejected {
      background-color: #eceff1;
      color: #455a64;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      gap: 12px;
      color: #999;
    }

    .empty-icon {
      font-size: 64px;
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class CimsCoordinatorDashboardComponent implements OnInit, AfterViewInit {
  // Merged, de-duplicated set of every ticket relevant to this coordinator:
  // OPEN/REOPENED tickets from the queue (not yet acted on) PLUS everything
  // from coordinator-history (already acted on). Without merging these,
  // fresh OPEN tickets never appear on the dashboard at all.
  allTickets: Ticket[] = [];
  dataSource = new MatTableDataSource<Ticket>([]);
  displayedColumns: string[] = ['id', 'type', 'location', 'priority', 'status', 'createdAt', 'raisedBy'];

  statusTabs = STATUS_TABS;
  currentStatusFilter: StatusTab['value'] = 'ALL';

  stats = {
    total: 0,
    open: 0,
    coordinatorReview: 0,
    assignedToReviewer: 0,
    resolved: 0
  };

  isLoading = false;

  statusChartData: any;
  statusChartOptions: ChartConfiguration['options'];
  statusChartPlugins: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cimsService: CimsService,
    private snackBar: MatSnackBar
  ) {
    this.initializeCharts();
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadDashboardData(): void {
    this.isLoading = true;

    // Fetch queue (OPEN/REOPENED tickets awaiting coordinator action) and
    // history (everything the coordinator has already acted on) together,
    // then merge by id so nothing is missing from the dashboard.
    forkJoin({
      queue: this.cimsService.getCoordinatorQueue(),
      history: this.cimsService.getCoordinatorHistory(0, 200)
    }).subscribe({
      next: ({ queue, history }) => {
        const queueTickets: Ticket[] = Array.isArray(queue) ? queue : (queue?.content ?? []);
        const historyTickets: Ticket[] = Array.isArray(history) ? history : (history?.content ?? []);
        const merged = new Map<number, Ticket>();

        [...queueTickets, ...historyTickets].forEach(ticket => {
          merged.set(ticket.id, ticket);
        });

        this.allTickets = Array.from(merged.values())
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        this.calculateStats();
        this.applyStatusFilter();
        this.updateCharts();
        this.isLoading = false;

        queueMicrotask(() => {
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        });
      },
      error: (err: any) => {
        console.error('Failed to load coordinator dashboard data', err);
        this.snackBar.open('Failed to load dashboard data', 'Close', { duration: 5000 });
        this.isLoading = false;
      }
    });
  }

  calculateStats(): void {
    this.stats.total = this.allTickets.length;
    this.stats.open = this.getCountByStatus('OPEN') + this.getCountByStatus('REOPENED');
    this.stats.coordinatorReview = this.getCountByStatus('COORDINATOR_REVIEW');
    this.stats.assignedToReviewer = this.getCountByStatus('ASSIGNED_TO_REVIEWER');
    this.stats.resolved = this.getCountByStatus('RESOLVED');
  }

  onStatusFilterChange(index: number): void {
    this.currentStatusFilter = this.statusTabs[index].value;
    this.applyStatusFilter();
  }

  applyStatusFilter(): void {
    const filtered = this.currentStatusFilter === 'ALL'
      ? this.allTickets
      : this.allTickets.filter(t => t.status === this.currentStatusFilter);

    this.dataSource.data = filtered;
    // Filtering changes the row count, so reset to page 0 to avoid landing
    // on an out-of-range page.
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  getCountByStatus(status: TicketStatusValue): number {
    return this.allTickets.filter(t => t.status === status).length;
  }

  getCountByTab(value: StatusTab['value']): number {
    return value === 'ALL' ? this.allTickets.length : this.getCountByStatus(value);
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
    this.allTickets.forEach(ticket => {
      const status = ticket.status;
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    this.statusChartData = {
      labels: Object.keys(statusCounts),
      datasets: [{
        label: 'Coordination Activity',
        data: Object.values(statusCounts),
        backgroundColor: [
          '#ef4444',
          '#f59e0b',
          '#3b82f6',
          '#8b5cf6',
          '#10b981',
          '#ec4899',
          '#64748b'
        ]
      }]
    };
  }

  exportToExcel(): void {
    try {
      const data = this.dataSource.data.map(t => ({
        'ID': t.id,
        'Type': t.incidentTypeName,
        'Location': t.locationName,
        'Priority': t.priority,
        'Status': t.status,
        'Created': new Date(t.createdAt).toLocaleDateString(),
        'Raised By': t.raisedByUsername,
        'Description': t.description
      }));

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Coordinator Tickets');
      XLSX.writeFile(wb, `coordinator-tickets-${new Date().getTime()}.xlsx`);
      this.snackBar.open('Excel file exported successfully', 'Close', { duration: 3000 });
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      this.snackBar.open('Error exporting to Excel', 'Close', { duration: 5000 });
    }
  }

  exportToPDF(): void {
    try {
      const doc = new jsPDF();
      const headers = ['ID', 'Type', 'Location', 'Priority', 'Status', 'Created', 'Raised By'];
      const data = this.dataSource.data.map(t => [
        t.id,
        t.incidentTypeName,
        t.locationName,
        t.priority,
        t.status,
        new Date(t.createdAt).toLocaleDateString(),
        t.raisedByUsername
      ]);

      autoTable(doc, {
        head: [headers],
        body: data,
        startY: 40,
        theme: 'grid',
        headStyles: { fillColor: [25, 118, 210], textColor: 255 }
      });

      doc.text('My Coordination Tickets', 14, 22);
      doc.save(`coordinator-tickets-${new Date().getTime()}.pdf`);
      this.snackBar.open('PDF file exported successfully', 'Close', { duration: 3000 });
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      this.snackBar.open('Error exporting to PDF', 'Close', { duration: 5000 });
    }
  }
}