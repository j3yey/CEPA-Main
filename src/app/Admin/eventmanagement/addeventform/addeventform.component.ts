import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { EventService } from '../../../service/event.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addeventform',
  templateUrl: './addeventform.component.html',
  styleUrls: ['./addeventform.component.css']
})
export class AddeventformComponent {
  form: FormGroup;
  minDate: string;

  @Output() eventAdded: EventEmitter<any> = new EventEmitter<any>();
  @Output() canceled: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddeventformComponent>,
  ) {
      this.minDate = new Date().toISOString().split('T')[0];
      this.form = this.formBuilder.group({
      event_name: ['', Validators.required],
      event_date: ['', [Validators.required, this.futureDateValidator]],
      event_location: ['', Validators.required],
      organizer: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.openSnackBar('Please ensure all fields are filled out correctly. (Cannot select a past date)');
      return;
    }
    this.eventService.addEvent(this.form.value).subscribe(
      (response: any) => {
        console.log(response);
        this.form.reset();
        this.eventAdded.emit();
        this.openSnackBar('Event added successfully');
      },
      (error: any) => {
        console.error(error);
        this.openSnackBar('Failed to add event');
      }
    );
  }
  
  
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Snackbar duration in milliseconds
    });
  }

  onCancel() {
    this.dialogRef.close(); // Close the dialog
  }
  
  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    const isFutureDate = selectedDate >= currentDate;
    if (!isFutureDate) {
      return { futureDate: true };
    }
    return null;
  }
}


@NgModule({
  imports: [ReactiveFormsModule, MatSnackBarModule],
  declarations: [AddeventformComponent]
})
export class AddeventformModule { }