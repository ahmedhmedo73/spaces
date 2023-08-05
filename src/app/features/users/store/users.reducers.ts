import { createReducer, on } from '@ngrx/store';
import { IUsersState } from './users.state';
import * as UsersActions from './users.actions';

export const initialUsersState: IUsersState = {
  userFormModalVisibility: false,
  userDetailsVisibility: false,
  selectedUser: { avatar: '', email: '', first_name: '', id: 0, last_name: '' },
  users: [],
  totalUsers: 0,
  isLoading: false,
  userModalMood : ''
};
const reducer = createReducer<IUsersState>(
  initialUsersState,
  on(UsersActions.changeModalMood, (state, { mood }) => {
    return {
      ...state,
      userModalMood : mood,
    };
  }),
  on(UsersActions.changeSelectedUser, (state, { selectedUser }) => {
    return {
      ...state,
      selectedUser,
    };
  }),
  on(UsersActions.hideUserDetails, (state) => {
    return {
      ...state,
      userDetailsVisibility: false,
    };
  }),
  on(UsersActions.showUserDetails, (state) => {
    return {
      ...state,
      userDetailsVisibility: true,
    };
  }),
  on(UsersActions.hideUserFormModal, (state) => {
    return {
      ...state,
      userFormModalVisibility: false,
    };
  }),
  on(UsersActions.showUserFormModal, (state) => {
    return {
      ...state,
      userFormModalVisibility: true,
    };
  }),
  on(UsersActions.getUsers, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(UsersActions.getUsersSuccess, (state, { users, totalUsers }) => {
    return {
      ...state,
      isLoading: false,
      users,
      totalUsers,
    };
  }),
  on(UsersActions.createUser, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(UsersActions.createUserSuccess, (state) => {
    return {
      ...state,
      userFormModalVisibility: false,
      isLoading: false,
    };
  }),
  on(UsersActions.updateUser, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(UsersActions.createUserSuccess, (state) => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(UsersActions.deleteUser, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(UsersActions.getUsersSuccess, (state) => {
    return {
      ...state,
      isLoading: false,
    };
  })
);

export function UsersReducer(
  state = initialUsersState,
  actions: any
): IUsersState {
  return reducer(state, actions);
}
