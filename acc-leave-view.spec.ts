import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccLeaveView } from './acc-leave-view';

describe('AccLeaveView', () => {
  let component: AccLeaveView;
  let fixture: ComponentFixture<AccLeaveView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccLeaveView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccLeaveView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
