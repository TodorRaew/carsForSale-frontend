import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './services/user/user.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userService = inject(UserService);
    const router = inject(Router);

    const { role } = route.data;

    //checking the authentication
    userService.verifyAuthentication().then((response) => {
      
    });

    //checking roleAccess
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    userService
      .getRoleAccess(token, username, role)
      .then((response) => {
        
        if (response == 'false') {
          localStorage.clear()
          router.navigate(['user/login']);
        }
      });
      return true;
};
