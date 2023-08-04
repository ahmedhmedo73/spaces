import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  httpLoading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private cookieService: CookieService,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login(): void {
    if (this.loginForm.valid) {
      this.httpLoading = true;
      this.authenticationService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          this.httpLoading = false;
          this.sharedService.show({
            severity: 'success',
            summary: 'Login',
            detail: 'Log in successfully',
          });
          this.cookieService.set('token', response.token);
          this.router.navigateByUrl('');
        },
        error: (reposnse) => {
          this.httpLoading = false;
          this.sharedService.show({
            severity: 'error',
            summary: 'Login',
            detail: reposnse.error.error,
          });
        },
      });
    }
  }
}
