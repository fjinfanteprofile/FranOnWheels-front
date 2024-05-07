import { Routes } from '@angular/router';
import { HomeComponent } from './modules/+home/home.component';
import { BookingsComponent } from './modules/+bookings/bookings.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: 'bookings', component: BookingsComponent}
  // {path: 'profile', component: BookingsComponent}
];
