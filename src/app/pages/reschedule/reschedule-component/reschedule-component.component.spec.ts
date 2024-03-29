import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleComponentComponent } from './reschedule-component.component';

describe('RescheduleComponentComponent', () => {
  let component: RescheduleComponentComponent;
  let fixture: ComponentFixture<RescheduleComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RescheduleComponentComponent]
    });
    fixture = TestBed.createComponent(RescheduleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
