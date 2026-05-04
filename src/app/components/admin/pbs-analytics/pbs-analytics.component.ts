import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { CharteredBikeService } from '../../../services/chartered-bike.service';
import { CharteredBikeStationUI } from '../../../models/chartered-bike';

@Component({
  selector: 'app-pbs-analytics',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './pbs-analytics.component.html',
  styleUrls: ['./pbs-analytics.component.scss'],
})
export class PbsAnalyticsComponent implements OnInit {
  stations: CharteredBikeStationUI[] = [];

  @ViewChild('reportSection') reportSection!: ElementRef;

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

  pieChartData!: ChartConfiguration<'pie'>['data'];
  doughnutChartData!: ChartConfiguration<'doughnut'>['data'];
  barChartData!: ChartConfiguration<'bar'>['data'];

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

    this.pieChartData = {
      labels: Object.keys(statusCounts),
      datasets: [
        {
          data: Object.values(statusCounts),
          backgroundColor: ['#4CAF50', '#FFC107', '#FF9800', '#F44336'],
        },
      ],
    };

    const total = this.getTotalFleet();
    const available = this.getTotalAvailable();

    this.doughnutChartData = {
      labels: ['Available', 'In Use'],
      datasets: [
        {
          data: [available, total - available],
          backgroundColor: ['#0f6cff', '#e5e7eb'],
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

  getUtilization() {
    const total = this.getTotalFleet();
    return total ? Math.round((this.getTotalAvailable() / total) * 100) : 0;
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
    pdf.save(`pbs-report-${new Date().toISOString()}.pdf`);
  }
}