import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { CimsNotificationService } from '../../services/cims-notification.service';
import { CimsNotificationEventType, NotificationSettings } from '../../models/cims.models';

const EVENT_TYPES: CimsNotificationEventType[] = [
  'TICKET_CREATED',
  'TICKET_ACKNOWLEDGED',
  'TICKET_ASSIGNED',
  'TICKET_RESOLVED',
  'TICKET_ON_HOLD',
  'TICKET_REOPENED',
  'TICKET_REJECTED'
];

const EVENT_LABELS: Record<CimsNotificationEventType, string> = {
  TICKET_CREATED: 'Ticket Created',
  TICKET_ACKNOWLEDGED: 'Ticket Acknowledged',
  TICKET_ASSIGNED: 'Reviewer Assigned',
  TICKET_RESOLVED: 'Ticket Resolved',
  TICKET_ON_HOLD: 'Ticket On Hold',
  TICKET_REOPENED: 'Ticket Reopened',
  TICKET_REJECTED: 'Ticket Rejected'
};

@Component({
  selector: 'app-cims-notification-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDividerModule,
    FormsModule
  ],
  template: `
    <div class="cims-container">
      <mat-card class="settings-card">
        <mat-card-header>
          <mat-card-title>
            <div class="header-title">
              <span class="icon">🔔</span>
              <span>Notification Settings</span>
            </div>
          </mat-card-title>
          <mat-card-subtitle>Choose how you want to be notified about ticket updates</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <!-- Delivery Channels -->
          <section class="settings-section">
            <h3 class="section-title">Delivery Channels</h3>

            <div class="setting-row">
              <div class="setting-info">
                <div class="setting-name">Email notifications</div>
                <div class="setting-desc">Receive ticket updates via email</div>
              </div>
              <mat-slide-toggle
                color="primary"
                [(ngModel)]="settings.emailEnabled"
                (ngModelChange)="onEmailToggle()">
              </mat-slide-toggle>
            </div>

            <div class="setting-row">
              <div class="setting-info">
                <div class="setting-name">SMS notifications</div>
                <div class="setting-desc">Receive ticket updates via SMS</div>
              </div>
              <mat-slide-toggle
                color="primary"
                [(ngModel)]="settings.smsEnabled"
                (ngModelChange)="onSmsToggle()">
              </mat-slide-toggle>
            </div>

            <div class="setting-row">
              <div class="setting-info">
                <div class="setting-name">Browser notifications</div>
                <div class="setting-desc">
                  Popup notifications when the page is open
                  <span class="permission-status" *ngIf="browserPermission">
                    ({{ browserPermission }})
                  </span>
                </div>
              </div>
              <mat-slide-toggle
                color="primary"
                [(ngModel)]="settings.browserEnabled"
                (ngModelChange)="onBrowserToggle()">
              </mat-slide-toggle>
            </div>
          </section>

          <mat-divider></mat-divider>

          <!-- Contact Details -->
          <section class="settings-section" *ngIf="settings.emailEnabled || settings.smsEnabled">
            <h3 class="section-title">Contact Details</h3>

            <mat-form-field appearance="outline" class="full-width" *ngIf="settings.emailEnabled">
              <mat-label>Email address</mat-label>
              <input matInput type="email" [(ngModel)]="settings.email" placeholder="you@example.com" />
              <mat-icon matPrefix>email</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width" *ngIf="settings.smsEnabled">
              <mat-label>Mobile number</mat-label>
              <input matInput type="tel" [(ngModel)]="settings.phone" placeholder="+91XXXXXXXXXX" />
              <mat-icon matPrefix>phone</mat-icon>
            </mat-form-field>
          </section>

          <mat-divider></mat-divider>

          <!-- Event Types -->
          <section class="settings-section">
            <h3 class="section-title">Ticket Update Events</h3>

            <div class="event-list">
              <div *ngFor="let eventType of eventTypes" class="event-row">
                <div class="event-info">
                  <div class="event-name">{{ getEventLabel(eventType) }}</div>
                </div>
                <div class="event-channels">
                  <mat-checkbox
                    *ngIf="settings.emailEnabled"
                    color="primary"
                    [(ngModel)]="settings.eventTypes[eventType].email">
                    Email
                  </mat-checkbox>
                  <mat-checkbox
                    *ngIf="settings.smsEnabled"
                    color="primary"
                    [(ngModel)]="settings.eventTypes[eventType].sms">
                    SMS
                  </mat-checkbox>
                </div>
              </div>
              <div class="no-channels" *ngIf="!settings.emailEnabled && !settings.smsEnabled">
                Enable email or SMS above to customize per-event delivery.
              </div>
            </div>
          </section>

          <!-- Actions -->
          <div class="actions">
            <button mat-raised-button color="primary" (click)="saveSettings()">
              <mat-icon>save</mat-icon>
              Save Settings
            </button>
            <button mat-stroked-button (click)="resetSettings()">
              <mat-icon>refresh</mat-icon>
              Reset to Defaults
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .cims-container {
        padding: 24px;
        max-width: 820px;
        margin: 0 auto;
      }

      .settings-card {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .header-title {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 24px;
        font-weight: 600;
      }

      .icon {
        font-size: 28px;
      }

      .settings-section {
        padding: 20px 0;
      }

      .section-title {
        margin: 0 0 16px 0;
        font-size: 16px;
        font-weight: 600;
        color: #333;
      }

      .setting-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 12px 0;
      }

      .setting-info {
        flex: 1;
      }

      .setting-name {
        font-size: 15px;
        font-weight: 500;
        color: #1a1a1a;
      }

      .setting-desc {
        font-size: 13px;
        color: #666;
        margin-top: 2px;
      }

      .permission-status {
        color: #1976d2;
        font-style: italic;
      }

      .full-width {
        width: 100%;
        margin-bottom: 12px;
      }

      .event-list {
        display: flex;
        flex-direction: column;
      }

      .event-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 12px 0;
        border-bottom: 1px solid #f1f1f1;
      }

      .event-row:last-child {
        border-bottom: none;
      }

      .event-name {
        font-size: 14.5px;
        font-weight: 500;
        color: #1a1a1a;
      }

      .event-channels {
        display: flex;
        gap: 16px;
        align-items: center;
      }

      .no-channels {
        padding: 12px 0;
        color: #999;
        font-size: 13.5px;
      }

      .actions {
        display: flex;
        gap: 12px;
        margin-top: 20px;
        padding-top: 16px;
        border-top: 1px solid #eee;
      }

      .actions button {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      @media (max-width: 600px) {
        .setting-row,
        .event-row {
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }

        .actions {
          flex-direction: column;
        }

        .actions button {
          width: 100%;
          justify-content: center;
        }
      }
    `
  ]
})
export class CimsNotificationSettingsComponent implements OnInit {
  settings: NotificationSettings;
  eventTypes: CimsNotificationEventType[] = EVENT_TYPES;
  browserPermission = '';

  constructor(
    private notificationService: CimsNotificationService,
    private snackBar: MatSnackBar
  ) {
    this.settings = this.notificationService.getSettings();
  }

  ngOnInit(): void {
    this.browserPermission = 'Notification' in window ? Notification.permission : 'unsupported';
  }

  getEventLabel(eventType: CimsNotificationEventType): string {
    return EVENT_LABELS[eventType];
  }

  async onBrowserToggle(): Promise<void> {
    if (!this.settings.browserEnabled) {
      return;
    }
    const granted = await this.notificationService.requestBrowserPermission();
    this.browserPermission = 'Notification' in window ? Notification.permission : 'unsupported';
    if (!granted) {
      this.settings.browserEnabled = false;
      this.snackBar.open(
        'Browser notifications are blocked. Enable them in your browser settings.',
        'Close',
        { duration: 6000 }
      );
    }
  }

  onEmailToggle(): void {
    if (!this.settings.emailEnabled) {
      this.settings.email = '';
    }
  }

  onSmsToggle(): void {
    if (!this.settings.smsEnabled) {
      this.settings.phone = '';
    }
  }

  saveSettings(): void {
    if (this.settings.emailEnabled && !this.isValidEmail(this.settings.email)) {
      this.snackBar.open('Please enter a valid email address.', 'Close', { duration: 5000 });
      return;
    }
    if (this.settings.smsEnabled && !this.isValidPhone(this.settings.phone)) {
      this.snackBar.open('Please enter a valid mobile number.', 'Close', { duration: 5000 });
      return;
    }

    this.notificationService.updateSettings({ ...this.settings });
    this.snackBar.open('Notification settings saved', 'Close', { duration: 4000 });
  }

  resetSettings(): void {
    this.settings = this.notificationService.getSettings();
    this.snackBar.open('Notification settings reset to defaults', 'Close', { duration: 4000 });
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private isValidPhone(phone: string): boolean {
    return /^\+?[0-9\s\-()]{7,}$/.test(phone.trim());
  }
}
