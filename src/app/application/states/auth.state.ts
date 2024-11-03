import { Observable } from 'rxjs';

export abstract class AuthState {
  public abstract isAuthorized(): Observable<boolean>;
  public abstract getToken(): Observable<string | undefined>;

  public abstract signOut(): Observable<void>;
  public abstract signIn(accessToken: string): Observable<void>;
}
