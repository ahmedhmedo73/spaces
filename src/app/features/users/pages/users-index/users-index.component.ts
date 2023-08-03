import { Component } from '@angular/core';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.scss'],
})
export class UsersIndexComponent {
  userDetailsVisibility: boolean = false;
  modalMood: string = '';
  selectedUser: any;

  showUserDetails() {
    this.userDetailsVisibility = true;
  }
  hideUserDetails() {
    this.userDetailsVisibility = false;
  }
  addUser(): void {
    this.modalMood = 'userForm';
  }
  editUser(): void {
    this.modalMood = 'userForm';
  }
  deleteUser(user: any): void {
    this.selectedUser = user;
    this.modalMood = 'delete';
  }
}
