import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProviderCreateRequest } from '@domain/dtos/requests/provider-create.request';
import { ProviderService } from '@domain/services/provider.service';
import { getStorageState } from '@infrastructure/states/storage.state';
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
  private readonly _destroyRef = inject(DestroyRef);

  private readonly _key = 'swagger-editor-content';

  protected readonly form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    clientId: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    clientSecret: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    authorizationEndpoint: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    tokenEndpoint: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    scope: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public ngOnInit(): void {
    SwaggerEditorBundle({
      dom_id: '#swagger-editor',
      layout: 'StandaloneLayout',
      presets: [SwaggerEditorStandalonePreset],
      url: 'http://rackerlabs.github.io/wadl2swagger/openstack/swagger/dbaas.json',
    });
  }

  protected submit(): void {
    const request: ProviderCreateRequest = {
      name: this.form.controls.name.value,
      clientId: this.form.controls.clientId.value,
      clientSecret: this.form.controls.clientSecret.value,
      authorizationEndpoint: this.form.controls.authorizationEndpoint.value,
      tokenEndpoint: this.form.controls.tokenEndpoint.value,
      scope: this.form.controls.scope.value,
      swaggerJson: getStorageState().getItem(this._key) ?? '{}',
    };

    this._service
      .create(request)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }
}
