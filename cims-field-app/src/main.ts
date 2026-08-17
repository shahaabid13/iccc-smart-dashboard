import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { routes } from './app/app.routes.flattened';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { IonicRouteStrategy } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { defineCustomElements } from '@ionic/core/loader';
import { documentTextOutline, checkmarkDoneOutline, wifiOutline, personCircleOutline } from 'ionicons/icons';

defineCustomElements(window);

addIcons({
  'document-text-outline': documentTextOutline,
  'checkmark-done-outline': checkmarkDoneOutline,
  'wifi-outline': wifiOutline,
  'wifi-off-outline': wifiOutline,
  'person-circle-outline': personCircleOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
}).catch(err => console.error(err));