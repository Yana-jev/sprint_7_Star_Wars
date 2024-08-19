import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../data/services/auth.service';




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

isLogged!: boolean; 

  constructor(public authService: AuthService, private router: Router) {}


ngOnInit(): void {

  this.isLogged = this.authService.hasToken(); 
  this.authService.isLoggedIn().subscribe((loggedIn) => {
    this.isLogged = loggedIn;
  });
    }

onLogout() {
        this.authService.logout();
      }
}
