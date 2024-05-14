import { Component } from '@angular/core';
import { FormContainerBookingsComponent } from './components/form-container-bookings/form-container-bookings.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [FormContainerBookingsComponent, FooterComponent],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent {

}
