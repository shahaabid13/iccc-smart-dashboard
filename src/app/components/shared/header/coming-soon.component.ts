import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SidebarService } from '../../../services/sidebar.service';
import { Subject, takeUntil } from 'rxjs';
import { CimsNotificationBellComponent } from '../../admin/cims-notification-bell.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, CimsNotificationBellComponent],
  selector: 'app-header',
  template: `
    <div class="header-layout">
      <!-- Sidebar Navigation (only show when a user is logged in) -->
      <aside *ngIf="user" class="sidebar" [class.collapsed]="sidebarContentCollapsed" [class.mobile-open]="isMobile && mobileSidebarOpen">
      <div class="sidebar-header">
        <div class="brand" *ngIf="!sidebarContentCollapsed">
          <span class="material-symbols-outlined brand-icon">dashboard</span>
          <h2 class="dashboard-title">ICCC Dashboard</h2>
        </div>
        <button class="sidebar-close-button" *ngIf="isMobile" type="button" aria-label="Close menu" (click)="closeMobileSidebar()">
          <span class="material-symbols-outlined">close</span>
        </button>
        <button class="sidebar-toggle" *ngIf="!isMobile" type="button" aria-label="Collapse sidebar" (click)="toggleSidebar()">
          <span class="material-symbols-outlined toggle-icon">
            {{ isSidebarCollapsed ? 'chevron_right' : 'chevron_left' }}
          </span>
        </button>
      </div>

      <nav class="sidebar-nav">

        <!-- ============ MODULES (ALPHABETICAL ORDER) ============ -->
        <div class="nav-section" *ngIf="userRole !== 'FIELD_PERSON' && !sidebarContentCollapsed">
          <div class="section-label">Modules</div>
        </div>

        <!-- AI (E-Bus) -->
        <div class="dropdown-container" *ngIf="userRole !== 'FIELD_PERSON'" [class.collapsed]="sidebarContentCollapsed">
          <div class="dropdown-header" [class.open]="openDropdown === 'ai'" (click)="toggleDropdown('ai')">
            <span class="material-symbols-outlined dropdown-icon">directions_bus</span>
            <span class="dropdown-title" *ngIf="!sidebarContentCollapsed">AI (E-Bus)</span>
            <span class="material-symbols-outlined dropdown-arrow" *ngIf="!sidebarContentCollapsed" [class.rotated]="openDropdown === 'ai'">
              expand_more
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'ai' && !sidebarContentCollapsed">
            <div class="dropdown-item disabled-item" title="Coming soon">
              <span class="material-symbols-outlined item-icon">space_dashboard</span>
              <span>Dashboard</span>
              <span class="coming-soon-badge">Coming Soon</span>
            </div>
            <div class="dropdown-item disabled-item" title="Coming soon">
              <span class="material-symbols-outlined item-icon">directions_bus_filled</span>
              <span>Fleet Management</span>
              <span class="coming-soon-badge">Coming Soon</span>
            </div>
            <div class="dropdown-item disabled-item" title="Coming soon">
              <span class="material-symbols-outlined item-icon">alt_route</span>
              <span>Route</span>
              <span class="coming-soon-badge">Coming Soon</span>
            </div>
          </div>
        </div>

        <!-- CIMS -->
        <div class="dropdown-container" *ngIf="isCimsRole" [class.collapsed]="sidebarContentCollapsed">
          <div class="dropdown-header" [class.open]="openDropdown === 'cims'" (click)="toggleDropdown('cims')">
            <span class="material-symbols-outlined dropdown-icon">videocam</span>
            <span class="dropdown-title" *ngIf="!sidebarContentCollapsed">CIMS</span>
            <span class="material-symbols-outlined dropdown-arrow" *ngIf="!sidebarContentCollapsed" [class.rotated]="openDropdown === 'cims'">
              expand_more
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'cims' && !sidebarContentCollapsed">
            <!-- Support Engineer -->
            <ng-container *ngIf="userRole === 'SUPPORT_ENGINEER'">
              <a routerLink="/cims/support-engineer/dashboard" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
                <span class="material-symbols-outlined item-icon">space_dashboard</span>
                <span>Dashboard</span>
              </a>
              <a routerLink="/cims/support-engineer/my-tickets" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
                <span class="material-symbols-outlined item-icon">confirmation_number</span>
                <span>My Tickets</span>
              </a>
              <a routerLink="/cims/support-engineer/create-ticket" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
                <span class="material-symbols-outlined item-icon">add_circle</span>
                <span>Raise New Ticket</span>
              </a>
            </ng-container>

            <!-- Field Person -->
            <ng-container *ngIf="userRole === 'FIELD_PERSON'">
              <a routerLink="/cims/field-person/dashboard" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
                <span class="material-symbols-outlined item-icon">space_dashboard</span>
                <span>Dashboard</span>
              </a>
            </ng-container>

            <!-- Reviewer -->
            <ng-container *ngIf="userRole === 'REVIEWER'">
              <a routerLink="/cims/reviewer/dashboard" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
                <span class="material-symbols-outlined item-icon">space_dashboard</span>
                <span>Dashboard</span>
              </a>
              <a routerLink="/cims/reviewer/queue" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
                <span class="material-symbols-outlined item-icon">pending_actions</span>
                <span>Review Queue</span>
              </a>
            </ng-container>

            <!-- Admin -->
            <ng-container *ngIf="userRole === 'ADMIN'">
              <a routerLink="/cims/admin/dashboard" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
                <span class="material-symbols-outlined item-icon">space_dashboard</span>
                <span>Dashboard</span>
              </a>
              <a routerLink="/cims/admin/all-tickets" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
                <span class="material-symbols-outlined item-icon">list_alt</span>
                <span>All Tickets</span>
              </a>
              <a routerLink="/cims/admin/incident-types" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
                <span class="material-symbols-outlined item-icon">category</span>
                <span>Incident Types</span>
              </a>
            </ng-container>
          </div>
        </div>

        <!-- Inventory -->
        <div class="dropdown-container" *ngIf="userRole !== 'FIELD_PERSON'" [class.collapsed]="sidebarContentCollapsed">
          <div class="dropdown-header" [class.open]="openDropdown === 'inventory'" (click)="toggleDropdown('inventory')">
            <span class="material-symbols-outlined dropdown-icon">inventory_2</span>
            <span class="dropdown-title" *ngIf="!sidebarContentCollapsed">Inventory</span>
            <span class="material-symbols-outlined dropdown-arrow" *ngIf="!sidebarContentCollapsed" [class.rotated]="openDropdown === 'inventory'">
              expand_more
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'inventory' && !sidebarContentCollapsed">
            <a routerLink="/inventory" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="material-symbols-outlined item-icon">list_alt</span>
              <span>Inventory</span>
            </a>
            <a routerLink="/admin/dashboard" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()" *ngIf="isAdmin">
              <span class="material-symbols-outlined item-icon">admin_panel_settings</span>
              <span>Admin Dashboard</span>
            </a>
            <a routerLink="/admin/all-requests" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()" *ngIf="isAdmin || isAgency">
              <span class="material-symbols-outlined item-icon">description</span>
              <span>All Requests</span>
            </a>
            <a routerLink="/maintenance/request" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()" *ngIf="isAdmin || isAgency">
              <span class="material-symbols-outlined item-icon">construction</span>
              <span>Maintenance Request</span>
            </a>
          </div>
        </div>

        <!-- ITMS (Events) -->
        <div class="dropdown-container" *ngIf="userRole !== 'FIELD_PERSON'" [class.collapsed]="sidebarContentCollapsed">
          <div class="dropdown-header" [class.open]="openDropdown === 'itms'" (click)="toggleDropdown('itms')">
            <span class="material-symbols-outlined dropdown-icon">traffic</span>
            <span class="dropdown-title" *ngIf="!sidebarContentCollapsed">ITMS</span>
            <span class="material-symbols-outlined dropdown-arrow" *ngIf="!sidebarContentCollapsed" [class.rotated]="openDropdown === 'itms'">
              expand_more
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'itms' && !sidebarContentCollapsed">
            <a routerLink="/traffic-dashboard/dashboard/events/search" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="material-symbols-outlined item-icon">event</span>
              <span>Events</span>
            </a>
          </div>
        </div>

        <!-- Monitoring Tools -->
        <div class="dropdown-container" *ngIf="userRole !== 'FIELD_PERSON'" [class.collapsed]="sidebarContentCollapsed">
          <div class="dropdown-header" [class.open]="openDropdown === 'monitoring'" (click)="toggleDropdown('monitoring')">
            <span class="material-symbols-outlined dropdown-icon">monitor_heart</span>
            <span class="dropdown-title" *ngIf="!sidebarContentCollapsed">Monitoring Tools</span>
            <span class="material-symbols-outlined dropdown-arrow" *ngIf="!sidebarContentCollapsed" [class.rotated]="openDropdown === 'monitoring'">
              expand_more
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'monitoring' && !sidebarContentCollapsed">
            <div class="dropdown-item disabled-item" title="Coming soon">
              <span class="material-symbols-outlined item-icon">traffic</span>
              <span>ATCS</span>
              <span class="coming-soon-badge">Coming Soon</span>
            </div>
          </div>
        </div>

        <!-- PBS -->
        <div class="dropdown-container" *ngIf="userRole !== 'FIELD_PERSON'" [class.collapsed]="sidebarContentCollapsed">
          <div class="dropdown-header" [class.open]="openDropdown === 'pbs'" (click)="toggleDropdown('pbs')">
            <span class="material-symbols-outlined dropdown-icon">pedal_bike</span>
            <span class="dropdown-title" *ngIf="!sidebarContentCollapsed">PBS</span>
            <span class="material-symbols-outlined dropdown-arrow" *ngIf="!sidebarContentCollapsed" [class.rotated]="openDropdown === 'pbs'">
              expand_more
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'pbs' && !sidebarContentCollapsed">
            <a routerLink="/pbs/stations" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="material-symbols-outlined item-icon">location_on</span>
              <span>Bike Stations</span>
            </a>
            <a routerLink="/pbs/analytics" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="material-symbols-outlined item-icon">query_stats</span>
              <span>Analytics</span>
            </a>
          </div>
        </div>

        <!-- SWM -->
        <div class="dropdown-container" *ngIf="userRole !== 'FIELD_PERSON'" [class.collapsed]="sidebarContentCollapsed">
          <div class="dropdown-header" [class.open]="openDropdown === 'swm'" (click)="toggleDropdown('swm')">
            <span class="material-symbols-outlined dropdown-icon">recycling</span>
            <span class="dropdown-title" *ngIf="!sidebarContentCollapsed">SWM</span>
            <span class="material-symbols-outlined dropdown-arrow" *ngIf="!sidebarContentCollapsed" [class.rotated]="openDropdown === 'swm'">
              expand_more
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'swm' && !sidebarContentCollapsed">
            <a routerLink="/smc" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="material-symbols-outlined item-icon">space_dashboard</span>
              <span>SWM Dashboard</span>
            </a>
            <a routerLink="/charts" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="material-symbols-outlined item-icon">insights</span>
              <span>Charts</span>
            </a>
          </div>
        </div>

        <!-- Task Management -->
        <div class="dropdown-container" *ngIf="(isAdmin || isReviewer || isSupportEngineer)" [class.collapsed]="sidebarContentCollapsed">
          <div class="dropdown-header" [class.open]="openDropdown === 'tasks'" (click)="toggleDropdown('tasks')">
            <span class="material-symbols-outlined dropdown-icon">assignment</span>
            <span class="dropdown-title" *ngIf="!sidebarContentCollapsed">Task Management</span>
            <span class="material-symbols-outlined dropdown-arrow" *ngIf="!sidebarContentCollapsed" [class.rotated]="openDropdown === 'tasks'">
              expand_more
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'tasks' && !sidebarContentCollapsed">
            <a routerLink="/tasks/all" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="material-symbols-outlined item-icon">checklist</span>
              <span>All Tasks</span>
            </a>
            <a routerLink="/tasks/create" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()" *ngIf="isAdmin || isReviewer">
              <span class="material-symbols-outlined item-icon">add_task</span>
              <span>Create Task</span>
            </a>
          </div>
        </div>

        <!-- TraMM -->
        <div class="dropdown-container" *ngIf="userRole !== 'FIELD_PERSON'" [class.collapsed]="sidebarContentCollapsed">
          <div class="dropdown-header" [class.open]="openDropdown === 'tram'" (click)="toggleDropdown('tram')">
            <span class="material-symbols-outlined dropdown-icon">tram</span>
            <span class="dropdown-title" *ngIf="!sidebarContentCollapsed">TraMM</span>
            <span class="material-symbols-outlined dropdown-arrow" *ngIf="!sidebarContentCollapsed" [class.rotated]="openDropdown === 'tram'">
              expand_more
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'tram' && !sidebarContentCollapsed">
            <a routerLink="/tramm/junction-map" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="material-symbols-outlined item-icon">map</span>
              <span>TraMM Dashboard</span>
            </a>
            <a routerLink="/tramm/live-signal-status" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="material-symbols-outlined item-icon">traffic</span>
              <span>Live Signal Status</span>
            </a>
            <a routerLink="/tramm/junction-monitor" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="material-symbols-outlined item-icon">hub</span>
              <span>Junction Monitor</span>
            </a>
          </div>
        </div>

        <!-- User Management (moved out of CIMS) -->
        <div class="dropdown-container" *ngIf="isAdmin" [class.collapsed]="sidebarContentCollapsed">
          <div class="dropdown-header" [class.open]="openDropdown === 'userManagement'" (click)="toggleDropdown('userManagement')">
            <span class="material-symbols-outlined dropdown-icon">group</span>
            <span class="dropdown-title" *ngIf="!sidebarContentCollapsed">User Management</span>
            <span class="material-symbols-outlined dropdown-arrow" *ngIf="!sidebarContentCollapsed" [class.rotated]="openDropdown === 'userManagement'">
              expand_more
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'userManagement' && !sidebarContentCollapsed">
            <a routerLink="/cims/admin/users" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="material-symbols-outlined item-icon">group</span>
              <span>All Users</span>
            </a>
          </div>
        </div>

        <!-- Notifications (placed right after User Management, not alphabetically) -->
        <div class="dropdown-container" *ngIf="isCimsRole" [class.collapsed]="sidebarContentCollapsed">
          <div class="dropdown-header" [class.open]="openDropdown === 'notifications'" (click)="toggleDropdown('notifications')">
            <span class="material-symbols-outlined dropdown-icon">notifications</span>
            <span class="dropdown-title" *ngIf="!sidebarContentCollapsed">Notifications</span>
            <span class="material-symbols-outlined dropdown-arrow" *ngIf="!sidebarContentCollapsed" [class.rotated]="openDropdown === 'notifications'">
              expand_more
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'notifications' && !sidebarContentCollapsed">
            <a routerLink="/cims/notifications/settings" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="material-symbols-outlined item-icon">settings</span>
              <span>Notification Settings</span>
            </a>
          </div>
        </div>

      </nav>

      <div class="nav-section pinned-section" *ngIf="user && !sidebarContentCollapsed">
        <a routerLink="/tasks/my" routerLinkActive="active" class="dropdown-item pinned-item" (click)="closeSidebarIfMobile()">
          <span class="material-symbols-outlined item-icon">task_alt</span>
          <span>My Tasks</span>
        </a>
      </div>

      <!-- Sidebar Footer -->
        <div class="sidebar-footer" *ngIf="!sidebarContentCollapsed">
        <div class="user-info">
          <img src="/download.png" alt="Profile" class="user-avatar img-fluid" />
          <div class="user-details">
            <div class="user-name">{{ user?.username || 'Guest' }}</div>
            <div class="user-role">{{ user?.role || 'No Role' }}</div>
          </div>
        </div>
        <div class="version-info">v1.0.0</div>
      </div>
    </aside>

    <!-- Main Header (converted to Bootstrap responsive navbar) -->
    <header class="app-header navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid d-flex align-items-center">
        <button class="mobile-menu-button" *ngIf="isMobile" type="button" aria-label="Open menu" [attr.aria-expanded]="mobileSidebarOpen" (click)="toggleSidebar()">
          <span class="material-symbols-outlined">menu</span>
        </button>

        <div class="d-flex align-items-center col-auto">
          <a class="navbar-brand d-flex align-items-center" routerLink="/login">
            <img src="/logo.jfif" alt="Logo" class="logo-img  -fluid" />
            <div class="logo-text ms-2 d-none d-lg-block">ICCC SMART DASHBOARD</div>
          </a>
        </div>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="mainNavbar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <!-- Keep existing router links or add quick links if needed -->
          </ul>

          <div class="d-flex align-items-center col-auto">
            <app-cims-notification-bell *ngIf="user" class="me-2"></app-cims-notification-bell>
            <div class="profile position-relative" (click)="toggleUserDropdown($event)">
              <img src="/download.png" alt="Profile" class="profile-icon img-fluid rounded-circle" />
              <div class="dropdown-menu dropdown-menu-end user-dropdown-menu fixed-menu" [class.show]="userDropdownOpen" (click)="$event.stopPropagation()">
                <ng-container *ngIf="user; else guestOptions">
                  <div class="user-info-section px-3 py-3">
                    <div class="user-info-text">{{ user.username }} ({{ user.role }})</div>
                  </div>
                  <div class="dropdown-divider"></div>
                  <button class="dropdown-item btn-logout" (click)="logout()">
                    <span class="material-symbols-outlined menu-icon">logout</span>
                    Logout
                  </button>
                  <div class="dropdown-divider"></div>
                  <a routerLink="/login" (click)="closeUserDropdown()" class="dropdown-item">
                    <span class="material-symbols-outlined menu-icon">switch_account</span>
                    Login with another ID
                  </a>

                  <ng-container *ngIf="isAdmin">
                    <a routerLink="/register" (click)="closeUserDropdown()" class="dropdown-item">
                      <span class="material-symbols-outlined menu-icon">person_add</span>
                      Create Account
                    </a>
                    <a routerLink="/forgot-password" (click)="closeUserDropdown()" class="dropdown-item">
                      <span class="material-symbols-outlined menu-icon">lock_reset</span>
                      Forgot password?
                    </a>
                  </ng-container>
                </ng-container>

                <ng-template #guestOptions>
                  <a routerLink="/login" (click)="closeUserDropdown()" class="dropdown-item">
                    <span class="material-symbols-outlined menu-icon">login</span>
                    Login
                  </a>
                  <a routerLink="/register" (click)="closeUserDropdown()" class="dropdown-item">
                    <span class="material-symbols-outlined menu-icon">person_add</span>
                    Register
                  </a>
                </ng-template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

      <!-- Mobile Overlay (only when sidebar visible and user logged in) -->
      <div class="mobile-overlay" *ngIf="user && isMobile && mobileSidebarOpen" (click)="closeMobileSidebar()"></div>
    </div>
  `,
  styles: [`
    /* Header Layout Container */
    .header-layout {
      display: contents;
    }

    /* Mobile menu button lives inside the fixed header. */
    .mobile-menu-button {
      display: none;
      width: 42px;
      height: 42px;
      margin-right: 8px;
      padding: 0;
      border: 1px solid rgba(255,255,255,0.18);
      border-radius: 10px;
      background: rgba(255,255,255,0.08);
      color: #fff;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex: 0 0 auto;
      -webkit-tap-highlight-color: transparent;
    }

    .mobile-menu-button:hover,
    .mobile-menu-button:focus-visible {
      background: rgba(255,255,255,0.16);
      outline: none;
    }

    .sidebar-close-button {
      display: none;
      width: 38px;
      height: 38px;
      padding: 0;
      border: 1px solid rgba(255,255,255,0.16);
      border-radius: 9px;
      background: rgba(255,255,255,0.08);
      color: #fff;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    /* Sidebar Styles */
    .sidebar {
      width: 260px;
      background: linear-gradient(180deg, #0e2543 0%, #16345e 100%);
      color: white;
      display: flex;
      flex-direction: column;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 2px 0 16px rgba(0, 0, 0, 0.25);
      z-index: 1095;
      position: fixed;
      left: 0;
      top: 64px;
      height: calc(100vh - 64px);
      flex-shrink: 0;
      border-right: 1px solid rgba(255, 255, 255, 0.06);
    }

    .sidebar.collapsed {
      width: 72px;
    }

    @media (max-width: 767px) {
      .sidebar {
        width: 72px;
      }
      .sidebar.collapsed {
        width: 72px;
      }
    }

    .sidebar.mobile-open {
      transform: translateX(0);
    }

    .sidebar-header {
      padding: 18px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 68px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      overflow: hidden;
    }

    .brand-icon {
      font-size: 22px;
      color: #4fc3f7;
    }

    .dashboard-title {
      margin: 0;
      font-size: 1.05rem;
      font-weight: 600;
      color: white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: 0.2px;
    }

    .sidebar-toggle {
      border: 0;
      padding: 0;
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .sidebar-toggle:hover {
      background: rgba(79, 195, 247, 0.25);
      transform: scale(1.06);
    }

    .toggle-icon {
      font-size: 20px;
      color: white;
    }

    .sidebar-nav {
      flex: 1;
      padding: 10px 0;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .nav-section {
      padding: 16px 20px 6px;
    }

    .section-label {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 1.1px;
      color: rgba(255, 255, 255, 0.45);
      font-weight: 600;
    }

    .dropdown-container {
      margin: 2px 10px;
    }

    .dropdown-container.collapsed {
      display: flex;
      justify-content: center;
      margin: 4px 8px;
    }

    .dropdown-header {
      display: flex;
      align-items: center;
      padding: 11px 12px;
      cursor: pointer;
      transition: all 0.18s ease;
      border-radius: 8px;
      position: relative;
    }

    .dropdown-header:hover {
      background: rgba(255, 255, 255, 0.08);
    }

    .dropdown-header.open {
      background: rgba(79, 195, 247, 0.12);
    }

    .dropdown-icon {
      font-size: 20px;
      margin-right: 14px;
      min-width: 20px;
      text-align: center;
      color: #9fd3f5;
    }

    .dropdown-container.collapsed .dropdown-icon {
      margin-right: 0;
      color: #cfe8fb;
    }

    .dropdown-title {
      flex: 1;
      font-size: 0.92rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .dropdown-arrow {
      font-size: 18px;
      opacity: 0.6;
      transition: transform 0.2s ease;
    }

    .dropdown-arrow.rotated {
      transform: rotate(180deg);
      opacity: 0.9;
    }

    .dropdown-content {
      background: rgba(0, 0, 0, 0.18);
      border-radius: 8px;
      margin: 4px 0 4px 14px;
      padding: 4px 0;
      border-left: 2px solid rgba(79, 195, 247, 0.4);
      animation: fadeIn 0.15s ease;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      padding: 9px 14px 9px 18px;
      color: rgba(255, 255, 255, 0.78);
      text-decoration: none;
      transition: all 0.18s ease;
      cursor: pointer;
      font-size: 0.87rem;
      border-radius: 6px;
      margin: 1px 6px;
    }

    .dropdown-item:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .dropdown-item.active {
      background: rgba(79, 195, 247, 0.18);
      color: white;
      font-weight: 600;
      box-shadow: inset 3px 0 0 #4fc3f7;
    }

    /* Disabled / "Coming Soon" item */
    .dropdown-item.disabled-item {
      cursor: not-allowed;
      color: rgba(255, 255, 255, 0.4);
      justify-content: flex-start;
      gap: 4px;
    }

    .dropdown-item.disabled-item:hover {
      background: none;
      color: rgba(255, 255, 255, 0.4);
    }

    .coming-soon-badge {
      font-size: 0.6rem;
      background: rgba(255, 255, 255, 0.12);
      padding: 2px 7px;
      border-radius: 10px;
      margin-left: auto;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      white-space: nowrap;
    }

    .item-icon {
      margin-right: 12px;
      font-size: 18px;
      min-width: 18px;
      text-align: center;
      color: #9fd3f5;
    }

    .dropdown-item.active .item-icon {
      color: #4fc3f7;
    }

    .pinned-section {
      padding: 10px 10px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      margin-top: 8px;
    }

    .pinned-item {
      padding: 10px 14px;
      margin: 0;
      font-weight: 500;
      font-size: 0.9rem;
    }

    /* Sidebar Footer */
    .sidebar-footer {
      padding: 16px 18px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(0, 0, 0, 0.12);
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
      border: 2px solid rgba(79, 195, 247, 0.4);
      margin-right: 10px;
    }

    .user-details {
      flex: 1;
      overflow: hidden;
    }

    .user-name {
      font-weight: 600;
      font-size: 0.9rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-role {
      font-size: 0.76rem;
      color: rgba(255, 255, 255, 0.6);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .version-info {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.4);
      text-align: center;
    }

    /* Main Header */
    .app-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 12px;
      padding-bottom: 12px;
      height: 64px;
      background-color: #0f2847;
      box-shadow: 0 2px 8px rgba(0,0,0,0.18);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1100;
      color: #fff;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-sizing: border-box;
      width: 100%;
    }

    .logo-img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      object-fit: cover;
    }

    .logo-text {
      font-weight: 600;
      font-size: 1.2rem;
      font-family: 'Raleway', sans-serif;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: 0.3px;
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
      border: 2px solid rgba(255,255,255,0.5);
      background-color: #fff;
      transition: transform 0.15s ease-in;
    }

    .profile-icon:hover {
      transform: scale(1.06);
    }

    .user-dropdown-menu {
      background: #fff;
      border: 1px solid #e2e6ea;
      border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.18);
      min-width: 240px;
      padding: 0;
      z-index: 1200;
      overflow: hidden;
    }

    .user-dropdown-menu.fixed-menu {
      position: fixed;
      top: 74px;
      right: 16px;
      left: auto;
    }

    @media (max-width: 768px) {
      .user-dropdown-menu.fixed-menu {
        left: 50%;
        right: auto;
        transform: translateX(-50%);
        max-width: calc(100% - 48px);
      }
    }

    .user-dropdown-menu .user-info-section {
      background: #f4f7fa;
      border-bottom: 1px solid #e9ecef;
    }

    .user-info-text {
      font-size: 14px;
      font-weight: 600;
      color: #1c2b3a;
    }

    .user-dropdown-menu .dropdown-divider {
      margin: 4px 0;
      border-top: 1px solid #e9ecef;
    }

    .user-dropdown-menu .dropdown-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      color: #333;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.15s ease;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
      text-decoration: none;
    }

    .menu-icon {
      font-size: 18px;
      color: #6c7a89;
    }

    .user-dropdown-menu .dropdown-item:hover {
      background-color: #f2f8ff;
      color: #0d6efd;
    }

    .user-dropdown-menu .dropdown-item:hover .menu-icon {
      color: #0d6efd;
    }

    .user-dropdown-menu .dropdown-item:active {
      background-color: #e9ecef;
    }

    .user-dropdown-menu .btn-logout {
      color: #dc3545;
      font-weight: 600;
    }

    .user-dropdown-menu .btn-logout .menu-icon {
      color: #dc3545;
    }

    .user-dropdown-menu .btn-logout:hover {
      background-color: #fff5f5;
      color: #c82333;
    }

    /* Mobile Overlay */
    .mobile-overlay {
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1090;
      touch-action: none;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .sidebar {
        top: 64px;
        width: min(82vw, 320px);
        max-width: calc(100vw - 24px);
        height: calc(100dvh - 64px);
        transform: translate3d(-105%, 0, 0);
        transition: transform 0.25s ease, box-shadow 0.25s ease;
        box-shadow: 8px 0 28px rgba(0,0,0,0.28);
        overflow: hidden;
        visibility: hidden;
        pointer-events: none;
      }

      .sidebar.mobile-open {
        transform: translate3d(0, 0, 0);
        visibility: visible;
        pointer-events: auto;
      }

      .sidebar-header {
        height: 64px;
        min-height: 64px;
        padding: 12px 14px;
      }

      .sidebar-close-button {
        display: flex;
      }

      .sidebar-nav {
        min-height: 0;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
      }

      .app-header {
        height: 64px;
        min-height: 64px;
        margin-left: 0 !important;
        width: 100% !important;
        padding: 8px 12px;
        z-index: 1100;
      }

      .mobile-menu-button {
        display: flex;
      }

      .logo-img {
        width: 38px;
        height: 38px;
      }

      .navbar-brand {
        margin-right: 0;
      }

      .logo-text {
        font-size: 0.95rem;
      }

      .app-header .container-fluid {
        min-width: 0;
      }

      .app-header .navbar-toggler {
        display: none !important;
      }

      .app-header .navbar-collapse {
        display: flex !important;
        flex: 1 1 auto;
        justify-content: flex-end;
        min-width: 0;
      }

      .app-header .navbar-nav {
        display: none !important;
      }

      .profile-icon {
        width: 36px;
        height: 36px;
      }

      .mobile-overlay {
        top: 64px;
        z-index: 1090;
        touch-action: none;
      }

    }

    @media (min-width: 769px) {
      .mobile-menu-button,
      .sidebar-close-button {
        display: none;
      }
    }

    @media (max-width: 380px) {
      .sidebar {
        width: min(88vw, 300px);
        max-width: calc(100vw - 16px);
      }

      .logo-img {
        width: 34px;
        height: 34px;
      }

      .mobile-menu-button {
        width: 40px;
        height: 40px;
      }
    }

    /* Scrollbar */
    .sidebar-nav::-webkit-scrollbar {
      width: 4px;
    }

    .sidebar-nav::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.06);
    }

    .sidebar-nav::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.25);
      border-radius: 2px;
    }

    .sidebar-nav::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.4);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isSidebarCollapsed = false;
  isMobile = false;
  mobileSidebarOpen = false;

  /** True when the sidebar content should use the compact desktop rail. */
  get sidebarContentCollapsed(): boolean {
    return !this.isMobile && this.isSidebarCollapsed;
  }
  userDropdownOpen = false;
  openDropdown:
    | 'ai'
    | 'cims'
    | 'inventory'
    | 'itms'
    | 'monitoring'
    | 'pbs'
    | 'swm'
    | 'tasks'
    | 'tram'
    | 'userManagement'
    | 'notifications'
    | null = null;
  user: any = null;
  userRole: string = ''; // Store the user's role for sidebar visibility
  isAdmin = false;
  isAgency = false;
  isCimsRole = false;
  isSupportEngineer = false;
  isReviewer = false;
  sidebarCollapsedSignal = signal(false);

  private destroy$ = new Subject<void>();
  private bodyOverflowBeforeLock = '';

  constructor(private auth: AuthService, private router: Router, private sidebarService: SidebarService) { }

  ngOnInit() {
    // Load user data
    this.auth.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((u) => {
        this.user = u;
        const role = u?.role?.toUpperCase();
        this.userRole = role || ''; // Store role for sidebar role checks
        this.isAdmin = role === 'ADMIN';
        this.isAgency = role === 'AGENCY';
        this.isSupportEngineer = role === 'SUPPORT_ENGINEER';
        this.isReviewer = role === 'REVIEWER';
        this.isCimsRole =
          role === 'SUPPORT_ENGINEER' ||
          role === 'FIELD_PERSON' ||
          role === 'COORDINATOR' ||
          role === 'REVIEWER' ||
          role === 'ADMIN';
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
      if (this.isSidebarCollapsed) {
        document.body.classList.add('sidebar-collapsed');
      } else {
        document.body.classList.remove('sidebar-collapsed');
      }
    }

    // Check mobile on init
    this.checkMobile();

  }

  toggleSidebar() {
    if (this.isMobile) {
      this.mobileSidebarOpen = !this.mobileSidebarOpen;
      this.updateBodyScrollLock();
      return;
    }

    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.sidebarService.setSidebarState(this.isSidebarCollapsed);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(this.isSidebarCollapsed));
  }

  closeMobileSidebar() {
    if (!this.isMobile) {
      return;
    }

    this.mobileSidebarOpen = false;
    this.openDropdown = null;
    this.updateBodyScrollLock();
  }

  toggleDropdown(
    dropdownName:
      | 'ai'
      | 'cims'
      | 'inventory'
      | 'itms'
      | 'monitoring'
      | 'pbs'
      | 'swm'
      | 'tasks'
      | 'tram'
      | 'userManagement'
      | 'notifications'
  ) {
    if (this.openDropdown === dropdownName) {
      this.openDropdown = null;
    } else {
      this.openDropdown = dropdownName;
    }
  }

  closeSidebarIfMobile() {
    if (this.isMobile) {
      this.closeMobileSidebar();
    }
  }

  toggleUserDropdown(event: Event) {
    event.stopPropagation();
    this.userDropdownOpen = !this.userDropdownOpen;
  }

  closeUserDropdown() {
    this.userDropdownOpen = false;
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.checkMobile();
  }

  checkMobile() {
    const wasMobile = this.isMobile;
    const nowMobile = window.innerWidth <= 768;

    if (wasMobile !== nowMobile) {
      this.isMobile = nowMobile;
      this.mobileSidebarOpen = false;
      this.openDropdown = null;
      this.updateBodyScrollLock();
    } else {
      this.isMobile = nowMobile;
    }

    this.sidebarService.setMobileState(this.isMobile);

    if (!this.isMobile) {
      this.sidebarService.setSidebarState(this.isSidebarCollapsed);
      localStorage.setItem('sidebarCollapsed', JSON.stringify(this.isSidebarCollapsed));
    }
  }

  private updateBodyScrollLock() {
    const shouldLock = this.isMobile && this.mobileSidebarOpen;

    if (shouldLock) {
      if (!document.body.classList.contains('mobile-sidebar-open')) {
        this.bodyOverflowBeforeLock = document.body.style.overflow;
      }
      document.body.classList.add('mobile-sidebar-open');
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.classList.remove('mobile-sidebar-open');
    document.body.style.overflow = this.bodyOverflowBeforeLock;
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
    document.body.classList.remove('mobile-sidebar-open');
    document.body.style.overflow = this.bodyOverflowBeforeLock;
  }
}