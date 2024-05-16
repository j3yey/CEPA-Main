import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DateValidator {

  constructor(private snackBar: MatSnackBar) {}

  static notPastDate(snackBar: MatSnackBar): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison
      if (selectedDate < currentDate) {
        snackBar.open('Selected date cannot be in the past', 'Close', { duration: 3000 });
        return { 'pastDate': true }; // Return validation error if selected date is in the past
      }
      return null; // Return null if validation passes
    };
  }

}
