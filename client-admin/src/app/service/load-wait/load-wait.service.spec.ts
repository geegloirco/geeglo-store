import { TestBed, inject } from '@angular/core/testing';
import { LoadWaitService } from './load-wait.service';

describe('LoadWaitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadWaitService]
    });
  });

  it('should be created', inject([LoadWaitService], (service: LoadWaitService) => {
    expect(service).toBeTruthy();
  }));
});
