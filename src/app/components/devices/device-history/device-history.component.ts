import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-device-history',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule
  ],
  template: `
    <div class="page-container">
      <mat-card class="history-card mat-elevation-z8">
        <!-- Header Section -->
        <div class="header-section">
          <div class="header-content">
            <button mat-icon-button class="back-btn" (click)="goBack()" matTooltip="Back to Inventory">
              <mat-icon>arrow_back</mat-icon>
            </button>
            <div class="title-section">
              <h1>Device History</h1>
              <p class="subtitle">Complete audit trail for device activities</p>
            </div>
          </div>
          <button mat-raised-button color="primary" (click)="reload()" class="refresh-btn">
            <mat-icon>refresh</mat-icon>
            Refresh
          </button>
        </div>

        <!-- Device Summary Card -->
        <mat-card *ngIf="deviceInfo" class="device-summary-card">
          <mat-card-content>
            <div class="device-info-grid">
              <div class="device-info-item">
                <span class="label">Current Serial:</span>
                <span class="value serial">{{ deviceInfo.currentSerial || 'N/A' }}</span>
              </div>
              <div class="device-info-item">
                <span class="label">Device Type:</span>
                <span class="value">{{ deviceInfo.deviceType || 'N/A' }}</span>
              </div>
              <div class="device-info-item">
                <span class="label">Current Location:</span>
                <span class="value">{{ deviceInfo.currentLocation || 'N/A' }}</span>
              </div>
              <div class="device-info-item">
                <span class="label">Status:</span>
                <mat-chip [ngClass]="getStatusClass(deviceInfo.status)" class="status-chip">
                  {{ deviceInfo.status || 'UNKNOWN' }}
                </mat-chip>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Loading State -->
        <div *ngIf="loading" class="loading-container">
          <mat-progress-spinner mode="indeterminate" color="primary" diameter="60"></mat-progress-spinner>
          <p class="loading-text">Loading device history...</p>
        </div>

        <!-- History Table -->
        <div *ngIf="!loading && history.length > 0" class="table-section">
          <div class="table-header">
            <h3>Activity Timeline</h3>
            <span class="record-count">{{ history.length }} records found</span>
          </div>

          <div class="table-container">
            <table mat-table [dataSource]="history" class="history-table">
              
              <!-- Action Type -->
              <ng-container matColumnDef="action">
                <th mat-header-cell *matHeaderCellDef>Action</th>
                <td mat-cell *matCellDef="let h">
                  <mat-chip [ngClass]="getActionClass(h.action)" class="action-chip">
                    {{ h.action }}
                  </mat-chip>
                </td>
              </ng-container>

              <!-- Serial Changes -->
              <ng-container matColumnDef="serialChanges">
                <th mat-header-cell *matHeaderCellDef>Serial Changes</th>
                <td mat-cell *matCellDef="let h">
                  <div class="change-comparison">
                    <span class="old-value" *ngIf="h.oldSerial">{{ h.oldSerial }}</span>
                    <mat-icon *ngIf="h.oldSerial && h.newSerial" class="change-arrow">arrow_forward</mat-icon>
                    <span class="new-value" *ngIf="h.newSerial">{{ h.newSerial }}</span>
                    <span class="no-change" *ngIf="!h.oldSerial && !h.newSerial">-</span>
                  </div>
                </td>
              </ng-container>

              <!-- Location Changes -->
              <ng-container matColumnDef="locationChanges">
                <th mat-header-cell *matHeaderCellDef>Location Changes</th>
                <td mat-cell *matCellDef="let h">
                  <div class="change-comparison">
                    <span class="old-value" *ngIf="h.oldLocation">{{ h.oldLocation }}</span>
                    <mat-icon *ngIf="h.oldLocation && h.newLocation" class="change-arrow">arrow_forward</mat-icon>
                    <span class="new-value" *ngIf="h.newLocation">{{ h.newLocation }}</span>
                    <span class="no-change" *ngIf="!h.oldLocation && !h.newLocation">-</span>
                  </div>
                </td>
              </ng-container>

              <!-- Additional Info -->
              <ng-container matColumnDef="additionalInfo">
                <th mat-header-cell *matHeaderCellDef>Additional Info</th>
                <td mat-cell *matCellDef="let h">
                  <div class="additional-info">
                    <div *ngIf="h.replacedDeviceSerial" class="info-item">
                      <mat-icon class="info-icon">device_replace</mat-icon>
                      Replaced: {{ h.replacedDeviceSerial }}
                    </div>
                    <div *ngIf="h.referenceId" class="info-item">
                      <mat-icon class="info-icon">receipt</mat-icon>
                      Ref: {{ h.referenceId }}
                    </div>
                    <div *ngIf="!h.replacedDeviceSerial && !h.referenceId" class="no-info">
                      -
                    </div>
                  </div>
                </td>
              </ng-container>

              <!-- Timestamp -->
              <ng-container matColumnDef="timestamp">
                <th mat-header-cell *matHeaderCellDef>Timestamp</th>
                <td mat-cell *matCellDef="let h">
                  <div class="timestamp">
                    <div class="date">{{ formatDate(h.createdAt) }}</div>
                    <div class="time">{{ formatTime(h.createdAt) }}</div>
                  </div>
                </td>
              </ng-container>

              <!-- User/Performer -->
              <ng-container matColumnDef="performedBy">
                <th mat-header-cell *matHeaderCellDef>Performed By</th>
                <td mat-cell *matCellDef="let h">
                  <div class="performed-by">
                    <mat-icon class="user-icon">person</mat-icon>
                    {{ h.performedBy || 'System' }}
                  </div>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns" 
                  [class.recent-row]="isRecent(row.createdAt)"></tr>
            </table>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="!loading && history.length === 0" class="empty-state">
          <mat-icon class="empty-icon">history</mat-icon>
          <h3>No History Available</h3>
          <p>No activity records found for this device.</p>
          <button mat-raised-button color="primary" (click)="reload()">
            <mat-icon>refresh</mat-icon>
            Check Again
          </button>
        </div>

        <!-- Quick Stats -->
        <div *ngIf="!loading && history.length > 0" class="stats-section">
          <mat-card class="stats-card">
            <mat-card-content>
              <h4>Quick Stats</h4>
              <div class="stats-grid">
                <div class="stat-item">
                  <span class="stat-number">{{ getTotalActions() }}</span>
                  <span class="stat-label">Total Actions</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">{{ getActionCount('INSTALL') }}</span>
                  <span class="stat-label">Installations</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">{{ getActionCount('REPAIR') }}</span>
                  <span class="stat-label">Repairs</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">{{ getActionCount('REPLACE') }}</span>
                  <span class="stat-label">Replacements</span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 20px;
      background: #f5f7fa;
      min-height: 100vh;
    }

    .history-card {
      border-radius: 16px;
      overflow: hidden;
      background: white;
    }

    /* Header Section */
    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .back-btn {
      color: white;
      background: rgba(255, 255, 255, 0.2);
    }

    .title-section h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .subtitle {
      margin: 4px 0 0 0;
      opacity: 0.9;
      font-size: 14px;
    }

    .refresh-btn {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    /* Device Summary */
    .device-summary-card {
      margin: 20px 24px;
      border-left: 4px solid #667eea;
    }

    .device-info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
    }

    .device-info-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      font-weight: 600;
    }

    .value {
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }

    .serial {
      color: #667eea;
      font-weight: 600;
    }

    .status-chip {
      font-weight: 600;
      text-transform: uppercase;
      font-size: 11px;
    }

    .status-active {
      background: #4caf50 !important;
      color: white !important;
    }

    .status-inactive {
      background: #f44336 !important;
      color: white !important;
    }

    .status-maintenance {
      background: #ff9800 !important;
      color: white !important;
    }

    /* Loading State */
    .loading-container {
      text-align: center;
      padding: 60px 20px;
    }

    .loading-text {
      margin-top: 16px;
      color: #666;
      font-size: 16px;
    }

    /* Table Section */
    .table-section {
      padding: 0 24px 24px;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .table-header h3 {
      margin: 0;
      color: #333;
      font-size: 20px;
      font-weight: 600;
    }

    .record-count {
      background: #e3f2fd;
      color: #1976d2;
      padding: 6px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
    }

    .table-container {
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      overflow: hidden;
    }

    .history-table {
      width: 100%;
    }

    th.mat-header-cell {
      background: #f8f9fa;
      font-weight: 600;
      color: #333;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 16px;
      border-bottom: 2px solid #e0e0e0;
    }

    td.mat-cell {
      padding: 16px;
      border-bottom: 1px solid #f0f0f0;
      vertical-align: top;
    }

    /* Action Chips */
    .action-chip {
      font-weight: 600;
      text-transform: uppercase;
      font-size: 11px;
    }

    .action-install {
      background: #4caf50 !important;
      color: white !important;
    }

    .action-repair {
      background: #ff9800 !important;
      color: white !important;
    }

    .action-replace {
      background: #2196f3 !important;
      color: white !important;
    }

    .action-update {
      background: #9c27b0 !important;
      color: white !important;
    }

    .action-move {
      background: #607d8b !important;
      color: white !important;
    }

    /* Change Comparison */
    .change-comparison {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .old-value {
      background: #ffebee;
      color: #c62828;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      text-decoration: line-through;
    }

    .new-value {
      background: #e8f5e8;
      color: #2e7d32;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }

    .change-arrow {
      font-size: 16px;
      color: #666;
    }

    .no-change {
      color: #999;
      font-style: italic;
    }

    /* Additional Info */
    .additional-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: #666;
    }

    .info-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    /* Timestamp */
    .timestamp {
      text-align: center;
    }

    .date {
      font-weight: 600;
      color: #333;
      font-size: 13px;
    }

    .time {
      color: #666;
      font-size: 11px;
    }

    /* Performed By */
    .performed-by {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
    }

    .user-icon {
      font-size: 18px;
      color: #666;
    }

    /* Recent Row Highlight */
    .recent-row {
      background: #f3f8ff !important;
      border-left: 3px solid #2196f3;
    }

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #666;
    }

    .empty-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #bdbdbd;
      margin-bottom: 16px;
    }

    .empty-state h3 {
      margin: 0 0 8px 0;
      color: #333;
    }

    /* Stats Section */
    .stats-section {
      padding: 0 24px 24px;
    }

    .stats-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .stats-card h4 {
      margin: 0 0 16px 0;
      color: white;
      text-align: center;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 16px;
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      display: block;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 12px;
      opacity: 0.9;
      text-transform: uppercase;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .page-container {
        padding: 10px;
      }

      .header-section {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }

      .header-content {
        flex-direction: column;
      }

      .device-info-grid {
        grid-template-columns: 1fr;
      }

      .displayed-columns {
        font-size: 12px;
      }

      th.mat-header-cell,
      td.mat-cell {
        padding: 12px 8px;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class DeviceHistoryComponent implements OnInit {
  history: any[] = [];
  deviceInfo: any = null;
  displayedColumns: string[] = [
    'action',
    'serialChanges',
    'locationChanges',
    'additionalInfo',
    'timestamp',
    'performedBy'
  ];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const deviceId = this.route.snapshot.paramMap.get('deviceId');
    if (deviceId) {
      this.loadHistory(deviceId);
      this.loadDeviceInfo(deviceId);
    }
  }

  /** Fetch device history from backend API */
  loadHistory(deviceId: string) {
    this.loading = true;
    this.http.get<any[]>(`http://localhost:8080/api/history/device/${deviceId}`).subscribe({
      next: (data) => {
        // Process the data to handle custom date format
        this.history = (data || []).map(item => ({
          ...item,
          // Convert the custom date format to a proper Date object
          createdAt: this.parseCustomDate(item.createdAt)
        })).sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load history:', err);
        this.loading = false;
      },
    });
  }

  /** Parse custom date format: "2025,11,14,14,28,46,956170000" */
  private parseCustomDate(dateString: string): Date {
    if (!dateString) return new Date();
    
    try {
      // Handle the custom format: "2025,11,14,14,28,46,956170000"
      if (typeof dateString === 'string' && dateString.includes(',')) {
        const parts = dateString.split(',').map(part => parseInt(part, 10));
        
        // parts: [year, month, day, hour, minute, second, milliseconds]
        if (parts.length >= 6) {
          // Note: month is 0-indexed in JavaScript Date (11 = December)
          const year = parts[0];
          const month = parts[1] - 1; // Convert to 0-indexed
          const day = parts[2];
          const hour = parts[3];
          const minute = parts[4];
          const second = parts[5];
          const millisecond = parts[6] || 0;
          
          return new Date(year, month, day, hour, minute, second, millisecond / 1000000);
        }
      }
      
      // Fallback: try parsing as ISO string or timestamp
      return new Date(dateString);
    } catch (error) {
      console.warn('Failed to parse date:', dateString, error);
      return new Date();
    }
  }

  /** Format date for display */
  formatDate(dateInput: any): string {
    const date = this.parseCustomDate(dateInput);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /** Format time for display */
  formatTime(dateInput: any): string {
    const date = this.parseCustomDate(dateInput);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  /** Fetch current device information */
  loadDeviceInfo(deviceId: string) {
    this.http.get<any>(`http://localhost:8080/api/devices/${deviceId}`).subscribe({
      next: (data) => {
        this.deviceInfo = data;
      },
      error: (err) => {
        console.error('Failed to load device info:', err);
      }
    });
  }

  /** Get CSS class for action type */
  getActionClass(action: string): string {
    const actionMap: { [key: string]: string } = {
      'INSTALL': 'action-install',
      'REPAIR': 'action-repair',
      'REPLACE': 'action-replace',
      'UPDATE': 'action-update',
      'MOVE': 'action-move',
      'SERIAL_UPDATE': 'action-update'
    };
    return actionMap[action] || 'action-update';
  }

  /** Get CSS class for status */
  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'ACTIVE': 'status-active',
      'INACTIVE': 'status-inactive',
      'MAINTENANCE': 'status-maintenance',
      'INSTALLED': 'status-active'
    };
    return statusMap[status] || 'status-inactive';
  }

  /** Check if record is recent (within 24 hours) */
  isRecent(timestamp: string): boolean {
    const recordDate = this.parseCustomDate(timestamp);
    const now = new Date();
    const diffHours = (now.getTime() - recordDate.getTime()) / (1000 * 60 * 60);
    return diffHours < 24;
  }

  /** Get total number of actions */
  getTotalActions(): number {
    return this.history.length;
  }

  /** Get count of specific action type */
  getActionCount(actionType: string): number {
    return this.history.filter(h => h.action === actionType).length;
  }

  reload() {
    const deviceId = this.route.snapshot.paramMap.get('deviceId');
    if (deviceId) {
      this.loadHistory(deviceId);
      this.loadDeviceInfo(deviceId);
    }
  }

  goBack() {
    this.router.navigate(['/inventory']);
  }
}