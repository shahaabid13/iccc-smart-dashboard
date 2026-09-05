import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { CharteredBikeService } from '../../../services/chartered-bike.service';
import { CharteredBikeStationUI } from '../../../models/chartered-bike';

@Component({
  selector: 'app-pbs-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './pbs-analytics.component.html',
  styleUrls: ['./pbs-analytics.component.scss'],
})
export class PbsAnalyticsComponent implements OnInit {
  stations: CharteredBikeStationUI[] = [];
  statusSummary: Array<{ label: string; count: number; color: string }> = [];
  atRiskStations: CharteredBikeStationUI[] = [];
  selectedPeriod: 'today' | 'week' | 'month' | 'all' | 'custom' = 'all';
  fromDate = '';
  toDate = '';

  @ViewChild('reportSection') reportSection!: ElementRef;

  pieChartData!: ChartConfiguration<'pie'>['data'];
  doughnutChartData!: ChartConfiguration<'doughnut'>['data'];
  barChartData!: ChartConfiguration<'bar'>['data'];

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 12, usePointStyle: true, padding: 16 },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label ?? '';
            const value = context.raw as number;
            return `${label}: ${value} stations`;
          },
        },
      },
    },
  };

  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { boxWidth: 12, usePointStyle: true } },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label ?? '';
            const value = context.raw as number;
            return `${label}: ${value} bikes`;
          },
        },
      },
    },
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y ?? context.parsed}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#6b7280' } },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(15, 108, 255, 0.12)' },
        ticks: { color: '#6b7280' },
      },
    },
  };

  constructor(private service: CharteredBikeService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getStations().subscribe((res: any) => {
      const company = res.data?.[0];
      this.stations = (company?.mapStationDTOs || []).map((s: any) =>
        this.enrichStation(s)
      );
      this.prepareCharts();
    });
  }

  enrichStation(station: any): CharteredBikeStationUI {
    const total = station.bikesTotal || 0;
    const available = station.bikesAvailable || 0;
    const percentage = total ? Math.round((available / total) * 100) : 0;

    let statusLabel = 'Available';
    if (percentage === 0) statusLabel = 'Empty';
    else if (percentage < 25) statusLabel = 'Low Stock';
    else if (percentage < 75) statusLabel = 'Moderate';

    return { ...station, availabilityPercentage: percentage, statusLabel };
  }

  // ================= CHART DATA =================

  prepareCharts() {
    const statusCounts: Record<string, number> = {
      Available: 0,
      Moderate: 0,
      'Low Stock': 0,
      Empty: 0,
    };

    this.stations.forEach((s) => {
      const label = s.statusLabel ?? 'Available';
      statusCounts[label] = (statusCounts[label] ?? 0) + 1;
    });

    this.statusSummary = [
      { label: 'Available', count: statusCounts['Available'], color: '#4CAF50' },
      { label: 'Moderate', count: statusCounts['Moderate'], color: '#FFC107' },
      { label: 'Low Stock', count: statusCounts['Low Stock'], color: '#FF9800' },
      { label: 'Empty', count: statusCounts['Empty'], color: '#F44336' },
    ];

    this.atRiskStations = [...this.stations]
      .filter((s) => s.statusLabel === 'Low Stock' || s.statusLabel === 'Empty')
      .sort((a, b) => (a.availabilityPercentage || 0) - (b.availabilityPercentage || 0))
      .slice(0, 5);

    this.pieChartData = {
      labels: this.statusSummary.map((item) => item.label),
      datasets: [
        {
          data: this.statusSummary.map((item) => item.count),
          backgroundColor: this.statusSummary.map((item) => item.color),
          hoverOffset: 8,
        },
      ],
    };

    const total = this.getTotalFleet();
    const available = this.getTotalAvailable();

    this.doughnutChartData = {
      labels: ['Available', 'In Use'],
      datasets: [
        {
          data: [available, Math.max(total - available, 0)],
          backgroundColor: ['#0f6cff', '#e5e7eb'],
          hoverOffset: 8,
        },
      ],
    };

    const topStations = [...this.stations]
      .sort((a, b) => b.bikesAvailable - a.bikesAvailable)
      .slice(0, 5);

    this.barChartData = {
      labels: topStations.map((s) => s.stationName),
      datasets: [
        {
          label: 'Available Bikes',
          data: topStations.map((s) => s.bikesAvailable),
          backgroundColor: '#0f6cff',
        },
      ],
    };
  }

  // ================= KPI =================

  getTotalFleet() {
    return this.stations.reduce((s, x) => s + (x.bikesTotal || 0), 0);
  }

  getTotalAvailable() {
    return this.stations.reduce((s, x) => s + (x.bikesAvailable || 0), 0);
  }

  getTotalStations() {
    return this.stations.length;
  }

  getAverageAvailability() {
    if (!this.stations.length) {
      return 0;
    }

    const totalPercentage = this.stations.reduce(
      (sum, station) => sum + (station.availabilityPercentage || 0),
      0
    );

    return Math.round(totalPercentage / this.stations.length);
  }

  getCriticalStationCount() {
    return this.stations.filter(
      (station) => station.statusLabel === 'Low Stock' || station.statusLabel === 'Empty'
    ).length;
  }

  getUtilization() {
    const total = this.getTotalFleet();
    return total ? Math.round((this.getTotalAvailable() / total) * 100) : 0;
  }

  getStatusCount(status: string) {
    return this.statusSummary.find((item) => item.label === status)?.count ?? 0;
  }

  onPeriodChange() {
    if (this.selectedPeriod !== 'custom') {
      this.fromDate = '';
      this.toDate = '';
    }
  }

  onCustomDateChange() {
    if (this.fromDate || this.toDate) {
      this.selectedPeriod = 'custom';
    }
  }

  applyFilters() {
    if (this.selectedPeriod === 'custom' && this.fromDate && this.toDate && this.fromDate > this.toDate) {
      const temp = this.fromDate;
      this.fromDate = this.toDate;
      this.toDate = temp;
    }
    // If the data source provided dates, we would filter here before preparing charts.
    this.prepareCharts();
  }

  resetFilters() {
    this.selectedPeriod = 'all';
    this.fromDate = '';
    this.toDate = '';
  }

  getDateRangeLabel(): string {
    if (this.selectedPeriod === 'today') {
      return 'Today';
    }
    if (this.selectedPeriod === 'week') {
      return 'This Week';
    }
    if (this.selectedPeriod === 'month') {
      return 'This Month';
    }
    if (this.selectedPeriod === 'custom') {
      if (this.fromDate && this.toDate) {
        return `${this.fromDate} → ${this.toDate}`;
      }
      if (this.fromDate) {
        return `From ${this.fromDate}`;
      }
      if (this.toDate) {
        return `Until ${this.toDate}`;
      }
      return 'Custom Range';
    }
    return 'All Dates';
  }

  // ================= PDF =================

  async downloadReport() {
    const element = this.reportSection.nativeElement;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = 210;
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 10, width, height);
    const safeLabel = this.getDateRangeLabel().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
    pdf.save(`pbs-report-${safeLabel}-${new Date().toISOString()}.pdf`);
  }
}