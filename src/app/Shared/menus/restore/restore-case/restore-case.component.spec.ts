import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreCaseComponent } from './restore-case.component';

describe('RestoreCaseComponent', () => {
  let component: RestoreCaseComponent;
  let fixture: ComponentFixture<RestoreCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestoreCaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestoreCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
