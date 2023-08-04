import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../interfaces/users.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  @Input('user') user!: User;
  @Output('closeUserFormModal') closeUserFormModalEmitter = new EventEmitter();
  userForm!: FormGroup;
  userImageFile: any;
  userImageSrc: any =
    '../../../../../assets/images/Default_Profile_Picture.png';

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.createUserForm();
    console.log(this.user);

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
      this.usersService.creatUser(this.userForm.value).subscribe({
        next: (response: any) => {
          if (response.id) {
            this.sharedService.show({
              severity: 'success',
              summary: 'Create User',
              detail: 'User created successfully',
            });
            this.cancel();
          } else {
            this.sharedService.show({
              severity: 'error',
              summary: 'Create User',
              detail: 'Something wrong happend',
            });
          }
        },
        error: (error) => {
          this.sharedService.show({
            severity: 'error',
            summary: 'Create User',
            detail: 'Something wrong happend',
          });
        },
      });
    }
  }
  edit(): void {
    if (this.userForm.valid) {
      this.usersService
        .updateUser(this.user.id, this.userForm.value)
        .subscribe({
          next: (response: any) => {
            if (response.id) {
              this.sharedService.show({
                severity: 'success',
                summary: 'Update User',
                detail: 'User Updated successfully',
              });
              this.cancel();
            } else {
              this.sharedService.show({
                severity: 'error',
                summary: 'Update User',
                detail: 'Something wrong happend',
              });
            }
          },
          error: (error) => {
            this.sharedService.show({
              severity: 'error',
              summary: 'Update User',
              detail: 'Something wrong happend',
            });
          },
        });
    }
  }
  cancel(): void {
    this.createUserForm();
    this.userImageFile = undefined;
    this.userImageSrc = '';
    this.closeUserFormModalEmitter.emit();
  }
}
