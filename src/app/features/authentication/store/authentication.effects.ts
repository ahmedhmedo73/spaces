import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { AuthenticationService } from '../services/authentication/authentication.service';
import * as AuthenticationActions from './authentication.actions';
import { LoginResponse } from '../interfaces/authentication.interface';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private readonly actions$: Actions,
    private sharedService: SharedService,
    private router: Router,
    private readonly authenticationService: AuthenticationService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.login),
      switchMap(({ loginData }) => this.authenticationService.login(loginData)),
      map((loginResponse: LoginResponse) => {
        this.sharedService.show({
          severity: 'success',
          summary: 'Login',
          detail: 'Log in successfully',
        });

        this.router.navigateByUrl('');
        return AuthenticationActions.loginSuccess({ loginResponse });
      })
    )
  );
}
