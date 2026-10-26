import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentResponse, AttachmentService } from '../services/attachment.service';

interface PendingImage {
  blob: Blob;
  previewUrl: string;
  name: string;
}

@Component({
  selector: 'app-image-attachment-picker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="attachment-picker">
      <header class="picker-heading" *ngIf="allowSelection || attachments.length">
        <strong>{{ allowSelection ? 'Screenshots' : 'Attachments' }}</strong>
        <span>{{ count }} / {{ maxCount }}</span>
      </header>

      <div class="image-grid" *ngIf="pendingImages.length || attachments.length">
        <figure *ngFor="let image of pendingImages; let index = index" class="image-tile">
          <button type="button" class="image-open" (click)="open(image.previewUrl)" [attr.aria-label]="'View ' + image.name">
            <img [src]="image.previewUrl" [alt]="image.name">
          </button>
          <button *ngIf="allowSelection" type="button" class="image-remove" (click)="removePending(index)" aria-label="Remove screenshot">×</button>
          <figcaption>{{ image.name }}</figcaption>
        </figure>
        <figure *ngFor="let attachment of attachments" class="image-tile">
          <button type="button" class="image-open" (click)="open(fileUrls.get(attachment.id) || '')" [attr.aria-label]="'View ' + label(attachment)">
            <img *ngIf="fileUrls.get(attachment.id) as url" [src]="url" [alt]="label(attachment)">
            <span *ngIf="!fileUrls.has(attachment.id)" class="image-loading">Loading</span>
          </button>
          <button *ngIf="allowSelection" type="button" class="image-remove" (click)="removeExisting(attachment)" aria-label="Delete screenshot">×</button>
          <figcaption>{{ label(attachment) }}</figcaption>
        </figure>
      </div>

      <label class="image-add" *ngIf="allowSelection && count < maxCount">
        <span aria-hidden="true">+</span> Add screenshot
        <input type="file" accept="image/*" multiple (change)="selectFiles($event)">
      </label>
      <p class="image-error" *ngIf="errorMessage" role="alert">{{ errorMessage }}</p>

      <div class="image-lightbox" *ngIf="lightboxUrl" role="dialog" aria-modal="true" (click)="close()" (keydown.escape)="close()" tabindex="0">
        <button type="button" class="lightbox-close" aria-label="Close image" (click)="close()">×</button>
        <img [src]="lightboxUrl" alt="Full-size screenshot" (click)="$event.stopPropagation()">
      </div>
    </section>
  `,
  styles: [`
    :host { display:block; }
    .attachment-picker { margin:10px 0; color:var(--ion-text-color); }
    .picker-heading { display:flex; justify-content:space-between; align-items:center; margin:0 0 8px; font-size:12px; }
    .picker-heading span { color:var(--ion-color-medium); font-size:11px; }
    .image-grid { display:flex; flex-wrap:wrap; gap:10px; }
    .image-tile { position:relative; width:84px; margin:0; }
    .image-open { display:grid; place-items:center; width:84px; height:72px; overflow:hidden; padding:0; border:1px solid var(--ion-color-step-200); border-radius:7px; background:var(--ion-color-light); cursor:zoom-in; }
    .image-open img { width:100%; height:100%; object-fit:cover; }
    .image-loading { color:var(--ion-color-medium); font-size:10px; }
    figcaption { overflow:hidden; margin-top:4px; color:var(--ion-color-medium); font-size:10px; text-overflow:ellipsis; white-space:nowrap; }
    .image-remove { position:absolute; top:-6px; right:-6px; display:grid; place-items:center; width:22px; height:22px; padding:0; border:1px solid white; border-radius:50%; background:var(--ion-color-danger); color:white; font-size:17px; line-height:1; box-shadow:0 1px 4px #0003; }
    .image-add { display:inline-flex; align-items:center; gap:6px; min-height:36px; margin-top:8px; padding:5px 10px; border:1px dashed var(--ion-color-primary); border-radius:6px; color:var(--ion-color-primary); font-size:12px; font-weight:600; cursor:pointer; }
    .image-add input { position:absolute; width:1px; height:1px; overflow:hidden; clip-path:inset(50%); }
    .image-error { margin:6px 0; color:var(--ion-color-danger); font-size:12px; }
    .image-lightbox { position:fixed; inset:0; z-index:3000; display:grid; place-items:center; padding:20px; background:#0f172ae8; cursor:zoom-out; }
    .image-lightbox img { max-width:96vw; max-height:90vh; object-fit:contain; border-radius:8px; }
    .lightbox-close { position:absolute; top:14px; right:14px; width:42px; height:42px; border:1px solid #ffffff80; border-radius:50%; background:#172033; color:white; font-size:25px; }
    @media(max-width:480px) { .image-tile,.image-open { width:72px; } .image-open { height:64px; } }
  `]
})
export class ImageAttachmentPickerComponent implements OnChanges, OnDestroy {
  @Input() maxCount = 5;
  @Input() allowSelection = true;
  @Input() attachments: AttachmentResponse[] = [];
  @Output() attachmentsChanged = new EventEmitter<number>();

  pendingImages: PendingImage[] = [];
  fileUrls = new Map<number, string>();
  processingCount = 0;
  errorMessage = '';
  lightboxUrl: string | null = null;

  constructor(private attachmentService: AttachmentService) {}

  get count(): number { return this.pendingImages.length + this.attachments.length + this.processingCount; }

  getPendingFiles(): Blob[] { return this.pendingImages.map((image) => image.blob); }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['attachments']) return;
    for (const attachment of this.attachments) {
      if (this.fileUrls.has(attachment.id)) continue;
      this.attachmentService.getAttachmentFile(attachment.id).subscribe({
        next: (blob) => this.fileUrls.set(attachment.id, URL.createObjectURL(blob)),
        error: () => this.errorMessage = `Could not load ${this.label(attachment)}.`
      });
    }
  }

  selectFiles(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files || []);
    input.value = '';
    this.errorMessage = '';
    const images = files.filter((file) => file.type.startsWith('image/'));
    if (images.length !== files.length) this.errorMessage = 'Only image files can be attached.';
    if (this.count + images.length > this.maxCount) {
      this.errorMessage = `Choose no more than ${this.maxCount} images.`;
      return;
    }
    for (const image of images) void this.compressAndAdd(image);
  }

  private async compressAndAdd(file: File): Promise<void> {
    this.processingCount++;
    try {
      const blob = await this.compress(file);
      this.pendingImages.push({ blob, previewUrl: URL.createObjectURL(blob), name: file.name });
    } catch {
      this.errorMessage = `Could not process ${file.name}. Choose another image.`;
    } finally {
      this.processingCount--;
      this.attachmentsChanged.emit(this.count);
    }
  }

  private compress(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const source = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        URL.revokeObjectURL(source);
        const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext('2d');
        if (!context) { reject(new Error('Canvas unavailable')); return; }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Compression failed')), 'image/jpeg', 0.8);
      };
      image.onerror = () => { URL.revokeObjectURL(source); reject(new Error('Invalid image')); };
      image.src = source;
    });
  }

  removePending(index: number): void {
    const [removed] = this.pendingImages.splice(index, 1);
    if (removed) URL.revokeObjectURL(removed.previewUrl);
    this.attachmentsChanged.emit(this.count);
  }

  removeExisting(attachment: AttachmentResponse): void {
    this.attachmentService.deleteAttachment(attachment.id).subscribe({
      next: () => {
        this.attachments = this.attachments.filter((item) => item.id !== attachment.id);
        const url = this.fileUrls.get(attachment.id);
        if (url) URL.revokeObjectURL(url);
        this.fileUrls.delete(attachment.id);
        this.attachmentsChanged.emit(this.count);
      },
      error: () => this.errorMessage = 'Could not delete this screenshot.'
    });
  }

  label(attachment: AttachmentResponse): string {
    return attachment.originalFileName || attachment.fileName || `Image ${attachment.id}`;
  }

  open(url: string): void { if (url) this.lightboxUrl = url; }
  close(): void { this.lightboxUrl = null; }

  ngOnDestroy(): void {
    this.pendingImages.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    this.fileUrls.forEach((url) => URL.revokeObjectURL(url));
  }
}
