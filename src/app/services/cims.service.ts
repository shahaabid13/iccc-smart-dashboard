import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import emailjs from '@emailjs/browser';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  CreateTicketRequest,
  TicketActionRequest,
  AssignReviewerRequest,
  Ticket,
  IncidentType,
  FieldPerson,
  Location,
  ApproachRoad,
  DeviceType,
  Reviewer,
  DashboardStats,
  DailyTicketCount,
  PaginatedResponse,
  CreateAdminUserRequest,
  UpdateUserRequest,
  AgeingReport,
  AgeingReportResponse,
  TopDefaulter,
  CimsDashboardSummary,
  CimsDashboardSummaryResponse,
  TicketsByAssignee,
  TicketsByAssigneeResponse,
  TicketsByIncidentType,
  TicketsByIncidentTypeResponse,
  TicketsAgeingBucket,
  CimsTicketTrendPoint,
  CimsTicketTrendPointResponse,
  TasksByStatus,
  TasksByStatusResponse,
  TasksByAssignee,
  TasksByAssigneeResponse,
  CimsFlaggedTicket,
  CimsFlaggedTicketResponse,
  CimsFlaggedReminderResponse,
  PendingFieldPersonTicket
} from '../models/cims.models';

@Injectable({
  providedIn: 'root'
})
export class CimsService {
  private apiUrl = '/api/incidents'; // Uses proxy to http://localhost:8080

  constructor(private http: HttpClient) { }

  // ============ AUTH ============
  cimsLogin(username: string, password: string): Observable<any> {
    return this.http.post('/api/auth/login', { username, password });
  }

  createUser(username: string, password: string, role: string): Observable<any> {
    const body = new FormData();
    body.append('username', username);
    body.append('password', password);
    body.append('role', role);
    return this.http.post('/api/auth/create', body);
  }

  createAdminUser(userData: CreateAdminUserRequest): Observable<any> {
    return this.http.post('/api/admin/users', userData);
  }

  // ============ INCIDENT TYPES ============
  createIncidentType(name: string): Observable<IncidentType> {
    return this.http.post<IncidentType>(`${this.apiUrl}/incident-types`, { name });
  }

  getIncidentTypes(): Observable<IncidentType[]> {
    return this.http.get<IncidentType[]>(`${this.apiUrl}/incident-types`);
  }

  // ============ FIELD PERSONS ============
  createFieldPerson(name: string, role: string, phone: string): Observable<FieldPerson> {
    return this.http.post<FieldPerson>(`${this.apiUrl}/field-persons`, { name, role, phone });
  }

  getFieldPersons(): Observable<FieldPerson[]> {
    return this.http.get<FieldPerson[]>(`${this.apiUrl}/field-persons`);
  }

  getAssignableFieldPersons(): Observable<FieldPerson[]> {
    return this.http.get<FieldPerson[]>(`${this.apiUrl}/field-persons/assignable`);
  }

  // ============ TICKETS - SUPPORT ENGINEER ============
  createTicket(payload: CreateTicketRequest): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}/tickets`, payload);
  }

  getMyTickets(page: number = 0, size: number = 10): Observable<PaginatedResponse<Ticket>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PaginatedResponse<Ticket>>(`${this.apiUrl}/tickets/my`, { params });
  }

  getTicketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/tickets/${id}`);
  }

  // ============ TICKETS - FIELD PERSON ============
  getFieldPersonQueue(page: number = 0, size: number = 10): Observable<PaginatedResponse<Ticket>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PaginatedResponse<Ticket>>(`${this.apiUrl}/tickets/my-queue`, { params });
  }

  getCoordinatorQueue(page: number = 0, size: number = 10): Observable<PaginatedResponse<Ticket>> {
    return this.getFieldPersonQueue(page, size);
  }

  acknowledgeTicket(id: number, action: 'resolved' | 'revalidation', notes: string = ''): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/tickets/${id}/acknowledge`, { action, notes });
  }

  assignReviewer(id: number, reviewerId: number): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/tickets/${id}/assign-reviewer`, { reviewerId });
  }

  getReviewers(): Observable<Reviewer[]> {
    return this.http.get<Reviewer[]>(`${this.apiUrl}/tickets/reviewers`);
  }

  // ============ TICKETS - REVIEWER ============
  getReviewQueue(page: number = 0, size: number = 10): Observable<PaginatedResponse<Ticket>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PaginatedResponse<Ticket>>(`${this.apiUrl}/tickets/review-queue`, { params });
  }

  getReviewerHistory(page: number = 0, size: number = 10): Observable<Ticket[] | PaginatedResponse<Ticket>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('includeAll', 'true');
    return this.http.get<Ticket[] | PaginatedResponse<Ticket>>(`${this.apiUrl}/tickets/my-history`, { params });
  }

  getFieldPersonHistory(page: number = 0, size: number = 10): Observable<Ticket[] | PaginatedResponse<Ticket>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Ticket[] | PaginatedResponse<Ticket>>(`${this.apiUrl}/tickets/my-ticket-history`, { params });
  }

  getCoordinatorHistory(page: number = 0, size: number = 10): Observable<Ticket[] | PaginatedResponse<Ticket>> {
    return this.getFieldPersonHistory(page, size);
  }

  resolveTicket(id: number, notes: string): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/tickets/${id}/resolve`, { notes });
  }

  revalidateTicket(id: number, notes: string = 'Revalidation requested', reason?: string): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/tickets/${id}/revalidation`, {
      notes,
      reason: reason ?? notes
    });
  }

  reassignTicket(id: number, payload: { fieldPersonId: number; scheduledDate: string; remarks?: string }): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/tickets/${id}/reassign`, payload);
  }

  assignFieldPerson(id: number, payload: { fieldPersonId: number; scheduledDate: string; remarks?: string }): Observable<Ticket> {
    return this.reassignTicket(id, payload);
  }

  holdTicket(id: number, notes: string): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/tickets/${id}/pending`, { notes });
  }

  reopenTicket(id: number, notes: string): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/tickets/${id}/reopen`, { notes });
  }

  rejectTicket(id: number, notes: string): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/tickets/${id}/reject`, { notes });
  }

  // ============ TICKETS - ADMIN ============
  getAllTickets(
    page: number = 0,
    size: number = 20,
    filters?: {
      status?: string;
      incidentTypeId?: number;
      locationId?: number;
      raisedByUserId?: number;
      fromDate?: string;
      toDate?: string;
    }
  ): Observable<PaginatedResponse<Ticket>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (filters) {
      if (filters.status) params = params.set('status', filters.status);
      if (filters.incidentTypeId) params = params.set('incidentTypeId', filters.incidentTypeId.toString());
      if (filters.locationId) params = params.set('locationId', filters.locationId.toString());
      if (filters.raisedByUserId) params = params.set('raisedByUserId', filters.raisedByUserId.toString());
      if (filters.fromDate) params = params.set('fromDate', filters.fromDate);
      if (filters.toDate) params = params.set('toDate', filters.toDate);
    }

    return this.http.get<PaginatedResponse<Ticket>>(`${this.apiUrl}/tickets`, { params });
  }

  getAgeingReports(): Observable<AgeingReport[]> {
    return this.http.get<AgeingReportResponse[]>('/api/cims/reports/ageing').pipe(
      map((reports) => reports.map((report) => this.normalizeAgeingReport(report)))
    );
  }

  getTopDefaulters(): Observable<TopDefaulter[]> {
    return this.getAgeingReports().pipe(
      map((reports) => reports
        .map((user) => ({
        userId: user.userId,
        userName: user.userName,
        email: user.email,
        openCount: user.openCount,
        oldestDays: user.oldestDays
        }))
        .sort((a, b) => b.oldestDays - a.oldestDays))
    );
  }

  getAgeingReportByUser(userId: number): Observable<AgeingReport> {
    return this.http.get<AgeingReportResponse>(`/api/cims/reports/ageing/${encodeURIComponent(userId)}`).pipe(
      map((report) => this.normalizeAgeingReport(report))
    );
  }

  async sendFollowUp(user: AgeingReport): Promise<void> {
    const { serviceId, publicKey, followUpTemplateId } = environment.emailjs;
    if (!serviceId || !publicKey || !followUpTemplateId) {
      throw new Error('EmailJS follow-up template is not configured.');
    }

    await emailjs.send(serviceId, followUpTemplateId, {
      to_email: user.email,
      to_name: user.userName,
      open_count: user.openCount,
      oldest_days: user.oldestDays,
      ticket_list: user.tickets.map((ticket) =>
        `#${ticket.id} - ${ticket.title} (open ${ticket.daysOpen} days)`
      ).join('\n')
    }, { publicKey });
  }

  private normalizeAgeingReport(report: AgeingReportResponse): AgeingReport {
    const tickets = (report.tickets || []).map((ticket) => ({
      id: ticket.id ?? ticket.ticketId ?? 0,
      title: ticket.title,
      createdAt: ticket.createdAt,
      daysOpen: ticket.daysOpen
    }));
    return {
      userId: report.userId,
      userName: report.userName,
      email: report.email,
      openCount: report.openCount ?? report.openTicketCount ?? tickets.length,
      oldestDays: report.oldestDays ?? report.maxDaysOpen ?? Math.max(0, ...tickets.map((ticket) => ticket.daysOpen)),
      tickets
    };
  }

  getCimsDashboardSummary(): Observable<CimsDashboardSummaryResponse> {
    return this.http.get<CimsDashboardSummaryResponse>('/api/cims/dashboard/summary');
  }

  getTicketsByAssignee(): Observable<TicketsByAssignee[]> {
    return this.http.get<unknown>('/api/cims/dashboard/tickets-by-assignee').pipe(
      map((response) => this.asArray<TicketsByAssigneeResponse>(response).map((item) => ({
        assigneeId: this.numberValue(item, ['assigneeId', 'fieldPersonId', 'userId', 'id']),
        assigneeName: this.stringValue(item, ['assigneeName', 'fieldPersonName', 'assignedToName', 'username', 'name', 'assignee']),
        count: this.numberValue(item, ['count', 'ticketCount', 'totalCount', 'openTickets', 'ticketsInQueue', 'inQueueCount', 'total'])
      })))
    );
  }

  getTicketsByIncidentType(): Observable<TicketsByIncidentType[]> {
    return this.http.get<unknown>('/api/cims/dashboard/tickets-by-incident-type').pipe(
      map((response) => this.asArray<TicketsByIncidentTypeResponse>(response).map((item) => ({
        incidentTypeId: this.numberValue(item, ['incidentTypeId', 'typeId', 'id']),
        incidentTypeName: this.stringValue(item, ['incidentTypeName', 'typeName', 'incidentType', 'incidentName', 'type', 'name', 'label']),
        count: this.numberValue(item, ['count', 'ticketCount', 'totalCount', 'tickets', 'total'])
      })))
    );
  }

  getTicketsAgeingBuckets(): Observable<TicketsAgeingBucket[]> {
    return this.http.get<unknown>('/api/cims/dashboard/tickets-ageing-buckets').pipe(
      map((response) => this.asArray<Record<string, unknown>>(response).map((item) => ({
        bucket: this.stringValue(item, ['bucket', 'label', 'ageBucket']) as TicketsAgeingBucket['bucket'],
        count: this.numberValue(item, ['count', 'ticketCount', 'tickets', 'total'])
      })))
    );
  }

  getTicketsTrend(days: 7 | 30 | 90 = 30): Observable<CimsTicketTrendPoint[]> {
    return this.http.get<unknown>('/api/cims/dashboard/tickets-trend', {
      params: { days }
    }).pipe(
      map((response) => this.normalizeTrendResponse(response))
    );
  }

  private normalizeTrendResponse(response: unknown): CimsTicketTrendPoint[] {
    if (response === null || response === undefined) return [];

    const wrappers = ['content', 'data', 'items', 'results', 'records', 'points', 'trend'];
    if (typeof response === 'object' && !Array.isArray(response)) {
      for (const key of wrappers) {
        const candidate = (response as Record<string, unknown>)[key];
        if (candidate !== undefined) {
          const nested = this.normalizeTrendResponse(candidate);
          if (nested.length) return nested;
        }
      }
    }

    const rows = this.asArray<CimsTicketTrendPointResponse>(response);
    if (rows.length) {
      return rows.map((item) => ({
        date: this.stringValue(item, ['date', 'day', 'ticketDate']),
        created: this.extractCreatedValue(item),
        closed: this.extractClosedValue(item)
      })).filter((point) => point.date || point.created || point.closed);
    }

    if (response && typeof response === 'object') {
      const entries = Object.entries(response as Record<string, unknown>);
      const hasDateKeys = entries.some(([key]) => /^\d{4}-\d{2}-\d{2}$/.test(key));

      if (hasDateKeys) {
        return entries.flatMap(([date, value]) => {
          if (value === null || value === undefined || typeof value !== 'object' || Array.isArray(value)) return [];
          const record = value as Record<string, unknown>;
          const created = this.extractCreatedValue(record);
          const closed = this.extractClosedValue(record);
          if (date || created || closed) {
            return [{ date, created, closed }];
          }
          return [];
        }).filter((point) => point.date || point.created || point.closed);
      }

      const singlePoint = Object.entries(response as Record<string, unknown>)
        .filter(([key, value]) => value !== null && value !== undefined)
        .some(([key, value]) => ['date', 'day', 'ticketDate', 'created', 'created_at', 'closed', 'closed_at', 'createdCount', 'closedCount', 'ticketsCreated', 'ticketsClosed', 'resolvedCount'].includes(key));
      if (singlePoint) {
        return [{
          date: this.stringValue(response as Record<string, unknown>, ['date', 'day', 'ticketDate']),
          created: this.extractCreatedValue(response as Record<string, unknown>),
          closed: this.extractClosedValue(response as Record<string, unknown>)
        }].filter((point) => point.date || point.created || point.closed);
      }
    }

    return [];
  }

  getTasksByStatus(): Observable<TasksByStatus[]> {
    return this.http.get<unknown>('/api/cims/dashboard/tasks-by-status').pipe(
      map((response) => this.asArray<TasksByStatusResponse>(response).map((item) => ({
        status: this.stringValue(item, ['status', 'taskStatus', 'name', 'label']),
        count: this.numberValue(item, ['count', 'taskCount', 'totalCount', 'tasks', 'total'])
      })))
    );
  }

  getTasksByAssignee(): Observable<TasksByAssignee[]> {
    return this.http.get<unknown>('/api/cims/dashboard/tasks-by-assignee').pipe(
      map((response) => this.asArray<TasksByAssigneeResponse>(response).map((item) => ({
        assigneeId: this.numberValue(item, ['assigneeId', 'userId', 'id']),
        assigneeName: this.stringValue(item, ['assigneeName', 'fieldPersonName', 'assignedToName', 'username', 'name', 'assignee']),
        pending: this.numberValue(item, ['pending', 'pendingTasks', 'pendingCount']),
        overdue: this.numberValue(item, ['overdue', 'overdueTasks', 'overdueCount'])
      })))
    );
  }

  getFlaggedTickets(): Observable<CimsFlaggedTicket[]> {
    return this.http.get<unknown>('/api/cims/flagged-tickets').pipe(
      map((response) => this.asArray<CimsFlaggedTicketResponse>(response).map((item) => ({
        id: this.numberValue(item, ['id', 'ticketId']),
        title: this.stringValue(item, ['title', 'ticketTitle']),
        assigneeName: this.stringValue(item, ['assigneeName', 'fieldPersonName', 'assignedTo', 'username']),
        hoursPending: this.numberValue(item, ['hoursPending', 'pendingHours']),
        remindersSent: this.numberValue(item, ['remindersSent', 'reminderCount']),
        flagged: item.flagged !== false
      })))
    );
  }

  remindFlaggedTicket(ticketId: number): Observable<CimsFlaggedReminderResponse> {
    return this.http.post<CimsFlaggedReminderResponse>(`/api/cims/flagged-tickets/${ticketId}/remind`, {});
  }

  getMyPendingTickets(): Observable<PendingFieldPersonTicket[]> {
    return this.http.get<unknown>('/api/cims/my-pending-tickets').pipe(
      map((response) => this.asArray<PendingFieldPersonTicket>(response).map((ticket) => ({
        ...ticket,
        id: ticket.id ?? ticket.ticketId ?? 0
      })))
    );
  }

  private asArray<T>(response: unknown): T[] {
    if (Array.isArray(response)) return response as T[];
    if (response && typeof response === 'object') {
      const envelope = response as { content?: unknown; data?: unknown; items?: unknown; results?: unknown; records?: unknown; tickets?: unknown };
      const rows = envelope.content ?? envelope.data ?? envelope.items ?? envelope.results ?? envelope.records ?? envelope.tickets;
      if (Array.isArray(rows)) return rows as T[];

      for (const value of Object.values(envelope)) {
        if (Array.isArray(value)) return value as T[];
      }

      const entries = Object.entries(envelope)
        .filter(([, value]) => value !== null && typeof value === 'object' && !Array.isArray(value));
      if (entries.length) {
        const asMap = entries.map(([date, value]) => ({ ...(value as Record<string, unknown>), date }));
        if (asMap.some((item) => 'created' in item || 'closed' in item || 'created_at' in item || 'closed_at' in item || 'date' in item)) {
          return asMap as T[];
        }
      }
    }
    return [];
  }

  private numberValue(record: Record<string, unknown>, keys: string[]): number {
    const matches = new Map<string, unknown>();
    for (const [key, value] of Object.entries(record)) {
      matches.set(this.normalizeKey(key), value);
    }

    for (const key of keys) {
      const normalized = this.normalizeKey(key);
      if (matches.has(normalized)) {
        const value = matches.get(normalized);
        if (typeof value === 'number' && Number.isFinite(value)) return value;
        if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) return Number(value);
      }
    }

    for (const key of keys) {
      const value = record[key];
      if (typeof value === 'number' && Number.isFinite(value)) return value;
      if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) return Number(value);
    }
    return 0;
  }

  private extractCreatedValue(record: Record<string, unknown>): number {
    const fallbackKeys = ['created', 'createdCount', 'ticketsCreated', 'opened', 'created_at', 'createdAt', 'createdCountTotal', 'totalCreated', 'createdTotal', 'created_count', 'total_created', 'newCount', 'newTickets', 'raisedCount'];
    const value = this.numberValue(record, fallbackKeys);
    if (value > 0 || Object.keys(record).some((key) => this.normalizeKey(key).includes('created') || this.normalizeKey(key).includes('open') || this.normalizeKey(key).includes('new'))) {
      return value;
    }
    return 0;
  }

  private extractClosedValue(record: Record<string, unknown>): number {
    const fallbackKeys = ['closed', 'closedCount', 'ticketsClosed', 'resolvedCount', 'closed_at', 'closedAt', 'closedCountTotal', 'totalClosed', 'closedTotal', 'closed_count', 'total_closed', 'resolvedCountTotal', 'completedCount', 'doneCount'];
    const value = this.numberValue(record, fallbackKeys);
    if (value > 0 || Object.keys(record).some((key) => this.normalizeKey(key).includes('closed') || this.normalizeKey(key).includes('resolved') || this.normalizeKey(key).includes('completed') || this.normalizeKey(key).includes('done'))) {
      return value;
    }
    return 0;
  }

  private stringValue(record: Record<string, unknown>, keys: string[]): string {
    const matches = new Map<string, unknown>();
    for (const [key, value] of Object.entries(record)) {
      matches.set(this.normalizeKey(key), value);
    }

    for (const key of keys) {
      const normalized = this.normalizeKey(key);
      if (matches.has(normalized)) {
        const value = matches.get(normalized);
        if (typeof value === 'string' && value.trim() !== '') return value;
        if (typeof value === 'number') return String(value);
      }
    }

    for (const key of keys) {
      const value = record[key];
      if (typeof value === 'string' && value.trim() !== '') return value;
      if (typeof value === 'number') return String(value);
    }
    for (const [key, value] of Object.entries(record)) {
      if (typeof value === 'string' && value.trim() !== '' && !/(date|time|status)/i.test(key)) return value;
    }
    return '';
  }

  private normalizeKey(value: string): string {
    return value.replace(/[^a-z0-9]/gi, '').toLowerCase();
  }

  private matchesCountKeyword(normalizedKey: string, keyword: 'created' | 'closed'): boolean {
    if (normalizedKey.includes(keyword)) {
      const disallowed = /(date|time|at|updated|modified|timestamp|createdat|closedat)/i.test(normalizedKey);
      return !disallowed;
    }
    return false;
  }

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`);
  }

  getHomeDashboardStats(): Observable<DashboardStats> {
    const role = (sessionStorage.getItem('role') || '').toUpperCase();
    const normalizeNumber = (value: unknown, fallback = 0): number => {
      if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
      }
      if (typeof value === 'string') {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : fallback;
      }
      return fallback;
    };

    if (role === 'FIELD_PERSON' || role === 'COORDINATOR') {
      return forkJoin({
        queue: this.getFieldPersonQueue(0, 100).pipe(catchError(() => of([]))),
        history: this.getFieldPersonHistory(0, 100).pipe(catchError(() => of([])))
      }).pipe(
        map(({ queue, history }: { queue: any; history: any }) => {
          const queueList: Ticket[] = Array.isArray(queue) ? queue : (queue?.content || []);
          const historyList: Ticket[] = Array.isArray(history) ? history : (history?.content || []);
          const all = [...queueList, ...historyList];

          const pendingStatuses = ['PENDING', 'IN_REVIEW', 'ACKNOWLEDGED', 'ASSIGNED_TO_REVIEWER', 'ASSIGNED'];

          return {
            totalTickets: all.length,
            openTickets: queueList.length,
            pendingReview: all.filter((t) => pendingStatuses.includes((t.status || '').toUpperCase())).length,
            closedTickets: historyList.length,
            byStatus: {},
            byPriority: {}
          } satisfies DashboardStats;
        })
      );
    }

    if (role === 'SUPPORT_ENGINEER') {
      return this.getMyTickets(0, 100).pipe(
        map((response: any) => {
          const ticketList: Ticket[] = Array.isArray(response) ? response : (response?.content || []);
          const totalTickets = response?.totalElements ?? ticketList.length;

          const openStatuses = ['OPEN', 'REOPENED'];
          const pendingStatuses = ['PENDING', 'IN_REVIEW', 'ACKNOWLEDGED', 'ASSIGNED_TO_REVIEWER', 'ASSIGNED'];
          const closedStatuses = ['RESOLVED', 'REJECTED'];

          return {
            totalTickets: normalizeNumber(totalTickets),
            openTickets: ticketList.filter((t) => openStatuses.includes((t.status || '').toUpperCase())).length,
            pendingReview: ticketList.filter((t) => pendingStatuses.includes((t.status || '').toUpperCase())).length,
            closedTickets: ticketList.filter((t) => closedStatuses.includes((t.status || '').toUpperCase())).length,
            byStatus: {},
            byPriority: {}
          } satisfies DashboardStats;
        }),
        catchError(() => of({
          totalTickets: 0,
          openTickets: 0,
          pendingReview: 0,
          closedTickets: 0,
          byStatus: {},
          byPriority: {}
        } satisfies DashboardStats))
      );
    }

    if (role === 'REVIEWER') {
      return forkJoin({
        queue: this.getReviewQueue(0, 100).pipe(catchError(() => of([]))),
        history: this.getReviewerHistory(0, 100).pipe(catchError(() => of([])))
      }).pipe(
        map(({ queue, history }: { queue: any; history: any }) => {
          const queueList: Ticket[] = Array.isArray(queue) ? queue : (queue?.content || []);
          const historyList: Ticket[] = Array.isArray(history) ? history : (history?.content || []);
          const all = [...queueList, ...historyList];

          return {
            totalTickets: all.length,
            openTickets: all.filter((t) => ['OPEN', 'REOPENED'].includes((t.status || '').toUpperCase())).length,
            pendingReview: queueList.length,
            closedTickets: historyList.length,
            byStatus: {},
            byPriority: {}
          } satisfies DashboardStats;
        })
      );
    }

    return forkJoin({
      summary: this.getDashboardStats().pipe(catchError(() => of({} as DashboardStats))),
      tickets: this.getAllTickets(0, 1000).pipe(catchError(() => of(null)))
    }).pipe(
      map(({ summary, tickets }: { summary: DashboardStats; tickets: PaginatedResponse<Ticket> | null }) => {
        const ticketList = Array.isArray(tickets) ? tickets : tickets?.content || [];
        const totalTickets = tickets?.totalElements ?? normalizeNumber(summary?.totalTickets ?? ticketList.length);
        const fallbackSummary: DashboardStats = {
          totalTickets,
          openTickets: 0,
          pendingReview: 0,
          closedTickets: 0,
          byStatus: {},
          byPriority: {}
        };

        const normalizedSummary: DashboardStats = {
          ...fallbackSummary,
          ...summary,
          totalTickets,
          openTickets: normalizeNumber(summary?.openTickets ?? summary?.['open_tickets' as keyof DashboardStats] ?? fallbackSummary.openTickets),
          pendingReview: normalizeNumber(summary?.pendingReview ?? summary?.['pending_review' as keyof DashboardStats] ?? fallbackSummary.pendingReview),
          closedTickets: normalizeNumber(summary?.closedTickets ?? summary?.['closed' as keyof DashboardStats] ?? fallbackSummary.closedTickets)
        };

        if (!ticketList.length) {
          return normalizedSummary;
        }

        const openStatuses = ['OPEN', 'REOPENED'];
        const pendingStatuses = ['PENDING', 'IN_REVIEW', 'ACKNOWLEDGED', 'ASSIGNED_TO_REVIEWER', 'ASSIGNED'];
        const closedStatuses = ['RESOLVED', 'REJECTED'];
        return {
          ...normalizedSummary,
          totalTickets,
          openTickets: ticketList.filter((ticket) => openStatuses.includes((ticket.status || '').toUpperCase())).length,
          pendingReview: ticketList.filter((ticket) => pendingStatuses.includes((ticket.status || '').toUpperCase())).length,
          closedTickets: ticketList.filter((ticket) => closedStatuses.includes((ticket.status || '').toUpperCase())).length
        } satisfies DashboardStats;
      })
    );
  }

  getDailyTicketCounts(): Observable<DailyTicketCount[]> {
    return this.http.get<DailyTicketCount[]>(`${this.apiUrl}/dashboard/daily-ticket-counts`);
  }

  // ============ NOTIFICATIONS - EMAIL/SMS (ticket updates) ============
  /**
   * Sends an email notification about a ticket update.
   * Backend contract: POST /api/incidents/notifications/email
   * Body: { to, subject, body, ticketId, eventType }
   */
  sendTicketEmail(payload: {
    to: string;
    subject: string;
    body: string;
    ticketId: number;
    eventType: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/notifications/email`, payload);
  }

  /**
   * Sends an SMS notification about a ticket update.
   * Backend contract: POST /api/incidents/notifications/sms
   * Body: { to, message, ticketId, eventType }
   */
  sendTicketSms(payload: {
    to: string;
    message: string;
    ticketId: number;
    eventType: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/notifications/sms`, payload);
  }

  // ============ LOOKUP DATA ============
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>('/api/locations'); // original endpoint
  }

  getApproachRoads(locationId?: number): Observable<ApproachRoad[]> {
    let params = new HttpParams();
    if (locationId) {
      params = params.set('locationId', locationId.toString());
    }
    return this.http.get<ApproachRoad[]>('/api/approach-roads', { params });
  }

  getDeviceTypes(): Observable<DeviceType[]> {
    return this.http.get<DeviceType[]>('/api/device-types');
  }

  // ============ ADMIN - USER MANAGEMENT ============
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('/api/admin/users');
  }

  updateUser(id: number, userData: UpdateUserRequest): Observable<any> {
    return this.http.put(`/api/admin/users/${id}`, userData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`/api/admin/users/${id}`);
  }

  // ============ FIELD PERSONS CRUD ============
  updateFieldPerson(id: number, name: string, role: string, phone: string): Observable<FieldPerson> {
    return this.http.put<FieldPerson>(`${this.apiUrl}/field-persons/${id}`, { name, role, phone });
  }

  deleteFieldPerson(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/field-persons/${id}`);
  }

  // ============ INCIDENT TYPES CRUD ============
  updateIncidentType(id: number, name: string, active?: boolean): Observable<IncidentType> {
    return this.http.put<IncidentType>(`${this.apiUrl}/incident-types/${id}`, { name, active });
  }

  deleteIncidentType(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/incident-types/${id}`);
  }
getActiveIncidentTypes(): Observable<IncidentType[]> {
  return this.http.get<IncidentType[]>(`${this.apiUrl}/incident-types/active`);
}
  // NOTE: deactivateIncidentType() was removed. It sent { active: false } with
  // no name (or an empty string), which the backend's @NotBlank validation on
  // IncidentTypeRequest.name always rejects. Deactivation now goes through
  // updateIncidentType(id, name, false) instead, reusing the existing name.
  // If a dedicated PATCH /incident-types/{id}/status endpoint is added later
  // (recommended), a lightweight deactivateIncidentType(id) can come back.
}
