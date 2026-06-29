import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfiledCasesComponent } from './efiled-cases.component';

describe('EfiledCasesComponent', () => {
  let component: EfiledCasesComponent;
  let fixture: ComponentFixture<EfiledCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EfiledCasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EfiledCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
