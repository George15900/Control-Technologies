import { ChangeDetectorRef, Component } from '@angular/core';
import { Serve } from '../../serve';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-view',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './employee-view.html',
  styleUrl: './employee-view.scss',
})
export class EmployeeView {

  public empary: any[] = [];
  searchForm!: FormGroup;

  constructor(
    private servies: Serve,
    private cde: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    // load all employees
    this.servies.emp_views().then((data: any) => {
      this.empary = data;
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
