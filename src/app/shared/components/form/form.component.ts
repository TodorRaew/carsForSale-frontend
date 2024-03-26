import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { Make } from '../../interfaces/make';
import { MakeService } from 'src/app/services/make.service';
import { MakeDto } from '../../interfaces/makeDto';
import { FuelTypeDto } from '../../interfaces/fuelTypeDto';
import { FuelTypeService } from 'src/app/services/fuel-type.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user/user.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DioalogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  showForm: boolean = false;
  selectedValue: string = "";

  makes: MakeDto[] = []
  fuelTypes: FuelTypeDto[] = [];
  sellerName?: string | boolean | undefined = "";
  sellerId: number | undefined = 0;


  constructor(private advertisementService: AdvertisementService,
    private makeService: MakeService,
    private fuelTypeService: FuelTypeService,
    private cookie: CookieService,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FormComponent>,
    public dialog: MatDialog) { }

  formData = new FormGroup({
    sellerName: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl("", [Validators.required]),
    makeId: new FormControl("", [Validators.required]),
    fuelTypeId: new FormControl("", [Validators.required]),
    color: new FormControl("", [Validators.required]),
    power: new FormControl("", [Validators.required]),
    yearOfManufacture: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    dateOfCreation: new FormControl("", [Validators.required]),
  });

  ngOnInit() {
    debugger
    this.makeService.getAllMakes()
      .subscribe((makes) => {
        debugger
        this.makes = makes;
      });

    debugger
    this.fuelTypeService.getAllFuelTypes()
      .subscribe((fuelTypes) => {
        debugger
        this.fuelTypes = fuelTypes;
      });

    debugger
    this.sellerName = this.userService.getCurrentUserName();
    this.sellerId = this.userService.getCurrentUserByUsername()?.id;
  }

  submitForm() {
    debugger
    this.advertisementService.addAdvertisement(this.formData);
    debugger
    this.openSnackBar("Advertisement added successfully!", "Close");
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnDestroy() {
    this.userService.tokenChanged.unsubscribe();
  }
}