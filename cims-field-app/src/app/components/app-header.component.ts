import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonBackButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonBackButton
  ],
  template: `
    <ion-header [translucent]="translucent">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>

        <div class="header-branding">
          <img 
            src="assets/IMG_20251203_100849.jpg" 
            alt="Logo" 
            class="header-logo"
          />
          <span class="app-name">Field Responder App</span>
        </div>

        <ion-buttons slot="end" *ngIf="showBackButton">
          <ion-back-button defaultHref="/tickets" text="" icon="arrow-back-outline"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  `,
  styles: [`
    .header-branding {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
      margin-left: 0;
      min-width: 0;
    }

    .header-logo {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
    }

    .app-name {
      font-size: 16px;
      font-weight: 600;
      color: var(--ion-text-color, #000);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    ion-back-button {
      --icon-size: 20px;
      --padding-start: 4px;
      --padding-end: 4px;
      --color: white;
    }

    @media (max-width: 480px) {
      .app-name {
        font-size: 14px;
      }
    }

    @media (max-width: 360px) {
      .app-name {
        display: none;
      }
    }
  `]
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  @Input() translucent = true;
  showBackButton = false;
  private sub?: Subscription;

  constructor(
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.updateBackButton();
    this.sub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.updateBackButton());
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private updateBackButton(): void {
    const url = this.router.url;
    const isMainRoute = ['/', '/login', '/tickets', '/tasks', '/home'].includes(url) || url.startsWith('/tickets?') || url.startsWith('/tasks?');
    this.showBackButton = !isMainRoute;
  }

  goBack(): void {
    this.location.back();
  }
}