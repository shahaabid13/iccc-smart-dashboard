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
  status: 'OPEN' | 'ACKNOWLEDGED' | 'ASSIGNED' | 'IN_REVIEW' | 'RESOLVED' | 'REOPENED' | 'PENDING' | 'REJECTED' | 'REVALIDATION';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  raisedByUserId: number;
  raisedByUsername: string;
  assignedToReviewerId?: number;
  assignedToReviewerName?: string;
  scheduledDate?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  revalidationReason?: string;
  flagged?: boolean;
  ticketHistoryId?: number;
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
  assignedToUsername?: string;
  assignedToFullName?: string;
    assignedById?: number;
  assignedByUsername?: string;
  assignedByFullName?: string;
  assignedByName?: string;
  status: 'OPEN' | 'HOLD' | 'RESOLVED' | 'REJECTED' | 'CLOSED';
  actionSummary?: string;
  actionTakenAt?: string;
  taskHistoryId?: number;
  createdAt: string;
  updatedAt?: string;
  history?: TaskHistoryItem[];
}

export interface TaskActionResponse extends Task {
  taskHistoryId?: number;
  historyId?: number;
  taskHistory?: TaskHistoryItem;
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

export interface CimsDashboardSummary {
  ticketsInQueue: number;
  flaggedTickets: number;
  averageAgeDays: number;
  oldestTicketDays: number;
  tasksPending: number;
  tasksOverdue: number;
}

export interface CimsDashboardSummaryResponse {
  ticketsInQueue?: number;
  inQueueTickets?: number;
  queueTickets?: number;
  inQueue?: number;
  queueCount?: number;
  flaggedTickets?: number;
  flaggedCount?: number;
  flagged?: number;
  averageAgeDays?: number;
  avgAgeDays?: number;
  averageAge?: number;
  averageTicketAgeDays?: number;
  oldestTicketDays?: number;
  oldestTicketAgeDays?: number;
  oldestAgeDays?: number;
  oldestAge?: number;
  maxAgeDays?: number;
  tasksPending?: number;
  pendingTasks?: number;
  tasksOverdue?: number;
  overdueTasks?: number;
  [key: string]: unknown;
}

export interface TicketsByAssignee {
  assigneeId: number;
  assigneeName: string;
  count: number;
}

export interface TicketsByAssigneeResponse {
  assigneeId?: number;
  fieldPersonId?: number;
  userId?: number;
  assigneeName?: string;
  fieldPersonName?: string;
  assignedToName?: string;
  username?: string;
  name?: string;
  assignee?: string;
  count?: number;
  ticketCount?: number;
  totalCount?: number;
  openTickets?: number;
  inQueueCount?: number;
  [key: string]: unknown;
}

export interface TicketsByIncidentType {
  incidentTypeId: number;
  incidentTypeName: string;
  count: number;
}

export interface TicketsByIncidentTypeResponse {
  incidentTypeId?: number;
  typeId?: number;
  incidentTypeName?: string;
  typeName?: string;
  incidentType?: string;
  incidentName?: string;
  type?: string;
  name?: string;
  count?: number;
  ticketCount?: number;
  totalCount?: number;
  [key: string]: unknown;
}

export interface TicketsAgeingBucket {
  bucket: '0-1d' | '1-3d' | '3-7d' | '7d+';
  count: number;
}

export interface CimsTicketTrendPoint {
  date: string;
  created: number;
  closed: number;
}

export interface CimsTicketTrendPointResponse {
  date?: string;
  day?: string;
  created?: number;
  createdCount?: number;
  ticketsCreated?: number;
  closed?: number;
  closedCount?: number;
  ticketsClosed?: number;
  resolvedCount?: number;
  [key: string]: unknown;
}

export interface TasksByStatus {
  status: string;
  count: number;
}

export interface TasksByStatusResponse {
  status?: string;
  taskStatus?: string;
  name?: string;
  count?: number;
  taskCount?: number;
  totalCount?: number;
  [key: string]: unknown;
}

export interface TasksByAssignee {
  assigneeId: number;
  assigneeName: string;
  pending: number;
  overdue: number;
}

export interface TasksByAssigneeResponse {
  assigneeId?: number;
  userId?: number;
  assigneeName?: string;
  fieldPersonName?: string;
  assignedToName?: string;
  username?: string;
  name?: string;
  pending?: number;
  pendingTasks?: number;
  pendingCount?: number;
  overdue?: number;
  overdueTasks?: number;
  overdueCount?: number;
  [key: string]: unknown;
}

export interface CimsFlaggedTicket {
  id: number;
  title: string;
  assigneeName: string;
  hoursPending: number;
  remindersSent: number;
  flagged: boolean;
}

export interface CimsFlaggedTicketResponse {
  id?: number;
  ticketId?: number;
  title?: string;
  assigneeName?: string;
  fieldPersonName?: string;
  assignedTo?: string;
  hoursPending?: number;
  pendingHours?: number;
  remindersSent?: number;
  reminderCount?: number;
  flagged?: boolean;
  [key: string]: unknown;
}

export interface CimsFlaggedReminderResponse {
  ticketId: number;
  remindersSent?: number;
  reminderCount?: number;
  message?: string;
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
  name?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  phoneNumber?: string;
  [key: string]: any;
}

export interface UpdateUserRequest {
  username?: string;
  role?: string;
  fullName?: string;
  name?: string;
  full_name?: string;
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

export interface AgeingTicket {
  id: number;
  title: string;
  createdAt: string;
  daysOpen: number;
}

export interface AgeingTicketResponse {
  id?: number;
  ticketId?: number;
  title: string;
  createdAt: string;
  daysOpen: number;
}

export interface AgeingReport {
  userId: number;
  userName: string;
  email?: string;
  openCount: number;
  oldestDays: number;
  tickets: AgeingTicket[];
}

export interface AgeingReportResponse {
  userId: number;
  userName: string;
  email?: string;
  openCount?: number;
  openTicketCount?: number;
  oldestDays?: number;
  maxDaysOpen?: number;
  tickets: AgeingTicketResponse[];
}

export interface TopDefaulter {
  userId: number;
  userName: string;
  email?: string;
  openCount: number;
  oldestDays: number;
}

export interface TopDefaulterResponse {
  userId: number;
  userName: string;
  email?: string;
  openCount?: number;
  openTicketCount?: number;
  oldestDays?: number;
  maxDaysOpen?: number;
}

// ============ NOTIFICATIONS (Email/SMS on ticket updates) ============

export type CimsNotificationEventType =
  | 'TICKET_CREATED'
  | 'TICKET_ACKNOWLEDGED'
  | 'TICKET_ASSIGNED'
  | 'TICKET_RESOLVED'
  | 'TICKET_ON_HOLD'
  | 'TICKET_REOPENED'
  | 'TICKET_REJECTED'
  | 'TICKET_REMINDER';

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

export interface ServerNotification {
  id: string | number;
  type?: CimsNotificationEventType;
  eventType?: CimsNotificationEventType;
  title: string;
  message: string;
  ticketId: number;
  createdAt: string;
  read?: boolean;
}

export interface PendingFieldPersonTicket {
  id: number;
  ticketId?: number;
  title?: string;
  incidentTypeName?: string;
  locationName?: string;
  createdAt?: string;
  pendingSince?: string;
  pendingHours?: number;
  hoursPending?: number;
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
