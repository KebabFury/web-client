import { Injectable, inject } from '@angular/core';
import { AuthApi } from '@application/apis/auth.api';
import { AuthState } from '@application/states/auth.state';
import { UserSignInRequest } from '@domain/dtos/requests/user-sign-in.request';
import { UserSignUpRequest } from '@domain/dtos/requests/user-sign-up.request';
import { UserSignInResponse } from '@domain/dtos/responses/user-sign-in.response';
import { AuthRepository } from '@domain/repositories/auth.repository';
import { Observable, combineLatest, map, of, switchMap } from 'rxjs';

@Injectable()
export class AuthRepositoryImpl extends AuthRepository {
  private readonly _api = inject(AuthApi);
  private readonly _state = inject(AuthState);

  public signIn(request: UserSignInRequest): Observable<UserSignInResponse> {
    return this._api.signIn(request).pipe(
      switchMap(response =>
        combineLatest([of(response), this._state.signIn(response.accessToken)])
      ),
      map(([response]) => response)
    );
  }
  public signUp(request: UserSignUpRequest): Observable<void> {
    return this._api.signUp(request);
  }
  public signOut(): Observable<void> {
    return this._state.signOut();
  }
  public isAuthorized(): Observable<boolean> {
    return this._state.isAuthorized();
  }
}
