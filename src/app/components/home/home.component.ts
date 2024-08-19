import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Profile } from '../../../data/interfaces/profile.interface';
import { ProfileService } from '../../../data/services/profile.service';
import { ShipCardsComponent } from '../ship-cards/ship-cards.component';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../data/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ShipCardsComponent, HeaderComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
//   profileService = inject(ProfileService);
//   profiles: Profile[] = []

//   isLogged = false; 

//   constructor(private authService: AuthService){
//     this.profileService.getShipAcount().subscribe(val => {
//       this.profiles = val
//     })
//   }

// ngOnInit(): void {
//   this.authService.isLoggedIn().subscribe((loggedIn) => {
//     this.isLogged = loggedIn;
//   });
  
// }

// onLogout() {
//   this.authService.logout();
// }


}
