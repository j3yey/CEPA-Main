import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(id: string, password: string) {
    return this.http.post<any>('https://itcepacommunity.com/cepaapi/api/login', { id, password })
      .pipe(
        map(response => {
          // Check if token exists in the response
          if (response && response.token) {
            localStorage.setItem('token', response.token); // Store token in local storage
            return true; // Login successful
          } else {
            return false; // Login failed
          }
        }),
        catchError(this.handleError) // Handle HTTP errors
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Check if token exists in localStorage
  }

  logout() {
    localStorage.removeItem('token'); // Remove token from localStorage
    this.router.navigate(['/admin/login']); // Redirect to admin login page upon logout
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage); // Throw an observable with a user-friendly error message
  }
}
