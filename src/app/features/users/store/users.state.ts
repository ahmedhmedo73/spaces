import { User } from '../models/users.interface';
import { UserModalMoodType } from '../models/users.types';

export interface IUsersState {
  users: User[];
  totalUsers: number;
  isLoading: boolean;
  userFormModalVisibility: boolean;
  userDetailsVisibility: boolean;
  selectedUser: User;
  userModalMood: UserModalMoodType;
}
