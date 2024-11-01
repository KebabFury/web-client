import { Injectable } from '@angular/core';
import { UserSignInRequest } from '@domain/dtos/requests/user-sign-in.request';
import { UserSignUpRequest } from '@domain/dtos/requests/user-sign-up.request';
import { UserSignInResponse } from '@domain/dtos/responses/user-sign-in.response';
import { Observable } from 'rxjs';

@Injectable()
export abstract class AuthApi {
  public abstract signIn(
    request: UserSignInRequest
  ): Observable<UserSignInResponse>;
  public abstract signUp(request: UserSignUpRequest): Observable<void>;
}
