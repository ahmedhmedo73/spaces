import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/app/core/environments/environment';
import { UsersResponse } from '../../models/users.interface';

describe('UsersService', () => {
  let service: UsersService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UsersService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get first 6 users', () => {
    service.GetUsers(6).subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
        expect(response.per_page).toBe(6);
      },
    });
    const mockReq = testingController.expectOne(
      environment.endpoint + 'users?per_page=6'
    );
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush({
      page: 1,
      per_page: 6,
      total: 12,
      total_pages: 2,
      data: [
        {
          id: 1,
          email: 'george.bluth@reqres.in',
          first_name: 'George',
          last_name: 'Bluth',
          avatar: 'https://reqres.in/img/faces/1-image.jpg',
        },
        {
          id: 2,
          email: 'janet.weaver@reqres.in',
          first_name: 'Janet',
          last_name: 'Weaver',
          avatar: 'https://reqres.in/img/faces/2-image.jpg',
        },
        {
          id: 3,
          email: 'emma.wong@reqres.in',
          first_name: 'Emma',
          last_name: 'Wong',
          avatar: 'https://reqres.in/img/faces/3-image.jpg',
        },
        {
          id: 4,
          email: 'eve.holt@reqres.in',
          first_name: 'Eve',
          last_name: 'Holt',
          avatar: 'https://reqres.in/img/faces/4-image.jpg',
        },
        {
          id: 5,
          email: 'charles.morris@reqres.in',
          first_name: 'Charles',
          last_name: 'Morris',
          avatar: 'https://reqres.in/img/faces/5-image.jpg',
        },
        {
          id: 6,
          email: 'tracey.ramos@reqres.in',
          first_name: 'Tracey',
          last_name: 'Ramos',
          avatar: 'https://reqres.in/img/faces/6-image.jpg',
        },
      ],
      support: {
        url: 'https://reqres.in/#support-heading',
        text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
      },
    });
  });

  it('should create user successfully', () => {
    service.creatUser({ name: 'ahmed', job: 'developer' }).subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
      },
    });
    const mockReq = testingController.expectOne(environment.endpoint + 'users');
    expect(mockReq.request.method).toEqual('POST');
    mockReq.flush({
      name: 'ahmed',
      job: 'developer',
    });
  });
  it('should update user successfully', () => {
    service.updateUser(1, { name: 'ahmed', job: 'developer' }).subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
      },
    });
    const mockReq = testingController.expectOne(
      environment.endpoint + 'users/1'
    );
    expect(mockReq.request.method).toEqual('PUT');
    mockReq.flush({
      name: 'ahmed',
      job: 'developer',
    });
  });
  it('should delete user successfully', () => {
    service.deleteUser(1).subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
      },
    });
    const mockReq = testingController.expectOne(
      environment.endpoint + 'users/1'
    );
    expect(mockReq.request.method).toEqual('DELETE');
    mockReq.flush({});
  });
  it('should get user details successfully', () => {
    service.GetUserDetails(1).subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
      },
    });
    const mockReq = testingController.expectOne(
      environment.endpoint + 'users/1'
    );
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush({
      data: {
        id: 1,
        email: 'george.bluth@reqres.in',
        first_name: 'George',
        last_name: 'Bluth',
        avatar: 'https://reqres.in/img/faces/1-image.jpg',
      },
      support: {
        url: 'https://reqres.in/#support-heading',
        text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
      },
    });
  });
});
