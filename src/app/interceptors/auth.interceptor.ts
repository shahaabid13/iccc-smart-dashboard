import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// ============================================
// LOGIN ENDPOINTS (PUBLIC - NO TOKEN INJECTION)
// ============================================
const LOGIN_ROUTES = [
  '/api/auth/login'
];

// ============================================
// ADMIN PROTECTED ROUTES (NEED ADMIN TOKEN)
// ============================================
const ADMIN_PROTECTED_ROUTES = [
  '/api/auth/',
  '/api/inventory',
  '/api/devices',
  '/api/dashboard',
  '/api/excel-upload',
  '/api/report/',
  '/api/weighbridge/',
  '/api/timeframe/',
  '/api/w_',
  '/api/smc',
];

function isLoginRoute(url: string): boolean {
  return LOGIN_ROUTES.some(route => url.includes(route));
}

function isAdminProtectedRoute(url: string): boolean {
  return ADMIN_PROTECTED_ROUTES.some(route => url.includes(route));
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // ============================================
  // LOGIN ENDPOINTS - NO TOKEN INJECTION
  // ============================================
  if (isLoginRoute(req.url)) {
    console.log('[AUTH] Login endpoint (no token injection):', req.url);
    return next(req);
  }

  // ============================================
  // ADMIN PROTECTED REQUESTS
  // ============================================
  if (isAdminProtectedRoute(req.url)) {
    const adminToken = authService.getToken();
    if (adminToken) {
      console.log('[AUTH] Attaching Admin token for:', req.url);
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${adminToken}`)
      });
      return next(cloned);
    }
    console.warn('[AUTH] No Admin token found for:', req.url);
    return next(req);
  }

  // ============================================
  // PUBLIC ROUTES - NO TOKEN
  // ============================================
  console.log('[AUTH] Public route - no token:', req.url);
  return next(req);
};
