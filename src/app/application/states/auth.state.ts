import { Observable } from 'rxjs';

export abstract class AuthState {
  public abstract isAuthorized(storage: Storage): Observable<boolean>;
  public abstract signOut(storage: Storage): Observable<void>;
}
