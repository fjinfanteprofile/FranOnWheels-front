import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../shared/service/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profilepage',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule],
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  updateProfile(): void {
    const userData = {
      name: this.user.name,
      lastName: this.user.lastName,
      dni: this.user.dni,
      phoneNumber: this.user.phoneNumber,
      address: this.user.address,
      email: this.user.email,
      id: this.user.id
    };
    this.userService.updateUserProfile(userData).subscribe(

      (response: any) => {
      },
      (error: any) => {
        console.error('Error updating user:', error);
      }
    );
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/home']);
  }
}
