import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';

interface ModuleCard {
  icon: string;
  title: string;
  description: string;
  route: string;
  active: boolean;
  buttonText: string;
}

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  template: `
    <div class="home-dashboard">
      <div class="hero">
        <div>
          <h1>Welcome to ICCC SMART Dashboard</h1>
          <p>
            Your centralized platform for Inventory, SWM, PBS, and Camera Incident Management.
            Start from here and quickly navigate into the systems you have access to.
          </p>
        </div>
      </div>

      <div class="cards-grid">
        <mat-card class="module-card" *ngFor="let card of cards" [class.inactive]="!card.active">
          <div class="card-icon">{{ card.icon }}</div>
          <h2>{{ card.title }}</h2>
          <p>{{ card.description }}</p>
          <button
            mat-raised-button
            color="primary"
            [routerLink]="card.route"
            [disabled]="!card.active"
            [attr.aria-disabled]="!card.active"
          >
            {{ card.buttonText }}
          </button>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .home-dashboard {
        padding: 24px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .hero {
        margin-bottom: 32px;
      }

      .hero h1 {
        font-size: 2.4rem;
        margin-bottom: 12px;
      }

      .hero p {
        max-width: 760px;
        line-height: 1.65;
        color: #525252;
      }

      .cards-grid {
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(4, minmax(220px, 1fr));
      }

      .module-card {
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        border-radius: 16px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .module-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.08);
      }

      .module-card.inactive {
        opacity: 0.55;
      }

      .card-icon {
        font-size: 2rem;
      }

      .module-card h2 {
        margin: 0;
        font-size: 1.35rem;
      }

      .module-card p {
        margin: 0;
        line-height: 1.7;
        color: #4f4f4f;
        flex: 1;
      }

      button[mat-raised-button] {
        width: fit-content;
      }

      @media (max-width: 1024px) {
        .cards-grid {
          grid-template-columns: repeat(2, minmax(220px, 1fr));
        }
      }

      @media (max-width: 720px) {
        .cards-grid {
          grid-template-columns: 1fr;
        }
      }
    `
  ]
})
export class HomeDashboardComponent implements OnInit {
  userRole = '';
  cards: ModuleCard[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRole()?.toUpperCase() || '';
    // If user is a FIELD_PERSON, show only CIMS entry on the home dashboard to
    // avoid confusion and keep the screen focused for mobile-first usage.
    if (this.userRole === 'FIELD_PERSON') {
      this.cards = [
        {
          icon: '🎫',
          title: 'CIMS',
          description: 'Camera Incident Management System for incident capture, acknowledgement, reviewer assignment, and resolution.',
          route: this.getCimsRoute(),
          active: this.canAccessCims(),
          buttonText: this.canAccessCims() ? 'Go to CIMS' : 'Access Restricted'
        }
      ];
      return;
    }

    this.cards = [
      {
        icon: '📦',
        title: 'Inventory Management',
        description: 'Device inventory tracking for ANPR, RLVD, analytics cameras, poles, ECBs, and related assets.',
        route: '/inventory',
        active: true,
        buttonText: 'Go to Inventory'
      },
      {
        icon: '♻️',
        title: 'SWM',
        description: 'Solid Waste Management dashboard for operational monitoring and reporting.',
        route: '/smc',
        active: true,
        buttonText: 'Go to SWM'
      },
      {
        icon: '🏢',
        title: 'PBS',
        description: 'PBS bike station and analytics management for station monitoring and parking operations.',
        route: '/pbs/stations',
        active: true,
        buttonText: 'Go to PBS'
      },
      {
        icon: '🎫',
        title: 'CIMS',
        description: 'Camera Incident Management System for incident capture, acknowledgement, reviewer assignment, and resolution.',
        route: this.getCimsRoute(),
        active: this.canAccessCims(),
        buttonText: this.canAccessCims() ? 'Go to CIMS' : 'Access Restricted'
      }
    ];
  }

  canAccessCims(): boolean {
    return ['SUPPORT_ENGINEER', 'FIELD_PERSON', 'REVIEWER', 'ADMIN'].includes(this.userRole);
  }

  getCimsRoute(): string {
    switch (this.userRole) {
      case 'SUPPORT_ENGINEER':
        return '/cims/support-engineer/dashboard';
      case 'FIELD_PERSON':
        return '/cims/field-person/dashboard';
      case 'REVIEWER':
        return '/cims/reviewer/dashboard';
      case 'ADMIN':
        return '/cims/admin/dashboard';
      default:
        return '/login';
    }
  }
}
