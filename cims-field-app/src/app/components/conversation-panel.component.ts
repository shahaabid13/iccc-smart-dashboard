import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, ActionSheetController, ToastController } from '@ionic/angular/standalone';
import {
  IonBadge, IonButton, IonCard, IonItem, IonLabel, IonList, IonSkeletonText, IonTextarea
} from '@ionic/angular/standalone';
import { Subscription, debounceTime, distinctUntilChanged, Subject, timer } from 'rxjs';
import {
  ConversationComment, ConversationEntityType, ConversationParticipant, ConversationService,
  ConversationSummary, ConversationUnreadService, getMentionQuery, insertMention, TaggableUser
} from '../services/conversation.service';
import { OfflineService } from '../services/offline.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-conversation-panel',
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonBadge, IonButton, IonCard, IonItem, IonLabel,
    IonList, IonSkeletonText, IonTextarea
  ],
  template: `
    <section class="conversation" aria-label="Conversation">
      <ng-container *ngIf="summary; else conversationUnavailable">
      <div class="participants">
        <div class="participant-heading">
          <strong>Participants</strong>
          <ion-button *ngIf="summary?.canManageTags" fill="clear" size="small" (click)="openTagDialog()" aria-label="Manage participants">Tag people</ion-button>
        </div>
        <div class="participant-chips" *ngIf="summary?.participants?.length; else noParticipants">
          <ion-badge *ngFor="let participant of summary?.participants" color="light" class="participant-chip">
            {{ participant.fullName || participant.username }}
            <span class="participant-source">{{ participant.source === 'TAG' ? 'Tagged' : 'Mentioned' }}</span>
            <button *ngIf="summary?.canManageTags && participant.source === 'TAG'" type="button" class="remove-participant"
                    [attr.aria-label]="'Remove ' + (participant.fullName || participant.username)"
                    (click)="removeParticipant(participant)">×</button>
          </ion-badge>
        </div>
        <ng-template #noParticipants><p class="muted">No participants yet.</p></ng-template>
      </div>

      <div #thread class="thread" aria-live="polite">
        <ion-button *ngIf="nextBeforeId !== null" fill="clear" expand="block" (click)="loadOlder()" [disabled]="loadingOlder">Load older messages</ion-button>
        <ng-container *ngIf="loading && !comments.length">
          <div class="skeleton-message" *ngFor="let row of [1,2,3]">
            <ion-skeleton-text animated style="width: 42%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 80%; height: 42px"></ion-skeleton-text>
          </div>
        </ng-container>
        <div *ngIf="!loading && !comments.length" class="empty-thread">Start the conversation with a message.</div>
        <ng-container *ngFor="let comment of comments; let index = index">
          <div *ngIf="isNewMessagesStart(index)" class="new-divider"><span>New messages</span></div>
          <div *ngIf="showDaySeparator(index)" class="day-separator"><span>{{ comment.createdAt | date:'longDate' }}</span></div>
          <article class="bubble-row" [class.mine]="comment.mine" [class.highlighted]="highlightLatest && index === comments.length - 1">
            <div class="bubble">
              <div class="author">
                <strong>{{ comment.authorFullName || comment.authorUsername || 'User' }}</strong>
                <span *ngIf="roleFor(comment.authorId)" class="role">{{ roleFor(comment.authorId) }}</span>
                <span class="time">{{ comment.createdAt | date:'shortTime' }}</span>
              </div>
              <p class="body">{{ comment.body }}</p>
              <div class="mention-list" *ngIf="comment.mentions?.length">
                <span *ngFor="let mention of comment.mentions">@{{ mention }}</span>
              </div>
              <small *ngIf="comment.editedAt" class="edited">Edited</small>
              <small *ngIf="comment.pending" class="pending" role="status">Sending…</small>
              <button *ngIf="comment.failed" class="retry" type="button" (click)="retry(comment)">Not sent · Retry</button>
              <div *ngIf="comment.mine && !comment.pending && !comment.failed" class="comment-actions">
                <button type="button" class="comment-more" (click)="openCommentActions(comment)" aria-label="Message actions">Edit or delete</button>
              </div>
            </div>
          </article>
        </ng-container>
      </div>

      <div class="new-messages" *ngIf="unreadAtLoad">
        {{ unreadAtLoad }} new message{{ unreadAtLoad === 1 ? '' : 's' }}
      </div>
      <div class="composer" *ngIf="summary?.canPost; else postingDisabled">
        <div class="mention-suggestions" *ngIf="suggestions.length" role="listbox" aria-label="Mention suggestions">
          <button *ngFor="let user of suggestions; let i = index" type="button" role="option"
                  [attr.aria-selected]="i === activeSuggestion" (click)="selectMention(user)">
            <strong>{{ user.fullName || user.username }}</strong><small>@{{ user.username }} · {{ user.role }}</small>
          </button>
        </div>
        <ion-textarea #messageBox [(ngModel)]="draft" (ionInput)="onInput($event)" (keydown)="onKeyDown($event)"
          autoGrow="true" maxlength="2000" rows="1" [disabled]="!online || sending"
          placeholder="Write a message… Use @ to mention someone" aria-label="Write a message"></ion-textarea>
        <div class="composer-bottom">
          <span [class.over-limit]="draft.length > 2000">{{ draft.length }}/2000</span>
          <ion-button (click)="send()" [disabled]="!online || sending || !draft.trim() || draft.length > 2000" aria-label="Send message">
            {{ sending ? 'Sending…' : 'Send' }}
          </ion-button>
        </div>
        <p *ngIf="!online" class="muted">You’re offline. Sending is unavailable.</p>
      </div>
      <ng-template #postingDisabled><p class="muted posting-disabled">Only the assignee and tagged people can reply</p></ng-template>

      <ion-card *ngIf="tagModalOpen" class="tag-sheet">
        <div class="tag-heading"><strong>Manage participants</strong><ion-button fill="clear" (click)="tagModalOpen = false">Close</ion-button></div>
        <ion-textarea [(ngModel)]="tagQuery" (ionInput)="searchTaggableUsers($event)" rows="1" autoGrow="true"
          placeholder="@Type a name or username" aria-label="Search people to tag"></ion-textarea>
        <div class="selected-tags" *ngIf="selectedUsers.length" aria-label="Selected people">
          <ion-badge *ngFor="let user of selectedUsers" color="primary" class="selected-tag">
            @{{ user.username }}
            <button type="button" [attr.aria-label]="'Remove @' + user.username" (click)="toggleUser(user)">×</button>
          </ion-badge>
        </div>
        <ion-list>
          <ion-item *ngFor="let user of taggableUsers" button detail="false" (click)="toggleUser(user)">
            <ion-label><h3>{{ user.fullName || user.username }}</h3><p>@{{ user.username }} · {{ user.role }}</p></ion-label>
            <ion-badge *ngIf="selectedUserIds.has(user.id)" color="primary">Selected</ion-badge>
          </ion-item>
        </ion-list>
        <ion-button expand="block" (click)="addParticipants()" [disabled]="!selectedUserIds.size">Add selected</ion-button>
      </ion-card>
      </ng-container>
      <ng-template #conversationUnavailable>
        <div *ngIf="loading" class="conversation-loading" role="status">
          <ion-skeleton-text animated style="width: 46%"></ion-skeleton-text>
          <ion-skeleton-text animated style="width: 90%; height: 48px"></ion-skeleton-text>
        </div>
        <div *ngIf="!loading && loadError" class="conversation-error" role="alert">
          <p>{{ loadError }}</p>
          <ion-button fill="outline" type="button" (click)="loadInitial()">Retry</ion-button>
        </div>
      </ng-template>
    </section>
  `,
  styles: [`
    :host { display:block; height:calc(100dvh - 170px); min-height:380px; }
    .conversation { height:100%; min-height:0; display:flex; flex-direction:column; padding: 8px 0 calc(12px + env(safe-area-inset-bottom)); }
    .participants { position:sticky; top:0; z-index:2; background:var(--ion-background-color,#fff); padding:8px 12px; border-bottom:1px solid var(--ion-color-light-shade); }
    .participant-heading,.tag-heading { display:flex; align-items:center; justify-content:space-between; min-height:48px; }
    .participant-chips { display:flex; gap:8px; overflow-x:auto; padding:4px 0 8px; }
    .conversation-loading,.conversation-error { padding:20px 16px; }
    .conversation-error { color:var(--ion-color-danger); text-align:center; }
    .participant-chip { display:inline-flex; align-items:center; gap:6px; min-height:32px; white-space:nowrap; }
    .selected-tags { display:flex; flex-wrap:wrap; gap:8px; padding:8px 0; }
    .selected-tag { display:inline-flex; align-items:center; gap:6px; min-height:36px; }
    .selected-tag button { border:0; background:transparent; color:inherit; min-width:32px; min-height:32px; font-size:18px; }
    .participant-source,.muted,.edited,.pending { color:var(--ion-color-medium); font-size:.78rem; }
    .remove-participant { border:0; background:transparent; min-width:32px; min-height:32px; font-size:20px; color:var(--ion-color-danger); }
    .thread { flex:1; min-height:0; padding:12px; overflow:auto; overscroll-behavior:contain; }
    .skeleton-message { margin:12px 0; }
    .empty-thread { text-align:center; color:var(--ion-color-medium); padding:40px 12px; }
    .day-separator { display:flex; align-items:center; gap:12px; margin:18px 0; color:var(--ion-color-medium); font-size:.78rem; }
    .day-separator:before,.day-separator:after { content:''; flex:1; border-top:1px solid var(--ion-color-light-shade); }
    .new-divider { display:flex; align-items:center; gap:10px; margin:18px 0; color:var(--ion-color-primary); font-size:.78rem; font-weight:600; }
    .new-divider:before,.new-divider:after { content:''; flex:1; border-top:1px solid var(--ion-color-primary); opacity:.5; }
    .bubble-row { display:flex; margin:8px 0; }
    .bubble-row.mine { justify-content:flex-end; }
    .bubble-row.highlighted .bubble { outline:2px solid var(--ion-color-primary); outline-offset:2px; }
    .bubble { max-width:min(86%, 560px); padding:10px 12px; border-radius:16px 16px 16px 4px; background:var(--ion-color-light); overflow-wrap:anywhere; }
    .mine .bubble { background:color-mix(in srgb, var(--ion-color-primary) 13%, white); border-radius:16px 16px 4px 16px; }
    .author { display:flex; align-items:baseline; gap:8px; flex-wrap:wrap; font-size:.84rem; }
    .role,.time { color:var(--ion-color-medium); font-size:.72rem; }
    .body { white-space:pre-wrap; margin:7px 0 2px; line-height:1.45; }
    .mention-list { display:flex; gap:4px; flex-wrap:wrap; margin-top:6px; color:var(--ion-color-primary); font-size:.8rem; }
    .edited,.pending { display:block; margin-top:5px; }
    .comment-actions { display:flex; gap:8px; justify-content:flex-end; margin-top:4px; }
    .comment-actions button,.retry { min-height:48px; border:0; background:transparent; color:var(--ion-color-primary); font-weight:600; }
    .retry { color:var(--ion-color-danger); }
    .new-messages { text-align:center; padding:6px; color:var(--ion-color-primary); font-size:.82rem; }
    .composer { position:sticky; bottom:0; z-index:3; background:var(--ion-background-color,#fff); border-top:1px solid var(--ion-color-light-shade); padding:8px 12px calc(8px + env(safe-area-inset-bottom)); }
    ion-textarea { border:1px solid var(--ion-color-light-shade); border-radius:14px; --padding-start:12px; --padding-end:12px; max-height:160px; }
    .composer-bottom { display:flex; justify-content:space-between; align-items:center; min-height:48px; color:var(--ion-color-medium); font-size:.78rem; }
    .composer-bottom ion-button { min-height:44px; }
    .over-limit { color:var(--ion-color-danger); }
    .mention-suggestions { max-height:220px; overflow:auto; box-shadow:0 -4px 16px #0002; border-radius:12px; background:var(--ion-background-color,#fff); }
    .mention-suggestions button { width:100%; min-height:48px; display:flex; flex-direction:column; align-items:flex-start; justify-content:center; padding:6px 12px; background:transparent; border:0; text-align:left; color:inherit; }
    .mention-suggestions button[aria-selected=true] { background:var(--ion-color-light); }
    .mention-suggestions small { color:var(--ion-color-medium); }
    .posting-disabled { padding:16px; text-align:center; }
    .tag-sheet { position:fixed; z-index:10; inset:auto 0 0; max-height:72vh; overflow:auto; margin:0; border-radius:20px 20px 0 0; padding:12px 16px calc(16px + env(safe-area-inset-bottom)); box-shadow:0 -8px 32px #0003; }
    @media (prefers-reduced-motion: reduce) { *,*:before,*:after { scroll-behavior:auto !important; transition:none !important; } }
  `]
})
export class ConversationPanelComponent implements OnInit, OnDestroy {
  @Input({ required: true }) entityType!: ConversationEntityType;
  @Input({ required: true }) entityId!: number;
  @Input() highlightLatest = false;
  @ViewChild('thread') thread?: ElementRef<HTMLElement>;
  @ViewChild('messageBox') messageBox?: IonTextarea;
  summary: ConversationSummary | null = null;
  loadError = '';
  comments: ConversationComment[] = [];
  loading = true;
  loadingOlder = false;
  sending = false;
  online = true;
  draft = '';
  nextBeforeId: number | null = null;
  unreadAtLoad = 0;
  tagModalOpen = false;
  tagQuery = '';
  taggableUsers: TaggableUser[] = [];
  selectedUsers: TaggableUser[] = [];
  selectedUserIds = new Set<number>();
  suggestions: TaggableUser[] = [];
  activeSuggestion = 0;
  private activeMentionQuery: string | null = null;
  private readonly search$ = new Subject<string>();
  private readonly tagSearch$ = new Subject<string>();
  private readonly subscriptions = new Subscription();
  private readonly retryBodies = new Map<number, string>();
  private currentUsername = 'You';
  private pollTimer?: Subscription;
  private visibilityHandler?: () => void;

  constructor(
    private conversation: ConversationService,
    private unreadSummary: ConversationUnreadService,
    private offlineService: OfflineService,
    private authService: AuthService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    void this.authService.getUsername().then(username => this.currentUsername = username || 'You');
    this.subscriptions.add(this.offlineService.isOnline$.subscribe(value => this.online = value));
    this.subscriptions.add(this.search$.pipe(debounceTime(250), distinctUntilChanged()).subscribe(query => this.loadSuggestions(query)));
    this.subscriptions.add(this.tagSearch$.pipe(debounceTime(250), distinctUntilChanged()).subscribe(query => this.loadTaggableUsers(query)));
    this.loadInitial();
    this.pollTimer = timer(30000, 30000).subscribe(() => {
      if (typeof document === 'undefined' || document.visibilityState === 'visible') this.refreshThread(false);
    });
    if (typeof document !== 'undefined') {
      this.visibilityHandler = () => {
        if (document.visibilityState === 'visible') this.refreshThread(false);
      };
      document.addEventListener('visibilitychange', this.visibilityHandler);
      window.addEventListener('focus', this.visibilityHandler);
    }
  }

  isNewMessagesStart(index: number): boolean {
    if (!this.unreadAtLoad || !this.comments.length) return false;
    return index === Math.max(0, this.comments.length - this.unreadAtLoad);
  }

  private scrollToLatest(): void {
    requestAnimationFrame(() => {
      const thread = this.thread?.nativeElement;
      if (thread) thread.scrollTop = thread.scrollHeight;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.pollTimer?.unsubscribe();
    if (this.visibilityHandler && typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.visibilityHandler);
      window.removeEventListener('focus', this.visibilityHandler);
    }
  }

  private loadInitial(): void {
    this.loading = true;
    this.loadError = '';
    this.summary = null;
    this.comments = [];
    this.conversation.getSummary(this.entityType, this.entityId).subscribe({
      next: summary => {
        this.summary = summary;
        this.unreadAtLoad = summary.unreadCount;
        this.loadComments();
      },
      error: error => {
        this.loading = false;
        console.error('[ConversationPanel] Failed to load summary', {
          entityType: this.entityType,
          entityId: this.entityId,
          status: error?.status,
          statusText: error?.statusText,
          url: error?.url
        });
        this.loadError = error?.status === 403
          ? 'You don’t have access to this conversation.'
          : error?.status === 0
            ? 'Could not reach the conversation service. Check the API connection and retry.'
            : `Conversation could not be loaded (HTTP ${error?.status || 'unknown'}).`;
      }
    });
  }

  private loadComments(): void {
    this.conversation.getComments(this.entityType, this.entityId).subscribe({
      next: page => {
        this.comments = this.chronological(page.comments || []);
        this.nextBeforeId = page.nextBeforeId;
        this.loading = false;
        this.scrollToLatest();
        this.markLatestRead();
      },
      error: error => {
        this.loading = false;
        this.notify(error?.status === 403 ? 'You don’t have access to this conversation.' : 'Messages could not be loaded.');
      }
    });
  }

  refresh(event?: { target: { complete: () => void } }): void {
    this.conversation.getSummary(this.entityType, this.entityId).subscribe({
      next: summary => {
        this.summary = summary;
        this.unreadAtLoad = summary.unreadCount;
        this.refreshThread(true, event);
      },
      error: () => event?.target.complete()
    });
  }

  private refreshThread(reset: boolean, event?: { target: { complete: () => void } }): void {
    if (reset) {
      this.conversation.getComments(this.entityType, this.entityId).subscribe({
        next: page => {
          const known = new Set(this.comments.map(comment => comment.id));
          this.comments = this.chronological([...(page.comments || []), ...this.comments.filter(comment => !known.has(comment.id))]);
          this.nextBeforeId = page.nextBeforeId;
          this.scrollToLatest();
          this.markLatestRead();
          event?.target.complete();
        },
        error: () => event?.target.complete()
      });
    } else {
      this.conversation.getSummary(this.entityType, this.entityId).subscribe({
        next: summary => {
          const previousUnread = this.summary?.unreadCount ?? 0;
          this.summary = summary;
          if (summary.unreadCount !== previousUnread) {
            this.unreadAtLoad = summary.unreadCount;
            this.conversation.getComments(this.entityType, this.entityId).subscribe({
              next: page => {
                this.comments = this.chronological(page.comments || []);
                this.nextBeforeId = page.nextBeforeId;
                this.scrollToLatest();
                this.markLatestRead();
              },
              error: () => undefined
            });
          }
        },
        error: () => undefined
      });
    }
  }

  loadOlder(): void {
    if (this.nextBeforeId === null || this.loadingOlder) return;
    this.loadingOlder = true;
    this.conversation.getComments(this.entityType, this.entityId, this.nextBeforeId).subscribe({
      next: page => {
        this.comments = this.chronological([...(page.comments || []), ...this.comments]);
        this.nextBeforeId = page.nextBeforeId;
        this.loadingOlder = false;
      },
      error: error => {
        this.loadingOlder = false;
        this.notify(error?.status === 403 ? 'You don’t have access to older messages.' : 'Older messages could not be loaded.');
      }
    });
  }

  private markLatestRead(): void {
    const newest = this.comments.reduce((latest, item) => Math.max(latest, Number(item.id) || 0), 0);
    if (!newest) return;
    this.conversation.markRead(this.entityType, this.entityId, newest).subscribe({
      next: () => {
        if (this.summary) this.summary = { ...this.summary, unreadCount: 0 };
        this.unreadSummary.refresh();
      },
      error: () => undefined
    });
  }

  private chronological(items: ConversationComment[]): ConversationComment[] {
    return [...new Map(items.map(item => [item.id, item])).values()]
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() || a.id - b.id);
  }

  showDaySeparator(index: number): boolean {
    if (index === 0) return true;
    return new Date(this.comments[index - 1].createdAt).toDateString() !== new Date(this.comments[index].createdAt).toDateString();
  }

  roleFor(authorId: number): string {
    return this.taggableUsers.find(item => item.id === authorId)?.role ?? '';
  }

  onInput(event: CustomEvent): void {
    const target = event.target as HTMLTextAreaElement;
    const value = String((event as any).detail?.value ?? this.draft);
    this.draft = value;
    void this.messageBox?.getInputElement().then(input => {
      const match = getMentionQuery(value, input.selectionStart ?? value.length);
      this.suggestions = [];
      this.activeMentionQuery = match?.query ?? null;
      this.search$.next(match?.query ?? '\u0000');
    });
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.suggestions.length && event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeSuggestion = (this.activeSuggestion + 1) % this.suggestions.length;
    } else if (this.suggestions.length && event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeSuggestion = (this.activeSuggestion + this.suggestions.length - 1) % this.suggestions.length;
    } else if (this.suggestions.length && event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.selectMention(this.suggestions[this.activeSuggestion]);
    } else if (event.key === 'Enter' && !event.shiftKey && !this.suggestions.length) {
      event.preventDefault();
      this.send();
    } else if (event.key === 'Escape') {
      this.suggestions = [];
      this.activeMentionQuery = null;
    }
  }

  private loadSuggestions(query: string): void {
    if (query === '\u0000') return;
    if (!this.summary?.canPost) return;
    this.conversation.getTaggableUsers(this.entityType, this.entityId, query).subscribe({
      next: users => {
        if (this.activeMentionQuery === query) this.suggestions = (users || []).slice(0, 8);
      },
      error: () => {
        if (this.activeMentionQuery === query) this.suggestions = [];
      }
    });
  }

  async selectMention(user: TaggableUser): Promise<void> {
    const input = await this.messageBox?.getInputElement();
    if (!input) return;
    const match = getMentionQuery(this.draft, input.selectionStart ?? this.draft.length);
    if (!match) return;
    const inserted = insertMention(this.draft, match.start, input.selectionStart ?? this.draft.length, user.username);
    this.draft = inserted.value;
    this.activeMentionQuery = null;
    this.suggestions = [];
    await this.messageBox?.getInputElement().then(element => {
      element.focus();
      element.setSelectionRange(inserted.caret, inserted.caret);
    });
  }

  send(): void {
    const body = this.draft.trim();
    if (!body || body.length > 2000 || !this.online || this.sending || !this.summary?.canPost) return;
    const tempId = -Date.now();
    const pending: ConversationComment = {
      id: tempId, authorId: 0, authorUsername: this.currentUsername, authorFullName: this.currentUsername, body,
      createdAt: new Date().toISOString(), editedAt: null, mine: true, mentions: [], pending: true
    };
    this.comments = [...this.comments, pending];
    this.draft = '';
    this.sending = true;
    this.conversation.postComment(this.entityType, this.entityId, body).subscribe({
      next: response => {
        this.comments = this.chronological([...this.comments.filter(comment => comment.id !== tempId), response.comment]);
        this.scrollToLatest();
        this.sending = false;
        if (response.ignoredMentions?.length) this.notify(`Could not mention: ${response.ignoredMentions.join(', ')}`);
        this.refreshThread(false);
      },
      error: error => {
        this.comments = this.comments.map(comment => comment.id === tempId ? { ...comment, pending: false, failed: true } : comment);
        this.retryBodies.set(tempId, body);
        this.sending = false;
        this.notify(error?.status === 403 ? 'You don’t have permission to post here.' : 'Message not sent. Tap Retry to try again.');
      }
    });
  }

  retry(comment: ConversationComment): void {
    const body = this.retryBodies.get(comment.id);
    if (!body || !this.online) return;
    this.comments = this.comments.map(item => item.id === comment.id ? { ...item, pending: true, failed: false } : item);
    this.conversation.postComment(this.entityType, this.entityId, body).subscribe({
      next: response => {
        this.retryBodies.delete(comment.id);
        this.comments = this.chronological([...this.comments.filter(item => item.id !== comment.id), response.comment]);
        this.scrollToLatest();
      },
      error: error => {
        this.comments = this.comments.map(item => item.id === comment.id ? { ...item, pending: false, failed: true } : item);
        this.notify(error?.status === 403 ? 'You don’t have permission to post here.' : 'Message not sent. Please retry.');
      }
    });
  }

  async edit(comment: ConversationComment): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Edit message',
      inputs: [{ name: 'body', type: 'textarea', value: comment.body, attributes: { maxlength: 2000 } }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Save', handler: data => {
          const body = String(data.body ?? '').trim();
          if (!body || body.length > 2000) return false;
          this.conversation.editComment(this.entityType, this.entityId, comment.id, body).subscribe({
            next: updated => this.comments = this.comments.map(item => item.id === comment.id ? updated : item),
            error: error => this.notify(error?.status === 403 ? 'You can’t edit this message.' : 'Message could not be edited.')
          });
          return true;
        } }
      ]
    });
    await alert.present();
  }

  async openCommentActions(comment: ConversationComment): Promise<void> {
    const sheet = await this.actionSheetController.create({
      header: 'Your message',
      buttons: [
        { text: 'Edit', handler: () => { void this.edit(comment); } },
        { text: 'Delete', role: 'destructive', handler: () => { void this.delete(comment); } },
        { text: 'Cancel', role: 'cancel' }
      ]
    });
    await sheet.present();
  }

  async delete(comment: ConversationComment): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Delete message?',
      message: 'This message will be removed from the conversation.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Delete', role: 'destructive', handler: () => this.conversation.deleteComment(this.entityType, this.entityId, comment.id).subscribe({
          next: () => this.comments = this.comments.filter(item => item.id !== comment.id),
          error: error => this.notify(error?.status === 403 ? 'You can’t delete this message.' : 'Message could not be deleted.')
        }) }
      ]
    });
    await alert.present();
  }

  private searchTaggableUsers(query: string | CustomEvent): void {
    const value = typeof query === 'string' ? query : String((query as any).detail?.value ?? '');
    this.tagQuery = value;
    this.tagSearch$.next(value.trim().replace(/^@/, ''));
  }

  openTagDialog(): void {
    this.tagModalOpen = true;
    this.tagQuery = '@';
    this.selectedUserIds.clear();
    this.selectedUsers = [];
    this.tagSearch$.next('');
  }

  private loadTaggableUsers(query: string): void {
    if (!this.summary?.canManageTags) return;
    this.conversation.getTaggableUsers(this.entityType, this.entityId, query).subscribe({
      next: users => this.taggableUsers = (users || []).slice(0, 8),
      error: error => this.notify(error?.status === 403 ? 'You can’t manage participants.' : 'People could not be loaded.')
    });
  }

  toggleUser(user: TaggableUser): void {
    const next = new Set(this.selectedUserIds);
    if (next.has(user.id)) {
      next.delete(user.id);
      this.selectedUsers = this.selectedUsers.filter(item => item.id !== user.id);
    } else {
      next.add(user.id);
      this.selectedUsers = [...this.selectedUsers, user];
    }
    this.selectedUserIds = next;
  }

  addParticipants(): void {
    const userIds = Array.from(this.selectedUserIds);
    if (!userIds.length) return;
    this.conversation.addParticipants(this.entityType, this.entityId, userIds).subscribe({
      next: () => {
        this.selectedUserIds.clear();
        this.selectedUsers = [];
        this.tagModalOpen = false;
        this.loadInitial();
      },
      error: error => {
        console.error('[ConversationPanel] Failed to add participants', {
          entityType: this.entityType,
          entityId: this.entityId,
          status: error?.status,
          statusText: error?.statusText,
          url: error?.url,
          message: this.errorMessage(error)
        });
        this.notify(this.participantErrorMessage(error));
      }
    });
  }

  private errorMessage(error: any): string {
    const body = error?.error;
    if (typeof body === 'string') return body;
    return body?.message || body?.detail || body?.error || '';
  }

  private participantErrorMessage(error: any): string {
    if (error?.status === 403) return 'You can’t manage participants.';
    const detail = this.errorMessage(error);
    if (error?.status) {
      return `Participants could not be added (HTTP ${error.status})${detail ? `: ${detail}` : '.'}`;
    }
    return 'Could not reach the conversation service. Check your connection and retry.';
  }

  async removeParticipant(participant: ConversationParticipant): Promise<void> {
    const sheet = await this.actionSheetController.create({
      header: `Remove ${participant.fullName || participant.username}?`,
      buttons: [
        { text: 'Remove participant', role: 'destructive', handler: () => {
          this.conversation.removeParticipant(this.entityType, this.entityId, participant.userId).subscribe({
            next: () => {
              if (this.summary) this.summary = { ...this.summary, participants: this.summary.participants.filter(item => item.userId !== participant.userId) };
            },
            error: error => this.notify(error?.status === 403 ? 'You can’t manage participants.' : 'Participant could not be removed.')
          });
        } },
        { text: 'Cancel', role: 'cancel' }
      ]
    });
    await sheet.present();
  }

  private notify(message: string): void {
    void this.toastController.create({ message, duration: 3000, position: 'bottom' }).then(toast => toast.present());
  }
}
