import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMemberComponent } from './create-member.component';
import { Title } from '@angular/platform-browser';
import { of } from 'rxjs';
import { UsersApiService } from '../service/user/users-api.service';
import BaseResponse from '../types/BaseResponse';
import User from '../types/User';
import CreateUserRequest from '../types/CreateUserRequest';

describe('CreateMemberComponent', () => {
  let component: CreateMemberComponent;
  let fixture: ComponentFixture<CreateMemberComponent>;
  let usersApiService: jasmine.SpyObj<UsersApiService>;
  let titleService: jasmine.SpyObj<Title>;

  beforeEach(async () => {
    const usersApiServiceSpy = jasmine.createSpyObj('UsersApiService', [
      'createUser',
    ]);
    const titleServiceSpy = jasmine.createSpyObj('Title', ['setTitle']);

    await TestBed.configureTestingModule({
      imports: [CreateMemberComponent],
      providers: [
        { provide: UsersApiService, useValue: usersApiServiceSpy },
        { provide: Title, useValue: titleServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMemberComponent);
    component = fixture.componentInstance;
    usersApiService = TestBed.inject(
      UsersApiService
    ) as jasmine.SpyObj<UsersApiService>;
    titleService = TestBed.inject(Title) as jasmine.SpyObj<Title>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the title on initialization', () => {
    expect(titleService.setTitle).toHaveBeenCalledWith('Create User');
  });

  it('should validate form correctly', () => {
    component.userForm = {
      firstName: 'John',
      lastName: 'Doe',
      accountId: '123456789',
      line1: '123 Main St',
      line2: '',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'USA',
    };
    expect(component['validateForm']()).toBeTrue();
  });

  it('should invalidate form with missing required fields', () => {
    component.userForm = {
      firstName: '',
      lastName: '',
      accountId: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    };
    expect(component['validateForm']()).toBeFalse();
    expect(component.userFormErrors.firstName).toBe('First name is required');
    expect(component.userFormErrors.lastName).toBe('Last name is required');
    expect(component.userFormErrors.accountId).toBe('Account ID is required');
    expect(component.userFormErrors.line1).toBe(
      'Address line 1 is required and must be at least 3 characters'
    );
    expect(component.userFormErrors.city).toBe('City is required');
    expect(component.userFormErrors.state).toBe('State is required');
    expect(component.userFormErrors.zip).toBe('Zip code is required');
    expect(component.userFormErrors.country).toBe('Country is required');
  });

  it('should call createUser on submit if form is valid', () => {
    component.userForm = {
      firstName: 'John',
      lastName: 'Doe',
      accountId: '123456789',
      line1: '123 Main St',
      line2: '',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'USA',
    } as CreateUserRequest;

    usersApiService.createUser.and.returnValue(
      of({
        error: null,
        data: {
          id: 1,
          accountId: '123456789',
          address: '123 Main St',
          firstName: 'John',
          lastName: 'Doe',
        } as User,
      } as BaseResponse<User>)
    );
    component.onSubmit();
    expect(usersApiService.createUser).toHaveBeenCalled();
    expect(usersApiService.createUser).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      accountId: '123456789',
      line1: '123 Main St',
      line2: '',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'USA',
    } as CreateUserRequest);
    expect(component.submitting).toBeFalse();
    expect(component.userCreated).toBeTrue();
  });

  it('should handle error response on submit', () => {
    component.userForm = {
      firstName: 'John',
      lastName: 'Doe',
      accountId: '123456789',
      line1: '123 Main St',
      line2: '',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'USA',
    };
    const errorResponse = {
      error: new Map([
        ['raw', 'An unexpected error occurred'],
        ['firstName', 'Invalid first name'],
      ]),
      data: null,
    };
    usersApiService.createUser.and.returnValue(of(errorResponse));
    component.onSubmit();
    expect(component.submitting).toBeFalse();
    expect(component.errorMessage).toBe('An unexpected error occurred');
    expect(component.userFormErrors.firstName).toBe('Invalid first name');
  });

  it('should reset form correctly', () => {
    component.resetForm();
    expect(component.userForm).toEqual({
      firstName: '',
      lastName: '',
      accountId: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    });
    expect(component.userFormErrors).toEqual({
      firstName: '',
      lastName: '',
      accountId: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    });
  });

  it('should update form values on input change', () => {
    const event = { target: { value: 'John' } } as unknown as Event;
    component.onInputChange(event, 'firstName');
    expect(component.userForm.firstName).toBe('John');
  });
});
