import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginPage } from './pages/login/login.page';
import { TicketsPage } from './pages/tickets/tickets.page';
import { TicketDetailPage } from './pages/tickets/ticket-detail.page';
import { TasksPage } from './pages/tasks/tasks.page';
import { TaskDetailPage } from './pages/tasks/task-detail.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'dashboard',
    component: DashboardPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'tickets',
    component: TicketsPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'tickets/:id',
    component: TicketDetailPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks',
    component: TasksPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks/:id',
    component: TaskDetailPage,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];