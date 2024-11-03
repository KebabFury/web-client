import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserSignUpRequest } from '@domain/dtos/requests/user-sign-up.request';
import { AuthService } from '@domain/services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="wrapper">
      <div class="register">
        <span class="register__title">Create a new account</span>
        <div class="login">
          <span>Already have an account?</span>
          <a
            class="login__button"
            (click)="signOut()">
            Sign In
          </a>
        </div>
        <form
          class="register__form"
          (ngSubmit)="signUp()">
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
            for="email">
            Email
          </label>
          <input
            id="email"
            [formControl]="form.controls.email" />
          <div
            class="field-error"
            *ngIf="displayError(form.controls.email)">
            <small *ngIf="form.controls.email.errors?.['required']">
              Email is required!
            </small>
            <small *ngIf="form.controls.email.errors?.['email']">
              Email is not valid
            </small>
          </div>

          <label
            class="title"
            for="password">
            Password
          </label>
          <input
            id="password"
            [formControl]="form.controls.password"
            type="password" />
          <div
            class="field-error"
            *ngIf="displayError(form.controls.password)">
            <small *ngIf="form.controls.password.errors?.['required']">
              Password is required!
            </small>
          </div>

          <div class="register__buttons">
            <button
              [disabled]="form.invalid"
              type="submit">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['sign-up.component.scss'],
  host: { ngSkipHydration: 'true' },
})
export class SignUpComponent {
  private readonly _authService = inject(AuthService);
  private readonly _destroyRef = inject(DestroyRef);

  protected readonly form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected readonly displayError = (control: FormControl<string>) =>
    control.invalid && (control.dirty || control.touched);

  protected signUp(): void {
    const request: UserSignUpRequest = {
      name: this.form.controls.name.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
    };

    this._authService
      .signUp(request)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        error: () => alert('Nope'),
      });
  }

  protected signOut(): void {
    this._authService
      .signOut()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }
}
