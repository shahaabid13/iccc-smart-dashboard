import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonIcon,
  IonRefresher, IonRefresherContent, IonSkeletonText, IonSpinner
} from '@ionic/angular/standalone';
import { Subject, finalize, takeUntil } from 'rxjs';
import { AppHeaderComponent } from '../../components/app-header.component';
import { OfflineBannerComponent } from '../../components/offline-banner.component';
import { FieldDashboardBreakdowns, Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket.service';
import type { RefresherCustomEvent } from '@ionic/angular/standalone';

interface StatItem {
  label: string;
  value: string | number;
  tone?: 'danger';
}

interface HeroStats {
  average: string;
  oldest: string;
  flagged: string | number;
  flaggedCount: number;
}

type AgeTone = 'good' | 'warm' | 'hot';

@Component({
  selector: 'app-field-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AppHeaderComponent,
    OfflineBannerComponent,
    IonContent,
    IonIcon,
    IonRefresher,
    IonRefresherContent,
    IonSkeletonText,
    IonSpinner
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit, OnDestroy {
  queue: Ticket[] = [];
  history: Ticket[] = [];
  breakdowns?: FieldDashboardBreakdowns;
  loading = true;
  refreshing = false;
  lastUpdated?: Date;

  /** How many active tickets to preview on the dashboard */
  readonly previewLimit = 3;

  hero: HeroStats = { average: '0d', oldest: '0d', flagged: '—', flaggedCount: 0 };
  taskStats: StatItem[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(private ticketService: TicketService, private router: Router) {}

  ngOnInit(): void {
    this.refreshStats();
    this.load();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ionViewWillEnter(): void {
    if (!this.lastUpdated) this.load();
  }

  load(event?: RefresherCustomEvent): void {
    this.loading = !this.lastUpdated;
    this.refreshing = true;
    this.ticketService.getMyQueue()
      .pipe(takeUntil(this.destroy$), finalize(() => {
        this.loading = false;
        this.refreshing = false;
        event?.target.complete();
      }))
      .subscribe(queue => {
        this.queue = queue;
        this.refreshStats();
        this.ticketService.getMyHistory()
          .pipe(takeUntil(this.destroy$))
          .subscribe(history => {
            this.history = history;
            this.refreshStats();
          });
        this.ticketService.getMyDashboardBreakdowns()
          .pipe(takeUntil(this.destroy$))
          .subscribe(breakdowns => {
            this.breakdowns = breakdowns;
            this.lastUpdated = new Date();
            this.refreshStats();
          });
      });
  }

  /** Computes hero + task stats once per data change (instead of on every change detection) */
  private refreshStats(): void {
    const ages = this.queue.map(ticket => this.ageDays(ticket)).filter((age): age is number => age !== null);
    const pendingStatuses = new Set(['OPEN', 'PENDING', 'HOLD', 'ASSIGNED', 'ASSIGNED_TO_REVIEWER', 'IN_REVIEW']);
    const terminalStatuses = new Set(['RESOLVED', 'REJECTED', 'CLOSED', 'COMPLETED']);
    const statuses = this.breakdowns?.taskStatuses || [];

    const pendingTasks = statuses
      .filter(item => pendingStatuses.has(item.label.toUpperCase()) && !terminalStatuses.has(item.label.toUpperCase()))
      .reduce((sum, item) => sum + item.count, 0);
    const completedTasks = statuses
      .filter(item => terminalStatuses.has(item.label.toUpperCase()))
      .reduce((sum, item) => sum + item.count, 0);
    const overdueTasks = (this.breakdowns?.tasksByAssignee || []).reduce((sum, item) => sum + item.overdue, 0);

    const allTickets = new Map([...this.history, ...this.queue].map(ticket => [ticket.id, ticket]));
    const ticketRecords = Array.from(allTickets.values());
    const flagStateAvailable = ticketRecords.some(ticket => typeof ticket.flagged === 'boolean');
    const flaggedCount = ticketRecords.filter(ticket => ticket.flagged === true).length;

    const averageAge = ages.length ? ages.reduce((sum, age) => sum + age, 0) / ages.length : 0;
    const oldestAge = ages.length ? Math.max(...ages) : 0;

    this.hero = {
      average: this.formatDays(averageAge),
      oldest: this.formatDays(oldestAge),
      flagged: flagStateAvailable ? flaggedCount : '—',
      flaggedCount
    };

    this.taskStats = [
      { label: 'Pending', value: pendingTasks },
      { label: 'Overdue', value: overdueTasks, tone: overdueTasks ? 'danger' : undefined },
      { label: 'Completed', value: completedTasks }
    ];
  }

  /* ---------- chart helpers ---------- */

  get incidentMaximum(): number {
    return Math.max(0, ...(this.breakdowns?.incidentTypes || []).map(item => item.count));
  }

  get ageingMaximum(): number {
    return Math.max(0, ...(this.breakdowns?.ageing || []).map(item => item.count));
  }

  get taskMaximum(): number {
    return Math.max(0, ...(this.breakdowns?.taskStatuses || []).map(item => item.count));
  }

  get trendPreview(): FieldDashboardBreakdowns['trend'] {
    return this.breakdowns?.trend || [];
  }

  get trendMaximum(): number {
    return Math.max(0, ...this.trendPreview.flatMap(point => [point.created, point.closed]));
  }

  get trendCreatedTotal(): number {
    return this.trendPreview.reduce((sum, point) => sum + point.created, 0);
  }

  get trendClosedTotal(): number {
    return this.trendPreview.reduce((sum, point) => sum + point.closed, 0);
  }

  width(value: number, maximum: number): string {
    return `${maximum ? Math.max(3, Math.round(value / maximum * 100)) : 0}%`;
  }

  /** Column height for the created/closed chart (0 values render as a faint baseline via CSS) */
  heightPct(value: number, maximum: number): string {
    return `${maximum && value ? Math.max(8, Math.round(value / maximum * 100)) : 0}%`;
  }

  /* ---------- ticket helpers ---------- */

  formatDays(days: number): string {
    const rounded = Math.round(days * 10) / 10;
    return `${rounded}d`;
  }

  ageDays(ticket: Ticket): number | null {
    if (!ticket.createdAt) return null;
    const createdAt = new Date(ticket.createdAt).getTime();
    return Number.isFinite(createdAt) ? Math.max(0, (Date.now() - createdAt) / 86400000) : null;
  }

  ageLabel(ticket: Ticket): string {
    const age = this.ageDays(ticket);
    return age === null ? '—' : this.formatDays(age);
  }

  /** Matches the ageing buckets: under 3 days good, 3-7 days warm, 7+ hot */
  ageTone(ticket: Ticket): AgeTone {
    const age = this.ageDays(ticket);
    if (age === null || age < 3) return 'good';
    return age < 7 ? 'warm' : 'hot';
  }

  /* ---------- trackBy ---------- */

  trackByTicket = (_: number, ticket: Ticket) => ticket.id;
  trackByLabel = (_: number, item: { label: string }) => item.label;
  trackByDate = (_: number, point: { date: unknown }) => String(point.date);

  /* ---------- navigation ---------- */

  openQueue(): void {
    void this.router.navigate(['/tickets']);
  }

  openHistory(): void {
    void this.router.navigate(['/tickets'], { queryParams: { tab: 'history' } });
  }

  openTicket(ticket: Ticket): void {
    void this.router.navigate(['/tickets', ticket.id]);
  }
}