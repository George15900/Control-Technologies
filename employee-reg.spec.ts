import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeReg } from './employee-reg';

describe('EmployeeReg', () => {
  let component: EmployeeReg;
  let fixture: ComponentFixture<EmployeeReg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeReg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeReg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
