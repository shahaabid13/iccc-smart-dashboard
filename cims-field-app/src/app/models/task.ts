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
}
