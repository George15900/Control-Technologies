import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Serve } from '../../serve';

@Component({
  selector: 'app-jobvacancy',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './jobvacancy.html',
  styleUrl: './jobvacancy.scss',
})
export class Jobvacancy {
jobvacancyform!:FormGroup;
 today = new Date().toISOString().split('T')[0];
public designationarry:any[]=[];
public savestatus = false; // used by template to show errors
constructor(private serve:Serve,private fb:FormBuilder,private cde:ChangeDetectorRef) {}
  ngOnInit(): void {
    this.jobvacancyform=this.fb.group({
      designation_id:['',Validators.required],
      discription:['',Validators.required,Validators.pattern('^[a-zA-Z ]*$')],
      qualification:['',Validators.required,Validators.pattern('^[a-zA-Z ]*$')],
      experience:['',Validators.required,Validators.pattern('^[0-9]+$')],
      numberofvacancy:['',Validators.required,Validators.pattern('^[0-9]+$')],
      enddate:['',Validators.required],
    });
    this.serve.designations_view().then((Data: any) => {
      this.designationarry = Data;
      this.cde.detectChanges();
    });
    this.cde.detectChanges();
  }
  Submit(){
    // flag that we attempted to save and mark controls touched
    this.savestatus = true;
    Object.values(this.jobvacancyform.controls).forEach(ctrl => ctrl.markAsTouched());

    if (this.jobvacancyform.invalid) {
      return; // don't submit if form invalid
    }

    this.serve.jobvacancy_reg(this.jobvacancyform.value).then((res:any)=>{
         if (res.message == "Success") {
            alert(' job vacancyform inserted Successfully');
                    window.location.reload();

          }
          else {
            alert(' job vacancyform insertion is Failed');
          }
    });
  }
}
