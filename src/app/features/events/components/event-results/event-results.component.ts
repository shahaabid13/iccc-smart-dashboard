import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EventSearchRequest, ExternalEventSearchResponse, ExternalEventItem } from '../../../../shared/models';
import { EventService } from '../../../../shared/services/event.service';

@Component({
  selector: 'app-event-results',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  templateUrl: './event-results.component.html',
  styleUrl: './event-results.component.scss'
})
export class EventResultsComponent implements OnInit {
  events = signal<ExternalEventItem[]>([]);
  totalRecords = signal<number>(0);
  totalPages = signal<number>(0);
  currentPage = signal<number>(1);
  warning = signal<string | null>(null);
  loading = signal(false);
  private searchRequest?: EventSearchRequest;

  displayedColumns = ['eventtime', 'alertname', 'channelname', 'eventlocation', 'message', 'evidence'];

  constructor(
    private router: Router,
    private eventService: EventService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // The search response is passed via router state from EventSearchComponent.onSearch().
    // On a hard refresh this state is lost (expected browser behavior for router state),
    // so we fall back to an empty result set with a "no results" message rather than erroring.
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as {
      searchResponse?: ExternalEventSearchResponse;
      searchRequest?: EventSearchRequest;
    } | undefined;
    const response = state?.searchResponse ?? (history.state?.searchResponse as ExternalEventSearchResponse | undefined);
    this.searchRequest = state?.searchRequest ?? (history.state?.searchRequest as EventSearchRequest | undefined);

    if (response) {
      this.events.set(response.eventlist ?? []);
      this.totalRecords.set(response.totalrecords ?? 0);
      this.totalPages.set(response.totalpages ?? 0);
      this.currentPage.set(response.currentpage ?? 1);
      this.warning.set(this.getPartialResultWarning(response));
    }
  }

  onPageChange(event: PageEvent): void {
    if (!this.searchRequest || event.pageIndex + 1 === this.currentPage()) {
      return;
    }

    this.loading.set(true);
    this.eventService.searchEvents({
      ...this.searchRequest,
      page: event.pageIndex + 1,
      limit: event.pageSize
    }).subscribe({
      next: (response) => {
        this.events.set(response.eventlist ?? []);
        this.totalRecords.set(response.totalrecords ?? 0);
        this.totalPages.set(response.totalpages ?? 0);
        this.currentPage.set(response.currentpage ?? event.pageIndex + 1);
        this.warning.set(this.getPartialResultWarning(response));
        this.searchRequest = {
          ...this.searchRequest!,
          page: response.currentpage ?? event.pageIndex + 1,
          limit: event.pageSize
        };
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load event page:', error);
        this.loading.set(false);
        this.snackBar.open(this.getApiErrorMessage(error, 'Failed to load event page'), 'Close', { duration: 5000 });
      }
    });
  }

  get searchRequestPageSize(): number {
    return this.searchRequest?.limit ?? 20;
  }

  formatEventTime(eventtime: string): string {
    // eventtime comes from the device as a string; display as-is if it's not a
    // parseable timestamp, otherwise format it consistently with the rest of the app.
    const parsed = Date.parse(eventtime);
    if (isNaN(parsed)) {
      return eventtime;
    }
    return this.eventService.formatEventTimestamp(parsed);
  }

  backToSearch(): void {
    this.router.navigate(['/traffic-dashboard/dashboard/events/search']);
  }

  private getApiErrorMessage(error: any, fallback: string): string {
    const message = error?.error?.message || error?.error?.error || error?.message;
    return message ? `${fallback}: ${message}` : fallback;
  }

  private getPartialResultWarning(response: ExternalEventSearchResponse): string | null {
    if (response.warning) {
      return response.warning;
    }
    if (response.partial && response.failedServers?.length) {
      return `Results may be incomplete: could not reach ${response.failedServers.join(', ')}.`;
    }
    if (response.partial && response.failedServerIds?.length) {
      return `Results may be incomplete: could not reach server ID ${response.failedServerIds.join(', ')}.`;
    }
    if (response.partial) {
      return 'Results may be incomplete because one or more servers could not be reached.';
    }
    return null;
  }
}