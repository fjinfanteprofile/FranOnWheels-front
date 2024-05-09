import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {
  private apiUrl = '/api/vehicletypes';

  constructor(private http: HttpClient) {}

  getVehicleTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
