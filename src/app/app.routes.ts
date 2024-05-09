import { Routes } from '@angular/router';
import { HomeComponent } from './modules/+home/home.component';
import { BookingsComponent } from './modules/+bookings/bookings.component';
import { SuccessbookingComponent } from './modules/+successbooking/successbooking.component';
import { LogregpageComponent } from './modules/+logregpage/logregpage.component';
import { ProfilepageComponent } from './modules/+profilepage/profilepage.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: 'bookings', component: BookingsComponent},
  {path: 'success', component: SuccessbookingComponent},
  {path: 'logreg', component: LogregpageComponent},
  {path: 'profile', component: ProfilepageComponent}
];
