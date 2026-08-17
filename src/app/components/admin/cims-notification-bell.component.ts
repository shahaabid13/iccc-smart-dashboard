import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CimsNotificationService } from '../../services/cims-notification.service';
import { CimsService } from '../../services/cims.service';
import { CimsNotification } from '../../models/cims.models';

@Component({
  selector: 'app-cims-notification-bell',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="cims-notification-wrap">
      <!-- Bell Button -->
      <button class="bell-button" (click)="toggleDropdown($event)" [attr.aria-label]="'Notifications'">
        <span class="bell-icon">🔔</span>
        <span class="badge" *ngIf="unreadCount > 0">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
      </button>

      <!-- Dropdown Panel -->
      <div class="notification-panel" *ngIf="isOpen" (click)="$event.stopPropagation()">
        <div class="panel-header">
          <span class="panel-title">Notifications</span>
          <div class="panel-actions">
            <button class="panel-action" (click)="markAllRead()" [disabled]="unreadCount === 0">Mark all read</button>
            <button class="panel-action" (click)="clearAll()" [disabled]="allNotifications.length === 0">Clear</button>
          </div>
        </div>

        <div class="panel-body">
          <div *ngIf="displayedNotifications.length === 0" class="empty-state">
            <span class="empty-icon">🔕</span>
            <p>No new notifications</p>
            <small>Updates will appear here once available.</small>
          </div>

          <div *ngFor="let notification of displayedNotifications" class="notification-item"
               [class.unread]="!notification.read"
               (click)="openNotification(notification)">
            <div class="item-icon">{{ getEventIcon(notification.eventType) }}</div>
            <div class="item-content">
              <div class="item-title">{{ notification.title }}</div>
              <div class="item-message">{{ notification.message }}</div>
              <div class="item-meta">
                <span>{{ notification.createdAt | date: 'medium' }}</span>
                <span class="channels" *ngIf="notification.channels.length > 0">
                  {{ notification.channels.join(' · ') }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="panel-footer">
          <a class="settings-link" (click)="openSettings()">Notification settings ⚙️</a>
        </div>
      </div>
    </div>
  `,
styles: [
    `
      .cims-notification-wrap {
        position: relative;
        display: inline-block;
      }

      .bell-button {
        position: relative;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 6px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s ease;
      }

      .bell-button:hover {
        background: rgba(255, 255, 255, 0.15);
      }

      .bell-icon {
        font-size: 20px;
        line-height: 1;
      }

      .badge {
        position: absolute;
        top: -2px;
        right: -4px;
        background: #ff5252;
        color: white;
        font-size: 10px;
        font-weight: 700;
        min-width: 18px;
        height: 18px;
        line-height: 18px;
        border-radius: 9px;
        padding: 0 4px;
        text-align: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }

      .notification-panel {
        position: absolute;
        top: 44px;
        right: 0;
        width: 360px;
        max-width: calc(100vw - 24px);
        background: #fff;
        color: #212529;
        border-radius: 10px;
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.18);
        z-index: 1300;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        max-height: 480px;
      }

      .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        border-bottom: 1px solid #eee;
        background: #f8f9fa;
      }

      .panel-title {
        font-weight: 700;
        font-size: 15px;
      }

      .panel-actions {
        display: flex;
        gap: 12px;
      }

      .panel-action {
        background: none;
        border: none;
        color: #0056b3;
        font-size: 12px;
        cursor: pointer;
        padding: 0;
      }

      .panel-action:disabled {
        color: #aaa;
        cursor: default;
      }

      .panel-body {
        overflow-y: auto;
        flex: 1;
      }

      .notification-item {
        display: flex;
        gap: 12px;
        padding: 12px 16px;
        border-bottom: 1px solid #f1f1f1;
        cursor: pointer;
        transition: background 0.15s ease;
      }

      .notification-item:hover {
        background: #f5f7ff;
      }

      .notification-item.unread {
        background: #eef3ff;
      }

      .notification-item.unread:hover {
        background: #e3ebff;
      }

      .item-icon {
        font-size: 20px;
        flex-shrink: 0;
        margin-top: 2px;
      }

      .item-content {
        min-width: 0;
        flex: 1;
      }

      .item-title {
        font-weight: 600;
        font-size: 13.5px;
        color: #1a1a2e;
      }

      .item-message {
        font-size: 12.5px;
        color: #555;
        margin-top: 3px;
        line-height: 1.45;
        word-break: break-word;
      }

      .item-meta {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        margin-top: 6px;
        font-size: 11px;
        color: #999;
      }

      .channels {
        font-weight: 600;
        color: #6c757d;
      }

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 20px;
        gap: 6px;
        color: #999;
        text-align: center;
      }

      .empty-icon {
        font-size: 36px;
      }

      .empty-state p {
        margin: 0;
        font-weight: 600;
        color: #666;
      }

      .empty-state small {
        font-size: 12px;
      }

      .panel-footer {
        border-top: 1px solid #eee;
        background: #f8f9fa;
        padding: 10px 16px;
        text-align: center;
      }

      .settings-link {
        font-size: 13px;
        font-weight: 600;
        color: #0056b3;
        cursor: pointer;
        text-decoration: none;
      }

      .settings-link:hover {
        text-decoration: underline;
      }

      @media (max-width: 480px) {
        .notification-panel {
          position: fixed;
          top: 56px;
          right: 8px;
          left: 8px;
          width: auto;
          max-width: none;
        }
      }
    `
  ]
})
export class CimsNotificationBellComponent implements OnInit, OnDestroy {
  allNotifications: CimsNotification[] = [];
  displayedNotifications: CimsNotification[] = [];
  unreadCount = 0;
  isOpen = false;

  constructor(
    private notificationService: CimsNotificationService,
    private cimsService: CimsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe((items) => {
      this.allNotifications = items;
      this.displayedNotifications = items.filter(n => !n.read);
      this.unreadCount = this.displayedNotifications.length;
    });

    this.startPolling();
  }

  ngOnDestroy(): void {
    this.notificationService.stop();
  }

  private startPolling(): void {
    this.notificationService.start();
    this.seedBaseline();
  }

  private seedBaseline(): void {
    const role = localStorage.getItem('role')?.toUpperCase();
    if (role === 'SUPPORT_ENGINEER') {
      this.cimsService.getMyTickets(0, 20).subscribe({
        next: (response) => {
          const tickets = Array.isArray(response) ? response : response?.content ?? [];
          this.notificationService.seedBaseline(tickets);
        },
        error: () => {}
      });
    } else if (role === 'REVIEWER') {
      this.cimsService.getReviewQueue(0, 20).subscribe({
        next: (response) => {
          const tickets = Array.isArray(response) ? response : response?.content ?? [];
          this.notificationService.seedBaseline(tickets);
        },
        error: () => {}
      });
    } else if (role === 'FIELD_PERSON' || role === 'COORDINATOR') {
      this.cimsService.getFieldPersonQueue().subscribe({
        next: (response: any) => {
          const tickets = Array.isArray(response) ? response : (response?.content ?? []);
          this.notificationService.seedBaseline(tickets ?? []);
        },
        error: () => {}
      });
    } else if (role === 'ADMIN') {
      this.cimsService.getAllTickets(0, 20).subscribe({
        next: (response) => {
          const tickets = Array.isArray(response) ? response : response?.content ?? [];
          this.notificationService.seedBaseline(tickets);
        },
        error: () => {}
      });
    }
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  openNotification(notification: CimsNotification): void {
    this.notificationService.markRead(notification.id);
    const url = this.notificationService.getTicketUrl(notification.ticketId);
    if (url) {
      this.isOpen = false;
      this.router.navigate([url]);
    }
  }

  markAllRead(): void {
    this.notificationService.markAllRead();
  }

  clearAll(): void {
    this.notificationService.clearAll();
  }

  openSettings(): void {
    this.isOpen = false;
    this.router.navigate(['/cims/notifications/settings']);
  }

  getEventIcon(eventType: string): string {
    switch (eventType) {
      case 'TICKET_CREATED':
        return '🎫';
      case 'TICKET_ACKNOWLEDGED':
        return '✅';
      case 'TICKET_ASSIGNED':
        return '🧑‍💼';
      case 'TICKET_RESOLVED':
        return '🎉';
      case 'TICKET_ON_HOLD':
        return '⏸️';
      case 'TICKET_REOPENED':
        return '🔄';
      case 'TICKET_REJECTED':
        return '❌';
      default:
        return '🔔';
    }
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.isOpen = false;
  }
}
