import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExcelService } from '../../../services/excel.service';

@Component({
  standalone: true,
  selector: 'app-excel-upload',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <mat-card class="excel-card mat-elevation-z4">
      <h2><mat-icon>upload_file</mat-icon> Upload Excel File (.xlsx)</h2>

      <div class="upload-section">
        <input type="file" accept=".xlsx" (change)="onFile($event)" />
        <div class="btn-group">
          <button
            mat-raised-button
            color="primary"
            (click)="upload()"
            [disabled]="!file"
          >
            <mat-icon>cloud_upload</mat-icon> Upload
          </button>

          <button
            mat-raised-button
            color="warn"
            class="reset-btn"
            (click)="reset()"
            *ngIf="file"
          >
            <mat-icon>refresh</mat-icon> Reset
          </button>
        </div>
      </div>

      <p class="status" [ngClass]="{ success: success, error: !success }">
        {{ message }}
      </p>
    </mat-card>
  `,
  styles: [`
    .excel-card {
      margin: 30px;
      padding: 24px;
      border-radius: 12px;
      max-width: 480px;
    }

    h2 {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #3f51b5;
      margin-bottom: 16px;
      font-weight: 600;
    }

    .upload-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    input[type="file"] {
      padding: 8px;
      border: 1px dashed #90caf9;
      border-radius: 8px;
      background: #e3f2fd;
    }

    .btn-group {
      display: flex;
      gap: 10px;
    }

    .status {
      margin-top: 16px;
      font-weight: 500;
      font-size: 15px;
    }

    .success {
      color: #43a047;
    }

    .error {
      color: #e53935;
    }

    .reset-btn {
      background: linear-gradient(135deg, #ef5350, #e53935);
      color: white;
      transition: all 0.3s ease;
      border-radius: 6px;
    }

    .reset-btn:hover {
      transform: translateY(-2px);
      background: linear-gradient(135deg, #e53935, #d32f2f);
    }
  `],
})
export class ExcelUploadComponent {
  file: File | null = null;
  message = '';
  success = false;

  constructor(private excel: ExcelService) {}

  onFile(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const f = input.files?.[0] ?? null;

    if (f && !f.name.toLowerCase().endsWith('.xlsx')) {
      this.message = '❌ Please select a valid .xlsx file';
      this.file = null;
      this.success = false;
      return;
    }

    this.file = f;
    this.message = this.file ? `✅ Selected: ${this.file.name}` : '';
    this.success = true;
  }

  upload() {
    if (!this.file) return;

    const fd = new FormData();
    fd.append('file', this.file);

    this.excel.upload(fd).subscribe({
      next: () => {
        this.message = '✅ Upload successful!';
        this.success = true;
      },
      error: (e) => {
        this.message = `❌ Upload failed: ${e?.message || 'Server error'}`;
        this.success = false;
      },
    });
  }

  reset() {
    this.file = null;
    this.message = '';
    this.success = false;
  }
}
