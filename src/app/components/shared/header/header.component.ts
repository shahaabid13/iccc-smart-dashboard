import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-header',
  template: `
    <header class="app-header">
      <div class="logo-container">
        <img src="/logo.jfif" alt="Logo" class="logo-img" />
                <div class="logo-text">ICCC - Inventory Management System</div>
      </div>

      <nav class="nav" *ngIf="user">
        <!-- Inventory/SMC dropdown -->
        <div class="nav-dropdown" (click)="toggleNavDropdown($event)">
          <span class="nav-label">Inventory</span>
          <div class="nav-submenu" *ngIf="navDropdownOpen" (click)="$event.stopPropagation()">
            <a (click)="goTo('/inventory')" class="submenu-link">Inventory</a>
            <a (click)="goTo('/smc')" class="submenu-link">SWM</a>
          </div>
        </div>

        <!-- Admin only -->
        <ng-container *ngIf="isAdmin">
          <a routerLink="/admin/dashboard" routerLinkActive="active">Admin Dashboard</a>
          <a routerLink="/admin/all-requests" routerLinkActive="active">All Requests</a>
          <a routerLink="/maintenance/request" routerLinkActive="active">Maintenance Request</a>
        </ng-container>

        <!-- Agency only -->
        <ng-container *ngIf="isAgency">
          <a routerLink="/maintenance/request" routerLinkActive="active">Maintenance Request</a>
          <a routerLink="/admin/all-requests" routerLinkActive="active">All Requests</a>
        </ng-container>
      </nav>

      <div class="auth">
        <div class="profile" (click)="toggleDropdown($event)">
          <img src="/download.png" alt="Profile" class="profile-icon" />
          <div class="dropdown" *ngIf="dropdownOpen" (click)="$event.stopPropagation()">
            <ng-container *ngIf="user; else guestOptions">
              <p class="user-info">{{ user.username }} ({{ user.role }})</p>
              <button (click)="logout()">Logout</button>
              <a routerLink="/login" (click)="closeDropdown()" class="dropdown-link">
                Login with another ID
              </a>

              <ng-container *ngIf="isAdmin">
                <a routerLink="/register" (click)="closeDropdown()" class="dropdown-link">Create Account</a>
                <a routerLink="/forgot-password" (click)="closeDropdown()" class="dropdown-link">Forgot password?</a>
              </ng-container>

            </ng-container>

            <ng-template #guestOptions>
              <a routerLink="/login" (click)="closeDropdown()" class="dropdown-link">Login</a>
              <a routerLink="/register" (click)="closeDropdown()" class="dropdown-link">Register</a>
            </ng-template>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      border-bottom: 1px solid #eee;
      background-color: #122e52ff;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
      position: relative;
      color: #fff;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .logo-img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
    }

    .logo-text {
      font-weight: 600;
      font-size: 2rem;
      font-family: 'Raleway';
      color: #fff;
    }

    .nav a {
      margin-right: 16px;
      text-decoration: none;
      color: #ffffff;
      transition: color 0.2s;
      font-size: 1.2rem;
      font-family: 'Raleway';
    }

    .nav a:hover, .nav a.active {
      color: #00bfff;
      font-weight: 600;
    }

    .nav-dropdown {
      position: relative;
      display: inline-block;
      margin-right: 16px;
      cursor: pointer;
      font-size: 1.2rem;
      font-family: 'Raleway';
      color: #ffffff;
    }

    .nav-label::after {
      content: ' ▼';
      font-size: 0.8rem;
      opacity: 0.9;
    }

    .nav-submenu {
      position: absolute;
      top: 30px;
      left: 0;
      background: #fff;
      color: #130303ff !important;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
      padding: 6px 0;
      min-width: 140px;
      z-index: 1000;
    }

    .submenu-link {
      display: block;
      padding: 8px 12px;
      text-decoration: none;
      color: #130303ff !important;
      font-size: 1rem;
    }

   

    .auth {
      position: relative;
    }

    .profile {
      position: relative;
      cursor: pointer;
    }

    .profile-icon {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #ddd;
      background-color: #fff;
      transition: transform 0.1s ease-in;
    }

    .profile-icon:hover {
      transform: scale(1.05);
    }

    .dropdown {
      position: absolute;
      right: 0;
      top: 45px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 6px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      min-width: 170px;
      padding: 8px;
      z-index: 1000;
      animation: fadeIn 0.2s ease-in-out;
    }

    .dropdown button {
      display: block;
      width: 100%;
      background: none;
      border: none;
      text-align: left;
      padding: 6px 10px;
      cursor: pointer;
      border-radius: 4px;
      color: #333;
      font-size: 0.95rem;
      transition: background 0.2s;
    }

    .dropdown button:hover {
      background: #f1f1f1;
    }

    .dropdown-link {
      display: block;
      width: 100%;
      text-align: left;
      padding: 6px 10px;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.2s;
      color: #333;
      text-decoration: none;
      font-size: 0.95rem;
    }

    .dropdown-link:hover {
      background: #f1f1f1;
    }

    .user-info {
      font-weight: bold;
      margin-bottom: 8px;
      color: #333;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-5px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  dropdownOpen = false;
  navDropdownOpen = false;
  user: any = null;
  isAdmin = false;
  isAgency = false;

  private destroy$ = new Subject<void>();

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // 🔹 Load from BehaviorSubject (reactive)
    this.auth.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((u) => {
        this.user = u;
        const role = u?.role?.toUpperCase();
        this.isAdmin = role === 'ADMIN';
        this.isAgency = role === 'AGENCY';
      });

    // 🔹 Restore user from localStorage on page refresh
    const stored = localStorage.getItem('currentUser');
    if (stored && !this.user) {
      const parsed = JSON.parse(stored);
      this.auth.setCurrentUser(parsed); // helper in AuthService
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleNavDropdown(event: Event) {
    event.stopPropagation();
    this.navDropdownOpen = !this.navDropdownOpen;
  }

  goTo(route: string) {
    this.closeDropdown();
    this.navDropdownOpen = false;
    this.router.navigate([route]);
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  logout() {
    this.auth.logout();
    this.closeDropdown();
    this.router.navigate(['/login']);
  }

  @HostListener('document:click')
  onDocumentClick() {
    if (this.dropdownOpen) this.closeDropdown();
    if (this.navDropdownOpen) this.navDropdownOpen = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
