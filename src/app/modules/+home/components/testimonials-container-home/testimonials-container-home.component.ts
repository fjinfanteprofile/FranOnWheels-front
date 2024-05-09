import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials-container-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials-container-home.component.html',
  styleUrl: './testimonials-container-home.component.css'
})
export class TestimonialsContainerHomeComponent {

  testimonials = [
    { name: 'Federica Pepa', img: 'assets/homepage/profilepic-woman-2.png', text: 'I had a wonderful experience learning to drive with FranOnWheels. The instructors were patient and supportive, and they helped me build confidence behind the wheel. I highly recommend them to anyone looking to learn how to drive.' },
    { name: 'George Clouney', img: 'assets/homepage/profilepic-man.png', text: 'I had a wonderful experience learning to drive with FranOnWheels. The instructors were patient and supportive, and they helped me build confidence behind the wheel. I highly recommend them to anyone looking to learn how to drive.' },
    { name: 'Stefany Claer', img: 'assets/homepage/profilepic-woman.png', text: 'I had a wonderful experience learning to drive with FranOnWheels. The instructors were patient and supportive, and they helped me build confidence behind the wheel. I highly recommend them to anyone looking to learn how to drive.' },
    { name: 'Manolo Pepe', img: 'assets/homepage/profilepic-man-2.png', text: 'I had a wonderful experience learning to drive with FranOnWheels. The instructors were patient and supportive, and they helped me build confidence behind the wheel. I highly recommend them to anyone looking to learn how to drive.' }
  ];

}
