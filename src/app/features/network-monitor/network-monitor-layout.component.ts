import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderSummaryComponent } from './components/header-summary/header-summary.component';

@Component({
  selector: 'app-sdnet-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, HeaderSummaryComponent],
  template: `
    <section class="sdnet-shell">
      <header class="sdnet-toolbar">
        <div class="sdnet-brand">
          <div class="brand-badge">
            <span class="material-symbols-outlined brand-icon">hub</span>
          </div>
          <div class="brand-text">
            <span class="sdnet-eyebrow">ICCC · Srinagar Smart City</span>
            <div class="sdnet-title-wrap">
              <span class="sdnet-title">SD-NET Monitoring</span>
              <span class="live-pill"><span class="live-dot"></span>NOC Live</span>
            </div>
          </div>
        </div>

        <nav class="sdnet-tabs" aria-label="SDNET navigation">
          <a routerLink="/network-monitor/dashboard" routerLinkActive="active">
            <span class="material-symbols-outlined tab-icon">map</span>
            <span>Topology Map</span>
          </a>
          <a routerLink="/network-monitor/devices" routerLinkActive="active">
            <span class="material-symbols-outlined tab-icon">dns</span>
            <span>Device Inventory</span>
          </a>
          <a routerLink="/network-monitor/reports" routerLinkActive="active">
            <span class="material-symbols-outlined tab-icon">query_stats</span>
            <span>SLA &amp; Reports</span>
          </a>
        </nav>

        <app-sdnet-header-summary class="sdnet-summary"></app-sdnet-header-summary>
      </header>
      <main class="sdnet-content"><router-outlet></router-outlet></main>
    </section>
  `,
  styles: [`
    :host { display: block; height: 100%; }
    .sdnet-shell {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--sdnet-bg-deep);
      color: var(--sdnet-text);
      font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    .sdnet-toolbar {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 10px 24px;
      border-bottom: 1px solid var(--sdnet-border);
      background: var(--sdnet-bg-panel);
      box-shadow: 0 1px 4px rgba(15, 23, 42, 0.05);
      flex-wrap: wrap;
      z-index: 10;
    }
    .sdnet-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.28);
    }
    .brand-icon { font-size: 22px; }
    .brand-text { display: flex; flex-direction: column; }
    .sdnet-eyebrow {
      color: var(--sdnet-text-dim);
      font-size: 10px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 700;
    }
    .sdnet-title-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .sdnet-title {
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -0.01em;
      color: var(--sdnet-text);
    }
    .live-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: var(--sdnet-up-bg);
      border: 1px solid var(--sdnet-up-border);
      color: var(--sdnet-up);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      padding: 1px 7px;
      border-radius: 9999px;
    }
    .live-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--sdnet-up);
      animation: live-blink 1.5s infinite;
    }
    @keyframes live-blink { 50% { opacity: 0.3; } }

    .sdnet-tabs {
      display: flex;
      align-items: center;
      gap: 4px;
      background: #f1f5f9;
      padding: 3px;
      border-radius: 10px;
      border: 1px solid #e2e8f0;
    }
    .sdnet-tabs a {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--sdnet-text-muted);
      text-decoration: none;
      padding: 6px 14px;
      border-radius: 7px;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.15s ease-in-out;
    }
    .tab-icon { font-size: 18px; }
    .sdnet-tabs a:hover {
      color: var(--sdnet-accent);
      background: rgba(255, 255, 255, 0.6);
    }
    .sdnet-tabs a.active {
      background: #ffffff;
      color: var(--sdnet-accent);
      font-weight: 600;
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
    }

    .sdnet-summary { margin-left: auto; }
    .sdnet-content { display: flex; flex: 1; min-height: 0; }

    @media (max-width: 1024px) {
      .sdnet-summary { width: 100%; margin-left: 0; }
    }
  `]
})
export class NetworkMonitorLayoutComponent {}
