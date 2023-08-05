import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/users.interface';
import { Store } from '@ngrx/store';
import { selectSelectedUser } from '../../store/users.selectors';
import { hideUserDetails } from '../../store/users.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  @Output('showUserFormModal') showUserFormModalEmitter = new EventEmitter();
  user!: User;
  subscriptionList: Subscription[] = [];

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.getSelectedUser();
  }
  getSelectedUser() {
    this.subscriptionList.push(
      this.store.select(selectSelectedUser).subscribe({
        next: (response) => {
          this.user = response;
        },
      })
    );
  }
  hideUserDetails(): void {
    this.store.dispatch(hideUserDetails());
  }
  editUser(): void {
    this.showUserFormModalEmitter.emit('editUser');
  }
  deleteUser(): void {
    this.showUserFormModalEmitter.emit('deleteUser');
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
