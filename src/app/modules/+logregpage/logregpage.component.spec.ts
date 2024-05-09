import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogregpageComponent } from './logregpage.component';

describe('LogregpageComponent', () => {
  let component: LogregpageComponent;
  let fixture: ComponentFixture<LogregpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogregpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogregpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
