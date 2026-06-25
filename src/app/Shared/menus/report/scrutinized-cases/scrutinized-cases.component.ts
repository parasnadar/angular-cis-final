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

  onSearch(): void {
    console.log('Executing query payload:', this.form.value);
  }

  onReset(): void {
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
