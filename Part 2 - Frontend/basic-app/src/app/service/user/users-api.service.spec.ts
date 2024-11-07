import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersApiService } from './users-api.service';
import BaseResponse from '../../types/BaseResponse';
import User from '../../types/User';
import CreateUserRequest from '../../types/CreateUserRequest';

describe('UsersApiService', () => {
  let service: UsersApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersApiService],
    });
    service = TestBed.inject(UsersApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users', () => {
    const mockUsers: BaseResponse<User[]> = {
      data: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          accountId: 'A1234',
          address: '123 Main St',
        },
      ],
      error: null,
    };

    service.getUsers().subscribe((response) => {
      expect(response.data).toEqual(mockUsers.data);
      expect(response.error).toBeNull();
    });

    const req = httpMock.expectOne(service['userApiBaseUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should create a user', () => {
    const newUser: CreateUserRequest = {
      firstName: 'Jane',
      lastName: 'Doe',
      accountId: 'A1234',
      line1: '123 Main St',
      line2: '',
      city: 'Springfield',
      state: 'IL',
      zip: '62701',
      country: 'USA',
    };
    const mockUser: BaseResponse<User> = {
      data: {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        accountId: 'A1234',
        address: '123 Main St, Springfield, IL 62701, USA',
      },
      error: null,
    };

    service.createUser(newUser).subscribe((response) => {
      expect(response.data).toEqual(mockUser.data);
      expect(response.error).toBeNull();
    });

    const req = httpMock.expectOne(service['userApiBaseUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(mockUser);
  });

  it('should search users', () => {
    const searchType = 'name';
    const searchQuery = 'John';
    const mockUsers: BaseResponse<User[]> = {
      data: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          accountId: 'A1234',
          address: '123 Main St',
        },
      ],
      error: null,
    };
    const url = `${service['userApiBaseUrl']}search?query=${searchQuery}&searchBy=${searchType}`;

    service.searchUsers(searchType, searchQuery).subscribe((response) => {
      expect(response.data).toEqual(mockUsers.data);
      expect(response.error).toBeNull();
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should handle error', () => {
    const mockErrorResponse = {
      status: 400,
      statusText: 'Bad Request',
      error: { error: { raw: 'Invalid request' } },
    };

    service.getUsers().subscribe((response) => {
      expect(response.data).toBeNull();
      expect(response?.error?.get('raw')).toBe('Invalid request');
    });

    const req = httpMock.expectOne(service['userApiBaseUrl']);
    req.flush(mockErrorResponse.error, mockErrorResponse);
  });
});
