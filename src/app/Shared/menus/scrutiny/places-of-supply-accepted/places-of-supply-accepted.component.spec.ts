import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesOfSupplyAcceptedComponent } from './places-of-supply-accepted.component';

describe('PlacesOfSupplyAcceptedComponent', () => {
  let component: PlacesOfSupplyAcceptedComponent;
  let fixture: ComponentFixture<PlacesOfSupplyAcceptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacesOfSupplyAcceptedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacesOfSupplyAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
