import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { CimsService } from '../../services/cims.service';
import { Ticket, PaginatedResponse } from '../../models/cims.models';

@Component({
  selector: 'app-cims-my-tickets',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    FormsModule
  ],
  template: `
    <div class="cims-container">
      <mat-card class="tickets-card">
        <div class="card-header">
          <div class="header-top">
            <div class="header-title">
              <div class="title-icon">📋</div>
              <div>
                <h1>My Raised Tickets</h1>
                <p class="subtitle">Review and search your open, pending, or closed incidents</p>
              </div>
            </div>
            <button mat-raised-button color="primary" class="raise-btn" routerLink="/cims/support-engineer/create-ticket">
              <mat-icon>add</mat-icon> Raise New Ticket
            </button>
          </div>

          <div class="stats-row" *ngIf="!isLoading">
            <div class="stat-pill">
              <span class="stat-value">{{ tickets.length }}</span>
              <span class="stat-label">Total</span>
            </div>
            <div class="stat-pill" *ngFor="let s of topStatusCounts">
              <span class="stat-value">{{ s.count }}</span>
              <span class="stat-label" [ngClass]="'dot-' + s.status.toLowerCase()">{{ s.status }}</span>
            </div>
          </div>
        </div>

        <mat-card-content>
          <!-- Filter Bar -->
          <div class="filter-section">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Search tickets</mat-label>
              <input matInput [(ngModel)]="searchTerm"
                     placeholder="Search by ID, type, location, priority, status, or assignee..."
                     (ngModelChange)="onFilterChange()">
              <button mat-icon-button matSuffix *ngIf="searchTerm" (click)="clearSearch()">
                <mat-icon>close</mat-icon>
              </button>
              <mat-icon matSuffix *ngIf="!searchTerm">search</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Status</mat-label>
              <mat-select [(ngModel)]="statusFilter" (selectionChange)="onFilterChange()">
                <mat-option [value]="''">All Statuses</mat-option>
                <mat-option *ngFor="let s of statusOptions" [value]="s">{{ s }}</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Priority</mat-label>
              <mat-select [(ngModel)]="priorityFilter" (selectionChange)="onFilterChange()">
                <mat-option [value]="''">All Priorities</mat-option>
                <mat-option *ngFor="let p of priorityOptions" [value]="p">{{ p }}</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Field Person</mat-label>
              <mat-select [(ngModel)]="fieldPersonFilter" (selectionChange)="onFilterChange()">
                <mat-option [value]="''">All Field Persons</mat-option>
                <mat-option value="__unassigned__">Unassigned</mat-option>
                <mat-option *ngFor="let fp of fieldPersonOptions" [value]="fp">
                  {{ formatDisplayName(fp) }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <button mat-stroked-button class="clear-btn" *ngIf="hasActiveFilters()" (click)="clearAllFilters()">
              <mat-icon>filter_alt_off</mat-icon> Clear
            </button>

            <button mat-icon-button matTooltip="Refresh" class="refresh-btn" (click)="loadTickets()" [disabled]="isLoading">
              <mat-icon>refresh</mat-icon>
            </button>
          </div>

          <!-- Loading State -->
          <div *ngIf="isLoading" class="loading-container">
            <mat-spinner diameter="46"></mat-spinner>
            <p>Loading tickets...</p>
          </div>

          <!-- Table -->
          <div *ngIf="!isLoading && filteredTickets.length > 0" class="table-wrapper">
            <table mat-table [dataSource]="pagedTickets" class="tickets-table">
              <!-- Ticket ID Column -->
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>Ticket</th>
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
                <td mat-cell *matCellDef="let element">
                  <span class="location-cell">
                    <mat-icon class="loc-icon">place</mat-icon>
                    {{ element.locationName }}
                  </span>
                </td>
              </ng-container>

              <!-- Assigned To Column -->
              <ng-container matColumnDef="assignedTo">
                <th mat-header-cell *matHeaderCellDef>Assigned To</th>
                <td mat-cell *matCellDef="let element">
                  <span class="assignee-cell" *ngIf="element.fieldPersonName; else unassignedTpl">
                    <span class="avatar-badge">{{ initials(element.fieldPersonName) }}</span>
                    {{ formatDisplayName(element.fieldPersonName) }}
                  </span>
                  <ng-template #unassignedTpl>
                    <span class="unassigned-label">Unassigned</span>
                  </ng-template>
                </td>
              </ng-container>

              <!-- Priority Column -->
              <ng-container matColumnDef="priority">
                <th mat-header-cell *matHeaderCellDef>Priority</th>
                <td mat-cell *matCellDef="let element">
                  <span class="badge priority-badge" [ngClass]="'priority-' + element.priority.toLowerCase()">
                    {{ element.priority }}
                  </span>
                </td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let element">
                  <span class="badge status-badge" [ngClass]="'status-' + element.status.toLowerCase()">
                    <span class="status-dot"></span>
                    {{ element.status }}
                  </span>
                </td>
              </ng-container>

              <!-- Created Date Column -->
              <ng-container matColumnDef="createdAt">
                <th mat-header-cell *matHeaderCellDef>Created</th>
                <td mat-cell *matCellDef="let element" class="date-cell">
                  {{ element.createdAt | date: 'MMM d, y, h:mm a' }}
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let element">
                  <button mat-flat-button color="primary" class="view-btn" [routerLink]="['/cims/support-engineer/tickets', element.id]">
                    View <mat-icon>arrow_forward</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"
                  [class.row-revalidation]="row.status?.toUpperCase() === 'REVALIDATION'"></tr>
            </table>
          </div>

          <!-- Empty State -->
          <div *ngIf="!isLoading && filteredTickets.length === 0" class="empty-state">
            <div class="empty-icon">📭</div>
            <p *ngIf="hasActiveFilters()">No tickets match your filters</p>
            <p *ngIf="!hasActiveFilters()">No tickets found</p>
            <button mat-stroked-button *ngIf="hasActiveFilters()" (click)="clearAllFilters()">
              Clear Filters
            </button>
            <button mat-raised-button color="primary" *ngIf="!hasActiveFilters()" routerLink="/cims/support-engineer/create-ticket">
              Create First Ticket
            </button>
          </div>

          <!-- Paginator -->
          <mat-paginator
            *ngIf="!isLoading && filteredTickets.length > 0"
            class="ticket-paginator"
            [length]="filteredTickets.length"
            [pageIndex]="currentPage"
            [pageSize]="pageSize"
            [pageSizeOptions]="[10, 20, 30, 50]"
            (page)="onPageChange($event)">
          </mat-paginator>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .cims-container {
      padding: 24px;
      background: #f4f6f9;
      min-height: 100%;
    }

    .tickets-card {
      box-shadow: 0 4px 20px rgba(20, 30, 60, 0.08);
      border-radius: 16px;
      overflow: hidden;
    }

    /* ---------- Header ---------- */
    .card-header {
      background: linear-gradient(135deg, #1e3a8a 0%, #1976d2 100%);
      color: #fff;
      padding: 28px 28px 20px;
    }

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .header-title {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .title-icon {
      font-size: 32px;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 14px;
    }

    .header-title h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      letter-spacing: 0.2px;
    }

    .subtitle {
      margin: 2px 0 0;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.8);
    }

    .raise-btn {
      font-weight: 600;
      border-radius: 10px;
      background: #fff !important;
      color: #1565c0 !important;
    }

    .raise-btn mat-icon {
      margin-right: 4px;
    }

    .stats-row {
      display: flex;
      gap: 10px;
      margin-top: 18px;
      flex-wrap: wrap;
    }

    .stat-pill {
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 999px;
      padding: 6px 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
    }

    .stat-value {
      font-weight: 700;
      font-size: 15px;
    }

    .stat-label {
      color: rgba(255, 255, 255, 0.85);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .stat-label::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #90caf9;
      display: inline-block;
    }

    .stat-label.dot-open::before { background: #64b5f6; }
    .stat-label.dot-acknowledged::before { background: #ce93d8; }
    .stat-label.dot-resolved::before { background: #81c784; }
    .stat-label.dot-rejected::before { background: #ef9a9a; }
    .stat-label.dot-revalidation::before { background: #ffb74d; }

    /* ---------- Filter bar ---------- */
    .filter-section {
      margin: 22px 0 8px;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
      padding: 0 4px;
    }

    .search-field {
      flex: 1 1 280px;
      min-width: 220px;
    }

    .filter-field {
      flex: 0 1 190px;
      min-width: 150px;
    }

    .clear-btn {
      border-radius: 10px;
      color: #d32f2f;
      border-color: #ffcdd2;
    }

    .refresh-btn {
      color: #1976d2;
      background: #e3f2fd;
      border-radius: 10px;
    }

    ::ng-deep .filter-section .mat-mdc-text-field-wrapper {
      border-radius: 10px;
    }

    /* ---------- Loading / Empty ---------- */
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 70px 20px;
      gap: 14px;
      color: #607d8b;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 70px 20px;
      gap: 16px;
      color: #90a4ae;
    }

    .empty-icon {
      font-size: 64px;
      opacity: 0.6;
    }

    /* ---------- Table ---------- */
    .table-wrapper {
      overflow-x: auto;
      border-radius: 12px;
      border: 1px solid #eef1f5;
      margin-top: 8px;
    }

    .tickets-table {
      width: 100%;
    }

    ::ng-deep .tickets-table .mat-mdc-header-row {
      background: #f8fafc;
    }

    ::ng-deep .tickets-table .mat-mdc-header-cell {
      color: #607d8b;
      font-weight: 700;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      border-bottom: 2px solid #eceff1;
    }

    ::ng-deep .tickets-table .mat-mdc-row {
      transition: background-color 0.15s ease;
    }

    ::ng-deep .tickets-table .mat-mdc-row:nth-child(even) {
      background-color: #fafbfc;
    }

    ::ng-deep .tickets-table .mat-mdc-row:hover {
      background-color: #eef5fd !important;
    }

    ::ng-deep .tickets-table .row-revalidation {
      background-color: #fff8e6 !important;
      border-left: 3px solid #ffa726;
    }

    ::ng-deep .tickets-table .row-revalidation:hover {
      background-color: #fff2d6 !important;
    }

    ::ng-deep .tickets-table .mat-mdc-cell {
      border-bottom: 1px solid #f1f3f5;
      font-size: 13.5px;
      color: #37474f;
    }

    .ticket-id {
      font-weight: 700;
      color: #1565c0;
      font-size: 14px;
    }

    .date-cell {
      color: #78909c;
      white-space: nowrap;
    }

    .location-cell {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .loc-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: #90a4ae;
    }

    .assignee-cell {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .avatar-badge {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #e3f2fd;
      color: #1565c0;
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .unassigned-label {
      color: #b0bec5;
      font-style: italic;
      font-size: 13px;
    }

    /* ---------- Badges ---------- */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .priority-low { background: #e3f2fd; color: #1565c0; }
    .priority-medium { background: #fff3e0; color: #e65100; }
    .priority-high { background: #ffebee; color: #c62828; }

    .status-badge .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
    }

    .status-open { background: #e3f2fd; color: #1565c0; }
    .status-acknowledged { background: #f3e5f5; color: #6a1b9a; }
    .status-resolved { background: #e8f5e9; color: #2e7d32; }
    .status-rejected { background: #ffebee; color: #c62828; }
    .status-revalidation { background: #fff3e0; color: #ef6c00; }

    .view-btn {
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 600;
      padding: 0 12px;
      min-width: 0;
      line-height: 32px;
    }

    .view-btn mat-icon {
      font-size: 15px;
      width: 15px;
      height: 15px;
      margin-left: 2px;
    }

    .ticket-paginator {
      background: transparent;
      margin-top: 4px;
    }

    @media (max-width: 768px) {
      .cims-container {
        padding: 12px;
      }

      .card-header {
        padding: 20px 18px 16px;
      }

      .header-top {
        flex-direction: column;
        align-items: flex-start;
        gap: 14px;
      }

      .raise-btn {
        width: 100%;
      }

      .filter-section {
        flex-direction: column;
        align-items: stretch;
      }

      .search-field,
      .filter-field {
        flex: 1 1 auto;
        min-width: 0;
      }

      .clear-btn, .refresh-btn {
        width: 100%;
      }
    }
  `]
})
export class CimsMyTicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  pagedTickets: Ticket[] = [];

  displayedColumns: string[] = ['id', 'type', 'location', 'assignedTo', 'priority', 'status', 'createdAt', 'actions'];
  isLoading = false;

  searchTerm = '';
  statusFilter = '';
  priorityFilter = '';
  fieldPersonFilter = '';

  statusOptions: string[] = [];
  priorityOptions: string[] = [];
  fieldPersonOptions: string[] = [];

  topStatusCounts: { status: string; count: number }[] = [];

  pageSize = 20;
  currentPage = 0;

  private readonly FETCH_BATCH_SIZE = 200;

  constructor(private cimsService: CimsService) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.isLoading = true;

    this.cimsService.getMyTickets(0, this.FETCH_BATCH_SIZE).subscribe({
      next: (firstResponse: PaginatedResponse<Ticket>) => {
        const total = firstResponse?.totalElements ?? 0;
        const firstBatch = firstResponse?.content ?? [];
        const totalBatches = Math.ceil(total / this.FETCH_BATCH_SIZE);

        if (totalBatches <= 1) {
          this.finishLoading(firstBatch);
          return;
        }

        const remainingRequests = [];
        for (let page = 1; page < totalBatches; page++) {
          remainingRequests.push(this.cimsService.getMyTickets(page, this.FETCH_BATCH_SIZE));
        }

        forkJoin(remainingRequests).subscribe({
          next: (responses: PaginatedResponse<Ticket>[]) => {
            const rest = responses.flatMap(r => r?.content ?? []);
            this.finishLoading([...firstBatch, ...rest]);
          },
          error: (err: any) => {
            console.error('Failed to load remaining ticket pages', err);
            this.finishLoading(firstBatch);
          }
        });
      },
      error: (err: any) => {
        console.error('Failed to load tickets', err);
        this.isLoading = false;
      }
    });
  }

  private finishLoading(allTickets: Ticket[]): void {
    this.tickets = this.sortTickets(allTickets);
    this.rebuildFilterOptions();
    this.rebuildStatusCounts();
    this.currentPage = 0;
    this.applyFiltersAndPaginate();
    this.isLoading = false;
  }

  private sortTickets(list: Ticket[]): Ticket[] {
    return list.slice().sort((a, b) => {
      const aPriority = (a.status || '').toUpperCase() === 'REVALIDATION' ? 1 : 0;
      const bPriority = (b.status || '').toUpperCase() === 'REVALIDATION' ? 1 : 0;
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  private rebuildFilterOptions(): void {
    const statuses = new Set<string>();
    const priorities = new Set<string>();
    const fieldPersons = new Set<string>();

    for (const t of this.tickets) {
      if (t.status) statuses.add(t.status);
      if (t.priority) priorities.add(t.priority);
      if (t.fieldPersonName) fieldPersons.add(t.fieldPersonName);
    }

    this.statusOptions = Array.from(statuses).sort();
    this.priorityOptions = Array.from(priorities).sort();
    this.fieldPersonOptions = Array.from(fieldPersons).sort();
  }

  private rebuildStatusCounts(): void {
    const counts = new Map<string, number>();
    for (const t of this.tickets) {
      const key = t.status || 'UNKNOWN';
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    this.topStatusCounts = Array.from(counts.entries())
      .map(([status, count]) => ({ status, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);
  }

  private applyFiltersAndPaginate(): void {
    let result = this.tickets;

    if (this.statusFilter) {
      result = result.filter(t => (t.status || '') === this.statusFilter);
    }

    if (this.priorityFilter) {
      result = result.filter(t => (t.priority || '') === this.priorityFilter);
    }

    if (this.fieldPersonFilter) {
      if (this.fieldPersonFilter === '__unassigned__') {
        result = result.filter(t => !t.fieldPersonName);
      } else {
        result = result.filter(t => t.fieldPersonName === this.fieldPersonFilter);
      }
    }

    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter(t =>
        String(t.id).includes(term) ||
        (t.incidentTypeName || '').toLowerCase().includes(term) ||
        (t.locationName || '').toLowerCase().includes(term) ||
        (t.fieldPersonName || '').toLowerCase().includes(term) ||
        (t.priority || '').toLowerCase().includes(term) ||
        (t.status || '').toLowerCase().includes(term)
      );
    }

    this.filteredTickets = result;
    this.updatePagedTickets();
  }

  private updatePagedTickets(): void {
    const start = this.currentPage * this.pageSize;
    this.pagedTickets = this.filteredTickets.slice(start, start + this.pageSize);
  }

  hasActiveFilters(): boolean {
    return !!(this.searchTerm?.trim() || this.statusFilter || this.priorityFilter || this.fieldPersonFilter);
  }

  onFilterChange(): void {
    this.currentPage = 0;
    this.applyFiltersAndPaginate();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.onFilterChange();
  }

  clearAllFilters(): void {
    this.searchTerm = '';
    this.statusFilter = '';
    this.priorityFilter = '';
    this.fieldPersonFilter = '';
    this.onFilterChange();
  }

  onPageChange(event: PageEvent): void {
    const previousPageSize = this.pageSize;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;

    if (event.pageSize !== previousPageSize) {
      this.currentPage = 0;
    }

    this.updatePagedTickets();
  }

  formatDisplayName(value: string | null | undefined): string {
    if (!value) return '';
    return value
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  initials(name: string | null | undefined): string {
    if (!name) return '?';
    const parts = name.replace(/[_-]+/g, ' ').trim().split(/\s+/);
    return parts.slice(0, 2).map(p => p.charAt(0).toUpperCase()).join('');
  }
}