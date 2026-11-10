import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import {
  ItmsBatch,
  ItmsCountByType,
  ItmsDailyTrendPoint,
  ItmsDashboardSummary,
  ItmsHourlyPoint,
  ItmsJunctionCount,
  ItmsPriorityCount,
  ItmsRepeatOffender,
  ItmsService,
  ItmsStatusCount
} from './itms.service';

interface AvailableYearPeriod {
  year: number;
  months: number[];
}

@Component({
  selector: 'app-itms-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    NgChartsModule
  ],
  templateUrl: './itms-dashboard.component.html',
  styleUrl: './itms-dashboard.component.scss'
})
export class ItmsDashboardComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  fromDate = '';
  toDate = '';
  periodFilterLabel = 'Date range';
  periodMenuOpen = false;
  openYear: number | null = null;
  availablePeriods: AvailableYearPeriod[] = [];
  private allEventsFrom = '';
  private allEventsTo = '';
  loading = false;
  initializing = true;
  hasBatch = false;
  errorMessage = '';

  summary: ItmsDashboardSummary | null = null;
  byType: ItmsCountByType[] = [];
  dailyTrend: ItmsDailyTrendPoint[] = [];
  hourly: ItmsHourlyPoint[] = [];
  topJunctions: ItmsJunctionCount[] = [];
  repeatOffenders: ItmsRepeatOffender[] = [];
  byPriority: ItmsPriorityCount[] = [];
  byStatus: ItmsStatusCount[] = [];

  readonly offenderColumns = ['vehicleNumber', 'count'];
  readonly doughnutOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  };
  readonly lineOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
  };
  readonly barOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
  };
  readonly junctionOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: { legend: { display: false } },
    scales: { x: { beginAtZero: true, ticks: { precision: 0 } } }
  };

  typeChart: ChartConfiguration<'doughnut'>['data'] = { labels: [], datasets: [] };
  trendChart: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  hourlyChart: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  junctionChart: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  priorityChart: ChartConfiguration<'doughnut'>['data'] = { labels: [], datasets: [] };
  statusChart: ChartConfiguration<'doughnut'>['data'] = { labels: [], datasets: [] };

  constructor(private readonly itms: ItmsService, private readonly router: Router) {}

  ngOnInit(): void {
    this.itms.getBatches()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: batches => {
          this.initializing = false;
          this.setLatestPeriod(batches);
        },
        error: error => {
          this.initializing = false;
          this.errorMessage = this.getErrorMessage(error, 'Could not load upload history.');
        }
      });
  }

  setDate(which: 'from' | 'to', event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (which === 'from') this.fromDate = value;
    else this.toDate = value;
    this.periodFilterLabel = 'Date range';
    if (this.fromDate && this.toDate) this.loadDashboard();
  }

  togglePeriodMenu(): void {
    this.periodMenuOpen = !this.periodMenuOpen;
    if (!this.periodMenuOpen) this.openYear = null;
  }

  openYearMenu(year: number): void {
    this.openYear = year;
  }

  closeYearMenu(year: number): void {
    if (this.openYear === year) this.openYear = null;
  }

  toggleYearMenu(year: number): void {
    this.openYear = this.openYear === year ? null : year;
  }

  selectAllEvents(): void {
    if (!this.allEventsFrom || !this.allEventsTo) return;
    this.fromDate = this.allEventsFrom;
    this.toDate = this.allEventsTo;
    this.periodFilterLabel = 'All events';
    this.closePeriodMenu();
    this.loadDashboard();
  }

  selectYear(year: number): void {
    const period = this.availablePeriods.find(item => item.year === year);
    if (!period?.months.length) return;
    const firstMonth = Math.min(...period.months);
    const lastMonth = Math.max(...period.months);
    this.fromDate = `${year}-${String(firstMonth).padStart(2, '0')}-01`;
    this.toDate = this.lastDayOfMonth(year, lastMonth);
    this.periodFilterLabel = String(year);
    this.closePeriodMenu();
    this.loadDashboard();
  }

  selectMonth(year: number, month: number): void {
    const value = `${year}-${String(month).padStart(2, '0')}`;
    this.fromDate = `${value}-01`;
    this.toDate = this.lastDayOfMonth(year, month);
    this.periodFilterLabel = `${this.monthName(month)} ${year}`;
    this.closePeriodMenu();
    this.loadDashboard();
  }

  monthName(month: number): string {
    return new Intl.DateTimeFormat('en', { month: 'long', timeZone: 'UTC' })
      .format(new Date(Date.UTC(2020, month - 1, 1)));
  }

  isMonthSelected(year: number, month: number): boolean {
    const monthStart = `${year}-${String(month).padStart(2, '0')}-01`;
    return this.fromDate === monthStart && this.toDate === this.lastDayOfMonth(year, month);
  }

  openVehicleEvents(vehicleNumber: string): void {
    void this.router.navigate(['/itms/events'], { queryParams: { vehicleNumber } });
  }

  get totalJunctions(): number {
    return this.summary?.junctions ?? this.summary?.totalJunctions ?? 0;
  }

  get dashboardTotalEvents(): number {
    return this.summary?.totalEvents ||
      this.byType.reduce((total, item) => total + item.count, 0) ||
      this.hourly.reduce((total, item) => total + item.count, 0);
  }

  get hasDashboardData(): boolean {
    return this.dashboardTotalEvents > 0 ||
      this.dailyTrend.length > 0 ||
      this.topJunctions.length > 0 ||
      this.byPriority.length > 0 ||
      this.byStatus.length > 0 ||
      this.repeatOffenders.length > 0;
  }

  get topEventType(): string {
    return this.summary?.topEventType || this.byType.reduce(
      (top, item) => item.count > (top?.count ?? -1) ? item : top,
      undefined as ItmsCountByType | undefined
    )?.eventType || '—';
  }

  private setLatestPeriod(batches: ItmsBatch[]): void {
    if (batches.length === 0) {
      this.hasBatch = false;
      return;
    }
    this.hasBatch = true;
    this.availablePeriods = this.getAvailablePeriods(batches);
    const batchRanges = batches.map(batch => ({
      from: this.toInputDate(batch.periodFrom ?? batch.periodStart ?? batch.startDate ?? batch.from),
      to: this.toInputDate(batch.periodTo ?? batch.periodEnd ?? batch.endDate ?? batch.to)
    })).filter(range => range.from && range.to && range.from <= range.to);
    this.allEventsFrom = batchRanges.map(range => range.from).sort()[0] ?? '';
    this.allEventsTo = batchRanges.map(range => range.to).sort().at(-1) ?? '';
    const latest = [...batches].sort(
      (a, b) => Date.parse(b.uploadedAt) - Date.parse(a.uploadedAt)
    )[0];
    this.fromDate = this.toInputDate(latest.periodFrom ?? latest.periodStart ?? latest.startDate ?? latest.from);
    this.toDate = this.toInputDate(latest.periodTo ?? latest.periodEnd ?? latest.endDate ?? latest.to);
    if (!this.fromDate || !this.toDate) {
      this.errorMessage = 'The latest upload does not include its event period.';
      return;
    }
    this.loadDashboard();
  }

  private getAvailablePeriods(batches: ItmsBatch[]): AvailableYearPeriod[] {
    const monthsByYear = new Map<number, Set<number>>();
    for (const batch of batches) {
      const start = this.toInputDate(batch.periodFrom ?? batch.periodStart ?? batch.startDate ?? batch.from);
      const end = this.toInputDate(batch.periodTo ?? batch.periodEnd ?? batch.endDate ?? batch.to);
      if (!start || !end || start > end) continue;

      const [startYear, startMonth] = start.split('-').map(Number);
      const [endYear, endMonth] = end.split('-').map(Number);
      for (let year = startYear; year <= endYear; year++) {
        const firstMonth = year === startYear ? startMonth : 1;
        const lastMonth = year === endYear ? endMonth : 12;
        const months = monthsByYear.get(year) ?? new Set<number>();
        for (let month = firstMonth; month <= lastMonth; month++) months.add(month);
        monthsByYear.set(year, months);
      }
    }

    return [...monthsByYear.entries()]
      .sort(([yearA], [yearB]) => yearB - yearA)
      .map(([year, months]) => ({ year, months: [...months].sort((a, b) => a - b) }));
  }

  private lastDayOfMonth(year: number, month: number): string {
    const day = new Date(Date.UTC(year, month, 0)).getUTCDate();
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  private closePeriodMenu(): void {
    this.periodMenuOpen = false;
    this.openYear = null;
  }

  private loadDashboard(): void {
    if (this.fromDate > this.toDate) {
      this.errorMessage = 'The start date must be on or before the end date.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    forkJoin({
      summary: this.itms.getSummary(this.fromDate, this.toDate),
      byType: this.itms.getByType(this.fromDate, this.toDate),
      dailyTrend: this.itms.getDailyTrend(this.fromDate, this.toDate),
      hourly: this.itms.getHourly(this.fromDate, this.toDate),
      topJunctions: this.itms.getTopJunctions(this.fromDate, this.toDate),
      repeatOffenders: this.itms.getRepeatOffenders(this.fromDate, this.toDate),
      byPriority: this.itms.getByPriority(this.fromDate, this.toDate),
      byStatus: this.itms.getByStatus(this.fromDate, this.toDate)
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: result => {
          this.byType = result.byType;
          this.dailyTrend = result.dailyTrend;
          this.hourly = result.hourly;
          this.topJunctions = result.topJunctions.slice(0, 10);
          this.repeatOffenders = result.repeatOffenders;
          this.byPriority = result.byPriority;
          this.byStatus = result.byStatus;
          this.summary = {
            ...result.summary,
            totalEvents: result.summary.totalEvents ||
              result.byType.reduce((total, item) => total + item.count, 0) ||
              result.hourly.reduce((total, item) => total + item.count, 0),
            junctions: result.summary.junctions || result.topJunctions.length
          };
          this.buildCharts();
          this.loading = false;
        },
        error: error => {
          this.loading = false;
          this.errorMessage = this.getErrorMessage(error, 'Could not load ITMS dashboard data.');
        }
      });
  }

  private buildCharts(): void {
    const palette = ['#2673c9', '#f2994a', '#27ae60', '#8e63ce', '#e05252', '#19a6a6', '#d2a12b'];
    this.typeChart = {
      labels: this.byType.map(item => item.eventType),
      datasets: [{ data: this.byType.map(item => item.count), backgroundColor: palette }]
    };
    this.trendChart = {
      labels: this.dailyTrend.map(item => item.date),
      datasets: [{
        data: this.dailyTrend.map(item => item.count),
        label: 'Events',
        borderColor: '#2673c9',
        backgroundColor: 'rgba(38, 115, 201, 0.15)',
        fill: true,
        tension: 0.3
      }]
    };
    this.hourlyChart = {
      labels: this.hourly.map(item => this.hourLabel(item.hour)),
      datasets: [{
        data: this.hourly.map(item => item.count),
        label: 'Events',
        backgroundColor: '#2673c9',
        borderRadius: 4
      }]
    };
    this.junctionChart = {
      labels: this.topJunctions.map(item => item.junction),
      datasets: [{
        data: this.topJunctions.map(item => item.count),
        label: 'Events',
        backgroundColor: '#2673c9',
        borderRadius: 4
      }]
    };
    this.priorityChart = {
      labels: this.byPriority.map(item => item.priority),
      datasets: [{ data: this.byPriority.map(item => item.count), backgroundColor: palette }]
    };
    this.statusChart = {
      labels: this.byStatus.map(item => item.status),
      datasets: [{ data: this.byStatus.map(item => item.count), backgroundColor: palette }]
    };
  }

  private hourLabel(hour: number | string): string {
    const value = String(hour);
    return value.includes(':') ? value : `${value.padStart(2, '0')}:00`;
  }

  private toInputDate(value?: string): string {
    if (!value) return '';
    const datePart = value.slice(0, 10);
    return /^\d{4}-\d{2}-\d{2}$/.test(datePart) ? datePart : '';
  }

  private getErrorMessage(error: HttpErrorResponse, fallback: string): string {
    if (error.status === 401 || error.status === 403) return 'You are not authorized to load ITMS data.';
    if (error.status === 0) return 'Could not reach the ITMS API. Check the network or proxy configuration.';
    const message = error.error?.message ?? error.error?.error;
    return message ? `${fallback} ${message}` : fallback;
  }
}
