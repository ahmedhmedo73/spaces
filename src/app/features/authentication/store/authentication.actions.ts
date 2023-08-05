import { createAction, props } from '@ngrx/store';
import {
  LoginData,
  LoginResponse,
} from '../interfaces/authentication.interface';

const prefix = '[Auth]';

export const setToken = createAction(
  `${prefix} set token`,
  props<{
    token: string;
  }>()
);
export const login = createAction(
  `${prefix} login`,
  props<{
    loginData: LoginData;
  }>()
);
export const loginSuccess = createAction(
  `${login.type} login Success`,
  props<{
    loginResponse: LoginResponse;
  }>()
);
export const requestFail = createAction(`${prefix} request fail`);
