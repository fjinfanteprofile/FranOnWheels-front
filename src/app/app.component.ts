import { Component } from '@angular/core';
import { NavbarComponent } from './modules/shared/navbar/navbar.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'franonwheels-app';
}
