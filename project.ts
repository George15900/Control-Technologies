import { ChangeDetectorRef, Component } from '@angular/core';
import { Serve } from '../../serve';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class Project {
   today = new Date().toISOString().split('T')[0];
   Projectform!: FormGroup;
constructor(private servies: Serve, private form: FormBuilder, private cde: ChangeDetectorRef, private router: Router) { }
 
  ngOnInit(): void {
    this.Projectform = this.form.group({
      Name: ['', Validators.required],
      discription: ['', Validators.required],
      Starting: ['',Validators.required],
      Ending: ['',Validators.required],
    });
  }
  Submit() {
    this.servies.project(this.Projectform.value).then((data: any) => {
      if (data.message == "Success") {
        alert(' Registered Successfully');
                window.location.reload();

      }
      else {
        alert(' Registration Failed');
      }
    })
  }
}
