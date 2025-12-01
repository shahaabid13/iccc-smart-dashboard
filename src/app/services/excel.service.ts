import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExcelService {
  private apiUrl = 'http://localhost:8080/api/excel'; // ✅ adjust if backend URL differs

  constructor(private http: HttpClient) {}

  upload(fileData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, fileData);
  }
}
