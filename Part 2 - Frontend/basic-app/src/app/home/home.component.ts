import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import User from '../types/User';
import { UsersApiService } from '../service/user/users-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  title = 'Home';
  users: User[] = [];
  errorMessage = '';
  loading = false;

  constructor(
    private titleService: Title,
    private usersApiService: UsersApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

    this.fetchUsers();
  }

  private fetchUsers(): void {
    this.loading = true;
    this.errorMessage = '';

    this.usersApiService.getUsers().subscribe({
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
        this.errorMessage = error.message || 'An unexpected error occurred';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  addUser() {
    this.router.navigate(['/user/create']);
  }

  searchUsers() {
    this.router.navigate(['/user/search']);
  }
}
