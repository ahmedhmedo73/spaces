import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/app/core/environments/environment';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthenticationService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully', () => {
    service
      .login({ email: 'eve.holt@reqres.in', password: 'cityslicka' })
      .subscribe({
        next: (response) => {
          expect(response).toBeTruthy();
          expect(response.token).toBe('QpwL5tke4Pnpja7X4');
        },
      });
    const mockReq = testingController.expectOne(environment.endpoint + 'login');
    expect(mockReq.request.method).toEqual('POST');
    mockReq.flush({ token: 'QpwL5tke4Pnpja7X4' });
  });
});
