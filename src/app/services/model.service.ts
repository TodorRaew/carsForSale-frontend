import { Injectable } from '@angular/core';
import { Model } from '../shared/interfaces/model';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  URL = 'http://localhost:8080';
  resourceUrl = `api/v1`

  constructor(
    private http: HttpClient,
    private cookie: CookieService) { }

  getAllModelsByMakeName(makeName: string) {
    debugger
    return this.http.get<string[]>(`${this.URL}/${this.resourceUrl}/allModelsByMake`, {
      params: {
        makeName
      }
    });
  }
}
