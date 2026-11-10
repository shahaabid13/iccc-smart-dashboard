import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/cims.models';
import { ConversationService } from '../../services/conversation.service';

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
            <td>
              <span *ngIf="unreadByTaskId[t.id]" class="conversation-unread" [attr.aria-label]="unreadByTaskId[t.id] + ' unread conversation messages'">
                {{ unreadByTaskId[t.id] }}
              </span>
              <a [routerLink]="['/tasks', t.id]" class="btn btn-sm btn-primary">Details</a>
            </td>
          </tr>
        </tbody>
      </table>

      <div *ngIf="!tasks.length" class="text-muted mt-3">No tasks found.</div>
    </div>
  `,
  styles: [`.conversation-unread { display:inline-grid; place-items:center; min-width:20px; height:20px; margin-right:6px; padding:0 5px; border-radius:11px; background:#dc2626; color:#fff; font-size:11px; font-weight:700; }`]
})
export class TasksAllComponent implements OnInit {
  tasks: Task[] = [];
  unreadByTaskId: Record<number, number> = {};

  constructor(private taskService: TaskService, private conversations: ConversationService) {}

  ngOnInit(): void {
    this.load();
    this.conversations.getUnreadSummary().subscribe({
      next: items => this.unreadByTaskId = Object.fromEntries(items
        .filter(item => item.entityType === 'TASK')
        .map(item => [item.entityId, item.unreadCount])),
      error: () => this.unreadByTaskId = {}
    });
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