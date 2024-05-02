import { Component } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mailer',
  standalone: true,
  imports: [
    SidenavComponent,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './mailer.component.html',
  styleUrl: './mailer.component.css'
})
export class MailerComponent {
  recipientEmail: string = '';
  emailSubject: string = '';
  emailMessage: string = '';
  emailSent: boolean = false;
  emailError: boolean = false;
  emailErrorMessage: string = '';

  constructor(private http: HttpClient) {}

  sendEmail(): void {
    const emailData = {
      to: this.recipientEmail,
      subject: this.emailSubject,
      message: this.emailMessage
    };

    this.http.post<any>('http://localhost/CEPA-Main/CEPA-Main/cepaapi/api/sendemail', emailData)
      .subscribe(
        response => {
          this.emailSent = response.success;
          if (this.emailSent) {
            this.emailMessage = 'Email sent successfully!';
            this.resetForm();
          } else {
            this.emailError = true;
            this.emailErrorMessage = 'Failed to send email: ' + response.message;
          }
        },
        error => {
          console.error('Error occurred:', error);
          this.emailError = true;
          this.emailErrorMessage = 'Failed to send email. Please try again later.';
        }
      );
  }

  resetForm(): void {
    this.recipientEmail = '';
    this.emailSubject = '';
    this.emailMessage = '';
    this.emailSent = false;
    this.emailError = false;
    this.emailErrorMessage = '';
  }
}
