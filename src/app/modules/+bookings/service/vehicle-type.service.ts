import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getVehicleTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vehicle-types/active`);
  }

  getActiveVehiclesByLicense(license: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vehicles/active/${license}`);
  }

  getAvailableTimeSlotsForDate(date: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/classes/available-time-slots/${date}`);
  }

  getUserClasses(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/classes/user/${userId}`);
  }

  createClass(userId: number, classData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/classes/${userId}`, classData);
  }

  createBooking(bookingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bookings`, bookingData);
  }
}
