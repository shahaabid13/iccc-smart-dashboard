import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
  IonContent, IonRefresher, IonRefresherContent, IonList, IonItem, IonAvatar,
  IonLabel, IonSkeletonText, IonBadge, IonCard, IonCardContent,
  ActionSheetController
} from '@ionic/angular/standalone';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';
import { Ticket } from '../../models/ticket';
import { OfflineBannerComponent } from 'src/app/components/offline-banner.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    CommonModule, OfflineBannerComponent,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
    IonContent, IonRefresher, IonRefresherContent, IonList, IonItem, IonAvatar,
    IonLabel, IonSkeletonText, IonBadge, IonCard, IonCardContent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss']
})
export class TicketsPage implements OnInit, OnDestroy {
  tickets: Ticket[] = [];
  loading = false;
  private isLoadingInProgress = false;

  /** Emits on destroy to cancel any in-flight request. */
  private readonly destroy$ = new Subject<void>();

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthService
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    console.log('[TicketsPage] ngOnInit called');
    this.load();
  }

  ionViewWillEnter() {
    console.log('[TicketsPage] ionViewWillEnter called');
    // Also load here for Ionic page caching - only load if not already loaded recently
    if (!this.tickets || this.tickets.length === 0) {
      this.load();
    }
  }

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

  load(event?: any) {
    // Prevent simultaneous duplicate requests
    if (this.isLoadingInProgress) {
      console.log('[TicketsPage] Load already in progress, skipping duplicate request');
      if (event) event.target.complete();
      return;
    }

    console.log('[TicketsPage] Starting load()');
    this.isLoadingInProgress = true;
    this.loading = true;
    this.ticketService.getMyQueue()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: data => {
          console.log('[TicketsPage] Received data:', data);
          console.log('[TicketsPage] Data length:', data?.length);
          this.tickets = data;
          this.loading = false;
          this.isLoadingInProgress = false;
          if (event) event.target.complete();
        },
        error: (error) => {
          console.error('[TicketsPage] Failed to load tickets:', error);
          this.loading = false;
          this.isLoadingInProgress = false;
          if (event) event.target.complete();
        }
      });
  }

  open(ticket: Ticket) {
    void this.router.navigate([`/tickets/${ticket.id}`]);
  }

  colorForPriority(p: string) {
    switch (p) {
      case 'CRITICAL': return 'danger';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'tertiary';
      default: return 'success';
    }
  }
}
