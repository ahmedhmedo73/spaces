import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { User } from '../../models/users.interface';
import { Store } from '@ngrx/store';
import {
  selectIsLoading,
  selectSelectedUser,
  selectUserModalMood,
} from '../../store/users.selectors';
import {
  createUser,
  hideUserFormModal,
  updateUser,
} from '../../store/users.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  user!: User;
  userForm!: FormGroup;
  httpLoading: boolean = false;
  userImageFile: any;
  userImageSrc: any =
    '../../../../../assets/images/Default_Profile_Picture.png';
  subscriptionList: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.createUserForm();
    this.getIsLoading();
    this.getSelectedUser();
    this.getUserModalMood();
  }
  getUserModalMood() {
    this.subscriptionList.push(
      this.store.select(selectUserModalMood).subscribe({
        next: (response) => {
          if (response == 'editUser') {
            this.handleDataForEdit();
          }
        },
      })
    );
  }
  getSelectedUser() {
    this.subscriptionList.push(
      this.store.select(selectSelectedUser).subscribe({
        next: (response) => {
          if (response.id) {
            this.user = response;
          }
        },
      })
    );
  }
  getIsLoading() {
    this.subscriptionList.push(
      this.store.select(selectIsLoading).subscribe({
        next: (response) => {
          this.httpLoading = response;
        },
      })
    );
  }

  handleDataForEdit(): void {
    if (this.user) {
      this.userForm.patchValue({
        name: this.user.first_name,
        job: this.user.last_name,
      });
      this.userImageSrc = this.user.avatar;
      this.userImageFile = this.user.avatar;
    }
  }

  createUserForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      job: ['', Validators.required],
    });
  }

  getUserImgFile(event: any): void {
    this.userImageFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.userImageFile);
    reader.onload = (_event) => {
      this.userImageSrc = reader.result;
    };
  }
  add(): void {
    if (this.userImageFile == undefined) {
      this.sharedService.show({
        severity: 'error',
        summary: 'Create User',
        detail: 'Please Select Photo For User',
      });
      return;
    }
    if (this.userForm.valid) {
      this.store.dispatch(createUser(this.userForm.value));
    }
  }
  edit(): void {
    if (this.userForm.valid) {
      this.store.dispatch(
        updateUser({ id: this.user.id, userFormData: this.userForm.value })
      );
    }
  }
  cancel(): void {
    this.store.dispatch(hideUserFormModal());
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
