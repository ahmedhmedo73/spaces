import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../interfaces/users.interface';
import { UsersService } from '../../services/users/users.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss'],
})
export class UserDeleteComponent {
  @Input('user') user!: User;
  @Output('closeUserFormModal') closeUserFormModalEmitter = new EventEmitter();
  httpLoading: boolean = false;
  constructor(
    private usersService: UsersService,
    private sharedService: SharedService
  ) {}

  delete(): void {
    this.httpLoading = true;
    this.usersService.deleteUser(this.user.id).subscribe({
      next: (response: any) => {
        this.httpLoading = false;
        this.sharedService.show({
          severity: 'success',
          summary: 'Delete User',
          detail: 'User Deleted successfully',
        });
        this.closeUserFormModal();
      },
      error: (error) => {
        this.httpLoading = false;
        this.sharedService.show({
          severity: 'error',
          summary: 'Delete User',
          detail: 'Something wrong happend',
        });
      },
    });
  }

  closeUserFormModal(): void {
    this.closeUserFormModalEmitter.emit();
  }
}
