import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm = new FormGroup({
    username: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required]),
  });

  constructor(private userService: UserService, private router: Router, private cookie: CookieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    debugger
    this.route.snapshot.queryParams['logout'] ? this.onLogout() : null;
  }

  onLoginHandler(): void {
    debugger
    this.userService.login(this.loginForm);
  }

  onLogout(): void {
    debugger
    this.cookie.delete("Authorization");
    this.userService.tokenChanged.emit(false);
  }
}
