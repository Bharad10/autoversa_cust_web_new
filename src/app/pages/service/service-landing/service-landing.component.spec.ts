import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLandingComponent } from './service-landing.component';

describe('ServiceLandingComponent', () => {
  let component: ServiceLandingComponent;
  let fixture: ComponentFixture<ServiceLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceLandingComponent]
    });
    fixture = TestBed.createComponent(ServiceLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
