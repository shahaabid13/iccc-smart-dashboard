import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IncidentType } from '../../models/cims.models';

export interface IncidentTypeDialogData {
  mode: 'create' | 'edit';
  incidentType?: IncidentType;
}

export interface IncidentTypeDialogResult {
  name: string;
}

@Component({
  selector: 'app-incident-type-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>{{ isEditMode ? 'edit' : 'add_circle' }}</mat-icon>
      {{ isEditMode ? 'Edit Incident Type' : 'Add Incident Type' }}
    </h2>

    <mat-dialog-content>
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Incident Type Name</mat-label>
        <input
          matInput
          [(ngModel)]="name"
          placeholder="Enter incident type"
          (keyup.enter)="onSave()"
          autofocus>
        <mat-error *ngIf="submitted && !name.trim()">
          Incident type name is required
        </mat-error>
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSave()">
        {{ isEditMode ? 'Update' : 'Add' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      width: 100%;
      min-width: 320px;
    }

    h2[mat-dialog-title] {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class IncidentTypeDialogComponent {
  name: string;
  isEditMode: boolean;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<IncidentTypeDialogComponent, IncidentTypeDialogResult | undefined>,
    @Inject(MAT_DIALOG_DATA) public data: IncidentTypeDialogData
  ) {
    this.isEditMode = data.mode === 'edit';
    this.name = data.incidentType?.name ?? '';
  }

  onSave(): void {
    this.submitted = true;
    const trimmed = this.name.trim();
    if (!trimmed) {
      return;
    }
    this.dialogRef.close({ name: trimmed });
  }

  onCancel(): void {
    this.dialogRef.close(undefined);
  }
}