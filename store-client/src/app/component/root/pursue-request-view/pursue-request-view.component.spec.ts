import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PursueRequestViewComponent } from './pursue-request-view.component';

describe('PursueRequestViewComponent', () => {
  let component: PursueRequestViewComponent;
  let fixture: ComponentFixture<PursueRequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PursueRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PursueRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
