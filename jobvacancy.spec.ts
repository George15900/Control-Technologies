import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jobvacancy } from './jobvacancy';

describe('Jobvacancy', () => {
  let component: Jobvacancy;
  let fixture: ComponentFixture<Jobvacancy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jobvacancy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jobvacancy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
