import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalCauselistComponent } from './final-causelist.component';

describe('FinalCauselistComponent', () => {
  let component: FinalCauselistComponent;
  let fixture: ComponentFixture<FinalCauselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalCauselistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalCauselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
