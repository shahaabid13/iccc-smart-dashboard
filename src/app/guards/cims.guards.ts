import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CimsSupportEngineerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.authService.getRole()?.toUpperCase();
    if (role === 'SUPPORT_ENGINEER') {
      return true;
    }
    // Unauthorized - redirect to login
    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CimsFieldPersonGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.authService.getRole()?.toUpperCase();
    if (role === 'FIELD_PERSON') {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CimsReviewerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.authService.getRole()?.toUpperCase();
    if (role === 'REVIEWER') {
      return true;
    }
    // Unauthorized - redirect to login
    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CimsAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.authService.getRole()?.toUpperCase();
    if (role === 'ADMIN') {
      return true;
    }
    // Unauthorized - redirect to login
    this.router.navigate(['/login']);
    return false;
  }
}

/**
 * Allows access for any CIMS role (SUPPORT_ENGINEER, FIELD_PERSON,
 * COORDINATOR, REVIEWER, ADMIN). Used for notification settings.
 */
@Injectable({
  providedIn: 'root'
})
export class CimsNotificationGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.authService.getRole()?.toUpperCase() ?? '';
    const allowed = ['SUPPORT_ENGINEER', 'FIELD_PERSON', 'COORDINATOR', 'REVIEWER', 'ADMIN'];
    if (allowed.includes(role)) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CimsTaskGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.authService.getRole()?.toUpperCase() ?? '';
    const allowed = ['SUPPORT_ENGINEER', 'REVIEWER', 'ADMIN'];
    if (allowed.includes(role)) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CimsTaskCreateGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.authService.getRole()?.toUpperCase() ?? '';
    const allowed = ['ADMIN', 'REVIEWER'];
    if (allowed.includes(role)) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
