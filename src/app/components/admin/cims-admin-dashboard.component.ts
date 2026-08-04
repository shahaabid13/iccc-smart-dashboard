import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CimsService } from '../../services/cims.service';
import { DashboardStats, DailyTicketCount, Ticket, PaginatedResponse } from '../../models/cims.models';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

// Statuses that count as "closed" for reporting purposes.
const CLOSED_STATUSES = ['RESOLVED', 'REJECTED'];
// Statuses that count as "pending review" for the summary card.
// This includes ASSIGNED_TO_REVIEWER because those tickets are waiting for the review step.
const PENDING_STATUSES = ['PENDING', 'IN_REVIEW', 'ACKNOWLEDGED', 'ASSIGNED_TO_REVIEWER'];
// Statuses that count as actively "open".
const OPEN_STATUSES = ['OPEN', 'REOPENED'];

const STATUS_COLORS: { [key: string]: string } = {
  OPEN: '#3b82f6',
  ACKNOWLEDGED: '#8b5cf6',
  IN_REVIEW: '#0ea5e9',
  RESOLVED: '#10b981',
  REOPENED: '#f59e0b',
  PENDING: '#f59e0b',
  REJECTED: '#ef4444'
};

const PRIORITY_COLORS: { [key: string]: string } = {
  LOW: '#3b82f6',
  MEDIUM: '#f59e0b',
  HIGH: '#ef4444'
};

// How many tickets to pull when computing dashboard analytics. Large enough
// to cover realistic ticket volumes while still being a single request.
const ANALYTICS_PAGE_SIZE = 500;

@Component({
  selector: 'app-cims-admin-dashboard',
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
    NgChartsModule
  ],
  template: `
    <div class="reports-container">
      <mat-card class="header-card">
        <div class="header-content">
          <div>
            <h1>CIMS Admin Dashboard</h1>
            <p class="subtitle">Monitor all camera incidents system-wide</p>
          </div>
          <div class="header-actions">
            <button mat-raised-button color="primary" (click)="loadDashboardData()" [disabled]="isLoading">
              <mat-icon>refresh</mat-icon>
              Refresh
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
        <!-- Total Tickets -->
        <mat-card class="stat-card total">
          <mat-card-content>
            <div class="stat-value">{{ stats?.totalTickets || 0 }}</div>
            <div class="stat-label">Total Tickets</div>
            <div class="stat-icon">🎫</div>
          </mat-card-content>
        </mat-card>

        <!-- Open Tickets -->
        <mat-card class="stat-card open">
          <mat-card-content>
            <div class="stat-value">{{ stats?.openTickets || 0 }}</div>
            <div class="stat-label">Open Tickets</div>
            <div class="stat-icon">📂</div>
          </mat-card-content>
        </mat-card>

        <!-- Pending Review -->
        <mat-card class="stat-card pending">
          <mat-card-content>
            <div class="stat-value">{{ stats?.pendingReview || 0 }}</div>
            <div class="stat-label">Pending Review</div>
            <div class="stat-icon">⏳</div>
          </mat-card-content>
        </mat-card>

        <!-- Closed Tickets -->
        <mat-card class="stat-card closed">
          <mat-card-content>
            <div class="stat-value">{{ stats?.closedTickets || 0 }}</div>
            <div class="stat-label">Closed Tickets</div>
            <div class="stat-icon">✅</div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Charts Section -->
      <div *ngIf="!isLoading && stats" class="charts-grid">
        <!-- Status Distribution -->
        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Incidents by Status</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-container">
              <canvas
                *ngIf="hasStatusData"
                baseChart
                [type]="'bar'"
                [data]="statusChartData"
                [options]="statusChartOptions"
                [plugins]="statusChartPlugins">
              </canvas>
              <div *ngIf="!hasStatusData" class="chart-empty">No ticket data to chart yet</div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Priority Distribution -->
        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Incidents by Priority</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-container">
              <canvas
                *ngIf="hasPriorityData"
                baseChart
                [type]="'doughnut'"
                [data]="priorityChartData"
                [options]="priorityChartOptions"
                [plugins]="priorityChartPlugins">
              </canvas>
              <div *ngIf="!hasPriorityData" class="chart-empty">No ticket data to chart yet</div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Daily Ticket Creation -->
        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Tickets Created (Last 30 Days)</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-container">
              <canvas
                *ngIf="hasDailyTicketData"
                baseChart
                [type]="'bar'"
                [data]="dailyTicketChartData"
                [options]="dailyTicketChartOptions"
                [plugins]="dailyTicketChartPlugins">
              </canvas>
              <div *ngIf="!hasDailyTicketData" class="chart-empty">No ticket creation data available</div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .reports-container {
      padding: 24px;
      background-color: #f5f5f5;
      min-height: 100vh;
    }

    .header-card {
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);

      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;

        h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          color: #333;
        }

        .subtitle {
          margin: 4px 0 0;
          font-size: 13px;
          color: #777;
        }
      }

      .header-actions {
        display: flex;
        gap: 12px;
      }
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
      background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
      color: white;
    }

    .stat-card.pending {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
    }

    .stat-card.closed {
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

    .chart-empty {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #999;
      font-size: 14px;
    }

    .tickets-table-card {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .table-wrapper {
      overflow-x: auto;
    }

    .report-table {
      width: 100%;
      border-collapse: collapse;
    }

    .tickets-table {
      margin-top: 16px;
    }

    .status-badge,
    .priority-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
    }

    .status-open {
      background-color: #e3f2fd;
      color: #1565c0;
    }

    .status-acknowledged {
      background-color: #f3e5f5;
      color: #6a1b9a;
    }

    .status-in_review {
      background-color: #e3f2fd;
      color: #1565c0;
    }

    .status-resolved {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    .status-reopened {
      background-color: #fff3e0;
      color: #e65100;
    }

    .status-pending {
      background-color: #fff3e0;
      color: #e65100;
    }

    .status-rejected {
      background-color: #ffebee;
      color: #c62828;
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

    @media (max-width: 1024px) {
      .charts-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .header-content h1 {
        font-size: 20px;
      }
    }
  `]
})
export class CimsAdminDashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  dailyTicketCounts: DailyTicketCount[] = [];
  allTickets: Ticket[] = [];
  isLoading = false;
  ticketColumns: string[] = ['id', 'type', 'location', 'status', 'priority', 'raisedBy', 'createdAt'];

  hasStatusData = false;
  hasPriorityData = false;
  hasDailyTicketData = false;

  dailyTicketChartData: any;
  dailyTicketChartOptions: ChartConfiguration['options'];
  dailyTicketChartPlugins: any[] = [];

  // Chart configurations
  statusChartData: any;
  statusChartOptions: ChartConfiguration['options'];
  statusChartPlugins: any[] = [];

  priorityChartData: any;
  priorityChartOptions: ChartConfiguration['options'];
  priorityChartPlugins: any[] = [];

  constructor(private cimsService: CimsService) {
    this.initializeCharts();
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;

    this.cimsService.getDashboardStats().subscribe({
      next: (stats: DashboardStats) => {
        this.stats = stats;
        // The backend's byStatus/byPriority/closedTickets fields have been
        // unreliable (e.g. resolved tickets not counted as closed, and the
        // status/priority breakdowns coming back empty), so we recompute
        // everything from the actual ticket records instead of trusting
        // those specific fields blindly.
        this.loadTicketsForAnalytics(stats?.totalTickets);
      },
      error: (err: any) => {
        console.error('Failed to load dashboard stats', err);
        // Even if the stats endpoint fails entirely, we can still build a
        // full picture from the raw ticket list.
        this.loadTicketsForAnalytics();
      }
    });

    this.loadDailyTicketCounts();
  }

  private loadTicketsForAnalytics(knownTotal?: number): void {
    // Fetch a large batch of tickets to get accurate totalElements from response
    const pageSize = Math.max(knownTotal || ANALYTICS_PAGE_SIZE, ANALYTICS_PAGE_SIZE);

    this.cimsService.getAllTickets(0, pageSize).subscribe({
      next: (response: PaginatedResponse<Ticket>) => {
        const tickets = (response?.content ?? []).slice().sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.allTickets = tickets.slice(0, 10);
        // Use totalElements from paginated response as the authoritative total
        const totalFromResponse = response?.totalElements ?? 0;
        this.recalculateStatsFromTickets(tickets, totalFromResponse);
        this.updateCharts();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load tickets', err);
        this.isLoading = false;
      }
    });
  }

  /**
   * Derives all summary-card numbers and chart breakdowns directly from the
   * ticket records, so the dashboard is always consistent with what's shown
   * in the ticket table regardless of backend aggregation bugs.
   */
  private loadDailyTicketCounts(): void {
    this.cimsService.getDailyTicketCounts().subscribe({
      next: (data: DailyTicketCount[]) => {
        const countsByDate = (data || []).reduce((acc: Record<string, number>, item) => {
          acc[item.date] = item.count;
          return acc;
        }, {} as Record<string, number>);

        const today = new Date();
        const reversedRange: DailyTicketCount[] = [];
        for (let i = 29; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const isoDate = date.toISOString().slice(0, 10);
          reversedRange.push({
            date: isoDate,
            count: countsByDate[isoDate] ?? 0
          });
        }

        this.dailyTicketCounts = reversedRange;
        this.updateCharts();
      },
      error: (err: any) => {
        console.error('Failed to load daily ticket counts', err);
        this.dailyTicketCounts = [];
        this.hasDailyTicketData = false;
      }
    });
  }

  private recalculateStatsFromTickets(tickets: Ticket[], totalElements?: number): void {
    const byStatus: { [key: string]: number } = {};
    const byPriority: { [key: string]: number } = {};
    let closedCount = 0;
    let openCount = 0;
    let pendingCount = 0;

    for (const ticket of tickets) {
      const status = (ticket.status || '').toUpperCase();
      const priority = (ticket.priority || '').toUpperCase();

      byStatus[status] = (byStatus[status] || 0) + 1;
      byPriority[priority] = (byPriority[priority] || 0) + 1;

      if (CLOSED_STATUSES.includes(status)) {
        closedCount++;
      } else if (OPEN_STATUSES.includes(status)) {
        openCount++;
      } else if (PENDING_STATUSES.includes(status)) {
        pendingCount++;
      }
    }

    this.stats = {
      ...(this.stats as DashboardStats),
      totalTickets: totalElements ?? tickets.length,
      openTickets: openCount,
      pendingReview: pendingCount,
      closedTickets: closedCount,
      byStatus,
      byPriority
    };
  }

  isClosedStatus(status: string): boolean {
    return CLOSED_STATUSES.includes((status || '').toUpperCase());
  }

  initializeCharts(): void {
    this.statusChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { precision: 0 }
        }
      },
      plugins: {
        legend: { display: true }
      }
    };

    this.priorityChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' as const }
      }
    };

    this.dailyTicketChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45,
            autoSkip: true,
            maxTicksLimit: 15
          }
        },
        y: {
          beginAtZero: true,
          ticks: { precision: 0 }
        }
      },
      plugins: {
        legend: { display: false }
      }
    };
  }

  updateCharts(): void {
    if (!this.stats) {
      this.hasStatusData = false;
      this.hasPriorityData = false;
      return;
    }

    const statusEntries = Object.entries(this.stats.byStatus || {}).filter(([, count]) => (count as number) > 0);
    const priorityEntries = Object.entries(this.stats.byPriority || {}).filter(([, count]) => (count as number) > 0);

    this.hasStatusData = statusEntries.length > 0;
    this.hasPriorityData = priorityEntries.length > 0;

    // Status Chart
    this.statusChartData = {
      labels: statusEntries.map(([label]) => label),
      datasets: [{
        label: 'Incidents by Status',
        data: statusEntries.map(([, count]) => count),
        backgroundColor: statusEntries.map(([label]) => STATUS_COLORS[label] || '#9ca3af')
      }]
    };

    // Priority Chart
    this.priorityChartData = {
      labels: priorityEntries.map(([label]) => label),
      datasets: [{
        data: priorityEntries.map(([, count]) => count),
        backgroundColor: priorityEntries.map(([label]) => PRIORITY_COLORS[label] || '#9ca3af')
      }]
    };

    const dailyLabels = this.dailyTicketCounts.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    this.dailyTicketChartData = {
      labels: dailyLabels,
      datasets: [{
        label: 'Tickets Created',
        data: this.dailyTicketCounts.map(item => item.count),
        backgroundColor: '#3b82f6'
      }]
    };
    this.hasDailyTicketData = this.dailyTicketCounts.length > 0;
  }

  exportTicketsCSV(): void {
    if (!this.allTickets || this.allTickets.length === 0) return;

    const headers = ['ID','Type','Location','Status','Priority','Raised By','Created At'];
    const rows = this.allTickets.map(t => [
      t.id,
      t.incidentTypeName || '',
      t.locationName || '',
      t.status || '',
      t.priority || '',
      t.raisedByUsername || '',
      t.createdAt || ''
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cims-tickets-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}