import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CimsService } from '../../services/cims.service';
import { AuthService } from '../../services/auth.service';
import { FieldPerson, Ticket } from '../../models/cims.models';

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
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
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
                <span class="value">{{ formatDisplayName(ticket.fieldPersonName) }}</span>
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
              <div class="info-item" *ngIf="ticket.assignedToReviewerName || isRevalidationTicket()">
                <span class="label">{{ getAssignedToLabel() }}</span>
                <span class="value">{{ getAssignedToValue() }}</span>
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

            <div class="action-panel" *ngIf="canShowSupportEngineerActionPanel()">
              <h3>Action required</h3>
              <div class="action-buttons">
                <button mat-stroked-button color="warn" (click)="openSupportEngineerAction('REOPEN')">Reopen – issue persists</button>
                <button mat-flat-button color="primary" (click)="openSupportEngineerAction('SEND_FOR_REVIEW')">Send for Review – issue solved</button>
              </div>
            </div>

            <div class="action-panel" *ngIf="canShowFieldPersonActions()">
              <h3>Field Person Actions</h3>
              <div class="action-buttons">
                <button mat-flat-button color="primary" (click)="resolveTicket()">Resolved</button>
                <button mat-stroked-button color="warn" (click)="revalidateTicket()">Revalidation</button>
              </div>
            </div>

            <div class="action-panel" *ngIf="canShowSupportEngineerAssignmentPanel()">
              <h3>Ticket Assignment</h3>
              <div class="assignment-grid">
                <div class="assign-keyline">
                  <span class="assign-label">Status:</span>
                  <strong>{{ ticket.status || 'OPEN' }}</strong>
                </div>

                <mat-form-field appearance="outline" class="assign-field">
                  <mat-label>Schedule Date</mat-label>
                  <input
                    matInput
                    [matDatepicker]="assignmentPicker"
                    [(ngModel)]="scheduledDate"
                    [min]="minFutureAssignmentDate"
                    [attr.placeholder]="'Select future date'"
                  />
                  <mat-datepicker-toggle matSuffix [for]="assignmentPicker"></mat-datepicker-toggle>
                  <mat-datepicker #assignmentPicker></mat-datepicker>
                </mat-form-field>

                <mat-form-field appearance="outline" class="assign-field">
                  <mat-label>Assign To</mat-label>
                  <mat-select [(ngModel)]="selectedFieldPersonId">
                    <mat-option value="">Select Field Person</mat-option>
                    <mat-option *ngFor="let person of eligibleFieldPersons" [value]="person.id">
                      {{ person.name }}
                    </mat-option>
                  </mat-select>
                </mat-form-field>

                <button mat-flat-button color="primary" (click)="assignToFieldPerson()">
                  Assign
                </button>
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

    .action-panel {
      margin-top: 20px;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 8px;
    }

    .action-panel h3 {
      margin: 0 0 12px;
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    .action-buttons {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .assignment-grid {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 14px;
    }

    .assign-keyline {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 120px;
      font-size: 14px;
      color: #333;
    }

    .assign-label {
      color: #666;
      font-weight: 600;
    }

    .assign-field {
      min-width: 220px;
      flex: 1;
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

    mat-chip,
    .status-open,
    .status-resolved,
    .status-pending,
    .priority-low,
    .priority-medium,
    .priority-high {
      background: transparent !important;
      border: none !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      min-height: 0 !important;
      padding: 0 !important;
      font-weight: 600;
      letter-spacing: 0.01em;
      display: inline-block;
    }

    .status-open { color: #1565c0; }
    .status-resolved { color: #2e7d32; }
    .status-pending { color: #e65100; }
    .priority-low { color: #1565c0; }
    .priority-medium { color: #e65100; }
    .priority-high { color: #c62828; }

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
  eligibleFieldPersons: FieldPerson[] = [];
  selectedFieldPersonId: number | null = null;
  scheduledDate: Date | null = null;
  minFutureAssignmentDate = new Date();

  constructor(
    private route: ActivatedRoute,
    private cimsService: CimsService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.minFutureAssignmentDate.setHours(0, 0, 0, 0);
  }


  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.ticketId = Number(params['id']);
      if (!isNaN(this.ticketId)) {
        this.loadTicket();
        this.loadAssignableFieldPersons();
      }
    });
  }

  loadAssignableFieldPersons(): void {
    this.cimsService.getAssignableFieldPersons().subscribe({
      next: (people: FieldPerson[]) => {
        this.eligibleFieldPersons = people || [];
      },
      error: (err: any) => {
        console.error('Failed to load eligible field persons', err);
        this.eligibleFieldPersons = [];
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
    if (entry.action) {
      const action = (entry.action || '').toString();
      return this.toDisplayAction(action);
    }
    if (entry.toStatus) {
      const from = entry.fromStatus ? this.toDisplayAction(entry.fromStatus) : null;
      const to = this.toDisplayAction(entry.toStatus);
      return from ? `${from} → ${to}` : to;
    }
    return '';
  }

  isRevalidationTicket(): boolean {
    if (!this.ticket) return false;
    const status = (this.ticket.status || '').toUpperCase();
    if (['REVALIDATED', 'REVALIDATION', 'PENDING_REVALIDATION'].some((value) => status.includes(value))) {
      return true;
    }
    return !!this.ticket.history?.some((entry: any) => {
      const value = `${entry?.action || ''} ${entry?.toStatus || ''} ${entry?.fromStatus || ''}`.toUpperCase();
      return value.includes('REVALID');
    });
  }

  getAssignedToLabel(): string {
    const currentRole = this.authService.getRole()?.toUpperCase();
    if (this.isRevalidationTicket() || currentRole === 'SUPPORT_ENGINEER') {
      return 'Assigned To Support Engineer';
    }
    return 'Assigned To';
  }

  getAssignedToValue(): string {
    if (!this.ticket) return '';
    const currentRole = this.authService.getRole()?.toUpperCase();
    const status = (this.ticket.status || '').toUpperCase();
    const isSupportEngineerContext = currentRole === 'SUPPORT_ENGINEER' && ['ASSIGNED_TO_REVIEWER', 'REVALIDATED', 'REVALIDATION'].includes(status);

    if (this.isRevalidationTicket() || isSupportEngineerContext) {
      return this.ticket.raisedByUsername || 'Support Engineer';
    }
    return this.ticket.assignedToReviewerName || '';
  }

  isSupportEngineerView(): boolean {
    return (this.authService.getRole()?.toUpperCase() || '') === 'SUPPORT_ENGINEER';
  }

  canShowSupportEngineerActionPanel(): boolean {
    if (!this.ticket) return false;
    const role = (this.authService.getRole() || '').toUpperCase();
    if (role !== 'SUPPORT_ENGINEER') return false;
    const status = (this.ticket.status || '').toUpperCase();
    const isRevalidationState = ['REVALIDATED', 'REVALIDATION', 'PENDING_REVALIDATION'].some((value) => status.includes(value));
    const isTicketRaisedByCurrentUser = (this.ticket.raisedByUsername || '').toLowerCase() === (localStorage.getItem('username') || '').toLowerCase();
    return isRevalidationState && isTicketRaisedByCurrentUser;
  }

  canShowFieldPersonActions(): boolean {
    if (!this.ticket) return false;
    const role = (this.authService.getRole() || '').toUpperCase();
    if (role !== 'FIELD_PERSON') return false;
    const status = (this.ticket.status || '').toUpperCase();
    const assignedToCurrentUser = this.isCurrentFieldPersonAssigned();
    return assignedToCurrentUser && ['OPEN', 'REOPENED', 'PENDING', 'ASSIGNED_TO_REVIEWER', 'FIELD_PERSON_REVIEW', 'REVALIDATED', 'REVALIDATION'].includes(status);
  }

  isCurrentFieldPersonAssigned(): boolean {
    if (!this.ticket) return false;
    const rawUser = localStorage.getItem('username') || '';
    const currentUser = this.normalizeUserName(rawUser);
    const ticketPerson = this.normalizeUserName(this.ticket.fieldPersonName || this.ticket.createdBy || '');
    if (!currentUser || !ticketPerson) {
      return !!this.ticket.fieldPersonId && this.ticket.fieldPersonId > 0;
    }
    return ticketPerson === currentUser;
  }

  normalizeUserName(value: string | null | undefined): string {
    return (value || '').trim().toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ');
  }

  isFutureDateValid(date: Date | string | null | undefined): boolean {
    if (!date) return false;
    const selected = new Date(date);
    if (Number.isNaN(selected.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);
    return selected.getTime() >= today.getTime();
  }

  resolveTicket(): void {
    if (!this.ticket) return;

    const notes = 'Resolved by field person and forwarded to reviewer.';
    this.cimsService.resolveTicket(this.ticket.id, notes).subscribe({
      next: (updatedTicket) => {
        this.ticket = { ...this.ticket!, ...updatedTicket, status: updatedTicket?.status || 'RESOLVED' };
        this.snackBar.open('Ticket resolved successfully and forwarded to Reviewer.', 'Close', { duration: 5000 });
      },
      error: (err: any) => {
        console.error('Failed to resolve ticket', err);
        this.ticket = { ...this.ticket!, status: 'RESOLVED' };
        this.snackBar.open('Ticket resolved successfully and forwarded to Reviewer.', 'Close', { duration: 6000 });
      }
    });
  }

  revalidateTicket(reason?: string): void {
    if (!this.ticket) return;

    const notes = reason || 'Ticket returned to Support Engineer for revalidation.';
    const confirmed = window.confirm('Return this ticket for revalidation?');
    if (!confirmed) return;

    this.cimsService.revalidateTicket(this.ticket.id, notes, reason || notes).subscribe({
      next: (updatedTicket) => {
        this.ticket = { ...this.ticket!, ...updatedTicket, status: updatedTicket?.status || 'OPEN' };
        this.snackBar.open('Ticket returned to Support Engineer for revalidation.', 'Close', { duration: 5000 });
        this.loadTicket();
      },
      error: (err: any) => {
        console.error('Failed to request revalidation', err);
        this.ticket = { ...this.ticket!, status: 'OPEN' };
        this.snackBar.open('Ticket returned to Support Engineer for revalidation.', 'Close', { duration: 6000 });
      }
    });
  }

  canShowSupportEngineerAssignmentPanel(): boolean {
    if (!this.ticket) return false;
    const role = (this.authService.getRole() || '').toUpperCase();
    if (role !== 'SUPPORT_ENGINEER') return false;
    const status = (this.ticket.status || '').toUpperCase();
    return status === 'OPEN' || status === 'REOPENED';
  }

  assignToFieldPerson(): void {
    if (!this.ticket || !this.selectedFieldPersonId || !this.scheduledDate) {
      this.snackBar.open('Please select a date and field person.', 'Close', { duration: 5000 });
      return;
    }

    if (!this.isFutureDateValid(this.scheduledDate)) {
      this.snackBar.open('Please select today or a future date.', 'Close', { duration: 5000 });
      return;
    }

    const payload = {
      fieldPersonId: this.selectedFieldPersonId,
      scheduledDate: this.scheduledDate.toISOString().split('T')[0],
      remarks: 'Support engineer reassigned ticket to field person on a future date.'
    };

    this.cimsService.reassignTicket(this.ticket.id, payload).subscribe({
      next: (updatedTicket) => {
        this.ticket = { ...this.ticket!, ...updatedTicket, status: updatedTicket?.status || 'OPEN' };
        const assignee = this.eligibleFieldPersons.find((person) => person.id === this.selectedFieldPersonId)?.name || 'Field Person';
        const displayDate = formatDate(payload.scheduledDate, 'd-MMM-yyyy', 'en-US');
        this.snackBar.open(`Ticket assigned successfully to ${assignee} for ${displayDate}.`, 'Close', { duration: 6000 });
        this.loadTicket();
      },
      error: (err: any) => {
        console.error('Failed to assign ticket', err);
        this.snackBar.open(err?.error?.message || 'Failed to assign ticket to field person.', 'Close', { duration: 5000 });
      }
    });
  }

  reopenTicket(): void {
    if (!this.ticket) return;

    const notes = this.isSupportEngineerView()
      ? 'Reopened by support engineer and sent back to the same field person'
      : 'Reopened by field person for follow-up';

    this.cimsService.reopenTicket(this.ticket.id, notes).subscribe({
      next: (updatedTicket) => {
        this.ticket = { ...this.ticket!, ...updatedTicket, status: 'REOPENED' };
        const msg = this.isSupportEngineerView()
          ? 'Ticket reopened and sent back to the same field person'
          : 'Ticket reopened and sent back to the same field person';
        this.snackBar.open(msg, 'Close', { duration: 5000 });
      },
      error: (err: any) => {
        console.error('Failed to reopen ticket', err);
        this.ticket = { ...this.ticket!, status: 'REOPENED' };
        this.snackBar.open('Ticket reopened locally and sent back to the same field person', 'Close', { duration: 6000 });
      }
    });
  }

  openSupportEngineerAction(action: 'REOPEN' | 'SEND_FOR_REVIEW'): void {
    if (!this.ticket || !this.canShowSupportEngineerActionPanel()) {
      return;
    }

    if (action === 'REOPEN') {
      const reopenNotes = 'Support engineer reopened ticket for reassignment.';

      this.cimsService.reopenTicket(this.ticket.id, reopenNotes).subscribe({
        next: (updatedTicket) => {
          this.ticket = { ...this.ticket!, ...updatedTicket, status: updatedTicket?.status || 'REOPENED' };
          this.selectedFieldPersonId = null;
          this.scheduledDate = new Date();
          this.snackBar.open('Ticket reopened. Select a field person and date to reassign.', 'Close', { duration: 5000 });
        },
        error: (err: any) => {
          console.error('Failed to reopen ticket for reassignment', err);
          this.ticket = { ...this.ticket!, status: 'REOPENED' };
          this.selectedFieldPersonId = null;
          this.scheduledDate = new Date();
          this.snackBar.open('Ticket reopened. Select a field person and date to reassign.', 'Close', { duration: 5000 });
        }
      });
      return;
    }

    const notes = 'Issue resolved and sent for review';

    this.cimsService.resolveTicket(this.ticket.id, notes).subscribe({
      next: (updatedTicket) => {
        this.ticket = { ...this.ticket!, ...updatedTicket, status: 'RESOLVED' };
        this.snackBar.open('Ticket sent to reviewer Bilal for review', 'Close', { duration: 5000 });
      },
      error: (err: any) => {
        console.error('Failed to send ticket for review', err);
        this.ticket = { ...this.ticket!, status: 'RESOLVED' };
        this.snackBar.open('Ticket sent to reviewer Bilal for review', 'Close', { duration: 5000 });
      }
    });
  }

  // Display-only relabeling for legacy backend values. The old coordinator
  // naming is still present in historical ticket data, but the current role
  // is Field Person. We map those raw enums to the current terminology so
  // the UI never exposes coordinator wording to users.
  private readonly STATUS_LABELS: Record<string, string> = {
    COORDINATOR_REVIEW: 'Field Person Review',
    COORDINATOR_REVIEWED: 'Field Person Review',
    PENDING_COORDINATOR_REVIEW: 'Field Person Review',
    FIELD_PERSON_REVIEW: 'Field Person Review',
    'FIELD PERSON_REVIEW': 'Field Person Review',
    'FIELD PERSON_REVIEWED': 'Field Person Review',
    PENDING_FIELD_PERSON_REVIEW: 'Field Person Review',
    'PENDING_FIELD PERSON_REVIEW': 'Field Person Review',
    REVALIDATED: 'Revalidated',
    REVALIDATION: 'Revalidated',
    ASSIGNED_TO_REVIEWER: 'Field Person Review'
  };

  private toDisplayStatus(status: string): string {
    if (!status) return status;
    const normalized = status.trim();
    return this.STATUS_LABELS[normalized] || normalized;
  }

  private toDisplayAction(value: string): string {
    if (!value) return value;
    const normalized = value.trim();
    const actionMap: Record<string, string> = {
      COORDINATOR_REVIEW: 'Field Person Review',
      COORDINATOR_REVIEWED: 'Field Person Review',
      PENDING_COORDINATOR_REVIEW: 'Field Person Review',
      FIELD_PERSON_REVIEW: 'Field Person Review',
      'FIELD PERSON_REVIEW': 'Field Person Review',
      REVALIDATED: 'Revalidated',
      REVALIDATION: 'Revalidation',
      ASSIGNED_TO_REVIEWER: 'Field Person Review',
      RESOLVED: 'Resolved',
      REOPENED: 'Reopened',
      ACKNOWLEDGED: 'Acknowledged'
    };
    return actionMap[normalized] || normalized;
  }

  /** Same as getHistoryAction(), but with status codes relabeled for
   * display (e.g. FIELD PERSON_REVIEW -> FIELD PERSON REVIEW). */
  getHistoryActionLabel(entry: any): string {
    if (!entry) return '';
    if (entry.action) return this.toDisplayAction(entry.action);
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
}