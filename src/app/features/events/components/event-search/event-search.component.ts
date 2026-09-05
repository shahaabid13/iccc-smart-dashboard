import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EventSearchRequest } from '../../../../shared/models';
import { EventService } from '../../../../shared/services/event.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-event-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './event-search.component.html',
  styleUrl: './event-search.component.scss'
})
export class EventSearchComponent {
  loading = signal(false);

  searchForm!: any;

  maxDaysRange = environment.trafficDashboard.features.eventSearchMaxDays;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      startDate: [new Date(Date.now() - 24 * 60 * 60 * 1000), Validators.required],
      endDate: [new Date(), Validators.required]
    });
  }

  onSearch(): void {
    if (this.searchForm.invalid) {
      this.snackBar.open('Please fill in required fields', 'Close', { duration: 3000 });
      return;
    }

    const startDate = this.searchForm.value.startDate;
    const endDate = this.searchForm.value.endDate;

    if (startDate && endDate) {
      const validation = this.eventService.isValidDateRange(startDate as Date, endDate as Date, this.maxDaysRange);
      if (!validation.valid) {
        this.snackBar.open(validation.error!, 'Close', { duration: 5000 });
        return;
      }
    }

    this.loading.set(true);

    const request = {
      startTimestamp: this.eventService.dateToEpochMs(startDate as Date),
      endTimestamp: this.eventService.dateToEpochMs(endDate as Date),
      page: 1,
      limit: environment.trafficDashboard.features.defaultPageSize,
      persist: false
    };

    this.eventService.searchEvents(request).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.router.navigate(['/traffic-dashboard/dashboard/events/results'], {
          state: { searchResponse: response, searchRequest: request }
        });
      },
      error: (error) => {
        console.error('Failed to search events:', error);
        this.loading.set(false);
        this.snackBar.open(this.getApiErrorMessage(error, 'Failed to search events'), 'Close', { duration: 5000 });
      }
    });
  }

  private getApiErrorMessage(error: any, fallback: string): string {
    const message = error?.error?.message || error?.error?.error || error?.message;
    return message ? `${fallback}: ${message}` : fallback;
  }
}