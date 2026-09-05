import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonButton, IonHeader, IonIcon, IonLabel, IonToolbar, ModalController, IonFooter, IonMenu, IonMenuToggle, IonList, IonItem, IonContent, IonRouterOutlet, IonAccordionGroup, IonAccordion } from '@ionic/angular/standalone';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    RouterLinkActive,
    IonButton, 
    IonHeader, 
    IonIcon, 
    IonLabel, 
    IonToolbar,
    IonFooter,
    IonMenu,
    IonMenuToggle,
    IonList,
    IonItem,
    IonContent,
    IonRouterOutlet,
    IonAccordionGroup,
    IonAccordion
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  showNav = true;
  showBackButton = false;
  activeTab: 'tickets' | 'tasks' = 'tickets';
  username: string | null = null;
  private sub: Subscription;

  constructor(
    private router: Router, 
    private modalController: ModalController,
    private authService: AuthService
  ) {
    this.sub = this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      const url = e.urlAfterRedirects ?? e.url;
      this.showNav = url !== '/login';
      this.showBackButton = /^\/(tickets|tasks)\/[^/]+$/.test(url);
      this.activeTab = url.startsWith('/tasks') ? 'tasks' : 'tickets';
    });
  }

  async ngOnInit(): Promise<void> {
    // Load username from auth service
    this.username = await this.authService.getUsername();
  }

  navigateToTab(tab: string | undefined): void {
    if (tab === 'tasks' || tab === 'tickets') {
      void this.router.navigate([`/${tab}`]);
    }
  }

  goBack(): void {
    void this.router.navigate([this.activeTab === 'tasks' ? '/tasks' : '/tickets']);
  }

  async openAbout(): Promise<void> {
    const modal = await this.modalController.create({
      component: AboutComponent,
      cssClass: 'about-modal'
    });
    await modal.present();
  }

  async handleLogout(): Promise<void> {
    await this.authService.logout();
  }

  navigateToRecentTicketDetail(): void {
    void this.router.navigate(['/tickets'], { queryParams: { tab: 'history' } });
  }

  navigateToRecentTaskDetail(): void {
    void this.router.navigate(['/tasks'], { queryParams: { tab: 'history' } });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
