import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantmanagementService {

  constructor(private http: HttpClient) { }


  getParticipants(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost/CEPA-Main/cepaapi/api/getinfo');
  }
}
