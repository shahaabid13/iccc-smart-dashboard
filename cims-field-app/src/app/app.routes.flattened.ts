import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginPage } from './pages/login/login.page';
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
    redirectTo: 'tickets',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'tickets'
  }
];
