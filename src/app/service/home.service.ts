import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'https://itcepacommunity.com/cepaapi/api/';

  constructor(private http: HttpClient) { }

  // Method to fetch counts of events and participants from the backend API
  getParticipantCount(): Observable<any> {
    console.log('Fetching participant count...');
    return this.http.get<any>(this.apiUrl + 'home_totalParticipants');
  } 

  getEventCount(): Observable<any> {
    console.log('Fetching event count...');
    return this.http.get<any>(this.apiUrl + 'home_totalEvents');
  }

  // Method to fetch the most participated event from the backend API
  getMostParticipatedEvent(): Observable<any> {
    console.log('Fetching most participated event...');
    return this.http.get<any>(this.apiUrl + 'mostparticipatedevent');
  }
}
