import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/core/environments/environment';
import { LoginData, LoginResponse } from '../../interfaces/authentication.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  login(data: LoginData) {
    console.log(data);
    
    return this.httpClient.post<LoginResponse>(environment.endpoint + 'login', data);
  }
}
