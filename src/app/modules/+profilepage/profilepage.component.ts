
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../shared/service/user.service';
import { FormsModule } from '@angular/forms';
import { TOAST_MSGS, TOAST_TYPES } from '../../shared/components/constants';
import { ToastService } from '../../shared/service/toast.service';

@Component({
  selector: 'app-profilepage',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule],
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, private router: Router, private toastService : ToastService) {}

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
        this.toastService.showToast('Profile updated successfully', TOAST_TYPES.success);
        
        // Fetch the updated user profile from server
        this.userService.getUserFromServer().subscribe(
          (updatedUser: any) => {
            this.userService.setUser(updatedUser); //latest data
            this.user = updatedUser; 
          },
          (error: any) => {
            console.error('Error fetching updated user data:', error);
          }
        );
      },
      (error: any) => {
        console.error('Error updating user:', error);
        this.toastService.showToast('Error updating profile', TOAST_TYPES.danger);
      }
    );
  }

  logout(): void {
    this.userService.logout();
    this.toastService.showToast(TOAST_MSGS.logout, TOAST_TYPES.danger);
    this.router.navigate(['/']);
  }
}
