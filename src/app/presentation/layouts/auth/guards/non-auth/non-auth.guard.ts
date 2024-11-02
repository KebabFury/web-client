import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@domain/services/auth.service';

export const nonAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if(!authService.isAutorized) return true;

  const router = inject(Router);
  router.navigate(['/bots']);
  return false;
};
