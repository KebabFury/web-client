import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthState } from '@application/states/auth.state';
import { switchMap } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const state = inject(AuthState);

  return state.getToken().pipe(
    switchMap(token => {
      if (token === undefined) {
        return next(req);
      }

      const clonedReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

      return next(clonedReq);
    })
  );
};
