import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  @Output('hideUserDetails') hideUserDetailsEmitter = new EventEmitter();
  hideUserDetails() {
    this.hideUserDetailsEmitter.emit();
  }
}
