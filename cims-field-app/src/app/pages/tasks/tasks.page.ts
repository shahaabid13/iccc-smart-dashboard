import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
  IonContent, IonRefresher, IonRefresherContent, IonList, IonItem,
  IonLabel, IonSkeletonText, IonBadge, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent,
  ActionSheetController
} from '@ionic/angular/standalone';
import type { RefresherCustomEvent } from '@ionic/angular/standalone';
import { Subject, finalize, takeUntil } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Task } from '../../models/task';
import { OfflineBannerComponent } from 'src/app/components/offline-banner.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule, RouterLink, OfflineBannerComponent,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
    IonContent, IonRefresher, IonRefresherContent, IonList, IonItem,
    IonLabel, IonSkeletonText, IonBadge, IonCard, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonCardContent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss']
})
export class TasksPage implements OnDestroy, OnInit {
  tasks: Task[] = [];
  loading = false;
  private isLoadingInProgress = false;

  /** Emits on destroy to cancel any in-flight request. */
  private readonly destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthService
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    console.log('[TasksPage] ngOnInit called');
    this.load();
  }

  ionViewWillEnter() {
    console.log('[TasksPage] ionViewWillEnter called');
    // Also load here for Ionic page caching - only load if not already loaded recently
    if (!this.tasks || this.tasks.length === 0) {
      this.load();
    }
  }

  load(event?: RefresherCustomEvent) {
    // Prevent simultaneous duplicate requests
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
          console.log('[TasksPage] Received data:', data);
          console.log('[TasksPage] Data length:', data?.length);
          this.tasks = data;
        },
        error: (error) => {
          console.error('[TasksPage] Failed to load tasks:', error);
        }
      });
  }

  trackByTaskId(_index: number, task: Task): number {
    return task.id;
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
