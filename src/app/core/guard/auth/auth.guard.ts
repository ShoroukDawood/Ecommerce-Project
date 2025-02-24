import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { AuthService } from '../../../features/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _auth: AuthService = inject(AuthService);
  let router = inject(Router);
  if (_auth.userData.getValue() !== null) {
    return true;
  }
  router.navigate(['/login'])
  return false;
};
