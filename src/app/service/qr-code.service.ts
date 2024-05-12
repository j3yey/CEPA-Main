import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QRCodeService {
  constructor(private eventService: EventService) { }

  generateQRCodeData(eventId: string): Observable<string> {
    return new Observable<string>((observer) => {
      this.eventService.getEventDetails(eventId).subscribe(
        (eventDetails: any) => {
          const qrCodeData = `/attendance/${eventId}`;
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
