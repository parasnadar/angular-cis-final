import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferActionTakenComponent } from './transfer-action-taken.component';

describe('TransferActionTakenComponent', () => {
  let component: TransferActionTakenComponent;
  let fixture: ComponentFixture<TransferActionTakenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferActionTakenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferActionTakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
