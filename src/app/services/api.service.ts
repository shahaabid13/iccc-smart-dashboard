import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = 'http://localhost:8080/api'; // 🔹 Update if your backend URL changes

  constructor(private http: HttpClient) {}

  /**
   * 🔹 GET request for JSON responses
   */
  get<T>(endpoint: string, params?: Record<string, string>, p0?: { responseType: "json"; }): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params || {} });
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { params: httpParams });
  }

  /**
   * 🔹 POST request for JSON data
   */
  post<T>(url: string, body: any, params?: Record<string, any>): Observable<T> {
  return this.http.post<T>(`${this.baseUrl}${url}`, body, { params });
}


  /**
   * 🔹 PUT request for updating data
   */
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, this.jsonHeaders());
  }

  /**
   * 🔹 DELETE request
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
  }

  /**
   * 🔹 GET request for file download (Excel / PDF / Word)
   * Automatically handles Blob responses.
   */
  getFile(endpoint: string, params?: Record<string, string>): Observable<Blob> {
    const httpParams = new HttpParams({ fromObject: params || {} });
    return this.http.get(`${this.baseUrl}${endpoint}`, {
      params: httpParams,
      responseType: 'blob',
    });
  }

  /**
   * 🔹 Common JSON headers helper
   */
  private jsonHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
}
