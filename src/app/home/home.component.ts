import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfaces/profile.interface';
import { ShipCardsComponent } from '../ship-cards/ship-cards.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ShipCardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  profileService = inject(ProfileService);
  profiles: Profile[] = []


  constructor(){
    this.profileService.getTestAcount().subscribe(val => {
      this.profiles = val
    })
  }
}
