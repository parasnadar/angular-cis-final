import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCasesComponent } from './transfer-cases.component';

describe('TransferCasesComponent', () => {
  let component: TransferCasesComponent;
  let fixture: ComponentFixture<TransferCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferCasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
