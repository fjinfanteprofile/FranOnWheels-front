import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

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
  timeSlots: string[] = [];
  selectedVehicleId: number | null = null;
  selectedDate: string | null = null;
  selectedTimeSlot: string | null = null;
  successMessage: string | null = null;

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchVehicleTypes();
  }

  onTimeSlotSelect(event: any){
    this.selectedTimeSlot = event.target.value;
  }
  onVehicleSelect(event: any) {
    this.selectedVehicleId = event.target.value;
  }
  onLicenseSelect(event: any) {
    this.selectedLicense = event.target.value;
    this.fetchVehiclesByType();
  }
  onDateSelect(event: any) {
    console.log('Event:', event);
    this.selectedDate = event.target.value as string;
    console.log('Selected Date:', this.selectedDate);
    this.fetchAvailableTimeSlotsForDate(this.selectedDate);
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
  calculateEndTime(startTime: string): string {
    // Parse the start time and add one hour
    const [hours, minutes] = startTime.split(':').map(Number);
    const start = new Date(0, 0, 0, hours, minutes);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // Add one hour
    return `${end.getHours()}:${end.getMinutes().toString().padStart(2, '0')}`;
  }
  fetchAvailableTimeSlotsForDate(date: string) {
    // Fetch available time slots for the selected date
    const url = `http://localhost:8080/classes/available-time-slots/${date}`;
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.timeSlots = data.map((timeSlot: string) => {
          const startTime = timeSlot.trim();
          const endTime = this.calculateEndTime(startTime); // Calculate the end time
          return `${startTime} - ${endTime}`;
        });
      });
  }

  onSubmit(event: Event): void {

    console.log('Selected License:', this.selectedLicense); // Add this line
    console.log('Selected Vehicle Id:', this.selectedVehicleId); // Add this line
    console.log('Selected Date:', this.selectedDate); // Add this line
    console.log('Selected Time Slot:', this.selectedTimeSlot); // Add this line

    if (this.selectedLicense && this.selectedVehicleId && this.selectedDate && this.selectedTimeSlot) {
      // Create class
      const classData = {
        vehicleId: this.selectedVehicleId,
        date: this.selectedDate,
        timeStart: this.selectedTimeSlot.split(' - ')[0],
        timeEnd: this.selectedTimeSlot.split(' - ')[1],
        active: 1
      };
      this.successMessage = 'Class has been created successfully';

      this.httpClient.post('http://localhost:8080/classes/1', classData)
        .subscribe((classResponse: any) => {
          // Create booking
          const bookingData = {
            classId: classResponse.id,
            userId: 1,
            active: 1
          };

          this.httpClient.post('http://localhost:8080/bookings', bookingData)
            .subscribe(() => {
              // Handle success
              console.log('Booking created successfully');

            }, error => {
              // Handle error
              console.error('Error creating booking:', error);
            });
        }, error => {
          // Handle error
          console.error('Error creating class:', error);
        });
    } else {
      console.error('Please select all required fields');
    }
    this.router.navigate(['/success']);

  }


}
