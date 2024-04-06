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
  profileOpened: boolean = true;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    debugger
    this.userService.tokenChanged.subscribe((response) => {
      debugger
      this.isAuthenticated = response
    });

    // this.userService.getCurrentUserByUsername().subscribe((user) => {
    //   debugger
    //   if (user) {
    //     this.isAuthenticated = true;
    //   }
    // });

    this.userService.profileOpened.subscribe((profileOpened: boolean) => {
      debugger
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
    this.router.navigate(['/user']);
    this.userService.profileOpened.next(true);
  }
}
