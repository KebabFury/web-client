import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserSignInRequest } from '@domain/dtos/requests/user-sign-in.request';
import { UserSignUpRequest } from '@domain/dtos/requests/user-sign-up.request';
import { UserSignInResponse } from '@domain/dtos/responses/user-sign-in.response';
import { AuthRepository } from '@domain/repositories/auth.repository';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _router = inject(Router);
  private readonly _repository = inject(AuthRepository);

  public isAuthorized(): Observable<boolean> {
    return this._repository.isAuthorized();
  }

  public signUp(request: UserSignUpRequest): Observable<void> {
    return this._repository
      .signUp(request)
      .pipe(tap(() => this._router.navigate(['/sign-in'])));
  }

  public signIn(request: UserSignInRequest): Observable<UserSignInResponse> {
    return this._repository
      .signIn(request)
      .pipe(tap(() => this._router.navigate(['/providers'])));
  }

  public signOut(): Observable<void> {
    return this._repository
      .signOut()
      .pipe(tap(() => this._router.navigate(['/sign-in'])));
  }
}
