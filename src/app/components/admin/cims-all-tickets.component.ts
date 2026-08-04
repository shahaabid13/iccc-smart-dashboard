import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CimsService } from '../../services/cims.service';
import { Ticket, PaginatedResponse, IncidentType } from '../../models/cims.models';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Statuses that should be reported/displayed as "closed".
const CLOSED_STATUSES = ['RESOLVED', 'REJECTED'];

// How many tickets to pull in the initial fetch. Filtering, pagination,
// and export are all done on this client-side set — see the note above
// loadAllTickets() for why.
const FETCH_ALL_PAGE_SIZE = 5000;

@Component({
  selector: 'app-cims-all-tickets',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatMenuModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule
  ],
  template: `
    <div class="cims-container">
      <mat-card class="tickets-card">
        <mat-card-header>
          <mat-card-title>
            <div class="header-title">
              <span class="icon">📊</span>
              <span>All Incident Tickets</span>
            </div>
          </mat-card-title>
          <mat-card-subtitle>View and filter all tickets across the system</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <!-- Filters Section -->
          <div class="filters-section">
            <div class="filter-grid">
              <!-- Status Filter -->
              <mat-form-field appearance="outline">
                <mat-label>Status</mat-label>
                <mat-select [(value)]="selectedStatus">
                  <mat-option value="">All Statuses</mat-option>
                  <mat-option value="OPEN">Open</mat-option>
                  <mat-option value="ACKNOWLEDGED">Acknowledged</mat-option>
                  <mat-option value="IN_REVIEW">In Review</mat-option>
                  <mat-option value="RESOLVED">Resolved</mat-option>
                  <mat-option value="REOPENED">Reopened</mat-option>
                  <mat-option value="PENDING">Pending</mat-option>
                  <mat-option value="REJECTED">Rejected</mat-option>
                </mat-select>
              </mat-form-field>

              <!-- Incident Type Filter -->
              <mat-form-field appearance="outline">
                <mat-label>Incident Type</mat-label>
                <mat-select [(value)]="selectedIncidentType">
                  <mat-option value="">All Types</mat-option>
                  <mat-option *ngFor="let type of incidentTypes" [value]="type.id">
                    {{ type.name }}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <!-- From Date -->
              <mat-form-field appearance="outline">
                <mat-label>From Date</mat-label>
                <input matInput [matDatepicker]="fromDatePicker" [(ngModel)]="fromDate" [max]="toDate">
                <mat-datepicker-toggle matSuffix [for]="fromDatePicker"></mat-datepicker-toggle>
                <mat-datepicker #fromDatePicker></mat-datepicker>
              </mat-form-field>

              <!-- To Date -->
              <mat-form-field appearance="outline">
                <mat-label>To Date</mat-label>
                <input matInput [matDatepicker]="toDatePicker" [(ngModel)]="toDate" [min]="fromDate">
                <mat-datepicker-toggle matSuffix [for]="toDatePicker"></mat-datepicker-toggle>
                <mat-datepicker #toDatePicker></mat-datepicker>
              </mat-form-field>

              <!-- Actions -->
              <div class="filter-actions">
                <button mat-raised-button color="primary" (click)="applyFilters()">
                  <mat-icon>search</mat-icon> Search
                </button>
                <button mat-stroked-button (click)="clearFilters()">
                  <mat-icon>clear</mat-icon> Clear
                </button>
                <button mat-raised-button color="accent" [matMenuTriggerFor]="exportMenu">
                  <mat-icon>download</mat-icon> Export
                </button>
                <mat-menu #exportMenu="matMenu">
                  <button mat-menu-item (click)="exportToExcel()">
                    <mat-icon>description</mat-icon>
                    <span>Export to Excel</span>
                  </button>
                  <button mat-menu-item (click)="exportToPDF()">
                    <mat-icon>picture_as_pdf</mat-icon>
                    <span>Export to PDF</span>
                  </button>
                </mat-menu>
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div *ngIf="isLoading" class="loading-container">
            <mat-spinner diameter="50"></mat-spinner>
            <p>Loading tickets...</p>
          </div>

          <!-- Table -->
          <div *ngIf="!isLoading" class="table-wrapper">
            <table mat-table [dataSource]="tickets" class="tickets-table">
              <!-- ID Column -->
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>ID</th>
                <td mat-cell *matCellDef="let element" class="ticket-id">#{{ element.id }}</td>
              </ng-container>

              <!-- Type Column -->
              <ng-container matColumnDef="type">
                <th mat-header-cell *matHeaderCellDef>Type</th>
                <td mat-cell *matCellDef="let element">{{ element.incidentTypeName }}</td>
              </ng-container>

              <!-- Location Column -->
              <ng-container matColumnDef="location">
                <th mat-header-cell *matHeaderCellDef>Location</th>
                <td mat-cell *matCellDef="let element">{{ element.locationName }}</td>
              </ng-container>

              <!-- Priority Column (display only — filter removed) -->
              <ng-container matColumnDef="priority">
                <th mat-header-cell *matHeaderCellDef>Priority</th>
                <td mat-cell *matCellDef="let element">
                  <span [class]="'badge priority-' + element.priority.toLowerCase()">
                    {{ element.priority }}
                  </span>
                </td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let element">
                  <span [class]="'badge status-' + element.status.toLowerCase()">
                    {{ isClosedStatus(element.status) ? 'CLOSED' : element.status }}
                  </span>
                </td>
              </ng-container>

              <!-- Raised By Column -->
              <ng-container matColumnDef="raisedBy">
                <th mat-header-cell *matHeaderCellDef>Raised By</th>
                <td mat-cell *matCellDef="let element">{{ element.raisedByUsername }}</td>
              </ng-container>

              <!-- Created Date Column -->
              <ng-container matColumnDef="createdAt">
                <th mat-header-cell *matHeaderCellDef>Created</th>
                <td mat-cell *matCellDef="let element">
                  {{ element.createdAt | date: 'short' }}
                </td>
              </ng-container>

              <!-- Closed Date Column -->
              <ng-container matColumnDef="closedAt">
                <th mat-header-cell *matHeaderCellDef>Closed</th>
                <td mat-cell *matCellDef="let element">
                  {{ getClosedDate(element) ? (getClosedDate(element) | date: 'short') : '—' }}
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let element">
                  <button mat-icon-button matTooltip="View Details" [routerLink]="['/cims/admin/tickets', element.id]">
                    <mat-icon>visibility</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>

          <!-- Empty State -->
          <div *ngIf="!isLoading && tickets.length === 0" class="empty-state">
            <div class="empty-icon">📭</div>
            <p>No tickets found matching your filters</p>
          </div>

          <!-- Paginator -->
          <mat-paginator
            *ngIf="!isLoading && filteredTickets.length > 0"
            [length]="totalElements"
            [pageSize]="pageSize"
            [pageIndex]="currentPage"
            [pageSizeOptions]="[5, 10, 20, 50]"
            (page)="onPageChange($event)">
          </mat-paginator>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .cims-container {
      padding: 14px;
    }

    .tickets-card {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .header-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 24px;
      font-weight: 500;
    }

    .icon {
      font-size: 28px;
    }

    .filters-section {
      padding: 20px;
      background: #f9f9f9;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .filter-grid {
      display: flex;
      flex-wrap: nowrap;
      align-items: flex-start;
      gap: 12px;
      overflow-x: auto;
      padding-bottom: 4px;
    }

    .filter-grid mat-form-field {
      flex: 1 1 150px;
      min-width: 130px;
    }

    .filter-actions {
      display: flex;
      gap: 8px;
      align-items: center;
      height: 56px;
      flex-wrap: nowrap;
      flex-shrink: 0;
    }

    .filter-actions button {
      white-space: nowrap;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      gap: 12px;
    }

    .table-wrapper {
      overflow-x: auto;
    }

    .tickets-table {
      width: 100%;
      margin-top: 20px;
    }

    .ticket-id {
      font-weight: 600;
      color: #1976d2;
    }

    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
    }

    .priority-low {
      background-color: #e3f2fd;
      color: #1565c0;
    }

    .priority-medium {
      background-color: #fff3e0;
      color: #e65100;
    }

    .priority-high {
      background-color: #ffebee;
      color: #c62828;
    }

    .status-open {
      background-color: #e3f2fd;
      color: #1565c0;
    }

    .status-acknowledged {
      background-color: #f3e5f5;
      color: #6a1b9a;
    }

    .status-in_review {
      background-color: #e3f2fd;
      color: #1565c0;
    }

    .status-resolved {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    .status-reopened {
      background-color: #fff3e0;
      color: #e65100;
    }

    .status-pending {
      background-color: #fff3e0;
      color: #e65100;
    }

    .status-rejected {
      background-color: #ffebee;
      color: #c62828;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      gap: 12px;
      color: #999;
    }

    .empty-icon {
      font-size: 64px;
    }

    @media (max-width: 768px) {
      .filter-grid {
        flex-wrap: wrap;
      }

      .filter-grid mat-form-field {
        flex: 1 1 100%;
        min-width: 0;
      }

      .filter-actions {
        width: 100%;
      }
    }
  `]
})
export class CimsAllTicketsComponent implements OnInit {
  // Full unfiltered set fetched once from the backend.
  private allTickets: Ticket[] = [];
  // allTickets after status/type/date filters are applied.
  filteredTickets: Ticket[] = [];
  // The current page slice of filteredTickets — what the table actually renders.
  tickets: Ticket[] = [];

  displayedColumns: string[] = ['id', 'type', 'location', 'priority', 'status', 'raisedBy', 'createdAt', 'closedAt', 'actions'];
  isLoading = false;
  pageSize = 10;
  currentPage = 0;
  totalElements = 0;
  incidentTypes: IncidentType[] = [];

  // Filter properties (bound to the form controls, applied on Search)
  selectedStatus = '';
  selectedIncidentType: any = '';
  fromDate: any = null;
  toDate: any = null;

  constructor(
    private cimsService: CimsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadIncidentTypes();
    this.loadAllTickets();
  }

  loadIncidentTypes(): void {
    this.cimsService.getIncidentTypes().subscribe({
      next: (types: IncidentType[]) => {
        this.incidentTypes = types;
      },
      error: (err: any) => console.error('Failed to load incident types', err)
    });
  }

  /**
   * Fetches the full ticket list once, with no status/priority/date query
   * params. The API has been returning a 500 whenever fromDate/toDate (and
   * possibly incidentTypeId alongside them) are sent as query parameters,
   * so instead of depending on server-side filtering, all filtering,
   * pagination, and export happen on this client-side set — the same
   * pattern used by the reviewer dashboard.
   */
  loadAllTickets(): void {
    this.isLoading = true;
    this.cimsService.getAllTickets(0, FETCH_ALL_PAGE_SIZE).subscribe({
      next: (response: PaginatedResponse<Ticket>) => {
        this.allTickets = (response?.content ?? []).slice().sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load tickets', err);
        this.snackBar.open('Failed to load tickets', 'Close', { duration: 5000 });
        this.isLoading = false;
      }
    });
  }

  /** Applies status / incident type / date-range filters against the
   * client-side ticket set and resets to page 0. */
  applyFilters(): void {
    this.currentPage = 0;
    this.filteredTickets = this.allTickets.filter(t => this.matchesFilters(t));
    this.totalElements = this.filteredTickets.length;
    this.updatePagedTickets();
  }

  clearFilters(): void {
    this.selectedStatus = '';
    this.selectedIncidentType = '';
    this.fromDate = null;
    this.toDate = null;
    this.applyFilters();
  }

  private matchesFilters(ticket: Ticket): boolean {
    if (this.selectedStatus && ticket.status !== this.selectedStatus) {
      return false;
    }

    if (this.selectedIncidentType) {
      const ticketAny = ticket as any;
      const matchesById = ticketAny.incidentTypeId != null && ticketAny.incidentTypeId === this.selectedIncidentType;
      const selectedType = this.incidentTypes.find(it => it.id === this.selectedIncidentType);
      const matchesByName = !!selectedType && ticketAny.incidentTypeName === selectedType.name;
      if (!matchesById && !matchesByName) {
        return false;
      }
    }

    if (!this.isWithinDateRange(ticket)) {
      return false;
    }

    return true;
  }

  /** Compares dates by local calendar day (ignoring time-of-day), so a
   * "To Date" of today includes tickets created any time today, and
   * there's no UTC/local timezone shift affecting which day a ticket
   * falls into. */
  private isWithinDateRange(ticket: Ticket): boolean {
    if (!this.fromDate && !this.toDate) {
      return true;
    }

    const created = new Date((ticket as any).createdAt);
    if (isNaN(created.getTime())) {
      return false;
    }
    const createdDay = new Date(created.getFullYear(), created.getMonth(), created.getDate());

    if (this.fromDate) {
      const from = this.fromDate instanceof Date ? this.fromDate : new Date(this.fromDate);
      const fromDay = new Date(from.getFullYear(), from.getMonth(), from.getDate());
      if (createdDay < fromDay) return false;
    }

    if (this.toDate) {
      const to = this.toDate instanceof Date ? this.toDate : new Date(this.toDate);
      const toDay = new Date(to.getFullYear(), to.getMonth(), to.getDate());
      if (createdDay > toDay) return false;
    }

    return true;
  }

  private updatePagedTickets(): void {
    const start = this.currentPage * this.pageSize;
    this.tickets = this.filteredTickets.slice(start, start + this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedTickets();
  }

  /**
   * Best-effort lookup for a ticket's closed date. The Ticket model / API
   * response has been inconsistent about which field actually carries this
   * (some payloads only populate `updatedAt`, others may use `closedAt` or
   * `resolvedAt`), so we check the likely candidates rather than assuming
   * one specific field name. Returns null for tickets that aren't closed.
   */
  getClosedDate(ticket: any): any {
    if (!ticket || !this.isClosedStatus(ticket.status)) {
      return null;
    }
    return ticket.closedAt || ticket.resolvedAt || ticket.closeDate || ticket.updatedAt || null;
  }

  isClosedStatus(status: string): boolean {
    return CLOSED_STATUSES.includes((status || '').toUpperCase());
  }

  // ---------------------------------------------------------------------
  // Report generation (same approach as the reviewer dashboard: export
  // whatever is currently in filteredTickets, no extra network calls)
  // ---------------------------------------------------------------------

  exportToExcel(): void {
    try {
      const data = this.filteredTickets.map(t => ({
        'ID': t.id,
        'Type': this.toTitleCase(t.incidentTypeName || ''),
        'Location': this.toTitleCase(t.locationName || ''),
        'Priority': this.toTitleCase(t.priority || ''),
        'Status': this.toTitleCase(this.isClosedStatus(t.status) ? 'CLOSED' : (t.status || '')),
        'Raised By': this.toTitleCase(t.raisedByUsername || ''),
        'Created': (t as any).createdAt ? new Date((t as any).createdAt).toLocaleString() : '',
        'Closed': this.getClosedDate(t) ? new Date(this.getClosedDate(t)).toLocaleString() : ''
      }));

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'All Tickets');
      XLSX.writeFile(wb, `all-tickets-report-${new Date().getTime()}.xlsx`);
      this.snackBar.open('Excel file exported successfully', 'Close', { duration: 3000 });
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      this.snackBar.open('Error exporting to Excel', 'Close', { duration: 5000 });
    }
  }

  exportToPDF(): void {
    try {
      const doc = new jsPDF();
      const headers = ['ID', 'Type', 'Location', 'Priority', 'Status', 'Raised By', 'Created', 'Closed'];

      const data = this.filteredTickets.map(t => [
        t.id,
        this.toTitleCase(t.incidentTypeName || ''),
        this.toTitleCase(t.locationName || ''),
        this.toTitleCase(t.priority || ''),
        this.toTitleCase(this.isClosedStatus(t.status) ? 'CLOSED' : (t.status || '')),
        this.toTitleCase(t.raisedByUsername || ''),
        (t as any).createdAt ? new Date((t as any).createdAt).toLocaleDateString() : '',
        this.getClosedDate(t) ? new Date(this.getClosedDate(t)).toLocaleDateString() : '—'
      ]);

      // Header
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('CIMS Incident Report', 14, 20);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const dateRangeLabel = this.getReportDateRangeLabel();
      doc.text(`Date Range: ${dateRangeLabel}`, 14, 28);

      autoTable(doc, {
        head: [headers],
        body: data,
        startY: 36,
        theme: 'grid',
        headStyles: { fillColor: [13, 60, 97], textColor: 255, halign: 'center' },
        styles: { fontSize: 9, cellPadding: 6 },
        columnStyles: {
          0: { cellWidth: 14 },
          1: { cellWidth: 70 },
          2: { cellWidth: 50 },
          3: { cellWidth: 30 },
          4: { cellWidth: 40 },
          5: { cellWidth: 40 },
          6: { cellWidth: 30 },
          7: { cellWidth: 30 }
        },
        didDrawPage: (dataArg) => {
          // footer with page number
          const page = doc.getNumberOfPages();
          doc.setFontSize(9);
          doc.text(`Page ${page}`, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 10, { align: 'right' });
        }
      });
      doc.save(`all-tickets-report-${new Date().getTime()}.pdf`);
      this.snackBar.open('PDF file exported successfully', 'Close', { duration: 3000 });
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      this.snackBar.open('Error exporting to PDF', 'Close', { duration: 5000 });
    }
  }

  private toTitleCase(input: string): string {
    if (!input) return '';
    return input.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  private getReportDateRangeLabel(): string {
    if (!this.filteredTickets || this.filteredTickets.length === 0) return 'All Dates';
    const dates = this.filteredTickets.map(t => new Date((t as any).createdAt)).filter(d => !isNaN(d.getTime()));
    if (dates.length === 0) return 'All Dates';
    const min = new Date(Math.min(...dates.map(d => d.getTime())));
    const max = new Date(Math.max(...dates.map(d => d.getTime())));
    return `${min.toLocaleDateString()} - ${max.toLocaleDateString()}`;
  }
}