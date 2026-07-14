import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldCaseListingComponent } from './old-case-listing.component';

describe('OldCaseListingComponent', () => {
  let component: OldCaseListingComponent;
  let fixture: ComponentFixture<OldCaseListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OldCaseListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldCaseListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
