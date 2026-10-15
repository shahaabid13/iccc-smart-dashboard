import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TopDefaulter } from '../../models/cims.models';
import { CimsService } from '../../services/cims.service';

@Component({
  selector: 'app-cims-top-defaulters-widget',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatProgressSpinnerModule],
  template: `
    <section class="defaulters-widget" aria-labelledby="defaulters-title">
      <header class="widget-heading">
        <div><p>CIMS / AGEING</p><h2 id="defaulters-title">Top 3 Defaulters</h2></div>
        <a routerLink="/cims/reports/ageing">Full report <mat-icon>arrow_forward</mat-icon></a>
      </header>
      <div class="widget-state" *ngIf="loading"><mat-spinner diameter="26"></mat-spinner><span>Loading defaulters</span></div>
      <div class="widget-state error" *ngIf="!loading && error"><mat-icon>error_outline</mat-icon><span>Defaulters could not be loaded</span></div>
      <div class="widget-state" *ngIf="!loading && !error && !defaulters.length"><mat-icon>task_alt</mat-icon><span>No defaulters</span></div>
      <ol *ngIf="!loading && !error && defaulters.length">
        <li *ngFor="let user of defaulters; let index = index">
          <a [routerLink]="['/cims/reports/ageing']" [queryParams]="{ userId: user.userId }" class="defaulter-link">
            <span class="rank">{{ index + 1 }}</span>
            <span class="person"><strong>{{ user.userName }}</strong><small>{{ user.openCount }} open tickets</small></span>
            <span class="oldest" [class.age-warn]="user.oldestDays > 7 && user.oldestDays <= 15" [class.age-critical]="user.oldestDays > 15">{{ user.oldestDays }}d</span>
          </a>
        </li>
      </ol>
    </section>
  `,
  styles: [`
    :host { display: block; margin: 0 0 24px; }
    .defaulters-widget { border-top: 3px solid #087e8b; border-bottom: 1px solid #ccd7db; background: #fff; padding: 17px 18px 10px; }
    .widget-heading { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 8px; }
    .widget-heading p { margin: 0 0 3px; color: #087e8b; font-size: .68rem; font-weight: 800; }
    h2 { margin: 0; font-size: 1.15rem; color: #172b3a; }
    .widget-heading a { color: #087e8b; text-decoration: none; display: inline-flex; align-items: center; font-weight: 650; white-space: nowrap; }
    .widget-heading a mat-icon { font-size: 18px; width: 18px; height: 18px; }
    ol { list-style: none; padding: 0; margin: 0; }
    li + li { border-top: 1px solid #e3e9eb; }
    .defaulter-link { display: grid; grid-template-columns: 34px minmax(0, 1fr) auto; align-items: center; gap: 12px; padding: 11px 0; color: inherit; text-decoration: none; }
    .defaulter-link:hover .person strong { color: #087e8b; text-decoration: underline; }
    .rank { width: 28px; height: 28px; display: grid; place-items: center; background: #edf3f4; color: #31515c; border-radius: 50%; font-weight: 800; }
    .person { min-width: 0; display: grid; gap: 3px; }
    .person strong { overflow-wrap: anywhere; }
    .person small { color: #677781; }
    .oldest { padding: 5px 8px; border-radius: 3px; background: #e9f0f1; color: #47606a; font-size: .8rem; font-weight: 750; white-space: nowrap; }
    .oldest.age-warn { background: #fff1cd; color: #885400; }
    .oldest.age-critical { background: #fde2df; color: #9d2929; }
    .widget-state { display: flex; min-height: 82px; justify-content: center; align-items: center; gap: 10px; color: #657680; }
    .widget-state.error { color: #a32b2b; }
    @media (max-width: 420px) { .defaulters-widget { padding: 14px 12px 8px; } .widget-heading { align-items: flex-start; flex-direction: column; } }
  `]
})
export class CimsTopDefaultersWidgetComponent implements OnInit {
  defaulters: TopDefaulter[] = [];
  loading = true;
  error = false;

  constructor(private cimsService: CimsService) {}

  ngOnInit(): void {
    this.cimsService.getTopDefaulters().subscribe({
      next: (rows) => { this.defaulters = rows.slice(0, 3); this.loading = false; },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}