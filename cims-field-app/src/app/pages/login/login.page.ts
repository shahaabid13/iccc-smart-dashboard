import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, IonItem, IonLabel, IonList, IonToast } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OfflineBannerComponent } from '../../components/offline-banner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, OfflineBannerComponent ],
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

  constructor(private authService: AuthService, private router: Router) {}

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
        void this.router.navigate(['/tabs']);
      },
      error: () => {
        this.isSubmitting = false;
        this.error = 'Login failed. Please check your credentials.';
      }
    });
  }
}
