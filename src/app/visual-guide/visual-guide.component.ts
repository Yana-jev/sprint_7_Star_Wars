import { Component, HostListener, inject, Input } from '@angular/core';
import { Characters, Film, Planets, Profile, Species, Vehicles } from '../../data/interfaces/profile.interface';
import { ProfileService } from '../../data/services/profile.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-visual-guide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visual-guide.component.html',
  styleUrl: './visual-guide.component.scss'
})
export class VisualGuideComponent {
  @Input() films: Film[] = [];
  planets: Planets[] = [];
  characters: Characters[] = [];
  species: Species[]=[];
  vehicles: Vehicles[]=[]
  starships: Profile[]=[]
  private nextPageUrl: string | null = null;
  
  category: string = '';
  private profileService = inject(ProfileService);
  private route = inject(ActivatedRoute);

  loadData(): void {
    switch (this.category) {
      case 'planets':
        this.loadPlanets();
        break;
      case 'films':
        this.loadFilms();
        break;
      case 'characters':
        this.loadCharacters();
        break;
      case 'species':
        this.loadSpecies();
        break;
        case 'vehicles':
        this.loadVehicles();
        break;
        case 'starships':
        this.loadStarships();
        break;
      default:
        console.error('Unknown category:', this.category);
    }
  }

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category') || '';
    this.loadData();
  }


  loadPlanets(): void {
    this.profileService.getPlanets(this.nextPageUrl?? undefined).subscribe(response => {
      this.planets = [...this.planets, ...response.results];
      this.nextPageUrl = response.next; 
    });
  }

  loadFilms(): void {
    this.profileService.getFilms(this.nextPageUrl?? undefined).subscribe(response => {
      this.films = [...this.films, ...response.results];
      this.nextPageUrl = response.next;
    });
  }

  loadCharacters(): void {
    this.profileService.getCharacters(this.nextPageUrl?? undefined).subscribe(response => {
      this.characters = [...this.characters, ...response.results];
      this.nextPageUrl = response.next;
    });
  }


  loadSpecies(): void {
    this.profileService.getSpecies(this.nextPageUrl?? undefined).subscribe(response => {
      this.species = [...this.species, ...response.results];
      this.nextPageUrl = response.next
    })
  }

  loadStarships(): void {
    this.profileService.getStarships(this.nextPageUrl?? undefined).subscribe(response => {
      this.starships = [...this.starships, ...response.results];
      this.nextPageUrl = response.next
    })
  }

  loadVehicles(): void {
    this.profileService.getVehicles(this.nextPageUrl?? undefined).subscribe(response => {
      this.vehicles = [...this.vehicles, ...response.results];
      this.nextPageUrl = response.next
    })
  }

  setDefaultImage(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/noship.jpg'; 
  }


  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      if (this.nextPageUrl) {
        this.loadData(); 
      }
    }
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
