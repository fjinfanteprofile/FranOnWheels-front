import { Component } from '@angular/core';
import { ImgContainerHomeComponent } from './components/img-container-home/img-container-home.component';
import { LocationContainerHomeComponent } from './components/location-container-home/location-container-home.component';
import { TestimonialsContainerHomeComponent } from './components/testimonials-container-home/testimonials-container-home.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImgContainerHomeComponent,LocationContainerHomeComponent,TestimonialsContainerHomeComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


}
