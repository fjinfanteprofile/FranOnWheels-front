import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { ApiUrls } from '../uris/ApiUrls';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private user: any;
  userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private apiUrl = ApiUrls.ROLES_URL;

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/active`);
  }

}
