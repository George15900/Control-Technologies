import { ChangeDetectorRef, Component } from '@angular/core';
import { Serve } from '../../serve';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-apply',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-apply.html',
  styleUrl: './job-apply.scss',
})
export class JobApply {
  public job: any[] = [];
  public jobary: any[] = [];
  jobform!: FormGroup;
  constructor(private servies: Serve, private cde: ChangeDetectorRef, private router: Router, private form: FormBuilder) { }

  ngOnInit(): void {
    this.jobform = this.form.group({
      job_id: ['']
    });

this.servies.jobvacancy_view().then((data:any)=>{
this.jobary=data;
this.cde.detectChanges();
});
    this.servies.jobview().then((stateData: any) => {

      // ✅ Check data is array
      if (Array.isArray(stateData)) {

        // ✅ Filter jobs requested to join
        this.job = stateData.filter(item =>
          item.apply_status === 'request'
        );
        console.log("job", this.job);

      } else {
        this.job = [];
      }

      this.cde.detectChanges();
    })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });

  }

  Update(jobapplication_id: number, status: string) {
    let a = status;
    if (confirm('Are you' + status + 'this person ?')) {
      this.servies.update_jobseeker({ id: jobapplication_id, status: status }).then((res: any) => {
        if (res.message == "Success") {
          alert(a + 'Successfully');
        }
        else {
          alert(a + 'Failed');
        }
      });
    }
  }


  onchange(Event: any) {

    const job_id = this.jobform.value.job_id;
    this.servies.jobsearch({ job_id: job_id }).then((districtData: any) => {
      this.job = districtData.filter(item =>
          item.apply_status === 'request'
        );
      this.cde.detectChanges();

    });
  }
}
