import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchparticipantComponent } from './searchparticipant.component';

describe('SearchparticipantComponent', () => {
  let component: SearchparticipantComponent;
  let fixture: ComponentFixture<SearchparticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchparticipantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchparticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
