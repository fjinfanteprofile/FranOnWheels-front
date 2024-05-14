import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private user: any;
  userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private apiUrl = 'http://localhost:8080/roles';

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/active`);
  }

}
