import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  subscriptions: Subscription[] = [];

  constructor(private userService: UserService, private router: Router, private _dialog: MatDialog,
  ) { }

  ngOnInit() {
    const userSub = this.userService.getUser().subscribe((user: User | undefined) => {
      this.user = user;
    });

    const tokenSub = this.userService.tokenChanged.subscribe((response) => {
      debugger
      this.isAuthenticated = response
    });

    const profileSub = this.userService.profileOpened.subscribe((profileOpened: boolean) => {
      this.profileOpened = profileOpened;
    })

    this.subscriptions.push(userSub, tokenSub, profileSub);
  }

  ngOnDestroy(): void {
    debugger
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onLogout(): void {

    const dialog = this._dialog.open(LogoutDialogAnimationComponent, {
      width: '250px',
      data: { username: this.username }
    });
    debugger

    const sub = dialog.componentInstance.logoutConfirmed.subscribe(() => {
      this.isAuthenticated = false;
      this.userService.logout();
      this.userService.profileOpened.next(true);
      this.router.navigate(['/login']);
    });

    this.subscriptions.push(sub);
  }

  viewUser(): void {
    debugger
    // this.router.navigate(['/user']);
    this.userService.profileOpened.next(true);
    const userSub = this.userService.getCurrentUserByUsername().subscribe((user: User) => {
      this.profileImageUrl = user.image;
    });

    this.subscriptions.push(userSub);
  }
}
