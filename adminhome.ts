import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Serve } from '../../serve';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adminhome',
  imports: [CommonModule],
  templateUrl: './adminhome.html',
  styleUrl: './adminhome.scss',
})
export class Adminhome {
public proary:any[]=[];
public empary:any[]=[];
public job:any[]=[];
public jobary:any[]=[];
public leave:any[]=[]; 
public leavesr:any[]=[]; 
constructor(private servies:Serve, private cde:ChangeDetectorRef, private router:Router) { }  
ngOnInit(): void {
this.servies.project_view().then((data:any)=>{
this.proary=data;
this.cde.detectChanges();
});
   this.servies.emp_views().then((data: any) => {
      this.empary = data;
      this.cde.detectChanges();
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
       this.servies.message_view().then((stateData: any) => {

      // ✅ Check data is array
      if (Array.isArray(stateData)) {

        // ✅ Filter jobs requested to join
        this.leavesr = stateData.filter(item =>
          item.Status === 'Requested'
        );
        console.log("job",this.leavesr);

      } else {
        this.leavesr = [];
      }

      this.cde.detectChanges();
    })
        this.servies.emp_leave_view().then((stateData: any) => {

      // ✅ Check data is array
      if (Array.isArray(stateData)) {

        // ✅ Filter jobs requested to join
        this.leave = stateData.filter(item =>
          item.leave_statues === 'Requested'
        );
        console.log("job",this.leave);

      } else {
        this.leavesr = [];
      }

      this.cde.detectChanges();
    })
}
}
