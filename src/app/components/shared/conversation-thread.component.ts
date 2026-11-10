import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription, interval } from 'rxjs';
import {
  ConversationComment,
  ConversationEntityType,
  ConversationParticipant,
  ConversationService,
  ConversationSummary,
  TaggableUser
} from '../../services/conversation.service';
import {
  getMentionQuery,
  insertConversationMention,
  splitConversationMentions
} from '../../shared/conversation-mentions';

@Component({
  selector: 'app-conversation-thread',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  template: `
    <section class="conversation" aria-label="Conversation thread">
      <div class="participants">
        <div class="person" *ngIf="creatorName">
          <span class="avatar" aria-hidden="true">{{ initials(creatorName) }}</span>
          <span class="person-copy"><strong>{{ creatorName }}</strong><small>Creator</small></span>
        </div>
        <div class="person" *ngIf="assigneeName">
          <span class="avatar" aria-hidden="true">{{ initials(assigneeName) }}</span>
          <span class="person-copy"><strong>{{ assigneeName }}</strong><small>Assignee</small></span>
        </div>
        <div class="person" *ngFor="let participant of participants">
          <span class="avatar" aria-hidden="true">{{ initials(participant.fullName || participant.username) }}</span>
          <span class="person-copy">
            <strong>{{ participant.fullName || participant.username }}</strong>
            <small>{{ participant.role || participant.source }}</small>
          </span>
          <button *ngIf="canManageTags && participant.source === 'TAG'"
            type="button" class="remove-person" (click)="untag(participant)" [attr.aria-label]="'Remove ' + participant.username">
            ×
          </button>
        </div>
        <button *ngIf="canManageTags" mat-stroked-button type="button" class="tag-button" (click)="openTagDialog()">
          <mat-icon>person_add</mat-icon> Tag people
        </button>
      </div>

      <div class="error" *ngIf="errorMessage" role="alert">{{ errorMessage }}</div>
      <div class="thread" aria-live="polite">
        <button *ngIf="nextBeforeId && !loadingOlder" class="older-button" type="button" (click)="loadOlder()">Load older messages</button>
        <div class="skeleton-list" *ngIf="loading">
          <div class="skeleton-message" *ngFor="let row of [1,2,3]">
            <span></span><i></i>
          </div>
        </div>
        <div class="empty" *ngIf="!loading && comments.length === 0">No messages yet. Start the conversation.</div>
        <ng-container *ngFor="let comment of comments; let i = index">
          <div class="day-divider" *ngIf="isFirstOnDay(i)"><span>{{ dayLabel(comment.createdAt) }}</span></div>
          <div class="new-divider" *ngIf="i === newMessagesIndex"><span>New messages</span></div>
          <article class="message" [class.own]="comment.mine" [class.pending]="comment.pending"
            [class.failed]="comment.failed" [class.new-message]="isNewMessage(comment)">
            <div class="message-meta">
              <strong>{{ comment.authorFullName || comment.authorUsername }}</strong>
              <span class="role-badge">{{ roleFor(comment) }}</span>
              <time [attr.title]="exactTime(comment.createdAt)">{{ relativeTime(comment.createdAt) }}</time>
              <span class="edited" *ngIf="comment.editedAt">edited</span>
            </div>
            <ng-container *ngIf="editingId !== comment.id; else editBox">
              <p class="message-body">
                <ng-container *ngFor="let part of mentionParts(comment.body)">
                  <span [class.mention]="part.mention">{{ part.text }}</span>
                </ng-container>
              </p>
            </ng-container>
            <ng-template #editBox>
              <textarea class="edit-box" [(ngModel)]="editBody" maxlength="2000" aria-label="Edit message"></textarea>
              <div class="message-actions">
                <button type="button" (click)="saveEdit(comment)">Save</button>
                <button type="button" (click)="cancelEdit()">Cancel</button>
              </div>
            </ng-template>
            <div class="message-actions" *ngIf="comment.mine && !comment.pending && !comment.failed && editingId !== comment.id">
              <button type="button" (click)="beginEdit(comment)">Edit</button>
              <button type="button" (click)="delete(comment)">Delete</button>
            </div>
            <div class="pending-row" *ngIf="comment.pending">Sending…</div>
            <div class="pending-row failed-row" *ngIf="comment.failed">
              Message failed to send.
              <button type="button" (click)="retry(comment)">Retry</button>
            </div>
          </article>
        </ng-container>
      </div>

      <div class="composer-wrap">
        <div class="suggestions" *ngIf="suggestions.length">
          <button type="button" *ngFor="let user of suggestions; let i = index"
            [class.active]="i === activeSuggestion" (mousedown)="$event.preventDefault()"
            (click)="selectSuggestion(user)">
            <span class="avatar small">{{ initials(user.fullName || user.username) }}</span>
            <span>{{ user.fullName || user.username }}</span><small>@{{ user.username }}</small>
          </button>
        </div>
        <ng-container *ngIf="canPost; else readOnlyComposer">
          <label class="sr-only" for="conversation-message">Write a message</label>
          <textarea id="conversation-message" [(ngModel)]="draft" maxlength="2000" rows="3"
            placeholder="Write a message…" (input)="onDraftInput($event)" (keydown)="onComposerKeydown($event)"
            aria-describedby="message-count"></textarea>
          <div class="composer-footer">
            <span id="message-count" [class.limit]="draft.length >= 1900">{{ draft.length }}/2000</span>
            <button type="button" class="send-button" [disabled]="!draft.trim() || sending" (click)="send()">
              {{ sending ? 'Sending…' : 'Send' }}
            </button>
          </div>
        </ng-container>
        <ng-template #readOnlyComposer>
          <div class="read-only">Only the assignee and tagged people can reply</div>
        </ng-template>
      </div>
    </section>
  `,
  styles: [`
    :host { display:block; --conversation-blue:#2563eb; --conversation-border:#dbe3ee; color:#172033; }
    .conversation { border:1px solid var(--conversation-border); border-radius:12px; background:#fff; overflow:hidden; }
    .participants { display:flex; align-items:center; gap:12px; padding:14px 16px; border-bottom:1px solid var(--conversation-border); overflow:auto; }
    .person { display:flex; align-items:center; gap:8px; flex:none; }
    .avatar { display:inline-flex; width:36px; height:36px; align-items:center; justify-content:center; border-radius:50%; background:#dbeafe; color:#1e40af; font-size:12px; font-weight:700; }
    .avatar.small { width:28px; height:28px; }
    .person-copy { display:grid; line-height:1.25; }
    .person-copy strong { font-size:12px; white-space:nowrap; }
    .person-copy small { color:#536176; font-size:11px; }
    .remove-person { border:0; background:transparent; color:#475569; font-size:20px; cursor:pointer; min-width:32px; min-height:32px; }
    .tag-button { margin-left:auto; flex:none; min-height:40px; }
    .thread { max-height:56vh; min-height:220px; overflow:auto; padding:16px; display:flex; flex-direction:column; gap:12px; }
    .message { align-self:flex-start; max-width:min(82%,680px); background:#f1f5f9; border:1px solid #e2e8f0; border-radius:4px 14px 14px; padding:10px 12px; }
    .message.own { align-self:flex-end; background:#eff6ff; border-color:#bfdbfe; border-radius:14px 4px 14px 14px; }
    .message.pending { opacity:.65; }
    .message.failed { border-color:#dc2626; }
    .message.new-message { box-shadow:0 0 0 2px #2563eb; }
    .message-meta { display:flex; align-items:center; flex-wrap:wrap; gap:6px; font-size:12px; }
    .message-meta time,.edited { color:#475569; font-size:11px; }
    .role-badge { border-radius:20px; padding:2px 7px; color:#1e3a8a; background:#dbeafe; font-size:10px; font-weight:700; }
    .message-body { margin:7px 0 0; white-space:pre-wrap; overflow-wrap:anywhere; line-height:1.45; }
    .mention { display:inline; padding:1px 5px; border-radius:10px; color:#1d4ed8; background:#dbeafe; font-weight:600; }
    .day-divider,.new-divider { display:flex; align-items:center; gap:10px; color:#596579; font-size:11px; justify-content:center; }
    .new-divider { color:#1d4ed8; font-weight:700; }
    .day-divider:before,.day-divider:after,.new-divider:before,.new-divider:after { content:''; height:1px; background:#dbe3ee; flex:1; }
    .older-button { align-self:center; min-height:40px; border:1px solid var(--conversation-border); border-radius:20px; background:#fff; color:#1d4ed8; padding:0 16px; cursor:pointer; }
    .empty { margin:auto; padding:32px 12px; color:#475569; text-align:center; }
    .skeleton-list { display:grid; gap:14px; }
    .skeleton-message { display:grid; gap:8px; max-width:75%; }
    .skeleton-message span,.skeleton-message i { height:14px; border-radius:8px; background:linear-gradient(90deg,#eef2f7,#f8fafc,#eef2f7); animation: shimmer 1.2s ease-in-out infinite; }
    .skeleton-message i { width:65%; }
    @keyframes shimmer { from { opacity:.55 } to { opacity:1 } }
    .composer-wrap { position:relative; border-top:1px solid var(--conversation-border); padding:12px 16px; background:#fff; }
    textarea { width:100%; min-height:74px; resize:vertical; border:1px solid #94a3b8; border-radius:8px; padding:10px 12px; font:inherit; color:#172033; }
    textarea:focus { outline:3px solid #93c5fd; outline-offset:1px; border-color:#1d4ed8; }
    .composer-footer { display:flex; justify-content:space-between; align-items:center; margin-top:6px; color:#475569; font-size:12px; }
    .composer-footer .limit { color:#b91c1c; }
    .send-button { min-width:80px; min-height:40px; border:0; border-radius:8px; background:var(--conversation-blue); color:#fff; font-weight:700; cursor:pointer; }
    .send-button:disabled { background:#94a3b8; cursor:not-allowed; }
    .read-only { border-radius:8px; padding:14px; background:#f1f5f9; color:#334155; text-align:center; }
    .suggestions { position:absolute; z-index:2; bottom:100%; left:16px; right:16px; max-height:220px; overflow:auto; border:1px solid var(--conversation-border); border-radius:8px; background:#fff; box-shadow:0 6px 20px #0f172a22; }
    .suggestions button { width:100%; display:flex; align-items:center; gap:8px; min-height:44px; padding:6px 10px; border:0; background:#fff; color:#172033; text-align:left; cursor:pointer; }
    .suggestions button.active,.suggestions button:hover { background:#eff6ff; }
    .suggestions small { margin-left:auto; color:#475569; }
    .message-actions { display:flex; gap:12px; margin-top:6px; }
    .message-actions button,.pending-row button { border:0; background:none; color:#1d4ed8; text-decoration:underline; cursor:pointer; min-height:32px; }
    .pending-row { margin-top:6px; color:#475569; font-size:11px; }
    .failed-row { color:#b91c1c; }
    .edit-box { min-height:70px; margin-top:8px; }
    .error { padding:10px 16px; background:#fef2f2; color:#991b1b; border-bottom:1px solid #fecaca; }
    .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
    @media (max-width:640px) { .thread { max-height:none; min-height:45vh; } .message { max-width:94%; } .participants { align-items:flex-start; } }
    @media (prefers-reduced-motion:reduce) { *,*::before,*::after { animation-duration:.01ms !important; animation-iteration-count:1 !important; scroll-behavior:auto !important; } }
  `]
})
export class ConversationThreadComponent implements OnInit, OnDestroy {
  @Input({ required: true }) entityType!: ConversationEntityType;
  @Input({ required: true }) entityId!: number;
  @Input() title = '';
  @Input() creatorName = '';
  @Input() assigneeName = '';
  @Output() unreadCountChange = new EventEmitter<number>();

  participants: ConversationParticipant[] = [];
  comments: ConversationComment[] = [];
  canPost = false;
  canManageTags = false;
  unreadCount = 0;
  nextBeforeId: number | null = null;
  loading = true;
  loadingOlder = false;
  sending = false;
  draft = '';
  errorMessage = '';
  editingId: number | null = null;
  editBody = '';
  suggestions: TaggableUser[] = [];
  activeSuggestion = 0;
  private newMessagesStartId: number | null = null;
  private suggestionTimer?: ReturnType<typeof setTimeout>;
  private poll?: Subscription;
  private visible = typeof document === 'undefined' || document.visibilityState === 'visible';
  private readonly visibilityHandler = () => {
    this.visible = document.visibilityState === 'visible';
    if (this.visible) this.refresh();
  };

  constructor(private conversations: ConversationService, private dialog: MatDialog) {}

  ngOnInit(): void {
    if (typeof document !== 'undefined') document.addEventListener('visibilitychange', this.visibilityHandler);
    this.poll = interval(30000).subscribe(() => {
      if (this.visible) this.refresh();
    });
    this.loadInitial();
  }

  ngOnDestroy(): void {
    this.poll?.unsubscribe();
    if (this.suggestionTimer) clearTimeout(this.suggestionTimer);
    if (typeof document !== 'undefined') document.removeEventListener('visibilitychange', this.visibilityHandler);
  }

  get newMessagesIndex(): number {
    return this.newMessagesStartId === null
      ? -1
      : this.comments.findIndex(comment => comment.id === this.newMessagesStartId);
  }

  private loadInitial(): void {
    this.loading = true;
    this.errorMessage = '';
    this.conversations.getSummary(this.entityType, this.entityId).subscribe({
      next: summary => {
        this.applySummary(summary);
        this.loadPage();
      },
      error: error => {
        this.loading = false;
        this.errorMessage = error?.status === 403
          ? 'You do not have permission to view this conversation.'
          : 'Unable to load the conversation. Please try again.';
      }
    });
  }

  private applySummary(summary: ConversationSummary): void {
    this.canPost = summary.canPost;
    this.canManageTags = summary.canManageTags;
    this.participants = summary.participants || [];
    this.unreadCount = summary.unreadCount || 0;
    this.unreadCountChange.emit(this.unreadCount);
  }

  private loadPage(beforeId?: number | null): void {
    this.conversations.getComments(this.entityType, this.entityId, beforeId).subscribe({
      next: page => {
        const chronological = [...(page.comments || [])].reverse();
        this.comments = beforeId ? [...chronological, ...this.comments] : chronological;
        this.nextBeforeId = page.nextBeforeId;
        if (!beforeId && this.unreadCount > 0 && chronological.length) {
          this.newMessagesStartId = chronological[Math.max(0, chronological.length - this.unreadCount)].id;
        }
        this.loading = false;
        this.loadingOlder = false;
        this.markVisibleRead();
      },
      error: error => {
        this.loading = false;
        this.loadingOlder = false;
        this.errorMessage = error?.status === 403
          ? 'You do not have permission to view this conversation.'
          : 'Unable to load messages. Please try again.';
      }
    });
  }

  refresh(): void {
    if (!this.visible || this.loading) return;
    this.conversations.getSummary(this.entityType, this.entityId).subscribe({
      next: summary => {
        const previousUnread = this.unreadCount;
        this.applySummary(summary);
        this.conversations.getComments(this.entityType, this.entityId).subscribe({
          next: page => {
            const latest = [...(page.comments || [])].reverse();
            const knownIds = new Set(this.comments.map(comment => comment.id));
            const newItems = latest.filter(comment => !knownIds.has(comment.id));
            const merged = new Map(this.comments.map(comment => [comment.id, comment]));
            latest.forEach(comment => merged.set(comment.id, comment));
            this.comments = [...merged.values()]
              .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            if (newItems.length) this.newMessagesStartId = newItems[0].id;
            this.nextBeforeId = page.nextBeforeId ?? this.nextBeforeId;
            if (newItems.length || previousUnread !== this.unreadCount) this.markVisibleRead();
          },
          error: error => {
            this.errorMessage = error?.status === 403
              ? 'You do not have permission to view this conversation.'
              : 'Unable to refresh messages. Please try again.';
          }
        });
      },
      error: error => {
        this.errorMessage = error?.status === 403
          ? 'You do not have permission to view this conversation.'
          : 'Unable to refresh the conversation. Please try again.';
      }
    });
  }

  loadOlder(): void {
    if (!this.nextBeforeId || this.loadingOlder) return;
    this.loadingOlder = true;
    this.loadPage(this.nextBeforeId);
  }

  private markVisibleRead(): void {
    const newest = this.comments[this.comments.length - 1];
    if (!newest || !this.visible) return;
    this.conversations.markRead(this.entityType, this.entityId, newest.id).subscribe({
      next: () => {
        this.unreadCount = 0;
        this.unreadCountChange.emit(0);
      },
      error: error => {
        this.errorMessage = error?.status === 403
          ? 'You can read this conversation, but could not update its read status.'
          : 'Could not update the conversation read status.';
      }
    });
  }

  send(): void {
    const body = this.draft.trim();
    if (!body || body.length > 2000 || !this.canPost || this.sending) return;
    this.draft = '';
    this.suggestions = [];
    this.sendBody(body);
  }

  private sendBody(body: string, pending?: ConversationComment): void {
    const temporary: ConversationComment = pending || {
      id: -Date.now(),
      authorId: 0,
      authorUsername: sessionStorage.getItem('username') || 'You',
      authorFullName: sessionStorage.getItem('username') || 'You',
      authorRole: sessionStorage.getItem('role') || undefined,
      body,
      createdAt: new Date().toISOString(),
      editedAt: null,
      mine: true,
      mentions: [],
      pending: true
    };
    if (!pending) this.comments = [...this.comments, temporary];
    temporary.pending = true;
    temporary.failed = false;
    this.sending = true;
    this.conversations.postComment(this.entityType, this.entityId, body).subscribe({
      next: response => {
        this.comments = this.comments.filter(comment => comment.id !== temporary.id);
        this.comments = [...this.comments, response.comment]
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        this.sending = false;
        if (response.ignoredMentions?.length) {
          this.errorMessage = `Could not notify: ${response.ignoredMentions.map(name => '@' + name).join(', ')}`;
        } else {
          this.errorMessage = '';
        }
        this.refresh();
      },
      error: error => {
        this.sending = false;
        temporary.pending = false;
        temporary.failed = true;
        this.errorMessage = error?.status === 403
          ? 'You no longer have permission to reply to this conversation.'
          : 'Message failed to send. Retry when you are ready.';
        if (error?.status === 403) this.canPost = false;
      }
    });
  }

  retry(comment: ConversationComment): void {
    this.sendBody(comment.body, comment);
  }

  beginEdit(comment: ConversationComment): void {
    this.editingId = comment.id;
    this.editBody = comment.body;
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editBody = '';
  }

  saveEdit(comment: ConversationComment): void {
    const body = this.editBody.trim();
    if (!body || body.length > 2000) return;
    this.conversations.editComment(this.entityType, this.entityId, comment.id, body).subscribe({
      next: updated => {
        this.comments = this.comments.map(item => item.id === comment.id ? updated : item);
        this.cancelEdit();
        this.errorMessage = '';
      },
      error: error => {
        this.errorMessage = error?.status === 403 ? 'Only the author can edit this message.' : 'Unable to edit this message.';
      }
    });
  }

  delete(comment: ConversationComment): void {
    if (!window.confirm('Delete this message? This cannot be undone.')) return;
    this.conversations.deleteComment(this.entityType, this.entityId, comment.id).subscribe({
      next: () => this.comments = this.comments.filter(item => item.id !== comment.id),
      error: error => this.errorMessage = error?.status === 403
        ? 'You are not allowed to delete this message.'
        : 'Unable to delete this message.'
    });
  }

  openTagDialog(): void {
    const ref = this.dialog.open(TagPeopleDialogComponent, {
      width: 'min(520px, 94vw)',
      data: { entityType: this.entityType, entityId: this.entityId }
    });
    ref.afterClosed().subscribe((users: TaggableUser[] | undefined) => {
      if (!users?.length) return;
      this.conversations.addParticipants(this.entityType, this.entityId, users.map(user => user.id)).subscribe({
        next: () => this.refreshSummary(),
        error: error => this.errorMessage = error?.status === 403
          ? 'You are not allowed to tag people in this conversation.'
          : 'Unable to tag the selected people.'
      });
    });
  }

  untag(participant: ConversationParticipant): void {
    if (!window.confirm(`Remove ${participant.fullName || participant.username} from this conversation?`)) return;
    this.conversations.removeParticipant(this.entityType, this.entityId, participant.userId).subscribe({
      next: () => this.refreshSummary(),
      error: error => this.errorMessage = error?.status === 403
        ? 'You are not allowed to remove this participant.'
        : 'Unable to remove this participant.'
    });
  }

  private refreshSummary(): void {
    this.conversations.getSummary(this.entityType, this.entityId).subscribe({
      next: summary => this.applySummary(summary),
      error: error => this.errorMessage = error?.status === 403
        ? 'You are not allowed to manage this conversation.'
        : 'Unable to refresh conversation participants.'
    });
  }

  onDraftInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    const query = getMentionQuery(this.draft, target.selectionStart);
    if (this.suggestionTimer) clearTimeout(this.suggestionTimer);
    if (query === null) {
      this.suggestions = [];
      return;
    }
    this.suggestionTimer = setTimeout(() => {
      this.conversations.getTaggableUsers(this.entityType, this.entityId, query).subscribe({
        next: users => {
          this.suggestions = users.slice(0, 8);
          this.activeSuggestion = 0;
        },
        error: error => {
          this.suggestions = [];
          this.errorMessage = error?.status === 403
            ? 'Unable to search people for mentions.'
            : 'Could not load mention suggestions.';
        }
      });
    }, 250);
  }

  onComposerKeydown(event: KeyboardEvent): void {
    if (this.suggestions.length && event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeSuggestion = (this.activeSuggestion + 1) % this.suggestions.length;
    } else if (this.suggestions.length && event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeSuggestion = (this.activeSuggestion + this.suggestions.length - 1) % this.suggestions.length;
    } else if (this.suggestions.length && event.key === 'Enter' && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      this.selectSuggestion(this.suggestions[this.activeSuggestion]);
    } else if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      this.send();
    }
  }

  selectSuggestion(user: TaggableUser): void {
    const textarea = document.getElementById('conversation-message') as HTMLTextAreaElement | null;
    const cursor = textarea?.selectionStart ?? this.draft.length;
    const inserted = insertConversationMention(this.draft, cursor, user.username);
    this.draft = inserted.value;
    this.suggestions = [];
    requestAnimationFrame(() => {
      const input = document.getElementById('conversation-message') as HTMLTextAreaElement | null;
      input?.focus();
      input?.setSelectionRange(inserted.cursor, inserted.cursor);
    });
  }

  mentionParts(body: string) {
    return splitConversationMentions(body);
  }

  initials(name: string): string {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0].toUpperCase()).join('');
  }

  roleFor(comment: ConversationComment): string {
    return comment.authorRole || (comment.mine ? sessionStorage.getItem('role') : '') || 'Participant';
  }

  exactTime(value: string): string {
    return new Date(value).toLocaleString();
  }

  relativeTime(value: string): string {
    const seconds = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  isFirstOnDay(index: number): boolean {
    return index === 0 || new Date(this.comments[index - 1].createdAt).toDateString() !==
      new Date(this.comments[index].createdAt).toDateString();
  }

  isNewMessage(comment: ConversationComment): boolean {
    return comment.id === this.newMessagesStartId;
  }

  dayLabel(value: string): string {
    const date = new Date(value);
    return date.toDateString() === new Date().toDateString() ? 'Today' : date.toLocaleDateString();
  }
}

@Component({
  selector: 'app-tag-people-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatChipsModule, MatDialogModule, MatIconModule, MatInputModule],
  template: `
    <h2 mat-dialog-title>Tag people</h2>
    <mat-dialog-content>
      <label for="tag-search">Search people</label>
      <input id="tag-search" matInput [(ngModel)]="query" (ngModelChange)="search($event)" autocomplete="off">
      <div class="dialog-results" *ngIf="results.length">
        <button type="button" *ngFor="let user of results" (click)="toggle(user)">
          <span><strong>{{ user.fullName || user.username }}</strong><small>@{{ user.username }} · {{ user.role }}</small></span>
          <span>{{ isSelected(user) ? 'Selected' : 'Add' }}</span>
        </button>
      </div>
      <p *ngIf="searchError" class="no-results" role="alert">{{ searchError }}</p>
      <p *ngIf="searched && !results.length && !searchError" class="no-results">No matching people found.</p>
      <mat-chip-set aria-label="Selected people">
        <mat-chip *ngFor="let user of selected" (removed)="remove(user)">
          {{ user.fullName || user.username }}<button matChipRemove [attr.aria-label]="'Remove ' + user.username">×</button>
        </mat-chip>
      </mat-chip-set>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" [mat-dialog-close]="selected" [disabled]="!selected.length">Tag selected</button>
    </mat-dialog-actions>
  `,
  styles: [`
    :host { display:block; }
    label { display:block; margin-bottom:6px; font-weight:600; }
    input { width:100%; padding:10px; border:1px solid #64748b; border-radius:6px; }
    .dialog-results { display:grid; max-height:240px; overflow:auto; margin:10px 0; }
    .dialog-results button { display:flex; justify-content:space-between; align-items:center; min-height:48px; padding:8px; text-align:left; border:0; border-bottom:1px solid #e2e8f0; background:#fff; color:#172033; cursor:pointer; }
    .dialog-results span:first-child { display:grid; }
    .dialog-results small,.no-results { color:#475569; }
  `]
})
export class TagPeopleDialogComponent {
  query = '@';
  results: TaggableUser[] = [];
  selected: TaggableUser[] = [];
  searched = false;
  searchError = '';
  private timer?: ReturnType<typeof setTimeout>;

  constructor(
    private conversations: ConversationService,
    @Inject(MAT_DIALOG_DATA) private data: { entityType: ConversationEntityType; entityId: number }
  ) {
    this.search(this.query);
  }

  search(value: string): void {
    if (this.timer) clearTimeout(this.timer);
    this.searched = false;
    this.searchError = '';
    const query = value.trim().replace(/^@/, '');
    this.timer = setTimeout(() => {
      this.conversations.getTaggableUsers(this.data.entityType, this.data.entityId, query).subscribe({
        next: results => {
          this.results = results.slice(0, 8);
          this.searched = true;
        },
        error: () => {
          this.results = [];
          this.searched = true;
          this.searchError = 'Unable to search people. Please try again.';
        }
      });
    }, 250);
  }

  isSelected(user: TaggableUser): boolean {
    return this.selected.some(item => item.id === user.id);
  }

  toggle(user: TaggableUser): void {
    this.selected = this.isSelected(user)
      ? this.selected.filter(item => item.id !== user.id)
      : [...this.selected, user];
  }

  remove(user: TaggableUser): void {
    this.selected = this.selected.filter(item => item.id !== user.id);
  }
}
