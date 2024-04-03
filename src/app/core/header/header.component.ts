import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  open: boolean = true;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.tokenChanged.subscribe((isAuthenticated: boolean) => {
      debugger
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy(): void {
    this.userService.tokenChanged.unsubscribe();
  }

  onLogout(): void {
    debugger
    this.userService.logout();
    this.open = false
  }

  viewUser(): void {
    debugger
    this.router.navigate(['/user']);
    this.open = false;
  }
}
