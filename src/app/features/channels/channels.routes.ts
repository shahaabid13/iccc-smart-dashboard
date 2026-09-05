import { Routes } from '@angular/router';
import { ChannelsListComponent } from './components/channels-list/channels-list.component';
import { ChannelsMapComponent } from './components/channels-map/channels-map.component';

export const CHANNELS_ROUTES: Routes = [
  {
    path: 'list',
    component: ChannelsListComponent,
    data: { title: 'Channels List' }
  },
  {
    path: 'map',
    component: ChannelsMapComponent,
    data: { title: 'Channels Map' }
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];
