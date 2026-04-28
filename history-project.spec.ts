import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryProject } from './history-project';

describe('HistoryProject', () => {
  let component: HistoryProject;
  let fixture: ComponentFixture<HistoryProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
