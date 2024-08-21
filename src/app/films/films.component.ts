import { Component, inject, Input } from '@angular/core';
import { Film } from '../../data/interfaces/profile.interface';
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss'
})
export class FilmsComponent {
  @Input() films: Film[] = [];
  private profileService = inject(ProfileService)


  getFilmImage(film: Film): string {
    return this.profileService.getFilmImageUrl(film.url);
  } 

  setDefaultImage(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/noship.jpg'; 
  }
  convertToRoman(num: number): string {
    const romanNumerals: { [key: number]: string } = {
      1: 'I',
      2: 'II',
      3: 'III',
      4: 'IV',
      5: 'V',
      6: 'VI',
      7: 'VII',
      8: 'VIII',
      9: 'IX',
      10: 'X',
      11: 'XI',
      12: 'XII',
      13: 'XIII',
      14: 'XIV',
      15: 'XV',
      16: 'XVI',
      17: 'XVII',
      18: 'XVIII',
      19: 'XIX',
      20: 'XX'
    };
  
    return romanNumerals[num] || num.toString();
  }
}
