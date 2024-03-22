import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  URL = 'http://localhost:8080';
  resourceUrl = `api/v1/auth`

  constructor(private http: HttpClient, private router: Router) { }

  addAdvertisement(form: FormGroup) {
    debugger
    // if (form.invalid) {
    //   return;
    // }
    const sellerName = form.value.sellerName;
    const phoneNumber = form.value.phoneNumber;
    const makeName = form.value.makeName;
    const modelName = form.value.modelName;
    const fuelType = form.value.fuelType;
    const color = form.value.color;
    const power = form.value.power;
    const yearOfManufacture = form.value.yearOfManufacture;
    const price = form.value.price;
    const dateOfCreation = form.value.dateOfCreation;

    this.http
      .post(`${this.URL}/${this.resourceUrl}/advertisement`, {
        sellerName,
        phoneNumber,
        makeName,
        modelName,
        fuelType,
        color,
        power,
        yearOfManufacture,
        price,
        dateOfCreation
      })
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
