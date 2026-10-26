import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { OfflineService } from './offline.service';
import { TicketService } from './ticket.service';
import { TaskService } from './task.service';
import { BehaviorSubject } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { AttachmentService, AttachmentEntityType } from './attachment.service';

interface QueuedAction {
  id: string;
  type: 'ticket-acknowledge' | 'ticket-assign' | 'task-action';
  ticketId?: number;
  taskId?: number;
  reviewerId?: number;
  action?: 'resolved' | 'revalidation';
  status?: string;
  notes?: string;
  summary?: string;
  attachmentDataUrls?: string[];
  historyId?: number;
  actionCompleted?: boolean;
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
    private taskService: TaskService,
    private attachmentService: AttachmentService
  ) {
    this.loadQueue();
    this.offlineService.isOnline$.subscribe(isOnline => {
      if (isOnline) {
        void this.retryPendingActions();
      }
    });
  }

  async addAckTicket(ticketId: number, actionType: 'resolved' | 'revalidation', notes: string, files: Blob[] = []) {
    const action: QueuedAction = {
      id: `ack-${ticketId}-${Date.now()}`,
      type: 'ticket-acknowledge',
      ticketId,
      action: actionType,
      notes,
      attachmentDataUrls: await this.filesToDataUrls(files),
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

  async addTaskAction(taskId: number, status: string, summary: string, files: Blob[] = []) {
    const action: QueuedAction = {
      id: `task-${taskId}-${Date.now()}`,
      type: 'task-action',
      taskId,
      status,
      summary,
      attachmentDataUrls: await this.filesToDataUrls(files),
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
        const complete = await this.executeAction(action);
        if (complete) toRemove.push(action.id);
        await this.saveQueue(queue);
      } catch (err) {
        console.error('Failed to retry action:', action, err);
      }
    }

    const remaining = queue.filter(a => !toRemove.includes(a.id));
    this.queue$.next(remaining);
    await this.saveQueue(remaining);
  }

  private async executeAction(action: QueuedAction): Promise<boolean> {
    if (!action.actionCompleted) {
      let response: any;
      switch (action.type) {
        case 'ticket-acknowledge':
          response = await firstValueFrom(this.ticketService.acknowledge(action.ticketId!, action.action ?? 'resolved', action.notes!));
          action.historyId = response?.ticketHistoryId;
          break;
        case 'ticket-assign':
          await firstValueFrom(this.ticketService.assignReviewer(action.ticketId!, action.reviewerId!));
          action.actionCompleted = true;
          return true;
        case 'task-action':
          response = await firstValueFrom(this.taskService.action(action.taskId!, action.status as any, action.summary!));
          action.historyId = response?.taskHistoryId || response?.historyId || response?.taskHistory?.id || response?.history?.at(-1)?.id;
          break;
        default:
          throw new Error('Unknown queued action');
      }
      action.actionCompleted = true;
      await this.saveQueue(this.queue$.value);
    }

    const dataUrls = action.attachmentDataUrls || [];
    if (!dataUrls.length) return true;
    if (!action.historyId) throw new Error('Action completed without a history ID; attachments remain queued');

    const entityType: AttachmentEntityType = action.type === 'task-action' ? 'TASK_ACTION' : 'TICKET_ACTION';
    const result = await firstValueFrom(this.attachmentService.uploadAttachments(
      dataUrls.map((value) => this.dataUrlToBlob(value)), entityType, action.historyId
    ));
    if (result.failed) throw new Error(`${result.failed} queued screenshots failed to upload`);
    action.attachmentDataUrls = [];
    return true;
  }

  private filesToDataUrls(files: Blob[]): Promise<string[]> {
    return Promise.all(files.map((file) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Could not save screenshot'));
      reader.onerror = () => reject(reader.error || new Error('Could not save screenshot'));
      reader.readAsDataURL(file);
    })));
  }

  private dataUrlToBlob(dataUrl: string): Blob {
    const [metadata, data] = dataUrl.split(',');
    const mimeType = metadata.match(/data:(.*?);base64/)?.[1] || 'image/jpeg';
    const bytes = atob(data);
    const array = new Uint8Array(bytes.length);
    for (let index = 0; index < bytes.length; index++) array[index] = bytes.charCodeAt(index);
    return new Blob([array], { type: mimeType });
  }
}
