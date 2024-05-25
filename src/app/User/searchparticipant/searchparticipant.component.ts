import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-searchparticipant',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, MatCardModule],
  templateUrl: './searchparticipant.component.html',
  styleUrls: ['./searchparticipant.component.css']
})
export class SearchparticipantComponent {
  searchQuery: string = '';
  participant: any = null;

  constructor(
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) {}

  searchParticipant() {
    if (this.searchQuery.trim()) {
      this.dataService.searchParticipant(this.searchQuery).subscribe((data: any) => {
        if (data.length > 0) {
          this.participant = data[0];
          console.log(this.participant); // Log the participant data for debugging
          
          // Check and log the event dates if they exist
          if (this.participant.events && this.participant.events.length > 0) {
            this.participant.events.forEach((event: any) => {
              if (event.event_date) {
                console.log('Event Date:', event.event_date);
              } else {
                console.log('Event Date not found in this event');
              }
            });
          } else {
            console.log('No events found for this participant');
          }
        } else {
          this.participant = null;
          this.openSnackBar('No participant found');
        }
      });
    }
  }
  

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000 // Set duration for the snackbar
    });
  }
}
