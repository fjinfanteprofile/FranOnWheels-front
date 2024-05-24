import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrls } from '../uris/ApiUrls';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = ApiUrls.VEHICLES_URL;

  constructor(private http: HttpClient) {}

  getAllVehicles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/active`);
  }

  createVehicle(newVehicleTypeId: number, newVehicleModel: string, newVehicleYear: number, newLicensePlate: string, newGearbox: string, newDisplacementCc: number, active: number): Observable<any> {
    const createVehicleData = {
      type: { id: newVehicleTypeId },
      model: newVehicleModel,
      year: newVehicleYear,
      licensePlate: newLicensePlate,
      gearbox: newGearbox,
      displacementCc: newDisplacementCc,
      active: active
    };

    return this.http.post<any>(`${this.apiUrl}`, createVehicleData);
  }

  updateVehicle(vehicleId: number, updatedVehicleData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${vehicleId}`, updatedVehicleData);
  }


  deleteVehicle(vehicleId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${vehicleId}`);
  }
}
