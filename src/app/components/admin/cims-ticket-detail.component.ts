import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { CimsService } from '../../services/cims.service';
import { AuthService } from '../../services/auth.service';
import { Ticket } from '../../models/cims.models';

@Component({
  selector: 'app-cims-ticket-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatChipsModule
  ],
  template: `
    <div class="cims-container">
      <!-- Loading State -->
      <div *ngIf="isLoading" class="loading-container">
        <mat-spinner diameter="50"></mat-spinner>
        <p>Loading ticket details...</p>
      </div>

      <!-- Ticket Details -->
      <div *ngIf="!isLoading && ticket" class="ticket-detail">
        <mat-card class="detail-card">
          <mat-card-header>
            <div class="header-row">
              <div class="header-title">
                <span class="icon">📹</span>
                <span>Ticket #{{ ticket.id }}</span>
                <mat-chip [class]="'status-' + ticket.status.toLowerCase()">
                  {{ ticket.status }}
                </mat-chip>
              </div>
              <button mat-icon-button matTooltip="Go Back" (click)="goBack()">
                <mat-icon>arrow_back</mat-icon>
              </button>
            </div>
          </mat-card-header>

          <mat-card-content>
            <!-- Quick Info Grid -->
            <div class="info-grid">
              <div class="info-item">
                <span class="label">Incident Type</span>
                <span class="value">{{ ticket.incidentTypeName }}</span>
              </div>
              <div class="info-item">
                <span class="label">Location</span>
                <span class="value">{{ ticket.locationName }}</span>
              </div>
              <div class="info-item">
                <span class="label">Priority</span>
                <span class="value">
                  <mat-chip [class]="'priority-' + ticket.priority.toLowerCase()">
                    {{ ticket.priority }}
                  </mat-chip>
                </span>
              </div>
              <div class="info-item">
                <span class="label">Raised By</span>
                <span class="value">{{ ticket.raisedByUsername }}</span>
              </div>
              <div class="info-item">
                <span class="label">Field Person</span>
                <span class="value">{{ ticket.fieldPersonName }}</span>
              </div>
              <div class="info-item">
                <span class="label">Created</span>
                <span class="value">{{ ticket.createdAt | date: 'medium' }}</span>
              </div>
              <div class="info-item" *ngIf="ticket.approachRoadName">
                <span class="label">Approach Road</span>
                <span class="value">{{ ticket.approachRoadName }}</span>
              </div>
              <div class="info-item" *ngIf="ticket.deviceTypeName">
                <span class="label">Device Type</span>
                <span class="value">{{ ticket.deviceTypeName }}</span>
              </div>
              <div class="info-item" *ngIf="ticket.assignedToReviewerName">
                <span class="label">Assigned To</span>
                <span class="value">{{ ticket.assignedToReviewerName }}</span>
              </div>
              <div class="info-item">
                <span class="label">Last Updated</span>
                <span class="value">{{ ticket.updatedAt | date: 'medium' }}</span>
              </div>
            </div>

            <!-- Description -->
            <div class="description-section">
              <h3>Description</h3>
              <div class="description-box">
                {{ ticket.description }}
              </div>
            </div>

            <!-- History Tab -->
            <mat-tab-group>
              <mat-tab label="History">
                <div class="history-section">
                  <div *ngIf="ticket.history && ticket.history.length > 0" class="timeline">
                    <div *ngFor="let entry of ticket.history" class="timeline-item">
                      <div class="timeline-dot"></div>
                      <div class="timeline-content">
                        <div class="timeline-header">
                          <span class="action">{{ getHistoryActionLabel(entry) }}</span>
                          <span class="changed-by">by {{ getHistoryActor(entry) }}</span>
                          <span class="time">{{ getHistoryTimestamp(entry) | date: 'medium' }}</span>
                        </div>
                        <div class="timeline-notes" *ngIf="entry.notes">
                          {{ entry.notes }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div *ngIf="!ticket.history || ticket.history.length === 0" class="empty-history">
                    No history yet
                  </div>
                </div>
              </mat-tab>
            </mat-tab-group>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Error State -->
      <div *ngIf="!isLoading && !ticket" class="error-state">
        <mat-card>
          <mat-card-content>
            <div class="error-message">
              <mat-icon>error_outline</mat-icon>
              <p>Ticket not found</p>
              <button mat-raised-button color="primary" (click)="goBack()">Go Back</button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .cims-container {
      padding: 24px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      gap: 12px;
    }

    .detail-card {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .header-row {
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
      font-weight: 600;
    }

    .icon {
      font-size: 28px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 20px 0;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 8px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .label {
      font-size: 12px;
      font-weight: 600;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .value {
      font-size: 16px;
      color: #1a1a1a;
      font-weight: 500;
    }

    .description-section {
      margin-top: 30px;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 8px;
    }

    .description-section h3 {
      margin: 0 0 12px 0;
      color: #333;
      font-size: 16px;
      font-weight: 600;
    }

    .description-box {
      padding: 16px;
      background: white;
      border-left: 4px solid #1976d2;
      border-radius: 4px;
      line-height: 1.6;
      color: #333;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .history-section {
      padding: 20px;
    }

    .timeline {
      position: relative;
      padding: 10px 0;
    }

    .timeline-item {
      display: flex;
      gap: 20px;
      margin-bottom: 24px;
      position: relative;
    }

    .timeline-dot {
      width: 12px;
      height: 12px;
      background: #1976d2;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 0 0 2px #1976d2;
      margin-top: 4px;
      flex-shrink: 0;
    }

    .timeline-content {
      flex: 1;
      padding: 12px 16px;
      background: #f9f9f9;
      border-radius: 8px;
    }

    .timeline-header {
      display: flex;
      gap: 12px;
      font-size: 14px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }

    .action {
      font-weight: 600;
      color: #333;
    }

    .changed-by {
      color: #666;
    }

    .time {
      color: #999;
      font-size: 13px;
    }

    .timeline-notes {
      color: #555;
      font-size: 14px;
      margin-top: 8px;
      font-style: italic;
    }

    .empty-history {
      text-align: center;
      padding: 40px;
      color: #999;
    }

    .error-state {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 400px;
    }

    .error-message {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      color: #666;
    }

    .error-message mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #ff6b6b;
    }

    .error-message p {
      font-size: 18px;
      margin: 0;
    }

    .status-open {
      background-color: #e3f2fd;
      color: #1565c0;
    }

    .status-resolved {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    .status-pending {
      background-color: #fff3e0;
      color: #e65100;
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

    @media (max-width: 768px) {
      .info-grid {
        grid-template-columns: 1fr;
      }

      .header-row {
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
      }
    }
  `]
})
export class CimsTicketDetailComponent implements OnInit {
  ticket: Ticket | null = null;
  isLoading = false;
  ticketId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private cimsService: CimsService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.ticketId = Number(params['id']);
      if (!isNaN(this.ticketId)) {
        this.loadTicket();
      }
    });
  }

  loadTicket(): void {
    if (!this.ticketId) return;

    this.isLoading = true;
    this.cimsService.getTicketById(this.ticketId).subscribe({
      next: (ticket: Ticket) => {
        this.ticket = ticket;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load ticket', err);
        if (err?.status === 403) {
          this.tryRoleBasedTicketLookup();
          return;
        }

        this.isLoading = false;
        this.snackBar.open('Failed to load ticket details', 'Close', { duration: 5000 });
      }
    });
  }

  private tryRoleBasedTicketLookup(): void {
    const role = this.authService.getRole()?.toUpperCase();
    let lookup$;

    if (role === 'FIELD_PERSON') {
      lookup$ = this.cimsService.getFieldPersonQueue(0, 200);
    } else if (role === 'COORDINATOR') {
      lookup$ = this.cimsService.getCoordinatorQueue(0, 200);
    } else if (role === 'REVIEWER') {
      lookup$ = this.cimsService.getReviewQueue(0, 200);
    } else if (role === 'SUPPORT_ENGINEER') {
      lookup$ = this.cimsService.getMyTickets(0, 200);
    } else {
      lookup$ = this.cimsService.getFieldPersonQueue(0, 200);
    }

    lookup$.subscribe({
      next: (response: any) => {
        const tickets = Array.isArray(response) ? response : (response?.content ?? []);
        const found = tickets.find((t: Ticket) => String(t.id) === String(this.ticketId));
        if (found) {
          this.ticket = found;
          this.isLoading = false;
          return;
        }

        this.isLoading = false;
        this.snackBar.open('You do not have permission to view this ticket', 'Close', { duration: 5000 });
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Failed to load ticket details', 'Close', { duration: 5000 });
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  /**
   * Best-effort lookup for who performed a history action. The backend
   * TicketHistory entity stores the actor as a changedByUser relation (an
   * AppUser), not a flat "changedBy" string field the old template assumed
   * — so that binding always resolved to undefined. This checks the
   * likely shapes the API might serialize that relation as, rather than
   * assuming one specific field name (same defensive pattern used
   * elsewhere in this app, e.g. getClosedDate()).
   */
  getHistoryActor(entry: any): string {
    if (!entry) return 'Unknown';
    return (
      entry.changedByUsername ||
      entry.changedByUser?.username ||
      entry.changedByUser?.fullName ||
      entry.changedByFullName ||
      entry.changedBy ||
      'Unknown'
    );
  }

  /**
   * Best-effort lookup for the action label shown per history entry. The
   * backend records fromStatus/toStatus rather than a single "action"
   * field, so derive a readable label from those if a dedicated action
   * field isn't present on the response.
   */
  getHistoryAction(entry: any): string {
    if (!entry) return '';
    if (entry.action) return entry.action;
    if (entry.toStatus) {
      return entry.fromStatus ? `${entry.fromStatus} → ${entry.toStatus}` : entry.toStatus;
    }
    return '';
  }

  // Display-only relabeling for status codes that no longer match current
  // role naming. The backend enum value COORDINATOR_REVIEW is kept as-is
  // (renaming it would require a data migration across every existing
  // ticket_history/tickets row), but the Coordinator role itself was
  // removed — Field Person now performs this step. This map translates
  // the raw enum to the correct current terminology for display only;
  // nothing sent to/from the backend is affected.
  private readonly STATUS_LABELS: Record<string, string> = {
    COORDINATOR_REVIEW: 'FIELD PERSON REVIEW'
  };

  private toDisplayStatus(status: string): string {
    if (!status) return status;
    return this.STATUS_LABELS[status] || status;
  }

  /** Same as getHistoryAction(), but with status codes relabeled for
   * display (e.g. COORDINATOR_REVIEW -> FIELD PERSON REVIEW). */
  getHistoryActionLabel(entry: any): string {
    if (!entry) return '';
    if (entry.action) return entry.action;
    if (entry.toStatus) {
      const to = this.toDisplayStatus(entry.toStatus);
      const from = entry.fromStatus ? this.toDisplayStatus(entry.fromStatus) : null;
      return from ? `${from} → ${to}` : to;
    }
    return '';
  }

  /**
   * Best-effort lookup for the history entry's timestamp — covers both
   * changedAt (matches the backend entity) and createdAt in case a
   * different DTO shape is returned.
   */
  getHistoryTimestamp(entry: any): any {
    if (!entry) return null;
    return entry.changedAt || entry.createdAt || null;
  }
}