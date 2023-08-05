import { createAction, props } from '@ngrx/store';
import { User, UserFormData, UsersResponse } from '../models/users.interface';
import { UserModalMoodType } from '../models/users.types';

const prefix = '[Users]';

export const hideUserFormModal = createAction(`${prefix} Hide UserFormModal`);
export const showUserFormModal = createAction(`${prefix} Show UserFormModal`);

export const hideUserDetails = createAction(`${prefix} Hide userDetails`);
export const showUserDetails = createAction(`${prefix} Show userDetails`);

export const changeModalMood = createAction(
  `${prefix} change ModalMood`,
  props<{
    mood: UserModalMoodType;
  }>()
);

export const changeSelectedUser = createAction(
  `${prefix} change SelectedUser`,
  props<{
    selectedUser: User;
  }>()
);

export const getUsers = createAction(
  `${prefix} Get Users`,
  props<{
    numOfUsers: number;
  }>()
);
export const getUsersSuccess = createAction(
  `${getUsers.type} Success`,
  props<{
    users: User[];
    totalUsers: number;
  }>()
);

export const createUser = createAction(
  `${prefix} Create User`,
  props<{
    userFormData: UserFormData;
  }>()
);

export const createUserSuccess = createAction(`${createUser.type} Success`);

export const getUserDetails = createAction(
  `${prefix} Get UserDetails`,
  props<{
    id: number;
  }>()
);
export const getUserDetailsSuccess = createAction(
  `${prefix} Get UserDetails success`,
  props<{
    userDetails: User;
  }>()
);
export const updateUser = createAction(
  `${prefix} Update User`,
  props<{
    id: number;
    userFormData: UserFormData;
  }>()
);

export const updateUserSuccess = createAction(`${updateUser.type} Success`);

export const deleteUser = createAction(
  `${prefix} Delete user`,
  props<{
    id: number;
  }>()
);
export const deleteUserSuccess = createAction(`${deleteUser.type} Success`);
