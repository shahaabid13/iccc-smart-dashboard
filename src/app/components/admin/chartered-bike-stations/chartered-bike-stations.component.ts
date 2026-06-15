import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { Subject, takeUntil } from 'rxjs';
import { SmcService } from '../../../services/smc.service';
import { CharteredBikeStation } from '../../../models/chartered-bike';
import { ReducePipe } from '../../../pipes/reduce.pipe';

@Component({
  selector: 'app-chartered-bike-stations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    ReducePipe,
  ],
  templateUrl: './chartered-bike-stations.component.html',
  styleUrls: ['./chartered-bike-stations.component.scss'],
})
export class CharteredBikeStationsComponent implements OnInit, OnDestroy {
  stations: CharteredBikeStation[] = [];
  filteredStations: CharteredBikeStation[] = [];
  loading = false;
  error: string | null = null;
  searchText = '';
  minBikesFilter = 0;
  autoRefreshInterval: any;
  autoRefreshEnabled = false;

  displayedColumns: string[] = [
    'stationName',
    'bikesAvailable',
    'bikesTotal',
    'availabilityPercentage',
    'bikeRackAvailable',
    'status',
    'actions',
  ];

  private destroy$ = new Subject<void>();

  constructor(private smcService: SmcService) {}

  ngOnInit(): void {
    this.loadStations();
  }

  ngOnDestroy(): void {
    this.stopAutoRefresh();
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadStations(): void {
    this.loading = true;
    this.error = null;
    this.smcService
      .getCharteredBikeStations()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.stations = data;
          this.applyFilters();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading stations:', err);
          this.error = 'Failed to load stations. Please try again.';
          this.loading = false;
        },
      });
  }

  loadFilteredStations(): void {
    if (this.minBikesFilter <= 0) {
      this.loadStations();
      return;
    }

    this.loading = true;
    this.error = null;
    this.smcService
      .getCharteredBikeStationsFiltered(this.minBikesFilter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.stations = data;
          this.applyFilters();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading filtered stations:', err);
          this.error = 'Failed to load filtered stations. Please try again.';
          this.loading = false;
        },
      });
  }

  applyFilters(): void {
    let filtered = this.stations;

    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = filtered.filter((station) =>
        station.stationName.toLowerCase().includes(search)
      );
    }

    this.filteredStations = filtered;
  }

  onSearchChange(value: string): void {
    this.searchText = value;
    this.applyFilters();
  }

  getAvailabilityPercentage(station: CharteredBikeStation): number {
    if (station.bikesTotal === 0) return 0;
    return Math.round((station.bikesAvailable / station.bikesTotal) * 100);
  }

  getStatusColor(station: CharteredBikeStation): string {
    const percentage = this.getAvailabilityPercentage(station);
    if (percentage >= 50) return 'status-good';
    if (percentage >= 25) return 'status-warning';
    return 'status-critical';
  }

  getStatusLabel(station: CharteredBikeStation): string {
    const percentage = this.getAvailabilityPercentage(station);
    if (percentage >= 50) return 'Good';
    if (percentage >= 25) return 'Low';
    return 'Critical';
  }

  toggleAutoRefresh(): void {
    this.autoRefreshEnabled = !this.autoRefreshEnabled;
    if (this.autoRefreshEnabled) {
      this.startAutoRefresh();
    } else {
      this.stopAutoRefresh();
    }
  }

  private startAutoRefresh(): void {
    this.autoRefreshInterval = setInterval(() => {
      this.loadStations();
    }, 30000); // Refresh every 30 seconds
  }

  private stopAutoRefresh(): void {
    if (this.autoRefreshInterval) {
      clearInterval(this.autoRefreshInterval);
      this.autoRefreshInterval = null;
    }
  }

  syncData(): void {
    this.loading = true;
    this.smcService
      .syncCharteredBikeData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadStations();
        },
        error: (err) => {
          console.error('Error syncing data:', err);
          this.error = 'Failed to sync data. Please try again.';
          this.loading = false;
        },
      });
  }

  refreshStations(): void {
    this.loadStations();
  }

  dismissError(): void {
    this.error = null;
  }
}
