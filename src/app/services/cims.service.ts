import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  UpdateUserRequest
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

  acknowledgeTicket(id: number, notes: string): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/tickets/${id}/acknowledge`, { notes });
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

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`);
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
