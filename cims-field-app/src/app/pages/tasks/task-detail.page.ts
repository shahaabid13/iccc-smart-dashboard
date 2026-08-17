import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
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
  IonSelect,
  IonSelectOption,
  IonTextarea,
  ActionSheetController
} from '@ionic/angular/standalone';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { OfflineService } from '../../services/offline.service';
import { ActionQueueService } from '../../services/action-queue.service';
import { Task } from '../../models/task';
import { OfflineBannerComponent } from 'src/app/components/offline-banner.component';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    IonSelect,
    IonSelectOption,
    IonTextarea
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss']
})
export class TaskDetailPage implements OnInit, OnDestroy {
  task?: Task;
  loading = true;
  loadingError: string | null = null;
  isSubmitting = false;
  actionForm = new FormGroup({
    status: new FormControl<'RESOLVED' | 'HOLD' | 'REJECTED' | undefined>(undefined, Validators.required),
    summary: new FormControl('', Validators.required)
  });
  isOnline$ = this.offlineService.isOnline$;
  
  private readonly destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private offlineService: OfflineService,
    private actionQueue: ActionQueueService,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log('[TaskDetailPage] ngOnInit called');
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);
    console.log(`[TaskDetailPage] Fetching task ID: ${id}`);

    if (isNaN(id)) {
      console.error('[TaskDetailPage] Invalid task ID:', idParam);
      this.loadingError = 'Invalid task ID';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.loadingError = null;

    this.taskService.getTaskById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          console.log('[TaskDetailPage] Received data:', data);
          this.task = data;
          this.loading = false;
          this.loadingError = null;
          this.setActionOptions();
        },
        error: (error) => {
          console.error('[TaskDetailPage] Failed to load task:', error);
          this.loading = false;
          this.loadingError = `Failed to load task: ${error?.status ? `(${error.status})` : error?.message || 'Unknown error'}`;
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

  get availableActions(): Array<{ value: 'RESOLVED' | 'HOLD' | 'REJECTED'; label: string }> {
    if (!this.task) {
      return [];
    }
    const actions: Array<{ value: 'RESOLVED' | 'HOLD' | 'REJECTED'; label: string }> = [
      { value: 'RESOLVED', label: 'Resolved' },
      { value: 'REJECTED', label: 'Rejected' }
    ];
    if (this.task.status === 'OPEN') {
      actions.splice(1, 0, { value: 'HOLD', label: 'Hold' });
    }
    return actions;
  }

  setActionOptions() {
    if (!this.task) {
      return;
    }
    const options = this.availableActions;
    if (!this.actionForm.controls.status.value && options.length) {
      this.actionForm.controls.status.setValue(options[0].value);
    }
    if (this.task.status === 'HOLD' && this.actionForm.controls.status.value === 'HOLD') {
      this.actionForm.controls.status.setValue('RESOLVED');
    }
  }

  submitAction() {
    if (this.actionForm.invalid || !this.task || this.isSubmitting) {
      return;
    }
    
    this.isSubmitting = true;
    const status = this.actionForm.value.status as 'RESOLVED' | 'HOLD' | 'REJECTED';
    const summary = this.actionForm.value.summary || '';
    
    console.log('[TaskDetailPage] Submitting action:', { taskId: this.task.id, status, summary });
    
    this.taskService.action(this.task.id, status, summary)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log('[TaskDetailPage] Action submitted successfully');
          void this.actionQueue.addTaskAction(this.task!.id, status, summary);
          if (this.task) {
            this.taskService.getTaskById(this.task.id)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: task => {
                  console.log('[TaskDetailPage] Task refreshed after action');
                  this.task = task;
                  this.isSubmitting = false;
                  this.setActionOptions();
                },
                error: (error) => {
                  console.error('[TaskDetailPage] Failed to refresh task:', error);
                  this.isSubmitting = false;
                }
              });
          }
        },
        error: (error) => {
          console.error('[TaskDetailPage] Failed to submit action:', error);
          void this.actionQueue.addTaskAction(this.task!.id, status, summary);
          this.isSubmitting = false;
        }
      });
  }
}
