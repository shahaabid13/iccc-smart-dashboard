import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket.service';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Ticket } from '../../models/ticket';
import { Router } from '@angular/router';
import { OfflineBannerComponent } from 'src/app/components/offline-banner.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [IonicModule, CommonModule, OfflineBannerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss']
})
export class TicketsPage {
  tickets: Ticket[] = [];
  loading = false;

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthService
  ) {}

  async showProfile() {
    const username = await this.authService.getUsername();
    const header = username || 'Account';
    const actionSheet = await this.actionSheetCtrl.create({
      header,
      buttons: [
        {
          text: 'Logout',
          role: 'destructive',
          handler: async () => {
            await this.authService.logout();
          }
        },
        { text: 'Cancel', role: 'cancel' }
      ]
    });
    await actionSheet.present();
  }

  ionViewWillEnter() {
    this.load();
  }

  load(event?: any) {
    this.loading = true;
    this.ticketService.getMyQueue().subscribe({
      next: data => {
        this.tickets = data;
        this.loading = false;
        if (event) {
          event.target.complete();
        }
      },
      error: () => {
        this.loading = false;
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  open(ticket: Ticket) {
    void this.router.navigate([`/tabs/tickets/${ticket.id}`]);
  }

  colorForPriority(p: string) {
    switch (p) {
      case 'CRITICAL':
        return 'danger';
      case 'HIGH':
        return 'warning';
      case 'MEDIUM':
        return 'tertiary';
      default:
        return 'success';
    }
  }
}
