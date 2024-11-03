import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@domain/services/auth.service';
import { IconType } from '@presentation/utils/icon/icon-type.enum';
import { IconComponent } from '@presentation/utils/icon/icon.component';
import { tap } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <div class="navigation">
      <div class="navigation__item">
        <app-icon [icon]="IconType.ROBOT"></app-icon>
        <span>My Providers</span>
      </div>

      <div class="navigation__item">
        <app-icon [icon]="IconType.SETTINGS"></app-icon>
        <span>Settings</span>
      </div>

      <div
        class="navigation__item"
        (click)="signOut()">
        <app-icon [icon]="IconType.LOGOUT"></app-icon>
        <span>Logout</span>
      </div>
    </div>
  `,
  styleUrl: 'navigation.component.scss',
})
export class NavigationComponent {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);

  protected readonly IconType = IconType;

  protected signOut(): void {
    this._authService
      .signOut()
      .pipe(
        tap(() => this._router.navigate(['/sign-in'])),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }
}
