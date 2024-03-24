import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPagePageComponent } from './login-page-page.component';

describe('LoginPagePageComponent', () => {
  let component: LoginPagePageComponent;
  let fixture: ComponentFixture<LoginPagePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPagePageComponent]
    });
    fixture = TestBed.createComponent(LoginPagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
