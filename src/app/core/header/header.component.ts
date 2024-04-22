import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { LogoutDialogAnimationComponent } from 'src/app/shared/components/logout-dialog-animation/logout-dialog-animation.component';
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
  profileImageUrl?: string;
  user: User | undefined;

  constructor(private userService: UserService, private router: Router, private _dialog: MatDialog,
  ) { }

  ngOnInit() {
    const user = this.userService.getCurrentUserByUsername().subscribe((user: User) => {
      this.user = user;
    });

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

    const dialog = this._dialog.open(LogoutDialogAnimationComponent, {
      width: '250px',
      data: { username: this.username }
    });
    debugger

    dialog.componentInstance.logoutConfirmed.subscribe(() => {
      this.isAuthenticated = false;
      this.userService.logout();
      this.userService.profileOpened.next(true);
      this.router.navigate(['/login']);
    });
  }

  viewUser(): void {
    debugger
    // this.router.navigate(['/user']);
    this.userService.profileOpened.next(true);
    this.userService.getCurrentUserByUsername().subscribe((user: User) => {
      this.profileImageUrl = user.image;
    });
  }
}
