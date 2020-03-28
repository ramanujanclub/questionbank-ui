import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionuploadComponent } from './questionupload.component';

describe('QuestionuploadComponent', () => {
  let component: QuestionuploadComponent;
  let fixture: ComponentFixture<QuestionuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
