import { TestBed } from '@angular/core/testing';

import { PromService } from './prom.service';

describe('PromService', () => {
  let service: PromService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
