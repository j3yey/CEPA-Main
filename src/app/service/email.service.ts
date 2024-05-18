import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private http: HttpClient) { }

  sendEmail(emailData: any): Observable<any> {
    // Assuming you have an API endpoint to send emails
    const APIurl = 'https://itcepacommunity.com/cepaapi/api/sendemail';
    return this.http.post(APIurl, emailData);
  }
}
