import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Serve } from '../../serve';
import { Router } from '@angular/router';

@Component({
  selector: 'app-district-view',
  imports: [ReactiveFormsModule],
  templateUrl: './district-view.html',
  styleUrl: './district-view.scss',
})
export class DistrictView {
  public stateary: any[] = [];
  public districtary: any[] = [];
  districtform!: FormGroup;
  state_id:any;

  constructor(private servies: Serve, private form: FormBuilder, private cde: ChangeDetectorRef, private router: Router) { }

ngOnInit(): void {
this.districtform = this.form.group({
      state_id: ['']
    });
  this.servies.stateviews().then((stateData: any) => {
    this.stateary = stateData;
    this.cde.detectChanges();
  });
 this.cde.detectChanges();
}

  onchange(Event: any) {

   const state_id = this.districtform.value.state_id;
      this.servies.distrite_view({state_id: state_id }).then((districtData: any) => {
        this.districtary = districtData;
        this.cde.detectChanges();
      });
    }
    Delete(district_id :string){
  if (confirm('Are you sure you want to delete  district?')) {
this.servies.distdel({district_id }).then((data:any)=>{
if(data.message=="Success"){
      alert('Delete Successfully');
              window.location.reload();
    }
  else{
 alert('Delete Failed');
  }
});
}
    }
  }

