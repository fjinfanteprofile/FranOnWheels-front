import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  contactLinks = [
    { text: 'Phone: 123-456-789', url: 'tel:123456789' },
    { text: 'Email', url: 'mailto:info@franonwheels.com' },
    { text: 'Facebook', url: 'https://www.facebook.com/franonwheels' },
    { text: 'Twitter', url: 'https://twitter.com/franonwheels' }
  ];

}
