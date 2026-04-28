import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { Serve } from '../../serve';

@Component({
  selector: 'app-excel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './excel.html',
  styleUrls: ['./excel.scss'],   // ✅ FIXED
})
export class Excel implements OnInit {

  reportForm!: FormGroup;
  reportDetails: any[] = [];

  constructor(private fb: FormBuilder, private db: Serve) {}

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      startdate: [''],
      enddate: ['']
    });
  }

  generateReport() {
    this.db.report(this.reportForm.value).then((data: any) => {
      this.reportDetails = data;
    });
  }

  exportToExcel() {

    if (this.reportDetails.length === 0) {
      alert('No data to export');
      return;
    }

    const excelData = this.reportDetails.map((d, i) => ({
      'Sl No': i + 1,
      'Project Name': d.project_name,
      'Work Name': d.work_name,
      'Employee ID': d.employee_id_num,
      'Employee Name': d.employee_name,
      'Start Date': d.assign_date,
      'End Date': d.endassign_date
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Report');

    XLSX.writeFile(wb, 'date_wise_report.xlsx');
  }
    OnSubmit() {
    this.db.report(this.reportForm.value).then((data: any) => {
      this.reportDetails = data;
      console.log(data);
    });
  }
}
