import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import User from '../types/User';
import { UsersApiService } from '../service/user/users-api.service';

@Component({
  selector: 'app-search-member',
  standalone: true,
  imports: [],
  templateUrl: './search-member.component.html',
  styleUrl: './search-member.component.css',
})
export class SearchMemberComponent {
  title = 'Search Users';
  searchQuery = '';
  queryError = '';
  errorMessage = '';
  loading = true;
  users: User[] = [];
  selectedSearchType = 'name';

  searchTypes = [
    { value: 'name', label: 'Name' },
    { value: 'accountId', label: 'Account Id' },
  ];

  constructor(
    private titleService: Title,
    private usersApiService: UsersApiService
  ) {
    this.titleService.setTitle(this.title);
  }

  onSearchChange(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
  }

  onSearch() {
    this.loading = true;
    this.queryError = '';
    this.errorMessage = '';
    this.usersApiService
      .searchUsers(this.selectedSearchType, this.searchQuery)
      .subscribe({
        next: (response) => {
          if (response.error) {
            this.errorMessage =
              response.error.get('raw') || 'An unexpected error occurred';
          } else {
            this.users = response.data || [];
          }
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = error;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  onOptionChanged(event: Event) {
    this.selectedSearchType = (event.target as HTMLSelectElement).value;
  }
}
