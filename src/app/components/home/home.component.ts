import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ShipCardsComponent } from '../ship-cards/ship-cards.component';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ShipCardsComponent, HeaderComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
