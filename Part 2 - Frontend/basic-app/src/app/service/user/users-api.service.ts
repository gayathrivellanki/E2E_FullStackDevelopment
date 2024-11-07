import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import BaseResponse from '../../types/BaseResponse';
import User from '../../types/User';
import CreateUserRequest from '../../types/CreateUserRequest';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  private userApiBaseUrl = 'http://127.0.0.1:8080/api/user/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<BaseResponse<User[]>> {
    return this.http.get<BaseResponse<User[]>>(this.userApiBaseUrl)
      .pipe(
        map(response => ({ data: response.data, error: null })),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  createUser(user: CreateUserRequest): Observable<BaseResponse<User>> {
    return this.http.post<BaseResponse<User>>(this.userApiBaseUrl, user)
      .pipe(
        map(response => ({ data: response.data, error: null })),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  searchUsers(searchType: string, searchQuery: string): Observable<BaseResponse<User[]>> {
    const url = `${this.userApiBaseUrl}search?query=${searchQuery}&searchBy=${searchType}`
    return this.http.get<BaseResponse<User[]>>(url)
      .pipe(
        map(response => ({ data: response.data, error: null })),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  private handleError(httpError: HttpErrorResponse): Observable<BaseResponse<any>> {
    console.log('Error occurred:', httpError.error);
    if (httpError.error && httpError.error.error) {
      // If the error follows the API's structure
      const errorMap = new Map<string, string>();
      Object.entries(httpError.error.error).forEach(([key, value]) => {
        errorMap.set(key, value as string);
      });

      return of({
        data: null,
        error: errorMap
      });
    } else {
      // For network errors or unexpected errors
      const errorMap = new Map<string, string>();
      errorMap.set('raw', 'An unexpected error occurred');
      return of({
        data: null,
        error: errorMap
      });
    }
  }
}
