import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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

        <button class="btn btn-primary" [disabled]="form.invalid">Submit</button>
      </form>
    </div>
  `
})
export class TasksCreateComponent implements OnInit {
  form!: FormGroup;
  users: any[] = [];

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) {
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
    if (this.form.invalid) return;
    const rawValue = this.form.value;
    const payload = {
      title: rawValue.title ?? '',
      description: rawValue.description ?? '',
       assignedToUserId: rawValue.assignedToId ?? undefined
    };
    this.taskService.createTask(payload).subscribe(() => {
      this.router.navigate(['/tasks/all']);
    });
  }
}
