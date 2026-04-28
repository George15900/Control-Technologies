import { ChangeDetectorRef, Component } from '@angular/core';
import { Serve } from '../../serve';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-apply-accest-view',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './apply-accest-view.html',
  styleUrl: './apply-accest-view.scss',
})
export class ApplyAccestView {
  selectedFiles1?: FileList;
  currentFile1?: any;
  FileInfo?: Observable<any>;
  message = '';

  public offerletter!: FormGroup
  public job: any[] = [];
  public jobary: any[] = [];
  jobform!: FormGroup;
  constructor(private servies: Serve, private cde: ChangeDetectorRef, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

this.servies.jobvacancy_view().then((data:any)=>{
this.jobary=data;
this.cde.detectChanges();
});
  this.jobform = this.formBuilder.group({
      job_id: ['']
    });
    this.servies.jobview().then((stateData: any) => {

      // ✅ Check data is array
      if (Array.isArray(stateData)) {

        // ✅ Filter jobs requested to join
        this.job = stateData.filter(item =>
          item.apply_status === 'Approved'
        );
         this.offerletter.setValue({
        id:this.job[0].login_id,
        name:this.job[0].jobseeker_name,
        gmail:this.job[0].jobseeker_email,
        role:this.job[0].designation,
        offerlett:[''],
      });
        console.log("job", this.job);

      } else {
        this.job = [];
      }

      this.cde.detectChanges();
    })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });
    this.offerletter = this.formBuilder.group({
      offerlett: [''],
      id: [''],
      name: [''],
      gmail: [''],
      role: ['']
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
  selectFile1(event: any) {
    this.selectedFiles1 = event.target.files;
  }
  Letter() {
    console.log(this.offerletter.value);
    if (this.selectedFiles1) {
      const file1: File | null = this.selectedFiles1.item(0)

      if (file1) {
        this.currentFile1 = file1;
        this.servies.upload(this.currentFile1).subscribe(
          (event: any) => {
            this.message = event.body.message;
          });
        this.offerletter.value.offerlett = this.currentFile1.name;
        this.servies.offerletter(this.offerletter.value).then((data: any) => {
          if (data.message == "Success") {
            alert(' Offer Letter Sented Successfully');
          }
          else {
            alert(' Offer Letter Senting is Failed');
          }
        });
      }
    }
  }
  

  onchange(Event: any) {

    const job_id = this.jobform.value.job_id;
    this.servies.jobsearch({ job_id: job_id }).then((districtData: any) => {
       this.job = districtData.filter(item =>
          item.apply_status === 'Approved'
        );
      this.cde.detectChanges();

    });
  }
}

