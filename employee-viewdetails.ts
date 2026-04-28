import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Serve } from '../../serve';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-viewdetails',
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-viewdetails.html',
  styleUrl: './employee-viewdetails.scss',
})
export class EmployeeViewdetails {
  public emparyy: any[] = [];
  emp_Id: any;
  constructor(private seve: Serve, private chd: ChangeDetectorRef, private rt: Router, private route: ActivatedRoute) {
    route.paramMap.subscribe((params: ParamMap) => {
      this.emp_Id = params.get('emp_Id');
    });
  }
  ngOnInit() {
    this.seve.emp_viewdetails({ emp_Id: this.emp_Id }).then((res: any) => {
      console.log(res);
      this.emparyy = res;
      this.chd.detectChanges();
    });
  }
  Delete(employee_id: string) {
    if (confirm('Are you sure you want to Inactive  This Employee?')) {
      this.seve.emp_delete({ employee_id }).then((data: any) => {
        if (data.message == "Success") {
          alert('Inactive Successfully');
        }
        else {
          alert('Inactive Failed');
        }
      });
    }
  }
}
