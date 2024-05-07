import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials-container-home',
  standalone: true,
  imports: [],
  templateUrl: './testimonials-container-home.component.html',
  styleUrl: './testimonials-container-home.component.css'
})
export class TestimonialsContainerHomeComponent {

  man1: string = 'assets/homepage/profilepic-man.png'
  man2: string = 'assets/homepage/profilepic-man-2.png'
  woman1: string = 'assets/homepage/profilepic-woman.png'
  woman2: string = 'assets/homepage/profilepic-woman-2.png'

}
