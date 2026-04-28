import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictReg } from './district-reg';

describe('DistrictReg', () => {
  let component: DistrictReg;
  let fixture: ComponentFixture<DistrictReg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictReg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictReg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
