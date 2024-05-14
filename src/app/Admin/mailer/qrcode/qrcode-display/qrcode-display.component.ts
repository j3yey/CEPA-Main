import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-qrcode-display',
  standalone: true,
  imports: [QRCodeModule, CommonModule],
  templateUrl: './qrcode-display.component.html',
  styleUrl: './qrcode-display.component.css'
})
export class QrcodeDisplayComponent implements OnChanges {
  @Input() qrCodeData: string = '';

  constructor(private cdr: ChangeDetectorRef) {
    // console.log('QrcodeDisplayComponent initialized');
  }
  
  ngOnInit(): void {
    // console.log('QrcodeDisplayComponent qrCodeData:', this.qrCodeData);
  }
  
  
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('QrcodeDisplayComponent ngOnChanges triggered:', changes);
    this.cdr.detectChanges();
  }  
}
