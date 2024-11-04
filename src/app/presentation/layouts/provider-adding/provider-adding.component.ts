import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProviderCreateRequest } from '@domain/dtos/requests/provider-create.request';
import { CustomProvider } from '@domain/models/provider';
import { ProviderService } from '@domain/services/provider.service';
import { LocalStorageState } from '@infrastructure/states/storage.state';
import { IconType } from '@presentation/utils/icon/icon-type.enum';
import { IconComponent } from '@presentation/utils/icon/icon.component';
import { filter, map, switchMap } from 'rxjs';
import { NavigationComponent } from '../../navigation/navigation.component';
import { TwoSideTemplateComponent } from '../../templates/two-side-template/two-side-template.component';

declare const SwaggerEditorBundle: any;
declare const SwaggerEditorStandalonePreset: any;

@Component({
  selector: 'app-provider-adding',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IconComponent,
    TwoSideTemplateComponent,
    NavigationComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  template: `
    <div
      class="arrow-back"
      (click)="back()">
      <app-icon [icon]="IconType.BACK" />
    </div>
    <app-two-side-template>
      <div
        style="width: 100%"
        left>
        <form
          class="form-content"
          (ngSubmit)="submit()">
          <label
            class="title"
            for="name">
            Name
          </label>
          <input
            id="name"
            [formControl]="form.controls.name" />
          <div
            class="field-error"
            *ngIf="displayError(form.controls.name)">
            <small *ngIf="form.controls.name.errors?.['required']">
              Name is required!
            </small>
          </div>

          <label
            class="title"
            for="description">
            Description
          </label>
          <input
            id="description"
            [formControl]="form.controls.description" />
          <div
            class="field-error"
            *ngIf="displayError(form.controls.description)">
            <small *ngIf="form.controls.description.errors?.['required']">
              Description is required!
            </small>
          </div>

          <label
            class="title"
            for="clientId">
            Client Id
          </label>
          <input
            id="clientId"
            [formControl]="form.controls.clientId" />
          <div
            class="field-error"
            *ngIf="displayError(form.controls.clientId)">
            <small *ngIf="form.controls.clientId.errors?.['required']">
              Client Id is required!
            </small>
          </div>

          <label
            class="title"
            for="clientSecret">
            Client Secret
          </label>
          <input
            id="clientSecret"
            [formControl]="form.controls.clientSecret" />
          <div
            class="field-error"
            *ngIf="displayError(form.controls.clientSecret)">
            <small *ngIf="form.controls.clientSecret.errors?.['required']">
              Client Secret is required!
            </small>
          </div>

          <label
            class="title"
            for="authorizationEndpoint">
            Authorization endpoint
          </label>
          <input
            id="authorizationEndpoint"
            [formControl]="form.controls.authorizationEndpoint" />
          <div
            class="field-error"
            *ngIf="displayError(form.controls.authorizationEndpoint)">
            <small
              *ngIf="form.controls.authorizationEndpoint.errors?.['required']">
              Authorization endpoint is required!
            </small>
          </div>

          <label
            class="title"
            for="tokenEndpoint">
            Token Endpoint
          </label>
          <input
            id="tokenEndpoint"
            [formControl]="form.controls.tokenEndpoint" />
          <div
            class="field-error"
            *ngIf="displayError(form.controls.tokenEndpoint)">
            <small *ngIf="form.controls.tokenEndpoint.errors?.['required']">
              Token Endpoint is required!
            </small>
          </div>

          <label
            class="title"
            for="scope">
            Scope
          </label>
          <input
            id="scope"
            [formControl]="form.controls.scope" />
          <div
            class="field-error"
            *ngIf="displayError(form.controls.scope)">
            <small *ngIf="form.controls.scope.errors?.['required']">
              Scope is required!
            </small>
          </div>

          <div class="submit__buttons">
            <button
              *ngIf="title$ | async as title"
              [disabled]="form.invalid"
              type="submit"
              style="width: 100%; color: black">
              {{ title }}
            </button>
          </div>
        </form>
      </div>
      <div
        class="container-main"
        right>
        <div id="swagger-editor"></div>
      </div>
    </app-two-side-template>
  `,
  styleUrl: 'provider-adding.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProviderAddingComponent {
  public constructor() {
    this._id$
      .pipe(
        filter((id): id is string => !!id),
        switchMap(id => this._service.getById(id)),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe(provider => this._bindForm(provider));
  }

  private readonly _service = inject(ProviderService);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _route = inject(ActivatedRoute);

  protected readonly IconType = IconType;

  private readonly _key = 'swagger-editor-content';
  private readonly _id$ = this._route.paramMap.pipe(map(map => map.get('id')));

  protected readonly title$ = this._id$.pipe(
    map(id => (id ? 'Update Provider' : 'Create Provider'))
  );

  private _bindForm(provider: CustomProvider): void {
    this.form.setValue({
      name: provider.name,
      description: provider.providerDescription,
      scope: provider.scope,
      clientId: provider.clientId,
      clientSecret: provider.clientSecret,
      tokenEndpoint: provider.tokenEndpoint,
      authorizationEndpoint: provider.authorizationEndpoint,
    });

    localStorage.setItem(this._key, provider.swaggerJson);
  }

  protected readonly form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl<string>('', {
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
      url: 'https://petstore.swagger.io/v2/swagger.json',
    });
  }

  protected readonly displayError = (control: FormControl<string>) =>
    control.invalid && (control.dirty || control.touched);

  protected back(): void {
    this._router.navigate(['/providers']);
  }
  protected submit(): void {
    const request: ProviderCreateRequest = {
      name: this.form.controls.name.value,
      description: this.form.controls.description.value,
      providerDescription: this.form.controls.description.value,
      clientId: this.form.controls.clientId.value,
      clientSecret: this.form.controls.clientSecret.value,
      authorizationEndpoint: this.form.controls.authorizationEndpoint.value,
      tokenEndpoint: this.form.controls.tokenEndpoint.value,
      scope: this.form.controls.scope.value,
      swaggerJson: JSON.stringify(
        JSON.parse(
          LocalStorageState.getItem(this._key)?.replaceAll('\\n', '') ?? '{}'
        )
      ),
    };

    this._id$
      .pipe(
        switchMap(id =>
          id ? this._service.update(id, request) : this._service.create(request)
        ),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }
}
