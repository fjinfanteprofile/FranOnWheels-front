import { Routes } from '@angular/router';
import { HomeComponent } from './modules/+home/home.component';
import { BookingsComponent } from './modules/+bookings/bookings.component';
import { SuccessbookingComponent } from './modules/+successbooking/successbooking.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: 'bookings', component: BookingsComponent},
  {path: 'success', component: SuccessbookingComponent},
  // {path: 'profile', component: BookingsComponent}
];
