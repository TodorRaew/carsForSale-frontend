import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { Make } from '../../interfaces/make';
import { MakeService } from 'src/app/services/make.service';
import { MakeDto } from '../../interfaces/makeDto';
import { FuelTypeDto } from '../../interfaces/fuelTypeDto';
import { FuelTypeService } from 'src/app/services/fuel-type.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  showForm: boolean = false;
  selectedValue: string = "";

  makes: MakeDto[] = []
  fuelTypes: FuelTypeDto[] = [];

  constructor(private advertisementService: AdvertisementService, private makeService: MakeService, private fuelTypeService: FuelTypeService) { }

  formData = new FormGroup({
    sellerName: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl("", [Validators.required]),
    makeId: new FormControl("", [Validators.required]),
    // modelName: new FormControl("",[Validators.required]),
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
  }

  openForm() {
    debugger
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  submitForm() {

    this.advertisementService.addAdvertisement(this.formData);
    this.closeForm();
  }
}