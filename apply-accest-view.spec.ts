import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyAccestView } from './apply-accest-view';

describe('ApplyAccestView', () => {
  let component: ApplyAccestView;
  let fixture: ComponentFixture<ApplyAccestView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyAccestView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyAccestView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
