import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAgency(): boolean {
    throw new Error('Method not implemented.');
  }
  getUserAgency(): string {
    throw new Error('Method not implemented.');
  }
  getUserRole(): string {
    throw new Error('Method not implemented.');
  }
  resetPassword(email: string, newPassword: string) {
    throw new Error('Method not implemented.');
  }
  verifyEmail(email: string) {
    throw new Error('Method not implemented.');
  }
  /** ------------------------
   * API BASE URL
   * ------------------------- */
  private apiUrl = '/api/auth'; // ✅ Spring Boot backend

  /** ------------------------
   * USER STATE MANAGEMENT
   * ------------------------- */
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  /** ------------------------
   * LOGIN FUNCTION (from backend)
   * ------------------------- */
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((res: any) => {
        // ✅ Save credentials
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('username', res.username);

        // ✅ Save user session
        const user: User = {
          id: res.username,
          username: res.username,
          email: `${res.username}@app.local`,
          role: res.role
        };
        this.setCurrentUser(user);
      }),
      catchError((err) => {
        console.error('Login failed:', err);
        return throwError(() => err);
      })
    );
  }

  /** ------------------------
   * REGISTER FUNCTION (if backend supports it)
   * ------------------------- */
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, user).pipe(
      tap((res: any) => {
        if (res?.token) this.setToken(res.token);
        if (res?.user) this.setCurrentUser(res.user);
      }),
      catchError((err) => {
        console.error('Registration error:', err);
        return throwError(() => err);
      })
    );
  }

  /** ------------------------
   * LOGOUT FUNCTION
   * ------------------------- */
 // ✅ FIX - Only clear admin-specific keys
logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('username');
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}

  /** ------------------------
   * TOKEN + ROLE MANAGEMENT
   * ------------------------- */
  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private setRole(role: string): void {
    localStorage.setItem('role', role);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getAgencyName(): string | null {
    return localStorage.getItem('agencyName');
  }

  /** ------------------------
   * USER STATE MANAGEMENT
   * ------------------------- */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRole()?.toLowerCase() === 'admin';
  }


  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  /**
   * DEVELOPMENT ONLY: Auto-generate a test token for development/testing
   * This bypasses the need to login to test the weighbridge module
   */
  initializeDevToken(): void {
    if (!this.getToken()) {
      const devToken = 'dev-test-token-' + Date.now();
      localStorage.setItem('token', devToken);
      localStorage.setItem('role', 'admin');
      console.log('✅ [DEV] Test token created for weighbridge testing');
      console.log('   Token:', devToken);
    }
  }
}
