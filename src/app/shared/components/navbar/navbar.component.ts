// navbar.component.ts
import { CommonModule } from '@angular/common';
import {Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnDestroy {
  user: any;
  myUrl: string = 'assets/FranOnWheelsLogo.png'
  userSubscription: Subscription;


  constructor(private userService: UserService) {
    this.userSubscription = this.userService.userSubject.subscribe((user: any) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
