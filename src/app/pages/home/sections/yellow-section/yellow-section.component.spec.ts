import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowSectionComponent } from './yellow-section.component';

describe('YellowSectionComponent', () => {
  let component: YellowSectionComponent;
  let fixture: ComponentFixture<YellowSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YellowSectionComponent]
    });
    fixture = TestBed.createComponent(YellowSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
