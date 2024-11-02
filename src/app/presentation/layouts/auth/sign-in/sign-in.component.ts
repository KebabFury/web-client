import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSignInRequest } from '@domain/dtos/requests/user-sign-in.request';
import { AuthService } from '@domain/services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="wrapper">
      <div class="register">
        <span class="register__title">Добро пожаловать</span>
        <div class="login">
        <span class="">Нету аккаунта?</span>
        <a class="login__button" (click)="toRegister()">Создать</a>
        </div>
        <form [formGroup]="bookForm" class="register__form">
            <div>
                <label for="email">Email</label>
                <input id="email" formControlName="email">
                <div *ngIf="email.invalid && (email.dirty || email.touched)">
                    <small *ngIf="email.errors?.['required']">Email обязательное поле</small>
                    <small *ngIf="email.errors?.['email']">Email не валидный</small>
                </div>
            </div>
            <div>
                <label for="password">Пароль</label>
                <input type="password" id="password" formControlName="password">
                <div *ngIf="password.invalid && (password.dirty || password.touched)">
                    <small *ngIf="password.errors?.['required']">Пароль обязательное поле</small>
                </div>
            </div>
        </form>

        <div class="register__buttons">
          <button mat-flat-button [disabled]="bookForm.invalid" (click)="login()">Войти</button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

    private _authService = inject(AuthService);
  constructor(
    private _router: Router,

) { }

  bookForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  public get email(): FormControl<string> {
    return this.bookForm.get('email') as FormControl<string>;
  }

  public get password(): FormControl<string> {
    return this.bookForm.get('password') as FormControl<string>;
  }

  public login(): void {
    let loginModel: UserSignInRequest = {
      email: this.email.value,
      password: this.password.value
    }
    this._authService.signIn(loginModel).subscribe({
      next: () => {
        this._router.navigate(['/bots']);
      },
      error: () => {
        alert('Nope');
      }
    });
  }

  public toRegister(): void {
    this._router.navigate(['/sign-up']);
  }
}
