import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://localhost/CEPA-Main/cepaapi/api/attendance';

  constructor(private http: HttpClient) { }

  submitAttendance(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}