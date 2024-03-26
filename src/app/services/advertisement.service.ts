import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  URL = 'http://localhost:8080';
  resourceUrl = `api/v1`

  constructor(private http: HttpClient, private cookie: CookieService, private userService: UserService) { }

  addAdvertisement(form: FormGroup) {
    debugger
    // if (form.invalid) {
    //   return;
    // }
    const userId = Number(this.userService.user?.id);
    const phoneNumber = form.value.phoneNumber;
    const makeId = Number(form.value.makeId);
    const fuelTypeId =  Number(form.value.fuelTypeId);
    const color = form.value.color;
    const power = form.value.power;
    const yearOfManufacture = form.value.yearOfManufacture;
    const price = form.value.price;
    const dateOfCreation = form.value.dateOfCreation;
    debugger
    this.http
      .post(`${this.URL}/${this.resourceUrl}/advertisement`, {
        userId: userId,
        phoneNumber,
        makeId,
        fuelTypeId,
        color,
        power,
        yearOfManufacture,
        price,
        dateOfCreation
      })
      .subscribe(() => {
      });
  }
}
