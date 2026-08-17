import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWithDefectDocumentsComponent } from './list-with-defect-documents.component';

describe('ListWithDefectDocumentsComponent', () => {
  let component: ListWithDefectDocumentsComponent;
  let fixture: ComponentFixture<ListWithDefectDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListWithDefectDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWithDefectDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
