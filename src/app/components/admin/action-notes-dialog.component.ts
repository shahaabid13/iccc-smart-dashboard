import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Ticket } from '../../models/cims.models';

export type ReviewAction = 'resolve' | 'hold' | 'reopen' | 'reject';

export interface TicketActionDialogData {
  ticket: Ticket;
  /** true if this ticket has already had an action taken on it in this session */
  disabled: boolean;
}

export interface TicketActionResult {
  action: ReviewAction;
  notes: string;
}

interface ActionOption {
  key: ReviewAction;
  label: string;
  icon: string;
  color: 'primary' | 'accent' | 'warn';
}

@Component({
  selector: 'app-ticket-action-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>Take Action — Ticket #{{ data.ticket.id }}</h2>

    <mat-dialog-content>
      <p class="ticket-summary">
        <strong>{{ data.ticket.incidentTypeName }}</strong> — {{ data.ticket.locationName }}
      </p>

      <p class="locked-message" *ngIf="data.disabled">
        <mat-icon>lock</mat-icon>
        An action has already been taken on this ticket. It can't be actioned again from here.
      </p>

      <ng-container *ngIf="!data.disabled">
        <h3 class="section-label">Choose an action</h3>
        <div class="action-options">
          <button
            *ngFor="let option of actionOptions"
            mat-raised-button
            type="button"
            [color]="option.color"
            class="action-option"
            [class.selected]="selectedAction === option.key"
            [class.dimmed]="selectedAction && selectedAction !== option.key"
            (click)="selectAction(option.key)">
            <mat-icon>{{ option.icon }}</mat-icon>
            {{ option.label }}
          </button>
        </div>

        <form [formGroup]="form">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Notes</mat-label>
            <textarea
              matInput
              formControlName="notes"
              rows="4"
              placeholder="Add notes for this action (optional)...">
            </textarea>
          </mat-form-field>
        </form>
      </ng-container>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-stroked-button (click)="onCancel()">{{ data.disabled ? 'Close' : 'Cancel' }}</button>
      <button
        *ngIf="!data.disabled"
        mat-raised-button
        color="primary"
        [disabled]="!selectedAction"
        (click)="onConfirm()">
        Submit
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .ticket-summary {
      color: rgba(0, 0, 0, 0.6);
      margin-bottom: 16px;
    }

    .locked-message {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #fff3e0;
      color: #e65100;
      padding: 12px 14px;
      border-radius: 6px;
      font-size: 14px;
    }

    .section-label {
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      color: rgba(0, 0, 0, 0.54);
      margin: 0 0 12px;
    }

    .action-options {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 22px;
    }

    .action-option {
      transition: transform 0.15s ease, opacity 0.15s ease, filter 0.15s ease, box-shadow 0.15s ease;
    }

    .action-option.selected {
      transform: scale(1.06);
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
    }

    .action-option.dimmed {
      opacity: 0.35;
      filter: blur(0.4px);
    }

    .full-width {
      width: 100%;
    }

    mat-dialog-content {
      min-width: 420px;
    }
  `]
})
export class TicketActionDialogComponent {
  form: FormGroup;
  selectedAction: ReviewAction | null = null;

  actionOptions: ActionOption[] = [
    { key: 'resolve', label: 'Resolve', icon: 'check_circle', color: 'accent' },
    { key: 'hold', label: 'Hold', icon: 'pause_circle', color: 'primary' },
    { key: 'reopen', label: 'Reopen', icon: 'refresh', color: 'warn' },
    { key: 'reject', label: 'Reject', icon: 'cancel', color: 'warn' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TicketActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TicketActionDialogData
  ) {
    this.form = this.fb.group({
      notes: ['']
    });
  }

  selectAction(action: ReviewAction): void {
    this.selectedAction = action;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (!this.selectedAction) {
      return;
    }
    const result: TicketActionResult = {
      action: this.selectedAction,
      notes: this.form.value.notes ?? ''
    };
    this.dialogRef.close(result);
  }
}