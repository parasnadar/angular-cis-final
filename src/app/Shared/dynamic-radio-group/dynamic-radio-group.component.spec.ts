import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicRadioGroupComponent } from './dynamic-radio-group.component';

describe('DynamicRadioGroupComponent', () => {
  let component: DynamicRadioGroupComponent;
  let fixture: ComponentFixture<DynamicRadioGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicRadioGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
