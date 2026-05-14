import { ComponentFixture, TestBed } from '@angular/core/testing';

import { STENOComponent } from './steno.component';

describe('STENOComponent', () => {
  let component: STENOComponent;
  let fixture: ComponentFixture<STENOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [STENOComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(STENOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
