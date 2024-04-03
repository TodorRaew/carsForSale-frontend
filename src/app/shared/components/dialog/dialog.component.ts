import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdvertisementView } from '../../interfaces/advertisement.view';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dioalog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DioalogComponent implements OnInit {

  visibilityDialogFormGroup = new FormGroup({
    sellerName: new FormControl({ value: '', disabled: true },[]),
    phone: new FormControl({ value: '', disabled: true },[]),
    makeName: new FormControl({ value: '', disabled: true },[]),
    modelName: new FormControl({ value: '', disabled: true },[]),
    fuelTypeName: new FormControl({ value: '', disabled: true },[]),
    color: new FormControl({ value: '', disabled: true },[]),
    power: new FormControl({ value: '', disabled: true },[]),
    yearOfManufacture: new FormControl({ value: '', disabled: true },[]),
    price: new FormControl({ value: '', disabled: true },[])
  });

  constructor(public dialogRef: MatDialogRef<DioalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdvertisementView) { 
    }

    ngOnInit(): void {
      this.visibilityDialogFormGroup.setValue({
        sellerName: this.data.sellerName,
        phone: this.data.sellerPhoneNumber,
        makeName: this.data.makeName,
        modelName: this.data.modelName,
        fuelTypeName: this.data.fuelType,
        color: this.data.color,
        power: this.data.power,
        yearOfManufacture: this.data.yearOfManufacture,
        price: this.data.price,
      });
    }

    onNoClick(): void {
      debugger
      this.dialogRef.close();
    }
}
