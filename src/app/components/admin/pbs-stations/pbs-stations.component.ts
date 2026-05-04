import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

import { CharteredBikeService } from '../../../services/chartered-bike.service';
import {
  CharteredBikeStation,
  CharteredBikeStationUI,
  CharteredBikeStationResponse,
} from '../../../models/chartered-bike';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pbs-stations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './pbs-stations.component.html',
  styleUrls: ['./pbs-stations.component.scss'],
})
export class PbsStationsComponent implements OnInit, OnDestroy {
  allStations: CharteredBikeStationUI[] = [];
  filteredStations: CharteredBikeStationUI[] = [];
  pagedStations: CharteredBikeStationUI[] = [];

  companyName = 'Chartered Bike';
  primaryColor = '#00844A';

  isLoading = false;
  hasError = false;
  isAuthenticated = false;
  errorMessage: string | null = null;
  lastUpdated: Date | null = null;

  viewMode: 'table' | 'grid' = 'table';
  statusFilter = '';
  sortField: keyof CharteredBikeStationUI = 'stationName';
  sortDir: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  searchQuery = '';
  minBikesFilter = 0;

  displayedColumns: string[] = [
    'stationName',
    'available',
    'total',
    'onTrip',
    'utilization',
    'coordinates',
    'status',
    'actions',
  ];

  statusOptions = [
    { label: 'Available', value: 'Available' },
    { label: 'Moderate', value: 'Moderate' },
    { label: 'Low Stock', value: 'Low Stock' },
    { label: 'Empty', value: 'Empty' },
  ];

  sortOptions = [
    { label: 'Station Name', value: 'stationName' },
    { label: 'Available', value: 'bikesAvailable' },
    { label: 'Total', value: 'bikesTotal' },
    { label: 'On Trip', value: 'reportOnTripBikes' },
    { label: 'Utilization', value: 'availabilityPercentage' },
    { label: 'Status', value: 'statusLabel' },
  ];

  pageSizeOptions = [10, 20, 50];
  minBikesOptions = [0, 1, 2, 5, 10];

  private destroy$ = new Subject<void>();

  constructor(private charteredBikeService: CharteredBikeService) {}

  ngOnInit(): void {
    this.subscribeToServiceStates();
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToServiceStates(): void {
    this.charteredBikeService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.isLoading = state;
      });

    this.charteredBikeService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => {
        this.errorMessage = error;
        this.hasError = !!error;
      });

    this.charteredBikeService.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe((authenticated) => {
        this.isAuthenticated = authenticated;
      });
  }

  loadData(): void {
    if (!this.isAuthenticated) {
      this.authenticate();
      return;
    }

    this.fetchStations();
  }

  private authenticate(): void {
    this.isLoading = true;
    this.charteredBikeService
      .login()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.fetchStations(),
        error: () => {
          this.isLoading = false;
        },
      });
  }

  private fetchStations(): void {
    this.charteredBikeService
      .getStations()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: CharteredBikeStationResponse) => {
          const company = response.data?.[0];
          if (company) {
            this.companyName = company.companyName || this.companyName;
            this.primaryColor = company.primaryColor || this.primaryColor;
            this.allStations = (company.mapStationDTOs || []).map((station) =>
              this.enrichStation(station)
            );
            this.applyFilters();
            this.lastUpdated = new Date();
          } else {
            this.allStations = [];
            this.applyFilters();
          }
        },
        error: () => {
          this.allStations = [];
          this.applyFilters();
        },
      });
  }

  private enrichStation(station: CharteredBikeStation): CharteredBikeStationUI {
    const total = station.bikesTotal || 0;
    const available = station.bikesAvailable || 0;
    const availabilityPercentage = total > 0 ? Math.round((available / total) * 100) : 0;

    let statusColor = '#4CAF50';
    let statusLabel = 'Available';

    if (availabilityPercentage === 0) {
      statusColor = '#F44336';
      statusLabel = 'Empty';
    } else if (availabilityPercentage < 25) {
      statusColor = '#FF9800';
      statusLabel = 'Low Stock';
    } else if (availabilityPercentage < 75) {
      statusColor = '#FFC107';
      statusLabel = 'Moderate';
    }

    return {
      ...station,
      availabilityPercentage,
      statusColor,
      statusLabel,
    };
  }

  applyFilters(): void {
    const normalizedQuery = this.searchQuery.trim().toLowerCase();

    this.filteredStations = this.allStations
      .filter((station) => {
        const matchesSearch =
          !normalizedQuery ||
          station.stationName.toLowerCase().includes(normalizedQuery) ||
          station.stationNumber.toString().includes(normalizedQuery);

        const matchesMinBikes = station.bikesAvailable >= this.minBikesFilter;
        const matchesStatus =
          !this.statusFilter || station.statusLabel === this.statusFilter;

        return matchesSearch && matchesMinBikes && matchesStatus;
      })
      .sort((a, b) => this.compareStations(a, b));

    this.updatePagination();
  }

  setSort(field: keyof CharteredBikeStationUI): void {
    if (this.sortField === field) {
      this.toggleSortDir();
      return;
    }

    this.sortField = field;
    this.sortDir = 'asc';
    this.applyFilters();
  }

  toggleSortDir(): void {
    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.minBikesFilter = 0;
    this.statusFilter = '';
    this.sortField = 'stationName';
    this.sortDir = 'asc';
    this.currentPage = 1;
    this.viewMode = 'table';
    this.applyFilters();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePagination();
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  getPageNumbers(): number[] {
    const pages = [];
    const from = Math.max(1, this.currentPage - 2);
    const to = Math.min(this.totalPages, from + 4);

    for (let i = from; i <= to; i += 1) {
      pages.push(i);
    }

    return pages;
  }

  getTotalOnTrip(): number {
    return this.filteredStations.reduce(
      (sum, station) => sum + (station.reportOnTripBikes || 0),
      0
    );
  }

  getUtilizationRate(): number {
    const totalBikes = this.filteredStations.reduce(
      (sum, station) => sum + (station.bikesTotal || 0),
      0
    );
    const availableBikes = this.filteredStations.reduce(
      (sum, station) => sum + (station.bikesAvailable || 0),
      0
    );

    return totalBikes ? Math.round((availableBikes / totalBikes) * 100) : 0;
  }

  getTotalAvailable(): number {
    return this.filteredStations.reduce(
      (sum, station) => sum + (station.bikesAvailable || 0),
      0
    );
  }

  getTotalFleet(): number {
    return this.filteredStations.reduce(
      (sum, station) => sum + (station.bikesTotal || 0),
      0
    );
  }

  getActiveStationsCount(): number {
    return this.filteredStations.filter((station) => station.active).length;
  }

  getAvailabilityValue(station: CharteredBikeStationUI): number {
    return station.availabilityPercentage ?? 0;
  }

  getAvailabilityColor(station: CharteredBikeStationUI): string {
    const percent = station.availabilityPercentage ?? 0;
    if (percent === 0) {
      return 'warn';
    }
    if (percent < 25) {
      return 'warn';
    }
    if (percent < 75) {
      return 'accent';
    }
    return 'primary';
  }

  refreshData(): void {
    this.charteredBikeService.clearError();
    this.loadData();
  }

  logout(): void {
    this.charteredBikeService.logout();
    this.allStations = [];
    this.filteredStations = [];
    this.pagedStations = [];
    this.companyName = 'Chartered Bike';
    this.lastUpdated = null;
    this.isAuthenticated = false;
  }

  formatCoordinates(station: CharteredBikeStation): string {
    return `${station.latitude}, ${station.longitude}`;
  }

  private compareStations(
    a: CharteredBikeStationUI,
    b: CharteredBikeStationUI
  ): number {
    const field = this.sortField;

    const valueA = a[field] ?? '';
    const valueB = b[field] ?? '';

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return this.sortDir === 'asc' ? valueA - valueB : valueB - valueA;
    }

    const textA = String(valueA).toLowerCase();
    const textB = String(valueB).toLowerCase();
    return this.sortDir === 'asc'
      ? textA.localeCompare(textB)
      : textB.localeCompare(textA);
  }

  private updatePagination(): void {
    this.totalPages = Math.max(1, Math.ceil(this.filteredStations.length / this.pageSize));
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedStations = this.filteredStations.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }
}