import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Film, Pilot, Profile } from '../interfaces/profile.interface';
import { forkJoin, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http: HttpClient = inject(HttpClient);
  private nextUrl: string | null = 'https://swapi.dev/api/starships'

  getShipAcount(): Observable<Profile[]> {
    if (!this.nextUrl) {
      return of([]); 
    }

    return this.http.get<{ results: Profile[], next: string | null }>(this.nextUrl)
      .pipe(
        tap(response => {
          this.nextUrl = response.next; 
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
  
  getPilots(pilotUrls: string[]): Observable<Pilot[]> {
    if (pilotUrls.length === 0) {
      return new Observable<Pilot[]>((observer) => {
        observer.next([]);
        observer.complete();
      });
    }

    // Создаем запросы для каждого пилота
    const requests = pilotUrls.map(url => this.http.get<Pilot>(url));
    return forkJoin(requests);  // Запрашиваем все данные о пилотах одновременно
  }

  getPilotImageUrl(pilotUrl: string): string {
    const id = pilotUrl.split('/').slice(-2, -1)[0];  // Извлекаем ID пилота из URL
    return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
  }


  getFilm(filmUrls: string[]): Observable<Film[]>{
    if(filmUrls.length === 0){
      return new Observable<Film[]>((observer)=>{
        observer.next([]);
        observer.complete()
      })
    }
    const request = filmUrls.map(url => this.http.get<Film>(url));
    return forkJoin(request);
  }

  getFilmImageUrl(filmUrl: string): string {
    const id = filmUrl.split('/').slice(-2,-1)[0];
    return `https://starwars-visualguide.com/assets/img/films/${id}.jpg`;
  }



}
