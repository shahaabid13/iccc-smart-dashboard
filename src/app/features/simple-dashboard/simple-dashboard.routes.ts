import { Routes } from '@angular/router';

export const SIMPLE_DASHBOARD_ROUTES: Routes = [
  {
    path: 'events',
    loadChildren: () => import('../events/events.routes').then((m) => m.EVENTS_ROUTES),
  },
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full'
  }
];
