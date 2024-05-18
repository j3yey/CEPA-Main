import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'https://itcepacommunity.com/cepaapi/api/submitfeedback';

  constructor(private http: HttpClient) { }

  submitFeedback(feedbackData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, feedbackData).pipe(
      catchError((error: HttpErrorResponse) => {
        // Log the full error response
        console.error('Full error response:', error);
        
        // Handle error response
        let errorMessage = 'Unknown error occurred';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error: ${error.status} - ${error.error}`;
        }
        // Log error message or show it to the user
        console.error(errorMessage);
        // Return an observable with a user-friendly error message
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }
}
