import { Component } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../service/email.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private emailService: EmailService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {}

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
        this.openSnackBar('Email sent successfully');
        this.resetForm(); // Reset form after successful sending
      },
      (error: any) => {
        this.emailError = true;
        this.openSnackBar('Failed to send email');
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Snackbar duration in milliseconds
    });
  }

  resetForm(): void {
    this.recipientEmail = '';
    this.emailSubject = '';
    this.emailMessage = '';
    this.emailSent = false;
    this.emailError = false;
  }
}