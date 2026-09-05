import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonBadge,
  IonSkeletonText,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  ActionSheetController
} from '@ionic/angular/standalone';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';
import { OfflineService } from '../../services/offline.service';
import { ActionQueueService } from '../../services/action-queue.service';
import { Ticket } from '../../models/ticket';
import { OfflineBannerComponent } from 'src/app/components/offline-banner.component';
import { AppHeaderComponent } from 'src/app/components/app-header.component';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    OfflineBannerComponent,
    AppHeaderComponent,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonBadge,
    IonSkeletonText,
    IonTextarea,
    IonSelect,
    IonSelectOption
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './ticket-detail.page.html',
  styleUrls: ['./ticket-detail.page.scss']
})
export class TicketDetailPage implements OnInit, OnDestroy {
  ticket?: Ticket;
  reviewers: Array<{ id: number; name: string }> = [];
  loading = true;
  loadingError: string | null = null;
  isSubmittingAck = false;
  ackForm = new FormGroup({
    notes: new FormControl('', Validators.required),
    reviewerId: new FormControl<number | null>(null)
  });
  isOnline$ = this.offlineService.isOnline$;
  
  private readonly destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private offlineService: OfflineService,
    private actionQueue: ActionQueueService,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log('[TicketDetailPage] ngOnInit called');
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);
    console.log(`[TicketDetailPage] Fetching ticket ID: ${id}`);

    if (isNaN(id)) {
      console.error('[TicketDetailPage] Invalid ticket ID:', idParam);
      this.loadingError = 'Invalid ticket ID';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.loadingError = null;

    this.ticketService.getTicketById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          console.log('[TicketDetailPage] Received data:', data);
          this.ticket = data;
          this.loading = false;
          this.loadingError = null;
        },
        error: (error) => {
          console.error('[TicketDetailPage] Failed to load ticket:', error);
          this.loading = false;
          this.loadingError = `Failed to load ticket: ${error?.status ? `(${error.status})` : error?.message || 'Unknown error'}`;
        }
      });

    this.ticketService.getReviewers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: reviewers => {
          this.reviewers = (reviewers || []).map((reviewer: any) => ({
            id: reviewer.id,
            name: reviewer.name || reviewer.username || reviewer.fullName || `Reviewer ${reviewer.id}`
          }));
        },
        error: () => this.reviewers = []
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  normalizeTicketStatus(status?: string): string {
    switch (status) {
      case 'COORDINATOR_REVIEW':
      case 'COORDINATOR_REVIEWED':
      case 'PENDING_COORDINATOR_REVIEW':
      case 'REVIEWER_REVIEW':
      case 'ASSIGNED_TO_REVIEWER':
        return 'Awaiting reviewer';
      case 'REOPENED':
        return 'Reopened';
      default:
        return status || 'OPEN';
    }
  }

  statusColor(status?: string): string {
    switch (status) {
      case 'OPEN':
        return 'primary';
      case 'ASSIGNED_TO_REVIEWER':
      case 'COORDINATOR_REVIEW':
      case 'REVIEWER_REVIEW':
        return 'warning';
      case 'RESOLVED':
        return 'success';
      case 'REJECTED':
        return 'danger';
      default:
        return 'medium';
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

  async acknowledge() {
    if (this.ackForm.invalid || !this.ticket) {
      console.warn('[TicketDetailPage] Acknowledge form invalid or no ticket');
      return;
    }

    this.isSubmittingAck = true;
    const notes = this.ackForm.value.notes || '';
    const reviewerId = this.ackForm.value.reviewerId ?? null;
    const ticketId = this.ticket.id;
    console.log('[TicketDetailPage] Acknowledging ticket:', { ticketId, notes, reviewerId });

    const isOnline = await this.offlineService.isOnline();
    if (!isOnline) {
      console.log('[TicketDetailPage] App is offline. Queuing acknowledgement.');
      void this.actionQueue.addAckTicket(ticketId, notes);
      if (reviewerId) {
        void this.actionQueue.addAssignReviewer(ticketId, reviewerId);
      }
      this.isSubmittingAck = false;
      void this.router.navigate(['/tickets']);
      return;
    }

    this.ticketService.acknowledge(ticketId, notes)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          if (reviewerId) {
            this.ticketService.assignReviewer(ticketId, reviewerId)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: () => {
                  console.log('[TicketDetailPage] Reviewer assigned successfully.');
                  this.isSubmittingAck = false;
                  void this.router.navigate(['/tickets']);
                },
                error: (error) => {
                  console.error('[TicketDetailPage] Failed to assign reviewer after acknowledgement:', error);
                  this.isSubmittingAck = false;
                  void this.router.navigate(['/tickets']);
                }
              });
            return;
          }

          console.log('[TicketDetailPage] Acknowledgement submitted successfully ONLINE.');
          this.isSubmittingAck = false;
          void this.router.navigate(['/tickets']);
        },
        error: (error) => {
          console.error('[TicketDetailPage] Failed to acknowledge ticket online. Queuing action.');
          void this.actionQueue.addAckTicket(ticketId, notes);
          if (reviewerId) {
            void this.actionQueue.addAssignReviewer(ticketId, reviewerId);
          }
          this.isSubmittingAck = false;
          void this.router.navigate(['/tickets']);
        }
      });
  }

  private refreshTicket(id: number) {
    this.ticketService.getTicketById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (t) => {
          console.log('[TicketDetailPage] Ticket refreshed');
          this.ticket = t;
        },
        error: (error) => {
          console.error('[TicketDetailPage] Failed to refresh ticket:', error);
        }
      });
  }
}
