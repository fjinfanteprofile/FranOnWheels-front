import { Component } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastsContainer } from './shared/components/toast/toast-container.component';
import { CookieBannerComponent } from './shared/components/cookieconsent/cookie-banner/cookie-banner.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterModule, FooterComponent, HttpClientModule,
    ToastsContainer, CookieBannerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'franonwheels-app';
}
