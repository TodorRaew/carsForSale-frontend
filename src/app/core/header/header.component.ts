import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.tokenChanged.subscribe((isAuthenticated: boolean) => {
      debugger
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy(): void {
    this.userService.tokenChanged.unsubscribe();
  }
}
