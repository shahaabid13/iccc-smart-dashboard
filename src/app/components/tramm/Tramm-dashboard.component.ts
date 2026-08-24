import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Subscription, interval, startWith, switchMap, catchError, of, Subject } from 'rxjs';
import { TrammService } from '../../services/Tramm.service';
import { JunctionDetails } from '../../models/Tramm.models';

@Component({
  standalone: true,
  selector: 'app-tramm-dashboard',
  imports: [CommonModule, DatePipe],
  templateUrl: './Tramm-dashboard.component.html',
  styleUrls: ['./Tramm-dashboard.component.css']
})
export class TrammDashboardComponent implements OnInit, OnDestroy {
  corridors: string[] = [];
  junctions: string[] = [];

  selectedCorridor: string | null = null;
  selectedJunction: string | null = null;

  junctionDetails: JunctionDetails | null = null;
  lastUpdated: Date | null = null;
  errorMessage: string | null = null;
  loadingCorridors = false;
  loadingJunctions = false;

  private readonly POLL_MS = 10000;
  private pollSub?: Subscription;
  private selectionChanged$ = new Subject<void>();

  constructor(private trammService: TrammService) {}

  ngOnInit(): void {
    this.loadCorridors();
  }

  ngOnDestroy(): void {
    this.pollSub?.unsubscribe();
  }

  loadCorridors(): void {
    this.loadingCorridors = true;
    this.trammService.getCorridors().subscribe({
      next: (res) => {
        this.corridors = res?.alCorridors ?? [];
        this.loadingCorridors = false;
      },
      error: () => {
        this.errorMessage = 'Could not load corridor list.';
        this.loadingCorridors = false;
      }
    });
  }

  onCorridorChange(corridorName: string): void {
    this.selectedCorridor = corridorName;
    this.selectedJunction = null;
    this.junctions = [];
    this.junctionDetails = null;
    this.stopPolling();

    if (!corridorName) return;

    this.loadingJunctions = true;
    this.trammService.getJunctions(corridorName).subscribe({
      next: (res) => {
        this.junctions = res?.alJunctions ?? [];
        this.loadingJunctions = false;
      },
      error: () => {
        this.errorMessage = 'Could not load junctions for this corridor.';
        this.loadingJunctions = false;
      }
    });
  }

  onJunctionChange(junctionName: string): void {
    this.selectedJunction = junctionName;
    this.junctionDetails = null;
    this.stopPolling();

    if (!junctionName || !this.selectedCorridor) return;

    this.startPolling(this.selectedCorridor, junctionName);
  }

  private startPolling(corridorName: string, junctionName: string): void {
    this.pollSub = interval(this.POLL_MS)
      .pipe(
        startWith(0),
        switchMap(() =>
          this.trammService.getJunctionDetails(corridorName, junctionName).pipe(
            catchError(() => {
              this.errorMessage = 'Could not reach junction details endpoint.';
              return of(null);
            })
          )
        )
      )
      .subscribe((data) => {
        if (data) {
          this.junctionDetails = data;
          this.errorMessage = null;
          this.lastUpdated = new Date();
        }
      });
  }

  private stopPolling(): void {
    this.pollSub?.unsubscribe();
    this.pollSub = undefined;
  }

  lampColorClass(color: string): string {
    switch ((color || '').toUpperCase()) {
      case 'RED': return 'lamp-red';
      case 'AMBER': return 'lamp-amber';
      case 'GREEN': return 'lamp-green';
      default: return 'lamp-off';
    }
  }
  lampClasses(lamp: { sLampColor: string; bLampStatus: number }): string[] {
  const isOn = lamp.bLampStatus === 1;
  const colorClass = isOn ? this.lampColorClass(lamp.sLampColor) : 'lamp-off';
  return [colorClass];
}


}