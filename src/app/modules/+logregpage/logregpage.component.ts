import { UserService } from '../../shared/service/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from './service/register.service';

@Component({
  selector: 'app-logregpage',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './logregpage.component.html',
  styleUrls: ['./logregpage.component.css']
})
export class LogregpageComponent {
  showLoginForm: boolean = true;
  loginError: string | null = null;
  registerError: string | null = null;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private registerService: RegisterService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8,9}[A-Za-z]?$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),  Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(120), Validators.pattern(/^\d+$/)]],
      role: [ { id: 1 }],
      active: [1]
    });
  }

  toggleForm() {
    this.showLoginForm = !this.showLoginForm;
    this.loginError = null;
    this.registerError = null;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;
    this.loginService.login(loginData.email, loginData.password).subscribe(
      user => {
        if (user) {
          this.userService.setUser(user);
          this.router.navigate(['/']);
        } else {
          this.loginError = 'Invalid email or password. Please try again.';
        }
      },
      error => {
        console.error('Login error:', error);
        if (error === 'Invalid email or password. Please try again.') {
          this.loginError = error;
        } else {
          this.loginError = 'An error occurred while logging in. Please try again later.';
        }
      }
    );
  }

  onRegisterSubmit() {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    const { username, name, lastName, dni, phoneNumber, address, email, password, age, role, active } = this.registerForm.value;

    this.registerService.registerUser(username, name, lastName, dni, phoneNumber, address, email, password, age, role, active)
      .subscribe(
        response => {
          this.showLoginForm = true;
          this.registerError = null;
        },
      error => {
          this.registerError = 'An error occurred while registering. Please try again.';

      }
    );
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
}
}
