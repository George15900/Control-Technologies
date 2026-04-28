import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpEdit } from './emp-edit';

describe('EmpEdit', () => {
  let component: EmpEdit;
  let fixture: ComponentFixture<EmpEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
