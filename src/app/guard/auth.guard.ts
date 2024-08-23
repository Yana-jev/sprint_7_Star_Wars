import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../data/services/auth.service';

  export const authGuard: CanActivateFn = () => {
      const router = inject(Router);
      const authService = inject(AuthService);
    
      if (authService.isUserLoggedIn()) {
        return true;
      } else {
        router.navigate(['login']);
        return false;
      }
    };
    