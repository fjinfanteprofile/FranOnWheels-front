import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../shared/service/user.service';
import { VehicleService } from '../../shared/service/vehicle.service';
import { ClassService } from '../../shared/service/class.service';

@Component({
  selector: 'app-adminpanelpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adminpanelpage.component.html',
  styleUrl: './adminpanelpage.component.css'
})
export class AdminpanelpageComponent {
  activeTab: string = '';
  users: any[]= [];
  vehicles: any[] = [];
  classes: any[] = [];

  constructor(
    private userService: UserService,
    private vehicleService: VehicleService,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );

    this.vehicleService.getAllVehicles().subscribe(
      (data: any[]) => {
        this.vehicles = data;
      },
      (error: any) => {
        console.error('Error fetching vehicles:', error);
      }
    );

    this.classService.getAllClasses().subscribe(
      (data: any[]) => {
        this.classes = data;
      },
      (error: any) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getVehicleModel(vehicleId: number): string {
    const vehicle = this.vehicles.find(vehicle => vehicle.id === vehicleId);
    return vehicle ? vehicle.model : '';
  }
  getUserUsername(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.username : '';
  }
}
