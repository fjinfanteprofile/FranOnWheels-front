import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContainerBookingsComponent } from './form-container-bookings.component';

describe('FormContainerBookingsComponent', () => {
  let component: FormContainerBookingsComponent;
  let fixture: ComponentFixture<FormContainerBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormContainerBookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormContainerBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
