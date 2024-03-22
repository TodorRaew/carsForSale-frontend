import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdvertisementService } from 'src/app/services/advertisement.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  showForm: boolean = false;

  constructor(private advertisementService: AdvertisementService) {}
  
  formData = new FormGroup({
    sellerName: new FormControl("",[Validators.required]),
    phoneNumber: new FormControl("",[Validators.required]),
    makeName: new FormControl("",[Validators.required]),
    modelName: new FormControl("",[Validators.required]),
    fuelType: new FormControl("",[Validators.required]),
    color: new FormControl("",[Validators.required]),
    power: new FormControl("",[Validators.required]),
    yearOfManufacture: new FormControl("",[Validators.required]),
    price: new FormControl("",[Validators.required]),
    dateOfCreation: new FormControl("",[Validators.required]),
  });

  openForm() {
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