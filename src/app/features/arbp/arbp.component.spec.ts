import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ARBPComponent } from './arbp.component';

describe('ARBPComponent', () => {
  let component: ARBPComponent;
  let fixture: ComponentFixture<ARBPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ARBPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ARBPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
