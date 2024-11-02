import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthApi } from '@application/apis/auth.api';
import { UserSignInRequest } from '@domain/dtos/requests/user-sign-in.request';
import { UserSignUpRequest } from '@domain/dtos/requests/user-sign-up.request';
import { UserSignInResponse } from '@domain/dtos/responses/user-sign-in.response';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable()
export class AuthApiImpl extends AuthApi {
  private readonly _http = inject(HttpClient);
  private readonly _prefix = `${environment.api}/User`;

  public signIn(request: UserSignInRequest): Observable<UserSignInResponse> {
    return this._http.post<UserSignInResponse>(
      `${this._prefix}/login`,
      request
    );
  }

  public signUp(request: UserSignUpRequest): Observable<void> {
    return this._http.post<void>(`${this._prefix}/register`, request);
  }
}
