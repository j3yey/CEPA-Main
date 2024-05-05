import { Component,NgModule, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ParticipantmanagementService } from '../../service/participantmanagement.service';

@Component({
  
  selector: 'app-participantmanagement',
  templateUrl: './participantmanagement.component.html',
  styleUrl: './participantmanagement.component.css'
})
export class ParticipantmanagementComponent implements OnInit {
  participants: any[] = [];

  constructor(private participantService: ParticipantmanagementService) {}

  ngOnInit() {
    this.fetchParticipants();
  }

  fetchParticipants() {
    this.participantService.getParticipants().subscribe(
      (response: any) => {
        if (response.status.remarks === 'success') {
          this.participants = response.payload;
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
}
@NgModule({
  imports: [MatTableModule],
  declarations: [ParticipantmanagementComponent]
})
export class ParticipantmanagementModule{ }


