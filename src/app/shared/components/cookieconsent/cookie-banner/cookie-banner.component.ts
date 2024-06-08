import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.css'],
})
export class CookieBannerComponent implements OnInit {

  isVisible: boolean = false;

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void { 
    const cookiesAccepted = this.cookieService.get('cookiesAccepted');
    if (cookiesAccepted === 'true') {
      this.isVisible = false;
    } else if (cookiesAccepted === 'false') {
      this.isVisible = true;
    } else {
      this.isVisible = true; 
    }
  }

  acceptCookies(): void {
    this.cookieService.set('cookiesAccepted', 'true', 365);
    this.isVisible = false;
  }
}
