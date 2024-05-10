import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>('http://localhost:8080/users/login', loginData).pipe(
      catchError(error => {
        if (error.status === 401) {
          return throwError('Invalid email or password. Please try again.');
        } else {
          return throwError('An error occurred while logging in. Please try again later.');
        }
      })
    );
  }
}
