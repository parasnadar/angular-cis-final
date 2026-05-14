import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MEMBERPBComponent } from './memberpb.component';

describe('MEMBERPBComponent', () => {
  let component: MEMBERPBComponent;
  let fixture: ComponentFixture<MEMBERPBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MEMBERPBComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MEMBERPBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
