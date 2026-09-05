import { Injectable } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * Standalone Auth Guard using functional approach
 * Guards routes requiring authentication
 */
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean => {
  const router = new Router();

  // Check for token in localStorage or sessionStorage
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  if (token) {
    return true;
  }

  // Redirect to login if no token
  const routerService = router.get(Router) as Router;
  routerService?.navigate(['/auth/login'], {
    queryParams: { returnUrl: state.url }
  });

  return false;
};

/**
 * Admin Guard - validates admin role
 */
export const adminGuard: CanActivateFn = (): Observable<boolean> | Promise<boolean> | boolean => {
  const user = localStorage.getItem('currentUser');
  if (user) {
    try {
      const userData = JSON.parse(user);
      return userData.roles?.includes('ADMIN') || userData.role === 'ADMIN';
    } catch {
      return false;
    }
  }
  return false;
};

/**
 * Service-based Auth Guard (alternative if using injectable)
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (token) {
      return true;
    }

    this.router.navigate(['/auth/login']);
    return false;
  }
}
