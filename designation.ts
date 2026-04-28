import { ChangeDetectorRef, Component } from '@angular/core';
import { Serve } from '../../serve';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,  } from '@angular/router';

@Component({
  selector: 'app-designation',
  imports: [ReactiveFormsModule,],
  templateUrl: './designation.html',
  styleUrl: './designation.scss',
})
export class Designation {
designationform!:FormGroup
public designationarry:any[]=[];
constructor(private services:Serve, private form:FormBuilder, private roter:Router,private ch:ChangeDetectorRef){}
 ngOnInit(){
  this.services.designations_view().then((Data: any) => {

    this.designationarry = Data;
    this.ch.detectChanges();
  })
  this.designationform=this.form.group({
designation:['',Validators.required, Validators.pattern('^[a-zA-Z ]')]
  })
 }
 Submit(){
  this.services.designations(this.designationform.value).then((data: any) => {
    if (data.message == "Success") {
        alert('Designation Registered Successfully');
                window.location.reload();
      }
      else {
        alert('Designation Registration Failed');
      }
  });
 }

del(designation_id:string){
  if (confirm('Are you sure you want to delete  designation?')) {
 this.services.designationsdel({designation_id}).then((data: any) => {
  if(data.message=="Success"){
      alert('Designation Delete Successfully');
              window.location.reload();
    }
  else{
 alert('Delete Failed');
  }
});
  }
}
}

