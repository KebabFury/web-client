import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@domain/services/auth.service';
import { map, tap } from 'rxjs';

export const nonAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthorized().pipe(
    tap(isAuthorized => isAuthorized && router.navigate(['/bots'])),
    map(isAuthorized => !isAuthorized)
  );
};
