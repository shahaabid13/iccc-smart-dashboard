import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CimsService } from '../../services/cims.service';
import { Ticket, PaginatedResponse, Reviewer } from '../../models/cims.models';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AcknowledgeAssignDialogComponent, AcknowledgeAssignResult } from './acknowledge-assign-dialog.component';

@Component({
  selector: 'app-cims-coordinator-queue',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  template: `
    <div class="cims-container">
      <mat-card class="queue-card">
        <mat-card-header>
          <mat-card-title>
            <div class="header-title">
              <span class="icon">📥</span>
              <span>Coordinator Queue</span>
              <span class="count" *ngIf="totalElements > 0">{{ totalElements }}</span>
            </div>
          </mat-card-title>
          <mat-card-subtitle>Tickets awaiting acknowledgment and assignment</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <!-- Loading State -->
          <div *ngIf="isLoading" class="loading-container">
            <mat-spinner diameter="50"></mat-spinner>
            <p>Loading queue...</p>
          </div>

          <!-- Table -->
          <div *ngIf="!isLoading" class="table-wrapper">
            <table mat-table [dataSource]="tickets" class="queue-table">
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

              <!-- Priority Column -->
              <ng-container matColumnDef="priority">
                <th mat-header-cell *matHeaderCellDef>Priority</th>
                <td mat-cell *matCellDef="let element">
                  <mat-chip [class]="'priority-' + element.priority.toLowerCase()">
                    {{ element.priority }}
                  </mat-chip>
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

              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let element">
                  <mat-chip [class]="'status-' + (element.status || '').toLowerCase()">
                    {{ element.status }}
                  </mat-chip>
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let element">
                  <div class="action-buttons">
                    <button
                      mat-stroked-button
                      color="primary"
                      matTooltip="Acknowledge this ticket and assign a reviewer"
                      (click)="processTicket(element)">
                      <mat-icon>assignment_turned_in</mat-icon>
                      Assign
                    </button>
                    <button mat-icon-button matTooltip="View Details" [routerLink]="['/cims/coordinator/tickets', element.id]">
                      <mat-icon>visibility</mat-icon>
                    </button>
                  </div>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>

          <!-- Empty State -->
          <div *ngIf="!isLoading && tickets.length === 0" class="empty-state">
            <div class="empty-icon">✨</div>
            <p>All tickets are processed!</p>
            <span class="empty-text">Great work! No pending tickets in the queue.</span>
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

    .queue-card {
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

    .count {
      background: #ff6b6b;
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
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

    .queue-table {
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

    .action-buttons {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .action-buttons button[mat-stroked-button] {
      display: flex;
      align-items: center;
      gap: 4px;
      line-height: 1;
    }

    .action-buttons mat-icon {
      font-size: 18px;
      height: 18px;
      width: 18px;
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

    .empty-text {
      font-size: 14px;
      color: #bbb;
    }
  `]
})
export class CimsCoordinatorQueueComponent implements OnInit {
  tickets: Ticket[] = [];
  displayedColumns: string[] = ['id', 'type', 'location', 'priority', 'raisedBy', 'createdAt', 'status', 'actions'];
  isLoading = false;
  pageSize = 10;
  currentPage = 0;
  totalElements = 0;
  reviewers: Reviewer[] = [];

  constructor(
    private cimsService: CimsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadQueue();
    this.loadReviewers();
  }

  loadQueue(): void {
    this.isLoading = true;
    this.cimsService.getCoordinatorQueue(this.currentPage, this.pageSize).subscribe({
      next: (response: PaginatedResponse<Ticket>) => {
        this.tickets = (response?.content ?? []).slice().sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.totalElements = response?.totalElements ?? 0;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load coordinator queue', err);
        this.tickets = [];
        this.totalElements = 0;
        this.isLoading = false;
        this.snackBar.open('Failed to load queue', 'Close', { duration: 5000 });
      }
    });
  }

  loadReviewers(): void {
    this.cimsService.getReviewers().subscribe({
      next: (reviewers: Reviewer[]) => {
        this.reviewers = reviewers ?? [];
      },
      error: (err: any) => {
        console.error('Failed to load reviewers', err);
        this.reviewers = [];
        this.snackBar.open('Failed to load reviewers list', 'Close', { duration: 5000 });
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadQueue();
  }

  /**
   * Opens the combined Acknowledge + Assign dialog. On submit, acknowledges
   * the ticket first and then assigns the chosen reviewer, so both actions
   * happen from one form and one button.
   */
  processTicket(ticket: Ticket): void {
    const dialogRef = this.dialog.open(AcknowledgeAssignDialogComponent, {
      width: '480px',
      data: { ticket, reviewers: this.reviewers }
    });

    dialogRef.afterClosed().subscribe((result: AcknowledgeAssignResult | undefined) => {
      if (!result) {
        return; // dialog was cancelled
      }

      this.cimsService.acknowledgeTicket(ticket.id, result.notes).subscribe({
        next: () => {
          this.cimsService.assignReviewer(ticket.id, result.reviewerId).subscribe({
            next: () => {
              this.snackBar.open('Ticket acknowledged and reviewer assigned', 'Close', { duration: 5000 });
              this.loadQueue();
            },
            error: (err: any) => {
              const errorMsg = err.error?.message || 'Ticket acknowledged, but failed to assign reviewer';
              this.snackBar.open(errorMsg, 'Close', { duration: 5000 });
              this.loadQueue();
            }
          });
        },
        error: (err: any) => {
          const errorMsg = err.error?.message || 'Failed to acknowledge ticket';
          this.snackBar.open(errorMsg, 'Close', { duration: 5000 });
        }
      });
    });
  }
}