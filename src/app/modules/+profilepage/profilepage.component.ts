import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profilepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {
  currentUser: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Retrieve user data from route parameters
    const userData = history.state.user;
    if (userData) {
      this.currentUser = userData;
    } else {
      console.error('User data not found in route parameters');
    }
  }
}
