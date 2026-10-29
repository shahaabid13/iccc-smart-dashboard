import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { finalize } from 'rxjs';
import { ItmsBatch, ItmsService, ItmsUploadResult } from './itms.service';

@Component({
  selector: 'app-itms-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule
  ],
  templateUrl: './itms-upload.component.html',
  styleUrl: './itms-upload.component.scss'
})
export class ItmsUploadComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly displayedColumns = [
    'fileName',
    'period',
    'rows',
    'duplicates',
    'failed',
    'snapStatus',
    'uploadedBy',
    'uploadedAt',
    'actions'
  ];
  selectedFile: File | null = null;
  uploading = false;
  uploadProgress = 0;
  isDragging = false;
  result: ItmsUploadResult | null = null;
  errorMessage = '';
  batches: ItmsBatch[] = [];
  historyLoading = false;
  deletingId: number | string | null = null;

  constructor(private readonly itms: ItmsService, private readonly snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadBatches();
  }

  openFilePicker(input: HTMLInputElement): void {
    input.click();
  }

  onFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectFile(input.files?.[0] ?? null);
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    this.selectFile(event.dataTransfer?.files[0] ?? null);
  }

  uploadFile(): void {
    if (!this.selectedFile || this.uploading) return;
    this.uploading = true;
    this.uploadProgress = 0;
    this.result = null;
    this.errorMessage = '';

    this.itms.upload(this.selectedFile)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.uploading = false)
      )
      .subscribe({
        next: event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = event.total
              ? Math.round((event.loaded / event.total) * 100)
              : 0;
          } else if (event.type === HttpEventType.Response && event.body) {
            this.result = event.body;
            this.selectedFile = null;
            this.loadBatches();
          }
        },
        error: error => {
          this.errorMessage = this.getErrorMessage(error, 'The Excel file could not be uploaded.');
          this.snackBar.open(this.errorMessage, 'Close', { duration: 6000 });
        }
      });
  }

  deleteBatch(batch: ItmsBatch): void {
    if (!window.confirm(`Delete upload "${batch.fileName}" and its imported events? This cannot be undone.`)) {
      return;
    }

    this.deletingId = batch.id;
    this.itms.deleteBatch(batch.id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.deletingId = null)
      )
      .subscribe({
        next: () => {
          this.snackBar.open('Upload batch deleted.', 'Close', { duration: 3500 });
          this.loadBatches();
        },
        error: error => {
          this.snackBar.open(this.getErrorMessage(error, 'Could not delete the upload batch.'), 'Close', { duration: 5000 });
        }
      });
  }

  fileSize(size: number): string {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }

  batchPeriod(batch: ItmsBatch): string {
    const from = batch.periodFrom ?? batch.periodStart ?? batch.startDate ?? batch.from;
    const to = batch.periodTo ?? batch.periodEnd ?? batch.endDate ?? batch.to;
    return from && to ? `${from.slice(0, 10)} – ${to.slice(0, 10)}` : '—';
  }

  snapshotStatusClass(status: string): string {
    return `snapshot-${status.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  }

  private selectFile(file: File | null): void {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.xlsx')) {
      this.selectedFile = null;
      this.errorMessage = 'Only .xlsx Excel workbooks are accepted.';
      return;
    }
    this.errorMessage = '';
    this.result = null;
    this.selectedFile = file;
  }

  private loadBatches(): void {
    this.historyLoading = true;
    this.itms.getBatches()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.historyLoading = false)
      )
      .subscribe({
        next: batches => this.batches = batches,
        error: error => {
          this.errorMessage = this.getErrorMessage(error, 'Could not load upload history.');
        }
      });
  }

  private getErrorMessage(error: HttpErrorResponse, fallback: string): string {
    if (error.status === 413) return 'File too large';
    if (error.status === 409) return 'This workbook was already uploaded';
    if (error.status === 507) return 'Server is out of disk space';
    if (error.status >= 400 && typeof error.error?.message === 'string' && error.error.message) {
      return error.error.message;
    }
    if (error.status === 401 || error.status === 403) return 'You are not authorized to manage ITMS uploads.';
    if (error.status === 0) return 'Could not reach the ITMS API. Check the network or proxy configuration.';
    return fallback;
  }
}
