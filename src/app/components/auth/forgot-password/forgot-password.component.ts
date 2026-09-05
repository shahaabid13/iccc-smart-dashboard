import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <div class="forgot-container">
      <mat-card class="forgot-card">
        <div class="header">
          <h2>Reset Your Password</h2>
          <p>Please enter your registered email address to verify your account.</p>
        </div>

        <!-- Email Verification -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email Address</mat-label>
          <input
            matInput
            type="email"
            placeholder="you@example.com"
            [(ngModel)]="email"
          />
        </mat-form-field>

        <div class="btn-row">
          <button
            mat-flat-button
            color="primary"
            (click)="verify()"
            [disabled]="!email"
          >
            Verify Email
          </button>
        </div>

        <p class="message" *ngIf="message">{{ message }}</p>

        <!-- Password Reset Section -->
        <div *ngIf="verified" class="password-section">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>New Password</mat-label>
            <input
              matInput
              type="password"
              placeholder="Enter new password"
              [(ngModel)]="newPassword"
            />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Confirm Password</mat-label>
            <input
              matInput
              type="password"
              placeholder="Confirm new password"
              [(ngModel)]="confirmPassword"
            />
          </mat-form-field>

          <div class="btn-row">
            <button
              type="button"
              class="primary-btn"
              (click)="setNewPassword()"
              [disabled]="!canSetNew()"
            >
              Set New Password
            </button>
          </div>
          <div *ngIf="verified" class="validation-messages">
            <p *ngIf="newPassword && newPassword.length < 6" class="warn">Password must be at least 6 characters.</p>
            <p *ngIf="newPassword && confirmPassword && newPassword !== confirmPassword" class="warn">Passwords do not match.</p>
          </div>
        </div>

        <div class="links">
          <a routerLink="/login">Back to Login</a>
          <span>&nbsp;|&nbsp;</span>
          <a routerLink="/register">Register</a>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .forgot-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh;
      border-radius:8px;
      margin-top:20px;
      background: linear-gradient(135deg, #5a00ff, #00c6ff);
      font-family: 'Poppins', sans-serif;
        background-image: url('/scs.jpg');
    }

    .forgot-card {
      width: 420px;
      padding: 32px 28px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      border-radius: 12px;
      background-color: #fff;
      animation: fadeIn 0.5s ease;
    }

    .header {
      text-align: center;
      margin-bottom: 20px;
    }

    .header h2 {
      margin-bottom: 6px;
      font-weight: 600;
      color: #3f51b5;
    }

    .header p {
      font-size: 14px;
      color: #666;
    }

    .full-width {
      width: 100%;
      margin-top: 10px;
    }

    .btn-row {
      text-align: right;
      margin-top: 15px;
    }

    .btn-row button {
      padding: 8px 18px;
      border-radius: 6px;
    }

    /* Fallback primary button style for environments without Material theme */
    .primary-btn {
      background: linear-gradient(90deg,#00c6ff,#5a00ff);
      color: #fff;
      border: none;
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }

    .primary-btn[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: none;
    }

    .validation-messages { margin-top: 8px; }
    .warn { color: #d32f2f; font-size: 13px; margin: 4px 0; }

    .password-section {
      margin-top: 20px;
      border-top: 1px solid #eee;
      padding-top: 15px;
    }

    .message {
      color: #444;
      margin-top: 12px;
      text-align: center;
      font-size: 14px;
    }

    .links {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
    }

    .links a {
      color: #5a00ff;
      text-decoration: none;
      font-weight: 500;
    }

    .links a:hover {
      text-decoration: underline;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 480px) {
      .forgot-card {
        width: 90%;
        padding: 24px 18px;
      }
    }
  `]
})
export class ForgotPasswordComponent {
verify() {
throw new Error('Method not implemented.');
}
setNewPassword() {
throw new Error('Method not implemented.');
}
  email = '';
  message = '';
  verified = false;
  newPassword = '';
  confirmPassword = '';
  apiUrl: any;
  http: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  verifyEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-email`, { email });
  }

  canSetNew() {
    return (
      this.verified &&
      this.newPassword &&
      this.newPassword.length >= 6 &&
      this.newPassword === this.confirmPassword
    );
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { email, newPassword });
  }
}
