import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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

}
