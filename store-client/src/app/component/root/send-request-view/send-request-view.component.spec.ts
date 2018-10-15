import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRequestViewComponent } from './send-request-view.component';

describe('SendRequestViewComponent', () => {
  let component: SendRequestViewComponent;
  let fixture: ComponentFixture<SendRequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
