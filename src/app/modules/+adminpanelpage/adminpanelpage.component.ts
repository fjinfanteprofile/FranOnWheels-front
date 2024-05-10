import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../shared/service/user.service';

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

  constructor(private userService : UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
