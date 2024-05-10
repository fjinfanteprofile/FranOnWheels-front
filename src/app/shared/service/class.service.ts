import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private apiUrl = 'http://localhost:8080/classes/active';

  constructor(private http: HttpClient) {}

  getAllClasses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
