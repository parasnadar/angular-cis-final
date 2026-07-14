import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeListsComponent } from './notice-lists.component';

describe('NoticeListsComponent', () => {
  let component: NoticeListsComponent;
  let fixture: ComponentFixture<NoticeListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticeListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
