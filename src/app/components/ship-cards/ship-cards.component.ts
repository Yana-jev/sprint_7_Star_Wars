import { Component, HostListener, inject, Input } from '@angular/core';
import { Profile } from '../../../data/interfaces/profile.interface';
import { ProfileService } from '../../../data/services/profile.service';
import { RouterModule } from '@angular/router';
import { concatMap } from 'rxjs';


@Component({
  selector: 'app-ship-cards',
  standalone: true,
  imports: [RouterModule],
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


  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if(pos >= max) {
      this.loadMoreShips();
    }
  }
}