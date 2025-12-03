import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  template: `
  <div class="login-wrapper">
    <div class="login-left">
      <img src="/IMG_20251203_100849.jpg" alt="hero" class="left-image" />
    </div>

    <div class="login-right">
      <div class="login-box">
        <h2>Login</h2>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group" [class.invalid]="isInvalid('username')">
            <label><i class="fa fa-user"></i> Username</label>
            <input type="text" formControlName="username" placeholder="Enter username" />
            <small *ngIf="isInvalid('username')">Username is required</small>
          </div>

          <div class="form-group" [class.invalid]="isInvalid('password')">
            <label><i class="fa fa-lock"></i> Password</label>
            <input type="password" formControlName="password" placeholder="Enter password" />
            <small *ngIf="isInvalid('password')">Password is required</small>
          </div>

          <button type="submit" [disabled]="loginForm.invalid || submitting" class="btn-login">
            {{ submitting ? 'Logging in...' : 'LOGIN' }}
          </button>
        </form>

        <div class="footer-links">
        </div>

        <div class="social-icons">
          <span class="circle blue"></span>
          <span class="circle red"></span>
          <span class="circle pink"></span>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .login-wrapper {
      display: flex;
      height: 100vh;
      font-family: 'Poppins', sans-serif;
      background: #f3f6fa;
    }
    .login-left {
      flex: 1;
      display: block;
      overflow: hidden;
      background: #fff;
    }
    .left-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .login-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
    }
    .login-box {
      width: 360px;
      padding: 30px;
      text-align: center;
      background: #fff;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      border-radius: 12px;
    }
    .login-box h2 {
      margin-bottom: 24px;
      font-size: 26px;
      font-weight: 600;
      color: #333;
    }
    .form-group {
      text-align: left;
      margin-bottom: 18px;
      position: relative;
    }
    .form-group label {
      font-size: 14px;
      color: #555;
      display: block;
      margin-bottom: 5px;
    }
    .form-group input {
      width: 100%;
      padding: 10px;
      border: none;
      border-bottom: 2px solid #ccc;
      outline: none;
      font-size: 15px;
      transition: 0.3s;
    }
    .form-group.invalid input {
      border-bottom: 2px solid #ff5252;
    }
    .form-group small {
      color: #ff5252;
      font-size: 12px;
      position: absolute;
      bottom: -18px;
    }
    .form-group input:focus {
      border-bottom: 2px solid #007bff;
    }
    .btn-login {
      width: 100%;
      padding: 12px;
      background: linear-gradient(to right, #00c6ff, #5a00ff);
      border: none;
      color: white;
      font-weight: 600;
      border-radius: 25px;
      cursor: pointer;
      margin-top: 20px;
      transition: 0.3s;
    }
    .btn-login:hover {
      opacity: 0.9;
    }
    .btn-login:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .footer-links {
      display: flex;
      justify-content: space-between;
      margin-top: 14px;
      font-size: 13px;
    }
    .footer-links a {
      color: #5a00ff;
      text-decoration: none;
      font-weight: 500;
      transition: 0.2s;
    }
    .footer-links a:hover {
      text-decoration: underline;
    }
    .social-icons {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-top: 16px;
    }
    .circle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
    }
    .circle.blue { background-color: #3b5998; }
    .circle.red { background-color: #00acee; }
    .circle.pink { background-color: #ea4c89; }
    @media (max-width: 768px) {
      .login-wrapper { flex-direction: column; }
      .login-left { display: none; }
      .login-box { width: 90%; }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isInvalid(control: string): boolean {
    const ctrl = this.loginForm.get(control);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.submitting = true;

      this.authService.login(username, password).subscribe({
        next: (res) => {
          // ✅ Store JWT token
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);

          // ✅ Notify AuthService

          // ✅ Navigate by role
          if (res.role === 'ADMIN') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/inventory']);
          }
        },
        error: () => {
          alert('❌ Invalid username or password');
          this.submitting = false;
        },
        complete: () => (this.submitting = false)
      });
    }
  }
}
