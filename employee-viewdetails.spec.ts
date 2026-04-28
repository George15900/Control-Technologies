import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeViewdetails } from './employee-viewdetails';

describe('EmployeeViewdetails', () => {
  let component: EmployeeViewdetails;
  let fixture: ComponentFixture<EmployeeViewdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeViewdetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeViewdetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
