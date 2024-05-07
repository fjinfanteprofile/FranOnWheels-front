import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ImgContainerHomeComponent } from './components/img-container-home/img-container-home.component';
import { LocationContainerHomeComponent } from './components/location-container-home/location-container-home.component';
import { TestimonialsContainerHomeComponent } from './components/testimonials-container-home/testimonials-container-home.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent,ImgContainerHomeComponent,LocationContainerHomeComponent,TestimonialsContainerHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

 
}
