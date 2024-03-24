import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailsPageComponent } from './blog-details-page.component';

describe('BlogDetailsPageComponent', () => {
  let component: BlogDetailsPageComponent;
  let fixture: ComponentFixture<BlogDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogDetailsPageComponent]
    });
    fixture = TestBed.createComponent(BlogDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
