import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedDisplayBoardComponent } from './consolidated-display-board.component';

describe('ConsolidatedDisplayBoardComponent', () => {
  let component: ConsolidatedDisplayBoardComponent;
  let fixture: ComponentFixture<ConsolidatedDisplayBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsolidatedDisplayBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolidatedDisplayBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
