import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonIcon,
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

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    OfflineBannerComponent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonButton,
    IonIcon,
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
  loading = true;
  loadingError: string | null = null;
  isSubmittingAck = false;
  isSubmittingReviewer = false;
  ackForm = new FormGroup({ notes: new FormControl('', Validators.required) });
  reviewers: { id: number; name: string }[] = [];
  showReviewerPicker = false;
  selectedReviewerId?: number;
  isOnline$ = this.offlineService.isOnline$;
  
  private readonly destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
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
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
    const ticketId = this.ticket.id;
    console.log('[TicketDetailPage] Acknowledging ticket:', { ticketId, notes });

    const isOnline = await this.offlineService.isOnline();
    if (!isOnline) {
      console.log('[TicketDetailPage] App is offline. Queuing acknowledgement.');
      void this.actionQueue.addAckTicket(ticketId, notes);
      this.showReviewerPicker = true; // Optimistically move to next UI state
      this.isSubmittingAck = false;
      this.loadReviewers(); // Also optimistically load reviewers, might fail if offline
      return;
    }
    
    this.ticketService.acknowledge(ticketId, notes)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log('[TicketDetailPage] Acknowledgement submitted successfully ONLINE.');
          this.showReviewerPicker = true;
          this.isSubmittingAck = false;
          this.loadReviewers();
        },
        error: (error) => {
          console.error('[TicketDetailPage] Failed to acknowledge ticket online. Queuing action.');
          void this.actionQueue.addAckTicket(ticketId, notes);
          this.showReviewerPicker = true; // Still move to next UI state optimistically
          this.isSubmittingAck = false;
          this.loadReviewers(); // Also optimistically load reviewers
        }
      });
  }

  async assignReviewer() {
    if (!this.ticket || !this.selectedReviewerId) {
      console.warn('[TicketDetailPage] No ticket or reviewer selected');
      return;
    }
    
    this.isSubmittingReviewer = true;
    const ticketId = this.ticket.id;
    const reviewerId = this.selectedReviewerId;
    console.log('[TicketDetailPage] Assigning reviewer:', { ticketId, reviewerId });

    const isOnline = await this.offlineService.isOnline();
    if (!isOnline) {
      console.log('[TicketDetailPage] App is offline. Queuing reviewer assignment.');
      void this.actionQueue.addAssignReviewer(ticketId, reviewerId);
      this.showReviewerPicker = false; // Optimistically update UI
      this.isSubmittingReviewer = false;
      this.refreshTicket(ticketId); // Optimistically refresh ticket state
      return;
    }
    
    this.ticketService.assignReviewer(ticketId, reviewerId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log('[TicketDetailPage] Reviewer assigned successfully ONLINE.');
          this.isSubmittingReviewer = false;
          this.showReviewerPicker = false;
          this.refreshTicket(ticketId);
        },
        error: (error) => {
          console.error('[TicketDetailPage] Failed to assign reviewer online. Queuing action.');
          void this.actionQueue.addAssignReviewer(ticketId, reviewerId);
          this.isSubmittingReviewer = false;
          this.showReviewerPicker = false;
          this.refreshTicket(ticketId); // Optimistically refresh
        }
      });
  }

  private loadReviewers() {
    this.ticketService.getReviewers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (list) => {
          console.log('[TicketDetailPage] Reviewers loaded:', list.length);
          this.reviewers = list;
        },
        error: (error) => {
          console.error('[TicketDetailPage] Failed to load reviewers:', error);
          this.reviewers = [];
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
