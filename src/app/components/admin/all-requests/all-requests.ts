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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

// Interfaces based on backend MaintenanceRequest entity
export interface MaintenanceRequest {
  formattedUpdatedAt: any;
  formattedCreatedAt: any;
  normalizedStatus: string;
  id: number;
  deviceId: number;
  oldSerial: string;
  newSerial: string | null;
  newLocationId: number | null;
  newApproachRoadId: number | null;
  requestType: string;
  status: string;
  createdBy: string;
  approvedBy: string | null;
  referenceId: string;
  remarks: string | null;
  createdAt: string | null;
  updatedAt: string | null;
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

        <mat-card class="request-details-card" *ngIf="data.requestDetails">
          <mat-card-header>
            <mat-card-title>Request Details</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <pre class="request-details">{{ data.requestDetails }}</pre>
          </mat-card-content>
        </mat-card>
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
    .confirmation-dialog {
      max-width: 100%;
    }
    .dialog-title {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #333;
      margin: 0;
    }
    .title-icon {
      margin-right: 8px;
    }
    .warning-message {
      color: #666;
      font-size: 16px;
      line-height: 1.5;
      margin: 0 0 16px 0;
    }
    .request-details-card {
      margin-top: 16px;
      background: #f5f5f5;
    }
    .request-details {
      white-space: pre-wrap;
      font-family: inherit;
      color: #333;
      margin: 0;
      font-size: 14px;
    }
    .dialog-actions {
      padding: 16px 0 0 0;
      gap: 8px;
    }
    .cancel-btn {
      margin-right: 8px;
    }
    .action-btn {
      min-width: 100px;
    }
  `]
})
export class ConfirmDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
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
  'approvedBy',
  'referenceId',
  'remarks',
  'createdAt',
  'updatedAt',      
  'actions'
];

  requests: MaintenanceRequest[] = [];
  filteredRequests: MaintenanceRequest[] = [];
  role: string = '';
  username: string = '';
  loading = false;
  actionInProgress: number | null = null;
  selectedStatus: string = 'all';

  private apiUrl = 'http://localhost:8080/api/maintenance/requests';

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || 'agency';
    this.username = localStorage.getItem('username') || '';

    console.log('User role:', this.role);
    console.log('Username:', this.username);

    // Remove actions column if not admin
    const normalizedRole = this.role.toLowerCase();
    if (normalizedRole !== 'admin' && this.displayedColumns.includes('actions')) {
      this.displayedColumns = this.displayedColumns.filter(col => col !== 'actions');
    }

    console.log('Displayed columns:', this.displayedColumns);
    this.loadRequests();
  }

  /** Load all requests */
  loadRequests(): void {
    this.loading = true;
    console.log('Loading requests from:', this.apiUrl);

    this.http.get<MaintenanceRequest[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('Requests loaded:', data);
        this.requests = Array.isArray(data) ? data : [];

        // Normalize status and format dates
        this.requests = this.requests.map(request => ({
          ...request,
          normalizedStatus: request.status?.toLowerCase() || 'pending',
          formattedCreatedAt: this.formatDate(request.createdAt),
          formattedUpdatedAt: this.formatDate(request.updatedAt),
          displayApprovedBy: request.approvedBy || 'Not approved',
          displayNewSerial: request.newSerial || 'N/A',
          displayRemarks: request.remarks || 'No remarks'
        }));

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

  /** Format date for display */
  private formatDate(dateString: string | null): string {
    if (!dateString) return 'N/A';

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    } catch (error) {
      return 'Invalid Date';
    }
  }

  /** Apply filter based on selected status */
  applyFilter(): void {
    if (this.selectedStatus === 'all') {
      this.filteredRequests = [...this.requests];
    } else {
      this.filteredRequests = this.requests.filter(request =>
        request.normalizedStatus === this.selectedStatus.toLowerCase()
      );
    }
  }

  /** Clear filter */
  clearFilter(): void {
    this.selectedStatus = 'all';
    this.applyFilter();
  }

  /** Get requests by status for summary */
  getRequestsByStatus(status: string): MaintenanceRequest[] {
    const normalizedStatus = status.toLowerCase();
    return this.requests.filter(request => request.normalizedStatus === normalizedStatus);
  }

  /** Get status icon */
  getStatusIcon(status: string): string {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case 'approved': return 'check_circle';
      case 'rejected': return 'cancel';
      case 'pending': return 'pending';
      default: return 'help';
    }
  }

  /** Show confirmation dialog before action */
  confirmAction(request: MaintenanceRequest, approve: boolean): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '500px',
      data: {
        title: approve ? 'Approve Request' : 'Reject Request',
        message: `Are you sure you want to ${approve ? 'approve' : 'reject'} request #${request.id}?`,
        action: approve ? 'Approve' : 'Reject',
        color: approve ? 'primary' : 'warn',
        requestDetails: this.getRequestDetails(request)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitAction(request, approve);
      }
    });
  }

  /** Get request details for confirmation dialog */
  private getRequestDetails(request: MaintenanceRequest): string {
    return `
Request ID: ${request.id}
Device ID: ${request.deviceId}
Request Type: ${request.requestType || 'N/A'}
Old Serial: ${request.oldSerial || 'N/A'}
New Serial: ${request.newSerial || 'N/A'}
Status: ${request.status || 'N/A'}
Created By: ${request.createdBy || 'N/A'}
Approved By: ${request.approvedBy || 'Pending'}
Reference ID: ${request.referenceId || 'N/A'}
Remarks: ${request.remarks || 'No remarks'}
Created: ${request.formattedCreatedAt}
Updated: ${request.formattedUpdatedAt}`;
  }

  /** Approve/Reject API call */
  submitAction(request: MaintenanceRequest, approved: boolean): void {
    this.actionInProgress = request.id;

    const payload = {
      approvedBy: this.username,
      approved: approved,
      remarks: approved ? 'Request approved by administrator' : 'Request rejected by administrator'
    };

    this.http.post(`${this.apiUrl}/${request.id}/approve`, payload).subscribe({
      next: () => {
        this.snackBar.open(
          `✅ Request #${request.id} ${approved ? 'approved' : 'rejected'} successfully`,
          'Close',
          {
            duration: 3000,
            panelClass: ['success-snackbar']
          }
        );
        this.actionInProgress = null;
        this.loadRequests(); // Reload to get updated data
      },
      error: (err) => {
        console.error('Action failed:', err);
        let errorMessage = 'Failed to process request';

        if (err.error && err.error.message) {
          errorMessage = err.error.message;
        } else if (err.status === 404) {
          errorMessage = 'Request not found';
        } else if (err.status === 403) {
          errorMessage = 'Permission denied';
        }

        this.snackBar.open(
          `❌ ${errorMessage}`,
          'Close',
          {
            duration: 5000,
            panelClass: ['error-snackbar']
          }
        );
        this.actionInProgress = null;
      }
    });
  }

  /** Check if user is admin */
  isAdmin(): boolean {
    return this.role.toLowerCase() === 'admin';
  }

  /** Check if action is allowed for request */
  canPerformAction(request: MaintenanceRequest): boolean {
    return request.normalizedStatus === 'pending';
  }

  /** Get request type color */
  getRequestTypeColor(requestType: string): string {
    const type = requestType?.toLowerCase();
    switch (type) {
      case 'replace': return '#f54656';
      case 'repair': return '#ff9800';
      case 'fault': return '#9c27b0';
      case 'serial_update': return '#2196f3';
      case 'move': return '#4caf50';
      default: return '#757575';
    }
  }
}
