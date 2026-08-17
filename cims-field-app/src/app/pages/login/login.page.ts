import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSpinner,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
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
    IonItem,
    IonLabel,
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

  constructor(private authService: AuthService, private router: Router) {
    addIcons({ eyeOutline, eyeOffOutline });
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
      next: () => {
        this.isSubmitting = false;
        void this.router.navigate(['/tickets']);
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
