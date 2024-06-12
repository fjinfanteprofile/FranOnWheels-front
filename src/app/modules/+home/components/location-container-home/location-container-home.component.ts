import { Component } from '@angular/core';

@Component({
  selector: 'app-location-container-home',
  standalone: true,
  imports: [],
  templateUrl: './location-container-home.component.html',
  styleUrl: './location-container-home.component.css'
})
export class LocationContainerHomeComponent {

  schoolUrl: string = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.715694591724!2d-74.00628708573768!3d40.71277503513966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f046ee661%3A0x5d77cb246fd14d36!2sDriving%20School!5e0!3m2!1sen!2sus!4v1640614692793!5m2!1sen!2sus"

  trainingUrl: string = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.417275987897!2d-74.0076141857346!3d40.71435253502959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f046ee661%3A0x5d77cb246fd14d36!2sTraining%20Facility!5e0!3m2!1sen!2sus!4v1640614715294!5m2!1sen!2sus"

}
