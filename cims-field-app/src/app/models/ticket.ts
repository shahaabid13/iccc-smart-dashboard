export interface TicketHistoryEntry {
  id: number;
  ticketId: number;
  changedByUserId: number;
  changedByUsername: string;
  fromStatus: string | null;
  toStatus: string;
  notes?: string;
  changedAt?: string;
}

export interface Ticket {
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