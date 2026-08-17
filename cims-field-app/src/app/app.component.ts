import { Component, OnDestroy } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgIf, RouterOutlet, RouterLink, RouterLinkActive, IonIcon],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  showNav = true;
  private sub: Subscription;

  constructor(private router: Router) {
    this.sub = this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      const url = e.urlAfterRedirects ?? e.url;
      this.showNav = url !== '/login';
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
