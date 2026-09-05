import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add JWT token to requests if available
    const token = this.getToken();
    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:
              return this.handleUnauthorized(request, next);
            case 403:
              return this.handleForbidden(error);
            default:
              return throwError(() => error);
          }
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  private handleUnauthorized(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Redirect to login
    this.clearAuth();
    this.router.navigate(['/auth/login'], {
      queryParams: { returnUrl: this.router.url }
    });
    return throwError(() => new Error('Unauthorized'));
  }

  private handleForbidden(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error('Access denied'));
  }

  private clearAuth(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('token');
  }
}
