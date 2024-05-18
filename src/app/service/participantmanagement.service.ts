import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantmanagementService {

  private apiUrl = 'https://itcepacommunity.com/cepaapi/api/';

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
  
  updateParticipantDetails(participantId: number, participantData: any): Observable<any> {
    console.log('Updating participant with ID:', participantId); // Add this line
    return this.http.post<any>(this.apiUrl + 'update_participant/' + participantId, participantData);
  }
}