import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VerifyandapproveComponent} from './verifyandapprove.component';

describe('VerifyandapproveComponent', () => {
  let component: VerifyandapproveComponent;
  let fixture: ComponentFixture<VerifyandapproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyandapproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyandapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
