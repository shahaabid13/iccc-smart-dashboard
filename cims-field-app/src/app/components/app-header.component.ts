import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { FieldReminder, FieldReminderService } from '../services/field-reminder.service';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonBackButton,
  IonBadge,
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonBackButton,
    IonBadge,
    IonButton,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonPopover
  ],
  template: `
    <ion-header [translucent]="translucent">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>

        <div class="header-branding">
          <img 
            src="assets/IMG_20251203_100849.jpg" 
            alt="Logo" 
            class="header-logo"
          />
          <span class="app-name">Field Responder App</span>
        </div>

        <ion-buttons slot="end">
          <ion-button [id]="reminderTriggerId" aria-label="Ticket reminders">
            <ion-icon name="notifications-outline"></ion-icon>
            <ion-badge *ngIf="unreadCount > 0" color="danger" class="reminder-count">{{ unreadCount > 99 ? '99+' : unreadCount }}</ion-badge>
          </ion-button>
          <ion-back-button *ngIf="showBackButton" defaultHref="/tickets" text="" icon="arrow-back-outline"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-popover [trigger]="reminderTriggerId" triggerAction="click" [dismissOnSelect]="false" [showBackdrop]="false">
      <ng-template>
        <ion-content class="reminder-popover">
          <div class="reminder-heading">
            <strong>Ticket reminders</strong>
            <ion-button fill="clear" size="small" [disabled]="unreadCount === 0" (click)="markAllRead()">Mark all read</ion-button>
          </div>
            <ion-list *ngIf="reminders.length; else noReminders">
            <ion-item button detail="false" *ngFor="let reminder of reminders" (click)="openReminder(reminder)">
              <ion-label>
                <h3>{{ reminder.title }}</h3>
                <p class="ion-text-wrap">{{ reminder.message }}</p>
                <p>{{ timeAgo(reminder.createdAt) }}</p>
              </ion-label>
              <ion-badge *ngIf="!reminder.read" color="danger" slot="end">New</ion-badge>
            </ion-item>
          </ion-list>
          <ng-template #noReminders>
            <p class="empty-reminders" *ngIf="remindersSupported !== false">No ticket reminders.</p>
            <p class="empty-reminders unavailable" *ngIf="remindersSupported === false">Reminders are not enabled on this server.</p>
          </ng-template>
          <ion-button *ngIf="canEnableDesktopAlerts && remindersSupported !== false" fill="clear" size="small" (click)="enableDesktopAlerts()">{{ desktopAlertsLabel }}</ion-button>
        </ion-content>
      </ng-template>
    </ion-popover>
  `,
  styles: [`
    .header-branding {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
      margin-left: 0;
      min-width: 0;
    }

    .header-logo {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
    }

    .app-name {
      font-size: 16px;
      font-weight: 600;
      color: var(--ion-text-color, #000);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .reminder-count { position: absolute; top: 2px; right: 0; font-size: 10px; }
    .reminder-popover { --width: min(360px, calc(100vw - 24px)); --max-height: 70vh; }
    .reminder-heading { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px 0; }
    .empty-reminders { padding: 16px; color: var(--ion-color-medium); text-align: center; }

    ion-back-button {
      --icon-size: 20px;
      --padding-start: 4px;
      --padding-end: 4px;
      --color: white;
    }

    @media (max-width: 480px) {
      .app-name {
        font-size: 14px;
      }
    }

    @media (max-width: 360px) {
      .app-name {
        display: none;
      }
    }
  `]
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  private static nextInstanceId = 0;
  readonly reminderTriggerId = `field-reminder-trigger-${AppHeaderComponent.nextInstanceId++}`;
  @Input() translucent = true;
  showBackButton = false;
  reminders: FieldReminder[] = [];
  unreadCount = 0;
  remindersSupported: boolean | null = null;
  canEnableDesktopAlerts = false;
  desktopAlertsLabel = 'Enable desktop alerts';
  private sub?: Subscription;
  private remindersSub?: Subscription;
  private unreadSub?: Subscription;
  private supportedSub?: Subscription;

  constructor(
    private router: Router,
    private location: Location,
    private reminderService: FieldReminderService
  ) {}

  ngOnInit(): void {
    this.updateBackButton();
    this.remindersSub = this.reminderService.reminders$.subscribe(items => this.reminders = items);
    this.unreadSub = this.reminderService.unreadCount$.subscribe(count => this.unreadCount = count);
    this.supportedSub = this.reminderService.remindersSupported$.subscribe(value => this.remindersSupported = value);
    this.desktopAlertsLabel = Capacitor.isNativePlatform() ? 'Enable mobile notifications' : 'Enable desktop alerts';
    this.refreshNotificationPermission();
    this.sub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.updateBackButton());
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.remindersSub?.unsubscribe();
    this.unreadSub?.unsubscribe();
    this.supportedSub?.unsubscribe();
  }

  private updateBackButton(): void {
    const url = this.router.url;
    const isMainRoute = ['/', '/login', '/dashboard', '/tickets', '/tasks', '/home'].includes(url) || url.startsWith('/tickets?') || url.startsWith('/tasks?');
    this.showBackButton = !isMainRoute;
  }

  goBack(): void {
    this.location.back();
  }

  openReminder(reminder: FieldReminder): void {
    void this.reminderService.markRead(reminder);
  }

  markAllRead(): void {
    this.reminderService.markAllRead();
  }

  async enableDesktopAlerts(): Promise<void> {
    this.canEnableDesktopAlerts = !(await this.reminderService.requestDesktopPermission());
  }

  private refreshNotificationPermission(): void {
    if (Capacitor.isNativePlatform()) {
      void LocalNotifications.checkPermissions().then(result => this.canEnableDesktopAlerts = result.display !== 'granted');
      return;
    }
    this.canEnableDesktopAlerts = typeof Notification !== 'undefined' && Notification.permission !== 'granted';
  }

  timeAgo(timestamp: string): string {
    const timestampMs = new Date(timestamp).getTime();
    if (!Number.isFinite(timestampMs)) return '';
    const minutes = Math.max(0, Math.floor((Date.now() - timestampMs) / 60000));
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }
}