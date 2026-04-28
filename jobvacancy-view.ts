import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Serve } from '../../serve';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobvacancy-view',
  imports: [CommonModule,],
  templateUrl: './jobvacancy-view.html',
  styleUrl: './jobvacancy-view.scss',
})
export class JobvacancyView {
public jobary:any[]=[];
constructor(private servies:Serve, private cde:ChangeDetectorRef, private router:Router) { }  
ngOnInit(): void {
this.servies.jobvacancy_view().then((data:any)=>{
this.jobary=data;
this.cde.detectChanges();
});
}
deleteJob(job_id:string){
   if (confirm('Are you sure you want to delete  job Vacancy?')) {
  this.servies.jobvacancy_del({job_id:job_id}).then((res:any)=>{
    if(res.message=="Success"){
      alert('Delete Successfully');
    }
  else{
 alert('Delete Failed');
  }
  });
  }
}
}

