import { AfterViewInit, Component } from '@angular/core';
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
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      const mybutton = window.document.getElementById("btn-back-to-top") as HTMLElement;

      window.onscroll = function () {
        scrollFunction();
      };

      function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          mybutton.classList.add("visible");
        } else {
          mybutton.classList.remove("visible");
        }
      }

      mybutton.addEventListener("click", backToTop);

      function backToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    }
  }
}
