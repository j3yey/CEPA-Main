import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AttendanceService } from '../service/attendance.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  attendanceForm: FormGroup; // Declare the form group

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService
  ) {
    // Initialize the form group with controls and validators
    this.attendanceForm = this.fb.group({
      lastName: ['', Validators.required], // Ensure Validators for required fields
      firstName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Email validator
      phoneNumber: ['', Validators.required], // Ensure phone number is required
    });
  }

  ngOnInit(): void {
    // Additional initialization logic, if needed
  }

  onSubmit(): void {
    if (this.attendanceForm.valid) {
      // If the form is valid, call the service to submit the data
      this.attendanceService.submitAttendance(this.attendanceForm.value).subscribe(
        (response) => console.log('Registration successful:', response),
        (error) => console.error('Registration failed:', error)
      );
    } else {
      console.error('Form is invalid'); // Error handling for invalid form
    }
  }
}
