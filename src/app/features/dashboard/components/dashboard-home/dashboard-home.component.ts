import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {
  dashboardCards = [
    {
      title: 'Channels',
      description: 'View and manage video channels',
      icon: 'video_camera_front',
      action: 'Browse Channels',
      route: '/traffic-dashboard/dashboard/channels/list',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Map View',
      description: 'View channels on an interactive map',
      icon: 'map',
      action: 'Open Map',
      route: '/traffic-dashboard/dashboard/channels/map',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Event Search',
      description: 'Search and analyze events from cameras',
      icon: 'search',
      action: 'Search Events',
      route: '/traffic-dashboard/dashboard/events/search',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Event Results',
      description: 'View detailed event results and analytics',
      icon: 'table_chart',
      action: 'View Results',
      route: '/traffic-dashboard/dashboard/events/results',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'ITMS',
      description: 'Intelligent Traffic Management System',
      icon: 'directions_transit',
      action: 'Manage ITMS',
      route: '/traffic-dashboard/dashboard/itms',
      bgColor: 'bg-red-50'
    }
  ];
}
