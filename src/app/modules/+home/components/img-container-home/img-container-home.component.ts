import { Component } from '@angular/core';

@Component({
  selector: 'app-img-container-home',
  standalone: true,
  imports: [],
  templateUrl: './img-container-home.component.html',
  styleUrl: './img-container-home.component.css'
})
export class ImgContainerHomeComponent {

  bikeUrl: string = 'assets/homepage/bike.jpg'
  carUrl: string = 'assets/homepage/car.jpg'
  truckUrl: string = 'assets/homepage/truck.jpg'

}
