import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../interfaces/users.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  @Input('user') user!: User;
  @Output('hideUserDetails') hideUserDetailsEmitter = new EventEmitter();
  @Output('editUser') editUserEmitter = new EventEmitter();
  @Output('deleteUser') deleteUserEmitter = new EventEmitter();
  hideUserDetails(): void {
    this.hideUserDetailsEmitter.emit();
  }
  editUser(): void {
    this.editUserEmitter.emit();
  }
  deleteUser(): void {
    this.deleteUserEmitter.emit();
  }
}
