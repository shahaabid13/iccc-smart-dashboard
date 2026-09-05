import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CimsNotificationService } from '../../services/cims-notification.service';
import { CimsService } from '../../services/cims.service';
import { AuthService } from '../../services/auth.service';
import { CimsNotification, CimsNotificationEventType } from '../../models/cims.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cims-notification-bell',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  template: `
    <div class="notif-wrapper">
      <!-- Bell Trigger Button -->
      <button
        class="bell-btn"
        (click)="toggleDropdown($event)"
        [class.has-unread]="unreadCount > 0"
        [class.is-open]="isOpen"
        aria-label="Toggle notifications menu"
        type="button"
      >
        <mat-icon class="bell-mat-icon">
          {{ unreadCount > 0 ? 'notifications_active' : 'notifications' }}
        </mat-icon>
        <span class="unread-badge" *ngIf="unreadCount > 0">
          {{ unreadCount > 99 ? '99+' : unreadCount }}
        </span>
        <span class="pulse-ring" *ngIf="unreadCount > 0"></span>
      </button>

      <!-- Dropdown Flyout Panel -->
      <div class="notif-panel" *ngIf="isOpen" (click)="$event.stopPropagation()">
        <!-- Panel Header -->
        <div class="panel-header">
          <div class="header-left">
            <span class="header-title">Notifications</span>
            <span class="unread-pill" *ngIf="unreadCount > 0">{{ unreadCount }} new</span>
          </div>
          <div class="header-actions">
            <button
              class="action-btn"
              (click)="markAllRead()"
              [disabled]="unreadCount === 0"
              title="Mark all as read"
            >
              <mat-icon class="btn-icon">done_all</mat-icon>
              <span>Mark read</span>
            </button>
            <button
              class="action-btn clear-btn"
              (click)="clearAll()"
              [disabled]="allNotifications.length === 0"
              title="Clear all notifications permanently"
            >
              <mat-icon class="btn-icon">delete_sweep</mat-icon>
              <span>Clear</span>
            </button>
          </div>
        </div>

        <!-- Filter Tabs -->
        <div class="panel-tabs">
          <button
            class="tab-btn"
            [class.active]="activeTab === 'all'"
            (click)="setTab('all')"
          >
            All ({{ allNotifications.length }})
          </button>
          <button
            class="tab-btn"
            [class.active]="activeTab === 'unread'"
            (click)="setTab('unread')"
          >
            Unread ({{ unreadCount }})
          </button>
        </div>

        <!-- Panel Body: List of Notifications -->
        <div class="panel-body">
          <div *ngIf="visibleNotifications.length === 0" class="empty-state">
            <div class="empty-icon-wrap">
              <mat-icon class="empty-icon">notifications_paused</mat-icon>
            </div>
            <p class="empty-title">All caught up!</p>
            <span class="empty-subtitle">
              {{ activeTab === 'unread' ? 'You have no unread notifications.' : 'No notifications for your role at this time.' }}
            </span>
          </div>

          <div
            *ngFor="let item of visibleNotifications"
            class="notif-item"
            [class.unread]="!item.read"
            (click)="openNotification(item)"
          >
            <!-- Event Icon Badge -->
            <div class="icon-avatar" [ngClass]="getEventColorClass(item.eventType)">
              <mat-icon class="avatar-mat-icon">{{ getEventMatIcon(item.eventType) }}</mat-icon>
            </div>

            <!-- Content Details -->
            <div class="item-details">
              <div class="item-top-row">
                <span class="item-title">{{ item.title }}</span>
                <span class="item-time">{{ formatTimeAgo(item.createdAt) }}</span>
              </div>

              <div class="item-message">{{ item.message }}</div>

              <!-- Tags / Meta -->
              <div class="item-meta-tags">
                <span class="tag tag-id" *ngIf="item.ticketId">#{{ item.ticketId }}</span>
                <span class="tag tag-status" *ngIf="item.status">{{ formatStatus(item.status) }}</span>
                <span
                  class="tag tag-priority"
                  *ngIf="item.priority"
                  [ngClass]="'priority-' + item.priority.toLowerCase()"
                >
                  {{ item.priority }}
                </span>
                <span class="tag tag-location" *ngIf="item.locationName">{{ item.locationName }}</span>
              </div>
            </div>

            <!-- Dismiss Single Item Button -->
            <button
              class="dismiss-btn"
              (click)="dismissItem($event, item.id)"
              title="Dismiss notification"
              aria-label="Dismiss"
            >
              <mat-icon class="dismiss-icon">close</mat-icon>
            </button>

            <!-- Unread Blue Indicator Dot -->
            <div class="unread-dot" *ngIf="!item.read"></div>
          </div>
        </div>

        <!-- Panel Footer -->
        <div class="panel-footer">
          <div class="role-badge">
            <mat-icon class="role-icon">badge</mat-icon>
            <span>{{ userRoleLabel }}</span>
          </div>
          <a class="settings-action" (click)="openSettings()">
            <mat-icon class="settings-icon">settings</mat-icon>
            <span>Settings</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      * {
        box-sizing: border-box;
      }

      .notif-wrapper {
        position: relative;
        display: inline-flex;
        align-items: center;
      }

      /* ---------- TRIGGER BELL BUTTON ---------- */
      .bell-btn {
        position: relative;
        width: 38px;
        height: 38px;
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.22);
        cursor: pointer;
        padding: 0;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        outline: none;
      }

      .bell-btn:hover {
        background: rgba(255, 255, 255, 0.24);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
      }

      .bell-btn.is-open {
        background: #ffffff;
        color: #1e40af;
        border-color: #ffffff;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
      }

      .bell-mat-icon {
        font-size: 21px;
        width: 21px;
        height: 21px;
        line-height: 21px;
      }

      .unread-badge {
        position: absolute;
        top: -3px;
        right: -3px;
        background: #ef4444;
        color: #ffffff;
        font-size: 10px;
        font-weight: 700;
        min-width: 18px;
        height: 18px;
        line-height: 18px;
        border-radius: 9px;
        padding: 0 4px;
        text-align: center;
        box-shadow: 0 2px 5px rgba(239, 68, 68, 0.5);
        border: 1.5px solid #ffffff;
        z-index: 2;
      }

      .pulse-ring {
        position: absolute;
        top: -3px;
        right: -3px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: rgba(239, 68, 68, 0.4);
        animation: pulseAnimation 2s infinite cubic-bezier(0.45, 0, 0.55, 1);
        pointer-events: none;
      }

      @keyframes pulseAnimation {
        0% {
          transform: scale(0.95);
          opacity: 0.8;
        }
        70% {
          transform: scale(2.2);
          opacity: 0;
        }
        100% {
          transform: scale(2.2);
          opacity: 0;
        }
      }

      /* ---------- DROPDOWN PANEL ---------- */
      .notif-panel {
        position: absolute;
        top: 48px;
        right: 0;
        width: 390px;
        max-width: calc(100vw - 20px);
        background: #ffffff;
        color: #1e293b;
        border-radius: 14px;
        box-shadow: 0 20px 45px -10px rgba(15, 23, 42, 0.22),
                    0 0 0 1px rgba(15, 23, 42, 0.08);
        z-index: 1500;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        max-height: 520px;
        animation: flyoutSlide 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        font-family: inherit;
      }

      @keyframes flyoutSlide {
        from {
          opacity: 0;
          transform: translateY(-8px) scale(0.98);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      /* ---------- HEADER ---------- */
      .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 18px 10px;
        background: #ffffff;
        border-bottom: 1px solid #f1f5f9;
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .header-title {
        font-weight: 700;
        font-size: 16px;
        color: #0f172a;
        letter-spacing: -0.2px;
      }

      .unread-pill {
        background: #eff6ff;
        color: #2563eb;
        font-size: 11px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 12px;
        border: 1px solid #dbeafe;
      }

      .header-actions {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .action-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        color: #475569;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        transition: all 0.15s ease;
      }

      .action-btn:hover:not(:disabled) {
        background: #f1f5f9;
        color: #0f172a;
      }

      .action-btn.clear-btn:hover:not(:disabled) {
        background: #fef2f2;
        color: #ef4444;
      }

      .action-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .btn-icon {
        font-size: 15px;
        width: 15px;
        height: 15px;
        line-height: 15px;
      }

      /* ---------- TABS ---------- */
      .panel-tabs {
        display: flex;
        padding: 0 16px;
        border-bottom: 1px solid #f1f5f9;
        background: #ffffff;
      }

      .tab-btn {
        background: none;
        border: none;
        padding: 8px 12px;
        font-size: 12.5px;
        font-weight: 600;
        color: #64748b;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        transition: all 0.15s ease;
      }

      .tab-btn:hover {
        color: #0f172a;
      }

      .tab-btn.active {
        color: #2563eb;
        border-bottom-color: #2563eb;
      }

      /* ---------- BODY LIST ---------- */
      .panel-body {
        overflow-y: auto;
        flex: 1;
        background: #fafafa;
      }

      .panel-body::-webkit-scrollbar {
        width: 5px;
      }
      .panel-body::-webkit-scrollbar-track {
        background: transparent;
      }
      .panel-body::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 4px;
      }

      .notif-item {
        position: relative;
        display: flex;
        gap: 12px;
        padding: 12px 16px;
        background: #ffffff;
        border-bottom: 1px solid #f1f5f9;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .notif-item:hover {
        background: #f8fafc;
      }

      .notif-item.unread {
        background: #f0f7ff;
      }

      .notif-item.unread:hover {
        background: #e6f0fd;
      }

      /* ---------- AVATARS ---------- */
      .icon-avatar {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-top: 2px;
      }

      .avatar-mat-icon {
        font-size: 19px;
        width: 19px;
        height: 19px;
        line-height: 19px;
      }

      .event-create {
        background: #eff6ff;
        color: #2563eb;
      }
      .event-ack {
        background: #fef3c7;
        color: #d97706;
      }
      .event-assign {
        background: #f3e8ff;
        color: #9333ea;
      }
      .event-resolve {
        background: #ecfdf5;
        color: #059669;
      }
      .event-hold {
        background: #fff7ed;
        color: #ea580c;
      }
      .event-reopen {
        background: #ecfeff;
        color: #0891b2;
      }
      .event-reject {
        background: #fef2f2;
        color: #dc2626;
      }

      /* ---------- ITEM DETAILS ---------- */
      .item-details {
        min-width: 0;
        flex: 1;
        padding-right: 18px; /* space for dismiss button and dot */
      }

      .item-top-row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
        margin-bottom: 3px;
      }

      .item-title {
        font-weight: 600;
        font-size: 13px;
        color: #0f172a;
        line-height: 1.25;
      }

      .item-time {
        font-size: 11px;
        color: #94a3b8;
        white-space: nowrap;
        flex-shrink: 0;
      }

      .item-message {
        font-size: 12px;
        color: #475569;
        line-height: 1.45;
        word-break: break-word;
        margin-bottom: 6px;
      }

      /* ---------- META TAGS ---------- */
      .item-meta-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        align-items: center;
      }

      .tag {
        font-size: 10.5px;
        font-weight: 600;
        padding: 1.5px 6px;
        border-radius: 4px;
        line-height: 1.2;
      }

      .tag-id {
        background: #f1f5f9;
        color: #475569;
      }

      .tag-status {
        background: #e2e8f0;
        color: #334155;
      }

      .tag-location {
        background: #f8fafc;
        color: #64748b;
        border: 1px solid #e2e8f0;
        max-width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .tag-priority.priority-high {
        background: #fef2f2;
        color: #dc2626;
      }
      .tag-priority.priority-medium {
        background: #fffbeb;
        color: #b45309;
      }
      .tag-priority.priority-low {
        background: #f0fdf4;
        color: #15803d;
      }

      /* ---------- DISMISS BUTTON & UNREAD DOT ---------- */
      .dismiss-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 50%;
        color: #94a3b8;
        display: none;
        align-items: center;
        justify-content: center;
        transition: all 0.15s ease;
      }

      .notif-item:hover .dismiss-btn {
        display: flex;
      }

      .dismiss-btn:hover {
        background: #e2e8f0;
        color: #0f172a;
      }

      .dismiss-icon {
        font-size: 14px;
        width: 14px;
        height: 14px;
        line-height: 14px;
      }

      .unread-dot {
        position: absolute;
        top: 14px;
        right: 12px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #2563eb;
        pointer-events: none;
      }

      .notif-item:hover .unread-dot {
        display: none;
      }

      /* ---------- EMPTY STATE ---------- */
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 45px 20px;
        text-align: center;
      }

      .empty-icon-wrap {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        background: #f1f5f9;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #94a3b8;
        margin-bottom: 12px;
      }

      .empty-icon {
        font-size: 28px;
        width: 28px;
        height: 28px;
      }

      .empty-title {
        margin: 0 0 4px;
        font-size: 14.5px;
        font-weight: 700;
        color: #334155;
      }

      .empty-subtitle {
        font-size: 12px;
        color: #94a3b8;
        max-width: 240px;
      }

      /* ---------- FOOTER ---------- */
      .panel-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 16px;
        background: #f8fafc;
        border-top: 1px solid #f1f5f9;
        font-size: 12px;
      }

      .role-badge {
        display: flex;
        align-items: center;
        gap: 5px;
        color: #64748b;
        font-weight: 500;
      }

      .role-icon {
        font-size: 15px;
        width: 15px;
        height: 15px;
        line-height: 15px;
      }

      .settings-action {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        color: #2563eb;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        transition: color 0.15s ease;
      }

      .settings-action:hover {
        color: #1d4ed8;
        text-decoration: underline;
      }

      .settings-icon {
        font-size: 15px;
        width: 15px;
        height: 15px;
        line-height: 15px;
      }

      @media (max-width: 480px) {
        .notif-panel {
          position: fixed;
          top: 56px;
          right: 10px;
          left: 10px;
          width: auto;
          max-width: none;
          border-radius: 12px;
        }
      }
    `
  ]
})
export class CimsNotificationBellComponent implements OnInit, OnDestroy {
  allNotifications: CimsNotification[] = [];
  visibleNotifications: CimsNotification[] = [];
  unreadCount = 0;
  isOpen = false;
  activeTab: 'all' | 'unread' = 'all';
  userRoleLabel = 'User';

  private notifSubscription?: Subscription;

  constructor(
    private notificationService: CimsNotificationService,
    private cimsService: CimsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateUserRoleLabel();

    this.notifSubscription = this.notificationService.notifications$.subscribe((items) => {
      this.allNotifications = items;
      this.unreadCount = items.filter((n) => !n.read).length;
      this.applyFilter();
    });

    this.startPolling();
  }

  ngOnDestroy(): void {
    this.notificationService.stop();
    this.notifSubscription?.unsubscribe();
  }

  private startPolling(): void {
    this.notificationService.start();
    this.seedBaseline();
  }

  private updateUserRoleLabel(): void {
    const role = (this.authService.getRole() || '').toUpperCase();
    switch (role) {
      case 'ADMIN':
        this.userRoleLabel = 'Administrator (All System Updates)';
        break;
      case 'SUPPORT_ENGINEER':
        this.userRoleLabel = 'Support Engineer';
        break;
      case 'FIELD_PERSON':
        this.userRoleLabel = 'Field Person';
        break;
      case 'COORDINATOR':
        this.userRoleLabel = 'Coordinator';
        break;
      case 'REVIEWER':
        this.userRoleLabel = 'Reviewer';
        break;
      case 'AGENCY':
        this.userRoleLabel = 'Agency';
        break;
      default:
        this.userRoleLabel = role || 'User';
    }
  }

  private seedBaseline(): void {
    const role = (this.authService.getRole() || '').toUpperCase();
    if (role === 'SUPPORT_ENGINEER') {
      this.cimsService.getMyTickets(0, 30).subscribe({
        next: (response) => {
          const tickets = Array.isArray(response) ? response : response?.content ?? [];
          this.notificationService.seedBaseline(tickets);
        },
        error: () => {}
      });
    } else if (role === 'REVIEWER') {
      this.cimsService.getReviewQueue(0, 30).subscribe({
        next: (response) => {
          const tickets = Array.isArray(response) ? response : response?.content ?? [];
          this.notificationService.seedBaseline(tickets);
        },
        error: () => {}
      });
    } else if (role === 'FIELD_PERSON' || role === 'COORDINATOR') {
      this.cimsService.getFieldPersonQueue(0, 30).subscribe({
        next: (response: any) => {
          const tickets = Array.isArray(response) ? response : response?.content ?? [];
          this.notificationService.seedBaseline(tickets ?? []);
        },
        error: () => {}
      });
    } else if (role === 'ADMIN') {
      this.cimsService.getAllTickets(0, 50).subscribe({
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
    this.updateUserRoleLabel();
  }

  setTab(tab: 'all' | 'unread'): void {
    this.activeTab = tab;
    this.applyFilter();
  }

  private applyFilter(): void {
    if (this.activeTab === 'unread') {
      this.visibleNotifications = this.allNotifications.filter((n) => !n.read);
    } else {
      this.visibleNotifications = this.allNotifications;
    }
  }

  openNotification(notification: CimsNotification): void {
    this.notificationService.markRead(notification.id);
    const url = this.notificationService.getTicketUrl(notification.ticketId);
    if (url) {
      this.isOpen = false;
      this.router.navigate([url]);
    }
  }

  dismissItem(event: Event, id: string): void {
    event.stopPropagation();
    this.notificationService.dismissNotification(id);
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

  getEventMatIcon(eventType: CimsNotificationEventType): string {
    switch (eventType) {
      case 'TICKET_CREATED':
        return 'add_circle';
      case 'TICKET_ACKNOWLEDGED':
        return 'check_circle';
      case 'TICKET_ASSIGNED':
        return 'assignment_ind';
      case 'TICKET_RESOLVED':
        return 'verified';
      case 'TICKET_ON_HOLD':
        return 'pause_circle';
      case 'TICKET_REOPENED':
        return 'replay';
      case 'TICKET_REJECTED':
        return 'cancel';
      default:
        return 'notifications';
    }
  }

  getEventColorClass(eventType: CimsNotificationEventType): string {
    switch (eventType) {
      case 'TICKET_CREATED':
        return 'event-create';
      case 'TICKET_ACKNOWLEDGED':
        return 'event-ack';
      case 'TICKET_ASSIGNED':
        return 'event-assign';
      case 'TICKET_RESOLVED':
        return 'event-resolve';
      case 'TICKET_ON_HOLD':
        return 'event-hold';
      case 'TICKET_REOPENED':
        return 'event-reopen';
      case 'TICKET_REJECTED':
        return 'event-reject';
      default:
        return 'event-create';
    }
  }

  formatStatus(status?: string): string {
    if (!status) return '';
    return status.replace(/_/g, ' ');
  }

  formatTimeAgo(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSec < 60) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.isOpen = false;
  }
}
