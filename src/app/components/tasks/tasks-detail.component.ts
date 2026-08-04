import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  selector: 'app-tasks-detail',
  template: `
    <div class="container">
      <div *ngIf="!task">Loading...</div>
      <div *ngIf="task">
        <h4>{{ task.title }}</h4>
        <div class="mb-2 text-muted">Assigned By: {{ task.assignedByName }} — Assigned To: {{ task.assignedToName || 'You' }}</div>
        <div class="mb-3 card p-3">
          <div [innerHTML]="task.description"></div>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" class="card p-3">
          <div class="mb-3">
            <label class="form-label">Action</label>
            <select class="form-select" formControlName="action">
              <option value="RESOLVED">Resolved</option>
              <option value="HOLD">Hold</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Summary / Notes</label>
            <textarea class="form-control" rows="4" formControlName="summary"></textarea>
          </div>

          <div class="d-flex justify-content-end">
            <button class="btn btn-primary" [disabled]="form.invalid">Submit</button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class TasksDetailComponent implements OnInit {
  task: any = null;
  form!: FormGroup;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private fb: FormBuilder) {
    this.form = this.fb.group({ action: ['RESOLVED', Validators.required], summary: [''] });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.taskService.getTaskDetail(id).subscribe(t => this.task = t);
    }
  }

  submit() {
    if (!this.task) return;
    const val = this.form.value;
    const action = val.action ?? 'RESOLVED';
    const summary = val.summary ?? '';
    this.taskService.takeAction(this.task.id, action, summary).subscribe(() => {
      this.taskService.getTaskDetail(this.task.id).subscribe(t => this.task = t);
    });
  }
}
