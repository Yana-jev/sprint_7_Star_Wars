import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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

// public hasToken(): boolean {
//   return !!localStorage.getItem('accessToken');
// }

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

//   constructor(private http: HttpClient, private router: Router) { 
//     if (this.hasToken()) {
//       this.loggedIn.next(true);
//   }
// }

  signUp(user: iSignUp): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, user)
    ;
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

  logout(): void {
    localStorage.removeItem('accessToken');
    this.loggedIn.next(false);
    this.router.navigate(['/login']); 
  }
}



