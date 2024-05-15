import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchparticipantService {
  private apiUrl = 'http://localhost/CEPA-Main/cepaapi/api/getparticipant'; // Update this URL to your actual API endpoint

  constructor(private http: HttpClient) {}

  getParticipant(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getparticipant?name=${name}`);
  }
}
