  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable, BehaviorSubject } from 'rxjs';

  @Injectable({
    providedIn: 'root',
  })
  export class EventService {
    private apiUrl = 'https://itcepacommunity.com/cepaapi/api/';
    private eventsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    constructor(private http: HttpClient) { }

    addEvent(data: any): Observable<any> {
      return this.http.post<any>(this.apiUrl + 'addevent', data);
    }

    getAllEventsUser(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl + 'getevent_user');
    }
    
    getAllEvents(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl + 'getevent');
    }
    
    getEventDetails(eventId: string): Observable<any> {
      return this.http.get<any>(this.apiUrl + 'getevent/' + eventId);
    } 

    updateEventDetails(eventId: number, eventData: any): Observable<any> {
      return this.http.post<any>(this.apiUrl + 'update_event/' + eventId, eventData);
    }

    archiveEvent(eventId: number): Observable<any> {
      return this.http.post<any>(this.apiUrl + 'archive_event/' + eventId, null); 
    }

      // New method to fetch events along with participant counts
    getEventsWithParticipantCounts(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl + 'get_events_with_participant_counts');
    }
  }