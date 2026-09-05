import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/cims.models';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-tasks-my',
  template: `
    <div class="container">
      <h3>My Tasks</h3>

      <div *ngIf="tasks.length === 0" class="alert alert-info">You have no open tasks.</div>

      <div *ngFor="let t of tasks" class="card mb-2">
        <div class="card-body d-flex justify-content-between align-items-start">
          <div>
            <h5 class="card-title">{{ t.title }}</h5>
            <p class="card-text">{{ t.description }}</p>
            <div class="text-muted small">Assigned By: {{ t.assignedByName || t.assignedByFullName || t.assignedByUsername || 'Unknown' }} • {{ t.createdAt | date }}</div>
          </div>
          <div>
            <a [routerLink]="['/tasks', t.id]" class="btn btn-primary">Take Action</a>
          </div>
        </div>
      </div>

      <h5 class="mt-4">My Task History</h5>
      <div *ngIf="history.length === 0" class="text-muted">No history yet.</div>
      <ul class="list-group mt-2">
        <li class="list-group-item" *ngFor="let h of history">{{ h.title }} — {{ h.status }}</li>
      </ul>
    </div>
  `
})
export class TasksMyComponent implements OnInit {
  tasks: Task[] = [];
  history: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    // Backend endpoints return a Spring Data Page ({ content: [...], ... }),
    // not a bare array — same shape as getAllTasks() in TasksAllComponent,
    // which already guards against this. This component was missing that
    // guard, so *ngFor was trying to iterate the whole page object and
    // throwing NG0900.
    this.taskService.getMyTasks().subscribe((r: any) => {
      this.tasks = Array.isArray(r) ? r : (r?.content ?? []);
    });
    this.taskService.getMyTaskHistory().subscribe((r: any) => {
      this.history = Array.isArray(r) ? r : (r?.content ?? []);
    });
  }
}