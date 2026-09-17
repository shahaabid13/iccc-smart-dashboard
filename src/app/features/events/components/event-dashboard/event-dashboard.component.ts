import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

interface HourlyAlertBucket {
  hour: string;
  'Licence Plate Recognition': number;
  'Red Light Violation Detection': number;
  'No Helmet': number;
  'Stop Line Violation': number;
}

@Component({
  selector: 'app-event-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatIconModule, NgChartsModule],
  templateUrl: './event-dashboard.component.html',
  styleUrl: './event-dashboard.component.scss'
})
export class EventDashboardComponent {
  title = 'ITMS Event Dashboard';
  lastUpdated = 'Last 24 Hours';

  summary = {
    totalEvents: 387,
    peakHour: '14:00 - 15:00',
    highestAlert: 'Red Light Violation Detection',
    avgPerHour: 16
  };

  alertTypes = [
    'Licence Plate Recognition',
    'Red Light Violation Detection',
    'No Helmet',
    'Stop Line Violation'
  ];

  alertColors: Record<string, string> = {
    'Licence Plate Recognition': '#2f80ed',
    'Red Light Violation Detection': '#ff9f43',
    'No Helmet': '#27ae60',
    'Stop Line Violation': '#a166ff'
  };

  hourlyChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  hourlyChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { boxWidth: 12, usePointStyle: true } },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y ?? context.parsed}`
        }
      }
    },
    scales: {
      x: { stacked: false, grid: { display: false } },
      y: { beginAtZero: true, ticks: { precision: 0 } }
    }
  };

  alertMixChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: []
  };

  alertMixChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { boxWidth: 12, usePointStyle: true } },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`
        }
      }
    }
  };

  hourlyTrend: HourlyAlertBucket[] = [
    { hour: '00:00', 'Licence Plate Recognition': 1, 'Red Light Violation Detection': 3, 'No Helmet': 1, 'Stop Line Violation': 1 },
    { hour: '01:00', 'Licence Plate Recognition': 2, 'Red Light Violation Detection': 4, 'No Helmet': 2, 'Stop Line Violation': 1 },
    { hour: '02:00', 'Licence Plate Recognition': 2, 'Red Light Violation Detection': 5, 'No Helmet': 2, 'Stop Line Violation': 1 },
    { hour: '03:00', 'Licence Plate Recognition': 2, 'Red Light Violation Detection': 4, 'No Helmet': 3, 'Stop Line Violation': 1 },
    { hour: '04:00', 'Licence Plate Recognition': 2, 'Red Light Violation Detection': 3, 'No Helmet': 2, 'Stop Line Violation': 0 },
    { hour: '05:00', 'Licence Plate Recognition': 3, 'Red Light Violation Detection': 5, 'No Helmet': 3, 'Stop Line Violation': 2 },
    { hour: '06:00', 'Licence Plate Recognition': 3, 'Red Light Violation Detection': 6, 'No Helmet': 4, 'Stop Line Violation': 2 },
    { hour: '07:00', 'Licence Plate Recognition': 5, 'Red Light Violation Detection': 8, 'No Helmet': 5, 'Stop Line Violation': 3 },
    { hour: '08:00', 'Licence Plate Recognition': 7, 'Red Light Violation Detection': 10, 'No Helmet': 5, 'Stop Line Violation': 4 },
    { hour: '09:00', 'Licence Plate Recognition': 8, 'Red Light Violation Detection': 12, 'No Helmet': 7, 'Stop Line Violation': 5 },
    { hour: '10:00', 'Licence Plate Recognition': 11, 'Red Light Violation Detection': 13, 'No Helmet': 8, 'Stop Line Violation': 6 },
    { hour: '11:00', 'Licence Plate Recognition': 8, 'Red Light Violation Detection': 14, 'No Helmet': 8, 'Stop Line Violation': 6 },
    { hour: '12:00', 'Licence Plate Recognition': 7, 'Red Light Violation Detection': 12, 'No Helmet': 7, 'Stop Line Violation': 6 },
    { hour: '13:00', 'Licence Plate Recognition': 8, 'Red Light Violation Detection': 11, 'No Helmet': 7, 'Stop Line Violation': 7 },
    { hour: '14:00', 'Licence Plate Recognition': 9, 'Red Light Violation Detection': 13, 'No Helmet': 8, 'Stop Line Violation': 7 },
    { hour: '15:00', 'Licence Plate Recognition': 10, 'Red Light Violation Detection': 14, 'No Helmet': 9, 'Stop Line Violation': 8 },
    { hour: '16:00', 'Licence Plate Recognition': 8, 'Red Light Violation Detection': 13, 'No Helmet': 8, 'Stop Line Violation': 7 },
    { hour: '17:00', 'Licence Plate Recognition': 7, 'Red Light Violation Detection': 11, 'No Helmet': 6, 'Stop Line Violation': 6 },
    { hour: '18:00', 'Licence Plate Recognition': 8, 'Red Light Violation Detection': 12, 'No Helmet': 7, 'Stop Line Violation': 7 },
    { hour: '19:00', 'Licence Plate Recognition': 7, 'Red Light Violation Detection': 10, 'No Helmet': 7, 'Stop Line Violation': 6 },
    { hour: '20:00', 'Licence Plate Recognition': 6, 'Red Light Violation Detection': 9, 'No Helmet': 6, 'Stop Line Violation': 5 },
    { hour: '21:00', 'Licence Plate Recognition': 5, 'Red Light Violation Detection': 7, 'No Helmet': 5, 'Stop Line Violation': 4 },
    { hour: '22:00', 'Licence Plate Recognition': 4, 'Red Light Violation Detection': 6, 'No Helmet': 4, 'Stop Line Violation': 3 },
    { hour: '23:00', 'Licence Plate Recognition': 3, 'Red Light Violation Detection': 5, 'No Helmet': 3, 'Stop Line Violation': 2 }
  ];

  getAlertTotal(alertType: string): number {
    return this.hourlyTrend.reduce((sum, bucket) => sum + (bucket[alertType as keyof HourlyAlertBucket] as unknown as number), 0);
  }

  getMaxHourCount(bucket: HourlyAlertBucket): number {
    return Math.max(
      bucket['Licence Plate Recognition'],
      bucket['Red Light Violation Detection'],
      bucket['No Helmet'],
      bucket['Stop Line Violation']
    );
  }

  getHourlyTotal(bucket: HourlyAlertBucket): number {
    return this.alertTypes.reduce((sum, type) => sum + Number(bucket[type as keyof HourlyAlertBucket]), 0);
  }

  getTypePercentage(alertType: string): number {
    const total = this.getAlertTotal(alertType);
    return Math.min(100, (total / 180) * 100);
  }

  getReadableBarWidth(alertType: string, bucket: HourlyAlertBucket): number {
    const value = Number(bucket[alertType as keyof HourlyAlertBucket]);
    return Math.max(value * 14, 3);
  }

  constructor() {
    this.hourlyChartData = {
      labels: this.hourlyTrend.map(bucket => bucket.hour),
      datasets: this.alertTypes.map(type => ({
        label: type,
        data: this.hourlyTrend.map(bucket => bucket[type as keyof HourlyAlertBucket] as number),
        backgroundColor: this.alertColors[type],
        borderRadius: 4,
        borderSkipped: false
      }))
    };

    this.alertMixChartData = {
      labels: this.alertTypes,
      datasets: [{
        label: 'Alert Type Distribution',
        data: this.alertTypes.map(type => this.getAlertTotal(type)),
        backgroundColor: this.alertTypes.map(type => this.alertColors[type]),
        hoverOffset: 4
      }]
    };
  }
}
