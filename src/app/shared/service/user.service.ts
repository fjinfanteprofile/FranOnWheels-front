import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { ApiUrls } from '../uris/ApiUrls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: any;
  userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private apiUrl = ApiUrls.USERS_URL;

  constructor(private http: HttpClient) {
    this.loadUserFromLocalStorage();
  }

  private loadUserFromLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
        this.userSubject.next(this.user);
      }
    }
  }

  private saveUserToLocalStorage(user: any) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  private removeUserFromLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('user');
    }
  }
  updateUserProfile(userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile/${userData.id}`, userData).pipe(
      catchError(error => {
        if (error.status === 400) {
          return throwError('Profile update failed. Please check your details and try again.');
        } else {
          return throwError('An error occurred while updating profile. Please try again later.');
        }
      })
    );
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/active`);
  }

  setUser(user: any) {
    this.user = user;
    this.userSubject.next(user); // Emit the updated user to subscribers
    this.saveUserToLocalStorage(user);
  }
  getUserFromServer(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.user.id}`);
  }

  getUser() {
    return this.user;
  }
  logout() {
    this.user = null;
    this.userSubject.next(null);
    this.removeUserFromLocalStorage();
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

  updateUser(userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userData.id}`, userData).pipe(
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
