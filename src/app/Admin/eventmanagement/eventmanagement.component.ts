import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from '../../service/event.service';
import { AddeventformComponent } from './addeventform/addeventform.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { EventdetailsComponent } from './eventdetails/eventdetails.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventmanagement',
  providers: [EventService],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule],
  templateUrl: './eventmanagement.component.html',
  styleUrls: ['./eventmanagement.component.css']
})
export class EventmanagementComponent implements OnInit {
  events: any[] = [];

  constructor(
    public dialog: MatDialog,
    private eventService: EventService,
    private router: Router
  ) {}

    ngOnInit(): void {
      this.loadEvents(); // Load events when the component initializes
    }

    openDialog() {
      const dialogRef = this.dialog.open(AddeventformComponent, {
        width: '500px',
      });

      dialogRef.componentInstance.eventAdded.subscribe(() => {
        this.loadEvents(); // Refresh events after adding a new event
      });
    }

    loadEvents() {
      this.eventService.getAllEvents().subscribe(
        (response: any) => {
          if (response.status.remarks === 'success') {
            this.events = response.payload;
            // console.log('Events:', this.events); //Uncomment if checking
          } else {
            console.error('Failed to fetch events:', response.status.message);
          }
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    }

    openEventDetailsDialog(event: any) {
      this.dialog.open(EventdetailsComponent, {
        data: event, // Pass the event data directly
        width: '90%', // Default width of the dialog
        maxWidth: '844px', // Default maximum width of the dialog
      });
    }
}