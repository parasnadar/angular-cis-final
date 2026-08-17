import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecusedCasesListComponent } from './recused-cases-list.component';

describe('RecusedCasesListComponent', () => {
  let component: RecusedCasesListComponent;
  let fixture: ComponentFixture<RecusedCasesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecusedCasesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecusedCasesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
