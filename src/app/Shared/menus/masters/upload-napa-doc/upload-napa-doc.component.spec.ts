import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadNapaDocComponent } from './upload-napa-doc.component';

describe('UploadNapaDocComponent', () => {
  let component: UploadNapaDocComponent;
  let fixture: ComponentFixture<UploadNapaDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadNapaDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadNapaDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
