import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { OfflineService } from './offline.service';
import { TicketService } from './ticket.service';
import { TaskService } from './task.service';
import { BehaviorSubject } from 'rxjs';

interface QueuedAction {
  id: string;
  type: 'ticket-acknowledge' | 'ticket-assign' | 'task-action';
  ticketId?: number;
  taskId?: number;
  reviewerId?: number;
  status?: string;
  notes?: string;
  summary?: string;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class ActionQueueService {
  private readonly QUEUE_KEY = 'action_queue';
  private queue$ = new BehaviorSubject<QueuedAction[]>([]);
  pendingActions$ = this.queue$.asObservable();

  constructor(
    private offlineService: OfflineService,
    private ticketService: TicketService,
    private taskService: TaskService
  ) {
    this.loadQueue();
    this.offlineService.isOnline$.subscribe(isOnline => {
      if (isOnline) {
        void this.retryPendingActions();
      }
    });
  }

  async addAckTicket(ticketId: number, notes: string) {
    const action: QueuedAction = {
      id: `ack-${ticketId}-${Date.now()}`,
      type: 'ticket-acknowledge',
      ticketId,
      notes,
      timestamp: Date.now()
    };
    await this.enqueueAction(action);
  }

  async addAssignReviewer(ticketId: number, reviewerId: number) {
    const action: QueuedAction = {
      id: `assign-${ticketId}-${Date.now()}`,
      type: 'ticket-assign',
      ticketId,
      reviewerId,
      timestamp: Date.now()
    };
    await this.enqueueAction(action);
  }

  async addTaskAction(taskId: number, status: string, summary: string) {
    const action: QueuedAction = {
      id: `task-${taskId}-${Date.now()}`,
      type: 'task-action',
      taskId,
      status,
      summary,
      timestamp: Date.now()
    };
    await this.enqueueAction(action);
  }

  private async enqueueAction(action: QueuedAction) {
    const queue = this.queue$.value;
    queue.push(action);
    this.queue$.next(queue);
    await this.saveQueue(queue);
  }

  private async loadQueue() {
    const { value } = await Preferences.get({ key: this.QUEUE_KEY });
    const queue = value ? JSON.parse(value) : [];
    this.queue$.next(queue);
  }

  private async saveQueue(queue: QueuedAction[]) {
    await Preferences.set({
      key: this.QUEUE_KEY,
      value: JSON.stringify(queue)
    });
  }

  private async retryPendingActions() {
    const queue = this.queue$.value;
    if (queue.length === 0) return;

    const toRemove: string[] = [];

    for (const action of queue) {
      try {
        await this.executeAction(action);
        toRemove.push(action.id);
      } catch (err) {
        console.error('Failed to retry action:', action, err);
      }
    }

    const remaining = queue.filter(a => !toRemove.includes(a.id));
    this.queue$.next(remaining);
    await this.saveQueue(remaining);
  }

  private executeAction(action: QueuedAction): Promise<any> {
    switch (action.type) {
      case 'ticket-acknowledge':
        return this.ticketService.acknowledge(action.ticketId!, action.notes!).toPromise() as Promise<any>;
      case 'ticket-assign':
        return this.ticketService.assignReviewer(action.ticketId!, action.reviewerId!).toPromise() as Promise<any>;
      case 'task-action':
        return this.taskService.action(action.taskId!, action.status as any, action.summary!).toPromise() as Promise<any>;
      default:
        return Promise.reject('Unknown action type');
    }
  }
}
