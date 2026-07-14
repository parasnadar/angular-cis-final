import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectCasesComponent } from './connect-cases.component';

describe('ConnectCasesComponent', () => {
  let component: ConnectCasesComponent;
  let fixture: ComponentFixture<ConnectCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectCasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
