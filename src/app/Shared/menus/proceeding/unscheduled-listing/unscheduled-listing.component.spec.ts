import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnscheduledListingComponent } from './unscheduled-listing.component';

describe('UnscheduledListingComponent', () => {
  let component: UnscheduledListingComponent;
  let fixture: ComponentFixture<UnscheduledListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnscheduledListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnscheduledListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
