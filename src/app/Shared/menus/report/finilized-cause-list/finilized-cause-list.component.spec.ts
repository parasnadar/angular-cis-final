import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinilizedCauseListComponent } from './finilized-cause-list.component';

describe('FinilizedCauseListComponent', () => {
  let component: FinilizedCauseListComponent;
  let fixture: ComponentFixture<FinilizedCauseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinilizedCauseListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinilizedCauseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
