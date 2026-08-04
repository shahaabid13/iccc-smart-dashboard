import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/cims.models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = '/api/tasks';

  constructor(private http: HttpClient) { }

  createTask(payload: { title: string; description: string; assignedTo?: number }): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}`, payload);
  }

  getMyTasks(page: number = 0, size: number = 50): Observable<Task[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Task[]>(`${this.apiUrl}/my`, { params });
  }

  getMyTaskHistory(page: number = 0, size: number = 50): Observable<Task[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Task[]>(`${this.apiUrl}/my-history`, { params });
  }

  getAllTasks(page: number = 0, size: number = 20, filters?: any): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    if (filters) {
      if (filters.status) params = params.set('status', filters.status);
      if (filters.assignedToId) params = params.set('assignedToId', filters.assignedToId.toString());
      if (filters.fromDate) params = params.set('fromDate', filters.fromDate);
      if (filters.toDate) params = params.set('toDate', filters.toDate);
    }
    return this.http.get<any>(`${this.apiUrl}`, { params });
  }

  takeAction(taskId: number, action: string, summary?: string): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${taskId}/action`, { action, summary });
  }

  getTaskDetail(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${taskId}`);
  }

  // helper: get assignable users list for Create Task form
  getAssignableUsers(): Observable<any[]> {
    return this.http.get<any[]>('/api/admin/users/assignable');
  }
}
