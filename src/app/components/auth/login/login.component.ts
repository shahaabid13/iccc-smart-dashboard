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
      <div class="left-overlay"></div>
    </div>

    <div class="login-right">
      <div class="login-box">
        <h2>Welcome Back</h2>
        <p class="subtitle">Sign in to continue to ICCC Dashboard</p>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" novalidate>
          <div class="form-group" [class.invalid]="isInvalid('username')">
            <label for="username">Username</label>
            <div class="input-wrapper">
              <i class="fa fa-user input-icon"></i>
              <input
                id="username"
                type="text"
                formControlName="username"
                placeholder="Enter username"
                autocomplete="username"
              />
            </div>
            <small class="error-text" *ngIf="isInvalid('username')">Username is required</small>
          </div>

          <div class="form-group" [class.invalid]="isInvalid('password')">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <i class="fa fa-lock input-icon"></i>
              <input
                id="password"
                [type]="showPassword ? 'text' : 'password'"
                formControlName="password"
                placeholder="Enter password"
                autocomplete="current-password"
              />
              <button
                type="button"
                class="toggle-password"
                (click)="togglePasswordVisibility()"
                [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'"
                tabindex="-1"
              >
                <i class="fa" [ngClass]="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
              </button>
            </div>
            <small class="error-text" *ngIf="isInvalid('password')">Password is required</small>
          </div>

          <button type="submit" [disabled]="submitting" class="btn-login">
            <span *ngIf="!submitting">LOGIN</span>
            <span *ngIf="submitting" class="btn-loading">
              <span class="spinner"></span> Logging in...
            </span>
          </button>
        </form>

        <div class="footer-links">
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    * {
      box-sizing: border-box;
    }

    html, body {
      overflow-x: hidden;
    }

    .login-wrapper {
      display: flex;
      min-height: 100vh;
      width: 100%;
      font-family: 'Poppins', 'Segoe UI', sans-serif;
      // background: #f3f6fa;
    }

    /* ---------- LEFT PANEL (hero image) ---------- */
    .login-left {
      flex: 1;
      position: relative;
      overflow: hidden;
      // background: #0e2543;
    }

    .left-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-top-left-radius: 50px;
      border-bottom-left-radius: 50px;
    }

    .left-overlay {
      position: absolute;
      inset: 0;
      // background: linear-gradient(180deg, rgba(14, 37, 67, 0.15) 0%, rgba(14, 37, 67, 0.55) 100%);
    }

    /* ---------- RIGHT PANEL (form) ---------- */
    .login-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      padding: 24px;
      min-width: 0; /* allow flex child to shrink below its content width */
    }

    .login-box {
      width: 380px;
      max-width: 100%;
      padding: 40px 36px;
      background: #fff;
      box-shadow: 0 8px 32px rgba(14, 37, 67, 0.10);
      border-radius: 16px;
      border: 1px solid #eef1f5;
    }

    .login-box h2 {
      margin: 0 0 6px;
      font-size: 26px;
      font-weight: 700;
      color: #16324f;
      text-align: center;
    }

    .subtitle {
      margin: 0 0 28px;
      font-size: 13.5px;
      color: #8a94a3;
      text-align: center;
    }

    /* ---------- FORM FIELDS ---------- */
    .form-group {
      text-align: left;
      margin-bottom: 20px;
    }

    .form-group label {
      font-size: 13px;
      font-weight: 600;
      color: #3c4657;
      display: block;
      margin-bottom: 6px;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: 14px;
      font-size: 14px;
      color: #9aa5b5;
      pointer-events: none;
    }

    .form-group input {
      width: 100%;
      padding: 12px 14px 12px 40px;
      border: 1.5px solid #e2e6ed;
      border-radius: 10px;
      outline: none;
      /* 16px minimum keeps iOS Safari from auto-zooming the page on focus */
      font-size: 16px;
      color: #1f2733;
      background: #fbfcfe;
      transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
      -webkit-appearance: none;
    }

    .form-group input::placeholder {
      color: #b3bac6;
    }

    .form-group input:focus {
      border-color: #1668dc;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(22, 104, 220, 0.12);
    }

    .form-group.invalid input {
      border-color: #e5484d;
      background: #fff8f8;
    }

    .form-group.invalid input:focus {
      box-shadow: 0 0 0 3px rgba(229, 72, 77, 0.12);
    }

    /* Password visibility toggle */
    .toggle-password {
      position: absolute;
      right: 4px;
      background: none;
      border: none;
      cursor: pointer;
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #9aa5b5;
      border-radius: 6px;
      transition: color 0.2s ease, background 0.2s ease;
    }

    .toggle-password:hover {
      color: #1668dc;
      background: rgba(22, 104, 220, 0.08);
    }

    .toggle-password i {
      font-size: 14px;
    }

    /* Password field needs extra right padding so text doesn't run under the eye icon */
    #password {
      padding-right: 42px;
    }

    /* ---------- VALIDATION MESSAGE ---------- */
    .error-text {
      display: block;
      color: #e5484d;
      font-size: 12px;
      font-weight: 500;
      margin-top: 6px;
      line-height: 1.3;
    }

    /* ---------- SUBMIT BUTTON ---------- */
    .btn-login {
      width: 100%;
      padding: 13px;
      background: linear-gradient(135deg, #16324f 0%, #1668dc 100%);
      border: none;
      color: white;
      font-weight: 600;
      font-size: 14.5px;
      letter-spacing: 0.5px;
      border-radius: 10px;
      cursor: pointer;
      margin-top: 8px;
      transition: opacity 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease;
      box-shadow: 0 4px 14px rgba(22, 104, 220, 0.25);
      min-height: 46px; /* comfortable tap target */
    }

    .btn-login:hover:not(:disabled) {
      opacity: 0.94;
      box-shadow: 0 6px 18px rgba(22, 104, 220, 0.32);
    }

    .btn-login:active:not(:disabled) {
      transform: translateY(1px);
    }

    .btn-login:disabled {
      opacity: 0.65;
      cursor: not-allowed;
      box-shadow: none;
    }

    .btn-loading {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-top-color: #fff;
      border-radius: 50%;
      display: inline-block;
      animation: spin 0.7s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .footer-links {
      display: flex;
      justify-content: space-between;
      margin-top: 14px;
      font-size: 13px;
    }

    .footer-links a {
      color: #1668dc;
      text-decoration: none;
      font-weight: 500;
      transition: 0.2s;
    }

    .footer-links a:hover {
      text-decoration: underline;
    }

    /* =====================================================
       RESPONSIVE BREAKPOINTS
       ===================================================== */

    /* Tablets / small laptops: narrow the hero panel a bit so the
       form doesn't get squeezed */
    @media (max-width: 992px) {
      .login-left {
        flex: 0 0 40%;
      }
      .login-right {
        flex: 1;
      }
    }

    /* Phones (portrait & landscape small): stack the hero above the form
       instead of hiding it outright */
    @media (max-width: 600px) {
      .login-wrapper {
        flex-direction: column;
        min-height: 100vh;
        height: auto;
      }

      .login-left {
        flex: 0 0 auto;
        width: 100%;
        height: 34vh;
        min-height: 180px;
      }

      .left-image {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 28px;
        border-bottom-left-radius: 28px;
      }

      .login-right {
        flex: 1;
        padding: 20px 16px 32px;
      }

      .login-box {
        width: 100%;
        max-width: 420px;
        padding: 28px 22px;
        border-radius: 14px;
        box-shadow: 0 4px 20px rgba(14, 37, 67, 0.08);
      }

      .login-box h2 {
        font-size: 22px;
      }

      .subtitle {
        margin-bottom: 22px;
      }

      .form-group {
        margin-bottom: 16px;
      }
    }

    /* Very small phones */
    @media (max-width: 380px) {
      .login-left {
        height: 26vh;
        min-height: 140px;
      }

      .login-box {
        padding: 22px 16px;
      }

      .login-box h2 {
        font-size: 20px;
      }

      .form-group input {
        padding: 11px 12px 11px 36px;
      }

      .input-icon {
        left: 12px;
      }

      .btn-login {
        font-size: 14px;
      }
    }

    /* Short viewports (landscape phones, small laptops with browser chrome):
       don't let the hero eat all the vertical space */
    @media (max-height: 560px) and (orientation: landscape) {
      .login-wrapper {
        flex-direction: row;
      }
      .login-left {
        flex: 0 0 42%;
        height: auto;
      }
      .login-right {
        padding: 16px;
      }
      .login-box {
        padding: 24px 24px;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  submitting = false;
  showPassword = false;

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

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      // Show validation messages immediately even if the user never
      // focused/blurred the fields (e.g. clicking Login on an empty form).
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;
    this.submitting = true;

    this.authService.login(username, password).subscribe({
      next: () => {
        // After login, route every user to the unified Home Dashboard
        this.router.navigate(['/home']);
      },
      error: () => {
        alert('❌ Invalid username or password');
        this.submitting = false;
      },
      complete: () => (this.submitting = false)
    });
  }
}