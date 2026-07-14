import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectCasesComponent } from './disconnect-cases.component';

describe('DisconnectCasesComponent', () => {
  let component: DisconnectCasesComponent;
  let fixture: ComponentFixture<DisconnectCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisconnectCasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisconnectCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
