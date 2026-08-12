import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Task } from '../../models/task';
import { Router } from '@angular/router';
import { OfflineBannerComponent } from 'src/app/components/offline-banner.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [IonicModule, CommonModule, OfflineBannerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss']
})
export class TasksPage {
  tasks: Task[] = [];
  loading = false;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthService
  ) {}

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

  ionViewWillEnter() {
    this.load();
  }

  load(event?: any) {
    this.loading = true;
    this.taskService.getMyTasks().subscribe({
      next: data => {
        this.tasks = data;
        this.loading = false;
        if (event) {
          event.target.complete();
        }
      },
      error: () => {
        this.loading = false;
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  open(task: Task) {
    void this.router.navigate([`/tabs/tasks/${task.id}`]);
  }
}
