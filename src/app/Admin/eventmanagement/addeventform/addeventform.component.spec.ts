import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeventformComponent } from './addeventform.component';

describe('AddeventformComponent', () => {
  let component: AddeventformComponent;
  let fixture: ComponentFixture<AddeventformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddeventformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddeventformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
