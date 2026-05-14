import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SUPERADMINComponent } from './superadmin.component';

describe('SUPERADMINComponent', () => {
  let component: SUPERADMINComponent;
  let fixture: ComponentFixture<SUPERADMINComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SUPERADMINComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SUPERADMINComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
