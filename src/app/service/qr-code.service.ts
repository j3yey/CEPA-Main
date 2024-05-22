import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class QRCodeService {
  constructor(private dataService: DataService) { }

  generateQRCodeData(eventId: string): Observable<string> {
    return new Observable<string>((observer) => {
      this.dataService.getEventDetails(eventId).subscribe(
        (eventDetails: any) => {
          const qrCodeData = `http://itcepacommunity.com/attendance/${eventId}`;
          observer.next(qrCodeData);
          observer.complete();
        },
        error => {
          console.error('Failed to fetch event details:', error);
          observer.error(error); // You may want to handle this differently
        }
      );
    });
  }
}
