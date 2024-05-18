
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'https://itcepacommunity.com/cepaapi/api/';

  constructor(private http: HttpClient) { }

  submitAttendance(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'attendance', data);
  }
    // Method to fetch attendance data for a specific event
  getAttendanceForEvent(eventId: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'getattendees/' + eventId);
  }
}
