import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { OfflineService } from '../../services/offline.service';
import { ActionQueueService } from '../../services/action-queue.service';
import { Ticket } from '../../models/ticket';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OfflineBannerComponent } from 'src/app/components/offline-banner.component';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule, OfflineBannerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './ticket-detail.page.html',
  styleUrls: ['./ticket-detail.page.scss']
})
export class TicketDetailPage {
  ticket?: Ticket;
  loading = true;
  ackForm = new FormGroup({ notes: new FormControl('', Validators.required) });
  reviewers: { id: number; name: string }[] = [];
  showReviewerPicker = false;
  selectedReviewerId?: number;
  isOnline$ = this.offlineService.isOnline$;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private offlineService: OfflineService,
    private actionQueue: ActionQueueService,
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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) return;
    this.ticketService.getTicket(id).subscribe({ next: t => { this.ticket = t; this.loading = false; } , error: ()=> this.loading = false});
  }

  acknowledge() {
    if (this.ackForm.invalid || !this.ticket) return;
    const notes = this.ackForm.value.notes || '';
    this.ticketService.acknowledge(this.ticket.id, notes).subscribe({
      next: () => {
        void this.actionQueue.addAckTicket(this.ticket!.id, notes);
        this.showReviewerPicker = true;
        // load reviewers
        this.ticketService.getReviewers().subscribe(list => (this.reviewers = list));
      },
      error: () => {
        void this.actionQueue.addAckTicket(this.ticket!.id, notes);
        this.showReviewerPicker = true;
      }
    });
  }

  assignReviewer() {
    if (!this.ticket || !this.selectedReviewerId) return;
    this.ticketService.assignReviewer(this.ticket.id, this.selectedReviewerId).subscribe({
      next: () => {
        void this.actionQueue.addAssignReviewer(this.ticket!.id, this.selectedReviewerId!);
        if (this.ticket) {
          this.ticketService.getTicket(this.ticket.id).subscribe(t => this.ticket = t);
        }
        this.showReviewerPicker = false;
      },
      error: () => {
        void this.actionQueue.addAssignReviewer(this.ticket!.id, this.selectedReviewerId!);
        this.showReviewerPicker = false;
      }
    });
  }
}
