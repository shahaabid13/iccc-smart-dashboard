import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { Subject, takeUntil } from 'rxjs';
import { SmcService } from '../../../services/smc.service';
import { CharteredBikeStation } from '../../../models/chartered-bike';

@Component({
  selector: 'app-chartered-bike-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatGridListModule,
  ],
  templateUrl: './chartered-bike-dashboard.component.html',
  styleUrls: ['./chartered-bike-dashboard.component.scss'],
})
export class CharteredBikeDashboardComponent implements OnInit, OnDestroy {
  stations: CharteredBikeStation[] = [];
  loading = false;
  error: string | null = null;

  // Statistics
  totalStations = 0;
  totalBikes = 0;
  availableBikes = 0;
  criticalStations = 0;
  avgAvailability = 0;
  lastSyncTime: Date | null = null;

  private destroy$ = new Subject<void>();

  constructor(private smcService: SmcService, private router: Router) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.error = null;

    this.smcService
      .getCharteredBikeStations()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.stations = data;
          this.calculateStatistics();
          this.lastSyncTime = new Date();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading dashboard data:', err);
          this.error = 'Failed to load dashboard data. Please try again.';
          this.loading = false;
        },
      });
  }

  private calculateStatistics(): void {
    if (this.stations.length === 0) return;

    this.totalStations = this.stations.length;
    this.totalBikes = this.stations.reduce((sum, s) => sum + s.bikesTotal, 0);
    this.availableBikes = this.stations.reduce((sum, s) => sum + s.bikesAvailable, 0);

    // Calculate critical stations (less than 25% availability)
    this.criticalStations = this.stations.filter(
      (s) => s.bikesTotal > 0 && (s.bikesAvailable / s.bikesTotal) * 100 < 25
    ).length;

    // Calculate average availability
    if (this.totalBikes > 0) {
      this.avgAvailability = Math.round((this.availableBikes / this.totalBikes) * 100);
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  refreshData(): void {
    this.loadDashboardData();
  }

  dismissError(): void {
    this.error = null;
  }

  getStatusIndicator(): 'good' | 'warning' | 'critical' {
    if (this.avgAvailability >= 60) return 'good';
    if (this.avgAvailability >= 30) return 'warning';
    return 'critical';
  }

  getFormattedTime(date: Date | null): string {
    if (!date) return 'Never';
    return date.toLocaleTimeString();
  }
}
