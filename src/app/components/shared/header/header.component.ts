import { Component, HostListener, OnDestroy, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SidebarService } from '../../../services/sidebar.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-header',
  template: `
    <div class="header-layout">
      <!-- Mobile Toggle Button -->
      <div class="mobile-toggle" *ngIf="isMobile" (click)="toggleSidebar()">
        <span class="toggle-icon">☰</span>
      </div>

      <!-- Sidebar Navigation -->
      <aside class="sidebar" [class.collapsed]="isSidebarCollapsed" [class.mobile-open]="isMobile && !isSidebarCollapsed">
      <div class="sidebar-header">
        <h2 class="dashboard-title" *ngIf="!isSidebarCollapsed">ICCC Dashboard</h2>
        <div class="sidebar-toggle" (click)="toggleSidebar()">
          <span class="toggle-icon">{{ isSidebarCollapsed ? '→' : '←' }}</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <!-- Inventory Management Dropdown -->
        <div class="nav-section" *ngIf="!isSidebarCollapsed">
          <div class="section-label">Inventory Management System</div>
        </div>
        
        <div class="dropdown-container" [class.collapsed]="isSidebarCollapsed">
          <div class="dropdown-header" (click)="toggleDropdown('inventory')">
            <span class="dropdown-icon">📦</span>
            <span class="dropdown-title" *ngIf="!isSidebarCollapsed">Inventory</span>
            <span class="dropdown-arrow" *ngIf="!isSidebarCollapsed">
              {{ openDropdown === 'inventory' ? '▲' : '▼' }}
            </span>
          </div>
          
          <div class="dropdown-content" *ngIf="openDropdown === 'inventory' && !isSidebarCollapsed">
            <a routerLink="/inventory" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">📋</span>
              <span>Inventory</span>
            </a>
            <a routerLink="/admin/dashboard" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()" *ngIf="isAdmin">
              <span class="item-icon">👨‍💼</span>
              <span>Admin Dashboard</span>
            </a>
            <a routerLink="/admin/all-requests" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()" *ngIf="isAdmin || isAgency">
              <span class="item-icon">📄</span>
              <span>All Requests</span>
            </a>
            <a routerLink="/maintenance/request" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()" *ngIf="isAdmin || isAgency">
              <span class="item-icon">🔧</span>
              <span>Maintenance Request</span>
            </a>
          </div>
        </div>

        <!-- SWM Dropdown -->
        <div class="nav-section" *ngIf="!isSidebarCollapsed">
          <div class="section-label">SWM</div>
        </div>
        
        <div class="dropdown-container" [class.collapsed]="isSidebarCollapsed">
          <div class="dropdown-header" (click)="toggleDropdown('swm')">
            <span class="dropdown-icon">♻️</span>
            <span class="dropdown-title" *ngIf="!isSidebarCollapsed">SWM</span>
            <span class="dropdown-arrow" *ngIf="!isSidebarCollapsed">
              {{ openDropdown === 'swm' ? '▲' : '▼' }}
            </span>
          </div>
          
          <div class="dropdown-content" *ngIf="openDropdown === 'swm' && !isSidebarCollapsed">
            <a routerLink="/smc" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">📊</span>
              <span>SWM Dashboard</span>
            </a>
            <a routerLink="/charts" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">📈</span>
              <span>Charts</span>
            </a>
          </div>
        </div>

        <!-- PBS Dropdown -->
        <div class="nav-section" *ngIf="!isSidebarCollapsed">
          <div class="section-label">PBS</div>
        </div>
        
        <div class="dropdown-container" [class.collapsed]="isSidebarCollapsed">
          <div class="dropdown-header" (click)="toggleDropdown('pbs')">
            <span class="dropdown-icon">🏢</span>
            <span class="dropdown-title" *ngIf="!isSidebarCollapsed">PBS</span>
            <span class="dropdown-arrow" *ngIf="!isSidebarCollapsed">
              {{ openDropdown === 'pbs' ? '▲' : '▼' }}
            </span>
          </div>
          
          <div class="dropdown-content" *ngIf="openDropdown === 'pbs' && !isSidebarCollapsed">
            <a routerLink="/coming-soon" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">A</span>
              <span>Option A</span>
            </a>
            <a routerLink="/coming-soon" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">B</span>
              <span>Option B</span>
            </a>
          </div>
        </div>

        <!-- ANPR Analytics Dropdown -->
        <div class="nav-section" *ngIf="!isSidebarCollapsed">
          <div class="section-label">ANPR Analytics</div>
        </div>
        
        <div class="dropdown-container" [class.collapsed]="isSidebarCollapsed">
          <div class="dropdown-header" (click)="toggleDropdown('anpr')">
            <span class="dropdown-icon">📹</span>
            <span class="dropdown-title" *ngIf="!isSidebarCollapsed">ANPR Analytics</span>
            <span class="dropdown-arrow" *ngIf="!isSidebarCollapsed">
              {{ openDropdown === 'anpr' ? '▲' : '▼' }}
            </span>
          </div>
          
          <div class="dropdown-content" *ngIf="openDropdown === 'anpr' && !isSidebarCollapsed">
            <a routerLink="/anpr/analytics-table" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">📋</span>
              <span>Analytics Table</span>
            </a>
            <a routerLink="/anpr/analytics-charts" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">📊</span>
              <span>Analytics Charts</span>
            </a>
          </div>
        </div>
      </nav>

      <!-- Sidebar Footer -->
      <div class="sidebar-footer" *ngIf="!isSidebarCollapsed">
        <div class="user-info">
          <img src="/download.png" alt="Profile" class="user-avatar" />
          <div class="user-details">
            <div class="user-name">{{ user?.username || 'Guest' }}</div>
            <div class="user-role">{{ user?.role || 'No Role' }}</div>
          </div>
        </div>
        <div class="version-info">v1.0.0</div>
      </div>
    </aside>

    <!-- Main Header -->
    <header class="app-header">
      <div class="logo-container">
        <img src="/logo.jfif" alt="Logo" class="logo-img" />
        <div class="logo-text">ICCC SMART DASHBOARD</div>
      </div>

      <div class="auth">
        <div class="profile" (click)="toggleUserDropdown($event)">
          <img src="/download.png" alt="Profile" class="profile-icon" />
          <div class="dropdown" *ngIf="userDropdownOpen" (click)="$event.stopPropagation()">
            <ng-container *ngIf="user; else guestOptions">
              <p class="user-info">{{ user.username }} ({{ user.role }})</p>
              <button (click)="logout()">Logout</button>
              <a routerLink="/login" (click)="closeUserDropdown()" class="dropdown-link">
                Login with another ID
              </a>

              <ng-container *ngIf="isAdmin">
                <a routerLink="/register" (click)="closeUserDropdown()" class="dropdown-link">Create Account</a>
                <a routerLink="/forgot-password" (click)="closeUserDropdown()" class="dropdown-link">Forgot password?</a>
              </ng-container>

            </ng-container>

            <ng-template #guestOptions>
              <a routerLink="/login" (click)="closeUserDropdown()" class="dropdown-link">Login</a>
              <a routerLink="/register" (click)="closeUserDropdown()" class="dropdown-link">Register</a>
            </ng-template>
          </div>
        </div>
      </div>
      </header>

      <!-- Mobile Overlay -->
      <div class="mobile-overlay" *ngIf="isMobile && !isSidebarCollapsed" (click)="toggleSidebar()"></div>
    </div>
  `,
  styles: [`
    /* Header Layout Container */
    .header-layout {
      display: contents;
    }

    /* Mobile Toggle */
    .mobile-toggle {
      position: fixed;
      top: 15px;
      left: 15px;
      z-index: 1002;
      background: #122e52;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }

    /* Sidebar Styles */
    .sidebar {
      width: 250px;
      background: linear-gradient(180deg, #122e52 0%, #1a3a6a 100%);
      color: white;
      display: flex;
      flex-direction: column;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
      z-index: 999;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      flex-shrink: 0;
    }

    .sidebar.collapsed {
      width: 70px;
    }

    .sidebar.mobile-open {
      transform: translateX(0);
    }

    .sidebar-header {
      padding: 20px 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
    }

    .dashboard-title {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 600;
      color: white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sidebar-toggle {
      width: 35px;
      height: 35px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .sidebar-toggle:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
    }

    .toggle-icon {
      font-size: 1.2rem;
      color: white;
    }

    .sidebar-nav {
      flex: 1;
      padding: 15px 0;
      overflow-y: auto;
    }

    .nav-section {
      padding: 15px 20px 5px;
    }

    .section-label {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 500;
    }

    .dropdown-container {
      margin-bottom: 5px;
    }

    .dropdown-container.collapsed {
      display: flex;
      justify-content: center;
    }

    .dropdown-header {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      cursor: pointer;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;
    }

    .dropdown-header:hover {
      background: rgba(255, 255, 255, 0.1);
      border-left-color: #00bfff;
    }

    .dropdown-icon {
      font-size: 1.2rem;
      margin-right: 12px;
      min-width: 24px;
      text-align: center;
    }

    .dropdown-container.collapsed .dropdown-icon {
      margin-right: 0;
    }

    .dropdown-title {
      flex: 1;
      font-size: 0.95rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .dropdown-arrow {
      font-size: 0.8rem;
      opacity: 0.7;
    }

    .dropdown-content {
      background: rgba(0, 0, 0, 0.2);
      border-left: 3px solid #00bfff;
      margin-left: 20px;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      padding: 10px 15px 10px 35px;
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .dropdown-item:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .dropdown-item.active {
      background: rgba(255, 255, 255, 0.15);
      color: white;
      font-weight: 500;
    }

    .item-icon {
      margin-right: 10px;
      font-size: 1rem;
      min-width: 20px;
      text-align: center;
    }

    /* Sidebar Footer */
    .sidebar-footer {
      padding: 15px 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .user-info {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid rgba(255, 255, 255, 0.3);
      margin-right: 10px;
    }

    .user-details {
      flex: 1;
    }

    .user-name {
      font-weight: 600;
      font-size: 0.9rem;
    }

    .user-role {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.7);
    }

    .version-info {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.6);
      text-align: center;
    }

    /* Main Header */
    .app-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding:20px;
      border-bottom: 1px solid #eee;
      background-color: #122e52ff;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
      position: relative;
      color: #fff;
      flex: 1;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-sizing: border-box;
      width: 100%;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      position: relative;
      margin-left: 300px;
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

    /* Mobile Overlay */
    .mobile-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
        width: 250px;
      }

      .sidebar.mobile-open {
        transform: translateX(0);
      }

      .sidebar.collapsed {
        width: 70px;
        transform: translateX(0);
      }

      .app-header {
        margin-left: 0 !important;
        width: 100% !important;
      }

      .logo-text {
        font-size: 1.5rem;
      }

      .mobile-toggle {
        display: flex;
      }
    }

    @media (min-width: 769px) {
      .mobile-toggle {
        display: none;
      }
    }

    /* Scrollbar */
    .sidebar-nav::-webkit-scrollbar {
      width: 4px;
    }

    .sidebar-nav::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
    }

    .sidebar-nav::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 2px;
    }

    .sidebar-nav::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.4);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-5px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isSidebarCollapsed = false;
  isMobile = false;
  userDropdownOpen = false;
  openDropdown: string | null = null;
  user: any = null;
  isAdmin = false;
  isAgency = false;
  sidebarCollapsedSignal = signal(false);

  private destroy$ = new Subject<void>();

  constructor(private auth: AuthService, private router: Router, private sidebarService: SidebarService) {}

  ngOnInit() {
    // Load user data
    this.auth.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((u) => {
        this.user = u;
        const role = u?.role?.toUpperCase();
        this.isAdmin = role === 'ADMIN';
        this.isAgency = role === 'AGENCY';
      });

    // Restore user from localStorage
    const stored = localStorage.getItem('currentUser');
    if (stored && !this.user) {
      const parsed = JSON.parse(stored);
      this.auth.setCurrentUser(parsed);
    }

    // Restore sidebar state
    const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    if (savedSidebarState !== null) {
      this.isSidebarCollapsed = JSON.parse(savedSidebarState);
      this.sidebarService.setSidebarState(this.isSidebarCollapsed);
    }

    // Check mobile on init
    this.checkMobile();
    
    // Listen for window resize
    window.addEventListener('resize', () => this.checkMobile());
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.sidebarService.setSidebarState(this.isSidebarCollapsed);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(this.isSidebarCollapsed));
  }

  toggleDropdown(dropdownName: string) {
    if (this.openDropdown === dropdownName) {
      this.openDropdown = null;
    } else {
      this.openDropdown = dropdownName;
    }
  }

  closeSidebarIfMobile() {
    if (this.isMobile) {
      this.isSidebarCollapsed = true;
    }
  }

  toggleUserDropdown(event: Event) {
    event.stopPropagation();
    this.userDropdownOpen = !this.userDropdownOpen;
  }

  closeUserDropdown() {
    this.userDropdownOpen = false;
  }

  checkMobile() {
    this.isMobile = window.innerWidth <= 768;
    this.sidebarService.setMobileState(this.isMobile);
    if (this.isMobile) {
      // Auto-collapse sidebar on mobile by default
      this.isSidebarCollapsed = true;
      this.sidebarService.setSidebarState(true);
      localStorage.setItem('sidebarCollapsed', JSON.stringify(true));
    }
  }

  logout() {
    this.auth.logout();
    this.closeUserDropdown();
    this.router.navigate(['/login']);
  }

  @HostListener('document:click')
  onDocumentClick() {
    if (this.userDropdownOpen) {
      this.closeUserDropdown();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    window.removeEventListener('resize', () => this.checkMobile());
  }
}