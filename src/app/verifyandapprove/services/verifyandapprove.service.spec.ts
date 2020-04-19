import {TestBed} from '@angular/core/testing';

import {VerifyandapproveService} from './verifyandapprove.service';

describe('VerifyandapproveService', () => {
  let service: VerifyandapproveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyandapproveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
