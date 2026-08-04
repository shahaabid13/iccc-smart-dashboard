import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { CreateAdminUserRequest, UpdateUserRequest } from '../../models/cims.models';
import { CimsService } from '../../services/cims.service';

interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phone?: string;
  role: string;
  password?: string; // only used when creating a new user, never populated on edit
}

@Component({
  selector: 'app-cims-user-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSelectModule
  ],
  template: `
    <div class="container">
      <mat-card class="page-card">
        <mat-card-header>
          <mat-card-title>User Management</mat-card-title>
          <button mat-raised-button color="primary" (click)="openCreateDialog()">
            <mat-icon>person_add</mat-icon>
            Add New User
          </button>
        </mat-card-header>

        <mat-card-content>
          <!-- Loading -->
          <div *ngIf="isLoading" class="loading-container">
            <mat-spinner diameter="40"></mat-spinner>
            <p>Loading users...</p>
          </div>

          <!-- Table -->
          <div *ngIf="!isLoading" class="table-section">
            <table mat-table [dataSource]="users" class="users-table">
              <ng-container matColumnDef="username">
                <th mat-header-cell *matHeaderCellDef>Username</th>
                <td mat-cell *matCellDef="let element">{{ element.username }}</td>
              </ng-container>

              <ng-container matColumnDef="fullName">
                <th mat-header-cell *matHeaderCellDef>Full Name</th>
                <td mat-cell *matCellDef="let element">{{ element.fullName }}</td>
              </ng-container>

              <ng-container matColumnDef="email">
                <th mat-header-cell *matHeaderCellDef>Email</th>
                <td mat-cell *matCellDef="let element">{{ element.email }}</td>
              </ng-container>

              <ng-container matColumnDef="phone">
                <th mat-header-cell *matHeaderCellDef>Phone</th>
                <td mat-cell *matCellDef="let element">{{ element.phone }}</td>
              </ng-container>

              <ng-container matColumnDef="role">
                <th mat-header-cell *matHeaderCellDef>Role</th>
                <td mat-cell *matCellDef="let element">
                  <span class="role-badge" [class]="'role-' + element.role.toLowerCase()">
                    {{ element.role }}
                  </span>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let element">
                  <button mat-icon-button color="accent" (click)="editUser(element)" matTooltip="Edit">
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

            <div *ngIf="users.length === 0" class="empty-message">
              No users found
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>

    <!-- Edit Dialog -->
    <div *ngIf="showEditDialog" class="dialog-overlay" (click)="closeDialog()">
      <mat-card class="dialog-card" (click)="$event.stopPropagation()">
        <mat-card-header>
          <mat-card-title>{{ editingUser.id ? 'Edit User' : 'Create User' }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="form-group">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Username</mat-label>
              <input matInput [(ngModel)]="editingUser.username" [readonly]="!!editingUser.id">
            </mat-form-field>
          </div>

          <!-- Password: only shown when creating a new user -->
          <div class="form-group" *ngIf="!editingUser.id">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput [(ngModel)]="editingUser.password" type="password" placeholder="Set a password">
            </mat-form-field>
          </div>

          <div class="form-group">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Full Name</mat-label>
              <input matInput [(ngModel)]="editingUser.fullName" placeholder="Enter full name">
              <mat-error *ngIf="isFieldPerson && !editingUser.fullName.trim()">
                Name is required for Field Person
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-group">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput [(ngModel)]="editingUser.email" type="email" placeholder="Enter email">
              <mat-error *ngIf="isFieldPerson && !editingUser.email?.trim()">
                Email is required for Field Person
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-group">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Phone</mat-label>
              <input matInput [(ngModel)]="editingUser.phone" placeholder="Enter phone">
              <mat-error *ngIf="isFieldPerson && !editingUser.phone?.trim()">
                Phone is required for Field Person
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-group">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Role</mat-label>
              <mat-select [(ngModel)]="editingUser.role">
                <mat-option value="ADMIN">Admin</mat-option>
                <mat-option value="SUPPORT_ENGINEER">Support Engineer</mat-option>
                <mat-option value="FIELD_PERSON">Field Person</mat-option>
                <mat-option value="REVIEWER">Reviewer</mat-option>
                <mat-option value="VIEWER">Viewer</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </mat-card-content>

        <mat-card-actions>
          <button mat-button (click)="closeDialog()">Cancel</button>
          <button mat-raised-button color="primary" (click)="saveUser()">Save</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-card {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    mat-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .table-section {
      margin-top: 20px;
    }

    .users-table {
      width: 100%;
    }

    .empty-message {
      padding: 40px;
      text-align: center;
      color: #999;
      font-size: 14px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px;
      gap: 16px;
    }

    .role-badge {
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
    }

    .role-admin {
      background-color: #ffebee;
      color: #c62828;
    }

    .role-support_engineer {
      background-color: #e3f2fd;
      color: #1565c0;
    }

    .role-field_person {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    .role-coordinator {
      background-color: #fff3e0;
      color: #e65100;
    }

    .role-reviewer {
      background-color: #f3e5f5;
      color: #6a1b9a;
    }

    .role-viewer {
      background-color: #e0f2f1;
      color: #00695c;
    }

    /* Dialog Styles */
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .dialog-card {
      width: 90%;
      max-width: 500px;
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
    }

    .form-group {
      margin-bottom: 16px;
    }

    .full-width {
      width: 100%;
    }

    mat-card-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 16px;
    }
  `]
})
export class CimsUserManagementComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['username', 'fullName', 'email', 'phone', 'role', 'actions'];
  isLoading = false;
  showEditDialog = false;
  editingUser: User = this.getEmptyUser();

  constructor(
    private cimsService: CimsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.cimsService.getUsers().subscribe({
      next: (users: any[]) => {
        // Backend may return snake_case full_name — normalize to the model shape.
        this.users = (users || []).map((rawUser: any) => ({
          id: rawUser.id,
          username: rawUser.username,
          fullName: rawUser.fullName ?? rawUser.full_name ?? '',
          email: rawUser.email ?? '',
          phone: rawUser.phone ?? '',
          role: rawUser.role
        }));
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load users', err);
        this.snackBar.open('Failed to load users', 'Close', { duration: 5000 });
        this.isLoading = false;
      }
    });
  }

  openCreateDialog(): void {
    this.editingUser = this.getEmptyUser();
    this.showEditDialog = true;
  }

  editUser(user: User): void {
    // spread the existing user but never carry a password into edit mode
    this.editingUser = { ...user, password: undefined };
    this.showEditDialog = true;
  }

  saveUser(): void {
    if (!this.editingUser.username.trim()) {
      this.snackBar.open('Username is required', 'Close', { duration: 3000 });
      return;
    }

    // Backend enforces full name, email and phone for Field Person —
    // validate up front so we don't round-trip a 400 error.
    if (this.isFieldPerson) {
      if (!this.editingUser.fullName?.trim()) {
        this.snackBar.open('Full name is required for Field Person', 'Close', { duration: 3000 });
        return;
      }
      if (!this.editingUser.email?.trim()) {
        this.snackBar.open('Email is required for Field Person', 'Close', { duration: 3000 });
        return;
      }
      if (!this.editingUser.phone?.trim()) {
        this.snackBar.open('Phone is required for Field Person', 'Close', { duration: 3000 });
        return;
      }
    }

    if (!this.editingUser.id) {
      // CREATE
      if (!this.editingUser.password || !this.editingUser.password.trim()) {
        this.snackBar.open('Password is required for new users', 'Close', { duration: 3000 });
        return;
      }

      const payload: CreateAdminUserRequest = {
        username: this.editingUser.username,
        password: this.editingUser.password,
        role: this.editingUser.role,
        fullName: this.editingUser.fullName,
        // Backend may expect `name` for certain roles (FIELD_PERSON). Include both keys.
        // This avoids 400 errors when backend validation expects `name` instead of `fullName`.
        // API: some services validate `name` for FIELD_PERSON users.
        // Keep `fullName` for backward compatibility.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        name: this.editingUser.fullName,
        email: this.editingUser.email,
        phone: this.editingUser.phone
      };

      this.cimsService.createAdminUser(payload).subscribe({
        next: () => {
          this.snackBar.open('User created successfully', 'Close', { duration: 3000 });
          this.closeDialog();
          this.loadUsers();
        },
        error: (err: any) => {
          this.snackBar.open(err.error?.message || 'Failed to create user', 'Close', { duration: 5000 });
        }
      });
      return;
    }

    // EDIT — only send editable fields (never id/password)
    const updatePayload: UpdateUserRequest = {
      username: this.editingUser.username,
      role: this.editingUser.role,
      fullName: this.editingUser.fullName,
      // include legacy `name` key as some backends expect it for FIELD_PERSON
      // @ts-ignore
      name: this.editingUser.fullName,
      email: this.editingUser.email,
      phone: this.editingUser.phone
    };

    this.cimsService.updateUser(this.editingUser.id, updatePayload).subscribe({
      next: () => {
        this.snackBar.open('User updated successfully', 'Close', { duration: 3000 });
        this.closeDialog();
        this.loadUsers();
      },
      error: (err: any) => {
        this.snackBar.open(err.error?.message || 'Failed to update user', 'Close', { duration: 5000 });
      }
    });
  }

  confirmDelete(user: User): void {
    if (confirm(`Are you sure you want to delete user "${user.username}"? This action cannot be undone.`)) {
      this.deleteUser(user.id);
    }
  }

  deleteUser(id: number): void {
    this.cimsService.deleteUser(id).subscribe({
      next: () => {
        this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
        this.loadUsers();
      },
      error: (err: any) => {
        const errorMsg = err.error?.message || 'Failed to delete user';
        this.snackBar.open(errorMsg, 'Close', { duration: 5000 });
      }
    });
  }

  closeDialog(): void {
    this.showEditDialog = false;
    this.editingUser = this.getEmptyUser();
  }

  private getEmptyUser(): User {
    return {
      id: 0,
      username: '',
      fullName: '',
      email: '',
      phone: '',
      role: 'VIEWER',
      password: ''
    };
  }
  get isFieldPerson(): boolean {
    return this.editingUser.role === 'FIELD_PERSON';
  }}
