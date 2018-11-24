import { TestBed, inject } from '@angular/core/testing';

import { PaymentTypeService } from './payment-type.service';

describe('PaymentTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentTypeService]
    });
  });

  it('should be created', inject([PaymentTypeService], (service: PaymentTypeService) => {
    expect(service).toBeTruthy();
  }));
});
