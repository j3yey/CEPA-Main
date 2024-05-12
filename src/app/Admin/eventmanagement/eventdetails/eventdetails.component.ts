import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { AttendanceService } from '../../../service/attendance.service';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonModule } from '@angular/common';
import { QRCodeService } from '../../../service/qr-code.service';

@Component({
  selector: 'app-eventdetails',
  standalone: true,
  imports: [CommonModule, MatTabsModule, RouterModule,MatTableModule, QRCodeModule],
  templateUrl: './eventdetails.component.html',
  styleUrl: './eventdetails.component.css'
})
export class EventdetailsComponent {
  attendanceData: any[] = [];
  displayedColumns: string[] = ['l_name', 'f_name', 'email'];
  qrCodeData: string | null = null; // Variable to hold QR code data

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dialogRef: MatDialogRef<EventdetailsComponent>,
    private attendanceService: AttendanceService,
    private qrCodeService: QRCodeService // Inject QRCodeService
  ) { }

  ngOnInit() {
    // Fetch attendance data for the current event
    this.attendanceService.getAttendanceForEvent(this.data.event_id).subscribe(
      (response: any) => {
        this.attendanceData = response; // Assign fetched attendance data to attendanceData
      },
      error => {
        console.error('Failed to fetch attendance data:', error);
      }
    );

    // Generate QR code data for event registration
    this.qrCodeService.generateQRCodeData(this.data.event_id).subscribe(
      (qrCodeData: string) => {
        // console.log('QR Code Data:', qrCodeData);
        this.qrCodeData = qrCodeData; // Assign generated QR code data to qrCodeData
      },
      error => {
        console.error('Failed to generate QR code data:', error);
      }
    );
  }

  goToAttendance() {
    // Check if data.event_id is defined
    if (this.data && this.data.event_id) {
      // Navigate to the attendance route with the event ID
      this.router.navigate(['/attendance', this.data.event_id]).then(() => {
        this.dialogRef.close(); // Close the dialog after navigation
      });
    } else {
      console.error('Event ID is undefined or null.');
    }
  } 
}