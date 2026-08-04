import { Component, HostListener, OnDestroy, OnInit, signal, effect } from '@angular/core';
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
        <div class="nav-section" *ngIf="userRole !== 'FIELD_PERSON' && !isSidebarCollapsed">
          <div class="section-label">Inventory Management System</div>
        </div>

        <div class="dropdown-container" *ngIf="userRole !== 'FIELD_PERSON'" [class.collapsed]="isSidebarCollapsed">
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

        <!-- Task Management (Admin / Reviewer / Support Engineer) -->
        <div class="dropdown-container" *ngIf="(isAdmin || isReviewer || isSupportEngineer) && !isSidebarCollapsed">
          <div class="dropdown-header" (click)="toggleDropdown('tasks')">
            <span class="dropdown-icon">🗂️</span>
            <span class="dropdown-title" *ngIf="!isSidebarCollapsed">Task Management</span>
            <span class="dropdown-arrow" *ngIf="!isSidebarCollapsed">
              {{ openDropdown === 'tasks' ? '▲' : '▼' }}
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'tasks' && !isSidebarCollapsed">
            <a routerLink="/tasks/all" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">📋</span>
              <span>All Tasks</span>
            </a>
            <a routerLink="/tasks/create" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()" *ngIf="isAdmin || isReviewer">
              <span class="item-icon">➕</span>
              <span>Create Task</span>
            </a>
          </div>
        </div>

        <!-- SWM Dropdown -->
        <div class="nav-section" *ngIf="userRole !== 'FIELD_PERSON' && !isSidebarCollapsed">
          <div class="section-label">SWM</div>
        </div>

        <div class="dropdown-container" *ngIf="userRole !== 'FIELD_PERSON'" [class.collapsed]="isSidebarCollapsed">
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
        <div class="nav-section" *ngIf="userRole !== 'FIELD_PERSON' && !isSidebarCollapsed">
          <div class="section-label">PBS</div>
        </div>

        <div class="dropdown-container" *ngIf="userRole !== 'FIELD_PERSON'" [class.collapsed]="isSidebarCollapsed">
          <div class="dropdown-header" (click)="toggleDropdown('pbs')">
            <span class="dropdown-icon">🏢</span>
            <span class="dropdown-title" *ngIf="!isSidebarCollapsed">PBS</span>
            <span class="dropdown-arrow" *ngIf="!isSidebarCollapsed">
              {{ openDropdown === 'pbs' ? '▲' : '▼' }}
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'pbs' && !isSidebarCollapsed">
            <a routerLink="/pbs/stations" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">🚲</span>
              <span>Bike Stations</span>
            </a>
            <a routerLink="/pbs/analytics" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">📊</span>
              <span>Analytics</span>
            </a>
          </div>
        </div>

        <!-- Chartered Bike and ANPR removed as requested -->

        <!-- ============ CAMERA INCIDENT MANAGEMENT SYSTEM (CIMS) ============ -->
        
        <!-- CIMS Section Label -->
        <div class="nav-section" *ngIf="!isSidebarCollapsed && (userRole === 'SUPPORT_ENGINEER' || userRole === 'FIELD_PERSON' || userRole === 'REVIEWER' || userRole === 'ADMIN')">
          <div class="section-label">Camera Incident Management</div>
        </div>

        <!-- Support Engineer - Only for SUPPORT_ENGINEER role (not ADMIN) -->
        <div class="dropdown-container" *ngIf="userRole === 'SUPPORT_ENGINEER'" [class.collapsed]="isSidebarCollapsed">
          <div class="dropdown-header" (click)="toggleDropdown('cimsSupport')">
            <span class="dropdown-icon">🎫</span>
            <span class="dropdown-title" *ngIf="!isSidebarCollapsed">Support Engineer</span>
            <span class="dropdown-arrow" *ngIf="!isSidebarCollapsed">
              {{ openDropdown === 'cimsSupport' ? '▲' : '▼' }}
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'cimsSupport' && !isSidebarCollapsed">
            <a routerLink="/cims/support-engineer/dashboard" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">📊</span>
              <span>Dashboard</span>
            </a>
            <a routerLink="/cims/support-engineer/my-tickets" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">📋</span>
              <span>My Tickets</span>
            </a>
            <a routerLink="/cims/support-engineer/create-ticket" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">➕</span>
              <span>Raise New Ticket</span>
            </a>
            <a routerLink="/cims/notifications/settings" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">🔔</span>
              <span>Notification Settings</span>
            </a>
          </div>
        </div>

        <!-- Field Person - Only for FIELD_PERSON role (not ADMIN) -->
        <div class="dropdown-container" *ngIf="userRole === 'FIELD_PERSON'" [class.collapsed]="isSidebarCollapsed">
          <div class="dropdown-header" (click)="toggleDropdown('cimsFieldPerson')">
            <span class="dropdown-icon">🚧</span>
            <span class="dropdown-title" *ngIf="!isSidebarCollapsed">Field Person</span>
            <span class="dropdown-arrow" *ngIf="!isSidebarCollapsed">
              {{ openDropdown === 'cimsFieldPerson' ? '▲' : '▼' }}
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'cimsFieldPerson' && !isSidebarCollapsed">
            <a routerLink="/cims/field-person/dashboard" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">📊</span>
              <span>Dashboard</span>
            </a>
            <a routerLink="/cims/notifications/settings" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">🔔</span>
              <span>Notification Settings</span>
            </a>
          </div>
        </div>

        <!-- Reviewer - Only for REVIEWER role (not ADMIN) -->
        <div class="dropdown-container" *ngIf="userRole === 'REVIEWER'" [class.collapsed]="isSidebarCollapsed">
          <div class="dropdown-header" (click)="toggleDropdown('cimsReviewer')">
            <span class="dropdown-icon">🔍</span>
            <span class="dropdown-title" *ngIf="!isSidebarCollapsed">Reviewer</span>
            <span class="dropdown-arrow" *ngIf="!isSidebarCollapsed">
              {{ openDropdown === 'cimsReviewer' ? '▲' : '▼' }}
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'cimsReviewer' && !isSidebarCollapsed">
            <a routerLink="/cims/reviewer/dashboard" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">📊</span>
              <span>Dashboard</span>
            </a>
            <a routerLink="/cims/reviewer/queue" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">⏳</span>
              <span>Review Queue</span>
            </a>
            <a routerLink="/cims/notifications/settings" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">🔔</span>
              <span>Notification Settings</span>
            </a>
          </div>
        </div>

        <!-- CIMS Admin - Only for ADMIN role -->
        <div class="dropdown-container" *ngIf="userRole === 'ADMIN'" [class.collapsed]="isSidebarCollapsed">
          <div class="dropdown-header" (click)="toggleDropdown('cimsAdmin')">
            <span class="dropdown-icon">📊</span>
            <span class="dropdown-title" *ngIf="!isSidebarCollapsed">CIMS Admin</span>
            <span class="dropdown-arrow" *ngIf="!isSidebarCollapsed">
              {{ openDropdown === 'cimsAdmin' ? '▲' : '▼' }}
            </span>
          </div>

          <div class="dropdown-content" *ngIf="openDropdown === 'cimsAdmin' && !isSidebarCollapsed">
            <a routerLink="/cims/admin/dashboard" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">📈</span>
              <span>Dashboard</span>
            </a>
            <a routerLink="/cims/admin/all-tickets" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">📋</span>
              <span>All Tickets</span>
            </a>
            <a routerLink="/cims/admin/users" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">👥</span>
              <span>User Management</span>
            </a>
            <a routerLink="/cims/admin/incident-types" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">🏷️</span>
              <span>Incident Types</span>
            </a>
            <a routerLink="/cims/notifications/settings" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
              <span class="item-icon">🔔</span>
              <span>Notification Settings</span>
            </a>
          </div>
        </div>

      </nav>

      <div class="nav-section" *ngIf="user && !isSidebarCollapsed">
        <a routerLink="/tasks/my" routerLinkActive="active" class="dropdown-item" (click)="closeSidebarIfMobile()">
          <span class="item-icon">✅</span>
          <span>My Tasks</span>
        </a>
      </div>

      <!-- Sidebar Footer -->
        <div class="sidebar-footer" *ngIf="!isSidebarCollapsed">
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
        <div class="d-flex align-items-center col-auto">
          <a class="navbar-brand d-flex align-items-center" routerLink="/home">
            <img src="/logo.jfif" alt="Logo" class="logo-img img-fluid" />
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
            <app-cims-notification-bell *ngIf="isCimsRole" class="me-2"></app-cims-notification-bell>
            <div class="profile position-relative" (click)="toggleUserDropdown($event)">
              <img src="/download.png" alt="Profile" class="profile-icon img-fluid rounded-circle" />
              <div class="dropdown-menu dropdown-menu-end user-dropdown-menu fixed-menu" [class.show]="userDropdownOpen" (click)="$event.stopPropagation()">
                <ng-container *ngIf="user; else guestOptions">
                  <div class="user-info-section px-3 py-3">
                    <div class="user-info-text">{{ user.username }} ({{ user.role }})</div>
                  </div>
                  <div class="dropdown-divider"></div>
                  <button class="dropdown-item btn-logout" (click)="logout()">Logout</button>
                  <div class="dropdown-divider"></div>
                  <a routerLink="/login" (click)="closeUserDropdown()" class="dropdown-item">Login with another ID</a>

                  <ng-container *ngIf="isAdmin">
                    <a routerLink="/register" (click)="closeUserDropdown()" class="dropdown-item">Create Account</a>
                    <a routerLink="/forgot-password" (click)="closeUserDropdown()" class="dropdown-item">Forgot password?</a>
                  </ng-container>
                </ng-container>

                <ng-template #guestOptions>
                  <a routerLink="/login" (click)="closeUserDropdown()" class="dropdown-item">Login</a>
                  <a routerLink="/register" (click)="closeUserDropdown()" class="dropdown-item">Register</a>
                </ng-template>
              </div>
            </div>
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
      z-index: 1000;
      position: fixed;
      left: 0;
      /* keep sidebar below header */
      top: 64px;
      height: calc(100vh - 64px);
      flex-shrink: 0;
    }

    .sidebar.collapsed {
      width: 70px;
    }

    /* Mobile: force sidebar to icon-only on screens < 768px */
    @media (max-width: 767px) {
      .sidebar {
        width: 70px;
      }

      .sidebar.collapsed {
        width: 70px;
      }
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

    /* Main Header — fixed to top so sidebar starts below it */
    .app-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top:12px;
      padding-bottom:12px;
      height: 64px;
      border-bottom: 1px solid #eee;
      background-color: #122e52ff;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
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

    .logo-container {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      position: relative;
    }

    .logo-img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }

    .logo-text {
      font-weight: 600;
      font-size: 1.25rem;
      font-family: 'Raleway';
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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

    /* user dropdown — use Bootstrap dropdown-menu with small custom tweaks */
    .user-dropdown-menu {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 6px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
      min-width: 220px;
      padding: 0;
      z-index: 1200;
    }

    /* Use fixed positioning so the dropdown is not clipped by parent containers
       and appears in the viewport even when sidebars/transforms are present. */
    .user-dropdown-menu.fixed-menu {
      position: fixed;
      top: 74px; /* below the header */
      right: 16px;
      left: auto;
    }

    /* On small screens center the menu horizontally so it doesn't stick to the edge */
    @media (max-width: 768px) {
      .user-dropdown-menu.fixed-menu {
        left: 50%;
        right: auto;
        transform: translateX(-50%);
        max-width: calc(100% - 48px);
      }
    }

    .user-dropdown-menu .user-info-section {
      background: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
    }

    .user-info-text {
      font-size: 14px;
      font-weight: 600;
      color: #212529;
    }

    .user-dropdown-menu .dropdown-divider {
      margin: 6px 0;
      border-top: 1px solid #e9ecef;
    }

    .user-dropdown-menu .dropdown-item {
      padding: 10px 16px;
      color: #333;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s ease;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
      text-decoration: none;
    }

    .user-dropdown-menu .dropdown-item:hover {
      background-color: #f8f9fa;
      color: #0056b3;
    }

    .user-dropdown-menu .dropdown-item:active {
      background-color: #e9ecef;
    }

    .user-dropdown-menu .btn-logout {
      color: #dc3545;
      font-weight: 600;
    }

    .user-dropdown-menu .btn-logout:hover {
      background-color: #fff5f5;
      color: #c82333;
    }

    /* Mobile Overlay */
    .mobile-overlay {
      position: fixed;
      top: 64px; /* below header */
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1090;
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
        font-size: 1rem;
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
  openDropdown: 'inventory' | 'tasks' | 'swm' | 'pbs' | 'cimsAdmin' | 'cimsSupport' | 'cimsFieldPerson' | 'cimsReviewer' | null = null;
  user: any = null;
  userRole: string = ''; // Store the user's role for sidebar visibility
  isAdmin = false;
  isAgency = false;
  isCimsRole = false;
  isSupportEngineer = false;
  isReviewer = false;
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
      // reflect collapsed state on body for layout offset
      if (this.isSidebarCollapsed) {
        document.body.classList.add('sidebar-collapsed');
      } else {
        document.body.classList.remove('sidebar-collapsed');
      }
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
    // toggle body class to adjust main content offset
    if (this.isSidebarCollapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
  }

  toggleDropdown(dropdownName: 'inventory' | 'tasks' | 'swm' | 'pbs' | 'cimsAdmin' | 'cimsSupport' | 'cimsFieldPerson' | 'cimsReviewer') {
    if (this.openDropdown === dropdownName) {
      this.openDropdown = null;
    } else {
      this.openDropdown = dropdownName;
    }
  }

  closeSidebarIfMobile() {
    if (this.isMobile) {
      this.isSidebarCollapsed = true;
      document.body.classList.add('sidebar-collapsed');
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
      document.body.classList.add('sidebar-collapsed');
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
