import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SCRUNITYComponent } from './scrunity.component';

describe('SCRUNITYComponent', () => {
  let component: SCRUNITYComponent;
  let fixture: ComponentFixture<SCRUNITYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SCRUNITYComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SCRUNITYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
