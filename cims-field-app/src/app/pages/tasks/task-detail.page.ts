import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
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
  IonSelect,
  IonSelectOption,
  IonTextarea,
  ActionSheetController
} from '@ionic/angular/standalone';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { OfflineService } from '../../services/offline.service';
import { ActionQueueService } from '../../services/action-queue.service';
import { Task, TaskHistoryEntry } from '../../models/task';
import { AttachmentResponse, AttachmentService } from '../../services/attachment.service';
import { ImageAttachmentPickerComponent } from '../../components/image-attachment-picker.component';
import { OfflineBannerComponent } from 'src/app/components/offline-banner.component';
import { AppHeaderComponent } from 'src/app/components/app-header.component';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OfflineBannerComponent,
    AppHeaderComponent,
    ImageAttachmentPickerComponent,
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
  @ViewChild('actionPicker') actionPicker?: ImageAttachmentPickerComponent;
  task?: Task;
  taskAttachments: AttachmentResponse[] = [];
  historyAttachments: Record<number, AttachmentResponse[]> = {};
  loading = true;
  loadingError: string | null = null;
  actionMessage: string | null = null;
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
    private attachmentService: AttachmentService,
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
          this.loadTaskAttachments(data);
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

  private loadTaskAttachments(task: Task): void {
    this.attachmentService.getAttachments('TASK', task.id).subscribe({
      next: attachments => this.taskAttachments = attachments || [],
      error: () => this.taskAttachments = []
    });
    this.historyAttachments = {};
    for (const entry of task.history || []) {
      this.loadHistoryAttachments(entry);
    }
  }

  private loadHistoryAttachments(entry: TaskHistoryEntry): void {
    if (!entry.id) return;
    this.attachmentService.getAttachments('TASK_ACTION', entry.id).subscribe({
      next: attachments => this.historyAttachments[entry.id] = attachments || [],
      error: () => this.historyAttachments[entry.id] = []
    });
  }

  private refreshTask(): void {
    if (!this.task) return;
    this.taskService.getTaskById(this.task.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: task => {
        this.task = task;
        this.loadTaskAttachments(task);
        this.setActionOptions();
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
    const files = this.actionPicker?.getPendingFiles() ?? [];
    this.actionMessage = null;
    
    console.log('[TaskDetailPage] Submitting action:', { taskId: this.task.id, status, summary });
    
    this.taskService.action(this.task.id, status, summary)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          console.log('[TaskDetailPage] Action submitted successfully');
          const responseHistory = response.history || [];
          const historyId = response.taskHistoryId || response.historyId || response.taskHistory?.id || responseHistory[responseHistory.length - 1]?.id;
          const uploadAndRefresh = () => {
            if (!files.length) {
              this.isSubmitting = false;
              this.refreshTask();
              return;
            }
            if (!historyId) {
              this.actionMessage = 'Action saved, but screenshots could not be attached because no history ID was returned.';
              this.isSubmitting = false;
              this.refreshTask();
              return;
            }
            this.attachmentService.uploadAttachments(files, 'TASK_ACTION', historyId).subscribe(result => {
              if (result.failed) this.actionMessage = `Action saved, but ${result.failed} of ${files.length} screenshots failed to upload.`;
              this.isSubmitting = false;
              this.refreshTask();
            });
          };
          uploadAndRefresh();
        },
        error: (error) => {
          console.error('[TaskDetailPage] Failed to submit action; queueing for retry:', error);
          void this.actionQueue.addTaskAction(this.task!.id, status, summary, files).then(() => {
            this.actionMessage = 'No connection. Action and screenshots queued to retry.';
            this.isSubmitting = false;
          }).catch(() => {
            this.actionMessage = 'Could not queue the action. Please try again.';
            this.isSubmitting = false;
          });
        }
      });
  }
}
