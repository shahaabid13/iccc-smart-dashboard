import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({ providedIn: 'root' })
export class CacheService {
  private readonly TICKET_QUEUE_KEY = 'tickets_queue';
  private readonly TASK_LIST_KEY = 'tasks_list';

  async cacheTickets(tickets: any[]) {
    await Preferences.set({
      key: this.TICKET_QUEUE_KEY,
      value: JSON.stringify(tickets)
    });
  }

  async getCachedTickets(): Promise<any[]> {
    const { value } = await Preferences.get({ key: this.TICKET_QUEUE_KEY });
    return value ? JSON.parse(value) : [];
  }

  async clearTicketCache() {
    await Preferences.remove({ key: this.TICKET_QUEUE_KEY });
  }

  async cacheTasks(tasks: any[]) {
    await Preferences.set({
      key: this.TASK_LIST_KEY,
      value: JSON.stringify(tasks)
    });
  }

  async getCachedTasks(): Promise<any[]> {
    const { value } = await Preferences.get({ key: this.TASK_LIST_KEY });
    return value ? JSON.parse(value) : [];
  }

  async clearTaskCache() {
    await Preferences.remove({ key: this.TASK_LIST_KEY });
  }
}
