import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/users.interface';
import { Store } from '@ngrx/store';
import { deleteUser, hideUserFormModal } from '../../store/users.actions';
import {
  selectIsLoading,
  selectSelectedUser,
} from '../../store/users.selectors';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss'],
})
export class UserDeleteComponent {
  user!: User;
  httpLoading: boolean = false;

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.getIsLoading();
    this.getSelectedUser();
  }
  getSelectedUser() {
    this.store.select(selectSelectedUser).subscribe({
      next: (response) => {
        this.user = response;
      },
    });
  }
  getIsLoading() {
    this.store.select(selectIsLoading).subscribe({
      next: (response) => {
        this.httpLoading = response;
      },
    });
  }
  delete(): void {
    this.store.dispatch(deleteUser({ id: this.user.id }));
  }

  closeUserFormModal(): void {
    this.store.dispatch(hideUserFormModal());
  }
}
