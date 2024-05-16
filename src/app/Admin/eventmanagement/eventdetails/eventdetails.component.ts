import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AttendanceService } from '../../../service/attendance.service';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonModule } from '@angular/common';
import { QRCodeService } from '../../../service/qr-code.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateValidator } from '../../../service/date-validator.service';
import { EventService } from '../../../service/event.service';

@Component({
  selector: 'app-eventdetails',
  standalone: true,
  imports: [CommonModule, MatTabsModule, RouterModule, MatTableModule, QRCodeModule, ReactiveFormsModule],
  templateUrl: './eventdetails.component.html',
  styleUrl: './eventdetails.component.css'
})
export class EventdetailsComponent {
  attendanceData: any[] = [];
  displayedColumns: string[] = ['l_name', 'f_name', 'email'];
  qrCodeData: string | null = null; // Variable to hold QR code data
  updateForm: FormGroup;
  minDate: Date = new Date(); 
  dataSource: MatTableDataSource<any>; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dialogRef: MatDialogRef<EventdetailsComponent>,
    private attendanceService: AttendanceService,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private dateValidator: DateValidator, 
    private snackBar: MatSnackBar,
    private qrCodeService: QRCodeService // Inject QRCodeService
  ) {  
    this.updateForm = this.formBuilder.group({ 
    event_name: [, Validators.required],
    event_date: [, [Validators.required, DateValidator.notPastDate(this.snackBar)]], 
    event_location: [, Validators.required],
    organizer: [, Validators.required],
    description: [, Validators.required]
  });
  this.dataSource = new MatTableDataSource(this.attendanceData);
}

updateEventDetails() {
  if (this.updateForm.valid) {
    const updatedEventData = this.updateForm.value;
    this.eventService.updateEventDetails(this.data.event_id, updatedEventData).subscribe(
      (response: any) => {
        console.log('Event details updated successfully:', response);
        this.data = updatedEventData;
      },
      error => {
        console.error('Failed to update event details:', error);
      }
    );
  } else {
  }
}

deleteEvent() {
  if (confirm('Are you sure you want to delete this event?')) {
    this.eventService.archiveEvent(this.data.event_id).subscribe(
      (response: any) => {
        console.log('Event archived successfully:', response);
        this.dialogRef.close();
        window.location.reload();
      },
      error => {
        console.error('Failed to archive event:', error);
      }
    );
  }
}


reloadEvents() {
  this.eventService.getAllEvents().subscribe(
    (events: any[]) => {},
    error => {
      console.error('Failed to fetch events:', error);
    }
  );
}


fetchAttendanceData() {
  this.attendanceService.getAttendanceForEvent(this.data.event_id).subscribe(
    (response: any) => {
      this.attendanceData = response;
      this.dataSource.data = this.attendanceData; 
    },
    error => {
      console.error('Failed to fetch attendance data:', error);
    }
  );
}

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