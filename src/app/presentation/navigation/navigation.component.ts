import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconType } from '@presentation/utils/icon/icon-type.enum';
import { IconComponent } from '@presentation/utils/icon/icon.component';
// import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <div class="navigation">
      <div class="navigation__category">
        <div>
          <a
            mat-list-item
            routerLink="providers"
            routerLinkActive="mdc-list-item--activated">
            <div class="navigation__category__item">
              <app-icon [icon]="IconType.ROBOT"></app-icon>
              <span class="navigation__category__item__name">My Providers</span>
            </div>
          </a>

          <a
            mat-list-item
            routerLink="main"
            routerLink="main"
            routerLinkActive="mdc-list-item--activated">
            <div class="navigation__category__item">
              <app-icon [icon]="IconType.SETTINGS"></app-icon>
              <span class="navigation__category__item__name">Settings</span>
            </div>
          </a>
          <a
            mat-list-item
            (click)="logout()">
            <div class="navigation__category__item">
              <app-icon [icon]="IconType.LOGOUT"></app-icon>
              <span class="navigation__category__item__name">Logout</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  `,
  styleUrl: 'navigation.component.scss',
})
export class NavigationComponent {
  protected readonly IconType = IconType;

  // constructor(
  //   private _authService: AuthService,
  // ) {
  // }

  public logout(): void {
    // this._authService.logout();
  }
}
