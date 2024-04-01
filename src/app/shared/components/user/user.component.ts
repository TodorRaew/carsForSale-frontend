import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../../interfaces/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  user: User | undefined;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUserByUsername();
  }
  
}
