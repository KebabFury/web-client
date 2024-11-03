import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProviderService } from '@domain/services/provider.service';
import { IconType } from '@presentation/utils/icon/icon-type.enum';
import { IconComponent } from '@presentation/utils/icon/icon.component';

@Component({
  selector: 'app-provider-adding',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <div class="container-main">
      <h1>Add your new provide!</h1>
    </div>
  `,
  styleUrl: 'provider-adding.component.scss',
})
export class ProviderAddingComponent {
  private readonly _service = inject(ProviderService);

  protected readonly IconType = IconType;
}
