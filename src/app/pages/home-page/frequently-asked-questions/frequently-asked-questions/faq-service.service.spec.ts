import { TestBed } from '@angular/core/testing';

import { FAQServiceService } from './faq-service.service';

describe('FAQServiceService', () => {
  let service: FAQServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FAQServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
