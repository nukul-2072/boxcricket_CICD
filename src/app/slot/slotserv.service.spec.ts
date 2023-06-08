import { TestBed } from '@angular/core/testing';

import { SlotservService } from './slotserv.service';

describe('SlotservService', () => {
  let service: SlotservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
