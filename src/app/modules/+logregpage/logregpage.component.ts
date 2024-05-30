import { UserService } from '../../shared/service/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from './service/register.service';
import { errorMessages } from '../../shared/errormessages/errors';
import { TOAST_MSGS, TOAST_TYPES } from '../../shared/components/constants';
import { ToastService } from '../../shared/service/toast.service';


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
  private loginSub: any;
  private registerSub: any;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private registerService: RegisterService,
    private fb: FormBuilder,
    private userService: UserService,
    private toastService : ToastService

  ) {
    this.loginForm = this.createLoginForm();
    this.registerForm = this.createRegisterForm();
  }

  createLoginForm(config = {
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  }) {
    return this.fb.group(config);
  }

  createRegisterForm() {
    return this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8,9}[A-Za-z]?$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(120), Validators.pattern(/^\d+$/)]],
      role: [{ id: 1 }],
      active: [1],
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
          this.toastService.showToast(TOAST_MSGS.login, TOAST_TYPES.success);
        } else {
          this.loginError = errorMessages.login.loginError;
        }
      },
      error => {
        console.error('Login error:', error);
        if (error === errorMessages.login.invalidCredentials) {
          this.loginError = errorMessages.login.invalidCredentials;
        } else {
          this.loginError = errorMessages.login.loginError;
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
          this.toastService.showToast(TOAST_MSGS.register, TOAST_TYPES.success);
        },
        error => {
          this.registerError = errorMessages.register.registrationError;

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
  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }

    if (this.registerSub) {
      this.registerSub.unsubscribe();
    }
  }
}
