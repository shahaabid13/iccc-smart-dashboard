import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { OfflineService } from '../../services/offline.service';
import { ActionQueueService } from '../../services/action-queue.service';
import { Task } from '../../models/task';
import { OfflineBannerComponent } from 'src/app/components/offline-banner.component';


@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, OfflineBannerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss']
})
export class TaskDetailPage {
  task?: Task;
  loading = true;
  actionForm = new FormGroup({
    status: new FormControl<'RESOLVED' | 'HOLD' | 'REJECTED' | undefined>(undefined, Validators.required),
    summary: new FormControl('', Validators.required)
  });
  isOnline$ = this.offlineService.isOnline$;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private offlineService: OfflineService,
    private actionQueue: ActionQueueService
    ,
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
    if (isNaN(id)) {
      this.loading = false;
      return;
    }
    this.taskService.getTask(id).subscribe({
      next: task => {
        this.task = task;
        this.loading = false;
        this.setActionOptions();
      },
      error: () => {
        this.loading = false;
      }
    });
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
    if (this.actionForm.invalid || !this.task) {
      return;
    }
    const status = this.actionForm.value.status as 'RESOLVED' | 'HOLD' | 'REJECTED';
    const summary = this.actionForm.value.summary || '';
    this.taskService.action(this.task.id, status, summary).subscribe({
      next: () => {
        void this.actionQueue.addTaskAction(this.task!.id, status, summary);
        if (this.task) {
          this.taskService.getTask(this.task.id).subscribe(task => {
            this.task = task;
            this.setActionOptions();
          });
        }
      },
      error: () => {
        void this.actionQueue.addTaskAction(this.task!.id, status, summary);
      }
    });
  }
}
