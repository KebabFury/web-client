import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@domain/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if(authService.isAutorized) return true;

  console.log("Auth guard -> Autorization False!")
  const router = inject(Router);
  router.navigate(['/sign-up']);
  return false;
};
