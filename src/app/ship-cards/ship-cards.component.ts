import { Component, Input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-ship-cards',
  standalone: true,
  imports: [],
  templateUrl: './ship-cards.component.html',
  styleUrl: './ship-cards.component.scss'
})
export class ShipCardsComponent {
  @Input() profile!: Profile;
}
