import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentEntityType, AttachmentResponse, AttachmentService } from '../../services/attachment.service';
import { catchError, from, map, mergeMap, Observable, of, toArray } from 'rxjs';

interface PendingImage {
  blob: Blob;
  previewUrl: string;
  name: string;
}

export interface AttachmentUploadSummary {
  uploaded: number;
  failed: number;
}

@Component({
  selector: 'app-image-attachment-picker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="attachment-picker" [class.read-only]="!allowSelection">
      <div class="picker-heading" *ngIf="allowSelection || attachments.length">
        <span>{{ allowSelection ? 'Screenshots' : 'Attachments' }}</span>
        <span class="attachment-count">{{ count }} / {{ maxCount }}</span>
      </div>

      <div class="attachment-grid" *ngIf="pendingImages.length || attachments.length">
        <figure class="attachment-thumb" *ngFor="let image of pendingImages; let index = index">
          <button type="button" class="thumb-open" (click)="openPreview(image.previewUrl)" [attr.aria-label]="'View ' + image.name">
            <img [src]="image.previewUrl" [alt]="image.name">
          </button>
          <button *ngIf="allowSelection" type="button" class="thumb-remove" (click)="removePending(index)" aria-label="Remove image">x</button>
          <figcaption>{{ image.name }}</figcaption>
        </figure>

        <figure class="attachment-thumb uploaded-thumb" *ngFor="let attachment of attachments">
          <button type="button" class="thumb-open" (click)="openPreview(fileUrl(attachment))" [attr.aria-label]="'View ' + label(attachment)">
            <img *ngIf="loadedFileUrls.get(attachment.id) as imageUrl" [src]="imageUrl" [alt]="label(attachment)">
          </button>
          <button *ngIf="allowSelection" type="button" class="thumb-remove" (click)="removeUploaded(attachment)" aria-label="Delete attachment">x</button>
          <figcaption>{{ label(attachment) }}</figcaption>
        </figure>
      </div>

      <div class="picker-actions" *ngIf="allowSelection && count < maxCount">
        <label class="add-image-control">
          <span aria-hidden="true">+</span>
          <span>Add screenshot</span>
          <input type="file" accept="image/*" multiple (change)="onFilesSelected($event)">
        </label>
        <span class="picker-hint">Up to {{ maxCount }} images</span>
      </div>
      <p class="picker-error" *ngIf="errorMessage" role="alert">{{ errorMessage }}</p>

      <div class="lightbox" *ngIf="lightboxUrl" role="dialog" aria-modal="true" (click)="closePreview()" (keydown.escape)="closePreview()" tabindex="0">
        <button type="button" class="lightbox-close" aria-label="Close image" (click)="closePreview()">x</button>
        <img [src]="lightboxUrl" alt="Full-size attachment" (click)="$event.stopPropagation()">
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .attachment-picker { margin: 8px 0 14px; color: #334155; }
    .picker-heading { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 12px; font-weight: 700; }
    .attachment-count { color: #64748b; font-size: 11px; font-weight: 600; }
    .attachment-grid { display: flex; flex-wrap: wrap; gap: 9px; }
    .attachment-thumb { position: relative; width: 84px; margin: 0; }
    .thumb-open { display: block; width: 84px; height: 72px; overflow: hidden; padding: 0; border: 1px solid #cbd5e1; border-radius: 7px; background: #f1f5f9; cursor: zoom-in; }
    .thumb-open img { display: block; width: 100%; height: 100%; object-fit: cover; }
    figcaption { overflow: hidden; margin-top: 3px; color: #64748b; font-size: 10px; text-overflow: ellipsis; white-space: nowrap; }
    .thumb-remove { position: absolute; top: -6px; right: -6px; display: grid; place-items: center; width: 21px; height: 21px; padding: 0; border: 1px solid #fff; border-radius: 50%; background: #b42318; color: #fff; font-size: 15px; line-height: 1; cursor: pointer; box-shadow: 0 1px 4px #0003; }
    .picker-actions { display: flex; align-items: center; gap: 9px; margin-top: 8px; }
    .add-image-control { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; border: 1px dashed #94a3b8; border-radius: 6px; color: #1d4ed8; font-size: 12px; font-weight: 600; cursor: pointer; }
    .add-image-control > span:first-child { font-size: 16px; }
    .add-image-control input { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; clip-path: inset(50%); }
    .picker-hint { color: #64748b; font-size: 10px; }
    .picker-error { margin: 6px 0 0; color: #b42318; font-size: 11px; }
    .lightbox { position: fixed; inset: 0; z-index: 2000; display: grid; place-items: center; padding: 24px; background: rgba(15, 23, 42, .82); cursor: zoom-out; }
    .lightbox img { max-width: min(94vw, 1600px); max-height: 90vh; object-fit: contain; border-radius: 8px; box-shadow: 0 16px 48px #0008; }
    .lightbox-close { position: absolute; top: 14px; right: 18px; width: 38px; height: 38px; border: 1px solid #ffffff70; border-radius: 50%; background: #0f172acc; color: #fff; font-size: 25px; cursor: pointer; }
    @media (max-width: 520px) { .attachment-thumb, .thumb-open { width: 72px; } .thumb-open { height: 64px; } }
  `]
})
export class ImageAttachmentPickerComponent implements OnChanges, OnDestroy {
  @Input() maxCount = 5;
  @Input() allowSelection = true;
  @Input() attachments: AttachmentResponse[] = [];
  @Output() attachmentsChanged = new EventEmitter<number>();

  pendingImages: PendingImage[] = [];
  processingCount = 0;
  loadedFileUrls = new Map<number, string>();
  errorMessage = '';
  lightboxUrl: string | null = null;
  private selectionGeneration = 0;

  constructor(private attachmentService: AttachmentService) {}

  get count(): number { return this.pendingImages.length + this.attachments.length + this.processingCount; }

  getPendingFiles(): Blob[] {
    return this.pendingImages.map((image) => image.blob);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['attachments']) return;
    for (const attachment of this.attachments) {
      if (this.loadedFileUrls.has(attachment.id)) continue;
      this.attachmentService.getAttachmentFile(attachment.id).subscribe({
        next: (blob) => this.loadedFileUrls.set(attachment.id, URL.createObjectURL(blob)),
        error: () => this.errorMessage = `Could not load ${this.label(attachment)}.`
      });
    }
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    this.errorMessage = '';

    const invalid = files.filter((file) => !file.type.startsWith('image/'));
    if (invalid.length) {
      this.errorMessage = 'Non-image files were rejected. Select image files only.';
    }
    const images = files.filter((file) => file.type.startsWith('image/'));
    if (this.count + images.length > this.maxCount) {
      this.errorMessage = `Select no more than ${this.maxCount} images.`;
      return;
    }
    if (images.length) void this.compressAndAdd(images);
  }

  private async compressAndAdd(files: File[]): Promise<void> {
    const generation = this.selectionGeneration;
    this.processingCount += files.length;
    for (const file of files) {
      try {
        const blob = await this.compressImage(file);
        if (generation === this.selectionGeneration) {
          this.pendingImages.push({ blob, previewUrl: URL.createObjectURL(blob), name: file.name });
        }
      } catch {
        this.errorMessage = `Could not process ${file.name}. Choose another image.`;
      } finally {
        this.processingCount--;
        this.attachmentsChanged.emit(this.count);
      }
    }
  }

  private compressImage(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      const sourceUrl = URL.createObjectURL(file);
      image.onload = () => {
        URL.revokeObjectURL(sourceUrl);
        const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext('2d');
        if (!context) { reject(new Error('Canvas is unavailable')); return; }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Image compression failed')), 'image/jpeg', 0.8);
      };
      image.onerror = () => { URL.revokeObjectURL(sourceUrl); reject(new Error('Image could not be decoded')); };
      image.src = sourceUrl;
    });
  }

  uploadSelected(entityType: AttachmentEntityType, entityId: number): Observable<AttachmentUploadSummary> {
    const images = [...this.pendingImages];
    if (!images.length) return of({ uploaded: 0, failed: 0 });
    return from(images).pipe(
      mergeMap((image) => this.attachmentService.uploadAttachment(image.blob, entityType, entityId).pipe(
        map(() => ({ image, failed: false })),
        catchError(() => of({ image, failed: true }))
      ), 2),
      toArray(),
      map((results) => {
        const failedImages = new Set(results.filter((result) => result.failed).map((result) => result.image));
        this.pendingImages = this.pendingImages.filter((image) => failedImages.has(image));
        for (const image of images) if (!failedImages.has(image)) URL.revokeObjectURL(image.previewUrl);
        return { uploaded: results.length - failedImages.size, failed: failedImages.size };
      })
    );
  }

  removePending(index: number): void {
    const [removed] = this.pendingImages.splice(index, 1);
    if (removed) URL.revokeObjectURL(removed.previewUrl);
    this.attachmentsChanged.emit(this.count);
  }

  resetPending(): void {
    this.selectionGeneration++;
    for (const image of this.pendingImages) URL.revokeObjectURL(image.previewUrl);
    this.pendingImages = [];
    this.processingCount = 0;
    this.errorMessage = '';
    this.lightboxUrl = null;
    this.attachmentsChanged.emit(this.count);
  }

  removeUploaded(attachment: AttachmentResponse): void {
    this.attachmentService.deleteAttachment(attachment.id).subscribe({
      next: () => {
        this.attachments = this.attachments.filter((item) => item.id !== attachment.id);
        const loadedUrl = this.loadedFileUrls.get(attachment.id);
        if (loadedUrl) URL.revokeObjectURL(loadedUrl);
        this.loadedFileUrls.delete(attachment.id);
        this.attachmentsChanged.emit(this.count);
      },
      error: () => this.errorMessage = 'Could not delete this attachment.'
    });
  }

  fileUrl(attachment: AttachmentResponse): string {
    return this.loadedFileUrls.get(attachment.id) || '';
  }

  label(attachment: AttachmentResponse): string {
    return attachment.fileName || attachment.originalFileName || `Image ${attachment.id}`;
  }

  openPreview(url: string): void { this.lightboxUrl = url; }
  closePreview(): void { this.lightboxUrl = null; }

  ngOnDestroy(): void {
    for (const image of this.pendingImages) URL.revokeObjectURL(image.previewUrl);
    for (const url of this.loadedFileUrls.values()) URL.revokeObjectURL(url);
  }
}
