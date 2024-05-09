import { UserService } from './../../shared/auth/user.service';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logregpage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './logregpage.component.html',
  styleUrl: './logregpage.component.css'
})
export class LogregpageComponent {
  showLoginForm: boolean = true;
  loginError: string | null = null;
  email: string = '';
  password: string = '';
  userService: UserService;

  constructor(private http: HttpClient, private router: Router, userService: UserService) {
    this.userService = userService; 
  }

  toggleForm() {
    this.showLoginForm = !this.showLoginForm;
    this.loginError = null;
  }


  onSubmit(event: Event): void {


    event.preventDefault();
    const loginData = {
      email: this.email,
      password: this.password
    };

    console.log(loginData);

    this.http.post<any>('http://localhost:8080/users/login', loginData)
    .subscribe(
      user => {
        // Handle successful login
        console.log('Logged in user:', user);

        this.userService.setUser(user);

        // Redirect to the profile page with user data as parameter
        this.router.navigate(['/profile']);
      },
      error => {
        // Handle login error
        console.error('Login error:', error);
        if (error.status === 401) {
          this.loginError = 'Invalid email or password. Please try again.';
        } else {
          this.loginError = 'An error occurred while logging in. Please try again later.';
        }
      }
    );
}
}
