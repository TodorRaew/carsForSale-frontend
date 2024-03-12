import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Advertisement } from 'src/app/shared/interfaces/advertisement';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  URL = 'http://localhost:8080';
  resourceUrl = `api/v1`

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getAllAdvertisements(): Observable<Advertisement[]> {
    debugger
    return this.http.get<Advertisement[]>(`${this.URL}/${this.resourceUrl}/advertisements`, {
      headers: {
        'Authorization': `Bearer ${this.cookie.get('token')}`
      }
    });
  }
}
