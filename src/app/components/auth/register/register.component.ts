import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  selector: 'app-register',
  template: `
    <div class="signup-wrapper" *ngIf="isAdmin; else notAllowed">
      <div class="left-hero"></div>
      <div class="signup-panel">
        <div class="signup-card">
          <h1 class="title">Admin Registration</h1>

          <form [formGroup]="form" (ngSubmit)="submit()" class="signup-form">
            <div class="field">
              <label class="label">Username</label>
              <input class="input" placeholder="Username..." formControlName="username" />
              <div class="error" *ngIf="form.controls['username'].invalid && form.controls['username'].touched">
                Username is required
              </div>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <input class="input" placeholder="Email address..." type="email" formControlName="email" />
              <div class="error" *ngIf="form.controls['email'].invalid && form.controls['email'].touched">
                Valid email required
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <input class="input" placeholder="Password..." type="password" formControlName="password" />
              <div class="error" *ngIf="form.controls['password'].invalid && form.controls['password'].touched">
                Password is required
              </div>
            </div>

            <div class="field">
              <label class="label">Role</label>
              <select class="input" formControlName="role">
                <option value="user">User</option>
                <option value="agency">Agency</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" class="signup-btn" [disabled]="form.invalid">Register</button>
          </form>

          <div class="signin-link">
            Already have an account? <a routerLink="/login">Sign in →</a>
          </div>

          <!-- Toast Message -->
          <div *ngIf="toastMessage" class="toast" [class.show]="showToast">{{ toastMessage }}</div>
        </div>
      </div>
    </div>

    <!-- If not admin -->
    <ng-template #notAllowed>
      <div class="not-allowed">
        <h2>❌ Access Denied</h2>
        <p>Only admins can register new users.</p>
        <button (click)="router.navigate(['/login'])" class="back-btn">Go to Login</button>
      </div>
    </ng-template>
  `,
  styles: [`
    :host { display:block; }
    .signup-wrapper { display:flex; min-height:80vh; }
    .left-hero { flex:1; background-image: url('/IMG_20251203_100859.jpg'); background-size:cover; background-position:center; position:relative; border-radius:8px; }
    .signup-panel { width:420px; display:flex; align-items:center; justify-content:center; background:#fff; }
    .signup-card { width:360px; padding:32px; box-shadow:0 6px 30px rgba(0,0,0,0.08); border-radius:8px; }
    .title { margin:0 0 18px 0; font-size:28px; font-weight:700; text-align:center; color:#5a00ff; }
    .signup-form { display:flex; flex-direction:column; gap:14px; }
    .label { font-size:12px; margin-bottom:6px; }
    .input { padding:10px 8px; border:none; border-bottom:1px solid #e6e6e6; outline:none; font-size:14px; }
    .input:focus { border-bottom-color:#5a00ff; }
    .signup-btn { margin-top:6px; padding:12px; border-radius:28px; border:none; color:#fff; background:linear-gradient(90deg,#ff6a88,#5a00ff); cursor:pointer; font-weight:600; }
    .signup-btn:disabled { opacity:0.6; cursor:not-allowed; }
    .signin-link { margin-top:12px; font-size:13px; color:#666; text-align:right; }
    .signin-link a { color:#5a00ff; text-decoration:none; font-weight:600; }

    /* Toast styling */
    .toast { visibility:hidden; opacity:0; transition:opacity .3s; margin-top:12px; background:#333; color:#fff; padding:10px 12px; border-radius:6px; text-align:center; }
    .toast.show { visibility:visible; opacity:1; }

    /* Not allowed view */
    .not-allowed {
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      height:80vh; text-align:center;
    }
    .not-allowed h2 { color:#b71c1c; margin-bottom:10px; }
    .not-allowed p { color:#555; margin-bottom:20px; }
    .back-btn {
      background:#5a00ff; color:white; border:none; padding:10px 20px;
      border-radius:6px; cursor:pointer; font-weight:600;
    }

    @media (max-width:900px) {
      .signup-wrapper { flex-direction:column; }
      .left-hero { height:240px; width:100%; }
      .signup-panel { width:100%; }
    }
  `]
})
export class RegisterComponent {
  form!: FormGroup;
  toastMessage = '';
  showToast = false;
  isAdmin = false;

  constructor(private fb: FormBuilder, private auth: AuthService, public router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required],
    });
  }

  ngOnInit() {
    // Get current logged-in user from localStorage
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.isAdmin = user.role === 'ADMIN';
    } else {
      this.isAdmin = false;
    }

    // Redirect non-admins automatically
    if (!this.isAdmin) {
      setTimeout(() => this.router.navigate(['/login']), 2000);
    }
  }

  private showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 3000);
  }

  submit() {
    if (this.form.invalid) return;

    const user = this.form.value;

    const storedUsers = localStorage.getItem('mockUsers');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // Check if username/email already exists
    const exists = users.some((u: any) => u.username === user.username || u.email === user.email);
    if (exists) {
      this.showToastMessage('User already exists. Try another username or email.');
      return;
    }

    const newUser = {
      id: `local-${Date.now()}`,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    };

    users.push(newUser);
    localStorage.setItem('mockUsers', JSON.stringify(users));

    this.showToastMessage('Registration successful! Redirecting to login...');

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }
}
