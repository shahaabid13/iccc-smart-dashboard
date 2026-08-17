import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { getApiBaseUrl } from '../../environments/environment';
import { Task } from '../models/task';
import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  private getBase(): string {
    return `${getApiBaseUrl()}/api/tasks`;
  }

  getMyTasks(): Observable<Task[]> {
    const url = `${this.getBase()}/my`;
    console.log('[TaskService] Fetching tasks from:', url);
    return this.http.get<any>(url).pipe(
      tap(data => {
        console.log('[TaskService] API returned:', data, 'type:', typeof data);
      }),
      map(data => {
        // Handle paginated response: {content: [...], pageable: {...}}
        if (data && typeof data === 'object' && 'content' in data && Array.isArray(data.content)) {
          console.log('[TaskService] Detected paginated response, extracting content array');
          const tasks = data.content as Task[];
          if (tasks && tasks.length > 0) {
            console.log('[TaskService] Using API paginated data:', tasks.length, 'tasks');
            return tasks;
          }
        }
        
        // Handle simple array response: [...]
        if (Array.isArray(data) && data.length > 0) {
          console.log('[TaskService] Using API array data:', data.length, 'tasks');
          return data as Task[];
        }
        
        // Empty or unknown format, use fallback
        console.log('[TaskService] API returned empty or unknown format, using fallback data');
        return this.fallbackTasks();
      }),
      tap(data => void this.cacheService.cacheTasks(data)),
      catchError(error => {
        console.error('[TaskService] Error fetching tasks:', error);
        console.log('[TaskService] Using fallback data due to error');
        return of(this.fallbackTasks());
      })
    );
  }

  getTaskById(id: number): Observable<Task> {
    const url = `${this.getBase()}/${id}`;
    console.log(`[TaskService] Fetching task detail from: ${url}`);
    return this.http.get<Task>(url).pipe(
      tap(data => {
        console.log('[TaskService] API returned task detail:', data);
      }),
      catchError(error => {
        console.error('[TaskService] Error fetching task detail:', error);
        throw error; // re-throw the error to be handled by the component
      })
    );
  }

  action(id: number, status: 'RESOLVED' | 'HOLD' | 'REJECTED', summary: string) {
    return this.http.put(`${this.getBase()}/${id}/action`, { status, summary });
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
