import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../service/email.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { QrcodeDisplayComponent } from './qrcode/qrcode-display/qrcode-display.component';
import { QRCodeService } from '../../service/qr-code.service';
import { EventService } from '../../service/event.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mailer',
  standalone: true,
  imports: [
    SidenavComponent,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    QrcodeDisplayComponent,
    RouterModule
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
  events: any[] = [];
  selected: string = 'None';
  qrCodeImageUrl: string = ''; // URL of the generated QR code image
  qrCodeData: string = '';

  constructor(private emailService: EmailService, 
    private snackBar: MatSnackBar, 
    private qrCodeService: QRCodeService,
    private eventService: EventService,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  generateQRCodeForSelectedEventManually() {
    this.generateQRCodeForSelectedEvent();
}

  onEventSelectionChange() {
    this.generateQRCodeForSelectedEvent();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(
      (response: any) => {
        if (response && response.payload && Array.isArray(response.payload)) {
          this.events = response.payload;
          if (this.events.length > 0) {
            this.selected = this.events[0].event_id;
            this.generateQRCodeForSelectedEvent(); // Generate QR code for the initial selected event
          }
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error: any) => {
        console.error('Error loading events:', error);
      }
    );
  }

  sendEmail() {
    const emailData = {
      to: this.recipientEmail,
      subject: this.emailSubject,
      message: this.emailMessage.replace(/\n/g, '<br>'),
      qrCodeImageUrl: this.qrCodeImageUrl, // Include QR code image URL
      qrCodeData: this.qrCodeData // Include QR code data as base64 string
    };
  
    this.emailService.sendEmail(emailData).subscribe(
      () => {
        this.emailSent = true;
        this.openSnackBar('Email sent successfully');
        this.resetForm();
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

  generateQRCodeForSelectedEvent() {
    if (this.selected !== 'None') {
      this.qrCodeService.generateQRCodeData(this.selected).subscribe(
        (qrCodeData: string) => {
          if (qrCodeData?.trim()) {
            this.ngZone.run(() => {
              this.qrCodeData = qrCodeData; // Update the QR code data
              this.qrCodeImageUrl = `data:image/png;base64,${qrCodeData}`;
              this.changeDetectorRef.detectChanges(); // Trigger change detection
            });
          } else {
            console.error('Generated QR code data is empty');
            this.qrCodeData = '';
          }
        },
        error => {
          console.error('Failed to generate QR code data:', error);
        }
      );
    }
  }  
}