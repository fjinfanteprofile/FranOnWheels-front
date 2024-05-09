import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any;
  userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  setUser(user: any) {
    this.user = user;
    this.userSubject.next(user); // Emit the updated user to subscribers
  }

  getUser() {
    return this.user;
  }

  getUserObservable(): Observable<any> {
    return new Observable(observer => {
      observer.next(this.user);
    });
  }
}
