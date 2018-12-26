import { TestBed, inject } from '@angular/core/testing';

import { ItemInfoService } from './item-info.service';

describe('ItemInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemInfoService]
    });
  });

  it('should be created', inject([ItemInfoService], (service: ItemInfoService) => {
    expect(service).toBeTruthy();
  }));
});
