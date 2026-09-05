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
        <!-- Acknowledgment section -->
        <h3 class="section-label">Acknowledgment Summary</h3>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Notes</mat-label>
          <textarea
            matInput
            formControlName="notes"
            rows="4"
            placeholder="Add any notes about this acknowledgment (optional)...">
          </textarea>
        </mat-form-field>

        <mat-divider class="section-divider"></mat-divider>

        <!-- Assignment section -->
        <h3 class="section-label">Assign Reviewer</h3>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Reviewer *</mat-label>
          <mat-select formControlName="reviewerId">
            <mat-option *ngFor="let reviewer of data.reviewers" [value]="reviewer.id">
              {{ reviewer.username }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="form.get('reviewerId')?.hasError('required')">
            Please select a reviewer
          </mat-error>
        </mat-form-field>

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

    .no-reviewers {
      color: #c62828;
      font-size: 13px;
      margin-top: -8px;
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
      notes: [''],
      reviewerId: [null, Validators.required]
    });
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
      reviewerId: this.form.value.reviewerId
    };
    this.dialogRef.close(result);
  }
}