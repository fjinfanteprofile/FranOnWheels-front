import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successbooking',
  standalone: true,
  imports: [],
  templateUrl: './successbooking.component.html',
  styleUrl: './successbooking.component.css'
})
export class SuccessbookingComponent {

  constructor(private router: Router) {}

  goBack(): void {
    // Navigate back to the previous page
    this.router.navigate(['/bookings']);
  }

}
