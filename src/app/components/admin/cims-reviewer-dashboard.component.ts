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
import { CimsService } from '../../services/cims.service';
import { Ticket, PaginatedResponse } from '../../models/cims.models';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-cims-reviewer-dashboard',
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
            <h1>My Review Dashboard</h1>
            <p class="subtitle">Track and analyze your review assignments</p>
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
            <div class="stat-value">{{ stats.totalAssigned || 0 }}</div>
            <div class="stat-label">Total Assigned</div>
            <div class="stat-icon">🎯</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card resolved">
          <mat-card-content>
            <div class="stat-value">{{ stats.resolved || 0 }}</div>
            <div class="stat-label">Resolved</div>
            <div class="stat-icon">✅</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card pending">
          <mat-card-content>
            <div class="stat-value">{{ stats.pending || 0 }}</div>
            <div class="stat-label">Pending</div>
            <div class="stat-icon">⏳</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card rejected">
          <mat-card-content>
            <div class="stat-value">{{ stats.rejected || 0 }}</div>
            <div class="stat-label">Rejected</div>
            <div class="stat-icon">❌</div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Chart Section -->
      <div *ngIf="!isLoading" class="charts-grid">
        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>My Tickets by Status</mat-card-title>
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
          <mat-card-title>My Review History</mat-card-title>
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
            <mat-tab label="All">
              <ng-template mat-tab-label>All ({{ filteredTickets.length }})</ng-template>
            </mat-tab>
            <mat-tab label="Resolved">
              <ng-template mat-tab-label>Resolved ({{ getCountByStatus('RESOLVED') }})</ng-template>
            </mat-tab>
            <mat-tab label="Pending">
              <ng-template mat-tab-label>Pending ({{ getCountByStatus('PENDING') }})</ng-template>
            </mat-tab>
            <mat-tab label="Reopened">
              <ng-template mat-tab-label>Reopened ({{ getCountByStatus('REOPENED') }})</ng-template>
            </mat-tab>
            <mat-tab label="Rejected">
              <ng-template mat-tab-label>Rejected ({{ getCountByStatus('REJECTED') }})</ng-template>
            </mat-tab>
          </mat-tab-group>

          <!-- Table -->
          <div class="table-wrapper">
            <table mat-table [dataSource]="filteredTickets" class="tickets-table">
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

              <ng-container matColumnDef="assignedDate">
                <th mat-header-cell *matHeaderCellDef>Assigned Date</th>
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
          <div *ngIf="filteredTickets.length === 0" class="empty-state">
            <div class="empty-icon">✨</div>
            <p>No tickets found for this filter</p>
          </div>

          <!-- Paginator -->
          <mat-paginator
            *ngIf="tickets.length > 0"
            [length]="tickets.length"
            [pageSize]="pageSize"
            [pageSizeOptions]="[5, 10, 20]"
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

    .stat-card.resolved {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }

    .stat-card.pending {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
    }

    .stat-card.rejected {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
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

    .status-resolved {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    .status-pending {
      background-color: #fff3e0;
      color: #e65100;
    }

    .status-reopened {
      background-color: #fce4ec;
      color: #c2185b;
    }

    .status-rejected {
      background-color: #ffebee;
      color: #c62828;
    }

    .status-assigned_to_reviewer {
      background-color: #e3f2fd;
      color: #1565c0;
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
export class CimsReviewerDashboardComponent implements OnInit {
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  displayedColumns: string[] = ['id', 'type', 'location', 'priority', 'status', 'assignedDate', 'raisedBy'];
  
  stats = {
    totalAssigned: 0,
    resolved: 0,
    pending: 0,
    rejected: 0
  };

  isLoading = false;
  currentStatusFilter: string = 'ALL';
  pageSize = 10;
  currentPage = 0;

  statusChartData: any;
  statusChartOptions: ChartConfiguration['options'];
  statusChartPlugins: any[] = [];

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
    // Request reviewer's full ticket history including all statuses
    this.cimsService.getReviewerHistory(this.currentPage, this.pageSize).subscribe({
      next: (response: Ticket[] | PaginatedResponse<Ticket>) => {
        const tickets = Array.isArray(response) ? response : response?.content ?? [];
        this.tickets = tickets.slice().sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.calculateStats();
        this.applyStatusFilter();
        this.updateCharts();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load reviewer history', err);
        this.snackBar.open('Failed to load dashboard data', 'Close', { duration: 5000 });
        this.isLoading = false;
      }
    });
  }

  calculateStats(): void {
    this.stats.totalAssigned = this.tickets.length;
    this.stats.resolved = this.tickets.filter(t => t.status === 'RESOLVED').length;
    this.stats.pending = this.tickets.filter(t => t.status === 'PENDING' || t.status === 'IN_REVIEW').length;
    this.stats.rejected = this.tickets.filter(t => t.status === 'REJECTED').length;
  }

  onStatusFilterChange(index: number): void {
    const statuses = ['ALL', 'RESOLVED', 'PENDING', 'REOPENED', 'REJECTED'];
    this.currentStatusFilter = statuses[index];
    this.applyStatusFilter();
  }

  applyStatusFilter(): void {
    if (this.currentStatusFilter === 'ALL') {
      this.filteredTickets = this.tickets;
    } else if (this.currentStatusFilter === 'PENDING') {
      this.filteredTickets = this.tickets.filter(t => t.status === 'PENDING' || t.status === 'IN_REVIEW');
    } else {
      this.filteredTickets = this.tickets.filter(t => t.status === this.currentStatusFilter);
    }
  }

  getCountByStatus(status: string): number {
    if (status === 'PENDING') {
      return this.tickets.filter(t => t.status === 'PENDING' || t.status === 'IN_REVIEW').length;
    }
    return this.tickets.filter(t => t.status === status).length;
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadDashboardData();
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
      const status = ticket.status;
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    this.statusChartData = {
      labels: Object.keys(statusCounts),
      datasets: [{
        label: 'Tickets by Status',
        data: Object.values(statusCounts),
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6'
        ]
      }]
    };
  }

  exportToExcel(): void {
    try {
      const data = this.filteredTickets.map(t => ({
        'ID': t.id,
        'Type': t.incidentTypeName,
        'Location': t.locationName,
        'Priority': t.priority,
        'Status': t.status,
        'Assigned Date': new Date(t.createdAt).toLocaleDateString(),
        'Raised By': t.raisedByUsername,
        'Description': t.description
      }));

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Reviewer Tickets');
      XLSX.writeFile(wb, `reviewer-tickets-${new Date().getTime()}.xlsx`);
      this.snackBar.open('Excel file exported successfully', 'Close', { duration: 3000 });
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      this.snackBar.open('Error exporting to Excel', 'Close', { duration: 5000 });
    }
  }

  exportToPDF(): void {
    try {
      const doc = new jsPDF();
      const headers = ['ID', 'Type', 'Location', 'Priority', 'Status', 'Assigned Date', 'Raised By'];
      const data = this.filteredTickets.map(t => [
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

      doc.text('My Review Tickets', 14, 22);
      doc.save(`reviewer-tickets-${new Date().getTime()}.pdf`);
      this.snackBar.open('PDF file exported successfully', 'Close', { duration: 3000 });
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      this.snackBar.open('Error exporting to PDF', 'Close', { duration: 5000 });
    }
  }
}
