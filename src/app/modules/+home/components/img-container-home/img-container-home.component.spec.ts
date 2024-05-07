import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgContainerHomeComponent } from './img-container-home.component';

describe('ImgContainerHomeComponent', () => {
  let component: ImgContainerHomeComponent;
  let fixture: ComponentFixture<ImgContainerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgContainerHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgContainerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
