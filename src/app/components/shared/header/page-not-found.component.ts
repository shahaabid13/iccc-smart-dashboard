import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-page-not-found',
  template: `
    <div class="p404-root">
      <div class="p404-card">
        <div class="p404-code">404</div>
        <div class="p404-title">Page Not Found</div>
        <div class="p404-desc">The page you are looking for doesn't exist or has been moved.</div>
        <div class="p404-actions">
          <a routerLink="/" class="btn btn-primary">Go Home</a>
          <a routerLink="/inventory" class="btn btn-outline">View Inventory</a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .p404-root{display:flex;align-items:center;justify-content:center;min-height:60vh;padding:40px}
    .p404-card{max-width:720px;width:100%;background:#fff;border-radius:12px;padding:32px 36px;box-shadow:0 8px 30px rgba(22,42,80,0.08);text-align:center}
    .p404-code{font-size:88px;font-weight:800;color:#122e52;margin-bottom:4px}
    .p404-title{font-size:22px;font-weight:700;color:#122e52;margin-bottom:8px}
    .p404-desc{color:#556; margin-bottom:20px}
    .p404-actions{display:flex;gap:12px;justify-content:center}
    .btn{display:inline-block;padding:10px 16px;border-radius:8px;text-decoration:none;color:#fff;background:#122e52}
    .btn-outline{background:transparent;color:#122e52;border:1px solid #122e52}
    `
  ]
})
export class PageNotFoundComponent {}
