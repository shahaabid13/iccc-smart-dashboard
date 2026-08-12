import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Task } from '../models/task';
import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private base = `${environment.apiBaseUrl}/api/tasks`;

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getMyTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.base}/my`).pipe(
      tap(data => void this.cacheService.cacheTasks(data)),
      catchError(() => of(this.fallbackTasks()))
    );
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.base}/${id}`);
  }

  action(id: number, status: 'RESOLVED' | 'HOLD' | 'REJECTED', summary: string) {
    return this.http.put(`${this.base}/${id}/action`, { status, summary });
  }

  private fallbackTasks(): Task[] {
    return [
      {
        id: 101,
        title: 'Verify camera installation',
        description: 'Confirm newly installed cameras are tracking correctly.',
        status: 'OPEN',
        createdAt: '2026-08-10T08:00:00',
        updatedAt: '2026-08-10T08:30:00'
      },
      {
        id: 102,
        title: 'Replace faulty sensor',
        description: 'Swap the damaged sensor on zone 4 and retest readings.',
        status: 'HOLD',
        createdAt: '2026-08-09T11:00:00',
        updatedAt: '2026-08-09T12:45:00'
      }
    ];
  }
}
