import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { map, take } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {

  const login = inject(AuthenticationService).isLoggedIn();
  const router = inject(Router) as Router;

  if (login!) {
    return true
  } else {
    return router.createUrlTree(['forms'])
  }
  
};
