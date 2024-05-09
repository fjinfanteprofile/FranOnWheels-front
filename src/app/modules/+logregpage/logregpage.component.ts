import { UserService } from './../../shared/auth/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service'; // Import LoginService
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-logregpage',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './logregpage.component.html',
  styleUrls: ['./logregpage.component.css']
})
export class LogregpageComponent {
  showLoginForm: boolean = true;
  loginError: string | null = null;
  email: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserService, private loginService: LoginService, private http: HttpClient) {
    // Provide HttpClientModule here
    this.http = http;
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

    this.loginService.login(this.email, this.password) 
      .subscribe(
        user => {
          console.log('Logged in user:', user);
          this.userService.setUser(user);
          this.router.navigate(['/home']);
        },
        error => {
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
