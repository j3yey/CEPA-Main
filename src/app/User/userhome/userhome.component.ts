import { Component, NgModule, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from '../../service/event.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { UserhomedetailsComponent } from './userhomedetails/userhomedetails.component';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];

  constructor(
    public dialog: MatDialog,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEventsUser().subscribe(
      (response: any) => {
        if (response.status?.remarks === 'success') { // perform null check here
          this.events = response.payload || []; // perform null check here and assign empty array if null
          this.filteredEvents = this.events;
          console.log('Events:', this.events);
        } else {
          console.error('Failed to fetch events:', response.status?.message); // perform null check here
        }
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  openUserHomeDetailsDialog(event: any) {
    this.dialog.open(UserhomedetailsComponent, {
      data: event,
      width: '90%', // Default width of the dialog
      maxWidth: '844px', // Default maximum width of the dialog
    });
  }

  filterEvents(event: any) {
    const searchValue = (event.target as HTMLInputElement).value;
    if (!searchValue) {
      this.filteredEvents = this.events;
    } else {
      this.filteredEvents = this.events.filter(event =>
        event.event_name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  }
}



@NgModule({
  declarations: [UserhomeComponent], // Declare only UserhomeComponent here
  imports: [
    CommonModule,
    MatCardModule,
  ],
})
export class UserhomeModule { }
