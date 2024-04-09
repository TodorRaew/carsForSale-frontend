import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  profileOpened: boolean = true;
  username?: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    const username = this.userService.getCurrentUserName() as string;

    this.username = username;

    this.userService.tokenChanged.subscribe((response) => {
      this.isAuthenticated = response
    });

    this.userService.profileOpened.subscribe((profileOpened: boolean) => {
      this.profileOpened = profileOpened;
    })
  }

  ngOnDestroy(): void {
    this.userService.tokenChanged.unsubscribe();
    this.userService.profileOpened.unsubscribe();
  }

  onLogout(): void {
    debugger
    this.isAuthenticated = false;
    this.userService.logout();
    this.userService.profileOpened.next(true);
  }

  viewUser(): void {
    debugger
    // this.router.navigate(['/user']);
    this.userService.profileOpened.next(true);
  }
}
