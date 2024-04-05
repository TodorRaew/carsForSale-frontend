import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../../interfaces/user';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  viewUserFormGroup: FormGroup = new FormGroup({});
  user: User | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.viewUserFormGroup = new FormGroup({
      username: new FormControl({ value: '', disabled: true }, []),
      email: new FormControl({ value: '', disabled: true }, []),
      phoneNumber: new FormControl({ value: '', disabled: true }, []),
      location: new FormControl({ value: '', disabled: true }, []),
      role: new FormControl({ value: '', disabled: true }, [])
    });
    this.userService.getCurrentUserByUsername()
      .subscribe((user) => {
        this.viewUserFormGroup.setValue({
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          location: user.location,
          role: user.role
        })
      });
  }
}
