import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Network } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-offline-banner',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <div class="offline-banner" *ngIf="!(isOnline$ | async)">
      <ion-icon name="wifi-off-outline"></ion-icon>
      <span>You are offline. Changes will sync when connection is restored.</span>
    </div>
  `,
  styles: [`
    .offline-banner {
      display: flex;
      align-items: center;
      gap: 8px;
      background-color: var(--ion-color-warning);
      color: white;
      padding: 12px;
      font-size: 14px;
    }
    ion-icon {
      font-size: 18px;
    }
  `]
})
export class OfflineBannerComponent {
  isOnline$ = new BehaviorSubject<boolean>(true).asObservable();

  constructor() {
    const subject = new BehaviorSubject<boolean>(true);
    this.isOnline$ = subject.asObservable();

    Network.getStatus().then(s => subject.next(s.connected));
    Network.addListener('networkStatusChange', status => subject.next(status.connected));
  }
}
