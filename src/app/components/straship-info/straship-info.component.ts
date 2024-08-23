import { Component, inject, Input } from '@angular/core';
import { Film, Pilot, Profile } from '../../../data/interfaces/profile.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { PilotsComponent } from '../pilots/pilots.component';
import { forkJoin } from 'rxjs';
import { FilmsComponent } from '../../films/films.component';


@Component({
  selector: 'app-straship-info',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, PilotsComponent, FilmsComponent],
  templateUrl: './straship-info.component.html',
  styleUrl: './straship-info.component.scss'
})
export class StrashipInfoComponent {
  @Input() profile!: Profile;
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  pilots: Pilot[] = [];
  films: Film[] = [];

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<Profile>(`https://swapi.dev/api/starships/${id}`).subscribe(data => {
      this.profile = { ...data, image: this.getImageUrl(data.url) };
      this.loadPilots(data.pilots);
      this.loadFilms(data.films)
    });
  }

  private loadPilots(pilotUrls: string[]): void {
    if (pilotUrls.length === 0) return;
  
    const pilotRequests = pilotUrls.map(url => this.http.get<Pilot>(url));
    forkJoin(pilotRequests).subscribe(pilots => {
      this.pilots = pilots;
      console.log('pilots:', this.pilots);
    });
  }

  private loadFilms(filmUrls: string[]): void {
    if (filmUrls.length === 0) return;
    const filmRequests = filmUrls.map(url => this.http.get<Film>(url));
    forkJoin(filmRequests).subscribe(films => {
      this.films = films;
      console.log ('films:', this.films)
    })
  }

  private getImageUrl(url: string): string {
    const id = url.split('/').slice(-2, -1)[0];
    const imageUrl = `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
    return imageUrl;
  }


  setDefaultImage(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/noship.jpg'; 
  }
}




