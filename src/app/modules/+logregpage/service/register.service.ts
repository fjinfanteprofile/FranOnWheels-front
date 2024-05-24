import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiUrls } from '../../../shared/uris/ApiUrls';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(username: string, name: string, lastName: string, dni: string,
    phoneNumber: string, address: string, email: string, password: string, age: string, role: { id: number }, active: number): Observable<any> {

      const registerData = { username, name, lastName, dni, phoneNumber, address, email, password, age, role, active };
    return this.http.post<any>(ApiUrls.USERS_URL, registerData).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
