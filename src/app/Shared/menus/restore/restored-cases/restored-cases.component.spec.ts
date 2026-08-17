import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoredCasesComponent } from './restored-cases.component';

describe('RestoredCasesComponent', () => {
  let component: RestoredCasesComponent;
  let fixture: ComponentFixture<RestoredCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestoredCasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestoredCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
