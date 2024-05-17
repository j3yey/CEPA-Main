import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParticipantmanagementService } from '../../../service/participantmanagement.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-participant-modal',
  imports: [ReactiveFormsModule,FormsModule, FormsModule],
  standalone: true,
  templateUrl: './edit-participant.component.html',
  styleUrls: ['./edit-participant.component.css']
})
export class EditParticipantComponent {
  updateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditParticipantComponent>,
    private participantService: ParticipantmanagementService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Data received:', this.data); // Log the received data
    this.updateForm = this.formBuilder.group({
      first_name: [, Validators.required],
      last_name: [, Validators.required],
      phone_number: [, Validators.required],
      email: [, [Validators.required, Validators.email]]
    });
  }

  updateParticipantDetails() {
    if (this.updateForm.valid) {
      const updatedParticipantData = this.updateForm.value;
      const participantId = this.data.participant.participant_id;
      this.participantService.updateParticipantDetails(participantId, updatedParticipantData).subscribe(
        (response: any) => {
          console.log('Participant details updated successfully:', response);
          this.openSnackBar('Participant details updated successfully'); // Display success snack bar
          this.dialogRef.close();
          window.location.reload(); // Reload the window after successful update
        },
        error => {
          console.error('Failed to update participant details:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    }).afterDismissed().subscribe(() => {
      this.cdr.detectChanges(); // Detect changes after the snack bar is dismissed
    });
  }
}