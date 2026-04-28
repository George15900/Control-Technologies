import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobvacancyView } from './jobvacancy-view';

describe('JobvacancyView', () => {
  let component: JobvacancyView;
  let fixture: ComponentFixture<JobvacancyView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobvacancyView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobvacancyView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
