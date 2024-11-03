import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { CustomProvider } from '@domain/models/provider';
import { ProviderService } from '@domain/services/provider.service';
import { IconType } from '@presentation/utils/icon/icon-type.enum';
import { IconComponent } from '@presentation/utils/icon/icon.component';
import { NavigationComponent } from '../../navigation/navigation.component';
import { TwoSideTemplateComponent } from '../../templates/two-side-template/two-side-template.component';

@Component({
  selector: 'app-provider-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IconComponent,
    TwoSideTemplateComponent,
    NavigationComponent,
  ],
  template: `
    <app-two-side-template>
      <app-navigation left />
      <div
        class="container-main"
        right>
        <div class="header">
          <p style="color: white; font-size: 28px; font-weight: 500;">
            Your Providers:
          </p>
          <div class="header__right">
            <button
              class="add-button"
              (click)="navigateToProviderCreate()">
              <app-icon [icon]="IconType.PLUS"></app-icon>
            </button>
          </div>
        </div>

        <div class="bot-list">
          @for (provider of providers(); track provider) {
            <div class="bot">
              <div class="bot__content">
                <div class="bot__content__avatar-stub">
                  <app-icon
                    class="d-flex"
                    [icon]="getIcon(provider.name)" />
                </div>
                <div class="bot__content__info">
                  <span class="bot__content__info__name">{{
                    provider.name
                  }}</span>
                  <span class="bot__content__info__description"
                    >Description</span
                  >
                </div>
              </div>
              <!-- <div class="bot__status active">
              <div class="circle"></div>
              <p>Enabled</p>
            </div> -->
              <div class="bot__toggle active"></div>
            </div>
          }
        </div>
      </div>
    </app-two-side-template>
  `,
  styleUrl: 'provider-list.component.scss',
})
export class ProviderListComponent implements OnInit {
  private readonly _providerService = inject(ProviderService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);

  protected readonly providers = signal<readonly CustomProvider[]>([]);

  private readonly _icons: readonly IconType[] = [
    IconType.BUBBLE,
    IconType.COMFY,
    IconType.EVA,
    IconType.MAC,
    IconType.DISPLAY,
    IconType.ASSISTANT,
  ];

  protected readonly getIcon = (id: string) =>
    this._icons[
      id
        .split('')
        .map((_, index) => id.charCodeAt(index))
        .reduce((acc, cur) => acc + cur, 0) % this._icons.length
    ];

  protected readonly IconType = IconType;

  public ngOnInit(): void {
    this._providerService
      .get()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(this.providers.set);
  }

  protected navigateToProviderCreate(): void {
    this._router.navigate(['/provider-adding']);
  }
}
