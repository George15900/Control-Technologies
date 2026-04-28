import { ChangeDetectorRef, Component } from '@angular/core';
import { Serve } from '../../serve';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-leavehistory',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './leavehistory.html',
  styleUrl: './leavehistory.scss',
})
export class Leavehistory {
public leave:any[]=[];
  public empary: any[] = [];
searchForm!: FormGroup;
constructor(private servies: Serve, private cde: ChangeDetectorRef, private router: Router, private formBuilder: FormBuilder) { }

ngOnInit(): void {
   this.servies.emp_views().then((data: any) => {
      this.empary = data;
      this.cde.detectChanges();
    });
    this.servies.leavehistory().then((stateData: any) => {
    this.leave = stateData;
    this.cde.detectChanges();
  });
       this.searchForm = this.formBuilder.group({
      search: ['']
    });
  }

  onSearch() {
    this.servies.search(this.searchForm.value).then((data: any) => {
      // ✅ directly assign result
      this.empary = data;

      // no reload
      this.cde.detectChanges();
      // window.location.reload();
    });

  }
}
