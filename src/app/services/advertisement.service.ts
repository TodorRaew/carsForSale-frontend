import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user/user.service';
import { AdvertisementView } from '../shared/interfaces/advertisement.view';
import { Advertisement } from '../shared/interfaces/advertisement';
import { Observable, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AdvertisementOutView } from '../shared/interfaces/advertisementOutView';
import { User } from '../shared/interfaces/user';
import { MakeService } from './make.service';
import { FuelTypeService } from './fuel-type.service';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  URL = 'http://localhost:8080';
  resourceUrl = `api/v1`
  user: User | undefined;

  constructor(private http: HttpClient, private cookie: CookieService, private userService: UserService,
    private makeService: MakeService,
    private fuelTypeService: FuelTypeService) { }

  addAdvertisement(sellerId: number, form: FormGroup): Observable<Advertisement> {
    debugger
    // if (form.invalid) {
    //   return;
    // }
    const userId = Number(sellerId);
    const phoneNumber = form.value.phoneNumber;
    const makeId = Number(form.value.makeId);
    const fuelTypeId = Number(form.value.fuelTypeId);
    const color = form.value.color;
    const power = form.value.power;
    const yearOfManufacture = form.value.yearOfManufacture;
    const price = form.value.price;
    const dateOfCreation = form.value.dateOfCreation;
    debugger

    return this.http
      .post<Advertisement>(`${this.URL}/${this.resourceUrl}/advertisement`, {
        userId,
        phoneNumber,
        makeId,
        fuelTypeId,
        color,
        power,
        yearOfManufacture,
        price,
        dateOfCreation
      })
  }

  updateAdvertisement(sellerId: number, _id: number, _form: FormGroup): Observable<Advertisement> {
    const makeName = _form.controls['makeName'].value;
    const fuelTypeName = _form.controls['fuelTypeName'].value;
    const modelName = _form.controls['modelName'].value;

    let makeId: number;
    let fuelTypeId: number;
    debugger
    return forkJoin([
      this.makeService.getByName(makeName, modelName),
      this.fuelTypeService.getByName(fuelTypeName)
    ]).pipe(
      switchMap(([make, fuelType]) => {
        debugger
        makeId = make.id;
        fuelTypeId = fuelType.id;

        debugger
        const userId = Number(sellerId);
        const phoneNumber = _form.value.phone;
        const color = _form.value.color;
        const power = _form.value.power;
        const yearOfManufacture = _form.value.yearOfManufacture;
        const price = _form.value.price;
        const dateOfCreation = _form.value.dateOfCreation;

        debugger
        return this.http.put<Advertisement>(`${this.URL}/${this.resourceUrl}/${_id}`, {
          userId,
          phoneNumber,
          makeId,
          fuelTypeId,
          color,
          power,
          yearOfManufacture,
          price,
          dateOfCreation
        });
      })
    );
  }

  getAllAdvertisements() {
    debugger
    return this.http.get<AdvertisementView[]>(`${this.URL}/${this.resourceUrl}/advertisements`);
  }

  getAllMyAdvertisements(user: string) {

    let param = new HttpParams().set('username', user);

    debugger
    return this.http.get<AdvertisementView[]>(`${this.URL}/${this.resourceUrl}/myAdvertisements`, {
      params: param
    })
  }

  deleteAdvertisement(id: number) {
    return this.http.delete(`${this.URL}/${this.resourceUrl}/advertisement/${id}`);
  }

  getAdvertisement(id: number) {
    return this.http.get<AdvertisementOutView>(`${this.URL}/${this.resourceUrl}/advertisement/${id}`);
  }
}
