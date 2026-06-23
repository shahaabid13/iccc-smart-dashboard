import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HistoryService } from '../../../services/history.service';
import { DateFormatterUtil } from '../date-formatter.util';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

export interface MaintenanceRequest {
  normalizedStatus: string;
  id: number;
  deviceId: number;
  oldSerial: string;
  newSerial: string | null;
  newLocationId: number | null;
  newApproachRoadId: number | null;
  newLocationName?: string | null;
  newApproachRoadName?: string | null;
  requestType: string;
  status: string;
  createdBy: string;
  approvedBy: string | null;
  referenceId: string;
  remarks: string | null;
  deviceSerial?: string;
  locationName?: string;
  approachRoadName?: string;
  deviceType?: string;
}

// ConfirmDialog Component
@Component({
  selector: 'confirm-dialog',
  template: `
    <div class="confirmation-dialog">
      <h2 mat-dialog-title class="dialog-title">
        <mat-icon [color]="data.color" class="title-icon">
          {{ data.color === 'primary' ? 'check_circle' : 'warning' }}
        </mat-icon>
        {{ data.title }}
      </h2>

      <mat-dialog-content class="dialog-content">
        <p class="warning-message">{{ data.message }}</p>

        <mat-card class="request-details-card" *ngIf="data.request">
          <mat-card-header>
            <mat-card-title>Request Details</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <table class="details-table">
              <tr><td class="label">Request ID</td><td>{{ data.request.id }}</td></tr>
              <tr><td class="label">Device ID</td><td>{{ data.request.deviceId }}</td></tr>
              <tr><td class="label">Request Type</td><td>{{ data.request.requestType || 'N/A' }}</td></tr>
              <tr><td class="label">Old Serial</td><td><code>{{ data.request.oldSerial || 'N/A' }}</code></td></tr>
              <tr *ngIf="data.request.requestType === 'MOVE'"><td class="label">New Location</td><td>{{ data.request.newLocationName || data.request.locationName || 'N/A' }}</td></tr>
              <tr *ngIf="data.request.requestType === 'MOVE'"><td class="label">New Approach Road</td><td>{{ data.request.newApproachRoadName || data.request.approachRoadName || 'N/A' }}</td></tr>
              <tr *ngIf="data.request.requestType !== 'MOVE'"><td class="label">New Serial</td><td><code>{{ data.request.newSerial || 'N/A' }}</code></td></tr>
              <tr><td class="label">Created By</td><td>{{ data.request.createdBy || 'N/A' }}</td></tr>
              <tr><td class="label">Created At</td><td>{{ DateFormatter.formatDate(data.request.createdAt) }} {{ DateFormatter.formatTime(data.request.createdAt) }}</td></tr>
              <tr><td class="label">Remarks</td><td>{{ data.request.remarks || 'No remarks' }}</td></tr>
            </table>
          </mat-card-content>
        </mat-card>

        <hr class="divider" />

        <div class="history-section">
          <h4>Recent Device History</h4>
          <div *ngIf="data.deviceHistory && data.deviceHistory.length > 0; else noHistory">
            <ul class="history-list">
              <li *ngFor="let h of data.deviceHistory">
                <div class="hist-item">
                  <div class="hist-left">
                    <div class="hist-date">{{ DateFormatter.formatDate(h.createdAt || h.timestamp || h.when || h.date) }}</div>
                    <div class="hist-time">{{ DateFormatter.formatTime(h.createdAt || h.timestamp || h.when || h.date) }}</div>
                  </div>
                  <div class="hist-main">
                    <span class="hist-action" [ngClass]="getActionClass(h.action || h.event)">{{ (h.action || h.event || 'Event') }}</span>
                    <div class="hist-desc">{{ h.details || h.summary || (h.note || h.remarks) || '' }}</div>
                  </div>
                  <div class="hist-loc">{{ h.location || h.locationName || h.currentLocation || h.newLocation || h.oldLocation || '' }}</div>
                </div>
              </li>
            </ul>
          </div>
          <ng-template #noHistory>
            <p class="no-history">No recent history available for this device.</p>
          </ng-template>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="dialog-actions">
        <button mat-button mat-dialog-close class="cancel-btn">Cancel</button>
        <button
          mat-flat-button
          [color]="data.color"
          [mat-dialog-close]="true"
          class="action-btn"
          cdkFocusInitial>
          <mat-icon>{{ data.color === 'primary' ? 'check_circle' : 'cancel' }}</mat-icon>
          {{ data.action }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatCardModule, MatIconModule],
  styles: [`
    .confirmation-dialog { max-width: 100%; }
    .dialog-title { display: flex; align-items: center; gap: 8px; color: #333; margin: 0; }
    .title-icon { margin-right: 8px; }
    .warning-message { color: #666; font-size: 16px; line-height: 1.5; margin: 0 0 16px 0; }
    .request-details-card { margin-top: 16px; background: #f5f5f5; }
    .details-table td { padding: 4px 12px 4px 0; font-size: 14px; }
    .details-table .label { font-weight: 600; color: #555; white-space: nowrap; }
    .dialog-actions { padding: 16px 0 0 0; gap: 8px; }
    .cancel-btn { margin-right: 8px; }
    .action-btn { min-width: 100px; }
    .history-list { padding-left: 16px; margin: 0; }
    .hist-row { display: flex; gap: 12px; padding: 4px 0; font-size: 13px; }
    .hist-date { color: #6b7280; white-space: nowrap; font-weight: 700; }
    .hist-time { color: #374151; font-size: 12px; margin-top: 2px; }
    .hist-timestamp { display:flex; flex-direction:column; min-width:120px; }
    .hist-loc { color: #110b0a; margin-left: 12px; font-size: 14px;  font-style: bold; font-weight: 600; }

    /* New polished history layout */
    .hist-item { display: flex; align-items: center; gap: 12px; padding: 10px 8px; border-bottom: 1px solid #eef2f6; }
    .hist-left { width: 130px; display:flex; flex-direction:column; }
    .hist-main { flex: 1; display:flex; flex-direction:column; }
    .hist-action { display: inline-block; padding: 6px 10px; border-radius: 16px; font-weight:700; font-size:12px; color: #fff; margin-bottom:6px; }
    .hist-desc { color:#374151; font-size:13px; }

    /* Action color variants */
    .action-fault    { background: #cc1212; }
    .action-repair   { background: #f57b00; }
    .action-serial   { background: #1976d2; }
    .action-installed{ background: #2e7d32; }
    .action-default  { background: #6b7280; }
    .no-history { color: #999; font-style: italic; }
  `]
})
export class ConfirmDialog {
  // expose DateFormatterUtil to template under a non-conflicting name
  DateFormatter = DateFormatterUtil;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  getActionClass(action: string): string {
    if (!action) return 'action-default';
    const a = action.toString().toLowerCase();
    if (a.includes('fault')) return 'action-fault';
    if (a.includes('repair') || a.includes('maintenance')) return 'action-repair';
    if (a.includes('serial')) return 'action-serial';
    if (a.includes('install') || a.includes('installed')) return 'action-installed';
    return 'action-default';
  }
}

// Main Component
@Component({
  selector: 'app-all-requests',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './all-requests.html',
  styleUrls: ['./all-requests.scss']
})
export class AllRequestsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'deviceId',
    'oldSerial',
    'newSerial',
    'requestType',
    'status',
    'createdBy',
    'timestamp',
    'approvedBy',
    'referenceId',
    'remarks',
    'actions'
  ];

  requests: MaintenanceRequest[] = [];
  filteredRequests: MaintenanceRequest[] = [];
  // expose formatter to template
  DateFormatter = DateFormatterUtil;
  role: string = '';
  username: string = '';
  loading = false;
  actionInProgress: number | null = null;
  selectedStatus: string = 'all';

  private apiUrl = '/api/maintenance/requests';

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private dialog: MatDialog,
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || 'agency';
    this.username = localStorage.getItem('username') || '';

    const normalizedRole = this.role.toLowerCase();
    if (normalizedRole !== 'admin' && this.displayedColumns.includes('actions')) {
      this.displayedColumns = this.displayedColumns.filter(col => col !== 'actions');
    }

    this.loadRequests();
  }

  loadRequests(): void {
    this.loading = true;

    const token = localStorage.getItem('token');
    if (!token) {
      this.snackBar.open('❌ You must log in to view maintenance requests', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      this.loading = false;
      return;
    }

    const headers = { headers: { Authorization: `Bearer ${token}` } } as any;

    this.http.get<any[]>(this.apiUrl, headers).subscribe({
      next: (data) => {
        // TEMP LOG: show raw createdAt shape for debugging
        const raw = Array.isArray(data) ? data : [];
        if (raw?.length) {
          console.log('createdAt raw:', JSON.stringify(raw[0].createdAt));
        }

        this.requests = (Array.isArray(data) ? data : []).map(request => {
          // resolve created/updated fields from many possible backend names
          const createdKeys = ['createdAt','created_at','created','CreatedAt','createdOn','created_on','createdDate','created_date','timestamp','time','when','createdTimestamp','createdAtTimestamp'];
          const updatedKeys = ['updatedAt','updated_at','updated','UpdatedAt','updatedOn','updated_on','updatedDate','updated_date','updatedTimestamp'];
          const findField = (obj: any, keys: string[]) => {
            if (!obj) return null;
            for (const k of keys) {
              if (obj[k] !== undefined && obj[k] !== null) return obj[k];
            }
            for (const p of Object.keys(obj || {})) {
              const v = obj[p];
              if (v && typeof v === 'object' && !Array.isArray(v)) {
                for (const k of keys) if (v[k] !== undefined && v[k] !== null) return v[k];
              }
            }
            return null;
          };

          // helper to extract a human-friendly name from various shapes
          const resolveName = (val: any): string | null => {
            if (val === undefined || val === null) return null;
            if (typeof val === 'string') return val;
            if (typeof val === 'number') return String(val);
            if (typeof val === 'object') {
              // common name properties
              return (
                val.name || val.title || val.locationName || val.roadName || val.displayName || val.label || null
              );
            }
            return null;
          };

          const createdRaw = findField(request, createdKeys);
          const updatedRaw = findField(request, updatedKeys);

          return {
            ...request,
            normalizedStatus:  request.status?.toLowerCase() || 'pending',
            // ensure `createdAt` exists for template/date util
            createdAt: createdRaw ?? request.createdAt ?? request.created_at ?? null,
            updatedAt: updatedRaw ?? request.updatedAt ?? request.updated_at ?? null,
            // Accept various possible backend name keys and nested objects
            newLocationName: resolveName(
              request.newLocationName ?? (request as any).newLocation ?? (request as any).destinationLocation ?? (request as any).toLocationName ?? request.locationName
            ),
            newApproachRoadName: resolveName(
              request.newApproachRoadName ?? (request as any).newApproachRoad ?? (request as any).destinationApproachRoad ?? (request as any).toApproachRoadName ?? request.approachRoadName
            ),
            formattedCreatedAt: this.DateFormatter.formatDate(createdRaw ?? request.createdAt),
            formattedUpdatedAt: this.DateFormatter.formatDate(updatedRaw ?? request.updatedAt),
            displayApprovedBy: request.approvedBy || 'Not approved',
            displayNewSerial:  request.newSerial  || 'N/A',
            displayRemarks:    request.remarks    || 'No remarks'
          } as any;
        });

        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching maintenance requests:', err);
        this.snackBar.open('❌ Failed to load maintenance requests', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    if (this.selectedStatus === 'all') {
      this.filteredRequests = [...this.requests];
    } else {
      this.filteredRequests = this.requests.filter(r =>
        r.normalizedStatus === this.selectedStatus.toLowerCase()
      );
    }
  }

  clearFilter(): void {
    this.selectedStatus = 'all';
    this.applyFilter();
  }

  getRequestsByStatus(status: string): MaintenanceRequest[] {
    return this.requests.filter(r => r.normalizedStatus === status.toLowerCase());
  }

  getStatusIcon(status: string): string {
    switch (status?.toLowerCase()) {
      case 'approved': return 'check_circle';
      case 'rejected': return 'cancel';
      case 'pending':  return 'pending';
      default:         return 'help';
    }
  }

  confirmAction(request: MaintenanceRequest, approve: boolean): void {
    this.historyService.getDeviceHistory(request.deviceId).subscribe({
      next: (history: any[]) => this.openConfirmDialog(request, approve, Array.isArray(history) ? history.slice(0, 3) : []),
      error: ()             => this.openConfirmDialog(request, approve, [])
    });
  }

  private openConfirmDialog(request: MaintenanceRequest, approve: boolean, deviceHistory: any[]): void {
    // Log MOVE requests missing both canonical name fields so backend can be debugged if needed
    if ((request.requestType || '').toUpperCase() === 'MOVE' && !request.newLocationName && !request.newApproachRoadName) {
      console.log('AllRequests: MOVE request missing newLocationName/newApproachRoadName', {
        id: request.id,
        newLocationId: request.newLocationId,
        newApproachRoadId: request.newApproachRoadId,
        request
      });
    }

    // Backend returns canonical `newLocationName`/`newApproachRoadName`; pass request through
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '600px',
      data: {
        title:   approve ? 'Approve Request' : 'Reject Request',
        message: `Are you sure you want to ${approve ? 'approve' : 'reject'} request #${request.id}?`,
        action:  approve ? 'Approve' : 'Reject',
        color:   approve ? 'primary' : 'warn',
        request,
        deviceHistory
      }
    });
    dialogRef.afterClosed().subscribe(result => { if (result) this.submitAction(request, approve); });
  }

  submitAction(request: MaintenanceRequest, approved: boolean): void {
    this.actionInProgress = request.id;

    const token = localStorage.getItem('token');
    if (!token) {
      this.snackBar.open('❌ You must log in to perform this action', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      this.actionInProgress = null;
      return;
    }

    const headers = { headers: { Authorization: `Bearer ${token}` } } as any;
    // Backend derives approver from JWT; do not send approvedBy field (server rejects it)
    const payload: any = {
      approved,
      remarks: approved ? 'Request approved by administrator' : 'Request rejected by administrator'
    };

    this.http.post(`${this.apiUrl}/${request.id}/approve`, payload, headers).subscribe({
      next: () => {
        this.snackBar.open(
          `✅ Request #${request.id} ${approved ? 'approved' : 'rejected'} successfully`,
          'Close',
          { duration: 3000, panelClass: ['success-snackbar'] }
        );
        this.actionInProgress = null;
        this.loadRequests();
      },
      error: (err) => {
        const msg = err.error?.message
          || (err.status === 404 ? 'Request not found'
          : err.status === 403 ? 'Permission denied'
          : 'Failed to process request');
        this.snackBar.open(`❌ ${msg}`, 'Close', { duration: 5000, panelClass: ['error-snackbar'] });
        this.actionInProgress = null;
      }
    });
  }

  isAdmin(): boolean { return this.role.toLowerCase() === 'admin'; }

  canPerformAction(request: MaintenanceRequest): boolean { return request.normalizedStatus === 'pending'; }

  getRequestTypeColor(requestType: string): string {
    switch (requestType?.toLowerCase()) {
      case 'replace':       return '#f54656';
      case 'repair':        return '#ff9800';
      case 'fault':         return '#9c27b0';
      case 'serial_update': return '#2196f3';
      case 'move':          return '#4caf50';
      default:              return '#757575';
    }
  }
}