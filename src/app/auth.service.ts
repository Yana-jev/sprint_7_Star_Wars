import { Injectable } from '@angular/core';
import { iLogin, iSignUp } from '../data/interfaces/users.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private authUrl = 'http://localhost:3000';
private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }


  signUp(user: iSignUp): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, user).pipe(
      tap(() => this.loggedIn.next(true))
    );
  }

  login(credentials: iLogin): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, credentials).pipe(
      tap(() => this.loggedIn.next(true))
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  logout() {
    this.loggedIn.next(false);
  }


}
