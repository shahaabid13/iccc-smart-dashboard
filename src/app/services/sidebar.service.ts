import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  sidebarCollapsed = signal(false);
  isMobile = signal(false);

  toggleSidebar(state?: boolean) {
    if (state !== undefined) {
      this.sidebarCollapsed.set(state);
    } else {
      this.sidebarCollapsed.update(val => !val);
    }
  }

  setSidebarState(state: boolean) {
    this.sidebarCollapsed.set(state);
  }

  setMobileState(isMobile: boolean) {
    this.isMobile.set(isMobile);
  }
}
