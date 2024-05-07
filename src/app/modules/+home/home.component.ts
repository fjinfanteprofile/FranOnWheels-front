import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  bikeUrl: string = 'assets/homepage/bike.jpg'
  carUrl: string = 'assets/homepage/car.jpg'
  truckUrl: string = 'assets/homepage/truck.jpg'

  man1: string = 'assets/homepage/profilepic-man.png'
  man2: string = 'assets/homepage/profilepic-man-2.png'
  woman1: string = 'assets/homepage/profilepic-woman.png'
  woman2: string = 'assets/homepage/profilepic-woman-2.png'
}
