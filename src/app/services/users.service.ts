import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private api: ApiService) {}
  private apiUrl = 'http://localhost:8080/api/auth';

  createUser(params: Record<string, any>): Observable<any> {
    // backend expects query params according to the spec
    return this.api.post('/auth/create', null, params);
  }

  list(): Observable<any[]> {
    return this.api.get<any[]>('/auth/users');
  }
}
