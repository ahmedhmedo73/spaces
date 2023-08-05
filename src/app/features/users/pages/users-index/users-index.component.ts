import { Component, HostListener } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../models/users.interface';
import { Store } from '@ngrx/store';
import {
  changeModalMood,
  changeSelectedUser,
  getUsers,
  hideUserDetails,
  hideUserFormModal,
  showUserDetails,
  showUserFormModal,
} from '../../store/users.actions';
import {
  selectIsLoading,
  selectUserDetailsVisibility,
  selectUserFormModalVisibility,
  selectUserModalMood,
  selectUsersList,
  selectUsersTotal,
} from '../../store/users.selectors';
import { UserModalMoodType } from '../../models/users.types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.scss'],
})
export class UsersIndexComponent {
  userDetailsVisibility: boolean = false;
  userFormModalVisibility: boolean = false;
  modalMood: UserModalMoodType = '';
  selectedUser!: User;
  users: User[] = [];
  selectedUserIndex: number = 0;
  numOfUsers: number = 6;
  totalUsers: number = 0;
  loading: boolean = false;
  subscriptionList: Subscription[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getUsersLoading();
    this.getUsers();
    this.getUsersTotal();
    this.getUserFormModalVisibility();
    this.getUserDetailsVisibility();
    this.getUserModalMood();
  }
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    let docElem = document.documentElement;
    let laoderOffset = document.getElementById('loader')?.offsetTop || 0;

    if (
      docElem.scrollHeight <= docElem.scrollTop + laoderOffset &&
      this.totalUsers > this.numOfUsers
    ) {
      this.numOfUsers += 6;

      this.getUsers();
    }
  }
  getUserModalMood() {
    this.subscriptionList.push(
      this.store.select(selectUserModalMood).subscribe({
        next: (response) => {
          this.modalMood = response;
        },
      })
    );
  }
  getUserDetailsVisibility() {
    this.subscriptionList.push(
      this.store.select(selectUserDetailsVisibility).subscribe({
        next: (response) => {
          this.userDetailsVisibility = response;
        },
      })
    );
  }
  getUserFormModalVisibility(): void {
    this.subscriptionList.push(
      this.store.select(selectUserFormModalVisibility).subscribe({
        next: (response) => {
          this.userFormModalVisibility = response;
        },
      })
    );
  }
  getUsersLoading(): void {
    this.subscriptionList.push(
      this.store.select(selectIsLoading).subscribe({
        next: (response) => {
          this.loading = response;
        },
      })
    );
  }

  getUsers(): void {
    this.store.dispatch(getUsers({ numOfUsers: this.numOfUsers }));
    this.subscriptionList.push(
      this.store.select(selectUsersList).subscribe({
        next: (response) => {
          this.users = response;
        },
      })
    );
  }
  getUsersTotal(): void {
    this.subscriptionList.push(
      this.store.select(selectUsersTotal).subscribe({
        next: (response) => {
          this.totalUsers = response;
        },
      })
    );
  }

  showUserDetails(user: User, index: number) {
    this.selectedUserIndex = index;
    this.store.dispatch(changeSelectedUser({ selectedUser: user }));
    this.store.dispatch(showUserDetails());
  }
  hideUserDetails() {
    this.store.dispatch(hideUserDetails());
  }
  addUser(): void {
    this.showUserFormModal('addUser');
  }
  editUser(user: User): void {
    this.store.dispatch(changeSelectedUser({ selectedUser: user }));
    this.showUserFormModal('editUser');
  }
  showUserFormModal(modalMood: UserModalMoodType): void {
    this.store.dispatch(showUserFormModal());
    this.store.dispatch(changeModalMood({ mood: modalMood }));
  }
  closeUserFormModal(): void {
    this.store.dispatch(hideUserFormModal());
    this.store.dispatch(changeModalMood({ mood: '' }));
  }
  deleteUser(user: User): void {
    this.showUserFormModal('deleteUser');

    this.store.dispatch(changeSelectedUser({ selectedUser: user }));
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
