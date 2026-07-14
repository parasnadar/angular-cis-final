import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateWisePendencyComponent } from './date-wise-pendency.component';

describe('DateWisePendencyComponent', () => {
  let component: DateWisePendencyComponent;
  let fixture: ComponentFixture<DateWisePendencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateWisePendencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateWisePendencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
