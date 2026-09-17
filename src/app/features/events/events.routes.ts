import { Routes } from '@angular/router';
import { EventSearchComponent } from './components/event-search/event-search.component';
import { EventResultsComponent } from './components/event-results/event-results.component';
import { EventDashboardComponent } from './components/event-dashboard/event-dashboard.component';

export const EVENTS_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: EventDashboardComponent,
    data: { title: 'ITMS Event Dashboard' }
  },
  {
    path: 'search',
    component: EventSearchComponent,
    data: { title: 'Search Events' }
  },
  {
    path: 'results',
    component: EventResultsComponent,
    data: { title: 'Event Results' }
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
