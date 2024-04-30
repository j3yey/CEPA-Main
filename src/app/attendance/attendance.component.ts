import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder, FormGroup, Validators
import { AttendanceService } from '../service/attendance.service';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

@Component({
  selector: 'app-register',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private attendanceService: AttendanceService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      l_name: ['', Validators.required],
      f_name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      p_number: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      // If the form is invalid, stop submission
      return;
    }

    this.attendanceService.submitAttendance(this.form.value).subscribe(
      response => {
        console.log('Attendance submitted successfully:', response);
        // Optionally, reset the form or show a success message
        this.form.reset(); // Reset the form after successful submission
      },
      error => {
        console.error('Failed to submit attendance:', error);
        // Handle error, show error message, etc.
      }
    );
  }
}
@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [AttendanceComponent]
})
export class ReactiveFormsModuleModule{}