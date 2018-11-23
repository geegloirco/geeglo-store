import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHistoryViewComponent } from "./user-history-view.component";

describe('UserHistoryViewComponent', () => {
  let component: UserHistoryViewComponent;
  let fixture: ComponentFixture<UserHistoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHistoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
