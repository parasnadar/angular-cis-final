import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CauselistComponent } from './causelist.component';

describe('CauselistComponent', () => {
  let component: CauselistComponent;
  let fixture: ComponentFixture<CauselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CauselistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CauselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
