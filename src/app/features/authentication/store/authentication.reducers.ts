import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './authentication.actions';
import { IAuthenticationState } from './authentication.state';

export const initialUsersState: IAuthenticationState = {
  token: localStorage.getItem('token') || '',
  isLoading: false,
};
const reducer = createReducer<IAuthenticationState>(
  initialUsersState,
  on(AuthActions.setToken, (state, { token }) => {
    localStorage.setItem('token', token);
    return {
      ...state,
      token,
    };
  }),
  on(AuthActions.login, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(AuthActions.loginSuccess, (state, { loginResponse }) => {
    localStorage.setItem('token', loginResponse.token);
    return {
      ...state,
      isLoading: false,
      token: loginResponse.token,
    };
  })
);

export function AuthenticationReducer(
  state = initialUsersState,
  actions: any
): IAuthenticationState {
  return reducer(state, actions);
}
