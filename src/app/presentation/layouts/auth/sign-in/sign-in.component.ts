import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserSignInRequest } from '@domain/dtos/requests/user-sign-in.request';
import { AuthService } from '@domain/services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="wrapper">
      <div class="register">
        <span class="register__title">Добро пожаловать</span>
        <div class="login">
          <span class="">Нету аккаунта?</span>
          <a
            class="login__button"
            (click)="navigateToSignUpPage()">
            Создать
          </a>
        </div>
        <form class="register__form">
          <div>
            <label for="email">Email</label>
            <input
              id="email"
              [formControl]="form.controls.email" />
            <div *ngIf="displayError(form.controls.email)">
              <small *ngIf="form.controls.email.errors?.['required']">
                Email обязательное поле
              </small>
              <small *ngIf="form.controls.email.errors?.['email']">
                Email не валидный
              </small>
            </div>
          </div>
          <div>
            <label for="password">Пароль</label>
            <input
              id="password"
              [formControl]="form.controls.password"
              type="password" />
            <div *ngIf="displayError(form.controls.password)">
              <small *ngIf="form.controls.password.errors?.['required']">
                Пароль обязательное поле
              </small>
            </div>
          </div>
        </form>

        <div class="register__buttons">
          <button
            [disabled]="form.invalid"
            (click)="login()"
            mat-flat-button>
            Войти
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrl: 'sign-in.component.scss',
  host: { ngSkipHydration: 'true' },
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
