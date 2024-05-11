import { Component,NgModule, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ParticipantmanagementService } from '../../service/participantmanagement.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

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
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchParticipants();
  }

  fetchParticipants() {
    this.participantService.getParticipants().subscribe(
      (response: any) => {
        if (response.status.remarks === 'success') {
          this.participants = response.payload;
          this.dataSource = new MatTableDataSource(this.participants);
          console.log('participants:', this.participants);
        } else {
          console.error('Failed to fetch participants:', response.status.message);
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

  editParticipant(participant: any) {
    // Navigate to the attendance form with the participant's ID as a parameter
    this.router.navigate(['/attendance', participant.participant_id]);
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
}
@NgModule({
  imports: [MatTableModule, MatIconModule, MatFormField, FormsModule, MatInputModule, MatCardModule],
  declarations: [ParticipantmanagementComponent]
})
export class ParticipantmanagementModule{ }


