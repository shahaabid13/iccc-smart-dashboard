import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { BehaviorSubject, EMPTY, Subscription, fromEvent, merge, timer } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { getApiBaseUrl } from '../../environments/environment';

export interface FieldReminder {
  id: string;
  ticketId: number;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  type?: string;
  eventType?: string;
}

type ReminderUnreadCount = number | { count?: number; unreadCount?: number; unread?: number };

interface ReminderResponse {
  unreadCount: ReminderUnreadCount;
  notifications: FieldReminder[] | { content?: FieldReminder[]; data?: FieldReminder[] };
}

@Injectable({ providedIn: 'root' })
export class FieldReminderService implements OnDestroy {
  private readonly baseUrl = `${getApiBaseUrl()}/api/notifications`;
  private remindersSubject = new BehaviorSubject<FieldReminder[]>([]);
  readonly reminders$ = this.remindersSubject.asObservable();
  private unreadSubject = new BehaviorSubject(0);
  readonly unreadCount$ = this.unreadSubject.asObservable();
  private supportedSubject = new BehaviorSubject<boolean | null>(null);
  readonly remindersSupported$ = this.supportedSubject.asObservable();
  private polling?: Subscription;
  private readonly seenKey = 'field-app.seen-reminder-ids';
  private readonly lastIdKey = 'field-app.last-reminder-id';
  private seenIds = this.loadSeenIds();
  private actionListenerReady = false;

  constructor(private http: HttpClient, private router: Router, private toastController: ToastController) {}

  start(): void {
    if (this.polling) return;
    void this.installNativeActionListener();
    if (Capacitor.isNativePlatform()) {
      void LocalNotifications.createChannel({
        id: 'ticket-reminders',
        name: 'Ticket reminders',
        description: 'Time-sensitive assigned ticket reminders',
        importance: 5,
        visibility: 1,
        vibration: true
      });
    }
    const visibleAgain$ = typeof document === 'undefined'
      ? EMPTY
      : fromEvent(document, 'visibilitychange').pipe(
          filter(() => document.visibilityState === 'visible'),
          map(() => 0)
        );

    this.polling = merge(timer(0, 60000), visibleAgain$)
      .pipe(
        filter(() => typeof document === 'undefined' || document.visibilityState === 'visible'),
        switchMap(() => this.fetchReminders().pipe(catchError(error => {
          if (error?.status === 404) {
            this.supportedSubject.next(false);
            this.stop();
          }
          return EMPTY;
        })))
      )
      .subscribe(response => {
        this.supportedSubject.next(true);
        this.applyResponse(response);
      });
  }

  stop(): void {
    this.polling?.unsubscribe();
    this.polling = undefined;
  }

  async markRead(reminder: FieldReminder): Promise<void> {
    this.remindersSubject.next(this.remindersSubject.value.map(item => item.id === reminder.id ? { ...item, read: true } : item));
    this.unreadSubject.next(Math.max(0, this.unreadSubject.value - (reminder.read ? 0 : 1)));
    this.http.put(`${this.baseUrl}/${encodeURIComponent(reminder.id)}/read`, {}).pipe(catchError(() => EMPTY)).subscribe();
    const ticketId = Number(reminder.ticketId);
    if (Number.isSafeInteger(ticketId) && ticketId > 0) {
      await this.router.navigate(['/tickets', ticketId]);
    } else {
      await this.router.navigate(['/tickets']);
    }
  }

  markAllRead(): void {
    this.remindersSubject.next(this.remindersSubject.value.map(item => ({ ...item, read: true })));
    this.unreadSubject.next(0);
    this.http.put(`${this.baseUrl}/mark-all-read`, {}).pipe(catchError(() => EMPTY)).subscribe();
  }

  async requestDesktopPermission(): Promise<boolean> {
    if (Capacitor.isNativePlatform()) {
      const result = await LocalNotifications.requestPermissions();
      return result.display === 'granted';
    }
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      return (await Notification.requestPermission()) === 'granted';
    }
    return typeof Notification !== 'undefined' && Notification.permission === 'granted';
  }

  ngOnDestroy(): void {
    this.stop();
  }

  private fetchReminders() {
    return this.http.get<ReminderUnreadCount>(`${this.baseUrl}/unread-count`).pipe(
      switchMap(countResponse => this.http.get<any>(this.baseUrl, {
        params: { type: 'TICKET_REMINDER', sort: 'createdAt,desc' }
      }).pipe(
        map(feed => ({ unreadCount: countResponse, notifications: feed })),
        catchError(() => this.http.get<any>(`${this.baseUrl}/unread`, {
          params: { type: 'TICKET_REMINDER', sort: 'createdAt,desc' }
        }).pipe(map(feed => ({ unreadCount: countResponse, notifications: feed }))))
      ))
    );
  }

  private applyResponse(response: ReminderResponse): void {
    const rawCount = typeof response.unreadCount === 'number'
      ? response.unreadCount
      : Number(response.unreadCount?.unreadCount ?? response.unreadCount?.count ?? response.unreadCount?.unread ?? 0);
    const feed = response.notifications as any;
    const rows: any[] = Array.isArray(feed) ? feed : feed?.content ?? feed?.data ?? [];
    const reminders = rows
      .filter(item => !item.type && !item.eventType || (item.type || item.eventType) === 'TICKET_REMINDER')
      .map(item => {
        const rawTicketId = item.ticketId ?? item.ticketID ?? item.ticket_id ?? item.ticket?.id;
        const parsedTicketId = Number(rawTicketId);
        const ticketId = Number.isSafeInteger(parsedTicketId) && parsedTicketId > 0 ? parsedTicketId : 0;
        return {
          id: String(item.id),
          ticketId,
          title: item.title || `Ticket reminder${ticketId ? ` #${ticketId}` : ''}`,
          message: item.message || 'A ticket is waiting for your attention.',
          createdAt: item.createdAt,
          read: item.read ?? false
        };
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const firstPoll = !localStorage.getItem(this.lastIdKey);
    const newItems = reminders.filter(item => !this.seenIds.has(item.id));
    if (firstPoll && newItems.length > 1) newItems.splice(1);
    newItems.reverse().forEach(item => void this.showReminder(item));
    reminders.forEach(item => this.seenIds.add(item.id));
    this.seenIds = new Set(Array.from(this.seenIds).slice(-500));
    localStorage.setItem(this.seenKey, JSON.stringify(Array.from(this.seenIds)));
    if (reminders.length) localStorage.setItem(this.lastIdKey, reminders[0].id);
    this.remindersSubject.next(reminders);
    this.unreadSubject.next(Number.isFinite(rawCount) ? rawCount : reminders.filter(item => !item.read).length);
    this.updateTitle(this.unreadSubject.value);
  }

  private async showReminder(reminder: FieldReminder): Promise<void> {
    const toast = await this.toastController.create({
      message: reminder.message,
      buttons: [{ text: 'View', handler: () => { void this.markRead(reminder); } }],
      duration: 9000,
      color: 'danger',
      position: 'top',
      cssClass: 'field-reminder-toast'
    });
    await toast.present();

    if (Capacitor.isNativePlatform()) {
      const permission = await LocalNotifications.checkPermissions();
      if (permission.display === 'granted') {
        await LocalNotifications.schedule({
          notifications: [{
            id: this.nativeId(reminder.id),
            title: reminder.title,
            body: reminder.message,
            largeBody: reminder.message,
            channelId: 'ticket-reminders',
            smallIcon: 'ic_stat_cims_notification',
            iconColor: '#1457b7',
            extra: { ticketId: reminder.ticketId, reminderId: reminder.id },
            schedule: { at: new Date(Date.now() + 1000) }
          }]
        });
      }
      return;
    }

    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      const notification = new Notification(reminder.title, { body: reminder.message, tag: reminder.id });
      notification.onclick = () => {
        window.focus();
        void this.markRead(reminder);
        notification.close();
      };
    }
  }

  private async installNativeActionListener(): Promise<void> {
    if (!Capacitor.isNativePlatform() || this.actionListenerReady) return;
    this.actionListenerReady = true;
    await LocalNotifications.addListener('localNotificationActionPerformed', action => {
      const ticketId = Number(action.notification.extra?.['ticketId']);
      if (ticketId) void this.router.navigate(['/tickets', ticketId]);
    });
  }

  private nativeId(id: string): number {
    let hash = 0;
    for (let index = 0; index < id.length; index++) hash = (hash * 31 + id.charCodeAt(index)) | 0;
    return Math.abs(hash || 1);
  }

  private updateTitle(count: number): void {
    if (typeof document === 'undefined') return;
    const title = document.title.replace(/^\(\d+\)\s*/, '');
    document.title = count ? `(${count}) ${title}` : title;
  }

  private loadSeenIds(): Set<string> {
    try {
      return new Set<string>(JSON.parse(localStorage.getItem(this.seenKey) || '[]'));
    } catch {
      return new Set<string>();
    }
  }
}