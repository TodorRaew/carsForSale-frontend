import { Injectable } from '@angular/core';
import { Make } from '../shared/interfaces/make';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MakeService {
  makes: Make[] = [];
  URL = 'http://localhost:8080';
  resourceUrl = `api/v1/auth`

  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) { }

  getAllMakes() {
    debugger
    return this.http.get<Make[]>(`${this.URL}/make`, {
      headers: {Authorization: this.cookie.get('Authorization')}
    })
  }
}
