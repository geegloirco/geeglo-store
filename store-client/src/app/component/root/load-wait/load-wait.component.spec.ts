import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadWaitComponent } from './load-wait.component';

describe('LoadWaitComponent', () => {
  let component: LoadWaitComponent;
  let fixture: ComponentFixture<LoadWaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadWaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadWaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
