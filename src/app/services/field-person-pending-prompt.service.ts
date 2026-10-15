import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { CimsService } from './cims.service';
import { PendingFieldPersonTicket } from '../models/cims.models';
import { FieldPersonPendingTicketsDialogComponent } from '../components/admin/field-person-pending-tickets-dialog.component';

const PROMPT_SHOWN_KEY = 'cims.pendingTickets.promptShown';
const SNOOZE_UNTIL_KEY = 'cims.pendingTickets.snoozeUntil';
const SNOOZE_MS = 30 * 60 * 1000;

@Injectable({ providedIn: 'root' })
export class FieldPersonPendingPromptService implements OnDestroy {
  private snoozeTimer: ReturnType<typeof setTimeout> | null = null;
  private authSubscription: Subscription;
  private dialogOpen = false;

  constructor(
    private authService: AuthService,
    private cimsService: CimsService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.authSubscription = this.authService.currentUser$.subscribe((user) => {
      if (!user) this.clearSnoozeTimer();
    });
  }

  showAfterLogin(): void {
    if ((this.authService.getRole() || '').toUpperCase() !== 'FIELD_PERSON' || !this.authService.isAuthenticated()) return;
    if (sessionStorage.getItem(PROMPT_SHOWN_KEY) === 'true') return;
    sessionStorage.setItem(PROMPT_SHOWN_KEY, 'true');

    const snoozeUntil = Number(sessionStorage.getItem(SNOOZE_UNTIL_KEY) || 0);
    if (snoozeUntil > Date.now()) {
      this.schedulePrompt(snoozeUntil - Date.now());
      return;
    }
    this.fetchAndShow();
  }

  ngOnDestroy(): void {
    this.clearSnoozeTimer();
    this.authSubscription.unsubscribe();
  }

  private fetchAndShow(): void {
    if (!this.authService.isAuthenticated() || (this.authService.getRole() || '').toUpperCase() !== 'FIELD_PERSON') return;
    this.cimsService.getMyPendingTickets().subscribe({
      next: (response: any) => {
        const tickets: PendingFieldPersonTicket[] = Array.isArray(response)
          ? response
          : response?.content ?? response?.data ?? response?.tickets ?? [];
        if (tickets.length) this.openDialog(tickets);
      },
      error: () => {}
    });
  }

  private openDialog(tickets: PendingFieldPersonTicket[]): void {
    if (this.dialogOpen || !tickets.length) return;
    this.dialogOpen = true;
    const ref = this.dialog.open(FieldPersonPendingTicketsDialogComponent, {
      width: 'min(620px, calc(100vw - 28px))',
      maxHeight: 'min(78vh, 680px)',
      autoFocus: true,
      restoreFocus: true,
      ariaLabel: `You have ${tickets.length} tickets waiting`,
      data: { tickets }
    });
    ref.afterClosed().subscribe((result?: { ticketId?: number; snooze?: boolean }) => {
      this.dialogOpen = false;
      if (result?.ticketId) {
        void this.router.navigate(['/cims/field-person/tickets', result.ticketId]);
      } else if (result?.snooze) {
        const snoozeUntil = Date.now() + SNOOZE_MS;
        sessionStorage.setItem(SNOOZE_UNTIL_KEY, String(snoozeUntil));
        this.schedulePrompt(SNOOZE_MS);
      }
    });
  }

  private schedulePrompt(delayMs: number): void {
    this.clearSnoozeTimer();
    this.snoozeTimer = setTimeout(() => {
      this.snoozeTimer = null;
      sessionStorage.removeItem(SNOOZE_UNTIL_KEY);
      this.fetchAndShow();
    }, Math.max(0, delayMs));
  }

  private clearSnoozeTimer(): void {
    if (this.snoozeTimer) clearTimeout(this.snoozeTimer);
    this.snoozeTimer = null;
  }
}