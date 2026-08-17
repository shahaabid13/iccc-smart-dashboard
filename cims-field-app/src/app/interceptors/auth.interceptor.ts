import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { from, catchError, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    // Skip auth header for login requests to prevent double login
    if (req.url.includes('/api/auth/login')) {
      console.log('[AuthInterceptor] Skipping auth header for login request');
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService.logout();
            void this.router.navigate(['/login']);
          }
          return throwError(() => error);
        })
      );
    }

    // For other requests, add auth header if token exists
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        console.log('[AuthInterceptor] Adding auth header, token exists:', !!token);
        const authReq = token
          ? req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            })
          : req;

        return next.handle(authReq).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              console.log('[AuthInterceptor] Got 401, logging out');
              this.authService.logout();
              void this.router.navigate(['/login']);
            }
            return throwError(() => error);
          })
        );
      })
    );
  }
}
