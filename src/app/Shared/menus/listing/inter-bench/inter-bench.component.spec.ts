import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterBenchComponent } from './inter-bench.component';

describe('InterBenchComponent', () => {
  let component: InterBenchComponent;
  let fixture: ComponentFixture<InterBenchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterBenchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterBenchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
