import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSignUpRequest } from '@domain/dtos/requests/user-sign-up.request';
import { AuthService } from '@domain/services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
<div class="wrapper">
  <div class="register">
    <span class="register__title">Create a new account</span>
    <div class="login">
      <span>Already have an account?</span>
      <a class="login__button" (click)="logout()">Sign In</a>
    </div>
    <form [formGroup]="bookForm" class="register__form" (ngSubmit)="register()">
      <label class="title" for="name">Name</label>
      <input id="name" formControlName="name" />
      <div class="field-error" *ngIf="name.invalid && (name.dirty || name.touched)">
        <small *ngIf="name.errors?.['required']">Name is required!</small>
      </div>

      <label class="title" for="email">Email</label>
      <input id="email" formControlName="email" />
      <div class="field-error" *ngIf="email.invalid && (email.dirty || email.touched)">
        <small *ngIf="email.errors?.['required']">Email is required!</small>
        <small *ngIf="email.errors?.['email']">Email is not valid</small>
      </div>

      <label class="title" for="password">Password</label>
      <input type="password" id="password" formControlName="password" />
      <div class="field-error" *ngIf="password.invalid && (password.dirty || password.touched)">
        <small *ngIf="password.errors?.['required']">Password is required!</small>
      </div>

      <div class="register__buttons">
        <button type="submit" [disabled]="bookForm.invalid">Create Account</button>
      </div>
    </form>
  </div>
</div>
  `,
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  bookForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  public get name(): FormControl<string> {
    return this.bookForm.get('name') as FormControl<string>;
  }

  public get email(): FormControl<string> {
    return this.bookForm.get('email') as FormControl<string>;
  }

  public get password(): FormControl<string> {
    return this.bookForm.get('password') as FormControl<string>;
  }

  public register(): void {
    let registerModel: UserSignUpRequest = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value
    };
    
    this._authService.signUp(registerModel).subscribe({
      next: () => {
        this._router.navigate(['/sign-in']);
      },
      error: () => {
        alert('Nope');
      }
    });
  }

  public logout(): void {
    this._authService.logout();
  }
}
