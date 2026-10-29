import { Routes } from '@angular/router';

export const EVENTS_ROUTES: Routes = [
  {
    path: 'dashboard',
    redirectTo: '/itms/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'search',
    redirectTo: '/itms/events',
    pathMatch: 'full'
  },
  {
    path: 'results',
    redirectTo: '/itms/events',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/itms/dashboard',
    pathMatch: 'full'
  }
];
