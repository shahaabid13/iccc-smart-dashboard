import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AttachmentService } from '../../services/attachment.service';
import { ImageAttachmentPickerComponent } from '../shared/image-attachment-picker.component';
import { ConversationService } from '../../services/conversation.service';
import { ConversationUserPickerComponent } from '../shared/conversation-user-picker.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSnackBarModule, ImageAttachmentPickerComponent, ConversationUserPickerComponent],
  selector: 'app-tasks-create',
  template: `
    <div class="container">
      <h3>Create Task</h3>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <div class="mb-3">
          <label class="form-label">Assign To</label>
          <select class="form-select" formControlName="assignedToId">
            <option [ngValue]="null">Unassigned</option>
            <option *ngFor="let u of users" [ngValue]="u.id">{{u.name || u.username}}</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Title</label>
          <input class="form-control" formControlName="title" />
        </div>

        <div class="mb-3">
          <label class="form-label">Description</label>
          <textarea class="form-control" rows="6" formControlName="description"></textarea>
        </div>

        <div class="mb-3">
          <app-conversation-user-picker label="Tag people (optional)" (selectedIdsChange)="tagUserIds = $event"></app-conversation-user-picker>
        </div>
        <div class="mb-3">
          <label class="form-label" for="task-first-message">Start the conversation (optional)</label>
          <textarea id="task-first-message" class="form-control" rows="3" maxlength="2000"
            [(ngModel)]="initialComment" [ngModelOptions]="{standalone:true}"
            placeholder="Write the first conversation message"></textarea>
          <div class="form-text">{{ initialComment.length }}/2000</div>
        </div>

        <app-image-attachment-picker #imagePicker></app-image-attachment-picker>

        <button class="btn btn-primary" [disabled]="form.invalid || submitting">{{ submitting ? 'Submitting...' : 'Submit' }}</button>
      </form>
    </div>
  `
})
export class TasksCreateComponent implements OnInit {
  @ViewChild('imagePicker') imagePicker?: ImageAttachmentPickerComponent;
  form!: FormGroup;
  users: any[] = [];
  submitting = false;
  tagUserIds: number[] = [];
  initialComment = '';

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private attachmentService: AttachmentService,
    private snackBar: MatSnackBar,
    private conversationService: ConversationService
  ) {
    this.form = this.fb.group({
      assignedToId: [null],
      title: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.taskService.getAssignableUsers().subscribe(u => this.users = u || []);
  }

  submit() {
    if (this.form.invalid || this.submitting) return;
    this.submitting = true;
    const rawValue = this.form.value;
    const payload = {
      title: rawValue.title ?? '',
      description: rawValue.description ?? '',
       assignedToUserId: rawValue.assignedToId ?? undefined
    };
    const files = this.imagePicker?.getPendingFiles() ?? [];
    this.taskService.createTask(payload).subscribe({
      next: (task) => {
        const finishCreation = () => {
          if (!files.length) {
            this.submitting = false;
            this.router.navigate(['/tasks/all']);
            return;
          }
          this.attachmentService.uploadAttachments(files, 'TASK', task.id).subscribe({
            next: result => {
              if (result.failed) {
                this.snackBar.open(`Task created, but ${result.failed} of ${files.length} screenshots failed to upload`, 'Close', { duration: 7000 });
              }
              this.submitting = false;
              this.router.navigate(['/tasks/all']);
            },
            error: () => {
              this.submitting = false;
              this.snackBar.open('Task created, but screenshots could not be uploaded.', 'Close', { duration: 7000 });
            }
          });
        };
        const postStarterMessage = () => {
          const starter = this.initialComment.trim();
          if (!starter) {
            finishCreation();
            return;
          }
          this.conversationService.postComment('TASK', task.id, starter).subscribe({
            next: response => {
              if (response.ignoredMentions?.length) {
                this.snackBar.open(`Task created, but these mentions were not resolved: ${response.ignoredMentions.join(', ')}`, 'Close', { duration: 7000 });
              }
              finishCreation();
            },
            error: error => {
              this.snackBar.open(
                error?.error?.message || 'Task created, but the first conversation message could not be sent.',
                'Close',
                { duration: 7000 }
              );
              finishCreation();
            }
          });
        };
        if (this.tagUserIds.length) {
          this.conversationService.addParticipants('TASK', task.id, this.tagUserIds).subscribe({
            next: postStarterMessage,
            error: error => {
              this.snackBar.open(error?.error?.message || 'Task created, but the selected people could not be tagged.', 'Close', { duration: 7000 });
              postStarterMessage();
            }
          });
          return;
        }
        postStarterMessage();
      },
      error: (error) => {
        this.submitting = false;
        this.snackBar.open(error?.error?.message || 'Failed to create task.', 'Close', { duration: 6000 });
      }
    });
  }
}
