declare var cloudinary: any;

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { MakeService } from 'src/app/services/make.service';
import { MakeDto } from '../../interfaces/makeDto';
import { FuelTypeDto } from '../../interfaces/fuelTypeDto';
import { FuelTypeService } from 'src/app/services/fuel-type.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  showForm: boolean = false;
  selectedValue: string = "";
  @Output() addedAdvs: EventEmitter<void> = new EventEmitter<void>();

  makes: MakeDto[] = []
  fuelTypes: FuelTypeDto[] = [];
  sellerId: number = 0;


  constructor(private advertisementService: AdvertisementService,
    private makeService: MakeService,
    private fuelTypeService: FuelTypeService,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FormComponent>,
    public dialog: MatDialog) { }

  formData = new FormGroup({
    sellerName: new FormControl({value: this.userService.getCurrentUserName(), disabled: true},  [Validators.required]),
    phoneNumber: new FormControl("", [Validators.required]),
    makeId: new FormControl("", [Validators.required]),
    fuelTypeId: new FormControl("", [Validators.required]),
    color: new FormControl("", [Validators.required]),
    power: new FormControl("", [Validators.required]),
    yearOfManufacture: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    imageUrl: new FormControl(null, [Validators.required]),
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
    this.userService.getCurrentUserByUsername().subscribe((user) => {
      this.sellerId = user.id
    });
  }

  submitForm() {
    debugger
    this.advertisementService.addAdvertisement(this.sellerId, this.formData)
    .subscribe((addAdvertisement) => {
      this.addedAdvs.emit();
    });
    // debugger
    // this.openSnackBar("Advertisement added successfully!", "Close");
    // this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnDestroy() {
    this.userService.tokenChanged.unsubscribe();
  }

  openCloudinaryUploader(): void {
    // open image-upload component
    this.dialog.open(ImageUploadComponent, {
      width: '700px',
      height: '200px',
    });
  }

  
}