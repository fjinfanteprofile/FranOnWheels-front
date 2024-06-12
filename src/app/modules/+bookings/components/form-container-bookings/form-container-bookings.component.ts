import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../shared/service/user.service';
import { VehicleTypeService } from '../../service/vehicle-type.service';

@Component({
  selector: 'app-form-container-bookings',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
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
  user: any;
  classes: any[] = [];

  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService, private vehicleTypeService: VehicleTypeService) { }

  ngOnInit(): void {
    this.fetchVehicleTypes();
    this.user = this.userService.getUser();
    this.fetchUserClasses();
  }

  onTimeSlotSelect(event: any) {
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
    this.selectedDate = event.target.value as string;
    this.fetchAvailableTimeSlotsForDate(this.selectedDate);
  }
  calculateEndTime(startTime: string): string {
    // Parse the start time and add one hour
    const [hours, minutes] = startTime.split(':').map(Number);
    const start = new Date(0, 0, 0, hours, minutes);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // Add one hour
    return `${end.getHours()}:${end.getMinutes().toString().padStart(2, '0')}`;
  }
  fetchVehicleTypes() {
    this.vehicleTypeService.getVehicleTypes().subscribe((data: any) => {
      this.vehicleTypes = data;
    });
  }

  fetchVehiclesByType() {
    if (this.selectedLicense) {
      this.vehicleTypeService.getActiveVehiclesByLicense(this.selectedLicense).subscribe((data: any) => {
        this.vehicles = data;
      });
    }
  }

  fetchAvailableTimeSlotsForDate(date: string) {
    this.vehicleTypeService.getAvailableTimeSlotsForDate(date).subscribe((data: any) => {
      this.timeSlots = data.map((timeSlot: string) => {
        const startTime = timeSlot.trim();
        const endTime = this.calculateEndTime(startTime);
        return `${startTime} - ${endTime}`;
      });
    });
  }

  fetchUserClasses() {
    if (this.user && this.user.id) {
      this.vehicleTypeService.getUserClasses(this.user.id).subscribe((data: any) => {
        this.classes = data;
      }, error => {
        console.error('Error fetching user classes:', error);
      });
    }
  }

  onSubmit(event: Event): void {
    if (this.selectedLicense && this.selectedVehicleId && this.selectedDate && this.selectedTimeSlot) {
      const classData = {
        vehicleId: this.selectedVehicleId,
        date: this.selectedDate,
        timeStart: this.selectedTimeSlot.split(' - ')[0],
        timeEnd: this.selectedTimeSlot.split(' - ')[1],
        active: 1
      };
      this.successMessage = 'Class has been created successfully';

      this.vehicleTypeService.createClass(this.user.id, classData).subscribe((classResponse: any) => {
        const bookingData = {
          classId: classResponse.id,
          userId: 1,
          active: 1
        };

        this.vehicleTypeService.createBooking(bookingData).subscribe(() => {
        }, error => {
          console.error('Error creating booking:', error);
        });
      }, error => {
        console.error('Error creating class:', error);
      });
    } else {
      console.error('Please select all required fields');
    }
    this.router.navigate(['/success']);
  }

}
