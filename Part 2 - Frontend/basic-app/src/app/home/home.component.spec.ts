import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Title } from '@angular/platform-browser';
import { UsersApiService } from '../service/user/users-api.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import User from '../types/User';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockTitleService: jasmine.SpyObj<Title>;
  let mockUsersApiService: jasmine.SpyObj<UsersApiService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockTitleService = jasmine.createSpyObj('Title', ['setTitle']);
    mockUsersApiService = jasmine.createSpyObj('UsersApiService', ['getUsers']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: Title, useValue: mockTitleService },
        { provide: UsersApiService, useValue: mockUsersApiService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title on init', () => {
    mockUsersApiService.getUsers.and.returnValue(of({ data: [], error: null }));
    fixture.detectChanges();
    expect(mockTitleService.setTitle).toHaveBeenCalledWith('Home');
  });

  it('should fetch users successfully', fakeAsync(() => {
    const mockUsers = [{ id: 1, firstName: 'Test User' } as User];
    mockUsersApiService.getUsers.and.returnValue(
      of({ data: mockUsers, error: null })
    );

    fixture.detectChanges();
    tick();

    expect(component.users).toEqual(mockUsers);
    expect(component.loading).toBeFalse();
    expect(component.errorMessage).toBe('');
  }));

  it('should handle API error response', fakeAsync(() => {
    const errorMap = new Map([['raw', 'API Error']]);
    mockUsersApiService.getUsers.and.returnValue(
      of({ error: errorMap, data: null })
    );

    fixture.detectChanges();
    tick();

    expect(component.errorMessage).toBe('API Error');
    expect(component.loading).toBeFalse();
  }));

  it('should handle error when fetching users', fakeAsync(() => {
    mockUsersApiService.getUsers.and.returnValue(
      throwError(() => new Error('Network error'))
    );

    fixture.detectChanges();
    tick();

    expect(component.errorMessage).toBe('Network error');
    expect(component.loading).toBeFalse();
  }));

  it('should navigate to create user page', () => {
    component.addUser();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/user/create']);
  });

  it('should navigate to search users page', () => {
    component.searchUsers();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/user/search']);
  });
});
