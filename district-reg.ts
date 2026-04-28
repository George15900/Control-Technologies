import { ChangeDetectorRef, Component } from '@angular/core';
import { Serve } from '../../serve';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-district-reg',
  imports: [ReactiveFormsModule],
  templateUrl: './district-reg.html',
  styleUrl: './district-reg.scss',
})
export class DistrictReg {
  public stateary: any[] = [];
  constructor(private servies: Serve, private form: FormBuilder, private cde: ChangeDetectorRef, private router: Router) { }
  districtform!: FormGroup;
  ngOnInit(): void {
    this.districtform = this.form.group({
      state: ['',Validators.required],
      district: ['',Validators.required]
    });
    this.servies.stateviews().then((data: any) => {
      this.stateary = data;
      this.cde.detectChanges();
    });
  }
  Submit() {
    this.servies.district(this.districtform.value).then((data: any) => {
      if (data.message == "Success") {
        alert('District Registered Successfully');
        window.location.reload();
      }
      else {
        alert('District Registration Failed');
      }
    })
  }
}
