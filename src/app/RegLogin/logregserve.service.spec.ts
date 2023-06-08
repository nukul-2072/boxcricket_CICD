import { TestBed } from '@angular/core/testing';

import { LogregserveService } from './logregserve.service';

describe('LogregserveService', () => {
  let service: LogregserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogregserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
