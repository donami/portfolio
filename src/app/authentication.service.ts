import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

interface User {
  _id: string,
  username: string,
  password: string,
  __v: number
}

@Injectable()
export class AuthenticationService {

  private apiUrl = 'http://localhost:3001/api/auth';  // URL to web api

  constructor(private http: Http) {}

  login(user: string, password: string): Promise<User> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let authed = false;

    return this.http.post(this.apiUrl + '/verify-auth', {username: user, password: password}, options)
      .toPromise()
      .then((res) => res.json())  
  }

  logout(): any {
    localStorage.removeItem('username');
  }

  getUser(): any {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

}

export var AUTH_PROVIDERS: Array<any> = [
  { provide: AuthenticationService, useClass: AuthenticationService }
];
