import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import { UsersService } from '../services/users/users.service';
import { UsersResponse } from '../models/users.interface';
import * as UsersActions from './users.actions';
import { SharedService } from 'src/app/shared/services/shared/shared.service';

@Injectable()
export class UsersEffects {
  constructor(
    private readonly actions$: Actions,
    private sharedService: SharedService,
    private readonly UsersService: UsersService
  ) {}

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUsers),
      switchMap(({ numOfUsers }) => this.UsersService.GetUsers(numOfUsers)),
      map((usersResponse: UsersResponse) =>
        UsersActions.getUsersSuccess({
          users: usersResponse.data,
          totalUsers: usersResponse.total,
        })
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.createUser),
      switchMap(({ userFormData }) =>
        this.UsersService.creatUser(userFormData)
      ),
      map(() => {
        this.sharedService.show({
          severity: 'success',
          summary: 'Create User',
          detail: 'User created successfully',
        });
        return UsersActions.createUserSuccess();
      })
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.updateUser),
      switchMap(({ id, userFormData }) =>
        this.UsersService.updateUser(id, userFormData)
      ),
      map(() => {
        this.sharedService.show({
          severity: 'success',
          summary: 'Update User',
          detail: 'User Updated successfully',
        });
        return UsersActions.updateUserSuccess();
      })
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      switchMap(({ id }) => this.UsersService.deleteUser(id)),
      map(() => {
        this.sharedService.show({
          severity: 'success',
          summary: 'Delete User',
          detail: 'User Deleted successfully',
        });
        return UsersActions.deleteUserSuccess();
      })
    )
  );
}
