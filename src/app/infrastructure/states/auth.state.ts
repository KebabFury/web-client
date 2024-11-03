import { Injectable } from '@angular/core';
import { AuthState } from '@application/states/auth.state';
import { Observable, map, of } from 'rxjs';
import { LocalStorageState, fromStorageState } from './storage.state';

@Injectable()
export class AuthStateImpl extends AuthState {
  private readonly _tokenKey = 'accessToken';

  public isAuthorized(): Observable<boolean> {
    return fromStorageState(this._tokenKey).pipe(
      map(token => token !== undefined)
    );
  }
  public signOut(): Observable<void> {
    return of(LocalStorageState.setItem(this._tokenKey));
  }
  public signIn(accessToken: string): Observable<void> {
    return of(LocalStorageState.setItem(this._tokenKey, accessToken));
  }
}
