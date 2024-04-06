import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './services/user/user.service';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  debugger
  const userService = inject(UserService);
  const cookie = inject(CookieService);
  const router = inject(Router);
  
  const token = cookie.get('Authorization');
  if (token) {
    userService.tokenChanged.next(true);
    return true;
  }
  router.navigate(['/login']);
  return false;
};
