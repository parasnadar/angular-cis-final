import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrutinizedCasesComponent } from './scrutinized-cases.component';

describe('ScrutinizedCasesComponent', () => {
  let component: ScrutinizedCasesComponent;
  let fixture: ComponentFixture<ScrutinizedCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrutinizedCasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrutinizedCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
