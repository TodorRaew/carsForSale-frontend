import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({});
  subscriptions: Subscription[] = [];

  constructor(private userService: UserService, private router: Router, private cookie: CookieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    debugger
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.minLength(3)]),
      password: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    });
  }

  onLoginHandler(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const sub = this.userService.login(this.loginForm.value)
      .subscribe((token) => {
        debugger

        if (token) {
          this.userService.tokenChanged.next(true);
        } else {
          this.userService.tokenChanged.next(false);
        }

        const decodedToken = jwtDecode(token.token);
        const expirationDate = new Date(decodedToken.exp! * 1000);

        this.cookie.set('Authorization', `Bearer ${token.token}`, expirationDate, '/', undefined, true, 'Strict');

        this.loginForm.reset();
        this.router.navigate(["/home"])
      });

    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    debugger
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
