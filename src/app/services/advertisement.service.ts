import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  URL = 'http://localhost:8080';
  resourceUrl = `api/v1`

  constructor(private http: HttpClient, private router: Router) { }

  addAdvertisement(form: FormGroup) {
    debugger
    // if (form.invalid) {
    //   return;
    // }
    const sellerName = form.value.sellerName;
    const phoneNumber = form.value.phoneNumber;
    const makeId = Number(form.value.makeId);
    // const modelName = form.value.modelName;
    const fuelTypeId =  Number(form.value.fuelTypeId);
    const color = form.value.color;
    const power = form.value.power;
    const yearOfManufacture = form.value.yearOfManufacture;
    const price = form.value.price;
    const dateOfCreation = form.value.dateOfCreation;

    this.http
      .post(`${this.URL}/${this.resourceUrl}/advertisement`, {
        sellerName,
        phoneNumber,
        makeId,
        // modelName,
        fuelTypeId,
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
