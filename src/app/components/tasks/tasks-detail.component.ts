import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/cims.models';
import { AttachmentService } from '../../services/attachment.service';
import { ImageAttachmentPickerComponent } from '../shared/image-attachment-picker.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ImageAttachmentPickerComponent],
  selector: 'app-tasks-detail',
  template: `
    <div class="container">
      <div class="mb-3">
        <button type="button" class="btn btn-sm btn-outline-secondary" (click)="goBack()">
          &larr; Back
        </button>
      </div>

      <div *ngIf="!task">Loading...</div>

      <div *ngIf="task">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <h4>{{ task.title }}</h4>
          <span class="badge" [ngClass]="statusBadgeClass(task.status)">{{ task.status }}</span>
        </div>

        <div class="card p-3 mb-3">
          <div class="row mb-2">
            <div class="col-md-6">
              <strong>Assigned To:</strong>
              {{ task.assignedToFullName || task.assignedToUsername || 'Unassigned' }}
            </div>
            <div class="col-md-6">
              <strong>Assigned By:</strong>
              {{ task.assignedByFullName || task.assignedByUsername || '—' }}
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-md-6">
              <strong>Created:</strong> {{ task.createdAt | date:'medium' }}
            </div>
            <div class="col-md-6">
              <strong>Closed:</strong>
              {{ task.actionTakenAt ? (task.actionTakenAt | date:'medium') : '—' }}
            </div>
          </div>
          <div class="mb-2" *ngIf="task.actionSummary">
            <strong>Resolution Notes:</strong> {{ task.actionSummary }}
          </div>
          <hr>
          <div>
            <strong>Description</strong>
            <div class="mt-1" [innerHTML]="task.description"></div>
            <app-image-attachment-picker [allowSelection]="false" [attachments]="taskAttachments"></app-image-attachment-picker>
          </div>
        </div>

        <div class="card p-3 mb-3" *ngIf="task.history?.length">
          <strong class="mb-2 d-block">History</strong>
          <ul class="list-unstyled mb-0">
            <li *ngFor="let h of task.history" class="mb-2 pb-2 border-bottom">
              <div><strong>{{ h.action }}</strong> — {{ h.changedAt | date:'medium' }}</div>
              <div class="text-muted" *ngIf="h.summary">{{ h.summary }}</div>
              <div class="text-muted">by {{ h.changedBy }}</div>
              <app-image-attachment-picker [allowSelection]="false" [attachments]="historyAttachments[h.id] || []"></app-image-attachment-picker>
            </li>
          </ul>
        </div>

        <div class="card p-3" *ngIf="canTakeAction()">
          <h5>Take Action</h5>
          <form [formGroup]="form" (ngSubmit)="submit()">
            <div class="mb-3">
              <label class="form-label">Action</label>
              <select class="form-select" formControlName="action">
                <option value="RESOLVED">Resolved</option>
                <option value="HOLD" *ngIf="task.status === 'OPEN'">Hold</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Summary / Notes</label>
              <textarea class="form-control" rows="4" formControlName="summary"></textarea>
            </div>

            <app-image-attachment-picker #imagePicker></app-image-attachment-picker>

            <div class="text-danger mb-2" *ngIf="errorMsg">{{ errorMsg }}</div>

            <div class="d-flex justify-content-end">
              <button class="btn btn-primary" [disabled]="form.invalid || submitting">
                {{ submitting ? 'Submitting...' : 'Submit' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class TasksDetailComponent implements OnInit {
  @ViewChild('imagePicker') imagePicker?: ImageAttachmentPickerComponent;
  task: Task | null = null;
  taskAttachments: import('../../services/attachment.service').AttachmentResponse[] = [];
  historyAttachments: Record<number, import('../../services/attachment.service').AttachmentResponse[]> = {};
  form!: FormGroup;
  submitting = false;
  errorMsg = '';
  private cameFromHistory = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private taskService: TaskService,
    private fb: FormBuilder,
    private attachmentService: AttachmentService
  ) {
    this.form = this.fb.group({ action: ['RESOLVED', Validators.required], summary: ['', Validators.required] });
  }

  ngOnInit(): void {
    // window.history.length > 1 means there's somewhere to go back to within the browser session
    this.cameFromHistory = typeof window !== 'undefined' && window.history.length > 1;

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadTask(id);
    }
  }

  private loadTask(id: number): void {
    this.taskService.getTaskDetail(id).subscribe((task) => {
      this.task = task;
      this.loadTaskAttachments(task);
    });
  }

  private loadTaskAttachments(task: Task): void {
    this.attachmentService.getAttachments('TASK', task.id).subscribe({
      next: (attachments) => this.taskAttachments = attachments || [],
      error: () => this.taskAttachments = []
    });
    this.historyAttachments = {};
    for (const entry of task.history || []) {
      if (!entry.id) continue;
      this.attachmentService.getAttachments('TASK_ACTION', entry.id).subscribe({
        next: (attachments) => this.historyAttachments[entry.id] = attachments || [],
        error: () => this.historyAttachments[entry.id] = []
      });
    }
  }

  goBack(): void {
    if (this.cameFromHistory) {
      this.location.back();
    } else {
      // No app history to fall back on — send to a role-neutral landing page
      this.router.navigate(['/dashboard']);
    }
  }

  canTakeAction(): boolean {
    return !!this.task && (this.task.status === 'OPEN' || this.task.status === 'HOLD');
  }

  statusBadgeClass(status: string): string {
    switch (status) {
      case 'OPEN': return 'bg-primary';
      case 'HOLD': return 'bg-warning text-dark';
      case 'RESOLVED': return 'bg-success';
      case 'REJECTED': return 'bg-danger';
      case 'CLOSED': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  }

  submit() {
    if (!this.task) return;
    this.errorMsg = '';
    this.submitting = true;
    const val = this.form.value;
    const files = this.imagePicker?.getPendingFiles() ?? [];
    this.taskService.takeAction(this.task.id, val.action, val.summary).subscribe({
      next: (response) => {
        const historyId = response.taskHistoryId || response.historyId || response.taskHistory?.id || response.history?.at(-1)?.id;
        if (files.length && historyId) {
          this.attachmentService.uploadAttachments(files, 'TASK_ACTION', historyId).subscribe((result) => {
            if (result.failed) this.errorMsg = `Action saved, but ${result.failed} of ${files.length} screenshots failed to upload.`;
            this.submitting = false;
            this.loadTask(this.task!.id);
          });
        } else {
          if (files.length) this.errorMsg = 'Action saved, but screenshots could not be uploaded because the action history ID was not returned.';
          this.submitting = false;
          this.loadTask(this.task!.id);
        }
      },
      error: (err) => {
        this.submitting = false;
        this.errorMsg = err?.error?.message || 'Failed to submit action. You may not be authorized.';
      }
    });
  }
}