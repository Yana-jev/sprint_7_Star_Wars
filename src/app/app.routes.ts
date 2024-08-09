import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StrashipInfoComponent } from './straship-info/straship-info.component';
import { Component } from '@angular/core';
import { ShipCardsComponent } from './ship-cards/ship-cards.component';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
   {path: '', component: HeaderComponent, children:[

      { path: 'starship', component: ShipCardsComponent}, 
      { path: 'starship/:id', component: StrashipInfoComponent },
   ]},
   { path: 'home', component: HomeComponent},
];
