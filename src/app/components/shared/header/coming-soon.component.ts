import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-coming-soon',
  template: `
    <div class="coming-root">
      <div class="coming-card">
        <div class="coming-badge">Coming Soon</div>
        <h2 class="coming-title">This feature is not ready yet</h2>
        <p class="coming-desc">We’re working on it — check back soon. In the meantime you can return to the dashboard.</p>
        <div class="coming-actions">
          <a routerLink="/" class="btn btn-primary">Back to Dashboard</a>
          <a routerLink="/inventory" class="btn btn-outline">View Inventory</a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .coming-root{display:flex;align-items:center;justify-content:center;min-height:60vh;padding:40px}
    .coming-card{max-width:720px;width:100%;background:#fff;border-radius:12px;padding:28px 32px;box-shadow:0 8px 30px rgba(22,42,80,0.06);text-align:center}
    .coming-badge{display:inline-block;padding:6px 10px;border-radius:999px;background:#f0f7ff;color:#0066cc;font-weight:700;margin-bottom:12px}
    .coming-title{font-size:20px;color:#122e52;margin-bottom:8px}
    .coming-desc{color:#556;margin-bottom:18px}
    .coming-actions{display:flex;gap:12px;justify-content:center}
    .btn{display:inline-block;padding:10px 16px;border-radius:8px;text-decoration:none;color:#fff;background:#122e52}
    .btn-outline{background:transparent;color:#122e52;border:1px solid #122e52}
    `
  ]
})
export class ComingSoonComponent {}
