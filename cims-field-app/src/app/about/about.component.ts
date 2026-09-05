import { Component } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  ModalController
} from '@ionic/angular/standalone';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button aria-label="Back" (click)="close()">
            <ion-icon slot="icon-only" name="arrow-back-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>About</ion-title>
        <ion-buttons slot="end">
          <ion-button aria-label="Close About" (click)="close()">
            <ion-icon slot="icon-only" name="close-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="about-content">
        <div class="app-mark" aria-hidden="true">
          <ion-icon name="shield-checkmark-outline"></ion-icon>
        </div>

        <ion-card>
          <ion-card-header>
            <ion-card-title>CIMS Field App</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            This app helps field teams manage tasks, tickets, and dashboards efficiently.
          </ion-card-content>
        </ion-card>

        <ion-list inset="true">
          <ion-item>
            <ion-label>
              <h3>Version</h3>
              <p>v{{ version }}</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              <h3>Developed by</h3>
              <p>MSP Developer Team</p>
            </ion-label>
          </ion-item>
        </ion-list>

        <p class="support">For support, contact your system administrator.</p>
        <p class="brand-footer">ICCC Smart City Srinagar J&amp;K</p>
      </div>
    </ion-content>
  `,
  styles: [`
    :host {
      display: block;
    }

    ion-content {
      --background: var(--ion-background-color);
    }

    .about-content {
      max-width: 560px;
      margin: 0 auto;
      padding: 24px 16px calc(56px + env(safe-area-inset-bottom, 0px));
    }

    .app-mark {
      display: grid;
      width: 76px;
      height: 76px;
      margin: 8px auto 20px;
      place-items: center;
      border-radius: 20px;
      background: var(--ion-color-primary);
      color: var(--ion-color-primary-contrast);
    }

    .app-mark ion-icon {
      font-size: 42px;
    }

    ion-card {
      margin: 0 0 16px;
    }

    ion-card-title {
      font-size: 1.35rem;
    }

    ion-item h3 {
      margin: 0 0 4px;
      font-weight: 700;
    }

    ion-item p,
    .support {
      color: var(--ion-color-medium-shade);
    }

    .support {
      margin: 20px 8px 0;
      text-align: center;
      font-size: 0.9rem;
    }

    .brand-footer {
      margin: 8px 8px 12px;
      text-align: center;
      color: var(--ion-color-primary);
      font-size: 0.85rem;
      font-weight: 700;
      line-height: 1.4;
    }
  `]
})
export class AboutComponent {
  private readonly packageMetadata = packageJson as {
    version: string;
    build?: string;
    buildNumber?: string;
  };
  readonly version = this.packageMetadata.version;

  constructor(private modalController: ModalController) {}

  close(): void {
    void this.modalController.dismiss();
  }
}
