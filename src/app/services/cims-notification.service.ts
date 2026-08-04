import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, interval, combineLatest } from 'rxjs';
import { CimsService } from './cims.service';
import { AuthService } from './auth.service';
import {
  CimsNotification,
  CimsNotificationEventType,
  NotificationSettings,
  NotificationChannel,
  Ticket
} from '../models/cims.models';

const STORAGE_KEY_NOTIFICATIONS = 'cims.notifications';
const STORAGE_KEY_SETTINGS = 'cims.notification.settings';
const STORAGE_KEY_LAST_SEEN = 'cims.notification.lastSeen';

const DEFAULT_SETTINGS: NotificationSettings = {
  emailEnabled: false,
  smsEnabled: false,
  browserEnabled: false,
  email: '',
  phone: '',
  eventTypes: {
    TICKET_CREATED: { email: true, sms: true },
    TICKET_ACKNOWLEDGED: { email: true, sms: true },
    TICKET_ASSIGNED: { email: true, sms: true },
    TICKET_RESOLVED: { email: true, sms: true },
    TICKET_ON_HOLD: { email: true, sms: true },
    TICKET_REOPENED: { email: true, sms: true },
    TICKET_REJECTED: { email: true, sms: true }
  }
};

const EVENT_LABELS: Record<CimsNotificationEventType, string> = {
  TICKET_CREATED: 'Ticket Created',
  TICKET_ACKNOWLEDGED: 'Ticket Acknowledged',
  TICKET_ASSIGNED: 'Reviewer Assigned',
  TICKET_RESOLVED: 'Ticket Resolved',
  TICKET_ON_HOLD: 'Ticket On Hold',
  TICKET_REOPENED: 'Ticket Reopened',
  TICKET_REJECTED: 'Ticket Rejected'
};

@Injectable({ providedIn: 'root' })
export class CimsNotificationService implements OnDestroy {
  private notificationsSubject = new BehaviorSubject<CimsNotification[]>(this.loadNotifications());
  readonly notifications$: Observable<CimsNotification[]> = this.notificationsSubject.asObservable();

  readonly unreadCount$: Observable<number> = new BehaviorSubject<number>(
    this.notificationsSubject.value.filter((n) => !n.read).length
  ).asObservable();

  private settingsSubject = new BehaviorSubject<NotificationSettings>(this.loadSettings());
  readonly settings$: Observable<NotificationSettings> = this.settingsSubject.asObservable();

  private lastSeen: Record<string, string> = this.loadLastSeen();
  private pollSubscription: Subscription | null = null;
  private settingsForPoll: NotificationSettings = this.settingsSubject.value;

  private role: string = '';
  // Becomes true once seedBaseline() has run successfully. Only after that
  // are new ticket ids (not present in the last-seen cache) treated as
  // brand-new tickets worth notifying about.
  private baselineReady = false;

  constructor(private cimsService: CimsService, private authService: AuthService) {
    combineLatest([this.authService.currentUser$, this.settings$]).subscribe(([user, settings]) => {
      this.role = (user?.role || this.authService.getRole() || '').toUpperCase();
      this.settingsForPoll = settings;
    });
  }

  // ============================================================
  // Public API
  // ============================================================

  start(): void {
    if (this.pollSubscription) {
      return;
    }
    this.pollSubscription = interval(30000).subscribe(() => this.poll());
    this.poll(); // immediate first check
  }

  stop(): void {
    this.pollSubscription?.unsubscribe();
    this.pollSubscription = null;
  }

  getNotifications(): CimsNotification[] {
    return this.notificationsSubject.value;
  }

  getUnreadCount(): number {
    return this.notificationsSubject.value.filter((n) => !n.read).length;
  }

  markAllRead(): void {
    const updated = this.notificationsSubject.value.map((n) => ({ ...n, read: true }));
    this.persist(updated);
  }

  markRead(id: string): void {
    const updated = this.notificationsSubject.value.map((n) => (n.id === id ? { ...n, read: true } : n));
    this.persist(updated);
  }

  clearAll(): void {
    this.persist([]);
  }

  getSettings(): NotificationSettings {
    return this.settingsSubject.value;
  }

  updateSettings(settings: NotificationSettings): void {
    this.settingsSubject.next({ ...settings });
    this.persistSettings(settings);
  }

  getLastSeenTickets(): Record<string, string> {
    return { ...this.lastSeen };
  }

  /**
   * Records the current state of the given tickets in the last-seen cache
   * WITHOUT creating notifications. Used to seed the baseline on login so
   * pre-existing tickets don't spam the user.
   */
  seedBaseline(tickets: Ticket[]): void {
    for (const ticket of tickets) {
      this.lastSeen[String(ticket.id)] = ticket.updatedAt;
    }
    this.saveLastSeen();
    this.baselineReady = true;
  }

  /**
   * Creates an in-app notification (and, when enabled, a browser popup and/or
   * email/SMS) for a ticket event. Called right after the current user
   * performs an action (create, acknowledge, assign, resolve, hold, reopen, reject).
   */
  notifyTicketUpdate(
    ticketId: number,
    eventType: CimsNotificationEventType,
    ticket: Partial<Ticket> = {}
  ): void {
    const existing = this.notificationsSubject.value.find(
      (n) => n.ticketId === ticketId && n.eventType === eventType
    );

    // Avoid duplicate notifications for the same ticket + event in this session.
    if (existing) {
      return;
    }

    const notification: CimsNotification = {
      id: this.generateId(ticketId, eventType),
      ticketId,
      eventType,
      title: this.buildTitle(eventType, ticket),
      message: this.buildMessage(eventType, ticket),
      read: false,
      createdAt: new Date().toISOString(),
      incidentTypeName: ticket.incidentTypeName,
      locationName: ticket.locationName,
      priority: ticket.priority,
      status: ticket.status,
      channels: this.resolveChannels(eventType)
    };

    const updated = [notification, ...this.notificationsSubject.value].slice(0, 100);
    this.persist(updated);

    if (this.shouldShowBrowserNotification(eventType)) {
      this.showBrowserNotification(notification);
    }

    this.deliverChannels(notification);
  }

  /**
   * Compares freshly loaded tickets against the last-seen cache and raises
   * notifications for any ticket whose updatedAt has changed, or — once the
   * baseline has been seeded — for any brand-new ticket that appears.
   */
  detectTicketUpdates(tickets: Ticket[]): void {
    for (const ticket of tickets) {
      const key = String(ticket.id);
      const lastUpdatedAt = this.lastSeen[key];

      // A ticket not yet present in the last-seen cache appeared after the
      // baseline was seeded — treat it as a brand-new ticket and notify.
      const isNewTicket = this.baselineReady && lastUpdatedAt === undefined;
      if (isNewTicket || (lastUpdatedAt && lastUpdatedAt !== ticket.updatedAt)) {
        const eventType = this.resolveEventType(ticket.status);
        const existing = this.notificationsSubject.value.find(
          (n) => n.ticketId === ticket.id && n.eventType === eventType
        );
        if (!existing) {
          this.notifyTicketUpdate(ticket.id, eventType, ticket);
        }
      }

      this.lastSeen[key] = ticket.updatedAt;
    }
    this.saveLastSeen();
  }

  /**
   * Requests browser notification permission. Returns true once granted.
   */
  async requestBrowserPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      return false;
    }
    if (Notification.permission === 'granted') {
      return true;
    }
    if (Notification.permission === 'denied') {
      return false;
    }
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  // ============================================================
  // Email / SMS delivery (backend contract)
  // ============================================================

  sendEmailNotification(payload: {
    to: string;
    subject: string;
    body: string;
    ticketId: number;
    eventType: CimsNotificationEventType;
  }): Observable<any> {
    return this.cimsService.sendTicketEmail(payload);
  }

  sendSmsNotification(payload: {
    to: string;
    message: string;
    ticketId: number;
    eventType: CimsNotificationEventType;
  }): Observable<any> {
    return this.cimsService.sendTicketSms(payload);
  }

  // ============================================================
  // Polling pipeline
  // ============================================================

  private poll(): void {
    if (!this.isAuthenticated()) {
      return;
    }

    if (this.role === 'SUPPORT_ENGINEER') {
      this.pollMyTickets();
    } else if (this.role === 'REVIEWER') {
      this.pollReviewQueue();
    } else if (this.role === 'FIELD_PERSON') {
      this.pollFieldPersonQueue();
    } else if (this.role === 'COORDINATOR') {
      this.pollCoordinatorQueue();
    } else if (this.role === 'ADMIN') {
      this.pollAdminTickets();
    }
  }

  private pollMyTickets(): void {
    this.cimsService.getMyTickets(0, 20).subscribe({
      next: (response) => {
        const tickets = Array.isArray(response) ? response : response?.content ?? [];
        this.detectTicketUpdates(tickets);
      },
      error: () => {}
    });
  }

  private pollReviewQueue(): void {
    this.cimsService.getReviewQueue(0, 20).subscribe({
      next: (response) => {
        const tickets = Array.isArray(response) ? response : response?.content ?? [];
        this.detectTicketUpdates(tickets);
      },
      error: () => {}
    });
  }

  private pollFieldPersonQueue(): void {
    this.cimsService.getFieldPersonQueue().subscribe({
      next: (response: any) => {
        const tickets = Array.isArray(response) ? response : (response?.content ?? []);
        this.detectTicketUpdates(tickets ?? []);
      },
      error: () => {}
    });
  }

  private pollCoordinatorQueue(): void {
    this.cimsService.getCoordinatorQueue().subscribe({
      next: (response: any) => {
        const tickets = Array.isArray(response) ? response : (response?.content ?? []);
        this.detectTicketUpdates(tickets ?? []);
      },
      error: () => {}
    });
  }

  private pollAdminTickets(): void {
    this.cimsService.getAllTickets(0, 20).subscribe({
      next: (response) => {
        const tickets = Array.isArray(response) ? response : response?.content ?? [];
        this.detectTicketUpdates(tickets);
      },
      error: () => {}
    });
  }

  // ============================================================
  // Helpers
  // ============================================================

  private isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  private resolveEventType(status: Ticket['status']): CimsNotificationEventType {
    switch (status) {
      case 'OPEN':
        return 'TICKET_CREATED';
      case 'ACKNOWLEDGED':
        return 'TICKET_ACKNOWLEDGED';
      case 'ASSIGNED':
      case 'IN_REVIEW':
        return 'TICKET_ASSIGNED';
      case 'RESOLVED':
        return 'TICKET_RESOLVED';
      case 'PENDING':
        return 'TICKET_ON_HOLD';
      case 'REOPENED':
        return 'TICKET_REOPENED';
      case 'REJECTED':
        return 'TICKET_REJECTED';
    }
  }

  private resolveChannels(eventType: CimsNotificationEventType): NotificationChannel[] {
    const setting = this.settingsForPoll.eventTypes?.[eventType];
    const channels: NotificationChannel[] = [];
    if (this.settingsForPoll.emailEnabled && setting?.email) {
      channels.push('EMAIL');
    }
    if (this.settingsForPoll.smsEnabled && setting?.sms) {
      channels.push('SMS');
    }
    return channels;
  }

  private shouldShowBrowserNotification(eventType: CimsNotificationEventType): boolean {
    return (
      this.settingsForPoll.browserEnabled &&
      'Notification' in window &&
      Notification.permission === 'granted'
    );
  }

  /**
   * Sends email/SMS for a notification when the user has enabled those
   * channels in settings. Failures are logged but never break the in-app
   * notification flow.
   */
  private deliverChannels(notification: CimsNotification): void {
    if (notification.channels.includes('EMAIL') && this.settingsForPoll.email) {
      this.sendEmailNotification({
        to: this.settingsForPoll.email,
        subject: notification.title,
        body: notification.message,
        ticketId: notification.ticketId,
        eventType: notification.eventType
      }).subscribe({
        next: () => {},
        error: (err) => console.warn('[CIMS] Email notification failed:', err)
      });
    }
    if (notification.channels.includes('SMS') && this.settingsForPoll.phone) {
      this.sendSmsNotification({
        to: this.settingsForPoll.phone,
        message: `${notification.title}. ${notification.message}`,
        ticketId: notification.ticketId,
        eventType: notification.eventType
      }).subscribe({
        next: () => {},
        error: (err) => console.warn('[CIMS] SMS notification failed:', err)
      });
    }
  }

  private showBrowserNotification(notification: CimsNotification): void {
    const browserNotification = new Notification(notification.title, {
      body: notification.message,
      tag: notification.id,
      icon: '/favicon.ico'
    });
    browserNotification.onclick = () => {
      const ticketUrl = this.getTicketUrl(notification.ticketId);
      if (ticketUrl) {
        window.open(ticketUrl, '_self');
      }
      browserNotification.close();
    };
  }

  getTicketUrl(ticketId: number): string | null {
    switch (this.role) {
      case 'SUPPORT_ENGINEER':
        return `/cims/support-engineer/tickets/${ticketId}`;
      case 'FIELD_PERSON':
        return `/cims/field-person/tickets/${ticketId}`;
      case 'REVIEWER':
        return `/cims/reviewer/tickets/${ticketId}`;
      case 'COORDINATOR':
        return `/cims/coordinator/tickets/${ticketId}`;
      case 'ADMIN':
        return `/cims/admin/tickets/${ticketId}`;
      default:
        return null;
    }
  }

  private buildTitle(eventType: CimsNotificationEventType, ticket: Partial<Ticket>): string {
    const ticketLabel = ticket.id ? `#${ticket.id}` : '';
    return `${EVENT_LABELS[eventType]} ${ticketLabel}`.trim();
  }

  private buildMessage(eventType: CimsNotificationEventType, ticket: Partial<Ticket>): string {
    const type = ticket.incidentTypeName ? `${ticket.incidentTypeName} at ` : '';
    const location = ticket.locationName ?? 'unknown location';
    const priority = ticket.priority ? ` (${ticket.priority} priority)` : '';
    return `${type}${location}${priority}. Status: ${ticket.status ?? 'updated'}.`;
  }

  private generateId(ticketId: number, eventType: CimsNotificationEventType): string {
    return `${ticketId}-${eventType}-${Date.now()}`;
  }

  private loadNotifications(): CimsNotification[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
      return raw ? (JSON.parse(raw) as CimsNotification[]) : [];
    } catch {
      return [];
    }
  }

  private persist(notifications: CimsNotification[]): void {
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(notifications));
    this.notificationsSubject.next(notifications);
    (this.unreadCount$ as BehaviorSubject<number>).next(notifications.filter((n) => !n.read).length);
  }

  private loadSettings(): NotificationSettings {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (!raw) {
        return { ...DEFAULT_SETTINGS, eventTypes: cloneEventTypes(DEFAULT_SETTINGS.eventTypes) };
      }
      const stored = JSON.parse(raw) as Partial<NotificationSettings>;
      const merged: NotificationSettings = {
        ...DEFAULT_SETTINGS,
        ...stored,
        eventTypes: {
          ...DEFAULT_SETTINGS.eventTypes,
          ...(stored.eventTypes ?? {})
        }
      };
      return merged;
    } catch {
      return { ...DEFAULT_SETTINGS, eventTypes: cloneEventTypes(DEFAULT_SETTINGS.eventTypes) };
    }
  }

  private persistSettings(settings: NotificationSettings): void {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    this.settingsSubject.next(settings);
    this.settingsForPoll = settings;
  }

  private loadLastSeen(): Record<string, string> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_LAST_SEEN);
      return raw ? (JSON.parse(raw) as Record<string, string>) : {};
    } catch {
      return {};
    }
  }

  private saveLastSeen(): void {
    localStorage.setItem(STORAGE_KEY_LAST_SEEN, JSON.stringify(this.lastSeen));
  }

  ngOnDestroy(): void {
    this.stop();
  }
}

function cloneEventTypes(
  eventTypes: NotificationSettings['eventTypes']
): NotificationSettings['eventTypes'] {
  const clone: NotificationSettings['eventTypes'] = {} as NotificationSettings['eventTypes'];
  for (const key of Object.keys(eventTypes) as CimsNotificationEventType[]) {
    clone[key] = { ...eventTypes[key] };
  }
  return clone;
}
