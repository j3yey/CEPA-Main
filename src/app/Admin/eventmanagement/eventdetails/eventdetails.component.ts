import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { AttendanceService } from '../../../service/attendance.service';

@Component({
  selector: 'app-eventdetails',
  standalone: true,
  imports: [MatTabsModule, RouterModule,MatTableModule],
  templateUrl: './eventdetails.component.html',
  styleUrl: './eventdetails.component.css'
})
export class EventdetailsComponent {
  attendanceData: any[] = [];
  displayedColumns: string[] = ['l_name', 'f_name', 'email'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dialogRef: MatDialogRef<EventdetailsComponent>,
    private attendanceService: AttendanceService // Inject AttendanceService
  ) {}

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
