import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApi } from '@application/apis/auth.api';
import { UserSignInRequest } from '@domain/dtos/requests/user-sign-in.request';
import { UserSignUpRequest } from '@domain/dtos/requests/user-sign-up.request';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(
        private _router: Router,
        private _authApi: AuthApi
    ) {

    }

  public get isAutorized(): boolean {
    debugger;
    if (typeof window === "undefined") {
        return false;
    }

    const accesToken = window.localStorage.getItem('accesToken');
    if (accesToken && accesToken !== '') {
        return true;
    }
    
    return false;
  }

  public signUp(registerModel: UserSignUpRequest): Observable<any> {
    return this._authApi.signUp(registerModel);
  }

  public signIn(registerModel: UserSignInRequest): Observable<any> {
    return this._authApi.signIn(registerModel);
  }

  public logout(): void {
    window?.localStorage.setItem('accesToken', '');
    window?.localStorage.setItem('userName', '');
    window?.localStorage.setItem('userId', '');

    this._router.navigate(['/sign-in']);
  }
}
