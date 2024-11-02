import { Injectable, inject } from '@angular/core';
import { AuthApi } from '@application/apis/auth.api';
import { UserSignInRequest } from '@domain/dtos/requests/user-sign-in.request';
import { UserSignUpRequest } from '@domain/dtos/requests/user-sign-up.request';
import { UserSignInResponse } from '@domain/dtos/responses/user-sign-in.response';
import { AuthRepository } from '@domain/repositories/auth.repository';
import { Observable } from 'rxjs';

@Injectable()
export class AuthRepositoryImpl extends AuthRepository {
  private readonly _api = inject(AuthApi);

  public signIn(request: UserSignInRequest): Observable<UserSignInResponse> {
    return this._api.signIn(request);
  }
  public signUp(request: UserSignUpRequest): Observable<void> {
    return this._api.signUp(request);
  }
}
