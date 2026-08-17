import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesOfSupplyDefectListComponent } from './places-of-supply-defect-list.component';

describe('PlacesOfSupplyDefectListComponent', () => {
  let component: PlacesOfSupplyDefectListComponent;
  let fixture: ComponentFixture<PlacesOfSupplyDefectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacesOfSupplyDefectListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacesOfSupplyDefectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
