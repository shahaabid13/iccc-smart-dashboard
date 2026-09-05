import { Component, OnInit, OnDestroy, HostListener, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../services/auth.service';
import { InventoryService } from '../../services/inventory.service';
import { SmcService } from '../../services/smc.service';
import { CharteredBikeService } from '../../services/chartered-bike.service';
import { TrammService } from '../../services/Tramm.service';
import { CimsService } from '../../services/cims.service';
import { TaskService } from '../../services/task.service';
import { Observable, catchError, forkJoin, map, of, switchMap, interval, Subscription } from 'rxjs';

interface ModuleCard {
  icon: string; // Material icon name
  title: string;
  description: string;
  route: string;
  active: boolean;
  buttonText: string;
  /** Per-module accent color (hex) driving the top bar, icon chip, shadow glow, and button. */
  accent: string;
  /** Same color as "r, g, b" so CSS can build rgba() shadows/tints from it. */
  accentRgb: string;
  stats?: { label: string; value: string | number }[];
}

interface CarouselImage {
  src: string;
  alt: string;
}

type ModuleStats = { label: string; value: string | number }[];

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  template: `
    <div class="home-dashboard">
      <!-- Top Marquee Banner -->
      <div class="hero">
        <div class="marquee-wrap">
          <div class="marquee-track">
            <span class="marquee-item" *ngFor="let i of [0, 1]">
              <ng-container *ngTemplateOutlet="marqueeContent"></ng-container>
            </span>
          </div>
        </div>
      </div>

      <ng-template #marqueeContent>
        <span class="marquee-text marquee-brand">
          <mat-icon class="marquee-icon">apartment</mat-icon>
          Welcome to ICCC SMART Dashboard
        </span>
        <span class="marquee-dot">&#9679;</span>
        <span class="marquee-text">Inventory</span>
        <span class="marquee-dot">&#9679;</span>
        <span class="marquee-text">Task Management</span>
        <span class="marquee-dot">&#9679;</span>
        <span class="marquee-text">SWM</span>
        <span class="marquee-dot">&#9679;</span>
        <span class="marquee-text">PBS</span>
        <span class="marquee-dot">&#9679;</span>
        <span class="marquee-text">TraMM</span>
        <span class="marquee-dot">&#9679;</span>
        <span class="marquee-text">ITMS</span>
        <span class="marquee-dot">&#9679;</span>
        <span class="marquee-text">TMS</span>
        <span class="marquee-dot">&#9679;</span>
        <span class="marquee-text">VMS</span>
        <span class="marquee-dot">&#9679;</span>
        <span class="marquee-text">CIMS</span>
        <span class="marquee-dot">&#9679;</span>
      </ng-template>

      <!-- ---- Responsive Image Carousel (3D Coverflow) ---- -->
      <div
        class="carousel-section"
        (mouseenter)="onCarouselMouseEnter()"
        (mouseleave)="onCarouselMouseLeave()"
        (touchstart)="onTouchStart($event)"
        (touchend)="onTouchEnd($event)"
      >
        <button
          type="button"
          class="carousel-arrow carousel-arrow-left"
          (click)="prevSlide()"
          aria-label="Previous slide"
        >
          <mat-icon>chevron_left</mat-icon>
        </button>

        <div class="carousel-viewport">
          <div
            class="carousel-slide"
            *ngFor="let img of carouselImages; let i = index"
            [class.is-active]="i === currentSlide"
            [style.transform]="getSlideStyle(i).transform"
            [style.opacity]="getSlideStyle(i).opacity"
            [style.zIndex]="getSlideStyle(i).zIndex"
            (click)="goToSlide(i)"
          >
            <img [src]="img.src" [alt]="img.alt" loading="lazy" />
          </div>
        </div>

        <button
          type="button"
          class="carousel-arrow carousel-arrow-right"
          (click)="nextSlide()"
          aria-label="Next slide"
        >
          <mat-icon>chevron_right</mat-icon>
        </button>

        <div class="carousel-dots">
          <span
            *ngFor="let img of carouselImages; let i = index"
            class="dot"
            [class.active]="i === currentSlide"
            (click)="goToSlide(i)"
          ></span>
        </div>
      </div>

      <!-- ---- Responsive Cards Grid ---- -->
      <div
        class="cards-grid"
        [class.single-card]="cards.length === 1"
        [class.two-cards]="cards.length === 2"
      >
        <mat-card
          class="module-card"
          *ngFor="let card of cards"
          [class.inactive]="!card.active"
          [style.--accent]="card.accent"
          [style.--accent-rgb]="card.accentRgb"
        >
          <div class="card-icon-wrap">
            <mat-icon class="card-icon">{{ card.icon }}</mat-icon>
          </div>

          <h2>{{ card.title }}</h2>
          <p>{{ card.description }}</p>

          <div class="card-stats" aria-live="polite">
            <ng-container *ngIf="card.stats; else loadingStats">
              <div class="stat-item" *ngFor="let stat of card.stats | slice:0:4">
                <span class="stat-label">{{ stat.label }}</span>
                <strong class="stat-value">{{ stat.value }}</strong>
              </div>
            </ng-container>
            <ng-template #loadingStats>
              <div class="loading-block">
                <mat-progress-bar mode="indeterminate"></mat-progress-bar>
                <span class="loading-msg">{{ loadingMessage }}</span>
              </div>
            </ng-template>
          </div>

          <button
            mat-raised-button
            color="primary"
            [routerLink]="card.route"
            [disabled]="!card.active"
            [attr.aria-disabled]="!card.active"
          >
            <span>{{ card.buttonText }}</span>
            <mat-icon class="btn-arrow" *ngIf="card.active">arrow_forward</mat-icon>
          </button>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        width: 100%;
      }

      .home-dashboard {
        padding: 16px 20px 32px;
        max-width: 1400px;
        margin: 0 auto;
        width: 100%;
      }

      .hero {
        margin-bottom: 24px;
      }

      /* ---- Marquee welcome banner ---- */
      .marquee-wrap {
        overflow: hidden;
        border-radius: 16px;
        padding: 14px 0;
        background: linear-gradient(90deg, #1e1b4b, #4338ca 45%, #0891b2 100%);
        box-shadow: 0 10px 28px -8px rgba(67, 56, 202, 0.4);
        position: relative;
      }

      .marquee-wrap::before,
      .marquee-wrap::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 48px;
        z-index: 2;
        pointer-events: none;
      }

      .marquee-wrap::before {
        left: 0;
        background: linear-gradient(90deg, #1e1b4b, transparent);
      }

      .marquee-wrap::after {
        right: 0;
        background: linear-gradient(270deg, #0891b2, transparent);
      }

      .marquee-track {
        display: flex;
        width: max-content;
        animation: marquee-scroll 26s linear infinite;
      }

      .marquee-wrap:hover .marquee-track {
        animation-play-state: paused;
      }

      .marquee-item {
        display: flex;
        align-items: center;
        white-space: nowrap;
        padding-right: 36px;
      }

      .marquee-text {
        font-size: 1rem;
        font-weight: 700;
        letter-spacing: 0.2px;
        color: #f4f5ff;
        padding: 0 8px;
        font-family: inherit;
      }

      .marquee-brand {
        font-size: 1.35rem;
        font-weight: 800;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: linear-gradient(90deg, #ffffff, #a5f3fc);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .marquee-icon {
        color: #a5f3fc;
        font-size: 1.3rem;
        width: 1.3rem;
        height: 1.3rem;
      }

      .marquee-dot {
        color: #67e8f9;
        font-size: 0.6rem;
        padding: 0 4px;
      }

      @keyframes marquee-scroll {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(-50%);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .marquee-track {
          animation: none;
        }
      }

      /* ---- Image Carousel (coverflow style) ---- */
      .carousel-section {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-bottom: 36px;
        padding: 12px 0 28px;
        width: 100%;
        touch-action: pan-y;
      }

      .carousel-viewport {
        position: relative;
        width: 100%;
        height: 290px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      .carousel-slide {
        position: absolute;
        width: 250px;
        height: 250px;
        border-radius: 18px;
        overflow: hidden;
        cursor: pointer;
        box-shadow: 0 14px 34px -10px rgba(0, 0, 0, 0.25);
        transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease, box-shadow 0.4s ease;
        will-change: transform, opacity;
        user-select: none;
      }

      .carousel-slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        pointer-events: none;
      }

      .carousel-slide.is-active {
        box-shadow: 0 24px 50px -10px rgba(67, 56, 202, 0.48);
      }

      .carousel-arrow {
        position: relative;
        z-index: 20;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ffffff;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.16);
        cursor: pointer;
        flex-shrink: 0;
        transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
      }

      .carousel-arrow:hover {
        background: #eef0ff;
        transform: scale(1.08);
        box-shadow: 0 8px 22px rgba(67, 56, 202, 0.25);
      }

      .carousel-arrow mat-icon {
        color: #4338ca;
        font-size: 24px;
        width: 24px;
        height: 24px;
        line-height: 24px;
      }

      .carousel-dots {
        position: absolute;
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
      }

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #d4d7de;
        cursor: pointer;
        transition: background 0.25s ease, transform 0.25s ease;
      }

      .dot.active {
        background: #4338ca;
        transform: scale(1.3);
      }

      /* ---- Cards Grid ---- */
      .cards-grid {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fit, minmax(195px, 1fr));
        align-items: stretch;
        width: 100%;
      }

      .cards-grid.single-card {
        max-width: 440px;
        margin: 0 auto;
        grid-template-columns: 1fr;
      }

      .cards-grid.two-cards {
        max-width: 780px;
        margin: 0 auto;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      }

      .module-card {
        position: relative;
        overflow: hidden;
        padding: 18px 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        border-radius: 16px;
        border: 1px solid rgba(0, 0, 0, 0.07);
        background: #ffffff;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
        transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
          box-shadow 0.35s ease, border-color 0.35s ease, background-color 0.3s ease, color 0.3s ease;
      }

      .module-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--accent, #4338ca);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.4s ease;
      }

      .module-card:not(.inactive):hover::before {
        transform: scaleX(1);
      }

      .module-card:not(.inactive):hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 38px -12px rgba(var(--accent-rgb, 67, 56, 202), 0.42),
          0 4px 14px rgba(0, 0, 0, 0.06);
        border-color: rgba(var(--accent-rgb, 67, 56, 202), 0.35);
        background-color: var(--accent, #4338ca);
        color: #ffffff;
      }

      .module-card.inactive {
        opacity: 0.55;
      }

      .card-icon-wrap {
        width: 44px;
        height: 44px;
        border-radius: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(var(--accent-rgb, 67, 56, 202), 0.12);
        transition: transform 0.35s ease, background 0.35s ease, color 0.35s ease;
      }

      .module-card:not(.inactive):hover .card-icon-wrap {
        transform: scale(1.08) rotate(-4deg);
        background: rgba(255, 255, 255, 0.22);
        color: #ffffff;
      }

      .card-icon {
        font-size: 1.55rem;
        width: 1.55rem;
        height: 1.55rem;
        color: var(--accent, #4338ca);
        transition: color 0.3s ease;
      }

      .module-card:not(.inactive):hover .card-icon {
        color: #ffffff;
      }

      .module-card h2 {
        margin: 0;
        font-size: 1.05rem;
        line-height: 1.25;
        color: #1e293b;
        font-weight: 700;
        transition: color 0.3s ease;
      }

      .module-card:not(.inactive):hover h2 {
        color: #ffffff;
      }

      .module-card p {
        margin: 0;
        line-height: 1.5;
        color: #4f4f4f;
        font-size: 0.8rem;
        flex: 1;
        transition: color 0.3s ease;
      }

      .module-card:not(.inactive):hover p {
        color: rgba(255, 255, 255, 0.95);
      }

      .card-stats {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 6px 10px;
        color: #6b6b6b;
        min-height: 38px;
        transition: color 0.3s ease;
      }

      .module-card:not(.inactive):hover .card-stats {
        color: #ffffff;
      }

      .stat-item {
        display: flex;
        min-width: 0;
        flex-direction: column;
        gap: 2px;
      }

      .stat-value {
        color: #303030;
        font-size: 0.78rem;
        line-height: 1.1;
        font-weight: 600;
        transition: color 0.3s ease;
      }

      .module-card:not(.inactive):hover .stat-value {
        color: #ffffff;
        font-weight: 700;
      }

      .stat-label {
        overflow: hidden;
        font-size: 0.65rem;
        line-height: 1.1;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: color 0.3s ease;
      }

      .module-card:not(.inactive):hover .stat-label {
        color: rgba(255, 255, 255, 0.88);
      }

      .loading-block {
        grid-column: 1 / -1;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .loading-block mat-progress-bar {
        height: 4px;
        border-radius: 2px;
      }

      .loading-msg {
        font-size: 0.68rem;
        color: #8a8a8a;
        font-style: italic;
        transition: color 0.3s ease;
      }

      .module-card:not(.inactive):hover .loading-msg {
        color: rgba(255, 255, 255, 0.9);
      }

      /* ---- Action Button ---- */
      button[mat-raised-button] {
        width: fit-content;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        border-radius: 9px;
        font-size: 0.8rem;
        padding: 0 14px;
        height: 38px;
        background: var(--accent, #4338ca) !important;
        color: #fff !important;
        box-shadow: 0 4px 14px rgba(var(--accent-rgb, 67, 56, 202), 0.35);
        transition: filter 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease;
      }

      button[mat-raised-button]:hover:not([disabled]) {
        filter: brightness(1.1);
        transform: translateY(-1px);
        box-shadow: 0 8px 22px rgba(var(--accent-rgb, 67, 56, 202), 0.45);
      }

      .module-card:not(.inactive):hover button[mat-raised-button]:not([disabled]) {
        background: rgba(255, 255, 255, 0.22) !important;
        color: #ffffff !important;
        border: 1px solid rgba(255, 255, 255, 0.38);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
      }

      .module-card:not(.inactive):hover button[mat-raised-button]:hover:not([disabled]) {
        background: #ffffff !important;
        color: var(--accent, #4338ca) !important;
        border-color: #ffffff;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
      }

      button[mat-raised-button][disabled] {
        background: #d4d7de !important;
        color: #8a8f99 !important;
        box-shadow: none;
      }

      .btn-arrow {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
        transition: transform 0.25s ease;
      }

      button[mat-raised-button]:hover:not([disabled]) .btn-arrow {
        transform: translateX(3px);
      }

      /* =======================================================
         RESPONSIVE BREAKPOINTS (Mobile, Tablet, Desktop)
         ======================================================= */

      /* Tablets (max-width: 992px) */
      @media (max-width: 992px) {
        .home-dashboard {
          padding: 14px 16px 28px;
        }

        .marquee-brand {
          font-size: 1.2rem;
        }

        .marquee-text {
          font-size: 0.95rem;
        }

        .carousel-viewport {
          height: 240px;
        }

        .carousel-slide {
          width: 200px;
          height: 200px;
          border-radius: 16px;
        }

        .carousel-arrow {
          width: 38px;
          height: 38px;
        }

        .cards-grid {
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 14px;
        }
      }

      /* Small Tablets / Phablets (max-width: 768px) */
      @media (max-width: 768px) {
        .home-dashboard {
          padding: 12px 14px 24px;
        }

        .hero {
          margin-bottom: 18px;
        }

        .marquee-wrap {
          padding: 11px 0;
          border-radius: 12px;
        }

        .marquee-brand {
          font-size: 1.1rem;
          gap: 6px;
        }

        .marquee-icon {
          font-size: 1.15rem;
          width: 1.15rem;
          height: 1.15rem;
        }

        .marquee-text {
          font-size: 0.9rem;
        }

        .carousel-section {
          margin-bottom: 24px;
          padding: 8px 0 22px;
          gap: 6px;
        }

        .carousel-viewport {
          height: 200px;
        }

        .carousel-slide {
          width: 165px;
          height: 165px;
          border-radius: 14px;
        }

        .carousel-arrow {
          width: 34px;
          height: 34px;
        }

        .carousel-arrow mat-icon {
          font-size: 20px;
          width: 20px;
          height: 20px;
          line-height: 20px;
        }

        .cards-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .module-card {
          padding: 16px 14px;
        }
      }

      /* Phones in Portrait (max-width: 540px) */
      @media (max-width: 540px) {
        .home-dashboard {
          padding: 10px 12px 20px;
        }

        .marquee-wrap {
          padding: 9px 0;
        }

        .marquee-brand {
          font-size: 0.95rem;
          gap: 4px;
        }

        .marquee-icon {
          font-size: 1rem;
          width: 1rem;
          height: 1rem;
        }

        .marquee-text {
          font-size: 0.82rem;
          padding: 0 4px;
        }

        .marquee-item {
          padding-right: 20px;
        }

        .carousel-section {
          margin-bottom: 20px;
          padding: 4px 0 18px;
          gap: 4px;
        }

        .carousel-viewport {
          height: 170px;
        }

        .carousel-slide {
          width: 140px;
          height: 140px;
          border-radius: 12px;
        }

        .carousel-arrow {
          width: 30px;
          height: 30px;
        }

        .carousel-arrow mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
          line-height: 18px;
        }

        .cards-grid {
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .module-card {
          padding: 16px 14px;
          gap: 10px;
          border-radius: 14px;
        }

        button[mat-raised-button] {
          width: 100%;
          justify-content: center;
          height: 40px;
          font-size: 0.84rem;
        }
      }

      /* Extra Small Phones (max-width: 380px) */
      @media (max-width: 380px) {
        .carousel-viewport {
          height: 150px;
        }

        .carousel-slide {
          width: 120px;
          height: 120px;
          border-radius: 10px;
        }

        .module-card h2 {
          font-size: 0.98rem;
        }

        .module-card p {
          font-size: 0.76rem;
        }
      }
    `
  ]
})
export class HomeDashboardComponent implements OnInit, OnDestroy {
  userRole = '';
  cards: ModuleCard[] = [];
  windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

  loadingMessage = '';
  private loadingMessages = [
    'Pinging device inventory…',
    'Tallying today\'s waste weighbridge data…',
    'Checking bike fleet availability…',
    'Reading junction signal health…',
    'Counting open camera incidents…',
    'Almost there, crunching numbers…'
  ];
  private messageIndex = 0;
  private messageTimer?: Subscription;

  /** ---- Carousel state ---- */
  carouselImages: CarouselImage[] = [
    { src: '/img1.jfif', alt: 'Inventory Management' },
    { src: '/img2.jpg', alt: 'Task Management' },
    { src: '/img3.jpg', alt: 'Solid Waste Management' },
    { src: '/img4.jpg', alt: 'Public Bike Sharing' },
    { src: '/img5.jpg', alt: 'Traffic Signal Monitoring' },
    { src: '/img6.jpg', alt: 'Camera Incident Management' }
  ];
  currentSlide = 0;
  private autoScrollTimer?: Subscription;
  private readonly autoScrollIntervalMs = 3500;

  private touchStartX = 0;
  private touchEndX = 0;

  @HostListener('window:resize')
  onResize(): void {
    if (typeof window !== 'undefined') {
      this.windowWidth = window.innerWidth;
    }
  }

  /** hex -> "r, g, b" so template styles can build rgba() shadows/tints from a single accent color. */
  private hexToRgbString(hex: string): string {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }

  private makeCard(partial: Omit<ModuleCard, 'accentRgb'>): ModuleCard {
    return { ...partial, accentRgb: this.hexToRgbString(partial.accent) };
  }

  constructor(
    private authService: AuthService,
    private inventoryService: InventoryService,
    private smcService: SmcService,
    private charteredBikeService: CharteredBikeService,
    private trammService: TrammService,
    private cimsService: CimsService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRole()?.toUpperCase() || '';
    if (typeof window !== 'undefined') {
      this.windowWidth = window.innerWidth;
    }

    this.startLoadingMessages();
    this.startAutoScroll();

    if (this.userRole === 'FIELD_PERSON') {
      this.cards = [
        this.makeCard({
          icon: 'confirmation_number',
          title: 'CIMS',
          description: 'Camera Incident Management System for incident capture, acknowledgement, reviewer assignment, and resolution.',
          route: this.getCimsRoute(),
          active: this.canAccessCims(),
          buttonText: this.canAccessCims() ? 'Go to CIMS' : 'Access Restricted',
          accent: '#e11d48'
        })
      ];
      this.loadStats();
      return;
    }

    this.cards = [
      this.makeCard({
        icon: 'inventory_2',
        title: 'Inventory Management',
        description: 'Device inventory tracking for ANPR, RLVD, analytics cameras, poles, ECBs, and related assets.',
        route: '/inventory',
        active: true,
        buttonText: 'Go to Inventory',
        accent: '#2563eb'
      }),
      this.makeCard({
        icon: 'checklist',
        title: 'Task Management',
        description: 'Track and manage site tasks, assignments, and their resolution status.',
        route: '/tasks/all',
        active: true,
        buttonText: 'Go to Tasks',
        accent: '#d97706'
      }),
      this.makeCard({
        icon: 'recycling',
        title: 'SWM',
        description: 'Solid Waste Management dashboard for operational monitoring and reporting.',
        route: '/smc',
        active: true,
        buttonText: 'Go to SWM',
        accent: '#16a34a'
      }),
      this.makeCard({
        icon: 'pedal_bike',
        title: 'PBS',
        description: 'PBS bike station and analytics management for station monitoring and parking operations.',
        route: '/pbs/stations',
        active: true,
        buttonText: 'Go to PBS',
        accent: '#0d9488'
      }),
      this.makeCard({
        icon: 'traffic',
        title: 'TraMM',
        description: 'Traffic signal monitoring for live junction and signal health status.',
        route: '/tramm/junction-map',
        active: true,
        buttonText: 'Go to TraMM',
        accent: '#7c3aed'
      }),
      this.makeCard({
        icon: 'traffic',
        title: 'ITMS',
        description: 'Traffic Management System for real-time traffic monitoring and control.',
        route: '/traffic-dashboard/dashboard/events/results',
        active: true,
        buttonText: 'Go to ITMS',
        accent: '#0891b2'
      }),
      this.makeCard({
        icon: 'confirmation_number',
        title: 'CIMS',
        description: 'Camera Incident Management System for incident capture, acknowledgement, reviewer assignment, and resolution.',
        route: this.getCimsRoute(),
        active: this.canAccessCims(),
        buttonText: this.canAccessCims() ? 'Go to CIMS' : 'Access Restricted',
        accent: '#e11d48'
      })
    ];

    this.loadStats();
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
    this.messageTimer?.unsubscribe();
  }

  private startLoadingMessages(): void {
    this.loadingMessage = this.loadingMessages[0];
    this.messageTimer = interval(2200).subscribe(() => {
      this.messageIndex = (this.messageIndex + 1) % this.loadingMessages.length;
      this.loadingMessage = this.loadingMessages[this.messageIndex];
    });
  }

  private startAutoScroll(): void {
    if (this.autoScrollTimer) {
      return;
    }
    this.autoScrollTimer = interval(this.autoScrollIntervalMs).subscribe(() => {
      this.nextSlide();
    });
  }

  private stopAutoScroll(): void {
    this.autoScrollTimer?.unsubscribe();
    this.autoScrollTimer = undefined;
  }

  onCarouselMouseEnter(): void {
    this.stopAutoScroll();
  }

  onCarouselMouseLeave(): void {
    this.startAutoScroll();
  }

  onTouchStart(e: TouchEvent): void {
    this.stopAutoScroll();
    this.touchStartX = e.changedTouches[0].screenX;
  }

  onTouchEnd(e: TouchEvent): void {
    this.touchEndX = e.changedTouches[0].screenX;
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
    this.startAutoScroll();
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.carouselImages.length) % this.carouselImages.length;
  }

  goToSlide(i: number): void {
    this.currentSlide = i;
  }

  /** Circular distance of slide i from the current center slide (e.g. -2, -1, 0, 1, 2). */
  private getSlideOffset(i: number): number {
    const len = this.carouselImages.length;
    let diff = i - this.currentSlide;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    return diff;
  }

  getSlideStyle(i: number): { transform: string; opacity: number; zIndex: number } {
    const offset = this.getSlideOffset(i);
    const abs = Math.abs(offset);

    // Responsive spacing and scaling factors
    let spacing = 190;
    let outerSpacing = 130;
    let activeScale = 1.15;
    let sideScale = 0.75;
    let outerScale = 0.55;

    if (this.windowWidth < 480) {
      spacing = 75;
      outerSpacing = 50;
      activeScale = 1.05;
      sideScale = 0.65;
      outerScale = 0.45;
    } else if (this.windowWidth < 768) {
      spacing = 115;
      outerSpacing = 80;
      activeScale = 1.1;
      sideScale = 0.7;
      outerScale = 0.5;
    } else if (this.windowWidth < 1024) {
      spacing = 150;
      outerSpacing = 100;
    }

    if (abs > 2) {
      return { transform: `translateX(${offset * outerSpacing}px) scale(${outerScale})`, opacity: 0, zIndex: 0 };
    }

    const scale = abs === 0 ? activeScale : abs === 1 ? sideScale : outerScale;
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.75 : 0.35;
    const zIndex = 10 - abs;

    return {
      transform: `translateX(${offset * spacing}px) scale(${scale})`,
      opacity,
      zIndex
    };
  }

  private loadStats(): void {
    const statsByCard: Record<string, Observable<ModuleStats>> = {
      CIMS: this.cimsStats()
    };

    if (this.userRole !== 'FIELD_PERSON') {
      Object.assign(statsByCard, {
        'Inventory Management': this.inventoryStats(),
        'Task Management': this.taskStats(),
        SWM: this.swmStats(),
        PBS: this.pbsStats(),
        TraMM: this.trammStats()
      });
    }

    forkJoin(statsByCard).subscribe((results) => {
      this.cards = this.cards.map((card) => ({ ...card, stats: results[card.title] }));
      this.messageTimer?.unsubscribe();
      if (isDevMode()) {
        Object.entries(results).forEach(([cardTitle, stats]) => stats.forEach((stat) => {
          if (stat.value === undefined || stat.value === null) {
            console.warn(`[HomeDashboard] Undefined stat value: ${cardTitle} / ${stat.label}`);
          }
        }));
      }
    });
  }

  private inventoryStats(): Observable<ModuleStats> {
    return this.inventoryService.getAll().pipe(
      map((devices) => [
        { label: 'Total Devices', value: devices.length },
        { label: 'Installed', value: devices.filter((device) => String(device.status).toUpperCase() === 'INSTALLED').length },
        { label: 'Poles', value: devices.filter((device) => device.poles).length },
        { label: 'ECB Present', value: devices.filter((device) => device.ecbPresent).length }
      ]),
      catchError(() => of(this.failedStats(['Total Devices', 'Installed', 'Poles', 'ECB Present'])))
    );
  }

  private taskStats(): Observable<ModuleStats> {
    return this.taskService.getDashboardStats().pipe(
      map((stats) => [
        { label: 'Total Tasks', value: stats.totalTasks },
        { label: 'Open Tasks', value: stats.openTasks },
        { label: 'Closed Tasks', value: stats.closedTasks },
        { label: 'Rejected Tasks', value: stats.rejectedTasks }
      ]),
      catchError(() => of(this.failedStats(['Total Tasks', 'Open Tasks', 'Closed Tasks', 'Rejected Tasks'])))
    );
  }

  private swmStats(): Observable<ModuleStats> {
    return this.smcService.getAllWeighbridgeData('SRNGR_LANDFILL_WB1').pipe(
      map((records: any[]) => {
        const totalWeight = records.reduce((sum, record) => sum + (Number(record.nweight) || 0), 0);
        return [
          { label: 'Total Records', value: records.length },
          { label: 'Total Weight (kg)', value: Math.round(totalWeight) },
          { label: 'Average Weight', value: records.length ? Math.round(totalWeight / records.length) : 0 }
        ];
      }),
      catchError(() => of(this.failedStats(['Total Records', 'Total Weight (kg)', 'Average Weight'])))
    );
  }

  private pbsStats(): Observable<ModuleStats> {
    const stationsRequest = this.charteredBikeService.getToken()
      ? this.charteredBikeService.getStations()
      : this.charteredBikeService.login().pipe(switchMap(() => this.charteredBikeService.getStations()));

    return stationsRequest.pipe(
      map((response: any) => {
        const stations = response.data?.[0]?.mapStationDTOs || [];
        const fleet = stations.reduce((sum: number, station: any) => sum + (station.bikesTotal || 0), 0);
        const available = stations.reduce((sum: number, station: any) => sum + (station.bikesAvailable || 0), 0);
        const onTrip = stations.reduce((sum: number, station: any) => sum + (station.reportOnTripBikes || 0), 0);
        return [
          { label: 'Total Fleet', value: fleet },
          { label: 'Available', value: available },
          { label: 'On Trip', value: onTrip },
          { label: 'Utilization %', value: fleet ? `${Math.round(((fleet - available) / fleet) * 100)}%` : '0%' },
          { label: 'Active Stations', value: stations.filter((station: any) => station.active).length }
        ];
      }),
      catchError(() => of(this.failedStats(['Total Fleet', 'Available', 'On Trip', 'Utilization %'])))
    );
  }

  private trammStats(): Observable<ModuleStats> {
    return this.trammService.getCorridors().pipe(
      switchMap((corridors) => forkJoin((corridors.alCorridors || []).map((corridor) =>
        this.trammService.getJunctions(corridor).pipe(
          switchMap((junctions) => forkJoin((junctions.alJunctions || []).map((junction) =>
            this.trammService.getJunctionDetails(corridor, junction)
          )))
        )
      ))),
      map((groups: any[][]) => {
        const counts = { on: 0, off: 0, faulty: 0, dismantled: 0 };
        groups.flat().forEach((details: any) => {
          const status = `${details.sStatus || ''} ${details.sJunctionStateInCorridor || ''} ${details.sMode || ''}`.toUpperCase();
          if (status.includes('DISMANT')) counts.dismantled++;
          else if (status.includes('ERR') || status.includes('FAULT')) counts.faulty++;
          else if (status.includes('OFF')) counts.off++;
          else counts.on++;
        });
        return [
          { label: 'On', value: counts.on },
          { label: 'Off', value: counts.off },
          { label: 'Faulty/ERR', value: counts.faulty },
          { label: 'Dismantled', value: counts.dismantled }
        ];
      }),
      catchError(() => of(this.failedStats(['On', 'Off', 'Faulty/ERR', 'Dismantled'])))
    );
  }

  private cimsStats(): Observable<ModuleStats> {
    const role = this.userRole || (this.authService.getRole() || '').toUpperCase();
    return this.cimsService.getHomeDashboardStats().pipe(
      map((stats) => {
        if (role === 'FIELD_PERSON' || role === 'COORDINATOR') {
          return [
            { label: 'My Queue', value: stats.openTickets ?? 0 },
            { label: 'My History', value: stats.closedTickets ?? 0 },
            { label: 'Total Assigned', value: stats.totalTickets ?? 0 },
            { label: 'Pending Review', value: stats.pendingReview ?? 0 }
          ];
        }
        if (role === 'REVIEWER') {
          return [
            { label: 'Review Queue', value: stats.pendingReview ?? 0 },
            { label: 'My History', value: stats.closedTickets ?? 0 },
            { label: 'Total Tickets', value: stats.totalTickets ?? 0 },
            { label: 'Open Tickets', value: stats.openTickets ?? 0 }
          ];
        }
        if (role === 'SUPPORT_ENGINEER') {
          return [
            { label: 'My Tickets', value: stats.totalTickets ?? 0 },
            { label: 'Open Tickets', value: stats.openTickets ?? 0 },
            { label: 'Pending Review', value: stats.pendingReview ?? 0 },
            { label: 'Closed Tickets', value: stats.closedTickets ?? 0 }
          ];
        }
        return [
          { label: 'Total Tickets', value: stats.totalTickets ?? 0 },
          { label: 'Open Tickets', value: stats.openTickets ?? 0 },
          { label: 'Pending Review', value: stats.pendingReview ?? 0 },
          { label: 'Closed Tickets', value: stats.closedTickets ?? 0 }
        ];
      }),
      catchError(() => of(this.failedStats(['Total Tickets', 'Open Tickets', 'Pending Review', 'Closed Tickets'])))
    );
  }

  private failedStats(labels: string[]): ModuleStats {
    return labels.map((label) => ({ label, value: '—' }));
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