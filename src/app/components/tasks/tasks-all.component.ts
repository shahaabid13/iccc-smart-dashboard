import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/cims.models';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-tasks-all',
  template: `
    <div class="container">
      <h3>All Tasks</h3>
      <div class="mb-3">
        <a routerLink="/tasks/create" class="btn btn-primary">Create Task</a>
      </div>

      <table class="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Created</th>
            <th>Closed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let t of tasks">
            <td>{{ t.title }}</td>
            <td>{{ t.assignedToFullName || t.assignedToUsername || 'Unassigned' }}</td>
            <td>{{ t.status }}</td>
            <td>{{ t.createdAt | date:'medium' }}</td>
            <td>{{ t.actionTakenAt ? (t.actionTakenAt | date:'medium') : '—' }}</td>
            <td><a [routerLink]="['/tasks', t.id]" class="btn btn-sm btn-primary">Details</a></td>
          </tr>
        </tbody>
      </table>

      <div *ngIf="!tasks.length" class="text-muted mt-3">No tasks found.</div>
    </div>
  `
})
export class TasksAllComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.taskService.getAllTasks(0, 50).subscribe((r: any) => {
      if (Array.isArray(r)) {
        this.tasks = r;
      } else if (r && r.content) {
        this.tasks = r.content;
      }
    });
  }
}