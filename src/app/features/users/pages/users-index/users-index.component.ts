import { Component } from '@angular/core';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.scss'],
})
export class UsersIndexComponent {
  userDetailsVisibility: boolean = false;
  showUserDetails() {
    this.userDetailsVisibility = true;
  }
  hideUserDetails() {
    this.userDetailsVisibility = false;
  }
}
