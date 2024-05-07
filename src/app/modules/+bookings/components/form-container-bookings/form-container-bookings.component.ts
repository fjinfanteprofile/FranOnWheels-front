import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-form-container-bookings',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './form-container-bookings.component.html',
  styleUrl: './form-container-bookings.component.css'
})
export class FormContainerBookingsComponent implements OnInit {
  vehicleTypes: any[] = [];
  selectedLicense: string | null = null;
  vehicles: any[] = [];
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  timeSlots: string[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.fetchVehicleTypes();
  }

  fetchVehicleTypes() {
    this.httpClient.get('http://localhost:8080/vehicle-types/active')
      .subscribe((data: any) => {
        console.log(data);
        this.vehicleTypes = data;
      });
  }

  fetchVehiclesByType() {
    if (this.selectedLicense) {
      const url = `http://localhost:8080/vehicles/active/${this.selectedLicense}`;
      this.httpClient.get(url)
        .subscribe((data: any) => {
          console.log(data);
          this.vehicles = data;
        });
    }
  }

  onLicenseSelect(event: any) {
    this.selectedLicense = event.target.value;
    this.fetchVehiclesByType();
  }

  onDaySelect(event: any) {
    const selectedDay = event.target.value;
    this.fetchAvailableTimeSlots(selectedDay);
  }

  fetchAvailableTimeSlots(day: string) {
    const url = `http://localhost:8080/classes/available-time-slots/${day}`;
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.timeSlots = data;
      });
  }
}
