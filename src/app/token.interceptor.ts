import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './services/user/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  
  constructor(private _cookieService: CookieService, private userService: UserService) {}
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger

    request.url.includes('login' || 'user') ? this._cookieService.delete('Authorization') : null;
    const token = this._cookieService.get('Authorization');
    if (token) {
      this.userService.tokenChanged.next(true);
    }
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`
        }
      });
    }
 
    return next.handle(request);
  }
}
