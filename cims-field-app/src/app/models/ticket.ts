export interface TicketHistoryEntry {
  id: number;
  ticketId: number;
  changedByUserId: number;
  changedByUsername: string;
  action?: string;
  fromStatus: string | null;
  toStatus: string;
  notes?: string;
  changedAt?: string;
  performedAt?: string;
  assignedToUsername?: string;
}

export interface TicketActionResponse extends Partial<Ticket> {
  id: number;
  ticketHistoryId?: number;
}

export interface Ticket {
  updatedAt?: string;
  id: number;
  incidentTypeId: number;
  incidentTypeName: string;
  locationId: number;
  locationName: string;
  approachRoadId?: number;
  approachRoadName?: string;
  deviceTypeId?: number;
  deviceTypeName?: string;
  fieldPersonId: number;
  fieldPersonName: string;
  fieldPersonPhone?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  description?: string;
  status: 'OPEN' | 'ASSIGNED_TO_REVIEWER' | 'RESOLVED' | 'REOPENED' | 'PENDING' | 'REJECTED' | string;
  flagged?: boolean;
  raisedByUserId?: number;
  raisedByUsername?: string;
  coordinatorId?: number;
  coordinatorUsername?: string;
  coordinatorAckNotes?: string;
  reviewerId?: number;
  reviewerUsername?: string;
  reviewNotes?: string;
  createdAt?: string;
  coordinatorAckedAt?: string;
  assignedAt?: string;
  closedAt?: string;
  reopenedAt?: string;
  history?: TicketHistoryEntry[];
}

export interface PendingTicket extends Partial<Ticket> {
  id: number;
  ticketId?: number;
  title?: string;
  pendingHours?: number;
  hoursPending?: number;
  pendingSince?: string;
}

export interface FieldDashboardSummary {
  ticketsInQueue: number;
  flaggedTickets: number;
  averageAgeDays: number;
  oldestTicketDays: number;
  tasksPending: number;
  tasksOverdue: number;
}

export interface FieldDashboardBreakdowns {
  incidentTypes: { id: number; label: string; count: number }[];
  ageing: { label: string; count: number }[];
  trend: { date: string; created: number; closed: number }[];
  taskStatuses: { label: string; count: number }[];
  tasksByAssignee: { label: string; pending: number; overdue: number }[];
}