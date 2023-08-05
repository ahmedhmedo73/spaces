import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthenticationState } from './authentication.state';

export const selectAuthState =
  createFeatureSelector<IAuthenticationState>('auth');
export const selectIsLoading = createSelector(
  selectAuthState,
  (state) => state.isLoading

);
export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);
