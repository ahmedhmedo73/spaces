import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  @Input('user') user: any;
  userForm!: FormGroup;
  userImageFile: any;
  userImageSrc: any =
    '../../../../../assets/images/Default_Profile_Picture.png';

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.createUserForm()
  }

  createUserForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      job_title: ['', Validators.required],
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
  save() : void {}
  add() : void {}
}
