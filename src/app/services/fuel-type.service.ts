import { Injectable } from '@angular/core';
import { FuelTypeDto } from '../shared/interfaces/fuelTypeDto';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FuelTypeService {
  URL = 'http://localhost:8080';
  resourceUrl = `api/v1`

  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) { }

  getAllFuelTypes() {
    debugger
    return this.http.get<FuelTypeDto[]>(`${this.URL}/${this.resourceUrl}/fuelTypes`, {
      headers: {Authorization: this.cookie.get('Authorization')}
    })
  }
}
