import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/core/environments/environment';
import { UserFormData, UsersResponse } from '../../models/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  GetUsers(numOfUsers: number) {
    return this.httpClient.get<UsersResponse>(environment.endpoint + 'users?per_page=' + numOfUsers);
  }
  creatUser(data: UserFormData) {
    return this.httpClient.post(environment.endpoint + 'users', data);
  }
  updateUser(id: number, data: UserFormData) {
    return this.httpClient.put(environment.endpoint + 'users/' + id, data);
  }
  deleteUser(id: number) {
    return this.httpClient.delete(environment.endpoint + 'users/' + id);
  }
}
