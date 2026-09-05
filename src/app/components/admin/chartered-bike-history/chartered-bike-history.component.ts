import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Subject, takeUntil } from 'rxjs';
import { SmcService } from '../../../services/smc.service';
import { CharteredBikeStationHistoryDto, CharteredBikeStationNamesDto } from '../../../models/chartered-bike';

@Component({
  selector: 'app-chartered-bike-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
    MatPaginatorModule,
  ],
  templateUrl: './chartered-bike-history.component.html',
  styleUrls: ['./chartered-bike-history.component.scss'],
})
export class CharteredBikeHistoryComponent implements OnInit, OnDestroy {
  historyForm!: FormGroup;
  stationNames: CharteredBikeStationNamesDto[] = [];
  historyData: CharteredBikeStationHistoryDto[] = [];
  filteredHistoryData: CharteredBikeStationHistoryDto[] = [];
  loading = false;
  error: string | null = null;
  displayMode: 'table' | 'chart' = 'table';
  pageSize = 10;
  pageIndex = 0;

  displayedColumns: string[] = [
    'timestamp',
    'bikesAvailable',
    'bikesTotal',
    'availabilityPercentage',
    'bikeRackAvailable',
  ];

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

    this.historyForm = this.fb.group({
      stationName: [''],
      startDate: [sevenDaysAgo, Validators.required],
      endDate: [today, Validators.required],
      viewType: ['custom', Validators.required],
      recentDays: [7],
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

  loadHistory(): void {
    if (!this.historyForm.valid) {
      this.error = 'Please select a station and date range.';
      return;
    }

    this.loading = true;
    this.error = null;
    const { stationName, startDate, endDate, viewType } = this.historyForm.value;
    const startDateStr = this.formatDate(startDate);
    const endDateStr = this.formatDate(endDate);

    let request$;

    if (viewType === 'all') {
      request$ = this.smcService.getCharteredBikeAllHistory(startDateStr, endDateStr);
    } else if (viewType === 'recent') {
      const days = this.historyForm.get('recentDays')?.value || 7;
      if (!stationName) {
        this.error = 'Please select a station for recent history.';
        this.loading = false;
        return;
      }
      request$ = this.smcService.getCharteredBikeStationRecentHistory(stationName, days);
    } else {
      if (!stationName) {
        this.error = 'Please select a station for historical data.';
        this.loading = false;
        return;
      }
      request$ = this.smcService.getCharteredBikeStationHistory(
        stationName,
        startDateStr,
        endDateStr
      );
    }

    request$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.historyData = data;
        this.pageIndex = 0;
        this.applyPagination();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading history:', err);
        this.error = 'Failed to load history. Please try again.';
        this.loading = false;
      },
    });
  }

  loadAllHistory(): void {
    if (!this.historyForm.valid) {
      this.error = 'Please select a date range.';
      return;
    }

    this.loading = true;
    this.error = null;
    const { startDate, endDate } = this.historyForm.value;
    const startDateStr = this.formatDate(startDate);
    const endDateStr = this.formatDate(endDate);

    this.smcService
      .getCharteredBikeAllHistory(startDateStr, endDateStr)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.historyData = data;
          this.pageIndex = 0;
          this.applyPagination();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading all history:', err);
          this.error = 'Failed to load history. Please try again.';
          this.loading = false;
        },
      });
  }

  onViewTypeChange(viewType: string): void {
    if (viewType === 'all') {
      this.loadAllHistory();
    }
  }

  applyPagination(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredHistoryData = this.historyData.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyPagination();
  }

  getAvailabilityPercentage(record: CharteredBikeStationHistoryDto): number {
    if (record.bikesTotal === 0) return 0;
    return Math.round((record.bikesAvailable / record.bikesTotal) * 100);
  }

  formatDate(date: Date): string {
    if (!date) return '';
    return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  }

  formatTimestamp(timestamp: string): string {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch {
      return timestamp;
    }
  }

  exportToCSV(): void {
    if (this.historyData.length === 0) {
      this.error = 'No data to export.';
      return;
    }

    const headers = ['Timestamp', 'Bikes Available', 'Total Bikes', 'Availability %', 'Rack Available'];
    const rows = this.historyData.map((record) => [
      this.formatTimestamp(record.timestamp),
      record.bikesAvailable,
      record.bikesTotal,
      this.getAvailabilityPercentage(record),
      record.bikeRackAvailable,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chartered-bike-history-${Date.now()}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  dismissError(): void {
    this.error = null;
  }
}
