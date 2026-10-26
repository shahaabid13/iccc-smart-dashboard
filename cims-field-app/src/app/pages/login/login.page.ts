import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonSpinner,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { PendingTicketPromptService } from '../../services/pending-ticket-prompt.service';
import { OfflineBannerComponent } from '../../components/offline-banner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OfflineBannerComponent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonInput,
    IonButton,
    IonSpinner,
    IonIcon
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  error = '';
  isSubmitting = false;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private pendingTicketPrompt: PendingTicketPromptService
  ) {
    addIcons({ eyeOutline, eyeOffOutline });
    if (this.route.snapshot.queryParamMap.get('sessionExpired') === 'true') {
      this.error = 'Your session expired after 30 minutes of inactivity. Please sign in again.';
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.error = 'Username and password are required.';
      return;
    }

    this.error = '';
    this.isSubmitting = true;

    const { username, password } = this.form.value;

    if (!username || !password) {
      this.error = 'Username and password are required.';
      this.isSubmitting = false;
      return;
    }

    this.authService.login(username, password).subscribe({
      next: async () => {
        const destination = await this.pendingTicketPrompt.startAfterLogin();
        this.isSubmitting = false;
        if (destination === 'queue') void this.router.navigate(['/tickets']);
        else if (destination !== null) void this.router.navigate(['/tickets', destination]);
        else void this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.isSubmitting = false;
        this.error = 'Login failed. Please check your credentials.';
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}