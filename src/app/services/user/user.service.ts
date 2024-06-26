import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user';
import { BehaviorSubject, Observable, Subscription, lastValueFrom, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { UserOutView } from 'src/app/shared/interfaces/userOutView';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  URL = 'http://localhost:8080';
  resourceUrl = `api/v1/auth`
  tokenChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  profileOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  user: User | undefined;

  currentUser: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

  subscribtions: Subscription[] = [];

  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) { }

  register(form: FormGroup) {
    debugger
    if (form.invalid) {
      return;
    }

    const { email, username, password, phoneNumber, city } = form.value;
    const sub = this.http
      .post<User>(`${this.URL}/${this.resourceUrl}/register`, {
        email,
        username,
        password,
        phoneNumber,
        city,
      })
      .subscribe(() => {

      });

    this.subscribtions.push(sub);
  }

  login(form: UserOutView): Observable<UserOutView> {
    debugger
    return this.http
      .post<{ token: string, username: string, role: string }>(`${this.URL}/${this.resourceUrl}/login`, form);
  }

  setUser(user: User) {
    this.currentUser.next(user);
  }

  getUser(): Observable<User | undefined>{
    return this.currentUser.asObservable();
  }

  logout() {
    this.cookie.delete('Authorization');
    this.tokenChanged.next(false);
    // this.router.navigate(["/login"])
  }

  getUserByEmail(form: FormGroup) {
    const sub = this.http.get<User>(`${this.URL}/user/byEmail`, {
      headers: { Authorization: this.cookie.get('Authorization') },
      params: {
        email: form.value.email
      }
    })
      .subscribe((user) => {

        const { email, password } = form.value;
        debugger
        if (user.email === email) {
          console.log('Logged in');
        } else {
          console.log('Invalid email or password');
        }
      });

    this.subscribtions.push(sub);
  }

  getCurrentUserName() {
    debugger
    let token = this.cookie.get('Authorization');
    if (!token) {
      return;
    }

    const username = jwtDecode(token);
    return username.sub;
  }

  getCurrentUserByUsername(): Observable<User> {
    debugger
    const username = this.getCurrentUserName() as string;
    return this.http.get<User>(`${this.URL}/user/byUsername`, {
      headers: { Authorization: this.cookie.get('Authorization') },
      params: {
        username: username
      }
    })
  }

  async verifyAuthentication() {
    let token = this.cookie.get('Authorization');
    if (!token) {
      return false;
    }

    // const username = jwtDecode(token);

    // const isVerified = this.http.get(
    //   `http://localhost:8080/${this.resourceUrl}/verifyAuthentication`,
    //   {
    //     params: {
    //       username: username.sub,
    //       token: token,
    //     },
    //     responseType: 'text',
    //   }
    // );

    // const data = await lastValueFrom(isVerified);
    // if (data == 'false') {
    //   localStorage.clear();
    // }
    return true;
  }

  async getRoleAccess(token: any, username: any, role: string) {
    const access = this.http.get(
      `http://localhost:8080/${this.resourceUrl}/roleAccess`,
      {
        params: {
          token: token,
          username: username,
          role: role,
        },
        responseType: 'text',
      }
    );

    const data = await lastValueFrom(access);
    return data;
  }

  updateUser(username: string, imageUrl: string): void {
    debugger

    const sub = this.http.put(`${this.URL}/user/profileImage`, {}, {
      params: {
        username: username,
        imageUrl: imageUrl
      }
    }).subscribe(() => {
      debugger
      // Логика при успешно изпращане на заявката
    }, (error) => {
      debugger
      // Логика при грешка
    });

    this.subscribtions.push(sub);
  }

  ngOnDestroy() {
    debugger
    this.subscribtions.forEach((sub) => sub.unsubscribe());
  }
}
