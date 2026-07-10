import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecusedCasesComponent } from './recused-cases.component';

describe('RecusedCasesComponent', () => {
  let component: RecusedCasesComponent;
  let fixture: ComponentFixture<RecusedCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecusedCasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecusedCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
