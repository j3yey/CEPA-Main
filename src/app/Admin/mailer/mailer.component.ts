import { Component } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../service/email.service';

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
  showSuccessMessage: boolean = false;
  emailErrorMessage: string = '';

  constructor(private emailService: EmailService) { }

  sendEmail() {
    const emailData = {
      to: this.recipientEmail,
      subject: this.emailSubject,
      message: this.emailMessage // No need to replace newline characters here
    };
  
    // Modify the email message format before sending
    emailData.message = emailData.message.replace(/\n/g, '<br>');
  
    this.emailService.sendEmail(emailData).subscribe(
      () => {
        this.emailSent = true;
        this.showSuccessMessage = true;
        this.resetForm(); // Reset form after successful sending
      },
      (error: any) => {
        this.emailError = true;
        this.emailErrorMessage = error.message;
      }
    );
  }

  sanitizeMessage(message: string): string {
    message = message.replace(/<br>/g, '\n');
    const tempElement = new DOMParser().parseFromString(message, 'text/html');
    return tempElement.body.textContent || '';
  }

  resetForm(): void {
    this.recipientEmail = '';
    this.emailSubject = '';
    this.emailMessage = '';
    this.emailSent = false;
    this.emailError = false;
    this.emailErrorMessage = '';
  }

  closeSuccessMessage() {
    this.showSuccessMessage = false;
  }
}