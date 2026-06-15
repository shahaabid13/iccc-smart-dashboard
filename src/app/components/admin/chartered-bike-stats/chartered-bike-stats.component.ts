import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Subject, takeUntil } from 'rxjs';
import { SmcService } from '../../../services/smc.service';
import { CharteredBikeStationStatsDto, CharteredBikeStationNamesDto } from '../../../models/chartered-bike';

@Component({
  selector: 'app-chartered-bike-stats',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
    NgChartsModule,
  ],
  templateUrl: './chartered-bike-stats.component.html',
  styleUrls: ['./chartered-bike-stats.component.scss'],
})
export class CharteredBikeStatsComponent implements OnInit, OnDestroy {
  @ViewChild('lineChart') lineChart!: BaseChartDirective;

  statsForm!: FormGroup;
  stationNames: CharteredBikeStationNamesDto[] = [];
  statsData: CharteredBikeStationStatsDto[] = [];
  selectedStats: CharteredBikeStationStatsDto | null = null;
  loading = false;
  error: string | null = null;

  // Chart data
  lineChartData!: ChartConfiguration<'line'>['data'];
  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { color: '#666' },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#666' },
      },
    },
  };

  private destroy$ = new Subject<void>();

  constructor(private smcService: SmcService, private fb: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadStationNames();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    this.statsForm = this.fb.group({
      stationName: ['', Validators.required],
      startDate: [sevenDaysAgo, Validators.required],
      endDate: [today, Validators.required],
    });
  }

  loadStationNames(): void {
    this.loading = true;
    this.smcService
      .getCharteredBikeStationNames()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.stationNames = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading station names:', err);
          this.error = 'Failed to load station names. Please try again.';
          this.loading = false;
        },
      });
  }

  loadStats(): void {
    if (!this.statsForm.valid) {
      this.error = 'Please select a station and date range.';
      return;
    }

    this.loading = true;
    this.error = null;
    const { stationName, startDate, endDate } = this.statsForm.value;
    const startDateStr = this.formatDate(startDate);
    const endDateStr = this.formatDate(endDate);

    this.smcService
      .getCharteredBikeStationStats(stationName, startDateStr, endDateStr)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.statsData = data;
          if (data.length > 0) {
            this.selectedStats = data[0];
            this.updateCharts();
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading stats:', err);
          this.error = 'Failed to load statistics. Please try again.';
          this.loading = false;
        },
      });
  }

  onStatSelected(stat: CharteredBikeStationStatsDto): void {
    this.selectedStats = stat;
    this.updateCharts();
  }

  private updateCharts(): void {
    if (!this.selectedStats) return;

    // Simulate chart data with mock values (since we only have summary stats)
    const stat = this.selectedStats;

    this.lineChartData = {
      labels: ['Min', 'Avg', 'Max'],
      datasets: [
        {
          label: 'Bikes Available',
          data: [stat.minBikes, Math.round(stat.avgBikes), stat.maxBikes],
          borderColor: '#1976d2',
          backgroundColor: 'rgba(25, 118, 210, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 5,
          pointBackgroundColor: '#1976d2',
        },
      ],
    };
  }

  getTrendArrow(trend: string): string {
    switch (trend) {
      case 'UP':
        return '↑';
      case 'DOWN':
        return '↓';
      case 'STABLE':
        return '→';
      default:
        return '•';
    }
  }

  getTrendColor(trend: string): string {
    switch (trend) {
      case 'UP':
        return '#4caf50';
      case 'DOWN':
        return '#f44336';
      case 'STABLE':
        return '#ff9800';
      default:
        return '#999';
    }
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (!dateObj || Number.isNaN(dateObj.getTime())) {
      return '';
    }
    return dateObj.toISOString().split('T')[0];
  }

  dismissError(): void {
    this.error = null;
  }
}
