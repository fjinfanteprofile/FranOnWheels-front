import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:8080/vehicles/active';

  constructor(private http: HttpClient) {}

  getAllVehicles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
