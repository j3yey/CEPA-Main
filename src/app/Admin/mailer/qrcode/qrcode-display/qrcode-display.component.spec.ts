import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeDisplayComponent } from './qrcode-display.component';

describe('QrcodeDisplayComponent', () => {
  let component: QrcodeDisplayComponent;
  let fixture: ComponentFixture<QrcodeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrcodeDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrcodeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
