import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftCauselistComponent } from './draft-causelist.component';

describe('DraftCauselistComponent', () => {
  let component: DraftCauselistComponent;
  let fixture: ComponentFixture<DraftCauselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftCauselistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftCauselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
