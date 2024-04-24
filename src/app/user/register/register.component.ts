import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    username: new FormControl("", [Validators.required, Validators.minLength(3)]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    repassword: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    phoneNumber: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required, Validators.maxLength(100)]),
  });

  constructor(private userService: UserService, private router: Router, private _snackBar: MatSnackBar,
    ) { }

  onSubmitHandler(): void {
    if (this.registerForm.invalid) {
      return;
    }
    const form = this.registerForm;

    if (form.value.password !== form.value.repassword) {
      this.openSnackBar("Passwords do not match!", "Close");
      return;
    }
    this.userService.register(form);
    this.router.navigate(["/login"]);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
