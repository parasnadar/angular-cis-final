import { Component } from '@angular/core';
import { DynamicRadioGroupComponent } from '../../../dynamic-radio-group/dynamic-radio-group.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  CustomTableComponent,
  ColumnDef,
} from '../../../custom-table/custom-table.component';
@Component({
  selector: 'app-scrutinized-cases',
  imports: [
    DynamicRadioGroupComponent,
    CommonModule,
    ReactiveFormsModule,
    DynamicRadioGroupComponent,
    Select,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
    CustomTableComponent,
  ],
  templateUrl: './scrutinized-cases.component.html',
  styleUrl: './scrutinized-cases.component.scss',
})
export class ScrutinizedCasesComponent {
  constructor(private fb: FormBuilder) {}
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      caseCategory: ['all'],
      show: ['10'],
      diaryFilingNo: [''],
      fromFilingDate: [null],
      toFilingDate: [null],
      diaryKeyword: [''],
    });
  }

  caseCategoryOptions = [
    { label: 'All', value: 'all' },
    { label: 'Defective', value: 'defective' },
    { label: 'Defect Fee', value: 'defective_fee' },
  ];

  showOption = [
    { label: '10', value: '10' },
    { label: '50', value: '50' },
    { label: '100', value: '100' },
    { label: '200  ', value: '200' },
  ];

  isLoading: boolean = false;
  hasSearched: boolean = false;
  caseRecords: any[] = [];
  tableColumns: ColumnDef[] = [
    { field: 'sNo', header: 'Sr. No.' },
    { field: 'oldFiling', header: 'Diary No' },
    { field: 'newFiling', header: 'Case No' },
    { field: 'causeTitle', header: 'Case Type' },
    { field: 'from', header: 'Cause Title' },
    { field: 'to', header: 'Date Of Filing' },
    { field: 'request', header: 'Date Of Scrutiny' },
    { field: 'last', header: 'Status' },
  ];

  loadApiData(): void {
    this.caseRecords = [
      {
        sNo: '-',
        oldFiling: '2025307202000177	',
        newFiling: '	RECT.APPL/1/PB/2026',
        causeTitle: 'Rectification of Mistake',
        from: 'Sanjana S Hegde VS',
        to: '03/10/2025',
        request: '06/08/2026',
        last: 'Defect Free',
        Transfer_date: '',
        stat: '-',
        Transfernote: '-',
        diaryNo: '-',
        caseDetails: '-',
        location: '-',
        date: '-',
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

  onReset(): void {
    this.hasSearched = false;
    this.isLoading = false;
    this.caseRecords = [];

    this.form.patchValue({
      caseCategory: ['all'],
      show: '10',
      diaryFilingNo: '',
      fromFilingDate: null,
      toFilingDate: null,
      diaryKeyword: '',
    });
  }
}
