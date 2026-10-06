import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, from, map, mergeMap, Observable, of, toArray } from 'rxjs';

export type AttachmentEntityType = 'TASK' | 'TICKET' | 'TASK_ACTION' | 'TICKET_ACTION';

export interface AttachmentResponse {
  id: number;
  entityType: AttachmentEntityType;
  entityId: number;
  fileName?: string;
  originalFileName?: string;
  contentType?: string;
  mimeType?: string;
  url?: string;
  createdAt?: string;
}

export interface AttachmentBatchResult {
  uploaded: number;
  failed: number;
}

@Injectable({ providedIn: 'root' })
export class AttachmentService {
  private readonly baseUrl = '/api/attachments';

  constructor(private http: HttpClient) {}

  uploadAttachment(file: Blob, entityType: AttachmentEntityType, entityId: number): Observable<AttachmentResponse> {
    const formData = new FormData();
    formData.append('file', file, 'screenshot.jpg');
    formData.append('entityType', entityType);
    formData.append('entityId', String(entityId));
    return this.http.post<AttachmentResponse>(this.baseUrl, formData);
  }

  getAttachments(entityType: AttachmentEntityType, entityId: number): Observable<AttachmentResponse[]> {
    const params = new HttpParams()
      .set('entityType', entityType)
      .set('entityId', String(entityId));
    return this.http.get<AttachmentResponse[]>(this.baseUrl, { params });
  }

  getAttachmentFileUrl(attachmentId: number): string {
    return `${this.baseUrl}/${attachmentId}/file`;
  }

  getAttachmentFile(attachmentId: number): Observable<Blob> {
    return this.http.get(this.getAttachmentFileUrl(attachmentId), { responseType: 'blob' });
  }

  uploadAttachments(files: Blob[], entityType: AttachmentEntityType, entityId: number): Observable<AttachmentBatchResult> {
    if (!files.length) return of({ uploaded: 0, failed: 0 });
    return from(files).pipe(
      mergeMap((file) => this.uploadAttachment(file, entityType, entityId).pipe(
        map(() => true),
        catchError(() => of(false))
      ), 2),
      toArray(),
      map((results) => ({
        uploaded: results.filter(Boolean).length,
        failed: results.filter((uploaded) => !uploaded).length
      }))
    );
  }

  deleteAttachment(attachmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${attachmentId}`);
  }
}
