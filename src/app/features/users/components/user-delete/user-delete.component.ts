import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../interfaces/users.interface';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss'],
})
export class UserDeleteComponent {
  @Input('user') user!: User;
  @Output('closeUserFormModal') closeUserFormModalEmitter = new EventEmitter();

  yes(): void {}

  closeUserFormModal(): void {
    this.closeUserFormModalEmitter.emit();
  }
}
