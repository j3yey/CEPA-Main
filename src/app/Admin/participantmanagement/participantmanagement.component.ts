import { Component,NgModule, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ParticipantmanagementService } from '../../service/participantmanagement.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { EditParticipantComponent } from './edit-participant/edit-participant.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  
  selector: 'app-participantmanagement',
  templateUrl: './participantmanagement.component.html',
  styleUrl: './participantmanagement.component.css'
})
export class ParticipantmanagementComponent implements OnInit {
  participants: any[] = [];
  dataSource!: MatTableDataSource<any>;
  searchValue: string = '';

  constructor(
    private participantService: ParticipantmanagementService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchParticipants();
  }

  fetchParticipants() {
    this.participantService.getParticipants().subscribe(
      (response: any) => {
        // console.log('Response:', response);
        if (response && Array.isArray(response) && response.length > 0) {
          this.participants = response;
          this.dataSource = new MatTableDataSource(this.participants);
          // console.log('Participants:', this.participants);
        } else {
          console.error('Failed to fetch participants: Invalid response format');
        }
      },
      (error) => {
        console.error('Error fetching participants:', error);
      }
    );
  }
  
  applyFilter() {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
  }

  archiveParticipant(participant: any) {
    this.participantService.archiveParticipant(participant).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          // Refresh the list of participants after successful archiving
          this.fetchParticipants();
          console.log('Participant archived successfully');
          // Reload the page after archiving
          window.location.reload();
        } else {
          console.error('Failed to archive participant:', response.message);
          window.location.reload();
        }
      },
      (error) => {
        console.error('Error archiving participant:', error);
        window.location.reload();
      }
    );
  }

  openEditModal(participant: any): void {
    const dialogRef = this.dialog.open(EditParticipantComponent, {
      width: '442px',
      data: { participant }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after modal is closed
    });
  }

  
}
@NgModule({
  imports: [MatTableModule, MatIconModule, MatFormField, FormsModule, MatInputModule, MatCardModule],
  declarations: [ParticipantmanagementComponent]
})
export class ParticipantmanagementModule{ }


