import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any;
  userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
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

}
