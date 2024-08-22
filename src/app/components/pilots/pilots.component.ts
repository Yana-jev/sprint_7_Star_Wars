import { Component, inject, Input, OnInit } from '@angular/core';
import { Pilot } from '../../../data/interfaces/profile.interface';
import { ProfileService } from '../../../data/services/profile.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pilots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pilots.component.html',
  styleUrl: './pilots.component.scss'
})
export class PilotsComponent {
  @Input() pilots: Pilot[] = [];
  private profileService = inject(ProfileService)


  getPilotImage(pilot: Pilot): string {
    return this.profileService.getImageUrl(pilot.url, 'characters');
  } 

  setDefaultImage(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/noship.jpg'; 
  }
}