import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-profilepage',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute, private userService : UserService, private router: Router) {

   }

  ngOnInit(): void {
    this.user = this.userService.getUser();

  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/home']);
  }
}
