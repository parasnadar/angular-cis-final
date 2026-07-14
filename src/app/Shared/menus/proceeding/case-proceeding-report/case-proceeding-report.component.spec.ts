import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseProceedingReportComponent } from './case-proceeding-report.component';

describe('CaseProceedingReportComponent', () => {
  let component: CaseProceedingReportComponent;
  let fixture: ComponentFixture<CaseProceedingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseProceedingReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseProceedingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
