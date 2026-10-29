import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {
  ItmsEvent,
  ItmsEventQuery,
  ItmsFilterOptions,
  ItmsService
} from './itms.service';
import { ItmsEventDetailsDialogComponent } from './itms-event-details-dialog.component';

@Component({
  selector: 'app-itms-events',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule
  ],
  templateUrl: './itms-events.component.html',
  styleUrl: './itms-events.component.scss'
})
export class ItmsEventsComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly displayedColumns = [
    'eventTime',
    'eventType',
    'cameraName',
    'junction',
    'message',
    'vehicleNumber',
    'priority',
    'status',
    'speedKmph',
    'vehicleColor'
  ];

  events: ItmsEvent[] = [];
  filters: ItmsFilterOptions = { eventTypes: [], junctions: [], priorities: [] };
  fromDate = '';
  toDate = '';
  eventType = '';
  junction = '';
  priority = '';
  vehicleNumber = '';
  pageIndex = 0;
  pageSize = 20;
  totalElements = 0;
  sortBy = 'eventTime';
  sortDirection: Sort['direction'] = 'desc';
  loading = false;
  errorMessage = '';
  filtersLoading = true;

  get isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  constructor(
    private readonly itms: ItmsService,
    private readonly auth: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.vehicleNumber = this.route.snapshot.queryParamMap.get('vehicleNumber') ?? '';
    this.itms.getFilters()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: filters => {
          this.filters = filters;
          this.filtersLoading = false;
        },
        error: error => {
          this.filtersLoading = false;
          this.snackBar.open(this.getErrorMessage(error, 'Could not load filter options.'), 'Close', { duration: 5000 });
        }
      });
    this.loadEvents();
  }

  applyFilters(): void {
    if (this.fromDate && this.toDate && this.fromDate > this.toDate) {
      this.errorMessage = 'The start date must be on or before the end date.';
      return;
    }
    this.pageIndex = 0;
    this.errorMessage = '';
    this.loadEvents();
  }

  clearFilters(): void {
    this.fromDate = '';
    this.toDate = '';
    this.eventType = '';
    this.junction = '';
    this.priority = '';
    this.vehicleNumber = '';
    this.applyFilters();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEvents();
  }

  onSortChange(sort: Sort): void {
    this.sortBy = sort.active || 'eventTime';
    this.sortDirection = sort.direction || 'desc';
    this.pageIndex = 0;
    this.loadEvents();
  }

  openDetails(event: ItmsEvent): void {
    this.dialog.open(ItmsEventDetailsDialogComponent, {
      data: event,
      width: '780px',
      maxWidth: '96vw',
      autoFocus: false
    });
  }

  goToUpload(): void {
    void this.router.navigate(['/itms/upload']);
  }

  exportExcel(): void {
    this.itms.exportEvents(this.queryFilters())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: blob => {
          const url = URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = `ITMS-events-${new Date().toISOString().slice(0, 10)}.xlsx`;
          anchor.click();
          URL.revokeObjectURL(url);
        },
        error: error => {
          this.snackBar.open(this.getErrorMessage(error, 'Could not export events.'), 'Close', { duration: 5000 });
        }
      });
  }

  private loadEvents(): void {
    this.loading = true;
    this.errorMessage = '';
    const query: ItmsEventQuery = {
      ...this.queryFilters(),
      page: this.pageIndex,
      size: this.pageSize,
      sort: `${this.sortBy},${this.sortDirection}`
    };
    this.itms.getEvents(query)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: response => {
          this.events = response.content;
          this.totalElements = response.totalElements;
          this.loading = false;
        },
        error: error => {
          this.events = [];
          this.totalElements = 0;
          this.loading = false;
          this.errorMessage = this.getErrorMessage(error, 'Could not load ITMS events.');
        }
      });
  }

  private queryFilters(): Omit<ItmsEventQuery, 'page' | 'size' | 'sort'> {
    return {
      from: this.fromDate || undefined,
      to: this.toDate || undefined,
      eventType: this.eventType || undefined,
      junction: this.junction || undefined,
      priority: this.priority || undefined,
      vehicleNumber: this.vehicleNumber.trim() || undefined
    };
  }

  private getErrorMessage(error: HttpErrorResponse, fallback: string): string {
    if (error.status === 401 || error.status === 403) return 'You are not authorized to view ITMS events.';
    if (error.status === 0) return 'Could not reach the ITMS API. Check the network or proxy configuration.';
    const message = error.error?.message ?? error.error?.error;
    return message ? `${fallback} ${message}` : fallback;
  }
}
