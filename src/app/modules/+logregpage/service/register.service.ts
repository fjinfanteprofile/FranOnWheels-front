import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(username: string, name: string, lastName: string, dni: string,
    phoneNumber: string, address: string, email: string, password: string, age: string, role: { id: number }, active: number): Observable<any> {

      console.log('Registering user:', username, name, lastName, dni, phoneNumber, address, email, password, age, role, active);

      const registerData = { username, name, lastName, dni, phoneNumber, address, email, password, age, role, active };
    return this.http.post<any>('http://localhost:8080/users', registerData).pipe(
      catchError(error => {
        if (error.status === 400) {
          return throwError('Registration failed. Please check your details and try again.');
        } else {
          return throwError('An error occurred while registering. Please try again later.');
        }
      })
    );
  }
}
