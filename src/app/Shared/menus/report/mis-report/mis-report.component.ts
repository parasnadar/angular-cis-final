import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'app-mis-report',
  imports: [
    CommonModule,

    ReactiveFormsModule,
    Select,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './mis-report.component.html',
  styleUrl: './mis-report.component.scss',
})
export class MisReportComponent {
  constructor(private fb: FormBuilder) {}
  misform!: FormGroup;

  searchByOptions = [
    { label: 'Date Of Filing', value: '1' },
    { label: 'Registration Date', value: '2' },
    { label: 'Disposed Date', value: '3' },
    { label: 'Court No', value: '4' },
    { label: 'Order Type', value: '5' },
    { label: 'Judge Wise', value: '6' },
    { label: 'Court No', value: '7' },
  ];

  caseTypeOptions = [
    { label: 'All', value: 'all' },
    { label: 'Appeal', value: 'a' },
    { label: 'Company Appeal', value: 'ca' },
    { label: 'Contempt Petition', value: 'cp' },
  ];

  dynamicOptions: { label: string; value: string }[] = [];

  ngOnInit(): void {
    this.misform = this.fb.group({
      searchBy: ['1'],
      caseType: ['all'],
      diaryFilingNo: [''],
      fromFilingDate: [null],
      toFilingDate: [null],
      dynamicFilterValue: [''],
    });
    this.misform.get('searchBy')?.valueChanges.subscribe((value) => {
      this.handleDynamicFilterSetup(value);
    });
  }

  handleDynamicFilterSetup(value: string): void {
    // Reset control value whenever the category shifts
    this.misform.get('dynamicFilterValue')?.setValue('');

    switch (value) {
      case '4':
        this.dynamicOptions = [
          { label: 'Court Room 1', value: 'cr1' },
          { label: 'Court Room 2', value: 'cr2' },
          { label: 'Court Room 3', value: 'cr3' },
        ];
        break;
      case '5':
        this.dynamicOptions = [
          { label: 'Interim Order', value: 'interim' },
          { label: 'Final Judgment', value: 'final' },
          { label: 'Adjournment Order', value: 'adjourn' },
        ];
        break;
      case '6':
        this.dynamicOptions = [
          { label: 'Honble Justice A. K. Sikri', value: 'j1' },
          { label: 'Honble Justice D. Y. Chandrachud', value: 'j2' },
        ];
        break;
      case '7':
        this.dynamicOptions = [
          { label: 'Division Bench', value: 'db' },
          { label: 'Single Bench', value: 'sb' },
          { label: 'Full Bench', value: 'fb' },
        ];
        break;
      default:
        this.dynamicOptions = [];
        break;
    }
  }

  // Returns true if the active selector matches criteria value conditional targets [4,5,6,7]
  shouldShowDynamicDropdown(): boolean {
    const currentSearchBy = this.misform.get('searchBy')?.value;
    return ['4', '5', '6', '7'].includes(currentSearchBy);
  }

  onSearch(): void {
    console.log('Executing query payload:', this.misform.value);
  }

  onReset(): void {
    this.misform.patchValue({
      searchBy: '1',
      caseType: 'all',
      diaryFilingNo: '',
      fromFilingDate: null,
      toFilingDate: null,
    });
  }
}
