import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // ✅ GET
  get<T>(endpoint: string, params?: Record<string, string>): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params || {} });
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { params: httpParams });
  }

  // ✅ POST (fixed)
  post<T>(endpoint: string, body: any, params?: Record<string, any>): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params || {} });
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, {
      ...this.jsonHeaders(),
      params: httpParams
    });
  }

  // ✅ PUT
  put<T>(endpoint: string, body: any, params?: Record<string, any>): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params || {} });
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, {
      ...this.jsonHeaders(),
      params: httpParams
    });
  }

  // ✅ DELETE
  delete<T>(endpoint: string, params?: Record<string, any>): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params || {} });
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, { params: httpParams });
  }

  // ✅ File download
  getFile(endpoint: string, params?: Record<string, string>): Observable<Blob> {
    const httpParams = new HttpParams({ fromObject: params || {} });
    return this.http.get(`${this.baseUrl}${endpoint}`, {
      params: httpParams,
      responseType: 'blob',
    });
  }

  private jsonHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
}
