import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/users.interface';
import { Store } from '@ngrx/store';
import {
  selectIsLoading,
  selectUserDetails,
} from '../../store/users.selectors';
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
  isLoading: boolean = false;

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.getUserDetails();
    this.getIsLoading();
  }
  getIsLoading() {
    this.store.select(selectIsLoading).subscribe({
      next: (data) => {
        this.isLoading = data;
      },
    });
  }
  getUserDetails() {
    this.subscriptionList.push(
      this.store.select(selectUserDetails).subscribe({
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
