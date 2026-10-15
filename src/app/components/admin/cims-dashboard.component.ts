import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { forkJoin, interval, merge, of, Observable, Subject, switchMap, catchError, finalize, map } from 'rxjs';
import {
  CimsDashboardSummary,
  CimsDashboardSummaryResponse,
  CimsFlaggedTicket,
  CimsTicketTrendPoint,
  TasksByAssignee,
  TasksByStatus,
  TicketsAgeingBucket,
  TicketsByAssignee,
  TicketsByIncidentType,
  Ticket,
  PaginatedResponse
} from '../../models/cims.models';
import { CimsService } from '../../services/cims.service';

type DashboardData = {
  summary: CimsDashboardSummary;
  assignees: TicketsByAssignee[];
  incidentTypes: TicketsByIncidentType[];
  ageing: TicketsAgeingBucket[];
  trend: CimsTicketTrendPoint[];
  taskStatuses: TasksByStatus[];
  taskAssignees: TasksByAssignee[];
  flagged: CimsFlaggedTicket[];
  queueTickets: Ticket[];
};

type Metric = { label: string; value: string | number; hint: string; alert?: boolean };

/* ---------- design tokens for charts ---------- */
const PALETTE = ['#1f4e9c', '#2a9d8f', '#e0a030', '#7a5ea8', '#d0584f', '#6b7a8c', '#4c9f70'];
const AGEING_BUCKETS = ['0-1d', '1-3d', '3-7d', '7d+'];
const AGEING_COLORS = ['#4c9f70', '#9bbb59', '#e0a030', '#c94d46'];
const TASK_STATUS_COLORS: Record<string, string> = {
  OPEN: '#1f4e9c',
  PENDING: '#e0a030',
  IN_PROGRESS: '#2a9d8f',
  RESOLVED: '#4c9f70',
  COMPLETED: '#4c9f70',
  OVERDUE: '#c94d46',
  CANCELLED: '#9aa7b4'
};
const TICK = { color: '#6b7a8c', font: { size: 11 } };
const GRID = { color: 'rgba(107,122,140,.16)' };
const LEGEND = { position: 'bottom' as const, labels: { usePointStyle: true, boxWidth: 8, color: '#51606f', font: { size: 11 } } };

const SECTION_LABELS: Record<string, string> = {
  summary: 'key figures',
  assignees: 'tickets by assignee',
  incidentTypes: 'incident types',
  ageing: 'ageing',
  trend: 'created vs closed',
  taskStatuses: 'task status',
  taskAssignees: 'tasks by assignee',
  flagged: 'flagged tickets'
};

function pointerOnHover(event: any, elements: any[]): void {
  const el = event?.native?.target as HTMLElement | undefined;
  if (el) el.style.cursor = elements.length ? 'pointer' : 'default';
}

function buildBarOptions(clickable: boolean): ChartConfiguration<'bar'>['options'] {
  return {
    responsive: true,
    maintainAspectRatio: false,
    onHover: clickable ? pointerOnHover : undefined,
    scales: {
      x: { grid: { display: false }, ticks: { ...TICK, autoSkip: false } },
      y: { beginAtZero: true, grid: GRID, ticks: { ...TICK, precision: 0 } }
    },
    plugins: { legend: { display: false } }
  };
}

function buildDoughnutOptions(clickable: boolean): ChartConfiguration<'doughnut'>['options'] {
  return {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '66%',
    onHover: clickable ? pointerOnHover : undefined,
    plugins: { legend: LEGEND }
  };
}

@Component({
  selector: 'app-cims-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NgChartsModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule],
  template: `
    <main class="dashboard-page">
      <header class="page-header">
        <div>
          <p class="breadcrumb">CIMS / Overview</p>
          <h1>CIMS dashboard</h1>
          <p class="subtitle">Ticket workload, ageing, task progress and follow-ups</p>
        </div>
        <div class="header-actions">
          <span class="updated" *ngIf="lastUpdated">Updated {{ lastUpdated | date: 'h:mm a' }}</span>
          <button mat-stroked-button type="button" (click)="refresh()" [disabled]="refreshing">
            <mat-spinner *ngIf="refreshing" diameter="16"></mat-spinner>
            <mat-icon *ngIf="!refreshing">refresh</mat-icon>
            Refresh
          </button>
        </div>
      </header>

      <div class="error-strip" *ngIf="errorMessage" role="alert">
        <mat-icon>error_outline</mat-icon>
        <span>{{ errorMessage }}</span>
        <button mat-button type="button" (click)="refresh()">Try again</button>
      </div>

      <!-- Key figures -->
      <section class="kpi-strip" aria-label="Key figures">
        <div class="kpi" *ngFor="let m of metrics; trackBy: trackByLabel" [class.alert]="m.alert">
          <span class="kpi-label">{{ m.label }}</span>
          <span class="skeleton skeleton-value" *ngIf="loading && !data"></span>
          <span class="kpi-value" *ngIf="!(loading && !data)">{{ m.value }}</span>
          <span class="kpi-hint">{{ m.hint }}</span>
        </div>
      </section>

      <!-- Ticket workload -->
      <section class="section" aria-label="Ticket workload">
        <h2 class="section-title">Ticket workload</h2>
        <div class="charts-grid">
          <article class="panel">
            <header class="panel-head">
              <div><h3>In-queue tickets by assignee</h3><p>Open and pending tickets</p></div>
              <span class="panel-total" *ngIf="data?.assignees?.length">{{ sum(data?.assignees) }} total</span>
            </header>
            <div class="chart-wrap" *ngIf="assigneeChartData?.labels?.length; else emptyAssignees">
              <canvas baseChart [type]="'bar'" [data]="assigneeChartData" [options]="assigneeOptions" (chartClick)="onAssigneeClick($event)"></canvas>
            </div>
            <ng-template #emptyAssignees>
              <ng-container *ngTemplateOutlet="emptyTpl; context: { key: 'assignees', text: 'No tickets in the queue' }"></ng-container>
            </ng-template>
          </article>

          <article class="panel">
            <header class="panel-head">
              <div><h3>Tickets by incident type</h3><p>Select a segment to open the matching tickets</p></div>
            </header>
            <div class="chart-wrap" *ngIf="incidentChartData?.labels?.length; else emptyIncidents">
              <canvas baseChart [type]="'doughnut'" [data]="incidentChartData" [options]="incidentOptions" (chartClick)="onIncidentTypeClick($event)"></canvas>
            </div>
            <ng-template #emptyIncidents>
              <ng-container *ngTemplateOutlet="emptyTpl; context: { key: 'incidentTypes', text: 'No incident type data' }"></ng-container>
            </ng-template>
          </article>

          <article class="panel">
            <header class="panel-head">
              <div><h3>Ageing</h3><p>Days since the ticket was raised</p></div>
            </header>
            <div class="chart-wrap" *ngIf="ageingChartData?.labels?.length; else emptyAgeing">
              <canvas baseChart [type]="'bar'" [data]="ageingChartData" [options]="ageingOptions"></canvas>
            </div>
            <ng-template #emptyAgeing>
              <ng-container *ngTemplateOutlet="emptyTpl; context: { key: 'ageing', text: 'No ageing data' }"></ng-container>
            </ng-template>
          </article>

          <article class="panel">
            <header class="panel-head">
              <div><h3>Created vs closed</h3><p>Tickets per day</p></div>
              <div class="range-toggle" role="group" aria-label="Trend period">
                <button *ngFor="let range of trendRanges" type="button" [class.selected]="trendDays === range" (click)="setTrendDays(range)">{{ range }}d</button>
              </div>
            </header>
            <div class="chart-wrap" *ngIf="trendChartData?.labels?.length; else emptyTrend">
              <canvas baseChart [type]="'line'" [data]="trendChartData" [options]="trendOptions" (chartClick)="onTrendClick($event)"></canvas>
            </div>
            <ng-template #emptyTrend>
              <ng-container *ngTemplateOutlet="emptyTpl; context: { key: 'trend', text: 'No tickets in this period' }"></ng-container>
            </ng-template>
          </article>
        </div>
      </section>

      <!-- Task progress -->
      <section class="section" aria-label="Task progress">
        <h2 class="section-title">Task progress</h2>
        <div class="charts-grid">
          <article class="panel">
            <header class="panel-head">
              <div><h3>Tasks by status</h3><p>All assigned tasks</p></div>
              <span class="panel-total" *ngIf="data?.taskStatuses?.length">{{ sum(data?.taskStatuses) }} total</span>
            </header>
            <div class="chart-wrap" *ngIf="taskStatusChartData?.labels?.length; else emptyTaskStatus">
              <canvas baseChart [type]="'doughnut'" [data]="taskStatusChartData" [options]="taskStatusOptions"></canvas>
            </div>
            <ng-template #emptyTaskStatus>
              <ng-container *ngTemplateOutlet="emptyTpl; context: { key: 'taskStatuses', text: 'No tasks yet' }"></ng-container>
            </ng-template>
          </article>

          <article class="panel">
            <header class="panel-head">
              <div><h3>Tasks by assignee</h3><p>Pending and overdue per person</p></div>
            </header>
            <div class="chart-wrap" *ngIf="taskAssigneeChartData?.labels?.length; else emptyTaskAssignees">
              <canvas baseChart [type]="'bar'" [data]="taskAssigneeChartData" [options]="taskAssigneeOptions"></canvas>
            </div>
            <ng-template #emptyTaskAssignees>
              <ng-container *ngTemplateOutlet="emptyTpl; context: { key: 'taskAssignees', text: 'No tasks are assigned' }"></ng-container>
            </ng-template>
          </article>
        </div>
      </section>

      <!-- Flagged tickets -->
      <section class="section" aria-label="Flagged tickets">
        <h2 class="section-title">Needs attention</h2>
        <article class="panel table-panel">
          <header class="panel-head">
            <div>
              <h3>Flagged tickets <span class="flag-count" [class.zero]="!data?.flagged?.length">{{ data?.flagged?.length || 0 }}</span></h3>
              <p>No action has been taken within the flag threshold</p>
            </div>
          </header>

          <div class="table-state" *ngIf="loading && !data">
            <div class="skeleton skeleton-row" *ngFor="let row of [1, 2, 3]"></div>
          </div>
          <div class="table-state" *ngIf="!(loading && !data) && !data?.flagged?.length">
            <mat-icon>{{ isFailed('flagged') ? 'cloud_off' : 'task_alt' }}</mat-icon>
            <span>{{ isFailed('flagged') ? 'Could not load flagged tickets' : 'No flagged tickets right now' }}</span>
          </div>

          <div class="table-scroll" *ngIf="data?.flagged?.length">
            <table>
              <thead>
                <tr><th>Ticket</th><th>Title</th><th>Assignee</th><th>Pending for</th><th class="num">Reminders</th><th class="action-col">Action</th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let ticket of data?.flagged; trackBy: trackById">
                  <td><a [routerLink]="ticketDetailRoute(ticket.id)">#{{ ticket.id }}</a></td>
                  <td class="title-cell">{{ ticket.title }}</td>
                  <td>{{ ticket.assigneeName || 'Unassigned' }}</td>
                  <td><span class="age-chip" [class.critical]="ticket.hoursPending >= 72">{{ formatHours(ticket.hoursPending) }}</span></td>
                  <td class="num">{{ ticket.remindersSent }}</td>
                  <td class="action-col">
                    <button *ngIf="canRemind" mat-stroked-button type="button" (click)="remind(ticket)" [disabled]="remindingId === ticket.id">
                      <mat-spinner *ngIf="remindingId === ticket.id" diameter="16"></mat-spinner>
                      <mat-icon *ngIf="remindingId !== ticket.id">notifications_active</mat-icon>
                      Send reminder
                    </button>
                    <span *ngIf="!canRemind" class="no-action">View only</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </main>

    <ng-template #emptyTpl let-key="key" let-text="text">
      <div class="empty-chart">
        <div class="skeleton skeleton-chart" *ngIf="loading && !data"></div>
        <ng-container *ngIf="!(loading && !data)">
          <mat-icon>{{ isFailed(key) ? 'cloud_off' : 'insert_chart_outlined' }}</mat-icon>
          <span>{{ isFailed(key) ? 'Could not load this section' : text }}</span>
        </ng-container>
      </div>
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
      --ink: var(--cims-ink, #1a2b3c);
      --muted: var(--cims-muted, #66768a);
      --line: var(--cims-border, #dde3ea);
      --surface: var(--cims-surface, #ffffff);
      --soft: var(--cims-header, #f3f6f9);
      --brand: #1f4e9c;
      --danger: #c0392b;
      --danger-soft: #fbe9e7;
      --warn: #b7791f;
      --warn-soft: #fdf1d8;
      color: var(--ink);
    }
    .dashboard-page { max-width: 1440px; margin: 0 auto; padding: 8px 4px 40px; }

    /* header */
    .page-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin: 6px 0 20px; }
    .breadcrumb { margin: 0 0 4px; color: var(--muted); font-size: .8rem; }
    h1 { margin: 0; font-size: 1.6rem; font-weight: 700; line-height: 1.2; letter-spacing: -.01em; }
    .subtitle { margin: 4px 0 0; color: var(--muted); font-size: .9rem; }
    .header-actions { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
    .updated { color: var(--muted); font-size: .8rem; }
    button mat-icon, button mat-spinner { margin-right: 6px; }
    button mat-spinner { display: inline-block; vertical-align: middle; }

    /* key figures: one band, hairline separators */
    .kpi-strip { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 1px; margin-bottom: 26px; overflow: hidden; background: var(--line); border: 1px solid var(--line); border-radius: 6px; }
    .kpi { display: flex; flex-direction: column; gap: 4px; padding: 16px 18px; background: var(--surface); min-width: 0; }
    .kpi-label { color: var(--muted); font-size: .82rem; font-weight: 500; }
    .kpi-value { font-size: 1.85rem; font-weight: 700; line-height: 1.15; font-variant-numeric: tabular-nums; }
    .kpi-hint { color: var(--muted); font-size: .76rem; }
    .kpi.alert .kpi-value { color: var(--danger); }

    /* sections */
    .section { margin-bottom: 26px; }
    .section-title { margin: 0 0 12px; font-size: 1.05rem; font-weight: 700; }
    .charts-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
    .panel { min-width: 0; padding: 16px 18px 18px; background: var(--surface); border: 1px solid var(--line); border-radius: 6px; }
    .panel-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
    .panel-head h3 { margin: 0; font-size: .98rem; font-weight: 650; }
    .panel-head p { margin: 3px 0 0; color: var(--muted); font-size: .78rem; }
    .panel-total { flex-shrink: 0; color: var(--muted); font-size: .8rem; font-variant-numeric: tabular-nums; }
    .chart-wrap { position: relative; height: 270px; margin-top: 14px; }
    .empty-chart { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; height: 270px; margin-top: 14px; color: var(--muted); font-size: .86rem; }
    .empty-chart mat-icon { width: 30px; height: 30px; font-size: 30px; opacity: .55; }

    .range-toggle { display: flex; flex-shrink: 0; overflow: hidden; border: 1px solid var(--line); border-radius: 5px; }
    .range-toggle button { height: 28px; min-width: 40px; padding: 0 8px; border: 0; border-right: 1px solid var(--line); background: transparent; color: var(--ink); font-size: .78rem; cursor: pointer; }
    .range-toggle button:last-child { border-right: 0; }
    .range-toggle button:hover:not(.selected) { background: var(--soft); }
    .range-toggle button.selected { background: var(--brand); color: #fff; }
    .range-toggle button:focus-visible, .panel a:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }

    /* flagged table */
    .table-panel { padding: 16px 0 0; overflow: hidden; }
    .table-panel .panel-head { padding: 0 18px 12px; border-bottom: 1px solid var(--line); }
    .flag-count { display: inline-grid; place-items: center; min-width: 22px; height: 22px; padding: 0 6px; margin-left: 6px; color: var(--danger); background: var(--danger-soft); border-radius: 11px; font-size: .76rem; font-weight: 700; vertical-align: middle; }
    .flag-count.zero { color: var(--muted); background: var(--soft); }
    .table-scroll { overflow-x: auto; }
    table { width: 100%; min-width: 760px; border-collapse: collapse; }
    th, td { padding: 11px 18px; text-align: left; border-bottom: 1px solid var(--line); }
    tbody tr:last-child td { border-bottom: 0; }
    th { color: var(--muted); background: var(--soft); font-size: .78rem; font-weight: 600; }
    td { font-size: .87rem; }
    td a { color: var(--brand); font-weight: 650; text-decoration: none; }
    td a:hover { text-decoration: underline; }
    .title-cell { max-width: 340px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .num { text-align: right; font-variant-numeric: tabular-nums; }
    .action-col { text-align: right; white-space: nowrap; }
    .age-chip { display: inline-block; padding: 2px 9px; color: var(--warn); background: var(--warn-soft); border-radius: 10px; font-size: .78rem; font-weight: 650; }
    .age-chip.critical { color: var(--danger); background: var(--danger-soft); }
    .no-action { color: var(--muted); font-size: .8rem; }
    .table-state { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 8px; min-height: 110px; color: var(--muted); font-size: .88rem; }

    /* feedback */
    .error-strip { display: flex; align-items: center; gap: 10px; padding: 9px 12px; margin-bottom: 16px; color: #8a2b22; background: #fdf0ee; border: 1px solid #efc9c4; border-radius: 5px; font-size: .86rem; }
    .error-strip span { flex: 1; }
    .skeleton { position: relative; overflow: hidden; background: var(--cims-skeleton, #e8edf2); border-radius: 4px; }
    .skeleton::after { content: ''; position: absolute; inset: 0; transform: translateX(-100%); background: linear-gradient(90deg, transparent, rgba(255,255,255,.5), transparent); animation: shimmer 1.3s infinite; }
    .skeleton-value { width: 70px; height: 30px; }
    .skeleton-chart { width: 100%; height: 100%; }
    .skeleton-row { width: calc(100% - 36px); height: 30px; margin: 8px 18px; }
    @keyframes shimmer { to { transform: translateX(100%); } }
    @media (prefers-reduced-motion: reduce) { .skeleton::after { animation: none; } }

    /* responsive */
    @media (max-width: 1100px) { .kpi-strip { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    @media (max-width: 760px) {
      .page-header { flex-direction: column; align-items: flex-start; }
      .charts-grid { grid-template-columns: 1fr; }
      .kpi-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .kpi { padding: 13px 14px; }
      .kpi-value { font-size: 1.55rem; }
      .chart-wrap, .empty-chart { height: 240px; }
    }
  `]
})
export class CimsDashboardComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly refreshRequests = new Subject<void>();
  private readonly userRole = (sessionStorage.getItem('role') || '').toUpperCase();
  readonly canRemind = ['ADMIN', 'COORDINATOR'].includes(this.userRole);
  readonly trendRanges: readonly (7 | 30 | 90)[] = [7, 30, 90];

  data: DashboardData | null = null;
  metrics: Metric[] = this.buildMetrics(undefined);
  loading = true;
  refreshing = false;
  errorMessage = '';
  lastUpdated: Date | null = null;
  remindingId: number | null = null;
  trendDays: 7 | 30 | 90 = 30;
  trendPoints: CimsTicketTrendPoint[] = [];
  private failed = new Set<string>();

  assigneeChartData: any;
  incidentChartData: any;
  ageingChartData: any;
  trendChartData: any;
  taskStatusChartData: any;
  taskAssigneeChartData: any;

  readonly assigneeOptions = buildBarOptions(true);
  readonly ageingOptions = buildBarOptions(false);
  readonly incidentOptions = buildDoughnutOptions(true);
  readonly taskStatusOptions = buildDoughnutOptions(false);
  readonly trendOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    onHover: pointerOnHover,
    scales: {
      x: { grid: { display: false }, ticks: { ...TICK, maxTicksLimit: 8, maxRotation: 0 } },
      y: { beginAtZero: true, grid: GRID, ticks: { ...TICK, precision: 0 } }
    },
    plugins: { legend: LEGEND }
  };
  readonly taskAssigneeOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: { beginAtZero: true, grid: GRID, ticks: { ...TICK, precision: 0 } },
      y: { grid: { display: false }, ticks: TICK }
    },
    plugins: { legend: LEGEND }
  };

  constructor(private cimsService: CimsService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    merge(of(undefined), interval(5 * 60 * 1000), this.refreshRequests)
      .pipe(
        switchMap(() => {
          this.refreshing = true;
          this.loading = !this.data;
          this.errorMessage = '';
          return this.fetchDashboard().pipe(
            finalize(() => { this.loading = false; this.refreshing = false; }),
            catchError(() => {
              this.errorMessage = 'Dashboard data could not be refreshed. Check your connection and try again.';
              return of(null);
            })
          );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((result) => {
        if (!result) return;
        this.data = result;
        this.trendPoints = result.trend;
        this.metrics = this.buildMetrics(result.summary);
        this.lastUpdated = new Date();
        this.updateCharts(result);
        if (this.failed.size) {
          const names = [...this.failed].map((key) => SECTION_LABELS[key] || key).join(', ');
          this.errorMessage = `Some sections could not be loaded: ${names}.`;
        }
      });
  }

  refresh(): void {
    this.refreshRequests.next();
  }

  isFailed(key: string): boolean {
    return this.failed.has(key);
  }

  trackByLabel(_: number, metric: Metric): string {
    return metric.label;
  }

  trackById(_: number, ticket: CimsFlaggedTicket): number {
    return ticket.id;
  }

  sum(items: { count: number }[] | undefined | null): number {
    return (items || []).reduce((total, item) => total + (item.count || 0), 0);
  }

  formatHours(hours: number): string {
    const value = Math.max(0, Math.round(hours || 0));
    if (value < 24) return `${value} h`;
    const days = Math.floor(value / 24);
    const rest = value % 24;
    return rest ? `${days} d ${rest} h` : `${days} d`;
  }

  setTrendDays(days: 7 | 30 | 90): void {
    if (this.trendDays === days) return;
    this.trendDays = days;
    this.cimsService.getTicketsTrend(days)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (points) => {
          this.trendPoints = points;
          this.updateTrendChart(points);
        },
        error: () => this.snackBar.open('Ticket trend could not be loaded.', 'Dismiss', { duration: 4000 })
      });
  }

  remind(ticket: CimsFlaggedTicket): void {
    if (!this.canRemind || this.remindingId !== null) return;
    this.remindingId = ticket.id;
    this.cimsService.remindFlaggedTicket(ticket.id)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => { this.remindingId = null; }))
      .subscribe({
        next: (response) => {
          if (this.data) {
            this.data = {
              ...this.data,
              flagged: this.data.flagged.map((item) => item.id === ticket.id
                ? { ...item, remindersSent: response?.remindersSent ?? response?.reminderCount ?? item.remindersSent + 1 }
                : item)
            };
          }
          this.snackBar.open(response?.message || `Reminder sent for ticket #${ticket.id}.`, 'Dismiss', { duration: 4000 });
        },
        error: () => this.snackBar.open(`Reminder for ticket #${ticket.id} could not be sent.`, 'Dismiss', { duration: 5000 })
      });
  }

  ticketDetailRoute(ticketId: number): string {
    const routeByRole: Record<string, string> = {
      ADMIN: '/cims/admin/tickets',
      COORDINATOR: '/cims/coordinator/tickets',
      REVIEWER: '/cims/reviewer/tickets',
      FIELD_PERSON: '/cims/field-person/tickets',
      SUPPORT_ENGINEER: '/cims/support-engineer/tickets'
    };
    return `${routeByRole[this.userRole] || '/cims/admin/tickets'}/${ticketId}`;
  }

  /* ---------- chart drill-down: opens All Tickets with filters ---------- */
  onAssigneeClick(event: any): void {
    const index = event?.active?.[0]?.index;
    const assignee = Number.isInteger(index) ? this.data?.assignees[index] : undefined;
    if (assignee) this.openTicketFilters({ assigneeId: assignee.assigneeId });
  }

  onIncidentTypeClick(event: any): void {
    const index = event?.active?.[0]?.index;
    const incidentType = Number.isInteger(index) ? this.data?.incidentTypes[index] : undefined;
    if (incidentType) this.openTicketFilters({ incidentTypeId: incidentType.incidentTypeId });
  }

  onTrendClick(event: any): void {
    const index = event?.active?.[0]?.index;
    const point = Number.isInteger(index) ? this.trendPoints[index] : undefined;
    if (point) this.openTicketFilters({ fromDate: point.date, toDate: point.date });
  }

  /* ---------- data loading: every widget loads independently ---------- */
  private safe<T>(key: string, source: Observable<T>, fallback: T): Observable<T> {
    return source.pipe(catchError(() => {
      this.failed.add(key);
      return of(fallback);
    }));
  }

  private fetchDashboard(): Observable<DashboardData> {
    this.failed = new Set<string>();
    const api = this.cimsService;
    return forkJoin({
      summary: this.safe<CimsDashboardSummaryResponse | null>('summary', api.getCimsDashboardSummary(), null),
      assignees: this.safe<TicketsByAssignee[]>('assignees', api.getTicketsByAssignee(), []),
      incidentTypes: this.safe<TicketsByIncidentType[]>('incidentTypes', api.getTicketsByIncidentType(), []),
      ageing: this.safe<TicketsAgeingBucket[]>('ageing', api.getTicketsAgeingBuckets(), []),
      trend: this.safe<CimsTicketTrendPoint[]>('trend', api.getTicketsTrend(this.trendDays), []),
      taskStatuses: this.safe<TasksByStatus[]>('taskStatuses', api.getTasksByStatus(), []),
      taskAssignees: this.safe<TasksByAssignee[]>('taskAssignees', api.getTasksByAssignee(), []),
      flagged: this.safe<any[]>('flagged', api.getFlaggedTickets(), []),
      queueTickets: this.safe<Ticket[]>('summary', this.getCurrentRoleQueue(), [])
    }).pipe(
      map((raw): DashboardData => ({
        ...raw,
        summary: this.normalizeSummary(raw.summary, raw.assignees, raw.ageing, raw.queueTickets),
        flagged: this.normalizeFlagged(raw.flagged)
      }))
    );
  }

  private getCurrentRoleQueue(): Observable<Ticket[]> {
    const responseToTickets = (response: Ticket[] | PaginatedResponse<Ticket> | any): Ticket[] =>
      Array.isArray(response) ? response : response?.content ?? response?.data ?? response?.tickets ?? [];
    let request: Observable<Ticket[] | PaginatedResponse<Ticket>>;
    switch (this.userRole) {
      case 'FIELD_PERSON':
      case 'COORDINATOR':
        request = this.cimsService.getFieldPersonQueue(0, 500);
        break;
      case 'REVIEWER':
        request = this.cimsService.getReviewQueue(0, 500);
        break;
      case 'SUPPORT_ENGINEER':
        request = this.cimsService.getMyTickets(0, 500);
        break;
      default:
        request = this.cimsService.getAllTickets(0, 500);
    }
    return request.pipe(map(responseToTickets));
  }

  private normalizeSummary(
    raw: CimsDashboardSummaryResponse | null,
    assignees: TicketsByAssignee[],
    ageing: TicketsAgeingBucket[],
    queueTickets: Ticket[]
  ): CimsDashboardSummary {
    const source = raw && typeof raw === 'object' ? raw as Record<string, unknown> : {};
    const nested = source['summary'] && typeof source['summary'] === 'object'
      ? source['summary'] as Record<string, unknown>
      : {};
    const summary = { ...source, ...nested };
    const readNumber = (aliases: string[], pattern?: RegExp): number | undefined => {
      for (const alias of aliases) {
        const value = summary[alias];
        const parsed = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN;
        if (Number.isFinite(parsed)) return parsed;
      }
      if (pattern) {
        for (const [key, value] of Object.entries(summary)) {
          if (!pattern.test(key.replace(/[^a-z0-9]/gi, '').toLowerCase())) continue;
          const parsed = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN;
          if (Number.isFinite(parsed)) return parsed;
        }
      }
      return undefined;
    };

    const assigneeTotal = assignees.reduce((total, row) => total + (Number(row.count) || 0), 0);
    const validDates = queueTickets.map((ticket) => new Date(ticket.createdAt).getTime()).filter(Number.isFinite);
    const ages = validDates.map((created) => Math.max(0, (Date.now() - created) / 86400000));
    const queueCountFromTickets = queueTickets.length;
    const queueCountFromApi = readNumber(
      ['ticketsInQueue', 'totalInQueue', 'inQueueTickets', 'queueTickets', 'queueCount', 'queueTicketCount', 'openAndPendingTickets', 'openAndPendingCount', 'openTicketsInQueue'],
      /(?:queue|pending).*(?:ticket|incident|count)|(?:ticket|incident).*(?:queue|inqueue)/
    );
    const averageFromApi = readNumber(
      ['averageAgeDays', 'avgAgeDays', 'averageAge', 'averageTicketAgeDays', 'averageTicketAgeInDays', 'averageTicketAge'],
      /(?:average|avg).*(?:age|days)|(?:age|days).*(?:average|avg)/
    );
    const oldestFromApi = readNumber(
      ['oldestTicketDays', 'oldestTicketAgeDays', 'oldestAgeDays', 'oldestDays', 'maxAgeDays', 'maxTicketAgeInDays'],
      /(?:oldest|max).*(?:age|days)|(?:age|days).*(?:oldest|max)/
    );
    const nonEmptyAgeing = ageing.filter((bucket) => Number(bucket.count) > 0);
    const oldestBucketMin: Record<string, number> = { '0-1d': 0, '1-3d': 1, '3-7d': 3, '7d+': 7 };
    const bucketOldest = nonEmptyAgeing.length
      ? Math.max(...nonEmptyAgeing.map((bucket) => oldestBucketMin[bucket.bucket] ?? 0))
      : undefined;
    const averageFromBuckets = ageing.length
      ? ageing.reduce((sum, bucket) => {
          const midpoint: Record<string, number> = { '0-1d': 0.5, '1-3d': 2, '3-7d': 5, '7d+': 10 };
          return sum + (Number(bucket.count) || 0) * (midpoint[bucket.bucket] ?? 0);
        }, 0) / Math.max(1, ageing.reduce((sum, bucket) => sum + (Number(bucket.count) || 0), 0))
      : undefined;

    return {
      ticketsInQueue: Math.max(queueCountFromApi ?? 0, queueCountFromTickets, assigneeTotal),
      flaggedTickets: readNumber(['flaggedTickets', 'flaggedCount', 'flaggedTicketCount', 'totalFlagged', 'flagged'], /flagged.*(?:ticket|count)|(?:ticket|count).*flagged/) ?? 0,
      averageAgeDays: ages.length ? ages.reduce((sum, age) => sum + age, 0) / ages.length : averageFromApi ?? averageFromBuckets ?? 0,
      oldestTicketDays: ages.length ? Math.max(...ages) : oldestFromApi ?? bucketOldest ?? 0,
      tasksPending: readNumber(['tasksPending', 'pendingTasks', 'pendingTaskCount', 'taskPendingCount'], /pending.*task|task.*pending/) ?? 0,
      tasksOverdue: readNumber(['tasksOverdue', 'overdueTasks', 'overdueTaskCount', 'taskOverdueCount'], /overdue.*task|task.*overdue/) ?? 0
    };
  }

  private normalizeFlagged(items: any[]): CimsFlaggedTicket[] {
    return (items || [])
      .map((item: any) => ({
        ...item,
        id: item.id ?? item.ticketId,
        title: item.title ?? item.incidentTypeName ?? `Ticket #${item.id ?? item.ticketId}`,
        assigneeName: item.assigneeName ?? item.assignee ?? item.userName ?? '',
        hoursPending: Math.round(item.hoursPending ?? 0),
        remindersSent: item.remindersSent ?? item.reminderCount ?? 0
      }))
      .sort((a: any, b: any) => b.hoursPending - a.hoursPending) as CimsFlaggedTicket[];
  }

  private buildMetrics(summary: CimsDashboardSummary | undefined): Metric[] {
    const flagged = summary?.flaggedTickets ?? 0;
    const overdue = summary?.tasksOverdue ?? 0;
    return [
      { label: 'Tickets in queue', value: summary?.ticketsInQueue ?? 0, hint: 'Open and pending' },
      { label: 'Flagged', value: flagged, hint: 'No action after 24 hours', alert: flagged > 0 },
      { label: 'Average age', value: this.formatDays(summary?.averageAgeDays), hint: 'Tickets in the queue' },
      { label: 'Oldest ticket', value: this.formatDays(summary?.oldestTicketDays), hint: 'Longest waiting' },
      { label: 'Tasks pending', value: summary?.tasksPending ?? 0, hint: 'Not yet completed' },
      { label: 'Tasks overdue', value: overdue, hint: 'Past the due date', alert: overdue > 0 }
    ];
  }

  private formatDays(value: number | undefined): string {
    const days = Math.round((value ?? 0) * 10) / 10;
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  }

  /* ---------- chart data ---------- */
  private updateCharts(data: DashboardData): void {
    this.assigneeChartData = {
      labels: data.assignees.map((item) => item.assigneeName),
      datasets: [{ label: 'Tickets', data: data.assignees.map((item) => item.count), backgroundColor: PALETTE[0], borderRadius: 4, maxBarThickness: 48 }]
    };
    this.incidentChartData = {
      labels: data.incidentTypes.map((item) => item.incidentTypeName),
      datasets: [{ data: data.incidentTypes.map((item) => item.count), backgroundColor: PALETTE, borderWidth: 0, hoverOffset: 4 }]
    };
    this.ageingChartData = {
      labels: data.ageing.map((item) => item.bucket),
      datasets: [{
        label: 'Tickets',
        data: data.ageing.map((item) => item.count),
        backgroundColor: data.ageing.map((item) => AGEING_COLORS[AGEING_BUCKETS.indexOf(item.bucket)] || '#8a98a6'),
        borderRadius: 4,
        maxBarThickness: 56
      }]
    };
    this.updateTrendChart(data.trend);
    this.taskStatusChartData = {
      labels: data.taskStatuses.map((item) => this.prettyStatus(item.status)),
      datasets: [{
        data: data.taskStatuses.map((item) => item.count),
        backgroundColor: data.taskStatuses.map((item, i) => TASK_STATUS_COLORS[String(item.status).toUpperCase()] || PALETTE[i % PALETTE.length]),
        borderWidth: 0,
        hoverOffset: 4
      }]
    };
    this.taskAssigneeChartData = {
      labels: data.taskAssignees.map((item) => item.assigneeName),
      datasets: [
        { label: 'Pending', data: data.taskAssignees.map((item) => item.pending), backgroundColor: '#e0a030', borderRadius: 3, maxBarThickness: 18 },
        { label: 'Overdue', data: data.taskAssignees.map((item) => item.overdue), backgroundColor: '#c94d46', borderRadius: 3, maxBarThickness: 18 }
      ]
    };
  }

  private updateTrendChart(points: CimsTicketTrendPoint[]): void {
    this.trendChartData = {
      labels: points.map((point) => this.shortDate(point.date)),
      datasets: [
        { label: 'Created', data: points.map((point) => point.created), borderColor: PALETTE[0], backgroundColor: 'rgba(31,78,156,.10)', borderWidth: 2, pointRadius: 0, pointHoverRadius: 4, tension: .3, fill: true },
        { label: 'Closed', data: points.map((point) => point.closed), borderColor: PALETTE[1], backgroundColor: 'rgba(42,157,143,.08)', borderWidth: 2, pointRadius: 0, pointHoverRadius: 4, tension: .3, fill: false }
      ]
    };
  }

  private shortDate(value: string): string {
    const date = new Date(`${value}T00:00:00`);
    return isNaN(date.getTime()) ? value : date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  }

  private prettyStatus(status: string): string {
    const text = String(status || '').replace(/_/g, ' ').toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  /* All Tickets lives at /cims/admin/all-tickets (see the sidebar). The page must
     read these query params: assigneeId, incidentTypeId, fromDate, toDate. */
  private openTicketFilters(queryParams: Record<string, string | number>): void {
    this.router.navigate(['/cims/admin/all-tickets'], { queryParams });
  }
}