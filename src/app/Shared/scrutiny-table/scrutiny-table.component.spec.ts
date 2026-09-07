import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrutinyTableComponent } from './scrutiny-table.component';

describe('ScrutinyTableComponent', () => {
  let component: ScrutinyTableComponent;
  let fixture: ComponentFixture<ScrutinyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrutinyTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrutinyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
