import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { firstValueFrom, Subscription, timeout } from 'rxjs';
import { PendingTicket } from '../models/ticket';
import { AuthService } from './auth.service';
import { TicketService } from './ticket.service';

const SHOWN_KEY = 'field-app.pending-prompt-shown';
const SNOOZE_KEY = 'field-app.pending-prompt-snooze-until';
const SNOOZE_DURATION = 30 * 60 * 1000;

@Injectable({ providedIn: 'root' })
export class PendingTicketPromptService {
  private snoozeTimer?: ReturnType<typeof setTimeout>;
  private pendingRequest?: Subscription;
  private isOpen = false;

  constructor(
    private tickets: TicketService,
    private auth: AuthService,
    private alertController: AlertController,
    private router: Router
  ) {}

  async startAfterLogin(): Promise<number | 'queue' | null> {
    if (sessionStorage.getItem(SHOWN_KEY) === 'true') return null;
    sessionStorage.setItem(SHOWN_KEY, 'true');
    const snoozeUntil = Number(sessionStorage.getItem(SNOOZE_KEY) || 0);
    if (snoozeUntil > Date.now()) {
      this.schedule(snoozeUntil - Date.now());
      return null;
    }

    if (!await this.auth.isAuthenticated() || this.isOpen) return null;
    try {
      const tickets = await firstValueFrom(this.tickets.getMyPendingTickets().pipe(timeout({ first: 8000 })));
      return tickets.length ? await this.present(tickets) : null;
    } catch {
      return null;
    }
  }

  stop(): void {
    this.pendingRequest?.unsubscribe();
    if (this.snoozeTimer) clearTimeout(this.snoozeTimer);
    this.snoozeTimer = undefined;
  }

  private loadAndPresent(): void {
    void this.auth.isAuthenticated().then(authenticated => {
      if (!authenticated || this.isOpen) return;
      this.pendingRequest = this.tickets.getMyPendingTickets().subscribe(tickets => {
        if (tickets.length) {
          void this.present(tickets).then(ticketId => {
            if (ticketId === 'queue') void this.router.navigate(['/tickets']);
            else if (ticketId !== null) void this.router.navigate(['/tickets', ticketId]);
          });
        }
      });
    });
  }

  private async present(tickets: PendingTicket[]): Promise<number | 'queue' | null> {
    this.isOpen = true;
    let selectedTicketId: number | 'queue' | null = null;
    const buttons = tickets.slice(0, 3).map(ticket => ({
      text: `Open ticket #${ticket.id}`,
      handler: () => {
        selectedTicketId = ticket.id;
      }
    }));
    if (tickets.length > 3) {
      buttons.push({
        text: 'View all tickets',
        handler: () => {
          selectedTicketId = 'queue';
        }
      });
    }
    buttons.push({
      text: 'Remind me later',
      role: 'cancel',
      handler: () => {
        this.isOpen = false;
        const snoozeUntil = Date.now() + SNOOZE_DURATION;
        sessionStorage.setItem(SNOOZE_KEY, String(snoozeUntil));
        this.schedule(SNOOZE_DURATION);
      }
    } as any);

    const alert = await this.alertController.create({
      header: `You have ${tickets.length} tickets waiting`,
      message: this.buildTicketList(tickets),
      buttons,
      backdropDismiss: true,
      cssClass: 'pending-ticket-alert'
    });
    const dismissed = alert.onDidDismiss();
    await alert.present();
    await dismissed;
    this.isOpen = false;
    return selectedTicketId;
  }

  private buildTicketList(tickets: PendingTicket[]): string {
    const escape = (text: string): string => text.replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char] || char);
    const rows = tickets.map(ticket => {
      const hours = this.pendingHours(ticket);
      const age = hours >= 24 ? `${Math.floor(hours / 24)}d ${Math.floor(hours % 24)}h` : `${Math.floor(hours)}h`;
      const title = escape(ticket.title || ticket.incidentTypeName || 'Incident ticket');
      const location = escape(ticket.locationName || 'Location not provided');
      const ageClass = hours >= 24 ? ' style="color:#c62828;font-weight:700"' : '';
      return `<div style="text-align:left;border-bottom:1px solid #ddd;padding:9px 0"><strong>#${ticket.id} · ${title}</strong><br><span>${location}</span><br><span${ageClass}>Pending ${age}</span></div>`;
    }).join('');
    return `<div aria-live="polite">${rows}</div>`;
  }

  private pendingHours(ticket: PendingTicket): number {
    const supplied = ticket.pendingHours ?? ticket.hoursPending;
    if (typeof supplied === 'number') return supplied;
    const since = ticket.pendingSince || ticket.createdAt;
    return since ? Math.max(0, (Date.now() - new Date(since).getTime()) / 3600000) : 0;
  }

  private schedule(delay: number): void {
    if (this.snoozeTimer) clearTimeout(this.snoozeTimer);
    this.snoozeTimer = setTimeout(() => {
      this.snoozeTimer = undefined;
      sessionStorage.removeItem(SNOOZE_KEY);
      this.loadAndPresent();
    }, delay);
  }
}