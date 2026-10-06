import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export const SESSION_INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private inactivityTimer: ReturnType<typeof setTimeout> | null = null;
  private lastActivityAt = 0;
  private expiryHandled = false;
  private readonly activityEvents = ['mousedown', 'mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
  private readonly activityHandler = () => this.recordActivity();
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

  constructor(private http: HttpClient, private router: Router) {
    const savedUser = this.getSessionValue('currentUser');
    if (savedUser) {
      try {
        this.currentUserSubject.next(JSON.parse(savedUser));
      } catch {
        this.removeSessionValue('currentUser');
      }
    }
    this.installActivityListeners();
    if (this.isAuthenticated()) this.recordActivity();
  }

  /** ------------------------
   * LOGIN FUNCTION (from backend)
   * ------------------------- */
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((res: any) => {
        this.setSessionValue('token', res.token);
        this.setSessionValue('role', res.role);
        this.setSessionValue('username', res.username);
        if (res.permissions) this.setSessionValue('permissions', JSON.stringify(res.permissions));

        // ✅ Save user session
        const user: User = {
          id: res.username,
          username: res.username,
          email: `${res.username}@app.local`,
          role: res.role
        };
        this.setCurrentUser(user);
        this.expiryHandled = false;
        this.recordActivity();
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
  this.clearSession();
  this.currentUserSubject.next(null);
}

  expireSession(): void {
    if (this.expiryHandled) return;
    this.expiryHandled = true;
    this.clearSession();
    this.currentUserSubject.next(null);
    void this.router.navigate(['/login'], { queryParams: { sessionExpired: 'true' } });
  }

  private clearSession(): void {
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    this.inactivityTimer = null;
    this.lastActivityAt = 0;
    if (typeof window !== 'undefined') window.sessionStorage.clear();
  }

  private installActivityListeners(): void {
    if (typeof document === 'undefined') return;
    for (const eventName of this.activityEvents) {
      document.addEventListener(eventName, this.activityHandler, { passive: true });
    }
  }

  recordActivity(): void {
    if (!this.isAuthenticated() || typeof window === 'undefined') return;
    this.lastActivityAt = Date.now();
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      const remaining = SESSION_INACTIVITY_TIMEOUT_MS - (Date.now() - this.lastActivityAt);
      if (remaining > 0) {
        this.inactivityTimer = setTimeout(() => this.expireSession(), remaining);
        return;
      }
      this.expireSession();
    }, SESSION_INACTIVITY_TIMEOUT_MS);
  }

  /** ------------------------
   * TOKEN + ROLE MANAGEMENT
   * ------------------------- */
  private setToken(token: string): void {
    this.setSessionValue('token', token);
  }

  getToken(): string | null {
    return this.getSessionValue('token');
  }

  private setRole(role: string): void {
    this.setSessionValue('role', role);
  }

  getRole(): string | null {
    return this.getSessionValue('role');
  }

  getAgencyName(): string | null {
    return this.getSessionValue('agencyName');
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
    this.setSessionValue('currentUser', JSON.stringify(user));
    this.setSessionValue('username', user.username);
    if (user.role) this.setSessionValue('role', user.role);
    this.currentUserSubject.next(user);
  }

  private getSessionValue(key: string): string | null {
    return typeof window === 'undefined' ? null : window.sessionStorage.getItem(key);
  }

  private setSessionValue(key: string, value: string): void {
    if (typeof window !== 'undefined') window.sessionStorage.setItem(key, value);
  }

  private removeSessionValue(key: string): void {
    if (typeof window !== 'undefined') window.sessionStorage.removeItem(key);
  }

  /**
   * DEVELOPMENT ONLY: Auto-generate a test token for development/testing
   * This bypasses the need to login to test the weighbridge module
   */
  initializeDevToken(): void {
    if (!this.getToken()) {
      const devToken = 'dev-test-token-' + Date.now();
      this.setSessionValue('token', devToken);
      this.setSessionValue('role', 'admin');
      this.recordActivity();
      console.log('✅ [DEV] Test token created for weighbridge testing');
      console.log('   Token:', devToken);
    }
  }
}
