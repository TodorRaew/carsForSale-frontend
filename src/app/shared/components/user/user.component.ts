declare var cloudinary: any;

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../../interfaces/user';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  viewUserFormGroup: FormGroup = new FormGroup({});
  user: User | undefined;
  imageUrl: string = '';
  message: string = '';
  subscriptions: Subscription[] = [];


  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.message = this.activatedRoute.snapshot.data['title'];

    debugger
    this.viewUserFormGroup = new FormGroup({
      username: new FormControl({ value: '', disabled: true }, []),
      email: new FormControl({ value: '', disabled: true }, []),
      phoneNumber: new FormControl({ value: '', disabled: true }, []),
      location: new FormControl({ value: '', disabled: true }, []),
      role: new FormControl({ value: '', disabled: true }, []),
    });
    debugger
    const sub = this.userService.getCurrentUserByUsername()
      .subscribe({
        next: (user: User) => {
          debugger
          this.user = user;
          this.viewUserFormGroup.get('username')?.setValue(user.username);
          this.viewUserFormGroup.get('email')?.setValue(user.email);
          this.viewUserFormGroup.get('phoneNumber')?.setValue(user.phoneNumber);
          this.viewUserFormGroup.get('location')?.setValue(user.location);
          this.viewUserFormGroup.get('role')?.setValue(user.role);

          if (user.image) {
            this.imageUrl = user.image;
          }
        },
        error: (error: Error) => {
          debugger
          console.log(error);
        }
      })

    this.subscriptions.push(sub);
  }

  openCloudinaryUploader() {
    debugger
    cloudinary.openUploadWidget({
      cloudName: 'dvxb1tlbs',
      uploadPreset: 'ml_default',
      sources: ['local'],
      showAdvancedOptions: false,
      cropping: true,
      multiple: false,
      defaultSource: 'local'
    }, (error: Error, result: any) => {
      debugger
      if (!error && result && result.event === "success") {
        debugger
        this.imageUrl = result.info.secure_url;
      }
    });
  }

  updateUser() {
    debugger
    if (this.user) {
      this.userService.updateUser(this.user.username, this.imageUrl);
      this.refresh();
    }
  }

  private refresh() {
    debugger
    const sub = this.userService.getCurrentUserByUsername()
      .subscribe({
        next: (user: User) => {
          debugger
          this.user = user;
          this.viewUserFormGroup.get('username')?.setValue(user.username);
          this.viewUserFormGroup.get('email')?.setValue(user.email);
          this.viewUserFormGroup.get('phoneNumber')?.setValue(user.phoneNumber);
          this.viewUserFormGroup.get('location')?.setValue(user.location);
          this.viewUserFormGroup.get('role')?.setValue(user.role);

          if (user.image) {
            this.imageUrl = user.image;
          }
        },
        error: (error: Error) => {
          debugger
          console.log(error);
        }
      })

    this.subscriptions.push(sub);
  }
}
