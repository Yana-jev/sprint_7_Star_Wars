import { Component, inject, Input } from '@angular/core';
import { Profile } from '../../../data/interfaces/profile.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";


@Component({
  selector: 'app-straship-info',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './straship-info.component.html',
  styleUrl: './straship-info.component.scss'
})
export class StrashipInfoComponent {
  @Input() profile!: Profile;
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);


  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<Profile>(`https://swapi.dev/api/starships/${id}`).subscribe(data => {
      this.profile =  { ...data, image: this.getImageUrl(data.url) };
    });
  }

  private getImageUrl(url: string): string {
    const id = url.split('/').slice(-2, -1)[0];
    const imageUrl = `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
    console.log('Generated Image URL:', imageUrl);
    return imageUrl;
  }


  setDefaultImage(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/noship.jpg'; 
  }


}
