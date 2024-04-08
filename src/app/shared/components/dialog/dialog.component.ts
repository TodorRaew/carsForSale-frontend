import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdvertisementView } from '../../interfaces/advertisement.view';
import { FormGroup, FormControl } from '@angular/forms';
import { Actions } from '../../interfaces/enums';

@Component({
  selector: 'app-dioalog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DioalogComponent implements OnInit {
  title: string = 'Преглед на обява';
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
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

    ngOnInit(): void {
      if(this.data.action === Actions.EDIT){
        this.title = 'Редакция на обява'
        this.visibilityDialogFormGroup.enable();  
        this.visibilityDialogFormGroup.controls.sellerName.disable();
        
      }
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
      });
    }

    onNoClick(): void {
      debugger
      this.dialogRef.close();
    }
}
