import { ChangeDetectorRef, Component } from '@angular/core';
import { Serve } from '../../serve';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-emp-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './emp-edit.html',
  styleUrl: './emp-edit.scss',
})
export class EmpEdit {
  public emparyy: any[] = [];
  emp_Id: any;
  empupdate!: FormGroup;
  photoPreview: any;
  selectedFiles?: FileList;
  currentFile?: any;
  selectedFiles1?: FileList;
  currentFile1?: any;
  FileInfo?: Observable<any>;
  message = '';
  constructor(private seve: Serve, private chd: ChangeDetectorRef, private rt: Router, private route: ActivatedRoute, private form: FormBuilder) {
    route.paramMap.subscribe((params: ParamMap) => {
      this.emp_Id = params.get('emp_Id');
    });
  }
  ngOnInit() {
    this.empupdate = this.form.group({
      emp_Id: this.emp_Id,
      name: [],
      gmail: [],
      contact: [],
      per_address: [],
      current_address: [],
      pincode: [],
      District: [],
      States: [],
      photo: [],
      crr_pincode: [],
      Gender: [],
      exprenes: [],
      designation: [],
      dob: [],
      jdob: [],
      id_card: [],
    });
    this.seve.emp_viewdetails({ emp_Id: this.emp_Id }).then((res: any) => {
      this.emparyy = res;
      this.chd.detectChanges();

      this.empupdate.setValue({
        emp_Id: res[0].employee_id,
        name: res[0].employee_name,
        gmail: res[0].emp_mail,
        contact: res[0].emp_contact,
        per_address: res[0].house_name,
        current_address: res[0].place,
        pincode: res[0].pincode,
        District: res[0].District_name,
        States: res[0].state,
        crr_pincode: res[0].emp_po,
        Gender: res[0].gender,
        exprenes: res[0].exprenes,
        designation: res[0].designation,
        dob: res[0].DOB,
        jdob: res[0].JDOB,
        id_card: res[0].id_card,
        photo: res[0].photo,
      });
    });
  }
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    this.imageupload();
  }
  selectFile1(event: any) {
    this.selectedFiles1 = event.target.files;
    this.imageupload();
  }
  onSubmit() {
    if (!this.empupdate.value.id_card || !this.empupdate.value.photo) {
      const data = {
        name: this.empupdate.value.name,
        description: this.empupdate.value.description,
        id_card: this.emparyy[0].id_card,
        photo: this.emparyy[0].photo,
      }
    }
    // this.empupdate.value.photo = this.currentFile.name;
    // this.empupdate.value.id_card = this.currentFile1.name;
    this.seve.emp_edit(this.empupdate.value).then((data: any) => {
      if (data.message == 'Success') {
        alert('Update Successfully');
        this.rt.navigate(['/adminmaster/employee-view']);
      } else {
        alert('Update Failed');
      }
    });
  }
  imageupload() {
    if (this.selectedFiles && this.selectedFiles1) {
      const file: File | null = this.selectedFiles.item(0)
      const file1: File | null = this.selectedFiles1.item(0)
      if (file && file1) {
        this.currentFile = file
        this.currentFile1 = file1
        this.seve.upload(this.currentFile1).subscribe((event: any) => {
          this.message = event.body.message;
        })
        this.seve.upload(this.currentFile).subscribe((event: any) => {
          this.message = event.body.message;
        })
      }
      this.empupdate.value.photo = this.currentFile.name;
      this.empupdate.value.id_card = this.currentFile1.name;
    }
  }

}
