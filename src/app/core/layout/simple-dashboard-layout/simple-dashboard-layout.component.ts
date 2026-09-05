import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../features/auth/services/auth.service';
import { AuthUser } from '../../../shared/models';

@Component({
  selector: 'app-simple-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './simple-dashboard-layout.component.html',
  styleUrl: './simple-dashboard-layout.component.scss'
})
export class SimpleDashboardLayoutComponent {
  currentUser = signal<AuthUser | null>(null);

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    effect(() => {
      this.currentUser.set(this.authService.getCurrentUser());
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/traffic-dashboard/auth/login']);
    this.snackBar.open('Logged out successfully', 'Close', { duration: 3000 });
  }
}
