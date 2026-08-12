import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OfflineService {
  private isOnlineSubject = new BehaviorSubject(true);
  isOnline$ = this.isOnlineSubject.asObservable();

  constructor() {
    this.initNetworkListener();
  }

  private async initNetworkListener() {
    const status = await Network.getStatus();
    this.isOnlineSubject.next(status.connected);

    Network.addListener('networkStatusChange', status => {
      this.isOnlineSubject.next(status.connected);
    });
  }

  isOnline(): Promise<boolean> {
    return Network.getStatus().then(s => s.connected);
  }
}
