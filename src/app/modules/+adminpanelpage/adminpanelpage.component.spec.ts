import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpanelpageComponent } from './adminpanelpage.component';

describe('AdminpanelpageComponent', () => {
  let component: AdminpanelpageComponent;
  let fixture: ComponentFixture<AdminpanelpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminpanelpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminpanelpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
