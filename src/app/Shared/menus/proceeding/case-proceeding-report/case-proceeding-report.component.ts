import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import {
  CustomTableComponent,
  ColumnDef,
} from '../../../custom-table/custom-table.component';

@Component({
  selector: 'app-case-proceeding-report',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    CustomTableComponent,
  ],
  templateUrl: './case-proceeding-report.component.html',
  styleUrl: './case-proceeding-report.component.scss',
})
export class CaseProceedingReportComponent {
  constructor(private fb: FormBuilder) {}
  form!: FormGroup;
  isLoading: boolean = false;
  hasSearched: boolean = false;

  caseRecords: any[] = [];

  tableColumns: ColumnDef[] = [
    { field: 'sNo', header: 'Sr. No.' },
    { field: 'caseType', header: 'Case No' },
    { field: 'dateOfFiling', header: 'Party Detail' },
    { field: 'caseTitle', header: 'Listing Purpose' },
    { field: 'location', header: 'Next Listing/Disposed date' },
    { field: 'caseStatus', header: 'Next Listing Purpose/Disposal Nature' },
  ];

  ngOnInit(): void {
    this.form = this.fb.group({
      listingDate: [null],
    });
  }

  onSearch(): void {
    console.log('Executing query payload:', this.form.value);
    if (this.form.invalid || this.isLoading) return;

    this.isLoading = true;
    this.hasSearched = true;
    this.caseRecords = []; // Clear previous search results while loading

    // Simulated API call (replace setTimeout with your actual API subscription)
    setTimeout(() => {
      this.loadApiData();
      this.isLoading = false;
    }, 1000);
  }

  loadApiData(): void {
    // API response data mapping
    this.caseRecords = [
      {
        sNo: '1',
        caseType: '',
        dateOfFiling: '',
        caseTitle: '',
        caseStatus: '',
        location: '',
      },
    ];
  }
}
