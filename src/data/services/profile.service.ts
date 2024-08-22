import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Characters, Film, Pilot, Planets, Profile, Species, Vehicles } from '../interfaces/profile.interface';
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
          profile.image = this.getImageUrl(profile.url, 'starships');
          return profile;
        }))
      );
  }

  getPilots(pilotUrls: string[]): Observable<Pilot[]> {
    if (pilotUrls.length === 0) {
      return new Observable<Pilot[]>((observer) => {
        observer.next([]);
        observer.complete();
      });
    }
    const requests = pilotUrls.map(url => this.http.get<Pilot>(url));
    return forkJoin(requests); 
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


  getImageUrl(entityUrl: string | undefined, entityType: 'starships' |'films' | 'characters' | 'planets' | 'species' | 'vehicles'): string {
    if (!entityUrl) {
      return 'assets/noship.jpg'; 
    }
    
    const id = entityUrl.split('/').slice(-2, -1)[0];
    return `https://starwars-visualguide.com/assets/img/${entityType}/${id}.jpg`;
  }
  
  
  private planetsUrl: string = 'https://swapi.dev/api/planets/';
  private filmsUrl: string = 'https://swapi.dev/api/films/';
  private peopleUrl: string = 'https://swapi.dev/api/people/';
  private speciesUrl: string = 'https://swapi.dev/api/species/';
  private vehiclessUrl: string = 'https://swapi.dev/api/vehicles/';
  private starshipUrl: string = 'https://swapi.dev/api/starships'



  getPlanets(url: string = this.planetsUrl): Observable<{ results: Planets[], next: string | null }> {
    return this.http.get<{ results: Planets[], next: string | null }>(url)
      .pipe(
        map(response => ({
          results: response.results.map(planet => {
            planet.image = this.getImageUrl(planet.url, 'planets');
            return planet;
          }),
          next: response.next 
        }))
      );
  }

  getFilms(url: string = this.filmsUrl): Observable<{ results: Film[], next: string | null }> {
    return this.http.get<{ results: Film[], next: string | null }>(url)
      .pipe(
        map(response => ({
          results: response.results.map(film => {
            film.image = this.getImageUrl(film.url, 'films');
            return film;
          }),
          next: response.next 
        }))
      );
  }
  
  getCharacters(url: string = this.peopleUrl): Observable<{ results: Characters[], next: string | null }> {
    return this.http.get<{ results: Characters[], next: string | null }>(url)
      .pipe(
        map(response => ({
          results: response.results.map(character => {
            character.image = this.getImageUrl(character.url, 'characters');
            return character;
          }),
          next: response.next 
        }))
      );
  }

  getSpecies(url: string = this.speciesUrl): Observable< {results: Species[], next: string | null}>{
    return this.http.get<{results: Species[], next: string | null}>(url)
    .pipe(
      map(response => ({
        results: response.results.map(specie =>{
          specie.image = this.getImageUrl(specie.url, 'species');
          return specie;
        }),
        next: response.next
      }))
    )
  }

  getVehicles(url: string = this.vehiclessUrl): Observable< {results: Vehicles[], next: string | null}>{
    return this.http.get<{results: Vehicles[], next: string | null}>(url)
    .pipe(
      map(response => ({
        results: response.results.map(vehicle =>{
          vehicle.image = this.getImageUrl(vehicle.url, 'vehicles');
          return vehicle;
        }),
        next: response.next
      }))
    )
  }

  getStarships(url: string = this.starshipUrl): Observable< {results: Profile[], next: string | null}>{
    return this.http.get<{results: Profile[], next: string | null}>(url)
    .pipe(
      map(response => ({
        results: response.results.map(starship =>{
          starship.image = this.getImageUrl(starship.url, 'starships');
          return starship;
        }),
        next: response.next
      }))
    )
  }
  
  }


