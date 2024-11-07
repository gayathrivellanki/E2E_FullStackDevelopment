import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchMemberComponent } from './search-member.component';
import { Title } from '@angular/platform-browser';
import { UsersApiService } from '../service/user/users-api.service';
import { of, throwError } from 'rxjs';
import User from '../types/User';

describe('SearchMemberComponent', () => {
  let component: SearchMemberComponent;
  let fixture: ComponentFixture<SearchMemberComponent>;
  let mockTitleService: jasmine.SpyObj<Title>;
  let mockUsersApiService: jasmine.SpyObj<UsersApiService>;

  beforeEach(async () => {
    mockTitleService = jasmine.createSpyObj('Title', ['setTitle']);
    mockUsersApiService = jasmine.createSpyObj('UsersApiService', [
      'searchUsers',
    ]);

    await TestBed.configureTestingModule({
      imports: [SearchMemberComponent],
      providers: [
        { provide: Title, useValue: mockTitleService },
        { provide: UsersApiService, useValue: mockUsersApiService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the title on initialization', () => {
    expect(mockTitleService.setTitle).toHaveBeenCalledWith('Search Users');
  });

  it('should update searchQuery on search input change', () => {
    const event = { target: { value: 'test' } } as unknown as Event;
    component.onSearchChange(event);
    expect(component.searchQuery).toBe('test');
  });

  it('should update selectedSearchType on option change', () => {
    const event = { target: { value: 'accountId' } } as unknown as Event;
    component.onOptionChanged(event);
    expect(component.selectedSearchType).toBe('accountId');
  });

  it('should handle successful search', () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          accountId: 'A1234',
          address: '123 Main St',
        } as User,
      ],
      error: null,
    };
    mockUsersApiService.searchUsers.and.returnValue(of(mockResponse));

    component.onSearch();

    expect(mockUsersApiService.searchUsers).toHaveBeenCalledWith('name', '');
    expect(component.users).toEqual(mockResponse.data);
    expect(component.errorMessage).toBe('');
    expect(component.loading).toBeFalse();
  });

  it('should handle search error', () => {
    const mockError = 'An error occurred';
    mockUsersApiService.searchUsers.and.returnValue(throwError(mockError));

    component.onSearch();

    expect(mockUsersApiService.searchUsers).toHaveBeenCalledWith('name', '');
    expect(component.errorMessage).toBe(mockError);
    expect(component.users).toEqual([]);
    expect(component.loading).toBeFalse();
  });

  it('should handle search response with error', () => {
    const mockResponse = {
      error: new Map([['raw', 'Server error']]),
      data: null,
    };
    mockUsersApiService.searchUsers.and.returnValue(of(mockResponse));

    component.onSearch();

    expect(mockUsersApiService.searchUsers).toHaveBeenCalledWith('name', '');
    expect(component.errorMessage).toBe('Server error');
    expect(component.users).toEqual([]);
    expect(component.loading).toBeFalse();
  });
});
