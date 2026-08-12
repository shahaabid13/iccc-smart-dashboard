import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import { defineCustomElements } from '@ionic/core/loader';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { documentTextOutline, checkmarkDoneOutline, wifiOutline, personCircleOutline } from 'ionicons/icons';

defineCustomElements(window);

addIcons({
  'document-text-outline': documentTextOutline,
  'checkmark-done-outline': checkmarkDoneOutline,
  'wifi-outline': wifiOutline,
  'person-circle-outline': personCircleOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
}).catch(err => console.error(err));