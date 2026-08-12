import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { from, map, Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
        username,
        password
      })
      .pipe(
        switchMap(response =>
          from(Preferences.set({ key: 'auth_token', value: response.token })).pipe(
            map(() => response)
          )
        )
      );
  }

  async logout(): Promise<void> {
    await Preferences.remove({ key: 'auth_token' });
    await this.router.navigate(['/login']);
  }

  async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: 'auth_token' });
    return value;
  }

  /**
   * Return a best-effort username extracted from the stored JWT or null.
   */
  async getUsername(): Promise<string | null> {
    try {
      const token = await this.getToken();
      if (!token) return null;
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const payload = parts[1];
      const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
      return json.username || json.preferred_username || json.sub || null;
    } catch (e) {
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }
}
