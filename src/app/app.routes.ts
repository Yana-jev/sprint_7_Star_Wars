import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StrashipInfoComponent } from './components/straship-info/straship-info.component';
import { ShipCardsComponent } from './components/ship-cards/ship-cards.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
   {path: '', component: HeaderComponent, children:[

      { path: 'starship', component: ShipCardsComponent}, 
      { path: 'starship/:id', component: StrashipInfoComponent },
      {path: 'login', component: LoginComponent}
   ]},
   { path: 'home', component: HomeComponent},
];
