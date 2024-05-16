import { Component } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { Chart, registerables } from 'chart.js';
import { EventService } from '../../service/event.service';
import { HomeService } from '../../service/home.service';
Chart.register(...registerables);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidenavComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  participantsCount = 0;
  eventsCount = 0;
  events: any[] = []; // To store multiple events and their participant counts
  mostParticipatedEvent = ''; // To store the most participated event name
  mostParticipatedEventCount = 0;


  constructor(private eventService: EventService, private homeService: HomeService) {}


  ngOnInit(): void {
    this.renderChart();
    this.fetchData();
  }

  renderChart() {
    this.eventService.getEventsWithParticipantCounts().subscribe(events => {
      const labels = events.map(event => event.event_name);
      const participants = events.map(event => event.participant_count);
      const colors = this.generateRandomColors(events.length); // Generate random colors

      const ctx = document.getElementById('barChart') as HTMLCanvasElement;
      const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Number of Participants',
            data: participants,
            backgroundColor: colors,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }

  // Function to generate random colors
  generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.2)`;
      colors.push(color);
    }
    return colors;
  }

  private async fetchData(): Promise<void> {
    try {
      const participantResponse = await this.homeService.getParticipantCount().toPromise();
      const eventResponse = await this.homeService.getEventCount().toPromise();
      const mostParticipatedEventResponse = await this.homeService.getMostParticipatedEvent().toPromise();

      console.log('Participant Response:', participantResponse);
      console.log('Event Response:', eventResponse);
      console.log('Most Participated Event Response:', mostParticipatedEventResponse);

      if (participantResponse.payload) {
        this.participantsCount = participantResponse.payload.length;
      }

      if (eventResponse.payload) {
        this.eventsCount = eventResponse.payload.length;
        this.events = eventResponse.payload; // Assuming this is an array of events
      }

      if (mostParticipatedEventResponse.event_name) {
        this.mostParticipatedEvent = mostParticipatedEventResponse.event_name;
        this.mostParticipatedEventCount = mostParticipatedEventResponse.participant_count;
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}