import { Component, HostListener, inject, Input } from '@angular/core';
import { Profile } from '../../../data/interfaces/profile.interface';
import { ProfileService } from '../../../data/services/profile.service';
import { RouterModule } from '@angular/router';
import { concatMap } from 'rxjs';
import { HeaderComponent } from "../header/header.component";


@Component({
  selector: 'app-ship-cards',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './ship-cards.component.html',
  styleUrl: './ship-cards.component.scss'
})
export class ShipCardsComponent {
  profileService = inject(ProfileService);
  profiles: Profile[] = []
  @Input() profile!: Profile;
  loading = false;

  constructor(){
    this.loadMoreShips(); 
  }

  loadMoreShips() {
    if (this.loading) return;
    this.loading = true;
    this.profileService.getShipAcount().pipe(
      concatMap(newProfiles => {
        this.profiles = [...this.profiles, ...newProfiles];
        this.loading = false;
        return [];
      })
    ).subscribe();
  }

  getStarshipId(profile: Profile): string {
    return profile.url.split('/').slice(-2, -1)[0];
  }
  

  @HostListener('window:scroll', [])
  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (pos >= max) {
      this.loadMoreShips();
    }
  }

  trackByFn(index: number, item: Profile) {
    return item.url; 
  }
}
