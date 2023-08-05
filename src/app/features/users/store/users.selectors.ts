import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUsersState } from './users.state';

export const selectUserState = createFeatureSelector<IUsersState>('user');
export const selectUsersList = createSelector(
  selectUserState,
  (state) => state.users
);
export const selectUserModalMood = createSelector(
  selectUserState,
  (state) => state.userModalMood
);
export const selectSelectedUser = createSelector(
  selectUserState,
  (state) => state.selectedUser
);
export const selectUserFormModalVisibility = createSelector(
  selectUserState,
  (state) => state.userFormModalVisibility
);
export const selectUserDetailsVisibility = createSelector(
  selectUserState,
  (state) => state.userDetailsVisibility
);
export const selectUsersTotal = createSelector(
  selectUserState,
  (state) => state.totalUsers
);
export const selectIsLoading = createSelector(
  selectUserState,
  (state) => state.isLoading
);
