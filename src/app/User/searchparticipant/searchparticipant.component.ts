import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchparticipantService } from '../../service/searchparticipants.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private searchService: SearchparticipantService,
    private _snackBar: MatSnackBar
  ) {}

  searchParticipant() {
    if (this.searchQuery.trim()) {
      this.searchService.getParticipant(this.searchQuery).subscribe((data: any) => {
        if (data.length > 0) {
          this.participant = data[0];
          console.log(this.participant); // Log the participant data for debugging
          
          // Check and log the eventdate if it exists
          if (this.participant.eventdate) {
            console.log('Event Date:', this.participant.eventdate);
          } else {
            console.log('Event Date not found');
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
