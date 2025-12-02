import { Component, signal, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component';
import { WeighbridgeChartsComponent } from './components/admin/smc-dashboard/weighbridge-charts.component';
import { CommonModule } from '@angular/common';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('inventory-management');

  constructor(private sidebarService: SidebarService) {
    // Effect to update content wrapper padding based on sidebar state
    effect(() => {
      const isCollapsed = this.sidebarService.sidebarCollapsed();
      const isMobile = this.sidebarService.isMobile();
      const contentWrapper = document.querySelector('.content-wrapper');
      
      if (contentWrapper) {
        if (isMobile) {
          (contentWrapper as HTMLElement).style.paddingLeft = '0';
        } else {
          (contentWrapper as HTMLElement).style.paddingLeft = isCollapsed ? '70px' : '250px';
        }
      }
    });
  }
}
