import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationContainerHomeComponent } from './location-container-home.component';

describe('LocationContainerHomeComponent', () => {
  let component: LocationContainerHomeComponent;
  let fixture: ComponentFixture<LocationContainerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationContainerHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationContainerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
