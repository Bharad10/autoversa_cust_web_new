import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDropPageComponent } from './schedule-drop-page.component';

describe('ScheduleDropPageComponent', () => {
  let component: ScheduleDropPageComponent;
  let fixture: ComponentFixture<ScheduleDropPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleDropPageComponent]
    });
    fixture = TestBed.createComponent(ScheduleDropPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
