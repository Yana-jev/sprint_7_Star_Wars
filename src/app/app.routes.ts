import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StrashipInfoComponent } from './components/straship-info/straship-info.component';
import { ShipCardsComponent } from './components/ship-cards/ship-cards.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PilotsComponent } from './components/pilots/pilots.component';
import { FilmsComponent } from './films/films.component';
import { VisualGuideComponent } from './visual-guide/visual-guide.component';
import { authGuard } from './guard/auth.guard';


export const routes: Routes = [


   { path: '', redirectTo: 'home', pathMatch: 'full' },
   {path: '', component: HeaderComponent, children:[

      { path: 'starship', component: ShipCardsComponent, canActivate: [authGuard]}, 
      { path: 'starship/:id', component: StrashipInfoComponent },
      { path: 'register', component: RegisterComponent, },
      { path: 'login', component: LoginComponent, },
      { path: 'home', component: HomeComponent},
      { path: 'pilots', component: PilotsComponent},
      { path: 'films', component: FilmsComponent},
      { path: 'visual-guide/:category', component: VisualGuideComponent, canActivate: [authGuard]},

   ]},
   {path: '**', component: NotfoundComponent}
];
