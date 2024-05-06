  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root',
  })
  export class EventService {
    private apiUrl = 'http://localhost/CEPA-Main/cepaapi/api/';

    constructor(private http: HttpClient) { }

    addEvent(data: any): Observable<any> {
      return this.http.post<any>(this.apiUrl + 'addevent', data);
    }
    
    getAllEvents(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl + 'getevent');
    }
    
    getEventDetails(eventId: string): Observable<any> {
      return this.http.get<any>(this.apiUrl + 'getevent/' + eventId);
    } 
  }