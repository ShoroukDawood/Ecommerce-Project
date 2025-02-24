import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../features/auth/auth.service';
import { inject } from '@angular/core';

export const checkTokenGuard: CanActivateFn = (route, state) => {
   let _auth: AuthService = inject(AuthService);
    let router = inject(Router);
    if (_auth.userData.getValue() == null) {
      return true;
    }
    router.navigate(['/home'])
    return false;
};
