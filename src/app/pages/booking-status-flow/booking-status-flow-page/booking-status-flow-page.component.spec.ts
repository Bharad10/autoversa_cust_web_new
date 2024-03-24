import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingStatusFlowPageComponent } from './booking-status-flow-page.component';

describe('BookingStatusFlowPageComponent', () => {
  let component: BookingStatusFlowPageComponent;
  let fixture: ComponentFixture<BookingStatusFlowPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingStatusFlowPageComponent]
    });
    fixture = TestBed.createComponent(BookingStatusFlowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
