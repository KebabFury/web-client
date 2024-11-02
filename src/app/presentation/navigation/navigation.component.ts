import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconComponent } from "../utils/icon/icon.component";
// import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IconComponent
],
  template: `
    <div class="navigation">
      <div class="navigation__category">
        <div>
          <!-- <a mat-list-item routerLink="main" routerLink="main" routerLinkActive="mdc-list-item--activated">
            <div class="navigation__category__item">
            <app-icon icon="profile"></app-icon>
            <span>Profile</span>
            </div>
          </a> -->
          <a mat-list-item routerLink="bots" routerLinkActive="mdc-list-item--activated">
            <div class="navigation__category__item">
              <app-icon icon="robot-24-white"></app-icon>
              <span class="navigation__category__item__name">My Bots</span>
            </div>
          </a>
          <a mat-list-item routerLink="main" routerLink="main" routerLinkActive="mdc-list-item--activated">
            <div class="navigation__category__item">
            <app-icon icon="settings-white"></app-icon>
            <span class="navigation__category__item__name">Settings</span>
            </div>
          </a>
          <a mat-list-item (click)="logout();">
            <div class="navigation__category__item">\
              <app-icon icon="logout"></app-icon>
              <span class="navigation__category__item__name">Logout</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  `,
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  // constructor(
  //   private _authService: AuthService,
  // ) {
  // }

  public logout(): void {
    // this._authService.logout();
  }
}
