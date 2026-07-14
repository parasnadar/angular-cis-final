import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedingCalenderComponent } from './proceeding-calender.component';

describe('ProceedingCalenderComponent', () => {
  let component: ProceedingCalenderComponent;
  let fixture: ComponentFixture<ProceedingCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProceedingCalenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProceedingCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
