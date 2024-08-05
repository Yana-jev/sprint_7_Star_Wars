import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http: HttpClient = inject(HttpClient);

  getTestAcount(): Observable<Profile[]> {
    return this.http.get<any>('https://swapi.dev/api/starships')
      .pipe(map(response => {
        console.log(response); 
        return response.results as Profile[]; 
      }));
  }

  constructor() { 
    
  }
}
