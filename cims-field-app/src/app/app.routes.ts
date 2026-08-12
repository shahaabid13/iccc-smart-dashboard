import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginPage } from './pages/login/login.page';
import { TabsPage } from './pages/tabs/tabs.page';
import { TicketsPage } from './pages/tickets/tickets.page';
import { TicketDetailPage } from './pages/tickets/ticket-detail.page';
import { TasksPage } from './pages/tasks/tasks.page';
import { TaskDetailPage } from './pages/tasks/task-detail.page';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tickets',
        component: TicketsPage
      },
      {
        path: 'tickets/:id',
        component: TicketDetailPage
      },
      {
        path: 'tasks',
        component: TasksPage
      },
      {
        path: 'tasks/:id',
        component: TaskDetailPage
      },
      {
        path: '',
        redirectTo: 'tickets',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'tabs'
  }
];
