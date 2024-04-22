import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdvertisementView } from '../shared/interfaces/advertisement.view';
import { Advertisement } from '../shared/interfaces/advertisement';
import { Observable } from 'rxjs';
import { AdvertisementOutView } from '../shared/interfaces/advertisement.outView';
import { User } from '../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  URL = 'http://localhost:8080';
  resourceUrl = `api/v1`
  user: User | undefined;

  constructor(private http: HttpClient
  ) { }

  addAdvertisement(sellerId: number, form: FormGroup): Observable<Advertisement> {
    debugger
    // if (form.invalid) {
    //   return;
    // }
    const userId = Number(sellerId);
    const phoneNumber = form.value.phoneNumber;
    const makeId = Number(form.value.makeId);
    const modelId = Number(form.value.modelId);
    const fuelTypeId = Number(form.value.fuelTypeId);
    const color = form.value.color;
    const power = form.value.power;
    const yearOfManufacture = form.value.yearOfManufacture;
    const price = form.value.price;
    const dateOfCreation = form.value.dateOfCreation;
    const imageUrl = form.value.imageUrl;
    debugger

    return this.http
      .post<Advertisement>(`${this.URL}/${this.resourceUrl}/advertisement`, {
        userId,
        phoneNumber,
        makeId,
        modelId,
        fuelTypeId,
        color,
        power,
        yearOfManufacture,
        price,
        dateOfCreation,
        imageUrl
      })
  }

  updateAdvertisement(_makeId: number | undefined, _modelId: number | undefined, _fuelTypeId: number | undefined, sellerId: number, _id: number, _form: FormGroup): Observable<Advertisement> {
    debugger
    const userId = Number(sellerId);
    const phoneNumber = _form.value.phone;
    const makeId = Number(_makeId);
    const modelId = Number(_modelId);
    const fuelTypeId = Number(_fuelTypeId);
    const color = _form.value.color;
    const power = _form.value.power;
    const yearOfManufacture = _form.value.yearOfManufacture;
    const price = _form.value.price;
    const dateOfCreation = _form.value.dateOfCreation;
    const imageUrl = _form.value.imageUrl;
    debugger

    return this.http
      .put<Advertisement>(`${this.URL}/${this.resourceUrl}/${_id}`, {
        userId,
        phoneNumber,
        makeId,
        modelId,
        fuelTypeId,
        color,
        power,
        yearOfManufacture,
        price,
        dateOfCreation,
        imageUrl
      })
  }

  getAllAdvertisements() {
    debugger
    return this.http.get<AdvertisementView[]>(`${this.URL}/${this.resourceUrl}/advertisements`);
  }

  getAllAdvertisementsWithPagination(pageIndex: number, pageSize: number): Observable<AdvertisementOutView> {
    let param = new HttpParams().set('pageIndex', pageIndex).set('pageSize', pageSize);
    debugger
    return this.http.get<AdvertisementOutView>(`${this.URL}/${this.resourceUrl}/advertisementsWithPagination`, {
      params: param
    });
  }

  getAllMyAdvertisements(user: string) {

    let param = new HttpParams().set('username', user);

    debugger
    return this.http.get<AdvertisementView[]>(`${this.URL}/${this.resourceUrl}/myAdvertisements`, {
      params: param
    })
  }

  getAllMyAdvertisementsWithPagination(user: string, pageIndex: number, pageSize: number): Observable<AdvertisementOutView> {
    let param = new HttpParams().set('username', user).set('pageIndex', pageIndex).set('pageSize', pageSize);
    debugger
    return this.http.get<AdvertisementOutView>(`${this.URL}/${this.resourceUrl}/myAdvertisementsWithPagination`, {
      params: param
    });
  }

  deleteAdvertisement(id: number) {
    return this.http.delete(`${this.URL}/${this.resourceUrl}/advertisement/${id}`);
  }

  getAdvertisement(id: number) {
    return this.http.get<AdvertisementOutView>(`${this.URL}/${this.resourceUrl}/advertisement/${id}`);
  }
}
