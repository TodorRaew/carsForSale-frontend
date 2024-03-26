import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Advertisement } from 'src/app/shared/interfaces/advertisement';
import { AdvertisementView } from 'src/app/shared/interfaces/advertisement.view';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  URL = 'http://localhost:8080';
  resourceUrl = `api/v1`;

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getAllAdvertisements(){
    debugger
    return this.http.get<AdvertisementView[]>(`${this.URL}/${this.resourceUrl}/advertisements`);
  }

  deleteAdvertisement(id: number){
    return this.http.delete(`${this.URL}/${this.resourceUrl}/advertisement/${id}`);
  }

  getAdvertisement(id: number){
    return this.http.get<Advertisement>(`${this.URL}/${this.resourceUrl}/advertisement/${id}`);
  }
}
