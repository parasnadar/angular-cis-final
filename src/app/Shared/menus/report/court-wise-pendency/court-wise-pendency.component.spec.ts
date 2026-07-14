import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtWisePendencyComponent } from './court-wise-pendency.component';

describe('CourtWisePendencyComponent', () => {
  let component: CourtWisePendencyComponent;
  let fixture: ComponentFixture<CourtWisePendencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtWisePendencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtWisePendencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
