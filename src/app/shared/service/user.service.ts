import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: any;
  userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/active`);
  }

  setUser(user: any) {
    this.user = user;
    this.userSubject.next(user); // Emit the updated user to subscribers
  }

  getUser() {
    return this.user;
  }
  logout() {
    this.user = null;
    this.userSubject.next(null);
  }

  getUserObservable(): Observable<any> {
    return new Observable(observer => {
      observer.next(this.user);
    });
  }



  createUser(username: string, name: string, lastName: string, dni: string,
    phoneNumber: string, address: string, email: string, password: string, age: string, roleId: number, active: number): Observable<any> {

      const createUserData = {
        username,
        name,
        lastName,
        dni,
        phoneNumber,
        address,
        email,
        password,
        age,
        role: { id: roleId },
        active
      };
    return this.http.post<any>(this.apiUrl, createUserData).pipe(
      catchError(error => {
        if (error.status === 400) {
          return throwError('Registration failed. Please check your details and try again.');
        } else {
          return throwError('An error occurred while registering. Please try again later.');
        }
      })
    );
  }

  updateUser(username: string, name: string, lastName: string, dni: string,
    phoneNumber: string, address: string, email: string, password: string, age: string, roleId: number, active: number, id: number): Observable<any> {

      const createUserData = {
        username,
        name,
        lastName,
        dni,
        phoneNumber,
        address,
        email,
        password,
        age,
        role: { id: roleId },
        active
      };


    return this.http.put<any>((`${this.apiUrl}/${id}`) , createUserData).pipe(
      catchError(error => {
        if (error.status === 400) {
          return throwError('Registration failed. Please check your details and try again.');
        } else {
          return throwError('An error occurred while registering. Please try again later.');
        }
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
