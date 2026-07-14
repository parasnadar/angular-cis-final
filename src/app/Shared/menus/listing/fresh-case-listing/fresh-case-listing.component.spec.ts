import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshCaseListingComponent } from './fresh-case-listing.component';

describe('FreshCaseListingComponent', () => {
  let component: FreshCaseListingComponent;
  let fixture: ComponentFixture<FreshCaseListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreshCaseListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreshCaseListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
