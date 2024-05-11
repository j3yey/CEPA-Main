import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantmanagementService {

  private apiUrl = 'http://localhost/CEPA-Main/cepaapi/api/';

  constructor(private http: HttpClient) { }

  getParticipants(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'getinfo');
  }

  editParticipant(participant: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'editparticipant', participant);
  }

  archiveParticipant(participant: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'archiveparticipant', participant);
  }
}