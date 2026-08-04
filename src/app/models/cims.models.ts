// CIMS - Camera Incident Management System Models

export interface CreateTicketRequest {
  incidentTypeId: number;
  locationId: number;
  approachRoadId?: number;
  deviceTypeId?: number;
  fieldPersonId: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  description: string;
}

export interface TicketActionRequest {
  notes: string;
}

export interface AssignReviewerRequest {
  reviewerId: number;
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
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  description: string;
  status: 'OPEN' | 'ACKNOWLEDGED' | 'ASSIGNED' | 'IN_REVIEW' | 'RESOLVED' | 'REOPENED' | 'PENDING' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  raisedByUserId: number;
  raisedByUsername: string;
  assignedToReviewerId?: number;
  assignedToReviewerName?: string;
  history: TicketHistory[];
}

export interface TicketHistory {
  id: number;
  ticketId: number;
  action: string;
  notes: string;
  changedBy: string;
  changedAt: string;
}

export interface TaskHistoryItem {
  id: number;
  taskId: number;
  action: string;
  summary?: string;
  changedBy: string;
  changedAt: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  assignedToId?: number;
  assignedToName?: string;
  assignedById?: number;
  assignedByName?: string;
  status: 'OPEN' | 'HOLD' | 'RESOLVED' | 'REJECTED' | 'CLOSED';
  actionSummary?: string;
  actionTakenAt?: string;
  createdAt: string;
  updatedAt?: string;
  history?: TaskHistoryItem[];
}

export interface IncidentType {
  id: number;
  name: string;
}

export interface FieldPerson {
  id: number;
  name: string;
  role: string;
  phone: string;
}

export interface Location {
  id: number;
  name: string;
}

export interface ApproachRoad {
  id: number;
  name: string;
  locationId: number;
}

export interface DeviceType {
  id: number;
  name: string;
}

export interface Reviewer {
  id: number;
  username: string;
  name: string;
}

export interface DashboardStats {
  totalTickets: number;
  openTickets: number;
  pendingReview: number;
  closedTickets: number;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
}

export interface DailyTicketCount {
  date: string;
  count: number;
}

export interface CreateAdminUserRequest {
  username: string;
  password: string;
  role: string;
  agencyName?: string;
  fullName?: string;
  email?: string;
  phone?: string;
}

export interface UpdateUserRequest {
  username?: string;
  role?: string;
  fullName?: string;
  email?: string;
  phone?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// ============ NOTIFICATIONS (Email/SMS on ticket updates) ============

export type CimsNotificationEventType =
  | 'TICKET_CREATED'
  | 'TICKET_ACKNOWLEDGED'
  | 'TICKET_ASSIGNED'
  | 'TICKET_RESOLVED'
  | 'TICKET_ON_HOLD'
  | 'TICKET_REOPENED'
  | 'TICKET_REJECTED';

export type NotificationChannel = 'EMAIL' | 'SMS';

export interface CimsNotification {
  id: string;
  ticketId: number;
  eventType: CimsNotificationEventType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  incidentTypeName?: string;
  locationName?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  status?: Ticket['status'];
  channels: NotificationChannel[];
}

export interface NotificationSettings {
  emailEnabled: boolean;
  smsEnabled: boolean;
  browserEnabled: boolean;
  email: string;
  phone: string;
  eventTypes: Record<CimsNotificationEventType, { email: boolean; sms: boolean }>;
}

export interface EmailNotificationRequest {
  to: string;
  subject: string;
  body: string;
  ticketId: number;
  eventType: CimsNotificationEventType;
}

export interface SmsNotificationRequest {
  to: string;
  message: string;
  ticketId: number;
  eventType: CimsNotificationEventType;
}
