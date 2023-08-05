import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../../store/authentication.actions';
import { selectIsLoading } from '../../store/authentication.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  httpLoading: boolean = false;
  subscriptionList: Subscription[] = [];

  constructor(private formBuilder: FormBuilder, private store: Store) {}
  ngOnInit(): void {
    this.createLoginForm();
    this.getIsLoading();
  }
  getIsLoading() {
    this.subscriptionList.push(
      this.store.select(selectIsLoading).subscribe({
        next: (data) => {
          this.httpLoading = data;
        },
      })
    );
  }
  createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(login({ loginData: this.loginForm.value }));
    }
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
