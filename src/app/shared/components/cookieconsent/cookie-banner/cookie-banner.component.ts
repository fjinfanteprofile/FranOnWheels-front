import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.css'
})
export class CookieBannerComponent implements OnInit {

  isVisible: boolean = false;

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    // Check if the user has already accepted cookies
    if (this.cookieService.get('cookiesAccepted') === 'true') {
      this.isVisible = false;
    } else  if (this.cookieService.get('cookiesAccepted') === 'false') {
      this.isVisible = true;
    }
  }

  acceptCookies(): void {
    this.cookieService.set('cookiesAccepted', 'true', 365);
    this.isVisible = false;
  }
}
