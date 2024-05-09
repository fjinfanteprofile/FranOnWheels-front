import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsContainerHomeComponent } from './testimonials-container-home.component';

describe('TestimonialsContainerHomeComponent', () => {
  let component: TestimonialsContainerHomeComponent;
  let fixture: ComponentFixture<TestimonialsContainerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialsContainerHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestimonialsContainerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
