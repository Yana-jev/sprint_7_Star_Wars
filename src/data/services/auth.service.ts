import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { iLogin, iSignUp } from '../interfaces/users.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private authUrl = 'http://localhost:3000';
private loggedIn = new BehaviorSubject<boolean>(false);
redirectUrl: string | null = null;


constructor(
  private http: HttpClient, 
  private router: Router,
  @Inject(PLATFORM_ID) private platformId: Object 
) { 
  if (this.hasToken()) {
    this.loggedIn.next(true);
  }
}

public hasToken(): boolean {

  if (isPlatformBrowser(this.platformId)) {
    return !!localStorage.getItem('accessToken');
  }
  return false;
}


  signUp(user: iSignUp): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, user).pipe(
      switchMap(() => this.login({ email: user.email, password: user.password })) 
    );
  }

  login(credentials: iLogin): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, credentials).pipe(
      tap((response: any) => {
        console.log('Server response:', response); 
        this.setToken(response.accessToken); 
      })
    );
  }
  
  private setToken(token: string): void {
    console.log('Token received:', token); 
    localStorage.setItem('accessToken', token);
    this.loggedIn.next(true);
  }
  
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  public isUserLoggedIn(): boolean {
    if (this.hasToken()) {
      if (!this.loggedIn.value) {
        this.loggedIn.next(true);
      }
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.loggedIn.next(false);
    this.router.navigate(['/home']); 
  }
}



