import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadioButton } from 'primeng/radiobutton';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CustomTableComponent,
  ColumnDef,
} from '../../../custom-table/custom-table.component';
@Component({
  selector: 'app-defect_notices',
  imports: [
    CommonModule,
    CustomTableComponent,
    ReactiveFormsModule,
    Select,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './defect-notices.component.html',
  styleUrl: './defect-notices.component.scss',
})
export class DefectNoticesComponent {
  constructor(private fb: FormBuilder) {}
  form!: FormGroup;
  showOption = [
    { label: '10', value: '10' },
    { label: '50', value: '50' },
    { label: '100', value: '100' },
    { label: '200  ', value: '200' },
  ];

  ngOnInit(): void {
    this.form = this.fb.group({
      show: ['10'],
      diaryFilingNo: [''],
      fromFilingDate: [null],
      toFilingDate: [null],
      diaryKeyword: [''],
    });
  }

  onReset(): void {
    this.hasSearched = false;
    this.isLoading = false;
    this.caseRecords = [];

    this.form.patchValue({
      show: '10',
      diaryFilingNo: '',
      fromFilingDate: null,
      toFilingDate: null,
      diaryKeyword: '',
    });
  }
  isLoading: boolean = false;
  hasSearched: boolean = false;
  caseRecords: any[] = [];
  tableColumns: ColumnDef[] = [
    { field: 'sNo', header: 'Sr. No.' },
    { field: 'oldFiling', header: 'Filing No' },
    { field: 'newFiling', header: 'Cause Title' },
    { field: 'causeTitle', header: 'Defect Date' },
  ];

  loadApiData(): void {
    this.caseRecords = [
      {
        sNo: '1',
        oldFiling: '2026251201000202',
        newFiling:
          'RAKESH RANJAN PARIDA VS Delhi Zone, Pr Chief Commissioner Office & Ors',
        causeTitle: '11/08/2026',
      },
    ];
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

  handleRecordView(selectedRow: any): void {
    console.log('Selected case for viewing:', selectedRow);
    alert(`Opening details for case: ${selectedRow.diaryNo}`);
  }
}
