import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
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
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  template: `
    <div class="cims-container">
      <mat-card class="tickets-card">
        <mat-card-header>
          <mat-card-title>
            <div class="header-with-button">
              <div class="header-title">
                <span class="icon">📋</span>
                <span>My Raised Tickets</span>
              </div>
              <button mat-raised-button color="primary" routerLink="/cims/support-engineer/create-ticket">
                <mat-icon>add</mat-icon> Raise New Ticket
              </button>
            </div>
          </mat-card-title>
          <mat-card-subtitle>Review and search your open, pending, or closed incidents.</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <!-- Search Bar -->
          <div class="search-section">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Search tickets</mat-label>
              <input matInput [(ngModel)]="searchTerm" placeholder="Search by ID or Type..." (ngModelChange)="onSearch()">
              <button mat-icon-button matSuffix>
                <mat-icon>search</mat-icon>
              </button>
            </mat-form-field>
          </div>

          <!-- Loading State -->
          <div *ngIf="isLoading" class="loading-container">
            <mat-spinner diameter="50"></mat-spinner>
            <p>Loading tickets...</p>
          </div>

          <!-- Table -->
          <div *ngIf="!isLoading" class="table-wrapper">
            <table mat-table [dataSource]="tickets" class="tickets-table">
              <!-- Ticket ID Column -->
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>Ticket ID</th>
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

              <!-- Priority Column -->
              <ng-container matColumnDef="priority">
                <th mat-header-cell *matHeaderCellDef>Priority</th>
                <td mat-cell *matCellDef="let element">
                  <mat-chip [class]="'priority-' + element.priority.toLowerCase()">
                    {{ element.priority }}
                  </mat-chip>
                </td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let element">
                  <mat-chip [class]="'status-' + element.status.toLowerCase()">
                    {{ element.status }}
                  </mat-chip>
                </td>
              </ng-container>

              <!-- Created Date Column -->
              <ng-container matColumnDef="createdAt">
                <th mat-header-cell *matHeaderCellDef>Created</th>
                <td mat-cell *matCellDef="let element">
                  {{ element.createdAt | date: 'short' }}
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let element">
                  <button mat-button color="primary" [routerLink]="['/cims/support-engineer/tickets', element.id]">
                    View Details
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
            <p>No tickets found</p>
            <button mat-raised-button color="primary" routerLink="/cims/support-engineer/create-ticket">
              Create First Ticket
            </button>
          </div>

          <!-- Paginator -->
          <mat-paginator
            *ngIf="!isLoading && tickets.length > 0"
            [length]="totalElements"
            [pageSize]="pageSize"
            [pageSizeOptions]="[5, 10, 20]"
            (page)="onPageChange($event)">
          </mat-paginator>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .cims-container {
      padding: 24px;
    }

    .tickets-card {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .header-with-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
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

    .search-section {
      margin: 20px 0;
      display: flex;
      gap: 12px;
    }

    .search-field {
      flex: 1;
      max-width: 400px;
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

    .status-resolved {
      background-color: #e8f5e9;
      color: #2e7d32;
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
      gap: 16px;
      color: #999;
    }

    .empty-icon {
      font-size: 64px;
    }

    @media (max-width: 768px) {
      .header-with-button {
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
      }

      button {
        width: 100%;
      }
    }
  `]
})
export class CimsMyTicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  displayedColumns: string[] = ['id', 'type', 'location', 'priority', 'status', 'createdAt', 'actions'];
  isLoading = false;
  searchTerm = '';
  pageSize = 20;
  currentPage = 0;
  totalElements = 0;

  constructor(private cimsService: CimsService) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.isLoading = true;
    // Note: The backend API doesn't support searching by searchTerm yet.
    // For now, we load all tickets and filter client-side.
    // TODO: Once backend supports search parameter, pass it here:
    // this.cimsService.getMyTickets(this.currentPage, this.pageSize, this.searchTerm)
    this.cimsService.getMyTickets(this.currentPage, this.pageSize).subscribe({
      next: (response: PaginatedResponse<Ticket>) => {
        const allTickets = (response?.content ?? []).slice().sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        // Client-side filtering by search term if backend doesn't support it
        const filtered = this.filterTickets(allTickets, this.searchTerm);
        this.tickets = filtered;
        this.totalElements = response?.totalElements ?? 0;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load tickets', err);
        this.isLoading = false;
      }
    });
  }

  private filterTickets(tickets: Ticket[], searchTerm: string): Ticket[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return tickets;
    }
    const term = searchTerm.toLowerCase();
    return tickets.filter(t => 
      String(t.id).includes(term) || 
      (t.incidentTypeName || '').toLowerCase().includes(term)
    );
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTickets();
  }

  onSearch(): void {
    this.currentPage = 0;
    this.loadTickets();
  }
}
