import {TestBed} from '@angular/core/testing';

import {QuestioneditService} from './questionedit.service';

describe('QuestioneditService', () => {
  let service: QuestioneditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestioneditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
