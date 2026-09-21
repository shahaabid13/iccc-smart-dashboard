import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, firstValueFrom } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';
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
  bilalReviewerId: number | null = null;
  loading = true;
  loadingError: string | null = null;
  isSubmittingAck = false;
  ackForm = new FormGroup({
    notes: new FormControl(''),
    action: new FormControl<'resolved' | 'revalidation'>('resolved')
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

    Preferences.get({ key: 'cims_default_reviewer_id' }).then(({ value }) => {
      if (value && !this.bilalReviewerId) {
        this.bilalReviewerId = Number(value);
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

          const bilal = this.reviewers.find(r => {
            const lower = (r.name || '').toLowerCase();
            return lower.includes('bilal');
          }) || (this.reviewers.length === 1 ? this.reviewers[0] : null);

          if (bilal) {
            this.bilalReviewerId = bilal.id;
            void Preferences.set({ key: 'cims_default_reviewer_id', value: String(bilal.id) });
          } else if (this.reviewers.length > 0 && !this.bilalReviewerId) {
            this.bilalReviewerId = this.reviewers[0].id;
            void Preferences.set({ key: 'cims_default_reviewer_id', value: String(this.reviewers[0].id) });
          }
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
      case 'FIELD_PERSON_REVIEW':
      case 'FIELD PERSON_REVIEW':
      case 'FIELD PERSON_REVIEWED':
      case 'PENDING_FIELD_PERSON_REVIEW':
      case 'PENDING_FIELD PERSON_REVIEW':
      case 'REVIEWER_REVIEW':
      case 'ASSIGNED_TO_REVIEWER':
        return 'Field Person Review';
      case 'REVALIDATED':
      case 'REVALIDATION':
        return 'Revalidated';
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
      case 'FIELD_PERSON_REVIEW':
      case 'FIELD PERSON_REVIEW':
      case 'REVIEWER_REVIEW':
      case 'REVALIDATED':
      case 'REVALIDATION':
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

  private async resolveActionTargetId(): Promise<number | null> {
    const action = this.ackForm.value.action ?? 'resolved';

    if (action === 'resolved') {
      let reviewerId = this.bilalReviewerId;
      if (!reviewerId && this.reviewers.length > 0) {
        const bilal = this.reviewers.find(r => (r.name || '').toLowerCase().includes('bilal')) ||
          (this.reviewers.length === 1 ? this.reviewers[0] : null);
        reviewerId = bilal?.id ?? null;
      }
      if (!reviewerId) {
        const cached = await Preferences.get({ key: 'cims_default_reviewer_id' });
        if (cached.value) {
          reviewerId = Number(cached.value);
        }
      }
      if (!reviewerId) {
        try {
          const list = await firstValueFrom(this.ticketService.getReviewers());
          const found = (list || []).find((r: any) => {
            const str = `${r.name || ''} ${r.username || ''} ${r.fullName || ''}`.toLowerCase();
            return str.includes('bilal');
          }) || (list && list.length > 0 ? list[0] : null);
          if (found) {
            reviewerId = found.id;
            this.bilalReviewerId = found.id;
            void Preferences.set({ key: 'cims_default_reviewer_id', value: String(found.id) });
          }
        } catch (e) {
          console.warn('[TicketDetailPage] Could not fetch Bilal reviewer for action routing:', e);
        }
      }
      return reviewerId;
    }

    const creatorId = this.ticket?.raisedByUserId;
    if (creatorId) {
      return Number(creatorId);
    }

    return this.bilalReviewerId;
  }

  async acknowledge() {
    if (this.isSubmittingAck || !this.ticket) {
      console.warn('[TicketDetailPage] Acknowledge skipped: already submitting or no ticket');
      return;
    }

    this.isSubmittingAck = true;
    const notes = this.ackForm.value.notes?.trim() || 'Acknowledged by field engineer';
    const ticketId = this.ticket.id;
    const selectedAction = this.ackForm.value.action ?? 'resolved';
    const targetReviewerId = await this.resolveActionTargetId();

    console.log('[TicketDetailPage] Processing ticket action:', { ticketId, selectedAction, notes, targetReviewerId });

    const isOnline = await this.offlineService.isOnline();
    if (!isOnline) {
      console.log('[TicketDetailPage] App is offline. Queuing acknowledgement.');
      void this.actionQueue.addAckTicket(ticketId, notes);
      if (targetReviewerId) {
        void this.actionQueue.addAssignReviewer(ticketId, targetReviewerId);
      }
      this.isSubmittingAck = false;
      void this.router.navigate(['/tickets']);
      return;
    }

    this.ticketService.acknowledge(ticketId, notes)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          if (targetReviewerId) {
            this.ticketService.assignReviewer(ticketId, targetReviewerId)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: () => {
                  if (selectedAction === 'revalidation') {
                    this.ticket = {
                      ...this.ticket!,
                      status: 'REVALIDATED',
                      reviewerId: targetReviewerId
                    };
                  }
                  console.log('[TicketDetailPage] Ticket forwarded successfully for action:', selectedAction);
                  this.isSubmittingAck = false;
                  void this.router.navigate(['/tickets']);
                },
                error: (error) => {
                  console.error('[TicketDetailPage] Failed to forward ticket after acknowledgement:', error);
                  void this.actionQueue.addAssignReviewer(ticketId, targetReviewerId);
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
          console.error('[TicketDetailPage] Failed to acknowledge ticket online. Queuing action.', error);
          void this.actionQueue.addAckTicket(ticketId, notes);
          if (targetReviewerId) {
            void this.actionQueue.addAssignReviewer(ticketId, targetReviewerId);
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
