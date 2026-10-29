import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonButton, IonHeader, IonIcon, IonLabel, IonToolbar, ModalController, IonFooter, IonMenu, IonMenuToggle, IonList, IonItem, IonContent, IonRouterOutlet, IonAccordionGroup, IonAccordion } from '@ionic/angular/standalone';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { AuthService } from './services/auth.service';
import { FieldReminderService } from './services/field-reminder.service';
import { PendingTicketPromptService } from './services/pending-ticket-prompt.service';

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
  activeTab: 'dashboard' | 'tickets' | 'tasks' = 'dashboard';
  username: string | null = null;
  private sub: Subscription;

  constructor(
    private router: Router, 
    private modalController: ModalController,
    private authService: AuthService,
    private reminderService: FieldReminderService,
    private pendingPromptService: PendingTicketPromptService
  ) {
    this.sub = this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      const url = e.urlAfterRedirects ?? e.url;
      this.showNav = url !== '/login';
      this.showBackButton = /^\/(tickets|tasks)\/[^/]+$/.test(url);
      this.activeTab = url.startsWith('/tasks') ? 'tasks' : url.startsWith('/tickets') ? 'tickets' : 'dashboard';
      this.syncFieldServices(url);
    });
  }

  async ngOnInit(): Promise<void> {
    // Load username from auth service
    this.username = await this.authService.getUsername();
    this.syncFieldServices(this.router.url);
  }

  navigateToTab(tab: string | undefined): void {
    if (tab === 'dashboard' || tab === 'tasks' || tab === 'tickets') {
      void this.router.navigate([`/${tab}`]);
    }
  }

  goBack(): void {
    const route = this.activeTab === 'tasks' ? '/tasks' : this.activeTab === 'tickets' ? '/tickets' : '/dashboard';
    void this.router.navigate([route]);
  }

  async openAbout(): Promise<void> {
    const modal = await this.modalController.create({
      component: AboutComponent,
      cssClass: 'about-modal'
    });
    await modal.present();
  }

  async handleLogout(): Promise<void> {
    this.reminderService.stop(true);
    this.pendingPromptService.stop();
    await this.authService.logout();
  }

  private syncFieldServices(url: string): void {
    if (url.startsWith('/login')) {
      this.reminderService.stop(true);
      this.pendingPromptService.stop();
      return;
    }
    void this.authService.isAuthenticated().then(authenticated => {
      if (!authenticated) return;
      this.reminderService.start();
      this.pendingPromptService.startAfterLogin();
    });
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
