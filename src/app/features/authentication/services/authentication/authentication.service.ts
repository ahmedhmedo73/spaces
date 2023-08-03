import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/core/environments/environment';
import { loginData } from '../../interfaces/authentication.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  login(data: loginData) {
    return this.httpClient.post(environment.endpoint + 'login', data);
  }
}
