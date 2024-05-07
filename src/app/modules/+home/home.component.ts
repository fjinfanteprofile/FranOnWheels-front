import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  bikeUrl: string = 'assets/homepage/bike.jpg'
  carUrl: string = 'assets/homepage/car.jpg'
  truckUrl: string = 'assets/homepage/truck.jpg'

}
