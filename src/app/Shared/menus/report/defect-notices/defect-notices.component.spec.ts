import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectNoticesComponent } from './defect-notices.component';

describe('ReportComponent', () => {
  let component: DefectNoticesComponent;
  let fixture: ComponentFixture<DefectNoticesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefectNoticesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DefectNoticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
