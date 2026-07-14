import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseProceedingComponent } from './case-proceeding.component';

describe('CaseProceedingComponent', () => {
  let component: CaseProceedingComponent;
  let fixture: ComponentFixture<CaseProceedingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseProceedingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseProceedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
