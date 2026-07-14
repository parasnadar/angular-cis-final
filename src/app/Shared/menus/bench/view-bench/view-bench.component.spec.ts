import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBenchComponent } from './view-bench.component';

describe('ViewBenchComponent', () => {
  let component: ViewBenchComponent;
  let fixture: ComponentFixture<ViewBenchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBenchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBenchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
