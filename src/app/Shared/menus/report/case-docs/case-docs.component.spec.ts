import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDocsComponent } from './case-docs.component';

describe('CaseDocsComponent', () => {
  let component: CaseDocsComponent;
  let fixture: ComponentFixture<CaseDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseDocsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
