import { Component } from '@angular/core';
import { FormContainerBookingsComponent } from './components/form-container-bookings/form-container-bookings.component';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [FormContainerBookingsComponent],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent {

}
