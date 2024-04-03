import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  tokenChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  loginForm: FormGroup = new FormGroup({});

  constructor(private userService: UserService, private router: Router, private cookie: CookieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    debugger
    this.loginForm = new FormGroup({
      username: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required]),
    });
  }

  onLoginHandler(): void {
    debugger
    if (this.loginForm.invalid) {
      return;
    }
    this.userService.login(this.loginForm.value)
    .subscribe((token) => {
      debugger
      console.log(token);

      if (token) {
        this.tokenChanged.emit(true);
      } else {
        this.tokenChanged.emit(false);
      }

      // const decodedToken = jwtDecode(token.token);
      //  const expirationDate = new Date(decodedToken.exp! * 1000);

      // this.cookie.set('Authorization', `Bearer ${token.token}`, expirationDate, '/', undefined, true, 'Strict');

      this.cookie.set('Authorization', token.token);
      this.loginForm.reset();
      this.router.navigate(["/home"])

    });
  }

}
