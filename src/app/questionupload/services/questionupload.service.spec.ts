import { TestBed } from '@angular/core/testing';

import { QuestionuploadService } from './questionupload.service';

describe('QuestionuploadService', () => {
  let service: QuestionuploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionuploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
