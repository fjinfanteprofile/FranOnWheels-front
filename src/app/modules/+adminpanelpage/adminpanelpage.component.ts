import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../shared/service/user.service';
import { VehicleService } from '../../shared/service/vehicle.service';
import { ClassService } from '../../shared/service/class.service';
import { FormsModule } from '@angular/forms';
import { RolesService } from '../../shared/service/roles.service';

@Component({
  selector: 'app-adminpanelpage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adminpanelpage.component.html',
  styleUrl: './adminpanelpage.component.css'
})
export class AdminpanelpageComponent {
  activeTab: string = '';
  users: any[]= [];
  vehicles: any[] = [];
  classes: any[] = [];

  showFormCreate: boolean = false;
  showFormUpdate: boolean = false;

  username: string = '';
  name: string = '';
  lastName: string = '';
  dni: string = '';
  phoneNumber: string = '';
  address: string = '';
  age: string = '';
  password: string = '';
  email: string = '';
  roleId: number = 1;
  active: number = 1;

  selectedUserId: number = 0;
  newEmail: string = '';

  roles: any[] = [];


  constructor(
    private userService: UserService,
    private vehicleService: VehicleService,
    private classService: ClassService,
    private roleService: RolesService
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
    this.roleService.getAllRoles().subscribe(
      (data: any[]) => {
        this.roles = data;
      },
      (error: any) => {
        console.error('Error fetching roles:', error);
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

  showUserForm() {
    this.showFormCreate = true;
    this.showFormUpdate = false;
  }

  showUpdateUserForm() {
    this.showFormUpdate = true;
    this.showFormCreate = false;
  }
  createUser(): void {
    const userData = {
      username: this.username,
      name: this.name,
      lastName: this.lastName,
      dni: this.dni,
      phoneNumber: this.phoneNumber,
      address: this.address,
      email: this.email,
      password: this.password,
      age: this.age,
      roleId: this.roleId,
      active: this.active
    };

    this.userService.createUser(
      this.username, this.name, this.password, this.email,
      this.dni, this.phoneNumber, this.address, this.lastName,
      this.age, this.roleId, this.active
    ).subscribe(
      (response: any) => {
        this.showFormCreate = false;
        // List refresh
        this.userService.getAllUsers().subscribe(
          (data: any[]) => {
            this.users = data;
          },
          (error: any) => {
            console.error('Error fetching users:', error);
          }
        );
      },
      (error: any) => {
        console.error('Error creating user:', error);
      }
    );
  }

  updateUser(): void {
    const userData = {
      username: this.username,
      name: this.name,
      lastName: this.lastName,
      dni: this.dni,
      phoneNumber: this.phoneNumber,
      address: this.address,
      email: this.email,
      password: this.password,
      age: this.age,
      roleId: this.roleId,
      active: this.active
    };
    console.log(
      "User Data: " +
      "Username: " + this.username + ", " +
      "Name: " + this.name + ", " +
      "Last Name: " + this.lastName + ", " +
      "DNI: " + this.dni + ", " +
      "Phone Number: " + this.phoneNumber + ", " +
      "Address: " + this.address + ", " +
      "Email: " + this.email + ", " +
      "Password: " + this.password + ", " +
      "Age: " + this.age + ", " +
      "Role ID: " + this.roleId + ", " +
      "Active: " + this.active
    );

    this.userService.updateUser(
      this.username, this.name, this.password, this.email,
      this.dni, this.phoneNumber, this.address, this.lastName,
      this.age, this.roleId, this.active
    ).subscribe(
      (response: any) => {
        this.showFormUpdate = false;
        // List refresh
        this.userService.getAllUsers().subscribe(
          (data: any[]) => {
            this.users = data;
          },
          (error: any) => {
            console.error('Error fetching users:', error);
          }
        );
      },
      (error: any) => {
        console.error('Error creating user:', error);
      }
    );
  }
}
