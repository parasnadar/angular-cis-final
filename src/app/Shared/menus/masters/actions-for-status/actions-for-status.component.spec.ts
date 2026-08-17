import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsForStatusComponent } from './actions-for-status.component';

describe('ActionsForStatusComponent', () => {
  let component: ActionsForStatusComponent;
  let fixture: ComponentFixture<ActionsForStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionsForStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsForStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
