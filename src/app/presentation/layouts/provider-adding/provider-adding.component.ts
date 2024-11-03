import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProviderService } from '@domain/services/provider.service';
import { IconType } from '@presentation/utils/icon/icon-type.enum';
import { IconComponent } from '@presentation/utils/icon/icon.component';
declare const SwaggerEditorBundle: any;
declare const SwaggerEditorStandalonePreset: any;

@Component({
  selector: 'app-provider-adding',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <div class="container-main">
      <div id="swagger-editor"></div>
    </div>
  `,
  styleUrl: 'provider-adding.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProviderAddingComponent {
  private readonly _service = inject(ProviderService);

  protected readonly IconType = IconType;

  ngOnInit(): void {
    SwaggerEditorBundle({
      dom_id: '#swagger-editor',
      layout: 'StandaloneLayout',
      presets: [SwaggerEditorStandalonePreset],
      url: 'http://rackerlabs.github.io/wadl2swagger/openstack/swagger/dbaas.json',
    });
  }
}
