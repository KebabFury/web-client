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
import { Router } from '@angular/router';
import { UserSignInRequest } from '@domain/dtos/requests/user-sign-in.request';
import { AuthService } from '@domain/services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="wrapper">
      <div class="register">
        <span class="register__title">Welcome back!</span>
        <div class="login">
          <span>Don't have an account?</span>
          <a
            class="login__button"
            (click)="navigateToSignUpPage()">
            Sign Up
          </a>
        </div>
        <form
          class="register__form"
          (ngSubmit)="login()">
          <label
            class="title"
            for="email"
            >Email</label
          >
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
            for="password"
            >Пароль</label
          >
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
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrl: 'sign-in.component.scss',
})
export class SignInComponent {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);

  protected form = new FormGroup({
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

  protected login(): void {
    const request: UserSignInRequest = {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
    };

    this._authService
      .signIn(request)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        error: () => alert('Nope'),
      });
  }

  protected navigateToSignUpPage(): void {
    this._router.navigate(['/sign-up']);
  }
}
