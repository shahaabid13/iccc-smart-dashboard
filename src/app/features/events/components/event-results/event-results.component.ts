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
import { MatSelectModule } from '@angular/material/select';
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
    MatSnackBarModule,
    MatSelectModule
  ],
  templateUrl: './event-results.component.html',
  styleUrl: './event-results.component.scss'
})
export class EventResultsComponent implements OnInit {
  readonly eventTypes = [
    'Licence Plate Recognition',
    'Red Light Violation Detection',
    'No Helmet',
    'Stop Line Violation'
  ];
  events = signal<ExternalEventItem[]>([]);
  filteredEvents = signal<ExternalEventItem[]>([]);
  selectedEventType = signal('');
  totalRecords = signal<number>(0);
  totalPages = signal<number>(0);
  currentPage = signal<number>(1);
  warning = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  loading = signal(false);
  private searchRequest?: EventSearchRequest;

  displayedColumns = ['eventtime', 'alertname', 'channelname', 'eventlocation', 'message', 'vehicleNumber'];

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
      this.applyEventTypeFilter();
      this.totalRecords.set(response.totalrecords ?? 0);
      this.totalPages.set(response.totalpages ?? 0);
      this.currentPage.set(response.currentpage ?? 1);
      this.warning.set(this.getPartialResultWarning(response));
      this.errorMessage.set(this.getResponseError(response));
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
        this.applyEventTypeFilter();
        this.totalRecords.set(response.totalrecords ?? 0);
        this.totalPages.set(response.totalpages ?? 0);
        this.currentPage.set(response.currentpage ?? event.pageIndex + 1);
        this.warning.set(this.getPartialResultWarning(response));
        this.errorMessage.set(this.getResponseError(response));
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
        this.errorMessage.set(this.getApiErrorMessage(error, 'Failed to load event page'));
        this.snackBar.open(this.errorMessage()!, 'Close', { duration: 5000 });
      }
    });
  }

  retrySearch(): void {
    if (!this.searchRequest) {
      this.backToSearch();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.eventService.searchEvents({
      ...this.searchRequest,
      page: this.searchRequest.page ?? 1,
      limit: this.searchRequest.limit ?? 20
    }).subscribe({
      next: (response) => {
        this.events.set(response.eventlist ?? []);
        this.applyEventTypeFilter();
        this.totalRecords.set(response.totalrecords ?? 0);
        this.totalPages.set(response.totalpages ?? 0);
        this.currentPage.set(response.currentpage ?? this.searchRequest?.page ?? 1);
        this.warning.set(this.getPartialResultWarning(response));
        this.errorMessage.set(this.getResponseError(response));
        this.searchRequest = {
          ...this.searchRequest!,
          page: response.currentpage ?? this.searchRequest?.page ?? 1,
          limit: this.searchRequest?.limit ?? 20
        };
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to retry event search:', error);
        this.loading.set(false);
        this.errorMessage.set(this.getApiErrorMessage(error, 'Failed to retry event search'));
        this.snackBar.open(this.errorMessage()!, 'Close', { duration: 5000 });
      }
    });
  }

  get searchRequestPageSize(): number {
    return this.searchRequest?.limit ?? 20;
  }

  get hasSearchRequest(): boolean {
    return !!this.searchRequest;
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

  onEventTypeChange(eventType: string): void {
    this.selectedEventType.set(eventType);
    this.applyEventTypeFilter();
  }

  private getApiErrorMessage(error: any, fallback: string): string {
    if (error?.status === 401 || error?.status === 403) {
      return 'Authentication failed. Please sign in again.';
    }
    if (error?.status === 400) {
      return 'Invalid event search. Check the dates and filters.';
    }
    if (error?.status === 502) {
      return 'The VMS server could not provide event data.';
    }
    if (error?.status === 0) {
      return 'Could not reach the Events API. Check the network or CORS configuration.';
    }
    const message = error?.error?.message || error?.error?.error || error?.message;
    return message ? `${fallback}: ${message}` : fallback;
  }

  private getPartialResultWarning(response: ExternalEventSearchResponse): string | null {
    if (response.warning) {
      return response.warning;
    }

    const failedServerLabels = [
      ...(response.failedServers ?? []),
      ...(response.failedServerIds ?? []).map(id => `server ${id}`)
    ];

    if (response.partial && failedServerLabels.length) {
      return `Results may be incomplete: could not reach ${failedServerLabels.join(', ')}.`;
    }

    if (response.partial) {
      return 'Results may be incomplete because one or more servers could not be reached.';
    }

    return null;
  }

  private getResponseError(response: ExternalEventSearchResponse): string | null {
    if (response.partial) {
      return null;
    }
    return null;
  }

  private applyEventTypeFilter(): void {
    const eventType = this.selectedEventType().trim().toLowerCase();
    if (!eventType) {
      this.filteredEvents.set(this.events());
      return;
    }
    this.filteredEvents.set(
      this.events().filter(event => event.alertname?.trim().toLowerCase() === eventType)
    );
  }
}