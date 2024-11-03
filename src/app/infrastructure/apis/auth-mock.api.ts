import { Injectable } from '@angular/core';
import { AuthApi } from '@application/apis/auth.api';
import { UserSignInRequest } from '@domain/dtos/requests/user-sign-in.request';
import { UserSignInResponse } from '@domain/dtos/responses/user-sign-in.response';
import { Observable, delay, of } from 'rxjs';

@Injectable()
export class AuthApiMock extends AuthApi {
  public signIn(request: UserSignInRequest): Observable<UserSignInResponse> {
    const response: UserSignInResponse = {
      id: 'id',
      name: 'User',
      accessToken: 'accessToken',
      email: request.email,
    };

    return of(response).pipe(delay(2000));
  }
  public signUp(): Observable<void> {
    return of().pipe(delay(2000));
  }
}
