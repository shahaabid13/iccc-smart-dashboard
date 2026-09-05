import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CimsService } from '../../services/cims.service';
import { Ticket, Reviewer, PaginatedResponse } from '../../models/cims.models';
import { AcknowledgeAssignDialogComponent, AcknowledgeAssignResult } from './acknowledge-assign-dialog.component';

@Component({
  selector: 'app-cims-field-person-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  template: `
    <div class="field-person-container">
      <mat-card class="header-card">
        <div class="header-content">
          <div>
            <h1>Field Person</h1>
            <p class="subtitle">Tap a ticket to acknowledge or view details</p>
          </div>
          <div class="header-actions">
            <button mat-icon-button aria-label="Refresh" (click)="ngOnInit()">
              <mat-icon>refresh</mat-icon>
            </button>
          </div>
        </div>
      </mat-card>

      <div class="tabs">
        <button mat-button [class.active]="selectedTab===0" (click)="selectedTab=0">My Queue ({{queue.length}})</button>
        <button mat-button [class.active]="selectedTab===1" (click)="selectedTab=1">My History ({{history.length}})</button>
      </div>

      <div class="content">
        <div *ngIf="selectedTab===0">
          <div *ngIf="isLoadingQueue" class="loading-container">
            <mat-spinner diameter="36"></mat-spinner>
            <p>Loading assigned tickets...</p>
          </div>

          <div *ngIf="!isLoadingQueue && queue.length===0" class="empty-state">
            <mat-icon class="empty-icon">check_circle</mat-icon>
            <p>No open tickets assigned to you.</p>
          </div>

          <div class="card-list">
            <mat-card class="ticket-card" *ngFor="let ticket of queue" (click)="processTicket(ticket)">
              <div class="row top">
                <div class="id">#{{ticket.id}}</div>
                <mat-chip class="status-chip">{{ticket.status}}</mat-chip>
              </div>
              <div class="title">{{ticket.incidentTypeName}}</div>
              <div class="meta">{{ticket.locationName}}</div>
              <div class="row actions">
                <button mat-flat-button color="primary" (click)="processTicket(ticket); $event.stopPropagation()">Acknowledge</button>
                <button mat-stroked-button color="basic" [routerLink]="['/cims/field-person/tickets', ticket.id]" (click)="$event.stopPropagation()">Details</button>
              </div>
            </mat-card>
          </div>
        </div>

        <div *ngIf="selectedTab===1">
          <div *ngIf="isLoadingHistory" class="loading-container">
            <mat-spinner diameter="36"></mat-spinner>
            <p>Loading history...</p>
          </div>

          <div *ngIf="!isLoadingHistory && history.length===0" class="empty-state">
            <mat-icon class="empty-icon">history</mat-icon>
            <p>No history entries available.</p>
          </div>

          <div class="card-list">
            <mat-card class="ticket-card" *ngFor="let ticket of history">
              <div class="row top">
                <div class="id">#{{ticket.id}}</div>
                <mat-chip class="status-chip">{{ticket.status}}</mat-chip>
              </div>
              <div class="title">{{ticket.incidentTypeName}}</div>
              <div class="meta">{{ticket.locationName}}</div>
              <div class="row actions">
                <button mat-stroked-button color="basic" [routerLink]="['/cims/field-person/tickets', ticket.id]">Details</button>
              </div>
            </mat-card>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .field-person-container {
      padding: 12px;
    }

    .header-card {
      margin-bottom: 12px;
      padding: 12px;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-content h1 {
      margin: 0;
      font-size: 18px;
    }

    .subtitle {
      margin: 0;
      font-size: 12px;
      color: #666;
    }

    .tabs {
      display: flex;
      gap: 8px;
      margin: 8px 0 12px 0;
      padding: 0 4px;
    }

    .tabs button {
      flex: 1;
      font-size: 14px;
      min-height: 36px;
    }

    .tabs button.active {
      border-bottom: 2px solid #1976d2;
    }

    .content {
      padding-bottom: 40px;
    }

    .card-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .ticket-card {
      padding: 12px;
      border-radius: 8px;
    }

    .ticket-card .row { display:flex; align-items:center; justify-content:space-between; }
    .ticket-card .row.top { margin-bottom:6px; }
    .ticket-card .id { font-weight:700; }
    .ticket-card .title { font-size:15px; margin-bottom:4px; }
    .ticket-card .meta { font-size:12px; color:#666; margin-bottom:8px; }

    .ticket-card .actions { gap:8px; }

    .loading-container { text-align:center; padding:20px 0; }

    .empty-state { text-align:center; padding:20px 0; color:#777; }

    .empty-icon { font-size:36px; color:#9e9e9e; }

    @media (min-width: 769px) {
      .field-person-container { max-width: 1000px; margin: 0 auto; }
      .tabs { max-width: 600px; margin-left: 0; }
    }

    /* Prevent left sidebar from overlapping content on narrow mobile viewports.
       Many devices keep a small persistent sidebar area; add left padding so
       cards are readable and not hidden under the nav. */
    @media (max-width: 420px) {
      .field-person-container {
        padding-left: 64px; /* leave space for the collapsed sidebar */
        padding-right: 8px;
      }

      .header-card, .ticket-card {
        margin-left: 0;
      }
    }
  `]
})
export class CimsFieldPersonDashboardComponent implements OnInit {
  selectedTab = 0;
  queue: Ticket[] = [];
  history: Ticket[] = [];
  reviewers: Reviewer[] = [];
  isLoadingQueue = false;
  isLoadingHistory = false;
  isLoadingReviewers = false;
  queueColumns: string[] = ['id', 'type', 'location', 'priority', 'status', 'createdAt', 'actions'];
  historyColumns: string[] = ['id', 'type', 'location', 'priority', 'status', 'assignedReviewer', 'updatedAt', 'actions'];

  constructor(
    private cimsService: CimsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadQueue();
    this.loadHistory();
    this.loadReviewers();
  }

  loadQueue(): void {
    this.isLoadingQueue = true;
    this.cimsService.getFieldPersonQueue().subscribe({
      next: (response: any) => {
        const tickets = Array.isArray(response) ? response : (response?.content ?? []);
        this.queue = (tickets || []).slice().sort((a: Ticket, b: Ticket) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.isLoadingQueue = false;
      },
      error: (err: any) => {
        console.error('Failed to load field person queue', err);
        this.queue = [];
        this.isLoadingQueue = false;
        this.snackBar.open('Failed to load your queue', 'Close', { duration: 5000 });
      }
    });
  }

  loadHistory(): void {
    this.isLoadingHistory = true;
    this.cimsService.getFieldPersonHistory(0, 20).subscribe({
      next: (response: Ticket[] | PaginatedResponse<Ticket>) => {
        const historyTickets = Array.isArray(response) ? response : response.content || [];
        this.history = historyTickets.slice().sort((a: Ticket, b: Ticket) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.isLoadingHistory = false;
      },
      error: (err: any) => {
        console.error('Failed to load field person history', err);
        this.history = [];
        this.isLoadingHistory = false;
        this.snackBar.open('Failed to load your history', 'Close', { duration: 5000 });
      }
    });
  }

  loadReviewers(): void {
    this.isLoadingReviewers = true;
    this.cimsService.getReviewers().subscribe({
      next: (reviewers: Reviewer[]) => {
        this.reviewers = reviewers || [];
        this.isLoadingReviewers = false;
      },
      error: (err: any) => {
        console.error('Failed to load reviewers', err);
        this.reviewers = [];
        this.isLoadingReviewers = false;
        this.snackBar.open('Failed to load reviewers', 'Close', { duration: 5000 });
      }
    });
  }

  processTicket(ticket: Ticket): void {
    const dialogRef = this.dialog.open(AcknowledgeAssignDialogComponent, {
      width: '500px',
      data: { ticket, reviewers: this.reviewers }
    });

    dialogRef.afterClosed().subscribe((result: AcknowledgeAssignResult | undefined) => {
      if (!result) {
        return;
      }

      this.cimsService.acknowledgeTicket(ticket.id, result.notes).subscribe({
        next: () => {
          this.cimsService.assignReviewer(ticket.id, result.reviewerId).subscribe({
            next: () => {
              this.snackBar.open('Ticket acknowledged and reviewer assigned', 'Close', { duration: 5000 });
              this.loadQueue();
              this.loadHistory();
            },
            error: (assignErr: any) => {
              const errorMsg = assignErr.error?.message || 'Ticket acknowledged, but failed to assign reviewer';
              this.snackBar.open(errorMsg, 'Close', { duration: 5000 });
              this.loadQueue();
              this.loadHistory();
            }
          });
        },
        error: (ackErr: any) => {
          const errorMsg = ackErr.error?.message || 'Failed to acknowledge ticket';
          this.snackBar.open(errorMsg, 'Close', { duration: 5000 });
        }
      });
    });
  }
}
