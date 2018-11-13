import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddressViewComponent } from './user-address-view.component';

describe('UserAddressViewComponent', () => {
  let component: UserAddressViewComponent;
  let fixture: ComponentFixture<UserAddressViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddressViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddressViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
