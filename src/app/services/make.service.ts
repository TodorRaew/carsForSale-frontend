import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MakeDto } from '../shared/interfaces/makeDto';

@Injectable({
  providedIn: 'root'
})
export class MakeService {
  URL = 'http://localhost:8080';
  resourceUrl = `api/v1/auth`

  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) { }

  getAllMakes() {
    debugger
    return this.http.get<MakeDto[]>(`${this.URL}/brand`, {
      headers: { Authorization: this.cookie.get('Authorization') }
    })
  }

  getByName(name: string, modelName: string) {
    return this.http.get<MakeDto>(`${this.URL}/make/byName`, {
      params: {
        name,
        modelName
      }
    });
  }
}
