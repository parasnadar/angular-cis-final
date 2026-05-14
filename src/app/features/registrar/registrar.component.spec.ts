import { ComponentFixture, TestBed } from '@angular/core/testing';

import { REGISTRARComponent } from './registrar.component';

describe('REGISTRARComponent', () => {
  let component: REGISTRARComponent;
  let fixture: ComponentFixture<REGISTRARComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [REGISTRARComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(REGISTRARComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
