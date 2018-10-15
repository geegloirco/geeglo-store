import { TestBed, inject } from '@angular/core/testing';

import { MsgsysService } from './msgsys.service';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MsgsysService]
    });
  });

  it('should be created', inject([MsgsysService], (service: MsgsysService) => {
    expect(service).toBeTruthy();
  }));
});
