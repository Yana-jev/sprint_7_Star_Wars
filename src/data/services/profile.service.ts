import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http: HttpClient = inject(HttpClient);
  private nextUrl: string | null = 'https://swapi.dev/api/starships'

  getShipAcount(): Observable<Profile[]> {
    if (!this.nextUrl) {
      return of([]); // Возвращаем пустой Observable, если нет следующего URL
    }

    return this.http.get<{ results: Profile[], next: string | null }>(this.nextUrl)
      .pipe(
        tap(response => {
          this.nextUrl = response.next; // Обновление URL следующей страницы
        }),
        map(response => response.results.map(profile => {
          profile.image = this.getImageUrl(profile.url);
          return profile;
        }))
      );
  }

  

  private getImageUrl(url: string): string {
    const id = url.split('/').slice(-2, -1)[0];
    const imageUrl = `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
    return imageUrl;
  }
  


  constructor() { 
    
  }
}
