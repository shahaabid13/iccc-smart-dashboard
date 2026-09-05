import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-coming-soon',
  template: `
    <main class="coming-soon-page">
      <h1>Coming Soon</h1>
      <p>This feature is not available yet.</p>
      <a routerLink="/home">Return home</a>
    </main>
  `,
  styles: [`
    .coming-soon-page {
      display: grid;
      place-items: center;
      min-height: 60vh;
      padding: 2rem;
      text-align: center;
    }
  `]
})
export class ComingSoonPageComponent {}
