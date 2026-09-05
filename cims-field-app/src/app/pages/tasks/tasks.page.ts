import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent, IonRefresher, IonRefresherContent, IonList, IonItem,
  IonLabel, IonSkeletonText, IonBadge, IonCard, ActionSheetController
} from '@ionic/angular/standalone';
import type { RefresherCustomEvent } from '@ionic/angular/standalone';
import { Subject, finalize, takeUntil } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Task } from '../../models/task';
import { OfflineBannerComponent } from 'src/app/components/offline-banner.component';
import { AppHeaderComponent } from 'src/app/components/app-header.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule, OfflineBannerComponent, AppHeaderComponent,
    IonContent, IonRefresher, IonRefresherContent, IonList, IonItem,
    IonLabel, IonSkeletonText, IonBadge, IonCard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss']
})
export class TasksPage implements OnDestroy, OnInit {
  tasks: Task[] = [];
  history: Task[] = [];
  loading = false;
  selectedTab: 'queue' | 'history' = 'queue';
  private isLoadingInProgress = false;

  /** Emits on destroy to cancel any in-flight request. */
  private readonly destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    console.log('[TasksPage] ngOnInit called');
    this.selectedTab = this.route.snapshot.queryParamMap.get('tab') === 'history' ? 'history' : 'queue';
    this.load();
    this.loadHistory();
  }

  ionViewWillEnter() {
    console.log('[TasksPage] ionViewWillEnter called');
    this.selectedTab = this.route.snapshot.queryParamMap.get('tab') === 'history' ? 'history' : 'queue';
    // Also load here for Ionic page caching - only load if not already loaded recently
    if (!this.tasks || this.tasks.length === 0) {
      this.load();
    }
  }

  load(event?: RefresherCustomEvent) {
    if (this.isLoadingInProgress) {
      console.log('[TasksPage] Load already in progress, skipping duplicate request');
      if (event) event.target.complete();
      return;
    }

    console.log('[TasksPage] Starting load()');
    this.isLoadingInProgress = true;
    this.loading = true;
    this.taskService
      .getMyTasks()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoadingInProgress = false;
          this.loading = false;
          event?.target.complete();
        })
      )
      .subscribe({
        next: data => {
          this.tasks = data;
          this.loadHistory();
        },
        error: (error) => {
          console.error('[TasksPage] Failed to load tasks:', error);
        }
      });
  }

  loadHistory() {
    this.taskService.getMyTaskHistory()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => this.history = data,
        error: () => this.history = []
      });
  }

  trackByTaskId(_index: number, task: Task): number {
    return task.id;
  }

  openTask(task: Task): void {
    // Store the last viewed task ID for menu navigation
    if (task.category !== 'TICKET') {
      sessionStorage.setItem('lastViewedTaskId', String(task.id));
    }
    const route = task.category === 'TICKET' ? ['/tickets', task.id] : ['/tasks', task.id];
    void this.router.navigate(route);
  }

  colorForStatus(status: string): string {
    switch (status) {
      case 'OPEN':
        return 'primary';
      case 'HOLD':
        return 'warning';
      case 'REJECTED':
        return 'danger';
      default: // RESOLVED and any other state
        return 'success';
    }
  }

  async showProfile() {
    const username = await this.authService.getUsername();
    const header = username || 'Account';
    const actionSheet = await this.actionSheetCtrl.create({
      header,
      buttons: [
        {
          text: 'Logout',
          role: 'destructive',
          handler: async () => {
            await this.authService.logout();
          }
        },
        { text: 'Cancel', role: 'cancel' }
      ]
    });
    await actionSheet.present();
  }
}
