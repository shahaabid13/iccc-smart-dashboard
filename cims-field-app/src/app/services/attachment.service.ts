import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, from, map, mergeMap, of, toArray } from 'rxjs';
import { getApiBaseUrl } from '../../environments/environment';

export type AttachmentEntityType = 'TASK' | 'TICKET' | 'TASK_ACTION' | 'TICKET_ACTION';

export interface AttachmentResponse {
  id: number;
  entityType: AttachmentEntityType;
  entityId: number;
  fileName?: string;
  originalFileName?: string;
  contentType?: string;
  mimeType?: string;
  createdAt?: string;
}

export interface AttachmentUploadSummary {
  uploaded: number;
  failed: number;
}

@Injectable({ providedIn: 'root' })
export class AttachmentService {
  private readonly baseUrl = `${getApiBaseUrl()}/api/attachments`;

  constructor(private http: HttpClient) {}

  uploadAttachment(file: Blob, entityType: AttachmentEntityType, entityId: number): Observable<AttachmentResponse> {
    const data = new FormData();
    data.append('file', file, 'screenshot.jpg');
    data.append('entityType', entityType);
    data.append('entityId', String(entityId));
    return this.http.post<AttachmentResponse>(this.baseUrl, data);
  }

  uploadAttachments(files: Blob[], entityType: AttachmentEntityType, entityId: number): Observable<AttachmentUploadSummary> {
    if (!files.length) return of({ uploaded: 0, failed: 0 });
    return from(files).pipe(
      mergeMap((file) => this.uploadAttachment(file, entityType, entityId).pipe(
        map(() => true),
        catchError(() => of(false))
      ), 2),
      toArray(),
      map((results) => ({ uploaded: results.filter(Boolean).length, failed: results.filter((ok) => !ok).length }))
    );
  }

  getAttachments(entityType: AttachmentEntityType, entityId: number): Observable<AttachmentResponse[]> {
    const params = new HttpParams().set('entityType', entityType).set('entityId', String(entityId));
    return this.http.get<AttachmentResponse[]>(this.baseUrl, { params });
  }

  getAttachmentFile(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/file`, { responseType: 'blob' });
  }

  deleteAttachment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
