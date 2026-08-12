export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'OPEN' | 'HOLD' | 'RESOLVED' | 'REJECTED' | string;
  assigneeId?: number;
  createdAt?: string;
  updatedAt?: string;
}
