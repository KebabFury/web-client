import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  template: `
    <div class="navigation">

      <div class="navigation__category">
        <div>
          <a mat-list-item routerLink="main" routerLink="main" routerLinkActive="mdc-list-item--activated">
            <div class="navigation__category__item">
              <span class="navigation__category__item__icon material-symbols-outlined">person</span>
              <span>Профиль</span>
            </div>
          </a>
          <a mat-list-item routerLink="bots" routerLinkActive="mdc-list-item--activated">
            <div class="navigation__category__item">
              <span class="navigation__category__item__icon material-symbols-outlined">grocery</span>
              <span>Продукты</span>
            </div>
          </a>
          <a mat-list-item routerLink="calendar" routerLinkActive="mdc-list-item--activated">
            <div class="navigation__category__item">
              <span class="navigation__category__item__icon material-symbols-outlined">calendar_month</span>
              <span>Календарь</span>
            </div>
          </a>
          <a mat-list-item (click)="logout();">
            <div class="navigation__category__item">
              <span class="navigation__category__item__icon material-symbols-outlined">logout</span>
              <span>Выйти</span>
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
