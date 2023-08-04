import { Component, HostListener } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../interfaces/users.interface';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.scss'],
})
export class UsersIndexComponent {
  userDetailsVisibility: boolean = false;
  userFormModalVisibility: boolean = false;
  modalMood: string = '';
  selectedUser!: User;
  users: User[] = [];
  selectedUserIndex: number = 0;
  page: number = 1;
  numOfPages: number = 0;
  loading: boolean = false;
  constructor(private UsersService: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    let docElem = document.documentElement;
    let laoderOffset = document.getElementById('loader')?.offsetTop || 0;

    if (
      docElem.scrollHeight <= docElem.scrollTop + laoderOffset &&
      this.numOfPages >= this.page &&
      !this.loading
    ) {
      this.getUsers();
    }
  }
  getUsers(): void {
    this.loading = true;
    this.UsersService.GetUsers(this.page).subscribe({
      next: (response) => {
        this.users = this.users.concat(response.data);
        this.page++;
        this.numOfPages = response.total_pages;
        this.loading = false;
      },
      error: (error) => {},
    });
  }

  showUserDetails(user: User, index: number) {
    this.selectedUserIndex = index;
    this.selectedUser = user;
    this.userDetailsVisibility = true;
  }
  hideUserDetails() {
    this.userDetailsVisibility = false;
  }
  addUser(): void {
    this.showUserFormModal('addUser');
  }
  editUser(user: User): void {
    this.selectedUser = user;
    this.showUserFormModal('editUser');
  }
  showUserFormModal(modalMood: string): void {
    this.userFormModalVisibility = true;
    this.modalMood = modalMood;
  }
  closeUserFormModal(): void {
    this.userFormModalVisibility = false;
    this.modalMood = '';
  }
  deleteUser(user: User): void {
    this.showUserFormModal('deleteUser');

    this.selectedUser = user;
  }
}
