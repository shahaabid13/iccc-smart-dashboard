import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { Reviewer, Ticket } from '../../models/cims.models';

export interface AcknowledgeAssignDialogData {
  ticket: Ticket;
  reviewers: Reviewer[];
}

export interface AcknowledgeAssignResult {
  notes: string;
  action: 'resolved' | 'revalidation';
  reviewerId: number;
}

@Component({
  selector: 'app-acknowledge-assign-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule
  ],
  template: `
    <h2 mat-dialog-title>Acknowledge &amp; Assign — Ticket #{{ data.ticket.id }}</h2>

    <mat-dialog-content>
      <p class="ticket-summary">
        <strong>{{ data.ticket.incidentTypeName }}</strong> — {{ data.ticket.locationName }}
      </p>

      <form [formGroup]="form">
        <h3 class="section-label">Acknowledgment Summary</h3>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Action</mat-label>
          <mat-select formControlName="action" (selectionChange)="onActionChange()">
            <mat-option value="resolved">Resolved</mat-option>
            <mat-option value="revalidation">Revalidation</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Remarks</mat-label>
          <textarea
            matInput
            formControlName="notes"
            rows="4"
            placeholder="Add a brief note for the hand-off...">
          </textarea>
          <mat-error *ngIf="form.get('notes')?.hasError('minlength')">
            Remarks must be at least 5 characters long.
          </mat-error>
        </mat-form-field>

        <mat-divider class="section-divider"></mat-divider>

        <div class="auto-assignment-note">
          <strong>Auto-assignment:</strong>
          <span *ngIf="form.get('action')?.value === 'revalidation'">
            Sent back to support engineer: {{ data.ticket.raisedByUsername || 'Support engineer' }}
          </span>
          <span *ngIf="form.get('action')?.value !== 'revalidation'">
            Assigned to reviewer: {{ getReviewerName() }}
          </span>
        </div>

        <p *ngIf="data.reviewers.length === 0" class="no-reviewers">
          No reviewers available right now.
        </p>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-stroked-button (click)="onCancel()">Cancel</button>
      <button
        mat-raised-button
        color="primary"
        [disabled]="form.invalid"
        (click)="onConfirm()">
        Acknowledge &amp; Assign
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .ticket-summary {
      color: rgba(0, 0, 0, 0.6);
      margin-bottom: 16px;
    }

    .section-label {
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      color: rgba(0, 0, 0, 0.54);
      margin: 0 0 8px;
    }

    .section-divider {
      margin: 8px 0 20px;
    }

    .full-width {
      width: 100%;
    }

    .auto-assignment-note {
      display: block;
      padding: 10px 12px;
      border-radius: 6px;
      background: rgba(25, 118, 210, 0.05);
      color: rgba(0, 0, 0, 0.7);
      font-size: 14px;
      margin-top: 8px;
    }

    .no-reviewers {
      color: #c62828;
      font-size: 13px;
      margin-top: 8px;
    }

    mat-dialog-content {
      min-width: 420px;
    }
  `]
})
export class AcknowledgeAssignDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AcknowledgeAssignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AcknowledgeAssignDialogData
  ) {
    this.form = this.fb.group({
      action: ['resolved'],
      notes: ['', [Validators.required, Validators.minLength(5)]],
      reviewerId: [null, Validators.required]
    });

    const bilalReviewer = this.data.reviewers.find(r =>
      (r.username || '').toLowerCase().includes('bilal') || (r.name || '').toLowerCase().includes('bilal')
    ) || this.data.reviewers[0];

    const defaultTargetId = bilalReviewer?.id ?? this.data.ticket.raisedByUserId ?? null;
    this.form.patchValue({ reviewerId: defaultTargetId });
  }

  getReviewerName(): string {
    const action = this.form.get('action')?.value as 'resolved' | 'revalidation' | undefined;
    const bilalReviewer = this.data.reviewers.find(r =>
      (r.username || '').toLowerCase().includes('bilal') || (r.name || '').toLowerCase().includes('bilal')
    ) || this.data.reviewers[0];

    if (action === 'revalidation') {
      return this.data.ticket.raisedByUsername || 'support engineer';
    }

    return bilalReviewer?.username || bilalReviewer?.name || 'Bilal';
  }

  onActionChange(): void {
    const action = this.form.get('action')?.value as 'resolved' | 'revalidation' | undefined;

    if (action === 'revalidation') {
      const fallback = this.data.ticket.raisedByUserId ?? this.data.reviewers[0]?.id ?? null;
      this.form.patchValue({ reviewerId: fallback });
      return;
    }

    const bilalReviewer = this.data.reviewers.find(r =>
      (r.username || '').toLowerCase().includes('bilal') || (r.name || '').toLowerCase().includes('bilal')
    ) || this.data.reviewers[0];

    this.form.patchValue({ reviewerId: bilalReviewer?.id ?? this.data.ticket.raisedByUserId ?? null });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.form.invalid) {
      return;
    }
    const result: AcknowledgeAssignResult = {
      notes: this.form.value.notes ?? '',
      action: this.form.value.action ?? 'resolved',
      reviewerId: this.form.value.reviewerId
    };
    this.dialogRef.close(result);
  }
}