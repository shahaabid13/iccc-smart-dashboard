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
  private notificationsSubject = new BehaviorSubject<CimsNotification[]>([]);
  readonly notifications$: Observable<CimsNotification[]> = this.notificationsSubject.asObservable();

  private unreadCountSubject = new BehaviorSubject<number>(0);
  readonly unreadCount$: Observable<number> = this.unreadCountSubject.asObservable();

  private settingsSubject = new BehaviorSubject<NotificationSettings>(this.loadSettings());
  readonly settings$: Observable<NotificationSettings> = this.settingsSubject.asObservable();

  private lastSeen: Record<string, string> = {};
  private dismissedIds: Set<string> = new Set();
  private clearedAt: string | null = null;
  private baselineReady = false;

  private pollSubscription: Subscription | null = null;
  private authSubscription: Subscription | null = null;
  private settingsForPoll: NotificationSettings = this.settingsSubject.value;

  private role: string = '';
  private username: string = '';
  private userId: string = '';

  constructor(private cimsService: CimsService, private authService: AuthService) {
    this.authSubscription = combineLatest([this.authService.currentUser$, this.settings$]).subscribe(
      ([user, settings]) => {
        const newRole = (user?.role || this.authService.getRole() || '').toUpperCase();
        const newUsername = (user?.username || localStorage.getItem('username') || '').toLowerCase();
        const newUserId = user?.id ? String(user.id) : newUsername;

        const userChanged = newUsername !== this.username || newRole !== this.role;

        this.role = newRole;
        this.username = newUsername;
        this.userId = newUserId;
        this.settingsForPoll = settings;

        if (userChanged && this.username) {
          this.initUserState();
        }
      }
    );

    // Initial load for current session
    this.username = (this.authService.getCurrentUser()?.username || localStorage.getItem('username') || '').toLowerCase();
    this.role = (this.authService.getRole() || '').toUpperCase();
    if (this.username) {
      this.initUserState();
    }
  }

  // ============================================================
  // User-Scoped State Initialization
  // ============================================================

  private getUserKey(key: string): string {
    const user = this.username || 'guest';
    return `${key}_${user}`;
  }

  private initUserState(): void {
    this.clearedAt = localStorage.getItem(this.getUserKey('cims.notification.clearedAt'));
    this.lastSeen = this.loadLastSeen();
    this.dismissedIds = this.loadDismissedIds();

    const notifications = this.loadNotifications();
    this.notificationsSubject.next(notifications);
    this.unreadCountSubject.next(notifications.filter((n) => !n.read).length);

    this.baselineReady = Object.keys(this.lastSeen).length > 0;
  }

  // ============================================================
  // Public API
  // ============================================================

  start(): void {
    if (this.pollSubscription) {
      return;
    }
    this.pollSubscription = interval(25000).subscribe(() => this.poll());
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

  /**
   * "Once clear means clear - no previous notifications"
   * Permanently clears all notifications for the active user.
   * Records a cleared timestamp and stores current ticket hashes so stale
   * tickets never reappear on subsequent polls or page refreshes.
   */
  clearAll(): void {
    const now = new Date().toISOString();
    this.clearedAt = now;
    localStorage.setItem(this.getUserKey('cims.notification.clearedAt'), now);

    // Save all current notification IDs to dismissed so they are permanently blocked
    for (const notif of this.notificationsSubject.value) {
      this.dismissedIds.add(notif.id);
    }
    this.saveDismissedIds();

    // Persist empty list
    this.persist([]);
  }

  /**
   * Dismiss a single notification permanently
   */
  dismissNotification(id: string): void {
    this.dismissedIds.add(id);
    this.saveDismissedIds();

    const updated = this.notificationsSubject.value.filter((n) => n.id !== id);
    this.persist(updated);
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
   * Records the baseline state of existing tickets on first load.
   */
  seedBaseline(tickets: Ticket[]): void {
    for (const ticket of tickets) {
      this.lastSeen[String(ticket.id)] = ticket.updatedAt || ticket.createdAt || new Date().toISOString();
    }
    this.saveLastSeen();
    this.baselineReady = true;
  }

  /**
   * Creates an in-app notification (and browser/email/SMS if enabled).
   * Verifies role-based targeting, clearance timestamp, and deduplication.
   */
  notifyTicketUpdate(
    ticketId: number,
    eventType: CimsNotificationEventType,
    ticket: Partial<Ticket> = {}
  ): void {
    // 1. Role-based check: Only notify if relevant to the logged in user's role
    if (!this.isTicketRelevantForUser(ticket, eventType)) {
      return;
    }

    const notificationId = this.generateId(ticketId, eventType);

    // 2. Clear-state check: If dismissed or created before clearAll() timestamp, reject
    if (this.dismissedIds.has(notificationId)) {
      return;
    }

    const ticketTimestamp = ticket.updatedAt || ticket.createdAt || new Date().toISOString();
    if (this.clearedAt && new Date(ticketTimestamp).getTime() <= new Date(this.clearedAt).getTime()) {
      return;
    }

    // 3. Deduplication check: Avoid multiple notifications for same ticket + event
    const existing = this.notificationsSubject.value.find(
      (n) => n.ticketId === ticketId && n.eventType === eventType
    );
    if (existing) {
      return;
    }

    const notification: CimsNotification = {
      id: notificationId,
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
   * Role-based validation rule:
   * - ADMIN: Receives ALL ticket updates across the entire system.
   * - SUPPORT_ENGINEER: Only receives updates for tickets they created / raised.
   * - FIELD_PERSON / COORDINATOR: Only receives tickets assigned to their queue / their field account.
   * - REVIEWER: Only receives tickets assigned to them for review / in review queue.
   * - USER / AGENCY: Only receives their own tasks / requests.
   */
  private isTicketRelevantForUser(ticket: Partial<Ticket>, eventType: CimsNotificationEventType): boolean {
    const role = this.role.toUpperCase();
    const username = this.username.toLowerCase();

    // 👑 ADMIN: Gets all notifications
    if (role === 'ADMIN') {
      return true;
    }

    // 👷 SUPPORT_ENGINEER: Only tickets created/raised by this engineer
    if (role === 'SUPPORT_ENGINEER') {
      const raisedBy = (ticket.raisedByUsername || ticket.createdBy || '').toLowerCase();
      const raisedById = ticket.raisedByUserId ? String(ticket.raisedByUserId) : '';
      const isOwner = (raisedBy && raisedBy === username) || (raisedById && raisedById === this.userId);

      // Support engineers get notified about status updates on their tickets (acknowledged, assigned, resolved, hold, reopened, rejected)
      return isOwner || eventType === 'TICKET_CREATED';
    }

    // 🔧 FIELD_PERSON / COORDINATOR: Only tickets assigned to this field person
    if (role === 'FIELD_PERSON' || role === 'COORDINATOR') {
      const fieldPerson = (ticket.fieldPersonName || '').toLowerCase();
      const isAssignedToMe = fieldPerson.includes(username) || fieldPerson === username;
      return isAssignedToMe;
    }

    // 🔍 REVIEWER: Only tickets assigned to this reviewer for review
    if (role === 'REVIEWER') {
      const reviewer = (ticket.assignedToReviewerName || '').toLowerCase();
      const isAssignedToMe = reviewer.includes(username) || reviewer === username;
      return isAssignedToMe || ticket.status === 'ASSIGNED' || ticket.status === 'IN_REVIEW';
    }

    // Default users
    return false;
  }

  /**
   * Compares newly polled tickets against lastSeen cache and raises notifications.
   */
  detectTicketUpdates(tickets: Ticket[]): void {
    for (const ticket of tickets) {
      const key = String(ticket.id);
      const lastUpdatedAt = this.lastSeen[key];
      const ticketTimestamp = ticket.updatedAt || ticket.createdAt || new Date().toISOString();

      // Check if ticket was modified after clearance timestamp
      if (this.clearedAt && new Date(ticketTimestamp).getTime() <= new Date(this.clearedAt).getTime()) {
        this.lastSeen[key] = ticketTimestamp;
        continue;
      }

      const isNewTicket = this.baselineReady && lastUpdatedAt === undefined;
      const isUpdatedTicket = lastUpdatedAt !== undefined && lastUpdatedAt !== ticketTimestamp;

      if (isNewTicket || isUpdatedTicket) {
        const eventType = this.resolveEventType(ticket.status);
        const notificationId = this.generateId(ticket.id, eventType);

        if (!this.dismissedIds.has(notificationId)) {
          this.notifyTicketUpdate(ticket.id, eventType, ticket);
        }
      }

      this.lastSeen[key] = ticketTimestamp;
    }
    this.saveLastSeen();
  }

  /**
   * Requests browser notification permission.
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
  // Polling Pipeline
  // ============================================================

  private poll(): void {
    if (!this.isAuthenticated()) {
      return;
    }

    const role = this.role.toUpperCase();

    if (role === 'ADMIN') {
      this.pollAdminTickets();
    } else if (role === 'SUPPORT_ENGINEER') {
      this.pollMyTickets();
    } else if (role === 'REVIEWER') {
      this.pollReviewQueue();
    } else if (role === 'FIELD_PERSON') {
      this.pollFieldPersonQueue();
    } else if (role === 'COORDINATOR') {
      this.pollCoordinatorQueue();
    }
  }

  private pollMyTickets(): void {
    this.cimsService.getMyTickets(0, 30).subscribe({
      next: (response) => {
        const tickets = Array.isArray(response) ? response : response?.content ?? [];
        this.detectTicketUpdates(tickets);
      },
      error: () => {}
    });
  }

  private pollReviewQueue(): void {
    this.cimsService.getReviewQueue(0, 30).subscribe({
      next: (response) => {
        const tickets = Array.isArray(response) ? response : response?.content ?? [];
        this.detectTicketUpdates(tickets);
      },
      error: () => {}
    });
  }

  private pollFieldPersonQueue(): void {
    this.cimsService.getFieldPersonQueue(0, 30).subscribe({
      next: (response: any) => {
        const tickets = Array.isArray(response) ? response : response?.content ?? [];
        this.detectTicketUpdates(tickets ?? []);
      },
      error: () => {}
    });
  }

  private pollCoordinatorQueue(): void {
    this.cimsService.getCoordinatorQueue(0, 30).subscribe({
      next: (response: any) => {
        const tickets = Array.isArray(response) ? response : response?.content ?? [];
        this.detectTicketUpdates(tickets ?? []);
      },
      error: () => {}
    });
  }

  private pollAdminTickets(): void {
    this.cimsService.getAllTickets(0, 50).subscribe({
      next: (response) => {
        const tickets = Array.isArray(response) ? response : response?.content ?? [];
        this.detectTicketUpdates(tickets);
      },
      error: () => {}
    });
  }

  // ============================================================
  // Helpers & Persistence
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
      default:
        return 'TICKET_CREATED';
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

  private deliverChannels(notification: CimsNotification): void {
    if (notification.channels.includes('EMAIL') && this.settingsForPoll.email) {
      this.cimsService
        .sendTicketEmail({
          to: this.settingsForPoll.email,
          subject: notification.title,
          body: notification.message,
          ticketId: notification.ticketId,
          eventType: notification.eventType
        })
        .subscribe({
          next: () => {},
          error: (err) => console.warn('[CIMS] Email notification failed:', err)
        });
    }
    if (notification.channels.includes('SMS') && this.settingsForPoll.phone) {
      this.cimsService
        .sendTicketSms({
          to: this.settingsForPoll.phone,
          message: `${notification.title}. ${notification.message}`,
          ticketId: notification.ticketId,
          eventType: notification.eventType
        })
        .subscribe({
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
        return `/cims/admin/tickets/${ticketId}`;
    }
  }

  private buildTitle(eventType: CimsNotificationEventType, ticket: Partial<Ticket>): string {
    const ticketLabel = ticket.id ? `#${ticket.id}` : '';
    return `${EVENT_LABELS[eventType]} ${ticketLabel}`.trim();
  }

  private buildMessage(eventType: CimsNotificationEventType, ticket: Partial<Ticket>): string {
    const type = ticket.incidentTypeName ? `${ticket.incidentTypeName}` : 'Incident';
    const location = ticket.locationName ? ` at ${ticket.locationName}` : '';
    const priority = ticket.priority ? ` [${ticket.priority} Priority]` : '';
    return `${type}${location}${priority} - Status: ${ticket.status ?? 'Updated'}.`;
  }

  private generateId(ticketId: number, eventType: CimsNotificationEventType): string {
    return `notif_${ticketId}_${eventType}`;
  }

  private loadNotifications(): CimsNotification[] {
    try {
      const raw = localStorage.getItem(this.getUserKey('cims.notifications'));
      return raw ? (JSON.parse(raw) as CimsNotification[]) : [];
    } catch {
      return [];
    }
  }

  private persist(notifications: CimsNotification[]): void {
    localStorage.setItem(this.getUserKey('cims.notifications'), JSON.stringify(notifications));
    this.notificationsSubject.next(notifications);
    this.unreadCountSubject.next(notifications.filter((n) => !n.read).length);
  }

  private loadSettings(): NotificationSettings {
    try {
      const raw = localStorage.getItem('cims.notification.settings');
      if (!raw) {
        return { ...DEFAULT_SETTINGS, eventTypes: cloneEventTypes(DEFAULT_SETTINGS.eventTypes) };
      }
      const stored = JSON.parse(raw) as Partial<NotificationSettings>;
      return {
        ...DEFAULT_SETTINGS,
        ...stored,
        eventTypes: {
          ...DEFAULT_SETTINGS.eventTypes,
          ...(stored.eventTypes ?? {})
        }
      };
    } catch {
      return { ...DEFAULT_SETTINGS, eventTypes: cloneEventTypes(DEFAULT_SETTINGS.eventTypes) };
    }
  }

  private persistSettings(settings: NotificationSettings): void {
    localStorage.setItem('cims.notification.settings', JSON.stringify(settings));
    this.settingsSubject.next(settings);
    this.settingsForPoll = settings;
  }

  private loadLastSeen(): Record<string, string> {
    try {
      const raw = localStorage.getItem(this.getUserKey('cims.notification.lastSeen'));
      return raw ? (JSON.parse(raw) as Record<string, string>) : {};
    } catch {
      return {};
    }
  }

  private saveLastSeen(): void {
    localStorage.setItem(this.getUserKey('cims.notification.lastSeen'), JSON.stringify(this.lastSeen));
  }

  private loadDismissedIds(): Set<string> {
    try {
      const raw = localStorage.getItem(this.getUserKey('cims.notification.dismissed'));
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  }

  private saveDismissedIds(): void {
    localStorage.setItem(
      this.getUserKey('cims.notification.dismissed'),
      JSON.stringify(Array.from(this.dismissedIds))
    );
  }

  ngOnDestroy(): void {
    this.stop();
    this.authSubscription?.unsubscribe();
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
