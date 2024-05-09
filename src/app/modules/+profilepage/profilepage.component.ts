import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/auth/user.service';

@Component({
  selector: 'app-profilepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute, private userService : UserService) {

   }

  ngOnInit(): void {
    // Retrieve user data from route parameters
    this.user = this.userService.getUser();
  }
}
