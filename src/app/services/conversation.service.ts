import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export type ConversationEntityType = 'TASK' | 'TICKET';

export interface ConversationParticipant {
  userId: number;
  username: string;
  fullName: string;
  source: 'TAG' | 'MENTION';
  role?: string;
}

export interface ConversationComment {
  id: number;
  authorId: number;
  authorUsername: string;
  authorFullName: string;
  authorRole?: string;
  body: string;
  createdAt: string;
  editedAt: string | null;
  mine: boolean;
  mentions: string[];
  pending?: boolean;
  failed?: boolean;
}

export interface ConversationSummary {
  canPost: boolean;
  canManageTags: boolean;
  participants: ConversationParticipant[];
  unreadCount: number;
}

export interface ConversationCommentsPage {
  comments: ConversationComment[];
  nextBeforeId: number | null;
}

export interface TaggableUser {
  id: number;
  username: string;
  fullName: string;
  role: string;
}

export interface UnreadConversation {
  entityType: ConversationEntityType;
  entityId: number;
  title: string;
  unreadCount: number;
  lastCommentAt: string;
}

@Injectable({ providedIn: 'root' })
export class ConversationService {
  constructor(private http: HttpClient) {}

  private base(entityType: ConversationEntityType, entityId: number): string {
    return `/api/conversations/${entityType}/${entityId}`;
  }

  getSummary(entityType: ConversationEntityType, entityId: number): Observable<ConversationSummary> {
    return this.http.get<ConversationSummary>(this.base(entityType, entityId));
  }

  getComments(entityType: ConversationEntityType, entityId: number, beforeId?: number | null): Observable<ConversationCommentsPage> {
    let params = new HttpParams().set('size', '30');
    if (beforeId) params = params.set('beforeId', String(beforeId));
    return this.http.get<ConversationCommentsPage>(`${this.base(entityType, entityId)}/comments`, { params });
  }

  postComment(entityType: ConversationEntityType, entityId: number, body: string):
    Observable<{ comment: ConversationComment; ignoredMentions: string[] }> {
    return this.http.post<{ comment: ConversationComment; ignoredMentions: string[] }>(
      `${this.base(entityType, entityId)}/comments`,
      { body }
    );
  }

  editComment(entityType: ConversationEntityType, entityId: number, commentId: number, body: string):
    Observable<ConversationComment> {
    return this.http.put<ConversationComment>(
      `${this.base(entityType, entityId)}/comments/${commentId}`,
      { body }
    );
  }

  deleteComment(entityType: ConversationEntityType, entityId: number, commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.base(entityType, entityId)}/comments/${commentId}`);
  }

  markRead(entityType: ConversationEntityType, entityId: number, lastCommentId: number): Observable<void> {
    return this.http.post<void>(`${this.base(entityType, entityId)}/read`, { lastCommentId });
  }

  getTaggableUsers(entityType: ConversationEntityType, entityId: number, query: string): Observable<TaggableUser[]> {
    return this.http.get<TaggableUser[]>(`${this.base(entityType, entityId)}/taggable-users`, {
      params: { query }
    });
  }

  addParticipants(entityType: ConversationEntityType, entityId: number, userIds: number[]): Observable<void> {
    return this.http.post<void>(`${this.base(entityType, entityId)}/participants`, { userIds });
  }

  removeParticipant(entityType: ConversationEntityType, entityId: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.base(entityType, entityId)}/participants/${userId}`);
  }

  getUnreadSummary(): Observable<UnreadConversation[]> {
    return this.http.get<UnreadConversation[]>('/api/conversations/unread-summary');
  }
}
