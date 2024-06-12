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

  showUserFormCreate: boolean = false;
  showUserFormUpdate: boolean = false;
  showUserFormDelete: boolean = false;

  showVehicleFormCreate: boolean = false;
  showVehicleFormUpdate: boolean = false;
  showVehicleFormDelete: boolean = false;

  showClassFormCreate: boolean = false;
  showClassFormUpdate: boolean = false;
  showClassFormDelete: boolean = false;


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

  newVehicleTypeId: any;
  newVehicleModel: any;
  newVehicleYear: any;
  newLicensePlate: any;
  newGearbox: any;
  newDisplacementCc: any;
  updatedVehicleType: any;
  updatedVehicleId: number = 0;
  updatedVehicleModel: any;
  updatedVehicleYear: any;
  updatedLicensePlate: any;
  updatedDate: any;
  updatedtimeStart: any;
  updatedtimeEnd: any;
  updateduserId: number = 0;
  updatedGearbox: any;
  updatedDisplacementCc: any;
  selectedVehicleId=1;
  updatedVehicleTypeId: any;
  selectedClassId: number = 0;
  updatedClassId: number = 0;
  updatedClassData: any;
  newClassDayOfWeek: number = 0;
  newClassUserId: number = 0;
  newClassTimeEnd: any;
  newClassTimeStart: any;
  newClassDate: any;
  newClassVehicleId: number = 0;
  newVehicleId: number = 0;




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

  showUserCreateForm() {
    this.showUserFormCreate = true;
    this.showUserFormUpdate = false;
    this.showUserFormDelete = false;
  }

  showUpdateUserForm() {
    this.showUserFormUpdate = true;
    this.showUserFormCreate = false;
    this.showUserFormDelete = false;
  }

  showDeleteUserForm() {
    this.showUserFormDelete = true;
    this.showUserFormCreate = false;
    this.showUserFormUpdate = false;
  }
  showCreateVehicleForm() {
    this.showVehicleFormCreate = true;
    this.showVehicleFormUpdate = false;
    this.showVehicleFormDelete = false;
  }

  showUpdateVehicleForm() {
    this.showVehicleFormUpdate = true;
    this.showVehicleFormCreate = false;
    this.showVehicleFormDelete = false;
  }

  showDeleteVehicleForm() {
    this.showVehicleFormDelete = true;
    this.showVehicleFormCreate = false;
    this.showVehicleFormUpdate = false;
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
      this.username,
      this.name,
      this.lastName,
      this.dni,
      this.phoneNumber,
      this.address,
      this.email,
      this.password,
      this.age,
      this.roleId,
      this.active
    ).subscribe(
      (response: any) => {
        this.showUserFormCreate = false;
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
      email: this.newEmail,
      password: this.password,
      age: this.age,
      roleId: this.roleId,
      active: this.active,
      id: this.selectedUserId
    };

    this.userService.updateUser(userData).subscribe(
      (response: any) => {
        this.showUserFormUpdate = false;
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
        console.error('Error updating user:', error);
      }
    );
  }
  deleteUser(): void {
    this.userService.deleteUser(this.selectedUserId).subscribe(
      (response: any) => {
        this.showUserFormDelete = false;
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

createVehicle(): void {

  this.vehicleService.createVehicle(this.newVehicleTypeId, this.newVehicleModel, this.newVehicleYear, this.newLicensePlate, this.newGearbox, this.newDisplacementCc, this.active).subscribe(
    (response: any) => {
      this.showVehicleFormCreate = false;
      // List refresh
      this.vehicleService.getAllVehicles().subscribe(
        (data: any[]) => {
          this.vehicles = data;
        },
        (error: any) => {
          console.error('Error fetching vehicles:', error);
        }
      );
    },
    (error: any) => {
      console.error('Error creating vehicle:', error);
    }
  );
}

updateVehicle(): void {
  const vehicleData = {
    type: { id: this.updatedVehicleTypeId },
    model: this.updatedVehicleModel,
    year: this.updatedVehicleYear,
    licensePlate: this.updatedLicensePlate,
    gearbox: this.updatedGearbox,
    displacementCc: this.updatedDisplacementCc
  };

  this.vehicleService.updateVehicle(this.selectedVehicleId, vehicleData).subscribe(
    (response: any) => {
      this.showVehicleFormUpdate = false;
      // List refresh
      this.vehicleService.getAllVehicles().subscribe(
        (data: any[]) => {
          this.vehicles = data;
        },
        (error: any) => {
          console.error('Error fetching vehicles:', error);
        }
      );
    },
    (error: any) => {
      console.error('Error updating vehicle:', error);
    }
  );
}

deleteVehicle(): void {
  this.vehicleService.deleteVehicle(this.selectedVehicleId).subscribe(
    (response: any) => {
      this.showVehicleFormDelete = false;
      // List refresh
      this.vehicleService.getAllVehicles().subscribe(
        (data: any[]) => {
          this.vehicles = data;
        },
        (error: any) => {
          console.error('Error fetching vehicles:', error);
        }
      );
    },
    (error: any) => {
      console.error('Error deleting vehicle:', error);
    }
  );

}

showCreateClassForm() {
  this.showClassFormCreate = true;
  this.showClassFormUpdate = false;
  this.showClassFormDelete = false;
}

showUpdateClassForm() {
  this.showClassFormUpdate = true;
  this.showClassFormCreate = false;
  this.showClassFormDelete = false;
}

showDeleteClassForm() {
  this.showClassFormDelete = true;
  this.showClassFormCreate = false;
  this.showClassFormUpdate = false;
}

createClass(): void {
  this.classService.createClass(
    this.selectedVehicleId,
    this.newClassDate,
    this.newClassTimeStart,
    this.newClassTimeEnd,
    this.newClassUserId,
    this.active
  ).subscribe(
    (response: any) => {
      this.showClassFormCreate = false;
      // Refresh class list
      this.classService.getAllClasses().subscribe(
        (data: any[]) => {
          this.classes = data;
        },
        (error: any) => {
          console.error('Error fetching classes:', error);
        }
      );
    },
    (error: any) => {
      console.error('Error creating class:', error);
    }
  );
}

updateClass(): void {

  const updateClassData = {
    vehicleId : this.updatedVehicleId,
    date : this.updatedDate,
    timeStart : this.updatedtimeStart,
    timeEnd : this.updatedtimeEnd,
    userId : this.updateduserId,
    active : this.active,

  };
  this.classService.updateClass(updateClassData, this.updatedClassId
  ).subscribe(
    (response: any) => {
      this.showClassFormUpdate = false;
      // Refresh class list
      this.classService.getAllClasses().subscribe(
        (data: any[]) => {
          this.classes = data;
        },
        (error: any) => {
          console.error('Error fetching classes:', error);
        }
      );
    },
    (error: any) => {
      console.error('Error updating class:', error);
    }
  );
}

deleteClass(): void {
  this.classService.deleteClass(this.selectedClassId).subscribe(
    (response: any) => {
      this.showClassFormDelete = false;
      // Refresh class list
      this.classService.getAllClasses().subscribe(
        (data: any[]) => {
          this.classes = data;
        },
        (error: any) => {
          console.error('Error fetching classes:', error);
        }
      );
    },
    (error: any) => {
      console.error('Error deleting class:', error);
    }
  );
}
closeForm() {
  this.showUserFormCreate = false;
  this.showUserFormUpdate = false;
  this.showUserFormDelete = false;
  this.showVehicleFormCreate = false;
  this.showVehicleFormUpdate = false;
  this.showVehicleFormDelete = false;
  this.showClassFormCreate = false;
  this.showClassFormUpdate = false;
  this.showClassFormDelete = false;
}
}
