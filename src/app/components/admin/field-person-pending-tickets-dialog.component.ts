import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PendingFieldPersonTicket } from '../../models/cims.models';

@Component({
  selector: 'app-field-person-pending-tickets-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>You have {{ data.tickets.length }} tickets waiting</h2>
    <mat-dialog-content aria-live="polite">
      <ul class="pending-list">
        <li *ngFor="let ticket of data.tickets">
          <div class="ticket-info">
            <strong>#{{ ticket.id || ticket.ticketId }} · {{ ticket.title || ticket.incidentTypeName || 'Incident ticket' }}</strong>
            <span>{{ ticket.locationName || 'Location not provided' }}</span>
            <span class="pending-age" [class.overdue]="pendingHours(ticket) >= 24">
              Pending {{ formatPending(ticket) }}
            </span>
          </div>
          <button mat-stroked-button color="primary" type="button" (click)="open(ticket)">Open ticket</button>
        </li>
      </ul>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button type="button" (click)="remindLater()">Remind me later</button>
    </mat-dialog-actions>
  `,
  styles: [`
    :host { display: block; }
    .pending-list { list-style: none; margin: 0; padding: 0; }
    .pending-list li { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 13px 0; border-bottom: 1px solid #dce4e7; }
    .pending-list li:last-child { border-bottom: 0; }
    .ticket-info { min-width: 0; display: grid; gap: 4px; }
    .ticket-info strong { overflow-wrap: anywhere; }
    .ticket-info span { color: #62737c; font-size: .84rem; }
    .ticket-info .pending-age { color: #7c5a1e; }
    .ticket-info .pending-age.overdue { color: #b42323; font-weight: 750; }
    @media (max-width: 520px) {
      .pending-list li { align-items: flex-start; flex-direction: column; gap: 9px; }
      .pending-list button { align-self: flex-end; }
    }
  `]
})
export class FieldPersonPendingTicketsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { tickets: PendingFieldPersonTicket[] },
    private dialogRef: MatDialogRef<FieldPersonPendingTicketsDialogComponent>
  ) {}

  pendingHours(ticket: PendingFieldPersonTicket): number {
    const supplied = ticket.pendingHours ?? ticket.hoursPending;
    if (typeof supplied === 'number') return supplied;
    const startedAt = ticket.pendingSince || ticket.createdAt;
    return startedAt ? Math.max(0, (Date.now() - new Date(startedAt).getTime()) / 3600000) : 0;
  }

  formatPending(ticket: PendingFieldPersonTicket): string {
    const hours = Math.floor(this.pendingHours(ticket));
    return hours < 24 ? `${hours}h` : `${Math.floor(hours / 24)}d ${hours % 24}h`;
  }

  open(ticket: PendingFieldPersonTicket): void {
    this.dialogRef.close({ ticketId: ticket.id || ticket.ticketId });
  }

  remindLater(): void {
    this.dialogRef.close({ snooze: true });
  }
}