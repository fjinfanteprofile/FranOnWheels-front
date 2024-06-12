
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../shared/service/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TOAST_MSGS, TOAST_TYPES } from '../../shared/components/constants';
import { ToastService } from '../../shared/service/toast.service';

@Component({
  selector: 'app-profilepage',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule,ReactiveFormsModule],
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {
  user: any;
  profileForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {
    this.profileForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(20)]],
        lastName: ['', [Validators.required, Validators.maxLength(30)]],
        dni: ['', [Validators.required, Validators.pattern(/^\d{8}[A-Z]$/), Validators.maxLength(9)]],
        phoneNumber: ['', [Validators.required, Validators.maxLength(15)]], 
        address: ['', [Validators.required, Validators.maxLength(60)]], 
        email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]] 
      });
  }

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
