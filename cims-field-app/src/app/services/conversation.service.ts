import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getApiBaseUrl } from '../../environments/environment';

export type ConversationEntityType = 'TASK' | 'TICKET';

export interface ConversationParticipant {
  userId: number;
  username: string;
  fullName: string;
  source: 'TAG' | 'MENTION';
}

export interface ConversationSummary {
  canPost: boolean;
  canManageTags: boolean;
  participants: ConversationParticipant[];
  unreadCount: number;
}

export interface ConversationComment {
  id: number;
  authorId: number;
  authorUsername: string;
  authorFullName: string;
  body: string;
  createdAt: string;
  editedAt: string | null;
  mine: boolean;
  mentions: string[];
  pending?: boolean;
  failed?: boolean;
}

export interface CommentPage {
  comments: ConversationComment[];
  nextBeforeId: number | null;
}

export interface TaggableUser {
  id: number;
  username: string;
  fullName: string;
  role: string;
}

export interface UnreadSummary {
  entityType: ConversationEntityType;
  entityId: number;
  title: string;
  unreadCount: number;
  lastCommentAt: string;
}

export interface FieldNotification {
  id: string;
  title: string;
  type: 'CONVERSATION_TASK' | 'CONVERSATION_TICKET';
  referenceId: number;
  message: string;
  read: boolean;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ConversationService {
  private readonly apiBase = `${getApiBaseUrl()}/api/conversations`;

  constructor(private http: HttpClient, private router: Router) {}

  navigateFromNotification(notification: FieldNotification): Promise<boolean> {
    const section = notification.type === 'CONVERSATION_TICKET' ? 'tickets' : 'tasks';
    return this.router.navigate([`/${section}`, notification.referenceId], { queryParams: { conversation: 'true' } });
  }

  private entityBase(type: ConversationEntityType, id: number): string {
    return `${this.apiBase}/${type}/${id}`;
  }

  getSummary(type: ConversationEntityType, id: number): Observable<ConversationSummary> {
    return this.http.get<ConversationSummary>(this.entityBase(type, id));
  }

  getComments(type: ConversationEntityType, id: number, beforeId?: number): Observable<CommentPage> {
    const params: Record<string, string> = { size: '30' };
    if (beforeId !== undefined && beforeId !== null) params['beforeId'] = String(beforeId);
    return this.http.get<CommentPage>(`${this.entityBase(type, id)}/comments`, { params });
  }

  markRead(type: ConversationEntityType, id: number, lastCommentId: number): Observable<void> {
    return this.http.post<void>(`${this.entityBase(type, id)}/read`, { lastCommentId });
  }

  postComment(type: ConversationEntityType, id: number, body: string): Observable<{ comment: ConversationComment; ignoredMentions: string[] }> {
    return this.http.post<{ comment: ConversationComment; ignoredMentions: string[] }>(`${this.entityBase(type, id)}/comments`, { body });
  }

  editComment(type: ConversationEntityType, id: number, commentId: number, body: string): Observable<ConversationComment> {
    return this.http.put<ConversationComment>(`${this.entityBase(type, id)}/comments/${commentId}`, { body });
  }

  deleteComment(type: ConversationEntityType, id: number, commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.entityBase(type, id)}/comments/${commentId}`);
  }

  getTaggableUsers(type: ConversationEntityType, id: number, query: string): Observable<TaggableUser[]> {
    return this.http.get<TaggableUser[]>(`${this.entityBase(type, id)}/taggable-users`, { params: { query } });
  }

  addParticipants(type: ConversationEntityType, id: number, userIds: number[]): Observable<void> {
    return this.http.post<void>(`${this.entityBase(type, id)}/participants`, { userIds });
  }

  removeParticipant(type: ConversationEntityType, id: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.entityBase(type, id)}/participants/${userId}`);
  }

  getUnreadSummary(): Observable<UnreadSummary[]> {
    return this.http.get<UnreadSummary[]>(`${this.apiBase}/unread-summary`);
  }

  getNotifications(): Observable<FieldNotification[]> {
    return this.http.get<FieldNotification[]>(`${getApiBaseUrl()}/api/notifications/my`);
  }
}

export function getMentionQuery(value: string, caret: number): { start: number; query: string } | null {
  const beforeCaret = value.slice(0, caret);
  const match = /(?:^|\s)@([\w.-]*)$/.exec(beforeCaret);
  if (!match) return null;
  return { start: caret - match[1].length - 1, query: match[1] };
}

export function insertMention(value: string, start: number, caret: number, username: string): { value: string; caret: number } {
  const inserted = `@${username} `;
  const result = value.slice(0, start) + inserted + value.slice(caret);
  return { value: result, caret: start + inserted.length };
}

@Injectable({ providedIn: 'root' })
export class ConversationUnreadService {
  private rows: UnreadSummary[] = [];
  private pollHandle?: ReturnType<typeof setInterval>;
  private visibilityHandler?: () => void;

  constructor(private conversations: ConversationService) {}

  start(): void {
    if (this.pollHandle) return;
    this.refresh();
    this.pollHandle = setInterval(() => {
      if (typeof document === 'undefined' || document.visibilityState === 'visible') this.refresh();
    }, 30000);
    if (typeof document !== 'undefined') {
      this.visibilityHandler = () => {
        if (document.visibilityState === 'visible') this.refresh();
      };
      document.addEventListener('visibilitychange', this.visibilityHandler);
    }
  }

  stop(): void {
    if (this.pollHandle) clearInterval(this.pollHandle);
    this.pollHandle = undefined;
    if (this.visibilityHandler && typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.visibilityHandler);
    }
    this.visibilityHandler = undefined;
  }

  count(type: ConversationEntityType, id: number): number {
    return this.rows.find(row => row.entityType === type && row.entityId === id)?.unreadCount ?? 0;
  }

  refresh(): void {
    this.conversations.getUnreadSummary().subscribe({
      next: rows => this.rows = Array.isArray(rows) ? rows : [],
      error: () => undefined
    });
  }
}
