import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserhomedetailsComponent } from './userhomedetails.component';

describe('UserhomedetailsComponent', () => {
  let component: UserhomedetailsComponent;
  let fixture: ComponentFixture<UserhomedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserhomedetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserhomedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
