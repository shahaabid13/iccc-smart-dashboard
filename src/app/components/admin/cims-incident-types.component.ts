import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CimsService } from '../../services/cims.service';
import { IncidentType } from '../../models/cims.models';
import {
  IncidentTypeDialogComponent,
  IncidentTypeDialogData,
  IncidentTypeDialogResult
} from './incident-type-dialog.component';

@Component({
  selector: 'app-cims-incident-types',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  template: `
    <div class="container">
      <mat-card class="page-card">
        <mat-card-header class="page-header">
          <mat-card-title>Incident Type Management</mat-card-title>
          <button mat-raised-button color="primary" (click)="openCreateDialog()">
            <mat-icon>add</mat-icon>
            Add Incident Type
          </button>
        </mat-card-header>

        <mat-card-content class="content-area">
          <!--
            The table + paginator are ALWAYS in the DOM (not gated behind
            *ngIf="!isLoading"). ngAfterViewInit only fires once, on the
            very first render — if the paginator element doesn't exist yet
            at that point (because isLoading was still true), the
            @ViewChild reference never resolves and dataSource.paginator
            never gets connected, which is why pagination silently did
            nothing and every row rendered on one page ("0 of 0" + full
            list). Instead, loading is shown as an overlay on top, so the
            underlying structure — and the ViewChild — is stable from the
            start.
          -->
          <div *ngIf="isLoading" class="loading-overlay">
            <mat-spinner diameter="40"></mat-spinner>
            <p>Loading incident types...</p>
          </div>

          <div class="table-section">
            <table mat-table [dataSource]="dataSource" class="incident-table">
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>ID</th>
                <td mat-cell *matCellDef="let element">{{ element.id }}</td>
              </ng-container>

              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Name</th>
                <td mat-cell *matCellDef="let element">{{ element.name }}</td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let element">
                  <button mat-icon-button color="accent" (click)="openEditDialog(element)" matTooltip="Edit">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="confirmDelete(element)" matTooltip="Delete">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <div *ngIf="!isLoading && dataSource.data.length === 0" class="empty-message">
              No incident types found
            </div>

            <mat-paginator
              [pageSizeOptions]="[5, 10, 25, 50]"
              [pageSize]="10"
              showFirstLastButtons
              aria-label="Select page of incident types">
            </mat-paginator>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .page-card {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .page-header mat-card-title {
      margin: 0;
    }

    .content-area {
      position: relative;
      min-height: 120px;
    }

    .loading-overlay {
      position: absolute;
      inset: 0;
      z-index: 2;
      background: rgba(255, 255, 255, 0.85);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      padding: 60px;
    }

    .table-section {
      margin-top: 20px;
    }

    .incident-table {
      width: 100%;
    }

    .empty-message {
      padding: 40px;
      text-align: center;
      color: #999;
      font-size: 14px;
    }
  `]
})
export class CimsIncidentTypesComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<IncidentType>([]);
  displayedColumns: string[] = ['id', 'name', 'actions'];
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cimsService: CimsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadIncidentTypes();
  }

  ngAfterViewInit(): void {
    // The paginator element is always present now, so this reference is
    // valid immediately and stays valid — no need to re-bind on every load.
    this.dataSource.paginator = this.paginator;
  }

  loadIncidentTypes(): void {
    this.isLoading = true;
    this.cimsService.getIncidentTypes().subscribe({
      next: (types: IncidentType[]) => {
        this.dataSource.data = types || [];
        // Assigning data resets MatTableDataSource's internal paginator
        // page index in some Angular Material versions; make sure we're
        // back on the first page after a fresh load.
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load incident types', err);
        this.snackBar.open('Failed to load incident types', 'Close', { duration: 5000 });
        this.isLoading = false;
      }
    });
  }

  openCreateDialog(): void {
    const dialogData: IncidentTypeDialogData = { mode: 'create' };

    this.dialog.open(IncidentTypeDialogComponent, {
      width: '400px',
      data: dialogData
    }).afterClosed().subscribe((result: IncidentTypeDialogResult | undefined) => {
      if (!result) {
        return; // user cancelled
      }
      this.cimsService.createIncidentType(result.name).subscribe({
        next: () => {
          this.snackBar.open('Incident type created successfully', 'Close', { duration: 3000 });
          this.loadIncidentTypes();
        },
        error: (err: any) => {
          const errorMsg = err.error?.message || 'Failed to create incident type';
          this.snackBar.open(errorMsg, 'Close', { duration: 5000 });
        }
      });
    });
  }

  openEditDialog(type: IncidentType): void {
    const dialogData: IncidentTypeDialogData = { mode: 'edit', incidentType: type };

    this.dialog.open(IncidentTypeDialogComponent, {
      width: '400px',
      data: dialogData
    }).afterClosed().subscribe((result: IncidentTypeDialogResult | undefined) => {
      if (!result) {
        return; // user cancelled
      }
      this.cimsService.updateIncidentType(type.id, result.name).subscribe({
        next: () => {
          this.snackBar.open('Incident type updated successfully', 'Close', { duration: 3000 });
          this.loadIncidentTypes();
        },
        error: (err: any) => {
          const errorMsg = err.error?.message || 'Failed to update incident type';
          this.snackBar.open(errorMsg, 'Close', { duration: 5000 });
        }
      });
    });
  }

  confirmDelete(type: IncidentType): void {
    if (confirm(`Remove "${type.name}"? If the backend supports hard delete this will remove it permanently; otherwise it will be deactivated so it's no longer offered for new tickets.`)) {
      this.deleteIncidentType(type);
    }
  }

  // Attempts a real hard delete first. As of now the backend returns a 500
  // with "Request method 'DELETE' is not supported" for this endpoint —
  // i.e. DELETE isn't actually wired up server-side yet, which is a
  // backend gap, not something fixable from this component. Rather than
  // leaving the button broken, this falls back to the existing
  // deactivate-via-PUT path in that specific case, and is explicit with
  // the user about which one actually happened.
  deleteIncidentType(type: IncidentType): void {
    this.cimsService.deleteIncidentType(type.id).subscribe({
      next: () => {
        this.snackBar.open('Incident type deleted successfully', 'Close', { duration: 3000 });
        this.loadIncidentTypes();
      },
      error: (err: any) => {
        const message = (err?.error?.message || '').toLowerCase();
        const deleteNotSupported = err?.status === 500 && message.includes('delete') && message.includes('not supported');

        if (deleteNotSupported) {
          this.cimsService.updateIncidentType(type.id, type.name, false).subscribe({
            next: () => {
              this.snackBar.open(
                "Hard delete isn't supported by the backend yet, so this incident type was deactivated instead.",
                'Close',
                { duration: 6000 }
              );
              this.loadIncidentTypes();
            },
            error: (fallbackErr: any) => {
              const fallbackMsg = fallbackErr.error?.message || 'Failed to deactivate incident type';
              this.snackBar.open(fallbackMsg, 'Close', { duration: 5000 });
            }
          });
          return;
        }

        const errorMsg = err.error?.message || 'Failed to delete incident type';
        this.snackBar.open(errorMsg, 'Close', { duration: 5000 });
      }
    });
  }
}