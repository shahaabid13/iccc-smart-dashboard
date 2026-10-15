import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { AgeingReport } from '../../models/cims.models';
import { CimsService } from '../../services/cims.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cims-ageing-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" [mat-dialog-close]="true">{{ data.confirmLabel }}</button>
    </mat-dialog-actions>
  `
})
export class CimsAgeingConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; confirmLabel: string }) {}
}

@Component({
  selector: 'app-cims-ageing-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <main class="ageing-page">
      <header class="page-heading">
        <div>
          <p class="eyebrow">CIMS / REPORTS</p>
          <h1>Ageing report</h1>
          <p class="subtitle">Open tickets grouped by defaulter</p>
        </div>
        <button mat-stroked-button type="button" (click)="notifyAll()" [disabled]="loading || notifyingAll || !reports.length">
          <mat-icon *ngIf="!notifyingAll">outgoing_mail</mat-icon>
          <mat-spinner *ngIf="notifyingAll" diameter="18"></mat-spinner>
          {{ notifyingAll ? 'Sending follow-ups' : 'Notify all' }}
        </button>
      </header>

      <section class="toolbar" aria-label="Report controls">
        <label class="search-box">
          <mat-icon>search</mat-icon>
          <input [(ngModel)]="searchText" type="search" placeholder="Search user name" aria-label="Search user name">
        </label>
        <button mat-stroked-button type="button" (click)="toggleSort()">
          <mat-icon>{{ sortDescending ? 'south' : 'north' }}</mat-icon>
          Oldest ticket {{ sortDescending ? 'first' : 'last' }}
        </button>
        <button mat-stroked-button type="button" (click)="exportExcel()" [disabled]="!filteredReports.length">
          <mat-icon>download</mat-icon> Export Excel
        </button>
        <button mat-stroked-button type="button" (click)="exportCsv()" [disabled]="!filteredReports.length">
          <mat-icon>table_view</mat-icon> Export CSV
        </button>
      </section>

      <div class="state-panel" *ngIf="loading" role="status">
        <mat-spinner diameter="34"></mat-spinner><span>Loading ageing report</span>
      </div>
      <div class="state-panel error" *ngIf="!loading && errorMessage" role="alert">
        <mat-icon>error_outline</mat-icon><span>{{ errorMessage }}</span>
        <button mat-button type="button" (click)="loadReports()">Retry</button>
      </div>
      <div class="state-panel" *ngIf="!loading && !errorMessage && !filteredReports.length">
        <mat-icon>task_alt</mat-icon><span>{{ reports.length ? 'No users match this search' : 'No defaulters' }}</span>
      </div>

      <section class="report-table" *ngIf="!loading && !errorMessage && filteredReports.length">
        <div class="table-head"><span>Defaulter</span><span>Open tickets</span><span>Oldest age</span><span>Follow-up</span></div>
        <article class="user-entry" *ngFor="let user of filteredReports; trackBy: trackByUser">
          <div class="user-row" [class.expanded]="expandedUserId === user.userId">
            <button class="expand-button" type="button" (click)="toggleExpanded(user.userId)" [attr.aria-expanded]="expandedUserId === user.userId">
              <mat-icon>{{ expandedUserId === user.userId ? 'expand_less' : 'expand_more' }}</mat-icon>
              <span class="user-name">{{ user.userName }}</span>
            </button>
            <span class="ticket-count">{{ user.openCount }}</span>
            <span class="age-pill" [class.age-warn]="user.oldestDays > 7 && user.oldestDays <= 15" [class.age-critical]="user.oldestDays > 15">
              {{ user.oldestDays }} days
            </span>
            <div class="followup-cell">
              <span class="notified" *ngIf="wasNotifiedToday(user.userId)">Notified today</span>
              <button mat-stroked-button type="button" (click)="sendFollowUp(user)" [disabled]="!user.email || sendingUserId === user.userId || notifyingAll" [attr.title]="user.email ? 'Send follow-up email' : 'No email address available'">
                <mat-spinner *ngIf="sendingUserId === user.userId" diameter="16"></mat-spinner>
                <mat-icon *ngIf="sendingUserId !== user.userId">mail</mat-icon>
                Send follow-up
              </button>
            </div>
          </div>
          <div class="ticket-details" *ngIf="expandedUserId === user.userId">
            <div class="ticket-head"><span>Ticket</span><span>Title</span><span>Created</span><span>Days open</span></div>
            <div class="ticket-row" *ngFor="let ticket of user.tickets">
              <a [routerLink]="ticketRoute(ticket.id)">#{{ ticket.id }}</a>
              <span class="ticket-title">{{ ticket.title }}</span>
              <time [attr.datetime]="ticket.createdAt">{{ ticket.createdAt | date:'mediumDate' }}</time>
              <span>{{ ticket.daysOpen }}</span>
            </div>
            <p class="no-tickets" *ngIf="!user.tickets.length">No open tickets listed.</p>
          </div>
        </article>
      </section>
    </main>
  `,
  styles: [`
    :host { display: block; color: #172b3a; }
    .ageing-page { max-width: 1280px; margin: 0 auto; padding: 8px 4px 32px; }
    .page-heading { display: flex; align-items: center; justify-content: space-between; gap: 18px; margin: 8px 0 24px; }
    .eyebrow { color: #087e8b; font-size: .72rem; font-weight: 800; margin: 0 0 5px; }
    h1 { font-size: 1.8rem; line-height: 1.2; margin: 0; font-weight: 750; }
    .subtitle { color: #667682; margin: 5px 0 0; }
    .toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-bottom: 16px; }
    .search-box { flex: 1 1 250px; display: flex; align-items: center; min-height: 42px; gap: 8px; padding: 0 12px; border: 1px solid #cbd5db; border-radius: 5px; background: #fff; }
    .search-box mat-icon { color: #71828c; }
    .search-box input { border: 0; outline: 0; background: transparent; min-width: 0; width: 100%; font: inherit; }
    button mat-icon { margin-right: 5px; }
    .state-panel { display: flex; align-items: center; justify-content: center; gap: 12px; min-height: 150px; color: #62717b; border: 1px dashed #bac8ce; background: #f8fbfb; }
    .state-panel.error { color: #a32b2b; border-color: #d7a2a2; }
    .report-table { border-top: 1px solid #c9d4d9; }
    .table-head, .user-row { display: grid; grid-template-columns: minmax(180px, 1.5fr) minmax(100px, .65fr) minmax(130px, .8fr) minmax(200px, 1.3fr); align-items: center; gap: 12px; }
    .table-head { padding: 10px 14px; background: #edf3f4; color: #51636d; font-size: .75rem; text-transform: uppercase; font-weight: 750; }
    .user-entry { border-bottom: 1px solid #dbe2e5; }
    .user-row { padding: 11px 14px; min-height: 62px; }
    .user-row.expanded { background: #f8fbfb; }
    .expand-button { display: flex; align-items: center; gap: 5px; padding: 0; border: 0; background: none; color: inherit; text-align: left; cursor: pointer; min-width: 0; }
    .user-name { font-weight: 700; overflow-wrap: anywhere; }
    .ticket-count { font-variant-numeric: tabular-nums; }
    .age-pill { justify-self: start; color: #47606a; background: #e9f0f1; border-radius: 3px; padding: 5px 8px; font-weight: 700; white-space: nowrap; }
    .age-pill.age-warn { color: #885400; background: #fff1cd; }
    .age-pill.age-critical { color: #9d2929; background: #fde2df; }
    .followup-cell { display: flex; align-items: center; gap: 8px; }
    .followup-cell button { white-space: nowrap; }
    .notified { color: #16734b; font-size: .75rem; white-space: nowrap; }
    .ticket-details { padding: 0 14px 14px 42px; background: #f8fbfb; }
    .ticket-head, .ticket-row { display: grid; grid-template-columns: 100px minmax(160px, 1fr) minmax(125px, .6fr) minmax(90px, .45fr); gap: 12px; align-items: center; }
    .ticket-head { padding: 8px 10px; color: #667781; font-size: .74rem; font-weight: 700; border-bottom: 1px solid #dce5e7; }
    .ticket-row { padding: 10px; border-bottom: 1px solid #e2e9eb; }
    .ticket-row a { color: #087e8b; font-weight: 700; }
    .ticket-title { overflow-wrap: anywhere; }
    .no-tickets { color: #687984; padding: 8px; }
    @media (max-width: 720px) {
      .page-heading { align-items: flex-start; }
      .toolbar > button { flex: 1 1 42%; }
      .table-head { display: none; }
      .user-row { grid-template-columns: minmax(0, 1fr) auto; gap: 8px 12px; padding: 12px 8px; }
      .expand-button { grid-column: 1; }
      .ticket-count { grid-column: 2; grid-row: 1; text-align: right; }
      .age-pill { grid-column: 1; }
      .followup-cell { grid-column: 2; grid-row: 2; justify-content: flex-end; flex-wrap: wrap; }
      .ticket-details { padding: 0 8px 12px; }
      .ticket-head { display: none; }
      .ticket-row { grid-template-columns: 72px minmax(0, 1fr); gap: 5px 10px; padding: 10px 4px; }
      .ticket-row time, .ticket-row > span:last-child { color: #60717a; font-size: .84rem; }
    }
    @media (max-width: 420px) {
      .ageing-page { padding-left: 0; padding-right: 0; }
      .page-heading { align-items: flex-start; flex-direction: column; }
      .toolbar > button { flex-basis: 100%; }
      .followup-cell { gap: 4px; }
      .notified { width: 100%; text-align: right; }
    }
  `]
})
export class CimsAgeingReportComponent implements OnInit {
  reports: AgeingReport[] = [];
  loading = false;
  errorMessage = '';
  searchText = '';
  sortDescending = true;
  expandedUserId: number | null = null;
  sendingUserId: number | null = null;
  notifyingAll = false;
  lastNotifiedAt: Record<number, string> = {};
  private readonly userRole: string;

  constructor(
    private cimsService: CimsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.userRole = (sessionStorage.getItem('role') || '').toUpperCase();
  }

  ngOnInit(): void {
    this.loadReports();
  }

  get filteredReports(): AgeingReport[] {
    const query = this.searchText.trim().toLowerCase();
    return this.reports
      .filter((report) => !query || report.userName.toLowerCase().includes(query))
      .sort((a, b) => this.sortDescending ? b.oldestDays - a.oldestDays : a.oldestDays - b.oldestDays);
  }

  loadReports(): void {
    const userIdParam = this.route.snapshot.queryParamMap.get('userId');
    const userId = userIdParam ? Number(userIdParam) : 0;
    this.loading = true;
    this.errorMessage = '';
    const request: Observable<AgeingReport[]> = userId > 0
      ? this.cimsService.getAgeingReportByUser(userId).pipe(map((report) => [report]))
      : this.cimsService.getAgeingReports();
    request.subscribe({
      next: (response) => {
        this.reports = response;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'The ageing report could not be loaded.';
      }
    });
  }

  toggleExpanded(userId: number): void {
    this.expandedUserId = this.expandedUserId === userId ? null : userId;
  }

  toggleSort(): void {
    this.sortDescending = !this.sortDescending;
  }

  ticketRoute(ticketId: number): string {
    const roleRoutes: Record<string, string> = {
      ADMIN: '/cims/admin/tickets',
      REVIEWER: '/cims/reviewer/tickets',
      COORDINATOR: '/cims/coordinator/tickets'
    };
    return `${roleRoutes[this.userRole] || '/cims/admin/tickets'}/${ticketId}`;
  }

  trackByUser(_index: number, report: AgeingReport): number {
    return report.userId;
  }

  wasNotifiedToday(userId: number): boolean {
    const notifiedAt = this.lastNotifiedAt[userId];
    return !!notifiedAt && new Date(notifiedAt).toDateString() === new Date().toDateString();
  }

  async sendFollowUp(user: AgeingReport): Promise<void> {
    const confirmed = await this.confirm(
      'Send follow-up?',
      `Send an ageing follow-up to ${user.userName} at ${user.email}?`,
      'Send email'
    );
    if (!confirmed) return;
    this.sendingUserId = user.userId;
    try {
      await this.cimsService.sendFollowUp(user);
      this.lastNotifiedAt[user.userId] = new Date().toISOString();
      this.snackBar.open(`Follow-up sent to ${user.userName}.`, 'Dismiss', { duration: 3500 });
    } catch (error) {
      this.snackBar.open(this.emailError(error), 'Dismiss', { duration: 5000 });
    } finally {
      this.sendingUserId = null;
    }
  }

  async notifyAll(): Promise<void> {
    const confirmed = await this.confirm(
      'Notify all defaulters?',
      'Follow-up emails will be sent sequentially to users with an email address.',
      'Start sending'
    );
    if (!confirmed) return;
    this.notifyingAll = true;
    let sent = 0;
    let failed = 0;
    let skipped = 0;
    for (let index = 0; index < this.reports.length; index++) {
      const user = this.reports[index];
      if (!user.email) {
        skipped++;
      } else {
        try {
          await this.cimsService.sendFollowUp(user);
          this.lastNotifiedAt[user.userId] = new Date().toISOString();
          sent++;
        } catch {
          failed++;
        }
      }
      if (index < this.reports.length - 1) await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    this.notifyingAll = false;
    this.snackBar.open(`Follow-ups complete: ${sent} sent, ${failed} failed, ${skipped} skipped.`, 'Dismiss', { duration: 6000 });
  }

  exportExcel(): void {
    const rows = this.exportRows();
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(rows), 'Ageing report');
    XLSX.writeFile(workbook, 'cims-ageing-report.xlsx');
  }

  exportCsv(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.exportRows());
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'cims-ageing-report.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  }

  private exportRows(): Record<string, string | number>[] {
    return this.filteredReports.flatMap((user) => user.tickets.map((ticket) => ({
      'User name': user.userName,
      Email: user.email || '',
      'Open ticket count': user.openCount,
      'Oldest ticket age (days)': user.oldestDays,
      'Ticket ID': ticket.id,
      Title: ticket.title,
      'Created date': ticket.createdAt,
      'Days open': ticket.daysOpen
    })));
  }

  private confirm(title: string, message: string, confirmLabel: string): Promise<boolean> {
    return this.dialog.open(CimsAgeingConfirmDialogComponent, {
      width: 'min(440px, calc(100vw - 32px))',
      data: { title, message, confirmLabel }
    }).afterClosed().toPromise().then(Boolean);
  }

  private emailError(error: unknown): string {
    return error instanceof Error ? error.message : 'Follow-up email could not be sent.';
  }
}