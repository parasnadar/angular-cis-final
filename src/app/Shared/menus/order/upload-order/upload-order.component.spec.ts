import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadOrderComponent } from './upload-order.component';

describe('UploadOrderComponent', () => {
  let component: UploadOrderComponent;
  let fixture: ComponentFixture<UploadOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
