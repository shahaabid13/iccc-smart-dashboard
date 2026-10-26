export interface TaskHistoryEntry {
  id: number;
  taskId: number;
  action: string;
  summary?: string;
  changedBy: string;
  changedAt: string;
}

export interface TaskActionResponse extends Partial<Task> {
  id: number;
  taskHistoryId?: number;
  historyId?: number;
  taskHistory?: TaskHistoryEntry;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'OPEN' | 'HOLD' | 'RESOLVED' | 'REJECTED' | string;
  assigneeId?: number;
  category?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | string;
  createdAt?: string;
  updatedAt?: string;
  dueDate?: string;
  history?: TaskHistoryEntry[];
}
