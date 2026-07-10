import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuseJudgesFromCaseComponent } from './recuse-judges-from-case.component';

describe('RecuseJudgesFromCaseComponent', () => {
  let component: RecuseJudgesFromCaseComponent;
  let fixture: ComponentFixture<RecuseJudgesFromCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuseJudgesFromCaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuseJudgesFromCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
