import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdvertisementView } from '../../interfaces/advertisement.view';
import { FormGroup, FormControl } from '@angular/forms';
import { Actions } from '../../interfaces/enums';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { UserService } from 'src/app/services/user/user.service';
import { MakeDto } from '../../interfaces/makeDto';
import { FuelTypeDto } from '../../interfaces/fuelTypeDto';
import { MakeService } from 'src/app/services/make.service';
import { FuelTypeService } from 'src/app/services/fuel-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { image } from '@cloudinary/url-gen/qualifiers/source';

@Component({
  selector: 'app-dioalog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DioalogComponent implements OnInit {
  title: string = 'Преглед на обява';
  buttonTitle: string = 'Затвори';
  action: string = 'view';
  sellerId: number = 0;
  makes: MakeDto[] = []
  fuelTypes: FuelTypeDto[] = [];

  visibilityDialogFormGroup = new FormGroup({
    sellerName: new FormControl({ value: '', disabled: true }, []),
    phone: new FormControl({ value: '', disabled: true }, []),
    makeName: new FormControl({ value: '', disabled: true }, []),
    modelName: new FormControl({ value: '', disabled: true }, []),
    fuelTypeName: new FormControl({ value: '', disabled: true }, []),
    color: new FormControl({ value: '', disabled: true }, []),
    power: new FormControl({ value: '', disabled: true }, []),
    yearOfManufacture: new FormControl({ value: '', disabled: true }, []),
    price: new FormControl({ value: '', disabled: true }, []),
    imageUrl: new FormControl({ value: '', disabled: true }, []),
  });

  constructor(public dialogRef: MatDialogRef<DioalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private advertisementService: AdvertisementService,
    private userService: UserService,
    private makeService: MakeService,
    private fuelTypeService: FuelTypeService,
    private _snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    this.makeService.getAllMakes()
    .subscribe((makes) => {
      this.makes = makes;
    });

  this.fuelTypeService.getAllFuelTypes()
    .subscribe((fuelTypes) => {
      this.fuelTypes = fuelTypes;
    });

    if (this.data.action === Actions.EDIT) {
      this.title = 'Редакция на обява'
      this.action = 'edit';
      this.visibilityDialogFormGroup.enable();
      this.visibilityDialogFormGroup.controls.sellerName.disable();

    }
    debugger
    this.visibilityDialogFormGroup.setValue({
      sellerName: this.data.advertisement.sellerName,
      phone: this.data.advertisement.sellerPhoneNumber,
      makeName: this.data.advertisement.makeName,
      modelName: this.data.advertisement.modelName,
      fuelTypeName: this.data.advertisement.fuelType,
      color: this.data.advertisement.color,
      power: this.data.advertisement.power,
      yearOfManufacture: this.data.advertisement.yearOfManufacture,
      price: this.data.advertisement.price,
      imageUrl: this.data.advertisement.image
    });

    this.userService.getCurrentUserByUsername().subscribe((user) => {
      this.sellerId = user.id
    });
  }

  onNoClick(): void {
    debugger
    this.dialogRef.close();
  }

  onCancelClick() {
    debugger
    this.onNoClick();
  }

  updateRecord() {
    
    debugger
     this.advertisementService.updateAdvertisement(this.sellerId, this.data.advertisement.id, this.visibilityDialogFormGroup).subscribe((advertisement) => {
      console.log(advertisement);
      
        debugger
     });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
