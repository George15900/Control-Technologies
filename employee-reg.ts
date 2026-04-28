import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Serve } from '../../serve';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-reg',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-reg.html',
  styleUrl: './employee-reg.scss',
})
export class EmployeeReg {
   today = new Date().toISOString().split('T')[0];
  savestatus=false;
  public stateary: any[] = [];
  public districtary: any[] = [];
  public designationarry: any[] = [];
  empreg!: FormGroup;
  state_id: any;
  selectedFiles?: FileList;
  currentFile?: any;
   selectedFiles1?: FileList;
  currentFile1?: any;
  FileInfo?: Observable<any>;
  message = '';

  constructor(private servies: Serve, private form: FormBuilder, private cde: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.empreg = this.form.group({
      name: ['', [Validators.required],Validators.pattern('[a-zA-Z ]*')],
      gmail: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]],
      contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[6-9][0-9]{9}')]],
      per_address: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]{6}')]],
      state_id: ['', [Validators.required]],
      district_id: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      current_address: ['', [Validators.required]],
      crr_pincode: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      exprenes: ['', [Validators.required]],
      designation_id: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15), Validators.pattern('[a-zA-Z]{5,15}')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{6,}$")]],
      id_card: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      total_leave: ['', [Validators.required]],
    });
    this.servies.stateviews().then((stateData: any) => {
      this.stateary = stateData;
    });
    this.servies.designations_view().then((Data: any) => {
      this.designationarry = Data;
    });
    this.cde.detectChanges();
  }
  onchange() {
    const state_id = this.empreg.value.state_id;
    this.servies.distrite_view({ state_id: state_id }).then((districtData: any) => {
      this.districtary = districtData;
    });
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }
 selectFile1(event: any) {
    this.selectedFiles1 = event.target.files;
  }
  empinsert() {
    this.savestatus = true;
    console.log(this.empreg.value);
    
    
    
   
    const file: File | null = this.selectedFiles.item(0)
    const file1: File | null = this.selectedFiles1.item(0)

    if (file && file1) {
      this.currentFile = file;
      this.currentFile1 = file1;
      this.servies.upload(this.currentFile).subscribe(
        (event: any) => {
          this.message = event.body.message;
        });
      this.servies.upload(this.currentFile1).subscribe(
        (event: any) => {
          this.message = event.body.message;
        });
      this.empreg.value.photo = this.currentFile.name;
      this.empreg.value.id_card = this.currentFile1.name;
      this.servies.empinsert(this.empreg.value).then((data: any) => {
        if (data.message == "Success") {
          alert(' Registered Successfully');
          window.location.reload();
        }
        else if (data.message == "exists") {
          alert(' Username already exists');
        }
        else {
          alert(' Registration Failed');
        }
      });
    }
  }
}